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

## ChinaIndia Sourcing checkout

`/payments/chinaindiasourcing` uses the existing market payment endpoints.
`NEXT_PUBLIC_CIS_PAYMENT_API_URL` can override `NEXT_PUBLIC_API_URL` if the
market uses a different backend. Set `NEXT_PUBLIC_CIS_MARKET_URL` to point
the checkout links at a local market instance. Set
`NEXT_PUBLIC_CIS_DASHBOARD_URL` to the same origin used by the ChinaIndia
Sourcing member dashboard to enable its post-payment return link.

For local development, set `NEXT_PUBLIC_SELLERSLOGIN_PAYMENT_ORIGIN` in the
market app to the local SellersLogin origin. Start SellersLogin before
testing the market's buyer or seller submission.

Buyer-lead purchases also use this route. Set the same
`CIS_LEAD_CHECKOUT_SECRET` to a strong server-side secret in both the member
dashboard and SellersLogin. Keep `CIS_DASHBOARD_URL` in the dashboard and
`NEXT_PUBLIC_CIS_DASHBOARD_URL` in SellersLogin pointed at the same origin.
