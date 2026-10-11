# BJ100 (The Brice Jernigan Memorial 100) — Next.js Edition

> **100 Miles. Two Disciplines. One Unbreakable Promise.**  
> A premier 100-mile endurance showdown pitting **Ultra Trail Runners** against **Mountain Bikers** in San Diego's Los Peñasquitos Canyon (PQ Canyon) to raise money for suicide prevention in honor of Brice Jernigan.

Built with **Next.js (App Router)** & **React 19**.

---

## 📅 Two Official Course Variations

This branch (`course-topo-map`) provides interactive toggles for both course editions:

### 1. 🌸 April 20 Spring Edition *(New!)*
- **Race Date:** Monday, April 20
- **Aid Station Spacing:** Strictly calibrated between **6 to 10 miles apart** (average 8.1 miles).
- **Two 13-Mile Wilderness Crucibles:**
  - **Crucible #1 (Mile 16.0 ➔ 29.0):** Carson's Crossing to Del Mar Mesa Ridge (13.0 Miles). Mandatory 2L hydration carry, no crew access.
  - **Crucible #2 (Mile 45.0 ➔ 58.0):** Canyonside Central to Miner's Ridge Base (13.0 Miles). Mountain vert climb, mandatory headlamp inspection.
- **Aid Stations:** 10 fully staffed stations + Start/Finish with complete cutoffs and provision schedules.
- **GPX:** Includes dedicated [`public/BJ100_April20_Course.gpx`](public/BJ100_April20_Course.gpx).

### 2. 🍂 October Fall Edition
- **Race Date:** October 24-25
- **Format:** 4 x 25-Mile Quad Circuit with 8 evenly distributed aid stations.
- **GPX:** Includes [`public/BJ100_Official_Course.gpx`](public/BJ100_Official_Course.gpx).

---

## 🗺️ Cartographic & Topo Map Features

- **Master View Switcher:** Toggle between **Aid Station Spacing Table**, **Topographical Trail Map View**, and **Elevation Profile Graph**.
- **Interactive Waypoints Dossier:** Real-time elevation badges and route descriptions for Carson's Crossing, Peñasquitos Waterfall, Del Mar Mesa Tunnels, Black Mountain Summit (1,554 ft), and Brice's Memorial Lookout Bench.
- **Direct GPX Downloads:** Garmin, Wahoo, and Coros compatible GPS files.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
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

## 🎗️ Crisis Resources

If you or someone you love is struggling, free and confidential support is available 24/7:
- **Call or Text:** [988](tel:988) (988 Suicide & Crisis Lifeline)
- **Text HOME to:** 741741 (Crisis Text Line)
- **San Diego Access & Crisis Line:** (888) 724-7240
