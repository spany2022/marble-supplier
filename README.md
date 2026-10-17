# Velmora Stone Gallery — premium marble, granite & tile supplier demo

Next.js 16 (App Router, TypeScript) · Tailwind CSS 4 · GSAP + ScrollTrigger · Lenis · Lucide.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Pages

| Route | What it is |
| --- | --- |
| `/` | The 10-section homepage (hero → intro → collections → art of stone → product discovery → process → inspiration gallery → why us → enquiry → final CTA/footer) |
| `/collections` | Full catalogue with category tabs, search and colour / finish / application filters (state is mirrored in the URL, so filtered views are shareable) |
| `/collections/[slug]` | One page per collection (marble, italian-marble, granite, designer-tiles, kota-stone, tile-showroom) |
| `/products/[slug]` | Product detail: gallery, spec table, Request a Quote (prefills the form), related materials |
| `/about`, `/contact` (+ `#showroom`), `/privacy`, `/credits` | Supporting pages |
| `POST /api/enquiry` | Validated enquiry endpoint (honeypot, rate limit, size limit) |

## Before this goes live — nothing here is invented, so these are blank

1. **`src/content/business.ts`** — brand name (`Velmora Stone Gallery` is a placeholder), phone, WhatsApp, email, showroom address, hours, social links. Every `null` renders as a dashed "to be supplied" chip. Set `verified: true` once confirmed to switch on LocalBusiness JSON-LD.
   - Adding a WhatsApp number automatically turns on WhatsApp buttons (enquiry panel, product pages, post-submit hand-off).
2. **`src/content/catalogue.ts`** — the 25 products are **sample listings** built only from what the reference photos show. Replace with real stock; fill `finish`, `size`, `thickness` only where confirmed (`null` shows "On request"). Then set `CATALOGUE_IS_SAMPLE = false` to remove the sample notices. Prices are never shown — every product uses Request Price.
   - Dimension / thickness / price-range filters were deliberately left out because there is no real data for them yet. Add them to `ProductBrowser.tsx` once the catalogue has values.
3. **`src/content/media.ts`** — photography is illustrative: stone textures from Wikimedia Commons (licences in `src/content/image-credits.json`, listed on `/credits`), interiors from Unsplash. Swap in the business's own photos.
4. **`src/content/gallery.ts`** — all items are `kind: "inspiration"`. Add genuine completed work with `kind: "project"`; it gets an "Our project" badge so the two are never confused.
5. **Enquiry delivery** — set `ENQUIRY_WEBHOOK_URL` (Zapier/Make/Slack/CRM webhook). Without it, enquiries are validated and acknowledged but **not delivered anywhere**. Submitted details are never written to logs.
6. **Why-us section** (`WhyUs.tsx`) — add delivery, installation, bulk orders, warranties or years of experience only once verified.
7. **Privacy policy** — template text; have it reviewed for the business's jurisdiction (e.g. India's DPDP Act).
8. Set `NEXT_PUBLIC_SITE_URL` for canonical URLs, sitemap and Open Graph.

## Motion & accessibility notes

- Desktop (≥1024px, motion allowed): pinned horizontal collections scroll, pinned texture "wipe" theatre, sticky process image stack, parallax, masked headline reveals, magnetic CTAs, card tilt.
- Mobile/tablet: swipe row for collections, stacked imagery, no pointer effects.
- `prefers-reduced-motion`: Lenis and all GSAP motion are off and pinned sections fall back to static grids.
- Native `<dialog>` lightbox (keyboard arrows, Esc, focus return), focus-trapped mobile menu, skip link, labelled form fields with inline errors and focus on the first invalid field.
- Framer Motion and Three.js were intentionally not added — GSAP covers every effect used and nothing here benefits from 3D.
