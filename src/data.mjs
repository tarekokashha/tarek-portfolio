/**
 * Single source of truth for every piece of copy on the site.
 * The build reads this, renders static HTML, and ships no data to the client.
 */

export const site = {
  name: 'Tarek Okasha',
  role: 'Robotics & Automation Engineer',
  title: 'Tarek Okasha — Robotics & Automation Engineer',
  description:
    'Robotics and automation engineer in Cairo. Six-axis industrial robots, AI automations, full-stack platforms and brand systems — built to run without supervision.',
  ogDescription:
    'Six-axis industrial robots, AI automations, full-stack platforms and brand systems — engineered with the discipline of robotics.',
  url: 'https://tarek-okasha.vercel.app',
  locale: 'en',
  email: 'tarekokasha53@gmail.com',
  phone: '+20 155 157 0089',
  whatsapp: 'https://wa.me/201551570089',
  linkedin: 'https://www.linkedin.com/in/tarekokasha',
  github: 'https://github.com/tarekokasha22',
  githubHandle: 'tarekokasha22',
  linkedinHandle: 'in/tarekokasha',
  cv: '/Tarek-Okasha-CV.pdf',
  portrait: '/tarek-okasha.jpg',
  ogImage: '/og.png',
  timezone: 'Africa/Cairo',
  availability: 'Available for projects',
  location: 'Cairo, EG — Remote',
  year: 2026,
};

export const nav = [
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'work', label: 'Work' },
  { id: 'brands', label: 'Brands' },
  { id: 'about', label: 'About' },
];

export const hero = {
  headline: ['Robotics &', 'Automation', 'Engineer'],
  lede: 'I build systems that run without supervision — six-axis industrial robots, AI automations, and the custom software companies actually operate on. Engineered with the discipline of robotics, shipped like production software.',
  facts: [
    { k: 'Status', v: 'Booking Q3 projects' },
    { k: 'Local time', v: '—:—:—', clock: true },
    { k: 'Domains', v: 'Robotics · AI · Software' },
    { k: 'In production', v: '90+ systems · 5 countries' },
  ],
};

export const marquee = [
  'ROS 2 / MoveIt 2',
  'Computer Vision',
  'Sim-to-Real',
  'LLM Pipelines',
  'n8n Automation',
  'Custom ERP',
  'Next.js + Postgres',
  'WordPress & WooCommerce',
  'Brand Systems',
];

export const position = {
  lead: 'Most engineers pick a side: the machine or the business. I work the whole chain — from a gripper closing on a physical object to the invoice that object generates three systems later.',
  body: 'That range started with robotics. A six-axis arm is the most honest system you can build — either the gripper closes on the object or it closes on air. There is no hiding a bad abstraction behind a loading spinner. I brought that standard to everything after it: enterprise AI automation, custom ERP and management platforms, and full brand presences for the companies I partner with.',
  stats: [
    { v: '90+', k: 'Automations live<br>in production' },
    { v: '40h', accent: '+', k: 'Manual work removed<br>every week' },
    { v: '99.2%', k: 'Reliability across<br>live workflows' },
    { v: '6-DOF', k: 'UR5e under full<br>motion planning' },
  ],
};

export const capabilities = [
  {
    n: '01',
    title: 'Robotics & Automation',
    body: 'Industrial manipulators from perception to motion. Collision-free planning, grasp sequences, and a simulation that mirrors the hardware so the real arm only ever runs code that already worked.',
    tags: ['ROS 2', 'MoveIt 2', 'OpenCV', 'Sim-to-real'],
  },
  {
    n: '02',
    title: 'AI Systems & Automation',
    body: 'Not fragile scripts. Workflows with error handling, logging, and failure alerts — LLM classification, agentic pipelines, and fine-tuned models that hold up at enterprise volume.',
    tags: ['n8n', 'Claude', 'Fine-tuning', 'GHL'],
  },
  {
    n: '03',
    title: 'Full-Stack & Custom Software',
    body: 'Front to back, database to interface — ERP, learning platforms, management systems and internal tools for companies the off-the-shelf market ignores. Multi-tenant, Arabic-first, offline-capable when the site has no signal.',
    tags: ['Next.js', 'Postgres', 'Supabase', 'Auth & RBAC'],
  },
  {
    n: '04',
    title: 'Web, WordPress & Brand',
    body: 'Full presences, not just pages. Storefronts and marketing sites, plus the identity and tone of voice that hold them together — for brands I build once and keep building with.',
    tags: ['WordPress', 'WooCommerce', 'Identity', 'Tone of voice'],
  },
];

export const work = [
  {
    idx: '01',
    year: '2026',
    client: 'Team lead · 3 engineers',
    internal: true,
    title: 'Voice-controlled 6-DOF robotic arm',
    outcome:
      'I led three engineers building a real-time voice-to-motion pipeline — Alexa to AWS Lambda to the Claude API to ROS 2 and MoveIt 2. URDF models and inverse kinematics for precise end-effector positioning, validated in RViz before it ever touched hardware.',
    tags: ['ROS 2', 'MoveIt 2', 'Claude API', 'Raspberry Pi 5'],
    stats: [
      { v: '6-DOF', k: 'Under full motion planning' },
      { v: 'Voice → motion', k: 'Alexa · Lambda · Claude · ROS 2' },
      { v: '3 engineers', k: 'Team I led end to end' },
    ],
  },
  {
    idx: '02',
    year: '2026',
    client: 'Sportix — Remote, UAE',
    href: 'https://sportix-smis.vercel.app',
    live: true,
    title: 'A production medical platform, seven integrated modules',
    outcome:
      'Lead software engineer on the full stack — React, Node.js, Express and MySQL — with role-based access control and complete Arabic RTL for MENA deployment. A Claude-powered reporting layer turns injury, vitals and rehabilitation data into clinical insight the medical staff actually acts on.',
    tags: ['Lead engineer', 'React · Node · MySQL', 'Claude API', 'Arabic RTL'],
    stats: [
      { v: '7 modules', k: 'One integrated platform' },
      { v: 'RBAC', k: 'Role-scoped clinical access' },
      { v: 'AI reporting', k: 'Insight from injury and vitals data' },
    ],
  },
  {
    idx: '03',
    year: '2026',
    client: 'Kawkab Tegara',
    href: 'https://kawkab-tegara.vercel.app/',
    live: true,
    title: 'A full learning platform for business and commerce students',
    outcome:
      'Two tracks and seven year-stages, each student seeing only their own curriculum. Ordered lesson plans, per-lesson progress, and manual device authorisation so one account stays one student. Arabic-first, right-to-left throughout.',
    tags: ['Full-stack', 'LMS', 'Arabic / RTL', 'Device auth'],
    stats: [
      { v: '2 tracks', k: 'Baccalaureate and university' },
      { v: '7 stages', k: 'Each with its own curriculum' },
      { v: 'Per-device', k: 'Manual approval blocks sharing' },
    ],
  },
  {
    idx: '04',
    year: '2025',
    client: 'Al-Helaly Constructions',
    href: 'https://helaly-erp.vercel.app',
    live: true,
    title: 'Multi-tenant ERP running live across two countries',
    outcome:
      'Projects, inventory, payroll, procurement, machinery, vendors and reporting in one system. Isolated tenant data, multi-currency in EGP and USD, role-based access, audit logging, and a bilingual Arabic/English interface replacing fragmented spreadsheets with one source of truth.',
    tags: ['Multi-tenant', 'ERP', 'Multi-currency', 'Audit logging'],
    stats: [
      { v: '7 domains', k: 'Projects to payroll, one system' },
      { v: '2 countries', k: 'Live, with isolated tenant data' },
      { v: 'EGP / USD', k: 'Multi-currency throughout' },
    ],
  },
  {
    idx: '05',
    year: '2025',
    client: 'Shae Group — United States',
    internal: true,
    title: 'Automation across CRM, comms, scheduling and payments',
    outcome:
      'Workflows wired through APIs, webhooks, Python and JavaScript, connecting the systems the team already ran on rather than replacing them. Error handling, logging and failure alerts on every one, documented so a non-technical manager can read what runs.',
    tags: ['n8n', 'APIs · Webhooks', 'Python · JS', 'CRM'],
    stats: [
      { v: '60%+', k: 'Manual workload removed' },
      { v: 'Hours → minutes', k: 'Lead response time' },
      { v: '24/7', k: 'Running unattended' },
    ],
  },
  {
    idx: '06',
    year: '2025',
    client: 'Aurevia — Saudi Arabia',
    href: 'https://aurevia-website-orcin.vercel.app',
    live: true,
    title: 'AI photography studio for a jewelry brand',
    outcome:
      "A fine-tuned generation pipeline that learned one brand's exact light. Raw phone photo in over WhatsApp, bilingual catalog entry out — inside the hour.",
    tags: ['Fine-tuning', 'Computer Vision', 'WhatsApp API', 'Bilingual'],
    stats: [
      { v: '2 wks → 24h', k: 'Collection production cycle' },
      { v: '$4,200/mo', k: 'Studio retainer replaced' },
      { v: '6%', k: 'Rejection rate, down from 40%' },
    ],
  },
  {
    idx: '07',
    year: '2025',
    client: 'Industrial automation',
    internal: true,
    title: 'PLC-controlled bottle filling and sorting station',
    outcome:
      'Ladder-logic automation to IEC 61131-3 across filling and sorting — sensors, actuators, conveyors and e-stop safety interlocks. HMI screens for monitoring, diagnostics and manual override, modelled on Siemens workflows.',
    tags: ['Ladder logic', 'IEC 61131-3', 'HMI', 'SCADA'],
    stats: [
      { v: 'IEC 61131-3', k: 'Standards-compliant ladder logic' },
      { v: 'E-stop', k: 'Safety interlocks throughout' },
      { v: 'HMI', k: 'Monitoring, diagnostics, override' },
    ],
  },
];

export const brands = {
  lede: "Some work isn't a system — it's a whole presence. Identity, voice, storefront, and the software running underneath it, built as one thing rather than four separate briefs.",
  feature: {
    href: 'https://qxmedia.sa/',
    eyebrow: 'Partnership · Riyadh, KSA',
    name: 'QX Media',
    body: 'A Saudi marketing house I built the presence for from the ground up — the bilingual Arabic/English site on a custom WordPress theme, the brand system, and the tone of voice running through everything they publish. Not a delivery and a handshake: an ongoing partnership.',
    tags: ['Strategy', 'Brand identity', 'Campaigns', 'Content', 'SEO', 'Social'],
    statsLabel: 'What the brand runs at today',
    stats: [
      { v: '120+', k: 'Clients across KSA & the Gulf' },
      { v: '38M+', k: 'Ad impressions a year' },
      { v: '4.6x', k: 'Average return on ad spend' },
      { v: '96%', k: 'Client retention' },
    ],
    meta: ['Role — Partner', 'Build — WordPress, custom theme', 'Languages — AR / EN'],
    note: 'Certified partner of Google, Meta, TikTok and Snap.',
  },
  collection: {
    name: 'The 965 Collection',
    meta: 'Kuwait · three storefronts, one group · Arabic-first',
    items: [
      {
        href: 'https://965toys.com',
        eyebrow: 'Toys & play',
        mark: '965',
        markAccent: 'toys',
        body: 'An Arabic-first toy store for Kuwait: 25+ categories, shop-by-age from 0 to 9+, and fourteen licensed brands. KNET or cash on delivery, 24-hour nationwide delivery, and ordering straight through WhatsApp.',
        tags: ['WooCommerce', 'Shop by age', 'KNET · COD', 'WhatsApp'],
        domain: '965toys.com',
      },
      {
        href: 'https://965gym.com',
        eyebrow: 'Fitness equipment',
        mark: '965',
        markAccent: 'gym',
        body: 'Home and commercial fitness: racks, weights and flooring, martial-arts gear, cardio and smart trainers. Ten category groups, plus a gym design and fit-out service with certified warranty.',
        tags: ['WooCommerce', '10 categories', 'Gym fit-out', 'Warranty'],
        domain: '965gym.com',
      },
      {
        href: 'https://965play.com',
        eyebrow: 'Gaming & PC',
        mark: '965',
        markAccent: 'play',
        body: 'PlayStation, Xbox and Nintendo alongside custom gaming PC builds — components, peripherals, monitors, game cards and collectibles. Bilingual storefront with Google sign-in and live configuration.',
        tags: ['Custom builds', 'Bilingual', 'Google auth', 'Wishlist'],
        domain: '965play.com',
      },
    ],
  },
};

export const process = [
  {
    n: '01',
    t: 'Diagnose before proposing',
    d: 'I find where the hours actually go — not where you think they go. Most engagements start with me watching the process run once, end to end, and naming the two or three places worth fixing first.',
  },
  {
    n: '02',
    t: 'Architect the seams',
    d: "Decouple the layers and define the contract between them. It's why a voice command and a keyboard press hit the same robot pipeline, and why swapping a model or a vendor later doesn't mean a rebuild.",
  },
  {
    n: '03',
    t: 'Ship in phases, in the open',
    d: "Highest-pain module first, live within weeks, then the rest in batches with observation periods between. You get value before the project ends, and adoption happens while I'm still there to fix it.",
  },
  {
    n: '04',
    t: 'Hand over something maintainable',
    d: 'Plain-language documentation for every workflow, failure alerts that reach a human, and logging you can actually read. The measure of the job is whether it keeps running after I stop watching it.',
  },
];

export const about = {
  lead: "I'm Tarek — an engineer who ended up responsible for whether things actually work.",
  paragraphs: [
    'Robotics and automation is where I trained and where the standard came from. Building a UR5e that hears a spoken command, locates an object with a depth camera, plans a collision-free path and closes a gripper around it teaches you something no web project will: the system either works or it doesn’t, and it tells you immediately.',
    "Since then I've taken that same instinct into the businesses around me — decouple the layers, define the contract between them, and make the thing observable enough that when it breaks you know exactly where to look. That's how I built a medical platform running on seven integrated modules, a multi-tenant ERP live across two countries, automation that cut a team's manual workload by more than half, and the brands I now partner with.",
    'The work splits three ways now. Robotics and automation engineering. AI systems and custom software for operators who never found anything off the shelf that fit. And whole brand presences for the companies I partner with — QX Media in Riyadh, and the three 965 storefronts in Kuwait.',
  ],
  quote:
    '“A robot is the most honest system you can build. Either the gripper closes on the object or it closes on air.”',
  figure: { caption: 'FIG. 01 — T. OKASHA', coords: 'CAIRO / 30.04°N 31.24°E' },
  facts: [
    { k: 'Based', v: 'Cairo, Egypt' },
    { k: 'Working', v: 'Remote, worldwide' },
    { k: 'Languages', v: 'Arabic · English (C2) · German (B1)' },
    { k: 'Discipline', v: 'Robotics & Automation Engineering' },
  ],
  education: {
    school: 'German International University — GIU',
    detail: 'B.Sc. Mechanical Engineering, Robotics & Automation · expected June 2027',
    badges: [
      { label: 'Top 0.1% nationally', accent: true },
      { label: 'Rank #488 of ~700,000' },
      { label: 'Full merit scholarship' },
      { label: '#1 in graduating class' },
    ],
  },
};

export const stack = [
  {
    name: 'Robotics & Controls',
    items: [
      'ROS 2 · MoveIt 2 · RViz',
      'Motion & path planning',
      'Kinematics · PID control',
      'Isaac Sim · NVIDIA Omniverse',
      'PLC ladder logic · HMI',
      'SolidWorks · Fusion 360',
    ],
  },
  {
    name: 'AI Engineering',
    items: [
      'Claude API · OpenAI API',
      'RAG · MCP',
      'Agentic AI systems',
      'LLM orchestration',
      'OpenCV · computer vision',
      'n8n · workflow automation',
    ],
  },
  {
    name: 'Software',
    items: [
      'Python · C++ · TypeScript',
      'React · Node.js · Express',
      'MySQL · Postgres · SQL',
      'REST APIs · webhooks',
      'Multi-tenant · RBAC',
      'MATLAB · Bash',
    ],
  },
  {
    name: 'Practice',
    items: [
      'Technical team leadership',
      'Agile · Scrum · Kanban',
      'Jira',
      'Arabic-first / RTL',
      'WordPress · WooCommerce',
      'Identity & tone of voice',
    ],
  },
];

export const contact = {
  eyebrow: 'Currently booking projects',
  headline: "Let's build something that runs itself",
  body: "Tell me the process that's costing you the most hours, or the machine you want to move on its own. I'll tell you honestly whether I'm the right person to build it.",
  cvLabel: 'Full CV — education, roles and technical skills',
};
