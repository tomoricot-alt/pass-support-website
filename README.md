# Pass Support website

Astro static migration of the approved STUDIO HOME `/2`, COMPANY `/company-1`, SERVICE `/service-1-1` and existing NEWS/contact pages.

## Build and deploy
- Node.js 22; `npm ci && npm run build`; output `dist`.
- Cloudflare Pages: production branch `main`; build command `npm run build`; output directory `dist`; Node version `22`.
- `functions/api/contact.ts` is a Pages Function. Configure encrypted `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` before enabling live contact delivery. No secrets are committed.
- The preview is intentionally noindex; DNS and STUDIO publishing are unchanged.

## Editing
`src/content/pages/*.html` retains the source page layout and responsive declarations. Text and layout can be edited there. Three article files are under `src/content/pages/posts/`; preserve their slugs. The shared renderer is `src/pages/[...path].astro`; interaction code is `src/scripts/site.ts`.

`assets.json` lists original image sources and local filenames. The build downloads them into the deployment, so rendered pages do not depend on Studio's runtime or image host. Original webfont licenses do not automatically transfer: Japanese system font fallbacks are used. Confirm independent font licensing before restoring proprietary fonts.

## Outstanding validation
- Browser comparison at desktop/tablet/iPhone widths and page transition timing must be completed on the deployed preview.
- Contact provider credentials, delivery destination verification, and end-to-end delivery are not yet completed. The endpoint returns 503 until configured and never claims a successful send.
- Original mobile menu appearance needs comparison; implemented accessible dialog navigation.
