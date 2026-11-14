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

const education = {
  title: 'B.Sc. Mechanical Engineering, Robotics & Automation',
  org: 'German International University (GIU)',
  date: 'Expected Jun 2027',
  bullets: [
    '**Full Merit Scholarship.** National rank **#488 of ~700,000** students (top 0.1%) and **#1** in high-school graduating class.',
  ],
};

const armFlow = ['Voice command', 'Amazon Alexa', 'AWS Lambda', 'ROS2 bridge', 'MoveIt2 + OMPL', 'UR5e'];

/* ------------------------------------------------------------------ */

export const robotics = {
  file: 'Tarek_Okasha_CV_Robotics',
  theme: 'robotics',
  role: 'Robotics & Automation Engineer',
  roleNote: 'Class of 2027',
  summary:
    'Final-year Robotics & Automation student at GIU, working on a UR5e with depth vision in the university lab: ROS2 and MoveIt2 motion planning, robot-learning safety research, and PLC control. Open to internships and graduate roles.',
  proof: [
    { v: 'Top 0.1%', k: 'National rank #488 of ~700,000. Full merit scholarship at GIU.' },
    { v: '6M decisions', k: 'Thrown at my UR5e safety kernel in simulation. Zero escapes.' },
    { v: 'UR5e', k: 'Voice and depth-camera pick-and-place on ROS2 and MoveIt2.' },
    { v: 'Team of 4', k: 'Software team I lead for a retail group in Kuwait.' },
  ],
  sections: [
    { title: 'Education', entries: [education] },
    {
      title: 'Robotics Projects',
      entries: [
        {
          title: 'MIZAN: Safety and Data Integrity for Robot Learning',
          org: 'Independent research, open source',
          date: 'Sep 2026',
          bullets: [
            '**Safety kernel for the UR5e** that sits between a learned policy and the arm. Tested against 15 adversarial attacks over 200 episodes each: **6 million control decisions, zero escapes** in simulation.',
            '**Audited 400 LeRobot datasets** sampled from 75,750 on the Hugging Face Hub and found about **1 in 30 carries a confirmed recording defect**. Python, 186 automated tests, CI.',
            'Wrote a UR5e driver for LeRobot and composed it with the kernel, which exposed two defects neither side could see alone.',
          ],
        },
        {
          title: 'Voice-Controlled UR5e Pick-and-Place',
          org: 'Team Lead, 3 engineers',
          date: 'Feb 2026 – Jun 2026',
          flow: armFlow,
          bullets: [
            '**Led a 3-engineer team** building a voice-to-motion pipeline as four decoupled ROS2 nodes with three interchangeable inputs.',
            'MoveIt2 planning with OMPL RRTConnect to a **1 cm position tolerance**, validated in simulation with RViz2. Open source with CI.',
          ],
        },
        {
          title: 'UR5e Vision Pick-and-Place',
          org: 'Kinect RGB-D, Robotiq 2F-85',
          date: '2026',
          bullets: [
            'Depth-guided grasping: **HSV segmentation and contour analysis at 10 to 15 Hz**, pixel-to-3D back-projection from Kinect depth, and a 9-step MoveIt2 pick-and-place sequence with automatic home recovery on failure.',
          ],
        },
        {
          title: 'PLC-Controlled Bottle Filling & Sorting Station',
          org: 'Ladder Logic (IEC 61131-3), HMI, SCADA',
          date: 'Sep 2025 – Dec 2025',
          bullets: [
            'Programmed **ladder-logic control** for filling and sorting with conveyor motors, photoelectric and proximity sensors, pneumatic actuators, and **e-stop safety interlocks**, plus **HMI screens** for monitoring and fault diagnostics.',
          ],
        },
      ],
      cards: {
        items: [
          { t: 'Ceiling-Mounted UR5e Workcell', d: 'URDF/xacro description with a Robotiq 2F-85 gripper, in ROS2.' },
          { t: 'Line-Follower Robot Car', d: 'Bare-metal C on an ATmega32, with a 200 Hz control loop.' },
        ],
      },
    },
    {
      title: 'Professional Experience',
      entries: [
        {
          title: 'Software Team Lead',
          org: 'The 965 Collection · Kuwait, Remote',
          date: 'Jul 2026 – Present',
          bullets: [
            '**Lead a team of 4** and built hands-on three Arabic-first e-commerce stores for one Kuwaiti retail group (965play, 965gym, 965toys), with city-aware delivery rules enforced on the server and KNET payments.',
          ],
        },
        {
          title: 'Lead Software Engineer',
          org: 'Sportix · UAE, Remote',
          date: 'Jan 2026 – Jul 2026',
          bullets: [
            'Led end-to-end development of a **production medical platform with 7 integrated modules** (React, Node.js, MySQL), with role-based access control, Arabic RTL, and AI clinical reporting on the Claude API.',
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
            'Built automation workflows across CRM, email, SMS, scheduling, and payments, **cutting manual workload by more than 60%** and lead-response times from hours to minutes.',
          ],
        },
      ],
    },
    {
      title: 'Technical Skills',
      skills: [
        ['Robotics & Controls', 'ROS2, MoveIt2, OMPL, RViz, URDF/xacro, Inverse Kinematics, Motion Planning, PID Control, LeRobot'],
        ['Vision & Simulation', 'OpenCV, RGB-D depth processing, HSV segmentation, Isaac Sim'],
        ['Industrial Automation', 'PLC (Ladder Logic, IEC 61131-3), HMI Design, SCADA, Sensors, Pneumatics, Safety Interlocks'],
        ['Hardware & CAD', 'UR5e, Robotiq 2F-85, Kinect RGB-D, Raspberry Pi 5, ATmega32, Arduino, SolidWorks, Fusion 360, AutoCAD'],
        ['Programming', 'Python, C++, C, MATLAB, JavaScript, TypeScript, SQL, Bash, Git, Linux, pytest, CI'],
        ['Languages', 'Arabic (Native), English (C1), German (A2)'],
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
    'Final-year engineering student at GIU who already ships production software. Leads a team of four behind three live stores in Kuwait and led a 7-module medical platform for a UAE client. Open to internships and graduate roles.',
  proof: [
    { v: 'Top 0.1%', k: 'National rank #488 of ~700,000. Full merit scholarship at GIU.' },
    { v: 'Team of 4', k: 'Engineers I lead across three live e-commerce stores in Kuwait.' },
    { v: '2 platforms', k: 'Production systems I led solo, from architecture to launch.' },
    { v: '60%+', k: 'Manual workload cut by the automation I built for a US client.' },
  ],
  sections: [
    { title: 'Education', entries: [education] },
    {
      title: 'Professional Experience',
      entries: [
        {
          title: 'Software Team Lead',
          org: 'The 965 Collection · Kuwait, Remote',
          date: 'Jul 2026 – Present',
          bullets: [
            '**Lead a team of 4** building and running three Arabic-first WooCommerce stores for one Kuwaiti retail group (965play, 965gym, 965toys), and built the storefronts hands-on.',
            'Engineered **city-aware checkout** on 965play: delivery priced by city and re-checked on the server, so no order completes with the wrong service. KWD 3-decimal pricing, KNET and card payments.',
            'Set the release process: every audit finding labelled confirmed, to recheck, or planned, and **no payment, shipping or cache change ships without a tested restore point**.',
          ],
        },
        {
          title: 'Freelance Software Engineer',
          org: 'QX Media · Riyadh, Remote',
          date: 'Jul 2026 – Oct 2026',
          bullets: [
            'Built the bilingual Arabic/English site on a custom WordPress theme, scoring **100 on mobile Lighthouse** accessibility and SEO with a 1.6s largest contentful paint.',
          ],
        },
        {
          title: 'Lead Software Engineer',
          org: 'Sportix · UAE, Remote',
          date: 'Jan 2026 – Jul 2026',
          bullets: [
            'Led end-to-end development of a **production medical platform with 7 integrated modules and 16 database tables** on React, Node.js, and MySQL, covering injury tracking, vitals, rehab, scheduling, and reporting.',
            'Integrated **AI reporting on the Claude API** that turns injury, vitals, and rehab data into clinical insights for medical staff, with role-based access control and a full Arabic RTL interface.',
          ],
        },
        {
          title: 'ERP Systems Developer',
          org: 'Al-Helaly Constructions · Egypt & Gulf, Contract',
          date: 'Sep 2025 – Dec 2025',
          bullets: [
            'Developed a **multi-tenant ERP live across two countries**, covering projects, inventory, payroll, procurement, machinery, vendors, and reporting, with isolated tenant data.',
            'Designed the database schema and a **multi-currency reporting engine** (EGP/USD), plus role-based access control, audit logging, and a bilingual Arabic/English interface.',
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
          title: 'MIZAN: Safety and Data Tooling for Robot Learning',
          org: 'Open source, Python',
          date: 'Sep 2026',
          bullets: [
            'Audited **400 robot-learning datasets** from the Hugging Face Hub and built a safety kernel tested over **6 million simulated control decisions** with zero escapes. 186 automated tests, CI on every push.',
          ],
        },
        {
          title: 'Voice-Controlled UR5e Robot Arm',
          org: 'Team Lead, 3 engineers',
          date: 'Feb 2026 – Jun 2026',
          bullets: [
            '**Led a 3-engineer team** building a voice-to-motion pipeline (Alexa → AWS Lambda → ROS2 → MoveIt2) as four decoupled nodes. Open source with CI and architecture docs.',
          ],
        },
      ],
    },
    {
      title: 'Technical Skills',
      skills: [
        ['Languages', 'JavaScript, TypeScript, Python, SQL, C++, C, Bash'],
        ['Frontend & Backend', 'React, Next.js, Vite, Node.js, Express.js, REST APIs, Authentication, Role-Based Access Control, RTL UI'],
        ['Data & Architecture', 'MySQL, PostgreSQL, Prisma, Supabase, Multi-Tenant Systems, Schema Design, Audit Logging'],
        ['AI & Automation', 'Claude API, OpenAI API, RAG, MCP, Agentic AI, LLM Orchestration, n8n, Webhooks, AWS Lambda'],
        ['Platforms & Tools', 'Git/GitHub, CI, Docker, Linux, Vercel, WordPress/WooCommerce, Jira, Agile/Scrum'],
        ['Robotics', 'ROS2, MoveIt2, OpenCV, PLC Programming (Ladder Logic)'],
        ['Spoken Languages', 'Arabic (Native), English (C1), German (A2)'],
      ],
    },
  ],
};

export const variants = [robotics, software];
