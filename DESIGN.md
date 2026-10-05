---
name: Operational Geospatial Command
project: FlashSafe Disaster Early Warning Dashboard
projectId: '6027706869176708848'
deviceType: DESKTOP
colorMode: LIGHT
roundness: ROUND_FOUR
customColor: '#1e40af'
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#444653'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#757684'
  outline-variant: '#c4c5d5'
  surface-tint: '#3755c3'
  primary: '#00288e'
  on-primary: '#ffffff'
  primary-container: '#1e40af'
  on-primary-container: '#a8b8ff'
  inverse-primary: '#b8c4ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#273548'
  on-tertiary: '#ffffff'
  tertiary-container: '#3e4c60'
  on-tertiary-container: '#aebcd4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b8c4ff'
  on-primary-fixed: '#001453'
  on-primary-fixed-variant: '#173bab'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#d5e3fc'
  tertiary-fixed-dim: '#b9c7df'
  on-tertiary-fixed: '#0d1c2e'
  on-tertiary-fixed-variant: '#3a485b'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  label-lg:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.04em
  data-tabular:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  space-2xs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  gutter: 0.75rem
  gutter-desktop: 1rem
  margin: 0.75rem
  margin-desktop: 1rem
---

# FlashSafe Disaster Early Warning Dashboard — Design System Specification

## 1. Brand & Style Philosophy

The **FlashSafe Disaster Early Warning Dashboard** design system is engineered specifically for emergency operations centers (EOC), District Disaster Management Authorities (DDMA), state relief commissioners, and field administrative officers managing flash floods, cloudbursts, and landslides across high-risk terrain.

The design language prioritizes mission-critical clarity, unyielding legibility, and high-density situational awareness under stressful, real-time operating conditions.

### Design Movements & Tone
- **Utilitarian Public-Sector Command:** Rooted in the visual precision of technical hydrological dashboards, spatial data infrastructures (SDI), and meteorological telemetry. Rejects decorative novelties such as glowing blurs, neon gradients, or artificial AI motifs.
- **Cognitive Ergonomics:** Information is strictly organized via functional hairline borders, tabular alignment, and calibrated semantic tiers to enable immediate triage by district magistrates and incident response commanders.
- **Institutional Reliability:** Delivers a stable, authoritative operational posture suitable for round-the-clock shift handovers, field ruggedized tablets, and incident projection walls.

---

## 2. Color System & Palette

The color palette establishes an unambiguous hierarchy engineered for sustained viewing without ocular fatigue. Contrast ratios adhere strictly to WCAG 2.1 AA/AAA compliance on both standard screens and low-nit field display units.

### 2.1 Surface & Canvas Architecture
| Token Name | Hex Code | Role / Usage |
| :--- | :--- | :--- |
| `background` / `surface` | `#f8f9ff` | App canvas backdrop, non-glare foundation |
| `surface-container-lowest` | `#ffffff` | Primary panel surfaces, GIS overlay cards, data tables |
| `surface-container-low` | `#eff4ff` | Secondary containers, subtle panel groupings |
| `surface-container` | `#e5eeff` | Grouped card sections and container backdrops |
| `surface-container-high` | `#dce9ff` | Elevated control strips, secondary filter panels |
| `surface-container-highest` | `#d3e4fe` | Active tab highlights, selected panel backings |
| `surface-dim` | `#cbdbf5` | Inactive panel fills and docked tray borders |
| `surface-bright` | `#f8f9ff` | High-clarity illuminated surface base |
| `outline` | `#757684` | Structural divider lines and active viewport splits |
| `outline-variant` | `#c4c5d5` | Subtle internal card dividers and table cell dividers |

### 2.2 Operational Core & Ink Palette
| Role | Hex Code | Description |
| :--- | :--- | :--- |
| **Primary Operational Accent** | `#1e40af` | Navy blue for confirmed actions, active spatial boundaries, and primary operational triggers |
| **Primary Core (`primary`)** | `#00288e` | High-contrast brand blue for core identification |
| **On Primary** | `#ffffff` | Text and icons placed on primary actions |
| **Primary Container** | `#1e40af` | Container fill for active navigation / primary status |
| **On Primary Container** | `#a8b8ff` | Text / icons over primary container backgrounds |
| **Secondary (`secondary`)** | `#565e74` | Supporting utility items and inactive toggles |
| **Secondary Container** | `#dae2fd` | Secondary pill and filter background |
| **Tertiary (`tertiary`)** | `#273548` | Deep slate for tertiary data indicators |
| **Tertiary Container** | `#3e4c60` | Darker container for auxiliary telemetry metadata |
| **Dominant Ink (`on-surface`)** | `#0b1c30` | Headings, tabular metrics, coordinates, critical alert titles |
| **Muted Ink (`on-surface-variant`)** | `#444653` | Metadata, sensor timestamps, block names, measurement units |
| **De-emphasized / Inactive** | `#757684` | Disabled controls, placeholder texts |

### 2.3 Strict Operational Severity Tiers
*Critical rule: Severity colors must never be swapped or repurposed for stylistic decoration.*

| Severity Tier | Hazard Level | Base Accent | Background Fill | Border | Text Ink | Indicator Dot |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Tier 4** | Critical / Cloudburst / Breach | `#b91c1c` – `#dc2626` | `#fef2f2` | `#fecaca` | `#991b1b` / `#b91c1c` | `#dc2626` |
| **Tier 3** | High / Flash Flood Warning | `#c2410c` – `#ea580c` | `#fff7ed` | `#fed7aa` | `#9a3412` / `#ea580c` | `#ea580c` |
| **Tier 2** | Medium / Rain Accumulation Advisory | `#a16207` – `#ca8a04` | `#fefce8` | `#fef08a` | `#854d0e` | `#ca8a04` |
| **Tier 1** | Low / Normal Operations | `#15803d` – `#16a34a` | `#f0fdf4` | `#bbf7d0` | `#166534` / `#15803d` | `#16a34a` |
| **Tier 0** | Neutral / Telemetry Ping Info | `#475569` | `#f1f5f9` | `#e2e8f0` | `#475569` | `#64748b` |

---

## 3. Typography System

The typography scale is calibrated for high information density, rapid scanning, and precise tabular reading under pressure. **Inter** is deployed across all UI roles due to its neutral letterforms, tall x-height, and robust OpenType tabular figures.

### 3.1 OpenType Font Features
- **Tabular Figures (`font-feature-settings: "tnum" 1`):** Enforced across all coordinate readings, rainfall millimeter accumulations, river discharge rates ($m^3/s$), timestamps, and population metrics to prevent horizontal jitter during live telemetry streams.
- **Slashed Zero (`font-feature-settings: "zero" 1`):** Enabled for unambiguous differentiation between the number `0` and capital letter `O` in administrative boundary identifiers (LGD block codes, village census codes).

### 3.2 Typography Scale & Roles
| Token | Font Family | Size | Weight | Line Height | Letter Spacing | Primary Application |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`headline-xl`** | Inter | 24px | 700 (Bold) | 32px | `-0.02em` | Main dashboard header (e.g., "District Command Center — East Khasi Hills") |
| **`headline-xl-mobile`** | Inter | 20px | 700 (Bold) | 28px | `-0.01em` | Mobile / field device view header |
| **`headline-lg`** | Inter | 18px | 600 (SemiBold)| 24px | `-0.01em` | Module containers, GIS map flyouts, incident modal headers |
| **`headline-sm`** | Inter | 15px | 600 (SemiBold)| 20px | `0em` | Metric group headers, collapsible sidebar categories |
| **`body-lg`** | Inter | 14px | 400 (Regular) | 20px | `0em` | Situation report summaries, administrative instructions |
| **`body-sm`** | Inter | 13px | 400 (Regular) | 18px | `0em` | Meteorological advisories, telemetry sub-descriptions |
| **`label-lg`** | Inter | 12px | 600 (SemiBold)| 16px | `+0.02em` | Field input labels, map legend markers, active badge labels |
| **`label-sm`** | Inter | 11px | 500 (Medium) | 14px | `+0.04em` | Micro-timestamps, status tags (with uppercase transform) |
| **`data-tabular`** | Inter | 13px | 500 (Medium) | 18px | `0em` | Live sensor tables, GPS coordinates, hydrological gauges |

---

## 4. Spacing, Geometry & Elevation

### 4.1 Spacing Scale
Density is tightly controlled using a base 4px/8px rhythm to maximize viewport visibility and minimize dead space:
- `space-2xs`: `0.125rem` (2px)
- `space-xs`: `0.25rem` (4px)
- `space-sm`: `0.5rem` (8px)
- `space-md`: `0.75rem` (12px)
- `space-lg`: `1rem` (16px)
- `space-xl`: `1.5rem` (24px)
- `gutter` / `margin`: `0.75rem` (12px) mobile, `1rem` (16px) desktop

### 4.2 Corner Radii (Roundness: `ROUND_FOUR`)
- `rounded-sm`: `0.125rem` (2px) — Checkboxes, fine micro-tags
- `rounded-DEFAULT`: `0.25rem` (4px) — Buttons, input fields, status chips, data panel cards
- `rounded-md`: `0.375rem` (6px) — Modals, popovers, detached dialogs
- `rounded-lg`: `0.5rem` (8px) — Floating GIS drawers
- `rounded-full`: `9999px` — Strictly limited to map location beacons, live pulse indicators, and zoom controls. *Prohibited on action buttons to conserve lateral screen estate.*

### 4.3 Elevation & Borders
Visual separation relies primarily on crisp hairline borders (`1px solid #c4c5d5` or `#757684`) rather than heavy drop shadows:
- **Level 0 (Map & Canvas):** Flat, zero elevation (`#f8f9ff`).
- **Level 1 (Docked Containers):** `border: 1px solid #c4c5d5; box-shadow: none; background: #ffffff;`.
- **Level 2 (Floating Map Controls):** `border: 1px solid #c4c5d5; box-shadow: 0 1px 2px 0 rgba(11, 28, 48, 0.08); background: #ffffff;`.
- **Level 3 (Emergency Modals & Critical Alerts):** `border: 1px solid #757684; box-shadow: 0 4px 6px -1px rgba(11, 28, 48, 0.12); background: #ffffff;`.

---

## 5. UI Component Specifications

### 5.1 Buttons & Triggers
- **Primary Operational Button:** `#1e40af` background, `#ffffff` text, `4px` radius, height `32px` (compact) or `36px` (standard). Hover: `#1d4ed8`. Active: `#173bab`. Focus ring: `2px solid #a8b8ff`.
- **Secondary / Technical Button:** `#ffffff` background, `1px solid #c4c5d5`, `#0b1c30` text. Hover: `#eff4ff`.
- **Destructive / Emergency Trigger:** `#dc2626` background, `#ffffff` text. Hover: `#b91c1c`. Dedicated strictly to irreversible emergency actions (e.g., "Broadcast Siren Alert").
- **Map Floating Button:** `#ffffff` background, `1px solid #c4c5d5`, `32px x 32px` square, centered SVG vector icon in `#444653`.

### 5.2 Status Chips & Alert Badges
- **Architecture:** `4px` radius, `11px` bold uppercase text, `padding: 2px 6px`, integrated leading indicator dot (`6px` diameter).
- **Critical (Tier 4):** Container `#fef2f2`, border `#fecaca`, text `#991b1b`, dot `#dc2626`.
- **Warning (Tier 3):** Container `#fff7ed`, border `#fed7aa`, text `#9a3412`, dot `#ea580c`.
- **Advisory (Tier 2):** Container `#fefce8`, border `#fef08a`, text `#854d0e`, dot `#ca8a04`.
- **Normal (Tier 1):** Container `#f0fdf4`, border `#bbf7d0`, text `#166534`, dot `#16a34a`.
- **Neutral (Tier 0):** Container `#f1f5f9`, border `#e2e8f0`, text `#475569`, dot `#64748b`.

### 5.3 Data Tables & Hydrological Feeds
- **Row Architecture:** Dense `36px` row height, alternating light rows (`#ffffff` and `#f8f9ff`), `1px solid #e5eeff` bottom dividers.
- **Header Cells:** `#f1f5f9` fill, text `#444653`, `11px` uppercase tracking, `1px solid #c4c5d5` bottom border.
- **Interactive Rows:** Hover background `#eff4ff`. Selection indicator: `2px` left border highlight `#1e40af`.

### 5.4 GIS Feature Callouts & Overlays
- **GIS Tooltip / Feature Info Card:** White card with sharp `1px solid #c4c5d5` border, `12px` padding, zero outer margin. Header contains the Block/Village name in `13px` bold with adjoining status badge. Telemetry properties are listed as label-value pairs with tabular alignment.

---

## 6. CSS Tokens Implementation

```css
:root {
  /* Surface & Canvas */
  --color-surface: #f8f9ff;
  --color-surface-dim: #cbdbf5;
  --color-surface-bright: #f8f9ff;
  --color-surface-container-lowest: #ffffff;
  --color-surface-container-low: #eff4ff;
  --color-surface-container: #e5eeff;
  --color-surface-container-high: #dce9ff;
  --color-surface-container-highest: #d3e4fe;
  
  /* Text & Inks */
  --color-on-surface: #0b1c30;
  --color-on-surface-variant: #444653;
  --color-outline: #757684;
  --color-outline-variant: #c4c5d5;
  
  /* Operational Brand */
  --color-primary: #00288e;
  --color-on-primary: #ffffff;
  --color-primary-container: #1e40af;
  --color-on-primary-container: #a8b8ff;
  --color-secondary: #565e74;
  --color-secondary-container: #dae2fd;
  
  /* Operational Severity Tiers */
  --color-tier4-fill: #b91c1c;
  --color-tier4-bg: #fef2f2;
  --color-tier4-border: #fecaca;
  --color-tier4-text: #991b1b;
  --color-tier4-dot: #dc2626;

  --color-tier3-fill: #ea580c;
  --color-tier3-bg: #fff7ed;
  --color-tier3-border: #fed7aa;
  --color-tier3-text: #9a3412;
  --color-tier3-dot: #ea580c;

  --color-tier2-fill: #ca8a04;
  --color-tier2-bg: #fefce8;
  --color-tier2-border: #fef08a;
  --color-tier2-text: #854d0e;
  --color-tier2-dot: #ca8a04;

  --color-tier1-fill: #16a34a;
  --color-tier1-bg: #f0fdf4;
  --color-tier1-border: #bbf7d0;
  --color-tier1-text: #166534;
  --color-tier1-dot: #16a34a;

  --color-tier0-bg: #f1f5f9;
  --color-tier0-border: #e2e8f0;
  --color-tier0-text: #475569;
  --color-tier0-dot: #64748b;

  /* Typography */
  --font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-tabular-features: "tnum" 1, "zero" 1;

  /* Radius */
  --radius-sm: 0.125rem;
  --radius-default: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-full: 9999px;

  /* Spacing */
  --space-2xs: 0.125rem;
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 0.75rem;
  --space-lg: 1rem;
  --space-xl: 1.5rem;
}

/* Enforce Tabular Figures on Data Feeds */
.telemetry-tabular,
.data-coordinate,
.metric-value {
  font-family: var(--font-family-base);
  font-feature-settings: var(--font-tabular-features);
  font-variant-numeric: tabular-nums;
}
```
