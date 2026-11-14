/**
 * Copy for both CVs. One person, two tracks.
 * `**text**` marks a phrase to be set in bold. Everything else is plain text.
 */

export const person = {
  name: 'Tarek Okasha',
  portfolio: 'tarek-portfolio-phi.vercel.app',
  fields: [
    { k: 'Phone', v: '+20 155 157 0089', href: 'tel:+201551570089' },
    { k: 'Email', v: 'tarekokasha53@gmail.com', href: 'mailto:tarekokasha53@gmail.com' },
    { k: 'LinkedIn', v: 'linkedin.com/in/tarekokasha', href: 'https://www.linkedin.com/in/tarekokasha' },
    { k: 'GitHub', v: 'github.com/tarekokashha', href: 'https://github.com/tarekokashha' },
    { k: 'Location', v: 'Cairo, Egypt' },
    { k: 'Military status', v: 'Exempted' },
  ],
};

const education = (coursework) => ({
  title: 'B.Sc. Mechanical Engineering, Robotics & Automation',
  org: 'German International University (GIU)',
  date: 'Expected Jun 2027',
  bullets: [
    '**Full Merit Scholarship.** National rank **#488 of ~700,000** students (top 0.1%) and **#1** in high-school graduating class.',
    `Coursework: ${coursework}.`,
  ],
});

const arm = {
  flow: ['Voice command', 'Amazon Alexa', 'AWS Lambda', 'Claude API', 'ROS2 + MoveIt2', '6-DOF arm'],
};

/* ------------------------------------------------------------------ */

export const robotics = {
  file: 'Tarek_Okasha_CV_Robotics',
  theme: 'robotics',
  role: 'Robotics & Automation Engineer',
  roleNote: 'Class of 2027',
  summary:
    'Final-year Robotics & Automation student at GIU who works the whole chain: motion planning in ROS2 and MoveIt2, PLC control with safety interlocks, and the production software around the machine. Open to internships and graduate roles.',
  proof: [
    { v: 'Top 0.1%', k: 'National rank #488 of ~700,000. Full merit scholarship at GIU.' },
    { v: '6-DOF', k: 'Voice-controlled arm on ROS2 and MoveIt2. Team lead of three.' },
    { v: 'PLC + HMI', k: 'Filling and sorting station in ladder logic to IEC 61131-3.' },
    { v: '2 platforms', k: 'Production software led solo, from architecture to launch.' },
  ],
  sections: [
    { title: 'Education', entries: [education('Industrial Robots, Microcontrollers, Signals & Systems, Engineering Design, Linear Algebra')] },
    {
      title: 'Engineering Projects',
      entries: [
        {
          title: 'Voice-Controlled 6-DOF Robotic Arm',
          org: 'Team Lead, 3 engineers',
          date: 'Feb 2026 – Jun 2026',
          flow: arm.flow,
          bullets: [
            '**Led a 3-engineer team** designing and integrating the arm, and architected the real-time voice-to-motion pipeline.',
            'Used the Claude API to parse natural-language voice commands into **structured motion goals** executed by the MoveIt2 planner.',
            'Developed URDF models and implemented **inverse kinematics** for precise end-effector positioning, validated in RViz and ROS2 simulation. Published open source with CI and architecture documentation.',
          ],
        },
        {
          title: 'PLC-Controlled Bottle Filling & Sorting Station',
          date: 'Sep 2025 – Dec 2025',
          stack: 'Ladder Logic (IEC 61131-3) · HMI Design · SCADA',
          bullets: [
            'Designed and programmed **ladder-logic control** for filling and sorting, integrating conveyor motors, photoelectric and proximity sensors, fill-level monitoring, pneumatic sorting actuators, and **e-stop safety interlocks**.',
            'Built **HMI screens** for monitoring, fault diagnostics, and manual process control, modeled on Siemens industrial workflows.',
          ],
        },
      ],
      cards: {
        label: 'More builds on github.com/tarekokashha',
        items: [
          { t: 'UR5e Pick-and-Place', d: 'Kinect RGB-D perception on a UR5e.' },
          { t: 'UR5e Workcell', d: 'Ceiling-mounted UR5e cell in ROS2.' },
          { t: 'Line-Follower Robot Car', d: 'Bare-metal C on an ATmega32.' },
        ],
      },
    },
    {
      title: 'Professional Experience',
      entries: [
        {
          title: 'Freelance Software Engineer',
          org: 'Clients in Kuwait, Saudi Arabia & Egypt · Remote',
          date: 'Jul 2026 – Present',
          bullets: [
            'Build and run **The 965 Collection**, three Arabic-first WooCommerce storefronts for a Kuwaiti retail group, with city-aware delivery logic, KNET payments, and WhatsApp ordering. Also shipped a full-stack learning platform with per-device authorization (Kawkab Tegara) and a bilingual brand site for a Riyadh marketing house (QX Media).',
          ],
        },
        {
          title: 'Lead Software Engineer',
          org: 'Sportix · UAE, Remote',
          date: 'Jan 2026 – Jul 2026',
          bullets: [
            'Led end-to-end development of a **production medical platform with 7 integrated modules** (React, Node.js, MySQL), with role-based access control, Arabic RTL, and Claude API reporting that turns injury and vitals data into clinical insights.',
          ],
        },
        {
          title: 'ERP Systems Developer',
          org: 'Al-Helaly Constructions · Egypt & Gulf, Contract',
          date: 'Sep 2025 – Dec 2025',
          bullets: [
            'Developed a **multi-tenant ERP live across two countries**, with isolated tenant data, multi-currency support (EGP/USD), role-based access control, and audit logging.',
          ],
        },
        {
          title: 'Automation Developer',
          org: 'Shae Group · United States, Remote',
          date: 'May 2025 – Sep 2025',
          bullets: [
            'Built automation workflows across CRM, email, SMS, scheduling, and payments via APIs, webhooks, Python, and JavaScript, **cutting manual workload by more than 60%** and lead-response times from hours to minutes.',
          ],
        },
      ],
    },
    {
      title: 'Technical Skills',
      skills: [
        ['Robotics & Controls', 'ROS2, MoveIt2, RViz, URDF, Inverse Kinematics, Motion Planning, PID Control, OpenCV, Isaac Sim'],
        ['Industrial Automation', 'PLC (Ladder Logic, IEC 61131-3), HMI Design, SCADA, Sensors, Pneumatics, Safety Interlocks'],
        ['Embedded & Hardware', 'Universal Robots UR5e, Raspberry Pi 5, ATmega32 (bare-metal C), Arduino, Kinect RGB-D'],
        ['CAD & Mechanical', 'SolidWorks, Autodesk Fusion 360, AutoCAD'],
        ['Programming', 'Python, C++, C, MATLAB, JavaScript, TypeScript, SQL, Bash, Git, Linux'],
        ['AI & Software', 'Claude and OpenAI APIs, Agentic AI, MCP, AWS Lambda, Node.js, React, REST APIs, MySQL'],
        ['Languages', 'Arabic (Native), English (C2), German (B1)'],
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */

export const software = {
  file: 'Tarek_Okasha_CV_Software',
  theme: 'software',
  role: 'Full-Stack & AI Software Engineer',
  roleNote: 'Class of 2027',
  summary:
    'Final-year engineering student at GIU who already ships production software. Led a 7-module medical platform for a UAE client and built a multi-tenant ERP live in two countries. Open to internships and graduate roles.',
  proof: [
    { v: 'Top 0.1%', k: 'National rank #488 of ~700,000. Full merit scholarship at GIU.' },
    { v: '2 platforms', k: 'Production systems I led solo, from architecture to launch.' },
    { v: '60%+', k: 'Manual workload cut by the automation I built for a US client.' },
    { v: '5 countries', k: 'Clients in the UAE, Kuwait, Saudi Arabia, Egypt, and the USA.' },
  ],
  sections: [
    { title: 'Education', entries: [education('Linear Algebra, Microcontrollers, Signals & Systems, Engineering Design')] },
    {
      title: 'Professional Experience',
      entries: [
        {
          title: 'Freelance Software Engineer',
          org: 'Clients in Kuwait, Saudi Arabia & Egypt · Remote',
          date: 'Jul 2026 – Present',
          bullets: [
            '**The 965 Collection (Kuwait):** build and run three Arabic-first WooCommerce storefronts for one retail group (965play, 965gym, 965toys), with city-aware delivery pricing enforced server-side, KWD 3-decimal pricing, KNET and card payments, Google sign-in, and WhatsApp ordering.',
            '**Kawkab Tegara (Egypt):** built a full-stack Arabic RTL learning platform with 2 tracks and 7 year-stages, per-lesson progress, and per-device authorization that stops account sharing.',
            '**QX Media (Riyadh):** built the bilingual Arabic/English site on a custom WordPress theme, scoring **100 on mobile Lighthouse** accessibility and SEO with a 1.6s largest contentful paint.',
          ],
        },
        {
          title: 'Lead Software Engineer',
          org: 'Sportix · UAE, Remote',
          date: 'Jan 2026 – Jul 2026',
          stack: 'React · Node.js · Express · MySQL · Claude API',
          bullets: [
            'Led end-to-end development of a **production medical platform with 7 integrated modules and 16 database tables**, covering injury tracking, vitals, rehab, scheduling, equipment, and reporting.',
            'Integrated **AI reporting on the Claude API** that turns injury, vitals, and rehab data into clinical insights for medical staff.',
            'Implemented role-based access control and a full Arabic RTL interface for MENA deployment.',
          ],
        },
        {
          title: 'ERP Systems Developer',
          org: 'Al-Helaly Constructions · Egypt & Gulf, Contract',
          date: 'Sep 2025 – Dec 2025',
          bullets: [
            'Developed a **multi-tenant ERP live across two countries**, covering projects, inventory, payroll, procurement, machinery, vendors, and reporting, with isolated tenant data.',
            'Designed the database schema and a **multi-currency reporting engine** (EGP/USD), plus role-based access control, audit logging, and a bilingual Arabic/English interface, replacing fragmented spreadsheets with one source of truth.',
          ],
        },
        {
          title: 'Automation Developer',
          org: 'Shae Group · United States, Remote',
          date: 'May 2025 – Sep 2025',
          bullets: [
            'Built automation workflows across CRM, email, SMS, scheduling, and payments via APIs, webhooks, Python, and JavaScript, **cutting manual workload by more than 60%** and lead-response times from hours to minutes.',
          ],
        },
      ],
    },
    {
      title: 'Projects',
      entries: [
        {
          title: 'Voice-Controlled 6-DOF Robotic Arm',
          org: 'Team Lead, 3 engineers',
          date: 'Feb 2026 – Jun 2026',
          flow: arm.flow,
          bullets: [
            '**Led a 3-engineer team** building a real-time voice-to-motion pipeline in Python, using the Claude API to parse natural-language commands into structured motion goals. Open-source repository with CI and architecture docs.',
          ],
        },
      ],
    },
    {
      title: 'Technical Skills',
      skills: [
        ['Languages', 'JavaScript, TypeScript, Python, SQL, C++, C, Bash'],
        ['Frontend & Backend', 'React, Vite, Node.js, Express.js, REST APIs, Authentication, Role-Based Access Control, Arabic RTL UI'],
        ['Data & Architecture', 'MySQL, Supabase, Multi-Tenant Systems, Schema Design, Multi-Currency Reporting, Audit Logging'],
        ['AI & Automation', 'Claude API, OpenAI API, RAG, MCP, Agentic AI Systems, LLM Orchestration, n8n, GoHighLevel, Webhooks, AWS Lambda'],
        ['Platforms & Tools', 'Git/GitHub, CI, Linux, Vercel, cPanel/VPS, WordPress/WooCommerce, FlutterFlow, Jira, Agile/Scrum'],
        ['Robotics', 'ROS2, MoveIt2, OpenCV, PLC Programming (Ladder Logic)'],
        ['Spoken Languages', 'Arabic (Native), English (C2), German (B1)'],
      ],
    },
  ],
};

export const variants = [robotics, software];
