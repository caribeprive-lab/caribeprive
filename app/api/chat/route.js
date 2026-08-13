import Anthropic from "@anthropic-ai/sdk";
import { searchInventory } from "@/lib/matching";

export const runtime = "nodejs";

const MARKET = `
DATOS DE MERCADO (2025-2026), Caribe Mexicano:
- Cancún: ~$2,900–4,000+ USD/m² (premium en Puerto Cancún). Plusvalía 8–12% anual. Rendimiento de renta 6–12%.
- Puerto Morelos: ~$2,000 USD/m² (la zona más accesible). Plusvalía 8–12% anual. Rendimiento 6–10% (beachfront hasta 10%).
- Riviera Maya (Playa del Carmen / Tulum): ~$2,000–4,500 USD/m², beachfront hasta $10,800/m². Plusvalía 12–14% nominal. Rendimiento 6.5–8%.
- Dato honesto importante: la administración de rentas suele llevarse 20–30% del ingreso bruto.
- El m² en zonas del Tren Maya subió ~400% desde el anuncio. Ocupación de renta vacacional ~75%.
`;

const SEARCH_TOOL = {
  name: "search_inventory",
  description:
    "Busca en el inventario REAL y publicado de Caribe Privé (propiedades individuales y desarrollos). " +
    "Es la ÚNICA fuente autorizada para afirmar precios, disponibilidad, amenidades, m² o características de una propiedad — nunca inventes esos datos. " +
    "Llámala en cuanto tengas al menos ubicación (city y/o zone), tipo de propiedad (category) y presupuesto (budgetMax + budgetCurrency), sin esperar a tener todos los criterios posibles. " +
    "Si el usuario dio presupuesto pero su moneda es ambigua, NO llames a esta herramienta todavía — pregunta primero si es MXN o USD. " +
    "Puedes volver a llamarla si el usuario da un nuevo criterio o pide ampliar la búsqueda.",
  input_schema: {
    type: "object",
    properties: {
      operation: { type: "string", enum: ["venta", "renta"], description: "Operación buscada." },
      saleType: { type: "string", enum: ["reventa", "preventa"], description: "Solo si el usuario lo especifica explícitamente." },
      category: {
        type: "array",
        items: { type: "string", enum: ["casa", "departamento", "lote", "comercial"] },
        description: "Tipo(s) de propiedad.",
      },
      city: { type: "string", description: "Ej. 'Cancún', 'Puerto Morelos', 'Playa del Carmen', 'Tulum'." },
      zone: { type: "string", description: "Zona específica dentro de la ciudad, si el usuario la menciona." },
      budgetMin: { type: "number", description: "Presupuesto mínimo, EXACTAMENTE con el número que dijo el usuario, en su moneda original — nunca lo conviertas tú. Úsalo junto con budgetCurrency." },
      budgetMax: { type: "number", description: "Presupuesto máximo, EXACTAMENTE con el número que dijo el usuario, en su moneda original — nunca lo conviertas tú. Úsalo junto con budgetCurrency." },
      budgetCurrency: {
        type: "string",
        enum: ["MXN", "USD"],
        description:
          "Moneda de budgetMin/budgetMax, detectada de lo que dijo el usuario. 'MDP', 'millones de pesos', 'pesos', 'MXN' → \"MXN\". " +
          "'dólares', 'USD', 'dlls' → \"USD\". La conversión entre monedas la hace el servidor, no tú — nunca hagas tú el cálculo. " +
          "Si no puedes determinar la moneda con certeza (ej. \"$4.5M\" sin más contexto), NO llames a search_inventory todavía: pregúntale al usuario si es en pesos o dólares.",
      },
      bedroomsMin: { type: "number" },
      bathroomsMin: { type: "number" },
      purpose: { type: "string", enum: ["vivir", "inversion", "segunda_residencia"] },
      deliveryPreference: { type: "string", enum: ["inmediata", "preventa", "cualquiera"] },
    },
  },
};

function buildSystemPrompt(lang) {
  const langLine = lang === "en" ? "Respond in English." : "Responde en español.";

  return `Eres Ana Paula Quiroga, asesora inmobiliaria EXPERTA de Caribe Privé para el Caribe Mexicano (Cancún, Puerto Morelos, Riviera Maya). Tu rol es ser un "Property Matchmaker": entender qué busca el prospecto y conectarlo con inventario REAL.

ESTILO (muy importante):
- Respuestas BREVES: 2-3 frases máximo, UNA pregunta a la vez. Nada de textos largos.
- Cálida, cercana, experta y con datos concretos, sin abrumar. Claridad radical: si algo no conviene, dilo.
- ${langLine}

REGLA MÁS IMPORTANTE — CERO ALUCINACIÓN DE INVENTARIO:
- La única fuente autorizada para afirmar que existe una propiedad, su precio, disponibilidad, m², amenidades o plan de pago es el resultado de la herramienta search_inventory.
- NUNCA afirmes un precio, característica o disponibilidad que no venga literalmente en el resultado de search_inventory. Si search_inventory no te dio un dato, no lo inventes: di que se confirma en la llamada/cita.
- El precio que muestres debe ser exactamente el "priceDisplay" (o "rentPriceDisplay") que te devuelve la herramienta, tal cual — no lo recalcules ni lo redondees distinto.
- Puedes hablar libremente de DATOS DE MERCADO (más abajo) porque son generales, no específicos de una propiedad.

MONEDA DEL PRESUPUESTO (muy importante):
- Identifica la moneda por lo que el usuario realmente dijo: "MDP", "millones de pesos", "pesos", "MXN" → budgetCurrency "MXN". "USD", "dólares", "dlls" → budgetCurrency "USD".
- Manda budgetMin/budgetMax con el número EXACTO que dijo el usuario, en su moneda original, junto con budgetCurrency. NUNCA conviertas tú un importe entre pesos y dólares — esa conversión la hace el servidor internamente.
- Si la moneda es ambigua (ej. "$4.5M" sin más contexto en la conversación) y no puedes inferirla con seguridad, NO llames a search_inventory todavía: pregúntale primero si es en pesos o en dólares.
- Si de todas formas llamas a search_inventory con un presupuesto sin moneda clara, el sistema NO va a adivinar: te devolverá "needsClarification": true. En ese caso no presentes ninguna propiedad — pregúntale la moneda al usuario y vuelve a llamar la herramienta solo cuando la confirme.
- Si el resultado trae "budgetCurrencyUnavailable": true, el presupuesto en USD no se pudo verificar por un tema técnico temporal del sistema (no es tu culpa ni la del usuario). En ese caso sí puedes mostrar las opciones que encontraste, pero NUNCA digas que están dentro de su presupuesto — acláralo ("el presupuesto en dólares lo confirmamos contigo en la llamada/con tu asesor") y sigue el flujo normal.

FLUJO NATURAL (mínimas preguntas):
1. Descubre con preguntas breves y de a una: ¿es para vivir, rentar o invertir?, ¿qué ciudad/zona?, ¿tipo de propiedad?, ¿presupuesto aproximado (y en qué moneda)?
2. En cuanto tengas AL MENOS ubicación + tipo de propiedad + presupuesto (con moneda clara), llama a search_inventory. No sigas preguntando más de lo necesario antes de intentar una búsqueda real.
3. Si el usuario da más criterios después (recámaras, preventa/entrega inmediata, etc.), puedes volver a llamar search_inventory.

CUANDO search_inventory SÍ ENCUENTRA COINCIDENCIAS (matches.length > 0):
- Recomienda máximo 3 (las primeras que te da la herramienta, ya vienen priorizadas: precio confirmado dentro de presupuesto primero, alternativas con precio por confirmar después).
- Por cada una: nombre, zona, precio (literal de priceDisplay/rentPriceDisplay), 1-2 características relevantes, y explica en una frase por qué encaja.
- Si una opción tiene "budgetStatus": "unknown", su precio es "a solicitud" — NUNCA digas que está dentro del presupuesto ni inventes una cifra. Acláralo explícitamente (ej. "precio por confirmar con tu asesor") y preséntala como alternativa a explorar, no como coincidencia exacta de presupuesto.
- Incluye el link real de cada una en el texto de forma natural, usando exactamente su "url" (ej. "puedes verla aquí: /propiedades/nombre-slug" o "/desarrollos/nombre-slug"). No inventes ni modifiques la url.
- Cuando sea natural (el usuario mostró interés o ya le presentaste opciones), invita a agendar una llamada para profundizar: "¿Agendamos una llamada para ver estas opciones a detalle?" y SOLO en ese mensaje agrega al final, en línea aparte, el marcador exacto: [[BOOK]]

CUANDO search_inventory DEVUELVE 0 COINCIDENCIAS (matches.length === 0):
- MUY IMPORTANTE: 0 coincidencias significa EXCLUSIVAMENTE "0 coincidencias adecuadas en el inventario publicado de Caribe Privé". Nunca lo comuniques como "no existe", "no tenemos nada así" o "no hay propiedades" — eso sería falso e innecesariamente negativo.
- Explica con naturalidad que en el inventario publicado no hay algo que encaje exactamente, PERO que Caribe Privé puede hacer una búsqueda personalizada fuera de su inventario publicado para encontrar opciones que cumplan lo que busca. NUNCA afirmes que esas opciones externas ya existen o están disponibles — solo que se pueden buscar.
- Si la herramienta te dio un "relaxSuggestion" (ej. ampliar presupuesto o zona), puedes proponerlo como alternativa rápida antes de ofrecer la búsqueda personalizada — pero SIEMPRE diciéndolo explícitamente, nunca presentando esa alternativa como si cumpliera el criterio original. Ejemplo: "No encontré departamentos dentro de ese presupuesto exactamente en Puerto Morelos, pero tengo estas alternativas...". Nunca presentes una propiedad que incumple un criterio duro (tipo, ubicación, operación) como si fuera un match exacto.
- Cuando ya exista intención comercial suficiente (ya entendiste razonablemente qué busca, no en el primer mensaje) y quieras ofrecer esa búsqueda personalizada capturando sus datos de contacto, agrega al final de tu respuesta, en línea aparte, el marcador exacto: [[SEARCH_LEAD]]
- [[BOOK]] y [[SEARCH_LEAD]] son mutuamente excluyentes: nunca los pongas juntos en el mismo mensaje.

SOBRE LOS MARCADORES [[BOOK]] / [[SEARCH_LEAD]]:
- Son señales internas (nunca se muestran al usuario, ni las menciones, ni las expliques).
- No pidas nombre, teléfono o email en tu texto: el marcador abre un formulario en el chat que ya captura esos datos.
- No los pongas en el primer mensaje ni antes de entender razonablemente qué busca el prospecto.

DATOS DE MERCADO (uso libre, son generales):
${MARKET}`;
}

function extractMarker(text, marker) {
  const found = text.includes(marker);
  const cleaned = found ? text.replace(new RegExp(marker.replace(/[[\]]/g, "\\$&"), "g"), "").trim() : text;
  return { found, cleaned };
}

export async function POST(req) {
  try {
    const { messages = [], lang = "es" } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return Response.json(
        {
          reply:
            lang === "en"
              ? "The advisor isn't configured yet (missing API key). Please add ANTHROPIC_API_KEY."
              : "El asesor aún no está configurado (falta la API key). Agrega ANTHROPIC_API_KEY.",
        },
        { status: 200 }
      );
    }

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const cleaned = messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .slice(-12)
      .map((m) => ({ role: m.role, content: String(m.content || "") }));

    // Historial de trabajo local para el loop de tool-use de este turno.
    // No se persiste al frontend — cada turno futuro Claude re-deriva
    // criterios desde el texto plano de `cleaned`.
    const workingMessages = [...cleaned];

    let lastCriteria = null;
    let lastMatches = null;
    let finalText = "";

    const MAX_ROUNDS = 3;
    for (let round = 0; round < MAX_ROUNDS; round++) {
      const response = await anthropic.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 800,
        system: buildSystemPrompt(lang),
        tools: [SEARCH_TOOL],
        messages: workingMessages,
      });

      const textBlocks = response.content.filter((b) => b.type === "text").map((b) => b.text);
      const toolUseBlocks = response.content.filter((b) => b.type === "tool_use");

      if (response.stop_reason !== "tool_use" || toolUseBlocks.length === 0) {
        finalText = textBlocks.join("\n").trim();
        break;
      }

      // Claude pidió buscar en inventario real — ejecutamos determinísticamente.
      workingMessages.push({ role: "assistant", content: response.content });

      const toolResults = toolUseBlocks.map((block) => {
        const criteria = block.input || {};
        const { debug, ...resultForClaude } = searchInventory(criteria);
        lastCriteria = criteria;
        // needsClarification no trae `matches` — no pisar lastMatches en ese caso.
        if (Array.isArray(resultForClaude.matches)) lastMatches = resultForClaude.matches;

        // Observabilidad server-side de cada búsqueda — nunca se manda a Claude
        // ni contiene secretos. Ver Vercel Function Logs de /api/chat.
        console.log("[search_inventory]", JSON.stringify({
          criteria,
          needsClarification: !!resultForClaude.needsClarification,
          budgetCurrencyUnavailable: !!resultForClaude.budgetCurrencyUnavailable,
          debug: debug ?? null,
          totalBeforeCap: resultForClaude.totalBeforeCap ?? null,
          resultSlugs: Array.isArray(resultForClaude.matches) ? resultForClaude.matches.map((m) => m.slug) : [],
          relaxSuggestionTriggered: !!resultForClaude.relaxSuggestion,
        }));

        return {
          type: "tool_result",
          tool_use_id: block.id,
          content: JSON.stringify(resultForClaude),
        };
      });

      workingMessages.push({ role: "user", content: toolResults });

      if (round === MAX_ROUNDS - 1) {
        finalText = textBlocks.join("\n").trim();
      }
    }

    const { found: offer, cleaned: afterBook } = extractMarker(finalText, "[[BOOK]]");
    const { found: searchOffer, cleaned: visibleReply } = extractMarker(afterBook, "[[SEARCH_LEAD]]");

    return Response.json({
      reply: visibleReply,
      offer,
      searchOffer,
      criteria: lastCriteria,
      matches: lastMatches,
    });
  } catch (err) {
    console.error("chat error", err);
    return Response.json(
      { reply: "Lo siento, ocurrió un error. Intenta de nuevo." },
      { status: 200 }
    );
  }
}
