# SellersLogin — Next.js Landing Page

Converted from `test2.html` to **Next.js 16** (App Router), **TypeScript**, and **Tailwind CSS v4**.

## Run locally

```bash
cd site
npm install
npm run dev
```

Open the local URL printed by `npm run dev`.

## What was preserved

- All sections: hero, marquee, features, product tour tabs, bento grid, process, analytics, testimonials, pricing toggle, case studies, FAQ accordion, blog, CTA, footer
- Original design tokens, animations (marquee, float, reveal, counters), custom cursor, sticky nav, mobile menu, cookie banner, back-to-top
- SEO metadata and Open Graph tags
- DM Sans via `next/font`

Original styles live in `src/styles/sellerslogin.css` so the visual design matches the HTML file exactly. Tailwind is included for the project stack and future utility use.

## Structure

- `src/app/page.tsx` — home route
- `src/components/landing/` — page sections and client interactivity
- `src/data/landing.ts` — testimonials, FAQ, features data
- `legacy/test2.html` — original HTML reference
