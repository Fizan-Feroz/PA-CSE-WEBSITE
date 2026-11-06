// Canonical Department & Academic Data for P.A. College of Engineering (PACE) Mangaluru
// Sourced from pace.edu.in · Department of Computer Science & Engineering (Established 2000)

export const COLLEGE_INFO = {
  name: 'P.A. College of Engineering',
  shortName: 'PACE',
  department: 'Department of Computer Science & Engineering',
  established: 2000,
  trust: 'P.A. Educational Trust (Est. 1999 by Dr. P.A. Ibrahim Haji)',
  affiliation: 'Affiliated to Visvesvaraya Technological University (VTU), Belagavi',
  approvals: 'Approved by AICTE, New Delhi',
  accreditation: 'Accredited by National Board of Accreditation (NBA), Tier-1',
  principal: 'Dr. Ramis M. K.',
  vicePrincipalAndHod: 'Dr. Sharmila Kumari M.',
  campusAddress: 'Nadupadav, Montepadav Post, Kairangala, Mangalore - 574153, Karnataka, India',
  coordinates: '12.85° N · 74.96° E',
  contact: {
    phone: '0824-2284701 / 02 / 03 / 04',
    admissions: '+91 9980022000',
    email: 'info@pace.edu.in',
    hodEmail: 'hod_cs@pace.edu.in',
    admissionEmail: 'admission@pace.edu.in',
    website: 'https://pace.edu.in'
  },
  vision: 'To prosper the students as competent professionals in the field of Computer Science and Engineering for serving industry and society as a valuable human resource.',
  mission: [
    'To impart quality education by implementing state-of-the-art teaching-learning methods to enrich academic competency.',
    'To inculcate in the students to pursue careers in industry, academic, and research.',
    'To enrich the aptitude of the students in Computer Science and Engineering to face real-world problems.',
    'To foster computing skills with an emphasis on professional competency, interpersonal development, and ethics.'
  ],
  associations: [
    { name: 'ASCII', fullName: 'Association of Computer Science Students Innovative Intellectuals (@ascii_pace)' },
    { name: 'GLUG PACE', fullName: 'GNU/Linux Users Group PACE (@glugpace · FSMK Chapter)' },
    { name: 'Embed Club', fullName: 'Embedded Systems & Hardware Innovation Community (@embedclub)' },
    { name: 'IEEE Student Branch', fullName: 'IEEE PACE Student Chapter (IEEE Mangalore Subsection)' },
    { name: 'CSI Chapter', fullName: 'Computer Society of India Institutional Chapter' }
  ]
};

export const CSE_DOMAINS = [
  {
    id: 'ai-ml',
    code: 'TRACK-01',
    name: 'Artificial Intelligence & Machine Learning',
    shortName: 'AI & Machine Learning',
    summary: 'Deep neural networks, computer vision, natural language understanding, and edge machine learning deployment pipelines.',
    head: 'Dr. Sharmila Kumari M.',
    labs: ['AI & ML Lab', 'Advanced Computing Center'],
    coursesCount: 14,
    skills: ['PyTorch', 'TensorFlow', 'ONNX Runtime', 'Computer Vision', 'Generative AI', 'CUDA'],
    featuredCourse: '21CS701: Deep Learning & Computer Vision Architectures'
  },
  {
    id: 'cybersecurity',
    code: 'TRACK-02',
    name: 'Cybersecurity, Cryptography & Digital Forensics',
    shortName: 'Cybersecurity & Forensics',
    summary: 'Offensive and defensive security, binary reverse engineering, cryptographic protocol verification, and SOC operations.',
    head: 'Prof. Mohammed Saifudeen',
    labs: ['Cyber Security & SOC Range', 'ICSB Range'],
    coursesCount: 11,
    skills: ['Reverse Engineering', 'Wireshark', 'Burp Suite', 'Ghidra', 'TLS 1.3', 'Zero-Trust Networks'],
    featuredCourse: '21CS602: Cryptography, Zero-Knowledge Proofs & Network Security'
  },
  {
    id: 'cloud-devops',
    code: 'TRACK-03',
    name: 'Cloud Computing, Virtualization & DevOps',
    shortName: 'Cloud & Distributed Systems',
    summary: 'Fault-tolerant distributed microservices, container orchestration, Kubernetes operators, and automated infrastructure as code.',
    head: 'Prof. Habeeb Ur Rehman P.B.',
    labs: ['AWS Cloud Innovation Lab', 'Network Virtualization Lab'],
    coursesCount: 12,
    skills: ['Docker', 'Kubernetes', 'Terraform', 'AWS Lambda', 'gRPC', 'Prometheus & Grafana'],
    featuredCourse: '21CS503: Cloud Architecture, Microservices & Container Orchestration'
  },
  {
    id: 'fullstack-systems',
    code: 'TRACK-04',
    name: 'Full-Stack Software Engineering & Compilers',
    shortName: 'Systems & Software Engineering',
    summary: 'Low-latency backend services, compiler design, AST transformations, modern reactive web engines, and concurrent algorithms.',
    head: 'Prof. Anushree Raj',
    labs: ['Programming & Open-Source Lab', 'GLUG PACE Center'],
    coursesCount: 16,
    skills: ['Go', 'Rust', 'React 19', 'Node.js', 'PostgreSQL', 'LLVM & Compiler Tools'],
    featuredCourse: '21CS401: Advanced Analysis of Algorithms & Systems Programming'
  },
  {
    id: 'iot-robotics',
    code: 'TRACK-05',
    name: 'Internet of Things, Embedded Systems & Blockchain',
    shortName: 'IoT, Embedded & Blockchain',
    summary: 'Low-power microcontrollers, LoRaWAN telemetry, real-time operating systems (FreeRTOS), and decentralized ledger consensus protocols.',
    head: 'Prof. Afeefa Nazneen N. Z.',
    labs: ['IoT & Embedded Systems Lab', 'AICTE-IDEA Prototype Lab'],
    coursesCount: 10,
    skills: ['ESP32', 'FreeRTOS', 'LoRa SX1262', 'Solidity', 'MQTT & CoAP', 'Hardware Interfacing'],
    featuredCourse: '21CS604: Embedded Systems Design & Distributed Ledger Consensus'
  }
];

export const FACULTY_MEMBERS = [
  {
    id: 'fac-1',
    name: 'Dr. Sharmila Kumari M.',
    designation: 'Vice-Principal, Professor & Head of Department',
    department: 'Artificial Intelligence & Machine Learning',
    qualification: 'B.E., M.Tech., Ph.D.',
    experience: '24+ Years Academic & Research',
    specialization: 'Pattern Recognition, Image Processing, AI & Machine Learning',
    email: 'hod_cs@pace.edu.in',
    office: 'Academic Block A, Ground Floor, Room 102',
    publications: 48,
    tags: ['Ph.D. Supervisor', 'Image Processing', 'Pattern Recognition', 'VTU BOS Member']
  },
  {
    id: 'fac-2',
    name: 'Prof. Mohammed Saifudeen',
    designation: 'Assistant Professor & Lab In-charge',
    department: 'Cybersecurity & Forensics',
    qualification: 'B.E., M.Tech., (Ph.D.)',
    experience: '14+ Years',
    specialization: 'Distributed Systems, Network Security & Ethical Hacking',
    email: 'saifudeen@pace.edu.in',
    office: 'Academic Block A, Level 2, Room 204',
    publications: 16,
    tags: ['Cyber Range Lead', 'Network Security', 'Distributed Systems']
  },
  {
    id: 'fac-3',
    name: 'Prof. Habeeb Ur Rehman P.B.',
    designation: 'Assistant Professor & Industry Liaison',
    department: 'Cloud & Distributed Systems',
    qualification: 'B.E., M.Tech.',
    experience: '12+ Years',
    specialization: 'Cloud Infrastructure, Microservices, Computer Networks & IoT',
    email: 'habeeb@pace.edu.in',
    office: 'Academic Block A, Level 3, Room 305',
    publications: 12,
    tags: ['AWS Academy Lead', 'Cloud Architect', 'DevOps Mentor']
  },
  {
    id: 'fac-4',
    name: 'Prof. Anushree Raj',
    designation: 'Assistant Professor & Academic Coordinator',
    department: 'Systems & Software Engineering',
    qualification: 'B.E., M.Tech.',
    experience: '11+ Years',
    specialization: 'Database Systems, Web Technologies, Data Mining & Analytics',
    email: 'anushree@pace.edu.in',
    office: 'Academic Block A, Level 1, Room 114',
    publications: 14,
    tags: ['ASCII Faculty Mentor', 'Full-Stack Web', 'DBMS']
  },
  {
    id: 'fac-5',
    name: 'Prof. Fathimath Zuhara V.',
    designation: 'Assistant Professor & Project Coordinator',
    department: 'Systems & Software Engineering',
    qualification: 'B.E., M.Tech.',
    experience: '10+ Years',
    specialization: 'Software Engineering, Object-Oriented Analysis & Compiler Design',
    email: 'zuhara@pace.edu.in',
    office: 'Academic Block A, Level 1, Room 116',
    publications: 9,
    tags: ['Software Engineering', 'Algorithms', 'Final Year Projects']
  },
  {
    id: 'fac-6',
    name: 'Prof. Mohammed Hafeez M.K.',
    designation: 'Assistant Professor & Systems Administrator',
    department: 'Systems & Software Engineering',
    qualification: 'B.E., M.Tech.',
    experience: '9+ Years',
    specialization: 'Operating Systems Internals, Linux Kernel, Computer Architecture',
    email: 'hafeez@pace.edu.in',
    office: 'Academic Block A, Ground Floor, Room 108',
    publications: 8,
    tags: ['GLUG PACE Convener', 'Linux Kernel', 'Computer Organization']
  },
  {
    id: 'fac-7',
    name: 'Prof. Afeefa Nazneen N. Z.',
    designation: 'Assistant Professor & IoT Range In-charge',
    department: 'IoT, Embedded & Blockchain',
    qualification: 'B.E., M.Tech.',
    experience: '8+ Years',
    specialization: 'IoT Sensors, Embedded Microcontrollers, Blockchain Architecture',
    email: 'afeefa@pace.edu.in',
    office: 'Academic Block A, Level 2, Room 210',
    publications: 11,
    tags: ['ICSB In-charge', 'Blockchain', 'Smart Sensor Networks']
  },
  {
    id: 'fac-8',
    name: 'Prof. Sakeena',
    designation: 'Assistant Professor & Seminar In-charge',
    department: 'Artificial Intelligence & Machine Learning',
    qualification: 'B.E., M.Tech.',
    experience: '7+ Years',
    specialization: 'Data Science, Applied Statistics, Machine Learning Models',
    email: 'sakeena@pace.edu.in',
    office: 'Academic Block A, Level 2, Room 212',
    publications: 7,
    tags: ['Data Science', 'Machine Learning', 'Python Programming']
  }
];

export const LABORATORIES = [
  {
    id: 'lab-1',
    code: 'LAB-101',
    name: 'Artificial Intelligence & High Performance Computing Lab',
    purpose: 'Model training for deep neural networks, computer vision inference, and parallel CUDA computing.',
    hardware: 'Workstations with NVIDIA RTX 4080 GPUs, Intel Xeon W-series, 64GB DDR5 RAM, 10GbE LAN',
    capacity: '36 Workstations',
    inCharge: 'Dr. Sharmila Kumari M.',
    activeTools: ['PyTorch 2.5', 'TensorFlow', 'CUDA Toolkit 12', 'JupyterHub Server', 'OpenCV']
  },
  {
    id: 'lab-2',
    code: 'LAB-204',
    name: 'Cyber Security & Network Forensics Range',
    purpose: 'Air-gapped ethical hacking, penetration testing, malware analysis sandbox, and capture-the-flag drills.',
    hardware: 'Dual-NIC isolated network racks, hardware packet sniffers, managed Cisco Gigabit switches',
    capacity: '32 Workstations',
    inCharge: 'Prof. Mohammed Saifudeen',
    activeTools: ['Kali Linux Rolling', 'Wireshark', 'Burp Suite Pro', 'Ghidra', 'Metasploit', 'Snort IDS']
  },
  {
    id: 'lab-3',
    code: 'LAB-305',
    name: 'Cloud Computing & AWS Academy Studio',
    purpose: 'Distributed systems staging, containerized microservice deployments, and CI/CD pipelines.',
    hardware: 'Dedicated compute cluster, Kubernetes master/worker nodes, AWS Academy Cloud Lab accounts',
    capacity: '36 Workstations',
    inCharge: 'Prof. Habeeb Ur Rehman P.B.',
    activeTools: ['Docker Enterprise', 'Kubernetes (k3s/k8s)', 'Terraform', 'Prometheus', 'Grafana', 'GitLab CI']
  },
  {
    id: 'lab-4',
    code: 'LAB-105',
    name: 'GLUG PACE & Open Source Systems Lab',
    purpose: 'Kernel compilation, Unix systems programming, FOSS community projects, and low-level C/C++ development.',
    hardware: 'Custom Dell OptiPlex rigs running Debian & Arch Linux, serial TTL debug headers',
    capacity: '40 Workstations',
    inCharge: 'Prof. Mohammed Hafeez M.K.',
    activeTools: ['GCC/Clang Toolchain', 'QEMU/KVM', 'GDB Debugger', 'Vim/Neovim', 'Git', 'Linux 6.x Source']
  },
  {
    id: 'lab-5',
    code: 'LAB-210',
    name: 'IoT, Smart Sensors & Blockchain Lab (ICSB)',
    purpose: 'Embedded firmware debugging, LoRaWAN sensor networks, smart metering, and smart contract execution.',
    hardware: 'ESP32 development rigs, STM32 ARM Cortex-M4 boards, LoRa gateways, digital oscilloscopes',
    capacity: '30 Workstations',
    inCharge: 'Prof. Afeefa Nazneen N. Z.',
    activeTools: ['FreeRTOS', 'PlatformIO', 'Hardhat & Foundry', 'MQTT Broker', 'Logic Analyzers']
  },
  {
    id: 'lab-6',
    code: 'LAB-112',
    name: 'Database & Advanced Software Engineering Studio',
    purpose: 'Relational & distributed database design, ACID compliance tests, query profiling, and full-stack software architecture.',
    hardware: 'Intel Core i7 Workstations, dedicated PostgreSQL and Redis staging servers',
    capacity: '36 Workstations',
    inCharge: 'Prof. Anushree Raj',
    activeTools: ['PostgreSQL 16', 'MongoDB Enterprise', 'Redis', 'Node.js', 'React 19', 'Postman']
  }
];

export const COURSES_SYLLABI = [
  {
    code: '21CS301',
    title: 'Data Structures & Algorithmic Analysis',
    semester: 'Semester 3',
    credits: 4,
    domain: 'Full-Stack Software Engineering & Compilers',
    topics: ['Self-Balancing Trees (AVL, Red-Black)', 'Graph Traversals (BFS, DFS, Dijkstra)', 'Amortized Complexity Analysis', 'Hash Tables & Bloom Filters', 'Dynamic Memory Management']
  },
  {
    code: '21CS302',
    title: 'Discrete Mathematical Structures & Logic',
    semester: 'Semester 3',
    credits: 3,
    domain: 'Artificial Intelligence & Machine Learning',
    topics: ['Propositional & Predicate Calculus', 'Combinatorics & Recurrence Relations', 'Graph Theory Foundations', 'Algebraic Structures & Monoids', 'Boolean Algebra & Lattice Theory']
  },
  {
    code: '21CS401',
    title: 'Design & Analysis of Algorithms',
    semester: 'Semester 4',
    credits: 4,
    domain: 'Full-Stack Software Engineering & Compilers',
    topics: ['Divide and Conquer Paradigms', 'Dynamic Programming Optimization', 'Greedy Heuristics', 'Backtracking & Branch-and-Bound', 'NP-Completeness & P-Space Verification']
  },
  {
    code: '21CS402',
    title: 'Operating Systems & Concurrency',
    semester: 'Semester 4',
    credits: 4,
    domain: 'Full-Stack Software Engineering & Compilers',
    topics: ['Process Scheduling & Context Switching', 'POSIX Multithreading & Mutexes', 'Virtual Memory Management & Paging', 'File System Drivers (ext4, zfs)', 'Deadlock Detection & Prevention']
  },
  {
    code: '21CS501',
    title: 'Computer Networks & Internetworking',
    semester: 'Semester 5',
    credits: 4,
    domain: 'Cloud Computing, Virtualization & DevOps',
    topics: ['TCP/IP Protocol Suite & Handshakes', 'BGP & OSPF Routing Protocols', 'Socket Programming in C/Python', 'DNS Infrastructure & CDN Architecture', 'Software-Defined Networking (SDN)']
  },
  {
    code: '21CS502',
    title: 'Database Management Systems & Modeling',
    semester: 'Semester 5',
    credits: 4,
    domain: 'Full-Stack Software Engineering & Compilers',
    topics: ['Relational Algebra & Normalization (BCNF, 4NF)', 'Query Optimization & B+ Tree Indexing', 'ACID Transactions & Two-Phase Locking', 'Distributed CAP Theorem', 'WAL & Crash Recovery Mechanisms']
  },
  {
    code: '21CS503',
    title: 'Cloud Architecture & Microservices',
    semester: 'Semester 5',
    credits: 3,
    domain: 'Cloud Computing, Virtualization & DevOps',
    topics: ['AWS Well-Architected Framework', 'Kubernetes Pod Scheduling & Services', 'Service Meshes & Envoy Proxy', 'Twelve-Factor App Methodology', 'Event-Driven Messaging (Kafka, SQS)']
  },
  {
    code: '21CS601',
    title: 'Machine Learning & Statistical Pattern Recognition',
    semester: 'Semester 6',
    credits: 4,
    domain: 'Artificial Intelligence & Machine Learning',
    topics: ['Supervised Learning (SVM, Random Forests)', 'Unsupervised Clustering & PCA', 'Backpropagation & Gradient Descent', 'Regularization & Bias-Variance Tradeoff', 'Ensemble Methods & XGBoost']
  },
  {
    code: '21CS602',
    title: 'Cryptography & Network Security',
    semester: 'Semester 6',
    credits: 3,
    domain: 'Cybersecurity, Cryptography & Digital Forensics',
    topics: ['AES & RSA Algorithms', 'Elliptic Curve Cryptography (ECC)', 'Zero-Knowledge Proofs', 'TLS 1.3 Handshake Security', 'OAuth2 & JWT Token Verification']
  },
  {
    code: '21CS604',
    title: 'Embedded Systems & Real-Time IoT',
    semester: 'Semester 6',
    credits: 3,
    domain: 'Internet of Things, Embedded Systems & Blockchain',
    topics: ['ARM Cortex-M Architecture', 'FreeRTOS Task Scheduling & Queues', 'I2C, SPI & UART Protocol Drivers', 'LoRaWAN Long-Range Transmissions', 'MQTT Edge Data Ingestion']
  }
];

export const STUDENT_PROJECTS = [
  {
    id: 'proj-1',
    title: 'MedhaDrishti AI: Retinal Pathological Diagnostic Assistant',
    team: 'PACE AI Research Cohort',
    domain: 'Artificial Intelligence & Computer Vision',
    status: 'Third Place @ MedhaDrishti National AI Hackathon',
    description: 'Deep convolutional network for early diabetic retinopathy and glaucoma screening from fundus photography, mentored under the PACE VTU Research Centre.',
    technologies: ['PyTorch', 'ResNet-50', 'OpenCV', 'FastAPI', 'Flutter Mobile']
  },
  {
    id: 'proj-2',
    title: 'AuraNet: Decentralized Disaster Mesh Communication Network',
    team: 'Embed Club & ASCII PACE',
    domain: 'Internet of Things & Edge Systems',
    status: 'Smart India Hackathon Finalist & KSCST Grantee',
    description: 'Off-grid emergency communications system using LoRa peer-to-peer radio relaying coordinates and medical triage telemetry during cellular outages.',
    technologies: ['ESP32', 'LoRa SX1262', 'React PWA', 'WebSockets', 'FreeRTOS']
  },
  {
    id: 'proj-3',
    title: 'DeepShield: Real-time Audio & Video Synthetic Media Sentinel',
    team: 'SentinelX Research Group',
    domain: 'Cybersecurity & Machine Learning',
    status: 'Funded by KSCST 47th Series Student Project Scheme',
    description: 'A browser extension and API pipeline that analyzes facial micro-movements, blood flow photoplethysmography (PPG), and spectral voice artifacts to detect deepfakes.',
    technologies: ['PyTorch', 'FastAPI', 'ONNX Runtime', 'WebExtension API', 'OpenCV']
  },
  {
    id: 'proj-4',
    title: 'CampusPulse: Smart Campus Energy & Classroom Analytics',
    team: 'PACE Green Campus Initiative',
    domain: 'Artificial Intelligence & IoT',
    status: 'Operational in PACE Academic Block A',
    description: 'Computer vision camera nodes tracking room occupancy to dynamically regulate HVAC cooling and illumination, achieving 34% energy savings.',
    technologies: ['YOLOv8', 'Edge TPU', 'MQTT', 'InfluxDB', 'Grafana Dashboard']
  }
];

export const UPCOMING_EVENTS = [
  {
    id: 'ev-1',
    title: 'TECHNIX 2026: Annual Inter-Collegiate Technical Symposium',
    date: 'Dec 04–05, 2026',
    venue: 'PACE Central Auditorium & CSE Computer Labs',
    type: 'ASCII Flagship Fest',
    description: 'Flagship departmental symposium organized by ASCII (@ascii_pace) featuring Code War, Web Sculpt, Bug Hunting relays, and Mock Placement drives.'
  },
  {
    id: 'ev-2',
    title: 'InnoV8rix X HackSummit: 24-Hour National Hackathon',
    date: 'Nov 27–28, 2026',
    venue: 'GLUG Open Source Lab (LAB-105) & Campus Hub',
    type: 'National Hackathon',
    description: 'Flagship open-source hackathon organized by GLUG PACE (@glugpace) in association with FSMK & IEEE Mangalore Subsection, focusing on AI and FOSS tooling.'
  },
  {
    id: 'ev-3',
    title: 'SPARK: Multi-Disciplinary Departmental Project Exhibition',
    date: 'Nov 18, 2026',
    venue: 'Academic Block A Ground Foyer',
    type: 'Project Exhibition',
    description: 'Annual project showcase and poster competition presenting KSCST-funded research, Embed Club hardware prototypes, and final-year capstone solutions.'
  },
  {
    id: 'ev-4',
    title: 'FSMK & GLUG PACE: Hands-on Linux Kernel & Systems Drive',
    date: 'Nov 12, 2026',
    venue: 'GLUG Open Source Lab (LAB-105)',
    type: 'Hands-on Workshop',
    description: 'Full-day workshop on Linux kernel compilation, device drivers, Free Software Movement Karnataka philosophy, and upstream open-source contribution.'
  }
];

export const DEPARTMENT_MILESTONES = [
  {
    year: '2000',
    title: 'Department Foundation',
    phase: 'Institutional Inception',
    desc: 'Establishment of Computer Science & Engineering department under Visvesvaraya Technological University (VTU) Belagavi with initial 60 student intake.'
  },
  {
    year: '2006',
    title: 'High Performance Computing Lab',
    phase: 'Campus Infrastructure',
    desc: 'Inauguration of campus-wide gigabit fiber-optic backbone, dedicated Linux computer clusters, and founding of GLUG PACE open-source community.'
  },
  {
    year: '2012',
    title: 'NBA Tier-1 Accreditation',
    phase: 'Quality Milestone',
    desc: 'First National Board of Accreditation (NBA) Tier-1 accreditation recognizing outcome-based education pedagogy and research competency.'
  },
  {
    year: '2016',
    title: 'VTU Recognized Research Centre',
    phase: 'Doctoral Center',
    desc: 'Official sanctioning as a VTU Recognized Research Centre for Ph.D. and M.Sc. (Engg.) research scholars in advanced computer science domains.'
  },
  {
    year: '2019',
    title: 'ASCII & Centers of Excellence',
    phase: 'Student Chapters',
    desc: 'Consolidation of ASCII (Association of Computer Science Students Innovative Intellectuals), AWS Academy Studio, and Cisco Networking Academy.'
  },
  {
    year: '2022',
    title: 'Cyber Range & AI Lab Expansion',
    phase: 'Specialized Labs',
    desc: 'Launch of air-gapped Cyber Security & Forensics SOC Range, state-of-the-art GPU AI/ML research workstations, and NBA Re-Accreditation.'
  },
  {
    year: '2024',
    title: 'Autonomous Scheme & Smart Campus',
    phase: 'Academic Autonomy',
    desc: 'Modernization of curriculum under autonomous scheme, KSCST-sponsored student research deployments, and campus-wide IoT environmental monitors.'
  },
  {
    year: '2026',
    title: 'AICTE-IDEA & Next-Gen R&D Hub',
    phase: 'Vision 2026+',
    desc: 'Modernized multidisciplinary product visualization center, edge AI testbeds, and global alumni technical mentorship network.'
  }
];
