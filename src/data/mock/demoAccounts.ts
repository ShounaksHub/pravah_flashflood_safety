import type { AppUser } from '../../types/reports';

export interface DemoAccount extends AppUser {
  username: string;
  passwordHint: string;
  badgeId: string;
  avatarInitials: string;
  clearanceLevel: string;
  description: string;
  allowedRoutes: string[];
  capabilities: string[];
  restrictions: string[];
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: 'USR-DEO-01',
    name: 'Shri R. Lyngdoh, IAS',
    username: 'deo',
    passwordHint: 'admin',
    designation: 'District Magistrate & Incident Commander',
    department: 'District Disaster Management Authority (DDMA)',
    jurisdiction: 'East Khasi Hills, Meghalaya',
    role: 'DISTRICT_EMERGENCY_OFFICER',
    badgeId: 'DDMA-EKH-001',
    avatarInitials: 'RL',
    clearanceLevel: 'LEVEL 4 — STATUTORY COMMAND',
    description: 'Executive Incident Commander with statutory authorization under Disaster Management Act 2005.',
    allowedRoutes: ['/command', '/dashboard', '/map', '/forecast', '/risk', '/ndrf', '/resources', '/roads', '/catchment', '/alerts', '/sitrep', '/reports', '/system'],
    capabilities: [
      'Authorize & Broadcast CAP Public Alerts & Sirens',
      'Statutory NDRF Requisition Order Approval',
      'Sign & Transmit Official SitRep to State & MHA',
      'Authorize Emergency Logistics & IAF Air Recon',
      'Full Geospatial & Hydrological Access',
    ],
    restrictions: [
      'Backend Code & Database Config (Handled by NIC/Admin)',
    ],
  },
  {
    id: 'USR-NDRF-02',
    name: 'Commandant R. Singh',
    username: 'ndrf',
    passwordHint: 'admin',
    designation: 'Battalion Commander (Forward Tactical HQ)',
    department: '1st Battalion NDRF, Ministry of Home Affairs',
    jurisdiction: 'Patgaon Base / Shillong Forward Staging',
    role: 'NDRF_OFFICER',
    badgeId: 'NDRF-1BN-774',
    avatarInitials: 'RS',
    clearanceLevel: 'LEVEL 3 — TACTICAL FORCE COMMAND',
    description: 'Search & Rescue Tactical Commander managing deployed teams, equipment, and mountain route corridors.',
    allowedRoutes: ['/command', '/dashboard', '/map', '/forecast', '/risk', '/ndrf', '/resources', '/roads', '/catchment', '/reports'],
    capabilities: [
      'Manage Battalion Rescue Units & Specialized Equipment',
      'Update Forward Team Staging & Transit Status',
      'Inspect Route Accessibility & Detour Navigations',
      'View Real-Time Hydrological Surge Lead Times',
      'Triage Field Citizen Ground Reports for Rescue',
    ],
    restrictions: [
      'Cannot Authorize Public Outdoor Sirens / Mass SMS (Requires DEO)',
      'Cannot Issue Formal Statutory SitRep (Requires DEO Sign-Off)',
      'Restricted from System Telemetry Hardware Configurations',
    ],
  },
  {
    id: 'USR-FIELD-03',
    name: 'J. Marak, MCS',
    username: 'field',
    passwordHint: 'admin',
    designation: 'Sub-Divisional Officer & Field Incident Lead',
    department: 'Mawsynram C&RD Sub-Division, Revenue & Disaster Mgmt',
    jurisdiction: 'Mawsynram & Shella Gorges',
    role: 'FIELD_OFFICER',
    badgeId: 'BDO-MAW-204',
    avatarInitials: 'JM',
    clearanceLevel: 'LEVEL 2 — FIELD OPERATIONS',
    description: 'Ground-level administrative and rescue liaison verifying village ground truth and local shelter readiness.',
    allowedRoutes: ['/command', '/dashboard', '/map', '/forecast', '/risk', '/resources', '/roads', '/reports'],
    capabilities: [
      'Log & Verify Geo-Tagged Citizen Ground Reports with Photos',
      'Inspect Local Village Hazard Tiers & Nallah Water Levels',
      'Manage Village Relief Shelter Check-ins & Ration Stocks',
      'Report Blocked Approach Roads & Debris Obstacles to PWD',
    ],
    restrictions: [
      'Cannot Trigger NDRF Deployment Orders (View Only)',
      'Cannot Broadcast CAP Emergency Sirens or Cell Alerts',
      'Restricted from SitRep Generation & Ingestion Diagnostics',
    ],
  },
  {
    id: 'USR-ADMIN-04',
    name: 'Dr. P. Sen',
    username: 'admin',
    passwordHint: 'admin',
    designation: 'Chief Technology Officer & Lead Systems Architect',
    department: 'State Emergency Operations Centre & NIC Meghalaya',
    jurisdiction: 'State Data Center (SDC), Shillong',
    role: 'ADMIN',
    badgeId: 'NIC-SYS-990',
    avatarInitials: 'PS',
    clearanceLevel: 'LEVEL 5 — ROOT SYSTEM CONTROLLER',
    description: 'System engineer maintaining multi-source API feeds, AWS Doppler Radar hooks, and telemetry reliability.',
    allowedRoutes: ['/command', '/dashboard', '/map', '/forecast', '/risk', '/ndrf', '/resources', '/roads', '/catchment', '/alerts', '/sitrep', '/reports', '/system', '/admin'],
    capabilities: [
      'System Administration Portal (/admin)',
      'Manage & Ping Upstream External API Pipelines (IMD, CWC, PWD)',
      'Calibrate Hydrological Alert Danger Thresholds',
      'Inspect In-situ Gauge Battery, RSSI, and Latency Telemetry',
      'Full Administrative Override on all Tactical Consoles',
    ],
    restrictions: [
      'Operational Search & Rescue Orders subject to DEO approval',
    ],
  },
];
