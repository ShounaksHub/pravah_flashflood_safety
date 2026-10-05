---
name: Emergency Operations Command
project: FlashSafe Admin Dashboard
projectId: '18348021745087439924'
deviceType: DESKTOP
colorMode: LIGHT
roundness: ROUND_FOUR
customColor: '#1e40af'
headlineFont: Public Sans
bodyFont: Public Sans
labelFont: JetBrains Mono
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#444653'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#757684'
  outline-variant: '#c4c5d5'
  surface-tint: '#3755c3'
  primary: '#00288e'
  on-primary: '#ffffff'
  primary-container: '#1e40af'
  on-primary-container: '#a8b8ff'
  inverse-primary: '#b8c4ff'
  secondary: '#006a63'
  on-secondary: '#ffffff'
  secondary-container: '#99efe5'
  on-secondary-container: '#006f67'
  tertiary: '#003757'
  on-tertiary: '#ffffff'
  tertiary-container: '#004f7a'
  on-tertiary-container: '#77c2ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b8c4ff'
  on-primary-fixed: '#001453'
  on-primary-fixed-variant: '#173bab'
  secondary-fixed: '#9cf2e8'
  secondary-fixed-dim: '#80d5cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#00504a'
  tertiary-fixed: '#cce5ff'
  tertiary-fixed-dim: '#93ccff'
  on-tertiary-fixed: '#001d31'
  on-tertiary-fixed-variant: '#004b73'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display:
    fontFamily: Public Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 30px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Public Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: 0em
  body-lg:
    fontFamily: Public Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-md:
    fontFamily: Public Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  body-sm:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  code-data:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: -0.01em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: Public Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.06em
  label-metric:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: -0.02em
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
  margin-desktop: 1.25rem
---

# FlashSafe Admin Dashboard — Design System Specification

## 1. Brand & Style Philosophy

The **FlashSafe Admin Dashboard** design system establishes an operational, high-density situational command visual language engineered for the **District Disaster Management Authority (DDMA)** and **State/National Disaster Response Forces (SDMA/NDRF)** operating in high-precipitation, landslide-prone mountainous sectors such as East Khasi Hills, Meghalaya.

The aesthetic bridges institutional Indian administrative software rigor (NIC, NDMA, IMD standard compliance) with contemporary precision systems design. The interface prioritizes cognitive clarity, rapid scanability, and zero visual ambiguity during active natural hazard escalation protocols (cloudbursts, flash floods, major roadway cut-offs).

### Aesthetic Principles
- **Administrative Precision & Institutional Trust:** Solid, matter-of-fact surface containment without decorative fluff, neon glows, or ornamental glassmorphism.
- **High-Density Legibility Under Duress:** Tight vertical metrics, fixed spatial grids, and high-contrast typography allow multi-panel GIS monitoring, sensor array telemetry, and logistics resource tracking on standard tactical consoles.
- **Strict Semantic Discipline:** Saturated pigments are strictly reserved for operational urgency states (Warning, Alert, Evacuation, Normal). Structural and navigating elements remain grounded in institutional navy and slate.

---

## 2. Color Palette & Token Architecture

The color palette is engineered for prolonged operational shifts under institutional fluorescent lighting and field monitoring environments. The background avoids harsh pure whites in favor of balanced administrative slate-greys.

### 2.1 Foundation & Surface Architecture
| Token Name | Hex Code | Role / Usage |
| :--- | :--- | :--- |
| `background` / `surface` | `#faf8ff` | Primary canvas base, non-glare foundation |
| `surface-container-lowest` | `#ffffff` | Tactical data cards, telemetry tables, and map overlay cards |
| `surface-container-low` | `#f2f3ff` | Sub-panels, inactive card containers, filter toolbars |
| `surface-container` | `#eaedff` | Grouped card sections and container backdrops |
| `surface-container-high` | `#e2e7ff` | Elevated control strips, secondary filter panels |
| `surface-container-highest` | `#dae2fd` | Active tab highlights, selected panel backings |
| `surface-dim` | `#d2d9f4` | Inactive panel fills and docked tray borders |
| `surface-bright` | `#faf8ff` | High-clarity illuminated surface base |
| `outline` | `#757684` | Structural divider lines and active viewport splits |
| `outline-variant` | `#c4c5d5` | Internal card dividers and table cell dividers |

### 2.2 Operational Core & Typography Inks
| Role | Hex Code | Description |
| :--- | :--- | :--- |
| **Primary Operational Accent** | `#1e40af` | Navy blue for confirmed actions, active spatial boundaries, and primary triggers |
| **Primary Core (`primary`)** | `#00288e` | Core brand blue |
| **Primary Container** | `#1e40af` | Active sidebar item and navigation backdrop |
| **Secondary Core (`secondary`)** | `#006a63` | Deep teal for telemetry sensors and communication channels |
| **Secondary Container** | `#99efe5` | Light teal container for telemetry status badges |
| **Tertiary Core (`tertiary`)** | `#003757` | Deep slate-blue for auxiliary telemetry and resource trackers |
| **Tertiary Container** | `#004f7a` | Dark slate container for auxiliary data strips |
| **Primary Text (`on-surface`)** | `#131b2e` | Critical titles, raw metrics, high-contrast labels |
| **Secondary Text** | `#1e293b` | Body readouts, metadata values |
| **Muted Text (`on-surface-variant`)** | `#444653` | Field labels, coordinates, timestamps, unit indicators |
| **Disabled Text** | `#94a3b8` | Inactive telemetry channels or disabled controls |

### 2.3 Strict Operational Severity Tiers
*Critical rule: Severity colors must never be swapped or repurposed for stylistic decoration.*

| Severity Tier | Hazard Level | Base Accent | Background Fill | Border | Text Ink | Indicator Dot |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Tier 4** | Critical / Flash Flood Trigger / Evacuate | `#b91c1c` (Red 700) | `#fef2f2` (Red 50) | `#f87171` (Red 400) | `#b91c1c` | `#dc2626` (Blinking) |
| **Tier 3** | Warning / River Crest Alert | `#c2410c` (Orange 700) | `#fff7ed` (Orange 50) | `#fb923c` (Orange 400) | `#c2410c` | `#ea580c` |
| **Tier 1** | Normal / Nominal Basin / Active Telemetry| `#15803d` (Green 700) | `#f0fdf4` (Green 50) | `#4ade80` (Green 400) | `#15803d` | `#16a34a` (Static) |
| **Tier 0** | Inactive / Sensor Calibration / Standby | `#475569` (Slate 600) | `#f1f5f9` (Slate 100) | `#cbd5e1` (Slate 300) | `#475569` | `#64748b` |

---

## 3. Typography System

The typography relies on two uncompromising typefaces:
- **Public Sans:** Designed specifically for institutional, administrative, and public-sector operations. High x-height, wide open counters, and strict neutrality minimize interpretation errors in low-resolution and stressful viewing conditions.
- **JetBrains Mono:** Dedicated exclusively to quantitative stream readouts, rain-gauge numbers (mm/hr), latitude/longitude coordinates, telemetry timestamps (IST / UTC), and administrative station IDs.

### 3.1 Typography Scale & Roles
| Token | Font Family | Size | Weight | Line Height | Letter Spacing | Primary Application |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`display`** | Public Sans | 30px | 700 (Bold) | 36px | `-0.02em` | Major command center displays / screen banners |
| **`headline-lg`** | Public Sans | 24px | 700 (Bold) | 30px | `-0.015em` | Tactical console titles, incident modal headers |
| **`headline-md`** | Public Sans | 20px | 600 (SemiBold)| 26px | `-0.01em` | Section headers, panel drawer titles |
| **`headline-sm`** | Public Sans | 16px | 600 (SemiBold)| 22px | `0em` | Sub-headers, tactical widget titles |
| **`body-lg`** | Public Sans | 15px | 400 (Regular) | 22px | `0em` | SitRep narratives, advisory text |
| **`body-md`** | Public Sans | 13px | 400 (Regular) | 18px | `0em` | Primary table cells, card body content |
| **`body-sm`** | Public Sans | 12px | 400 (Regular) | 16px | `0em` | Compact table cells, metadata descriptions |
| **`label-caps`** | Public Sans | 11px | 700 (Bold) | 14px | `+0.06em` | Uppercase field headers, metric unit labels |
| **`label-metric`** | JetBrains Mono | 20px | 700 (Bold) | 24px | `-0.02em` | Prominent KPI counters, alert counts, discharge rates |
| **`code-data`** | JetBrains Mono | 13px | 500 (Medium) | 18px | `-0.01em` | Coordinates, live stream telemetry, rainfall mm/hr |
| **`code-sm`** | JetBrains Mono | 11px | 500 (Medium) | 14px | `+0.02em` | Timestamps (IST/UTC), station codes, SIT-IDs |

---

## 4. Layout, Elevation & Spacing

### 4.1 12-Column Unified Cockpit Grid
Desktop views leverage a dense 12-column layout with a 1rem gutter:
- **Left Rail (3 cols, min 320px):** Sensor arrays, district administrative boundaries, rain telemetry feeds.
- **Center Canvas (6 cols):** GIS Topographical map with vector precipitation layers, contour alerts, and roadblock markers.
- **Right Rail (3 cols, min 340px):** NDRF/SDRF deployment logs, incident triage stack, and outbound SMS/CAP alert console.

### 4.2 Spacing Scale
- `space-2xs`: `0.125rem` (2px)
- `space-xs`: `0.25rem` (4px)
- `space-sm`: `0.5rem` (8px)
- `space-md`: `0.75rem` (12px)
- `space-lg`: `1rem` (16px)
- `space-xl`: `1.5rem` (24px)
- `gutter`: `0.75rem` (12px) mobile, `1rem` (16px) desktop
- `margin`: `0.75rem` mobile, `1.25rem` (20px) desktop

### 4.3 Corner Radii (Roundness: `ROUND_FOUR`)
- `rounded-sm`: `0.125rem` (2px) — Micro-tags, administrative checkboxes
- `rounded-DEFAULT`: `0.25rem` (4px) — Buttons, form controls, status chips, data cards
- `rounded-md`: `0.375rem` (6px) — Modals, popovers, detached trays
- `rounded-lg`: `0.5rem` (8px) — Floating GIS menus
- **Absolute Pill Prohibition:** Pill-shaped (`9999px`) rounded elements are forbidden for action buttons and status chips.

### 4.4 Elevation Hierarchy
- **Level 1 (Canvas):** Flat base `#faf8ff`.
- **Level 2 (Containers):** `#ffffff` with `1px solid #cbd5e1`, zero drop shadow.
- **Level 3 (Inset Controls):** `#f1f5f9` sub-headers and table headers recessed with `1px solid #e2e8f0`.
- **Level 4 (Map Float Layer):** `box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.1), 0 1px 2px -1px rgba(15, 23, 42, 0.1); border: 1px solid #94a3b8;`.
- **Level 5 (Emergency Alerts):** 2px solid semantic borders (`#b91c1c` or `#c2410c`) with tinted fill.

---

## 5. UI Component Specifications

### 5.1 Buttons
- **Primary Operational Action:** Background `#1e40af`, border `1px solid #1d4ed8`, text `#ffffff`, `Public Sans` 13px weight 600, padding `6px 12px`, radius `4px`.
- **Secondary Action:** Background `#ffffff`, border `1px solid #cbd5e1`, text `#1e293b`.
- **Critical Action:** Background `#b91c1c`, border `1px solid #991b1b`, text `#ffffff`. Active state: interior focus ring.

### 5.2 Status Badges & Chips
- Structure: `11px` uppercase font, `padding: 2px 6px`, `3px` radius.
- **State Normal:** Background `#f0fdf4`, border `#86efac`, text `#15803d`, leading static dot `#16a34a`.
- **State Warning:** Background `#fff7ed`, border `#fdba74`, text `#c2410c`.
- **State Critical:** Background `#fef2f2`, border `#fca5a5`, text `#b91c1c`, blinking dot `#dc2626`.
- **State Inactive:** Background `#f1f5f9`, border `#cbd5e1`, text `#475569`.

### 5.3 Data Tables
- Row height: 32px to 36px.
- Header: `#f1f5f9` fill, border-bottom `2px solid #cbd5e1`, labels in `label-caps` (`#475569`).
- Zebra striping: `#ffffff` and `#f8fafc`.
- Numbers: Right-aligned using `JetBrains Mono` (`code-data`).

### 5.4 Incident & Evacuation Cards
- Background: `#ffffff`, border `1px solid #cbd5e1`.
- Header has a `3px` vertical accent border on left edge indicating status (Red, Orange, Blue).
- Two-column dense metadata layout: Timestamp, Block Name, Coordinates, DDMA Liaison.

---

## 6. CSS Tokens Implementation

```css
:root {
  /* Surfaces */
  --color-surface: #faf8ff;
  --color-surface-dim: #d2d9f4;
  --color-surface-bright: #faf8ff;
  --color-surface-container-lowest: #ffffff;
  --color-surface-container-low: #f2f3ff;
  --color-surface-container: #eaedff;
  --color-surface-container-high: #e2e7ff;
  --color-surface-container-highest: #dae2fd;

  /* Inks */
  --color-on-surface: #131b2e;
  --color-on-surface-variant: #444653;
  --color-outline: #757684;
  --color-outline-variant: #c4c5d5;

  /* Brand / Operations */
  --color-primary: #00288e;
  --color-primary-container: #1e40af;
  --color-on-primary: #ffffff;
  --color-on-primary-container: #a8b8ff;
  --color-secondary: #006a63;
  --color-secondary-container: #99efe5;
  --color-tertiary: #003757;
  --color-tertiary-container: #004f7a;

  /* Semantic Alerts */
  --color-tier4-fill: #b91c1c;
  --color-tier4-bg: #fef2f2;
  --color-tier4-border: #f87171;
  --color-tier3-fill: #c2410c;
  --color-tier3-bg: #fff7ed;
  --color-tier3-border: #fb923c;
  --color-tier1-fill: #15803d;
  --color-tier1-bg: #f0fdf4;
  --color-tier1-border: #4ade80;

  /* Typography */
  --font-family-sans: 'Public Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-family-mono: 'JetBrains Mono', monospace;

  /* Spacing */
  --space-2xs: 0.125rem;
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 0.75rem;
  --space-lg: 1rem;
  --space-xl: 1.5rem;

  /* Radius */
  --radius-sm: 0.125rem;
  --radius-default: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
}

/* Enforce Monospace on Quantitative and Sensor Metrics */
.metric-mono,
.telemetry-gauge,
.sensor-timestamp,
.coordinate-pair {
  font-family: var(--font-family-mono);
  font-variant-numeric: tabular-nums;
}
```
