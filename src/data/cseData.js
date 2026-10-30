export const CSE_DOMAINS = [
  {
    id: 'ai-ml',
    code: '01',
    title: 'Artificial Intelligence & Machine Learning',
    shortTitle: 'AI & Machine Learning',
    description: 'Deep neural networks, generative AI, natural language processing, and computer vision systems solving real-world challenges.',
    leadFaculty: 'Dr. Sharmila Kumari',
    labs: ['NVIDIA Deep Learning Lab', 'Cognitive Computing Center'],
    courses: ['CS601: Deep Learning', 'CS504: Natural Language Processing', 'CS702: Reinforcement Learning'],
    highlights: ['5 Sponsored Research Grants', '3 Patents Filed in 2025', 'ACM Student Chapter Collaboration'],
    color: '#3B82F6' // Cobalt blue
  },
  {
    id: 'cybersecurity',
    code: '02',
    title: 'Cybersecurity & Digital Forensics',
    shortTitle: 'Cybersecurity',
    description: 'Endpoint security, cryptographic protocols, ethical hacking, malware analysis, and cloud defense architectures.',
    leadFaculty: 'Prof. Mohammed Hafeez',
    labs: ['Cyber Defense & Threat Intelligence Lab'],
    courses: ['CS603: Network Security & Cryptography', 'CS705: Digital Forensics & Incident Response'],
    highlights: ['Annual Capture The Flag (CTF)', 'MoU with QuickHeal Academy', 'Defcon Group Mangalore Host'],
    color: '#10B981' // Emerald
  },
  {
    id: 'cloud-devops',
    code: '03',
    title: 'Cloud Computing & Distributed Systems',
    shortTitle: 'Cloud & DevOps',
    description: 'Kubernetes orchestration, serverless microservices, distributed consensus algorithms, and multi-region resilience.',
    leadFaculty: 'Dr. Abdul Rahiman',
    labs: ['AWS Cloud Innovation Center', 'Distributed Systems Lab'],
    courses: ['CS502: Cloud Infrastructure & Virtualization', 'CS604: Distributed Systems & Big Data'],
    highlights: ['AWS Academy Accredited', 'Kubernetes Certified Training', 'Docker Campus Ambassador'],
    color: '#8B5CF6' // Purple
  },
  {
    id: 'fullstack-systems',
    code: '04',
    title: 'Full-Stack & High-Performance Computing',
    shortTitle: 'Full-Stack & Systems',
    description: 'High-throughput backend architectures, modern reactive frontends, low-level systems programming in Rust and C++, and compiler design.',
    leadFaculty: 'Prof. Rashmi Pavithran',
    labs: ['Advanced Software Engineering Studio'],
    courses: ['CS401: Advanced Data Structures & Algorithms', 'CS501: Modern Web Engineering', 'CS602: Compiler Architecture'],
    highlights: ['Industry Mentorship by Tech Mahindra', '98% Placement Rate', 'Open Source Contribution Pods'],
    color: '#F59E0B' // Amber
  },
  {
    id: 'iot-robotics',
    code: '05',
    title: 'IoT, Edge AI & Embedded Systems',
    shortTitle: 'IoT & Edge Computing',
    description: 'Ultra-low-power sensing networks, RTOS kernels, RISC-V architectures, and autonomous edge robotic platforms.',
    leadFaculty: 'Dr. Nishmitha K',
    labs: ['Smart IoT & Robotics Fabrication Hub'],
    courses: ['CS503: Microcontrollers & Embedded C', 'CS701: Edge Computing & Sensor Networks'],
    highlights: ['Smart Campus Sensor Mesh Initiative', 'TI Innovation Lab Partner', 'Drone Prototype Fleet'],
    color: '#EC4899' // Rose
  }
];

export const FACULTY_MEMBERS = [
  {
    id: 'f1',
    name: 'Dr. Sharmila Kumari',
    designation: 'Professor & Head of Department',
    department: 'Administration',
    cabin: 'Room 301, Academic Block A',
    email: 'hod.cse@pace.edu.in',
    specialization: 'Artificial Intelligence, Medical Imaging, Deep Learning',
    experience: '22 Years',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    tags: ['HOD', 'AI/ML', 'Research Guide']
  },
  {
    id: 'f2',
    name: 'Dr. Abdul Rahiman',
    designation: 'Professor & Dean (R&D)',
    department: 'Research',
    cabin: 'Room 304, Academic Block A',
    email: 'abdul.rahiman@pace.edu.in',
    specialization: 'Distributed Cloud Systems, Big Data Analytics, High Performance Computing',
    experience: '19 Years',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    tags: ['Dean R&D', 'Cloud', 'Distributed Systems']
  },
  {
    id: 'f3',
    name: 'Prof. Mohammed Hafeez',
    designation: 'Associate Professor & Cyber Lab Lead',
    department: 'Technical',
    cabin: 'Room 214, Cyber Cell',
    email: 'm.hafeez@pace.edu.in',
    specialization: 'Cybersecurity, Cryptography, Blockchain, Ethical Hacking',
    experience: '14 Years',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    tags: ['Cybersecurity', 'CTF Mentor', 'Industry Liaison']
  },
  {
    id: 'f4',
    name: 'Prof. Rashmi Pavithran',
    designation: 'Assistant Professor & Placement Coordinator',
    department: 'Placements',
    cabin: 'Room 308, Placement Block',
    email: 'rashmi.p@pace.edu.in',
    specialization: 'Software Architecture, React/Next.js, Full Stack, Data Structures',
    experience: '11 Years',
    image: 'https://images.unsplash.com/photo-1580894732454-def93b79f82d?auto=format&fit=crop&q=80&w=400',
    tags: ['Placements', 'Full-Stack', 'Alumni Relations']
  },
  {
    id: 'f5',
    name: 'Dr. Nishmitha K',
    designation: 'Associate Professor',
    department: 'Technical',
    cabin: 'Room 205, IoT Lab Block',
    email: 'nishmitha.k@pace.edu.in',
    specialization: 'Embedded Systems, IoT Networks, RISC-V, Drone Robotics',
    experience: '13 Years',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400',
    tags: ['IoT', 'Robotics', 'Incubation']
  },
  {
    id: 'f6',
    name: 'Prof. Saifuddin Ahmed',
    designation: 'Assistant Professor',
    department: 'Academics',
    cabin: 'Room 312, Academic Block A',
    email: 'saif.ahmed@pace.edu.in',
    specialization: 'Database Systems, Compiler Optimization, Operating Systems',
    experience: '8 Years',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    tags: ['DBMS', 'Operating Systems', 'Code Club']
  }
];

export const LABORATORIES = [
  {
    id: 'lab-1',
    name: 'NVIDIA Deep Learning & AI Research Lab',
    code: 'LAB-301',
    capacity: '40 Workstations',
    hardware: 'NVIDIA RTX A6000 GPUs, Intel Xeon Silver, 10Gbps LAN',
    inCharge: 'Dr. Sharmila Kumari',
    purpose: 'Machine learning model training, computer vision pipelines, student research publications'
  },
  {
    id: 'lab-2',
    name: 'Cyber Defense & Security Operations Center (SOC)',
    code: 'LAB-204',
    capacity: '35 Workstations',
    hardware: 'Isolated Air-Gapped Network, Kali Linux Pods, Cisco Hardware Firewalls',
    inCharge: 'Prof. Mohammed Hafeez',
    purpose: 'Penetration testing, CTF competitions, packet analysis, cryptography research'
  },
  {
    id: 'lab-3',
    name: 'AWS Cloud & Distributed Systems Studio',
    code: 'LAB-305',
    capacity: '45 Workstations',
    hardware: 'Dell PowerEdge R740 Server Cluster, Kubernetes Local Nodes',
    inCharge: 'Dr. Abdul Rahiman',
    purpose: 'Cloud microservices deployment, container orchestration, DevOps CI/CD pipelines'
  },
  {
    id: 'lab-4',
    name: 'IoT, Smart Sensors & Robotics Hub',
    code: 'LAB-102',
    capacity: '30 Workstations',
    hardware: 'Raspberry Pi 5 clusters, ESP32 nodes, LoRaWAN gateways, 3D Printers, Soldering stations',
    inCharge: 'Dr. Nishmitha K',
    purpose: 'Hardware prototyping, sensor networks, robotics fabrication, smart agriculture pilots'
  }
];

export const COURSES_SYLLABI = [
  {
    code: '21CS301',
    title: 'Data Structures and Algorithms',
    semester: 'Semester 3',
    credits: 4,
    domain: 'Full-Stack & High-Performance Computing',
    topics: ['Trees & Graphs', 'Dynamic Programming', 'B-Trees', 'Greedy Techniques', 'Complexity Analysis']
  },
  {
    code: '21CS402',
    title: 'Operating Systems & System Internals',
    semester: 'Semester 4',
    credits: 4,
    domain: 'Full-Stack & High-Performance Computing',
    topics: ['Process Scheduling', 'Virtual Memory', 'Concurrency Primitives', 'File Systems', 'Kernel Modules']
  },
  {
    code: '21CS503',
    title: 'Machine Learning & Pattern Recognition',
    semester: 'Semester 5',
    credits: 4,
    domain: 'Artificial Intelligence & Machine Learning',
    topics: ['Supervised Learning', 'Backpropagation', 'CNNs & Vision', 'Transformer Models', 'Evaluation Metrics']
  },
  {
    code: '21CS504',
    title: 'Computer Networks & Protocols',
    semester: 'Semester 5',
    credits: 4,
    domain: 'Cybersecurity & Digital Forensics',
    topics: ['TCP/IP Stack', 'Routing Protocols', 'Transport Congestion Control', 'DNS Architecture', 'Socket Programming']
  },
  {
    code: '21CS601',
    title: 'Cloud Computing & DevOps Architecture',
    semester: 'Semester 6',
    credits: 3,
    domain: 'Cloud Computing & Distributed Systems',
    topics: ['Infrastructure as Code', 'Docker & Podman', 'Kubernetes Ingress', 'Terraform', 'Serverless Functions']
  },
  {
    code: '21CS602',
    title: 'Cryptography & Network Security',
    semester: 'Semester 6',
    credits: 3,
    domain: 'Cybersecurity & Digital Forensics',
    topics: ['AES & RSA Algorithms', 'Elliptic Curve Cryptography', 'Zero-Knowledge Proofs', 'TLS 1.3', 'Auth Protocols']
  }
];

export const STUDENT_PROJECTS = [
  {
    id: 'proj-1',
    title: 'AuraNet: Decentralized Disaster Mesh Network',
    team: 'Team HexaMesh',
    domain: 'IoT & Edge Computing',
    status: 'Winners @ INNOVEX 2026 Season 02 Nominee',
    description: 'Off-grid communication system using LoRa peer-to-peer radio relaying emergency SOS coordinates during network blackouts.',
    technologies: ['ESP32', 'LoRa SX1262', 'React PWA', 'WebSockets', 'SQLite Embedded']
  },
  {
    id: 'proj-2',
    title: 'DeepShield: Real-time Audio & Video Deepfake Sentinel',
    team: 'SentinelX',
    domain: 'Cybersecurity & Digital Forensics',
    status: 'Funded by KSCST Student Project Scheme',
    description: 'A browser extension and API pipeline that analyzes facial micro-movements and spectral voice artifacts to detect deepfake media.',
    technologies: ['PyTorch', 'FastAPI', 'ONNX Runtime', 'WebExtension API', 'OpenCV']
  },
  {
    id: 'proj-3',
    title: 'CampusPulse: AI-Powered Smart Energy & Classroom Analytics',
    team: 'GreenPACE',
    domain: 'Artificial Intelligence & Machine Learning',
    status: 'Deployed in PACE Academic Block A',
    description: 'Computer vision camera nodes tracking occupancy to dynamically optimize HVAC cooling and lighting, cutting energy waste by 34%.',
    technologies: ['YOLOv8', 'Edge TPU', 'MQTT', 'InfluxDB', 'Grafana Dashboard']
  }
];

export const UPCOMING_EVENTS = [
  {
    id: 'ev-1',
    title: 'INNOVEX 2026: Campus Hackathon Sprint',
    date: 'Nov 20–21, 2026',
    venue: 'PACE Central Auditorium & CSE Lab Block',
    type: 'Hackathon',
    description: '24-hour national level hackathon sprint with 5 domain problem statements, mentored by industry veterans.'
  },
  {
    id: 'ev-2',
    title: 'Workshop on Production Kubernetes & Microservices',
    date: 'Nov 12, 2026',
    venue: 'AWS Innovation Studio (LAB-305)',
    type: 'Hands-on Workshop',
    description: 'Full-day workshop building and deploying fault-tolerant multi-pod clusters with automated Helm deployments.'
  },
  {
    id: 'ev-3',
    title: 'PACE CTF: Annual Cyber Defense Battleground',
    date: 'Dec 05, 2026',
    venue: 'Cyber SOC Lab (LAB-204)',
    type: 'Competition',
    description: 'Jeopardy-style CTF covering reverse engineering, binary exploitation, web vulnerabilities, and forensics.'
  }
];
