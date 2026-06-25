# Newstate Realty — Microsite

Real estate advisory para el Caribe Mexicano (Cancún, Puerto Morelos, Riviera Maya).
Next.js 14 (App Router) · Tailwind CSS · Framer Motion · Chatbot con IA de Claude · Bilingüe ES/EN.

## Puesta en marcha (en tu Mac)

> Nota: la carpeta trae un `node_modules` generado en Linux (sandbox). **Bórralo y reinstala** para tener los binarios correctos de macOS:

```bash
rm -rf node_modules
npm install
```

Crea tu archivo de variables de entorno a partir del ejemplo:

```bash
cp .env.example .env.local
# edita .env.local y pega tu ANTHROPIC_API_KEY
```

Arranca en desarrollo:

```bash
npm run dev      # http://localhost:3000
```

Build de producción:

```bash
npm run build && npm start
```

## El chatbot (asesor con IA)

- Endpoint: `app/api/chat/route.js` → usa el SDK de Anthropic con el modelo `claude-sonnet-4-6`.
- Necesita `ANTHROPIC_API_KEY` (consíguela en https://console.anthropic.com).
- El contexto (filosofía de Newstate, datos de mercado y propiedades) se arma en ese mismo archivo.
- Sin la key, el chat sigue abriendo y responde con un aviso de "falta configurar".

## Agregar una propiedad (replicar)

Todo vive en **`lib/properties.js`**. Para una propiedad nueva:

1. Copia el objeto de `mukta-residencial`.
2. Cambia `slug`, textos, imágenes y datos.
3. Guárdalo. El **card** en el grid y su **landing** en `/propiedades/<slug>` se generan solos.

Cada texto es bilingüe: `{ es: "...", en: "..." }`.

## Estructura

```
app/
  layout.jsx                 fuentes, metadata, idioma
  page.jsx                   home
  propiedades/[slug]/page.jsx  landing de propiedad (estática por slug)
  api/chat/route.js          asesor con IA de Claude
components/                  Nav, Hero, Problem, Pledge, Fronts, Properties,
                            Market, CTA, Footer, Chat, PropertyView, Reveal
lib/
  i18n.js                    diccionario ES/EN
  properties.js              ARCHIVO DE DATOS de propiedades
public/                      logos y favicon
```

## Idioma

`components/LanguageProvider.jsx` mantiene el idioma (persiste en localStorage).
Toggle ES/EN en el nav. Los textos salen del diccionario `lib/i18n.js`.

## Tipografía

Títulos en **Coolvetica Condensed** (vía `@font-face` en `globals.css`), con **Barlow Condensed**
(Google Fonts) como respaldo. Cuerpo en **Inter**. Para máxima fiabilidad puedes
auto-alojar el `.woff2` de Coolvetica en `/public/fonts` y apuntar el `@font-face` ahí.

## Deploy a Vercel

1. Sube el repo a GitHub (`git init`, commit, push).
2. En Vercel → New Project → importa el repo.
3. En **Settings → Environment Variables** agrega `ANTHROPIC_API_KEY`.
4. Deploy. (Framework detectado: Next.js, sin configuración extra.)

## Espejo "Caribe Privé"

La marca y la paleta están centralizadas (logos en `/public`, colores en `tailwind.config.js`,
fuente en `globals.css`). Para el espejo basta duplicar el proyecto, cambiar logos, color y el
set de datos de `lib/properties.js`.

---

Nota legal: las imágenes y datos de **Mukta** (Grupo Daxi) se usan como muestra de la plantilla.
Para producción, usa propiedades propias o con permiso del desarrollador.
