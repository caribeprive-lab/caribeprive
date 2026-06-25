/**
 * POST /api/submit-appointment
 *
 * Recibe los datos del formulario de /agendar y:
 *   1. Crea o actualiza el contacto en GHL
 *   2. Crea la cita en el calendario de GHL
 *
 * Si GHL no está configurado, responde OK igual
 * (el flujo del formulario no se rompe).
 */

import { createOrUpdateContact, createAppointment } from "@/lib/ghl";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, whatsapp, email, propertyTypes, destinations, budget, date, time } = body;

    // Validación mínima
    if (!name || !whatsapp || !date || !time) {
      return Response.json({ ok: false, error: "Datos incompletos" }, { status: 400 });
    }

    const BUDGET_LABELS = {
      sub100:  "Hasta $100,000 USD",
      "100_250": "$100,000 – $250,000 USD",
      "250_500": "$250,000 – $500,000 USD",
      "500plus": "+$500,000 USD",
      unknown: "Por definir",
    };

    // 1 — Crear / actualizar contacto
    const { contactId, error: contactError } = await createOrUpdateContact({
      name,
      phone: whatsapp,
      email: email || "",
      tags: ["appointment-request"],
      source: "Caribe Privé - Formulario Cita",
      customFields: {
        property_interest:  (propertyTypes || []).join(", "),
        destination_interest: (destinations || []).join(", "),
        budget_range:       BUDGET_LABELS[budget] || budget || "",
      },
    });

    if (contactError) {
      console.warn("[submit-appointment] contacto:", contactError);
    }

    // 2 — Crear cita (solo si tenemos el contactId)
    let appointmentId = null;
    if (contactId) {
      const dateObj = new Date(date);
      const notes = [
        `Propiedad: ${(propertyTypes || []).join(", ")}`,
        `Destino: ${(destinations || []).join(", ")}`,
        `Presupuesto: ${BUDGET_LABELS[budget] || budget}`,
        `WhatsApp: ${whatsapp}`,
        email ? `Email: ${email}` : null,
      ].filter(Boolean).join("\n");

      const { appointmentId: apptId, error: apptError } = await createAppointment({
        contactId,
        date: dateObj,
        time,
        title: `Cita Caribe Privé — ${name}`,
        notes,
      });

      if (apptError) console.warn("[submit-appointment] cita:", apptError);
      appointmentId = apptId;
    }

    return Response.json({
      ok: true,
      contactId,
      appointmentId,
      ghlConfigured: !!(process.env.GHL_API_KEY && process.env.GHL_LOCATION_ID),
    });
  } catch (err) {
    console.error("[submit-appointment] error:", err);
    // Respondemos OK para no bloquear el flujo del usuario
    return Response.json({ ok: true, error: err.message, ghlConfigured: false });
  }
}
