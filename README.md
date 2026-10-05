# PRAVAH Command — Early Warning & Decision Support System

> **SIH 2026 / SIH26192** | Multi-source Hydrological Early Warning & Disaster Response Coordination System  
> **District Emergency Operations Centre (EOC) — East Khasi Hills, Meghalaya**

---

## 📌 Overview

**PRAVAH** is an operational, geospatial decision-support command dashboard engineered for District Disaster Management Authorities (DDMA), Emergency Operations Centers (EOC), and the National Disaster Response Force (NDRF). 

The platform integrates multi-source telemetry—Automated Weather Stations (IMD AWS), in-situ river gauges (CWC), geotechnical slope failure indicators, and crowd-sourced citizen reports—to demonstrate hyper-local, explainable flash flood and slope-failure risk assessment with an intended 15-minute to 2-hour decision-support horizon.

---

## 🚀 Key Modules & Capabilities

1. **Tactical Command Overview (`/command`)**: Unified demo operations center displaying KPIs, high-risk sector alerts, GIS context, and telemetry simulation controls.
2. **Live Risk Map & GIS (`/map`)**: Interactive GIS view of prototype flood-risk zones, slope-risk buffers, sensor telemetry nodes, and NDRF team positions.
3. **Flood & Slope Forecast (`/forecast`)**: 15m to 2hr projection scrubber, simulated hydrograph thresholds, soil-moisture indicators, and village forecast matrix.
4. **Hyper-Local Risk Assessment (`/risk`)**: Explainable AI multi-criteria risk scoring factoring rainfall accumulation, DEM slope gradient, Topographic Wetness Index (TWI), and stream proximity.
5. **NDRF Tactical Deployment Priority Engine (`/ndrf`)**: Demo battalion staging rosters, transit ETA context, and stateful operational-order simulation.
6. **Relief Camp Resources & Logistics Allocation (`/resources`)**: Shelter capacity tracking, ration buffers, potable water supply tankers, and IAF air reconnaissance requisition.
7. **Evacuation Route & Road Accessibility Matrix (`/roads`)**: Highway status tracking (SH-11 cut at Km 18, NH-40, NH-6), PWD debris clearance ETAs, and green detour corridors.
8. **Catchment Basin & Downstream Cascade (`/catchment`)**: Upstream cloudburst runoff routing down to steep gorges and downstream floodplain early warnings (Shella & Bholaganj).
9. **Emergency Alert & Warning Dispatch Center (`/alerts`)**: CAP-style broadcast composer that records prototype alerts and selected channels in application state.
10. **Statutory Situation Report (SitRep) Generator (`/sitrep`)**: One-click automated situation report synthesizer conforming to NDMA & Ministry of Home Affairs (MHA) NIC formats.
11. **Citizen & Field Officer Ground Truth Intake (`/reports`)**: Crowdsourced/field report intake queue with local verification state and tactical review workflow.
12. **System Feeds & IoT Telemetry Health (`/system`)**: Sensor telemetry pings, upstream API integrations (IMD, CWC, PWD), and network connectivity monitors.
13. **Role-Based Admin Panel (`/admin`)**: Demo-authenticated configuration console for endpoint placeholders and system settings.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Mapping & GIS**: Leaflet, React-Leaflet, OpenStreetMap tiles
- **State Management**: Zustand (real-time telemetry simulation and persistent cache)
- **Styling**: Tailwind CSS, Utilitarian Public-Sector Command Design System (WCAG AA/AAA compliant)
- **Icons**: Lucide React

---

## ⚡ Quick Start

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/ShounaksHub/pravah_flashflood_safety.git
cd pravah_flashflood_safety

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 🏛️ Prototype Governance & Data Status

This repository is an **MVP / operational prototype**. The current application uses mock telemetry, simulated sensor progression, illustrative risk calculations, and demo endpoint placeholders to demonstrate the intended workflow.

- Risk outputs are **prototype decision-support values**, not validated operational forecasts.
- External IMD/CWC/PWD/NDRF ingestion and message gateways are **not connected** in this repository.
- Alert and SitRep flows demonstrate the intended approval workflow but do not transmit real emergency messages.
- NDRF deployment recommendations are **AI-assisted prototype recommendations**; final action remains with authorized officials.
- CAP and statutory governance concepts are represented at workflow level and require production integration and formal validation before operational use.

---

## 📄 License

Developed for the Smart India Hackathon (SIH). Distributed under the MIT License.
