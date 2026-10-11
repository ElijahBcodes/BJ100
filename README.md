# BJ100 (The Brice Jernigan Memorial 100) — Next.js & React Edition

> **100 Miles. Two Disciplines. One Unbreakable Promise.**  
> A premier 100-mile endurance showdown pitting **Ultra Trail Runners** against **Mountain Bikers** in San Diego's Los Peñasquitos Canyon (PQ Canyon) to raise money for suicide prevention in honor of Brice Jernigan.

Built with **Next.js (App Router)** & **React 19**.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Run local dev server
npm run dev

# 3. Open in browser
# Visit http://localhost:3000
```

To create an optimized production build:
```bash
npm run build
npm run start
```

---

## ⚡ Deployment to Vercel / Next.js

This branch is 100% standard Next.js App Router. You can deploy it in seconds:

1. Import this repository [`ElijahBcodes/BJ100`](https://github.com/ElijahBcodes/BJ100) into [Vercel](https://vercel.com).
2. Set the Branch to `react-nextjs`.
3. Vercel automatically detects Next.js (`npm run build`). Click **Deploy**!

---

## 🧩 React Component Architecture

- `src/app/page.jsx` — Main reactive controller managing donations, tributes, and modals.
- `src/app/layout.jsx` — Root layout with Open Graph metadata and Google Fonts (`Outfit`, `Plus Jakarta Sans`, `Rock Salt`).
- `src/app/globals.css` — Custom canyon-sunset design tokens, glassmorphism, responsive grid.
- `src/components/CrisisBar.jsx` — 24/7 Suicide Prevention banner & quick-dial 988.
- `src/components/Header.jsx` — Responsive navigation with animated bike spoke logo.
- `src/components/Hero.jsx` — Hero section with dynamic countdown and live stats bar.
- `src/components/PromiseMemorial.jsx` — Heart of the race honoring Brice's life in PQ Canyon.
- `src/components/ShowdownSection.jsx` — Saturday Spokes vs. Sunday Treads breakdown.
- `src/components/CalculatorSection.jsx` — Interactive "Brice Index" Showdown Calculator with dual sliders & equalizer.
- `src/components/CourseSection.jsx` — 4-segment PQ Canyon course elevation switcher with interactive SVG profiles.
- `src/components/RaceParty.jsx` — Brice's Big Race Party festival features.
- `src/components/FundraiserSection.jsx` — Suicide prevention fund meter and interactive 100-mile dedication grid.
- `src/components/TributeSection.jsx` — Filterable community tribute wall with persistence.
- `src/components/RegistrationSection.jsx` — Registration categories & showdown opt-in.
- `src/components/FAQSection.jsx` — Collapsible interactive accordion.
- `src/components/CrisisCallout.jsx` — 24/7 crisis support contact banner.
- `src/components/Modals.jsx` — Registration, Donation, Tribute, Sponsor-a-mile, and Crisis support dialogs.

---

## 🎗️ Crisis Resources

If you or someone you love is struggling, free and confidential support is available 24/7:
- **Call or Text:** [988](tel:988) (988 Suicide & Crisis Lifeline)
- **Text HOME to:** 741741 (Crisis Text Line)
- **San Diego Access & Crisis Line:** (888) 724-7240
