// ============================================================
//  MAPEOS COMPARTIDOS → CUSTOM FIELDS DE GHL
//
//  Única fuente de verdad para traducir valores internos del sitio
//  a los slugs exactos que esperan los dropdowns personalizados de
//  GoHighLevel (tipo_de_propiedad_de_inters, destino_de_inters).
//
//  Usado por:
//    - app/api/submit-appointment/route.js (form de /agendar)
//    - app/api/chat-lead/route.js (chatbot)
//
//  Los valores deben coincidir EXACTO con las opciones configuradas
//  en GHL. No cambiar sin verificar ahí primero.
// ============================================================

// Etiqueta del formulario (AppointmentForm.jsx) → slug del dropdown en GHL
export const PROP_SLUGS = {
  "Departamento": "departamento",
  "Casa / Villa": "casa",
  "Terreno": "terreno",
  "Local Comercial": "local_comercial",
  "Preventa": "otro",
};

// Destino (AppointmentForm.jsx) → slug del dropdown en GHL
export const DEST_SLUGS = {
  "Cancún": "cancún",
  "Puerto Morelos": "puerto_morelos",
  "Playa del Carmen": "playa_del_carmen",
  "Tulum": "tulum",
  "Riviera Maya": "otro",
};

// Puente entre el vocabulario de datos del sitio (lib/properties.js /
// lib/developments.js → category: "casa"|"departamento"|"lote"|"comercial")
// y las etiquetas de PROP_SLUGS, que usan el texto del formulario.
// Solo lo usa el chatbot (chat-lead), que recibe `category` de
// search_inventory, no la etiqueta del formulario.
export const CATEGORY_TO_PROPERTY_LABEL = {
  casa: "Casa / Villa",
  departamento: "Departamento",
  lote: "Terreno",
  comercial: "Local Comercial",
};
