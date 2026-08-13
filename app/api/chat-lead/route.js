/**
 * POST /api/chat-lead
 *
 * Guarda en GHL el lead capturado dentro del chatbot (Property Matchmaker).
 * Recibe datos estructurados — nunca reconstruye criterios ni resultados
 * de matching desde texto libre; ambos ya vienen calculados por el
 * servidor en /api/chat (lib/matching.js::searchInventory).
 *
 * - name obligatorio + al menos un medio de contacto (phone o email).
 * - Rellena tipo_de_propiedad_de_inters / destino_de_inters /
 *   presupuesto_del_lead cuando se pueden derivar de `criteria`.
 * - datos_informativos = resumen comercial corto (criterios + qué se
 *   mostró), NUNCA el transcript completo.
 * - El transcript completo se guarda aparte como nota del contacto,
 *   después de crear/actualizar el contacto.
 */
import { createOrUpdateContact, addNoteToContact } from "@/lib/ghl";
import { PROP_SLUGS, DEST_SLUGS, CATEGORY_TO_PROPERTY_LABEL } from "@/lib/ghlMappings";

export const runtime = "nodejs";

function norm(s) {
  return (s || "")
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

// Busca `value` (texto libre, ej. criteria.city) entre las keys de un mapa
// tipo DEST_SLUGS/PROP_SLUGS (etiquetas con acentos) y regresa el slug de GHL.
function slugFromLabelMap(map, value) {
  if (!value) return undefined;
  const target = norm(value);
  const key = Object.keys(map).find((k) => norm(k) === target || norm(k).includes(target) || target.includes(norm(k)));
  return key ? map[key] : undefined;
}

function propSlugFromCriteria(criteria) {
  const category = criteria?.category?.[0];
  if (!category) return undefined;
  const label = CATEGORY_TO_PROPERTY_LABEL[category];
  return label ? PROP_SLUGS[label] : undefined;
}

function destSlugFromCriteria(criteria) {
  return slugFromLabelMap(DEST_SLUGS, criteria?.city) || slugFromLabelMap(DEST_SLUGS, criteria?.zone);
}

// Claude no siempre respeta el tipo declarado en el tool schema (a veces manda
// budgetMax como string, decimal o un valor fuera de rango). Si el campo
// Monetary de GHL recibe algo que no puede castear, rechaza el upsert COMPLETO
// (no solo el campo) y el contacto entero se pierde — de ahí el saneo estricto.
function sanitizeBudget(value) {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.round(n) : null;
}

const CATEGORY_LABELS = { casa: "Casa", departamento: "Departamento", lote: "Terreno", comercial: "Local Comercial" };
const OPERATION_LABELS = { venta: "Venta", renta: "Renta" };
const PURPOSE_LABELS = { vivir: "Vivir", inversion: "Inversión", segunda_residencia: "Segunda residencia" };

function buildCriteriaSummary(criteria) {
  if (!criteria) return null;
  const lines = [];
  if (criteria.operation) lines.push(`Operación: ${OPERATION_LABELS[criteria.operation] || criteria.operation}`);
  if (criteria.category?.length) {
    lines.push(`Tipo: ${criteria.category.map((c) => CATEGORY_LABELS[c] || c).join(", ")}`);
  }
  if (criteria.city || criteria.zone) {
    lines.push(`Ubicación: ${[criteria.zone, criteria.city].filter(Boolean).join(", ")}`);
  }
  if (criteria.budgetMin != null || criteria.budgetMax != null) {
    const min = criteria.budgetMin != null ? `$${Number(criteria.budgetMin).toLocaleString("en-US")}` : null;
    const max = criteria.budgetMax != null ? `$${Number(criteria.budgetMax).toLocaleString("en-US")}` : null;
    lines.push(`Presupuesto: ${[min, max].filter(Boolean).join(" – ")}`);
  }
  if (criteria.bedroomsMin != null) lines.push(`Recámaras mín: ${criteria.bedroomsMin}`);
  if (criteria.purpose) lines.push(`Propósito: ${PURPOSE_LABELS[criteria.purpose] || criteria.purpose}`);
  if (criteria.deliveryPreference && criteria.deliveryPreference !== "cualquiera") {
    lines.push(`Entrega: ${criteria.deliveryPreference}`);
  }
  return lines.length ? lines.join("\n") : null;
}

function buildDatosInformativos({ criteria, matches }) {
  const parts = ["Lead capturado vía chatbot web (Property Matchmaker)."];

  const criteriaSummary = buildCriteriaSummary(criteria);
  if (criteriaSummary) parts.push(criteriaSummary);

  if (Array.isArray(matches) && matches.length > 0) {
    parts.push(`Propiedades mostradas: ${matches.map((m) => m.name).join(", ")}`);
  } else {
    parts.push("0 coincidencias adecuadas en inventario publicado — oportunidad de búsqueda personalizada");
  }

  return parts.join("\n");
}

export async function POST(req) {
  try {
    const body = await req.json();
    const name = body.name || "";
    const phone = body.phone || "";
    const email = body.email || "";
    const criteria = body.criteria || null;
    const matches = Array.isArray(body.matches) ? body.matches : [];
    const transcript = body.transcript || "";

    if (!name.trim() || (!phone.trim() && !email.trim())) {
      return Response.json({ ok: false, error: "Faltan datos" }, { status: 400 });
    }

    const hasMatches = matches.length > 0;
    const tags = ["chatbot-lead", ...(hasMatches ? [] : ["busqueda-personalizada"])];
    const datosInformativos = buildDatosInformativos({ criteria, matches });

    const propSlug = propSlugFromCriteria(criteria);
    const destSlug = destSlugFromCriteria(criteria);
    const budgetAmount = sanitizeBudget(criteria?.budgetMax ?? criteria?.budgetMin);

    let { contactId, error } = await createOrUpdateContact({
      name,
      phone,
      email,
      tags,
      source: "Caribe Privé - Chatbot Web",
      customFields: {
        ...(propSlug && { tipo_de_propiedad_de_inters: propSlug }),
        ...(destSlug && { destino_de_inters: destSlug }),
        ...(budgetAmount != null && { presupuesto_del_lead: budgetAmount }),
        datos_informativos: datosInformativos,
      },
    });

    // Un customField con un valor que GHL rechaza (ej. Monetary con tipo
    // inesperado) puede tumbar el upsert COMPLETO y perder el lead entero.
    // Reintentamos con el mínimo indispensable para no perderlo nunca.
    if (!contactId) {
      console.error("[chat-lead] createOrUpdateContact falló con customFields, reintentando sin ellos:", error);
      ({ contactId, error } = await createOrUpdateContact({
        name,
        phone,
        email,
        tags,
        source: "Caribe Privé - Chatbot Web",
        customFields: { datos_informativos: datosInformativos },
      }));
      if (!contactId) {
        console.error("[chat-lead] createOrUpdateContact falló también en el reintento:", error);
      }
    }

    if (contactId && transcript) {
      await addNoteToContact(contactId, `Conversación completa — Chatbot Caribe Privé\n\n${transcript}`);
    }

    return Response.json({ ok: true, contactId, error: contactId ? null : error });
  } catch (err) {
    console.error("[chat-lead] error:", err);
    return Response.json({ ok: true, error: err.message });
  }
}
