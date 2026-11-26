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
    { name: 'ASCII', fullName: 'Association of Computer Science Students Innovative Intellectuals', role: 'Department Student Association · TechFests & Seminars' },
    { name: 'GLUG PACE', fullName: 'GNU/Linux Users Group PACE', role: 'FOSS, Linux Kernel & Open-Source Tooling' },
    { name: 'IEEE Student Branch', fullName: 'IEEE PACE Student Chapter', role: 'Research Publications, Workshops & IEEE Day' },
    { name: 'CSI Chapter', fullName: 'Computer Society of India Institutional Chapter', role: 'National Coding Contests & Industry Talks' },
    { name: 'Embed Club', fullName: 'Embedded Systems & IoT Innovation Club', role: 'Hardware Prototyping, ESP32 & Robotics' }
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
    featuredCourse: 'BCS701: Deep Learning & Computer Vision Architectures'
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
    featuredCourse: 'BCS602: Cryptography, Zero-Knowledge Proofs & Network Security'
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
    featuredCourse: 'BCS503: Cloud Architecture, Microservices & Container Orchestration'
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
    featuredCourse: 'BCS401: Analysis & Design of Algorithms & Systems Programming'
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
    featuredCourse: 'BCS604: Embedded Systems Design & Distributed Ledger Consensus'
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
    activeTools: ['PyTorch 2.5', 'TensorFlow', 'CUDA Toolkit 12', 'Ollama Local LLM', 'OpenCV']
  },
  {
    id: 'lab-2',
    code: 'LAB-204',
    name: 'Cyber Security & Network Forensics Range',
    purpose: 'Air-gapped ethical hacking, penetration testing, malware analysis sandbox, and defense drills.',
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
    activeTools: ['GCC/Clang Toolchain', 'QEMU/KVM', 'GDB Debugger', 'Neovim', 'Git', 'Linux 6.x Source']
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
    code: 'BMATS101 / BPOPS103',
    title: 'Principles of Programming Using C & Problem Solving',
    semester: 'Semester 1',
    scheme: 'VTU 2022 Scheme',
    credits: 3,
    domain: 'Systems & Software Engineering',
    topics: ['C Syntax & Memory Pointers', 'Control Flow & Recursion', 'Arrays, Strings & Structures', 'Dynamic Memory (malloc/free)', 'File I/O Operations'],
    materials: [
      {
        id: 'sem1-syl',
        type: 'Syllabus',
        title: 'VTU 2022 Scheme Syllabus & Course Outcomes',
        format: 'Built-in Study Guide',
        url: '',
        content: `# BPOPS103 — Principles of Programming Using C\n\n## Course Objectives\n- Understand computer fundamentals, flowcharts, and structured C programming.\n- Master pointers, arrays, functions, structures, and file handling.\n\n## Modules Overview\n- **Module 1**: Algorithms, Flowcharts, C Tokens, Data Types, Operators.\n- **Module 2**: Branching (if-else, switch) & Looping (for, while, do-while).\n- **Module 3**: 1D/2D Arrays, Searching & Sorting, User-Defined Functions.\n- **Module 4**: Strings, Pointers, Pointer Arithmetic & Call-by-Reference.\n- **Module 5**: Structures, Unions, Enumerations & File Management.`
      },
      {
        id: 'sem1-lab',
        type: 'Lab Manual',
        title: '1st Year C Programming Lab Programs (1–12)',
        format: 'Built-in Lab Pack',
        url: '',
        content: `# BPOPS103 Lab Programs Checklist\n\n1. Simple Calculator using switch-case.\n2. Roots of a Quadratic Equation.\n3. Electricity Bill calculation with slab rates.\n4. Binary Search on sorted integer array.\n5. Matrix Multiplication with dimension validation.\n6. Taylor Series approximation for sin(x)/cos(x).\n7. Bubble Sort using pointers.\n8. Student Structure average marks computation.\n9. File copy and line/word counter.\n\n> Compile on GLUG Lab Linux: \`gcc -Wall -Wextra program.c -o program && ./program\``
      },
      {
        id: 'sem1-pyq',
        type: 'PYQ',
        title: 'VTU Model & Previous Year Question Bank (2023–2025)',
        format: 'Built-in Question Bank',
        url: '',
        content: `# BPOPS103 Frequently Asked Questions\n\n### Part A (2–4 Marks)\n1. Differentiate between \`while\` and \`do-while\` loops with syntax.\n2. Explain \`malloc()\` vs \`calloc()\` with examples.\n\n### Part B (8–10 Marks)\n1. Write a C program to multiply two M×N matrices using functions.\n2. Explain call-by-value vs call-by-reference using a swap function.\n3. Define a structure \`Employee\` and sort N records by salary.`
      }
    ]
  },
  {
    code: 'BPLCK205B',
    title: 'Introduction to Python Programming',
    semester: 'Semester 2',
    scheme: 'VTU 2022 Scheme',
    credits: 3,
    domain: 'Artificial Intelligence & Machine Learning',
    topics: ['Python Lists, Tuples & Dicts', 'String Manipulation & Regex', 'File Handling & OS Module', 'OOP Classes & Inheritance', 'Debugging & Exceptions'],
    materials: [
      {
        id: 'sem2-notes',
        type: 'Notes',
        title: 'Modules 1–5 Complete Python Lecture Notes',
        format: 'Built-in Study Guide',
        url: '',
        content: `# BPLCK205B — Python Programming Quick Notes\n\n## Key Data Structures\n- **List**: Mutable, ordered \`[1, 2, 3]\`\n- **Tuple**: Immutable, ordered \`(1, 2, 3)\`\n- **Dictionary**: Key-value hash map \`{'code': 'PACE', 'est': 2000}\`\n- **Set**: Unique unordered collection \`{1, 2, 3}\`\n\n## Idiomatic Patterns\n\`\`\`python\n# List comprehension\nsquares = [x**2 for x in range(10) if x % 2 == 0]\n\n# Context-managed file read\nwith open('notes.txt', 'r', encoding='utf-8') as f:\n    lines = f.readlines()\n\`\`\``
      },
      {
        id: 'sem2-pyq',
        type: 'PYQ',
        title: 'Python Solved Question Papers & Viva Sheet',
        format: 'Built-in Question Bank',
        url: '',
        content: `# BPLCK205B Viva & Exam Questions\n\n1. What is the difference between deep copy and shallow copy in Python?\n2. Write a Python script to count word frequency in a text file using dictionaries.\n3. Explain \`__init__\`, \`self\`, and method overriding with an example.`
      }
    ]
  },
  {
    code: 'BCS304',
    title: 'Data Structures & Applications',
    semester: 'Semester 3',
    scheme: 'VTU 2022 Scheme',
    credits: 4,
    domain: 'Systems & Software Engineering',
    topics: ['Stacks, Queues & Circular Buffers', 'Singly & Doubly Linked Lists', 'Binary Search Trees & AVL', 'Graph Traversals (BFS, DFS)', 'Hashing & Collision Resolution'],
    materials: [
      {
        id: 'sem3-notes',
        type: 'Notes',
        title: 'Module 1–5 Data Structures Complete Notes',
        format: 'Built-in Study Guide',
        url: '',
        content: `# BCS304 — Data Structures & Applications\n\n## Time Complexity Cheat Sheet\n| Structure | Access | Search | Insert | Delete |\n| :--- | :--- | :--- | :--- | :--- |\n| Array | O(1) | O(n) | O(n) | O(n) |\n| Linked List | O(n) | O(n) | O(1) | O(1) |\n| BST (Balanced) | O(log n) | O(log n) | O(log n) | O(log n) |\n| Hash Table | N/A | O(1) avg | O(1) avg | O(1) avg |\n\n## Exam Focus\n- Infix to Postfix conversion using Stack\n- Sparse Matrix Fast Transpose\n- Binary Tree Traversals (Inorder, Preorder, Postorder)\n- Linear Probing & Chaining in Hash Tables`
      },
      {
        id: 'sem3-lab',
        type: 'Lab Manual',
        title: 'BCSL305 Data Structures Lab Manual (C Implementation)',
        format: 'Built-in Lab Pack',
        url: '',
        content: `# BCSL305 Data Structures Lab Programs\n\n1. Calendar structure dynamic memory allocation.\n2. Pattern matching & string replacement without built-in functions.\n3. Stack operations (Push, Pop, Palindrome check).\n4. Infix to Postfix conversion & Postfix evaluation.\n5. Circular Queue using array.\n6. Singly Linked List for student data.\n7. Doubly Linked List for employee records.\n8. BST creation, traversal, and search.\n9. Graph BFS and DFS reachability.\n10. Hash table with linear probing.`
      },
      {
        id: 'sem3-pyq',
        type: 'PYQ',
        title: 'VTU 2023–2025 Previous Year Papers (BCS304)',
        format: 'Built-in Question Bank',
        url: '',
        content: `# BCS304 Previous Year Questions\n\n1. Convert \`((A+B)-C*(D/E))+F\` to postfix showing stack trace.\n2. Write C functions to insert and delete a node at the front/rear of a Doubly Linked List.\n3. Construct a BST for \`[45, 22, 77, 11, 30, 90, 15, 78]\` and trace Inorder traversal.`
      }
    ]
  },
  {
    code: 'BCS401',
    title: 'Analysis & Design of Algorithms',
    semester: 'Semester 4',
    scheme: 'VTU 2022 Scheme',
    credits: 4,
    domain: 'Systems & Software Engineering',
    topics: ['Asymptotic Notations (Big-O, Theta)', 'Divide & Conquer (Merge/Quick Sort)', 'Greedy (Dijkstra, Prim, Kruskal)', 'Dynamic Programming (Knapsack, Floyd)', 'Backtracking & NP-Completeness'],
    materials: [
      {
        id: 'sem4-notes',
        type: 'Notes',
        title: 'Algorithms Design Paradigms & Master Theorem Notes',
        format: 'Built-in Study Guide',
        url: '',
        content: `# BCS401 — Analysis & Design of Algorithms\n\n## Master Theorem\nFor recurrence \`T(n) = aT(n/b) + f(n)\`:\n1. If \`f(n) = O(n^(log_b(a) - ε))\`, then \`T(n) = Θ(n^(log_b(a)))\`.\n2. If \`f(n) = Θ(n^(log_b(a)))\`, then \`T(n) = Θ(n^(log_b(a)) log n)\`.\n3. If \`f(n) = Ω(n^(log_b(a) + ε))\`, then \`T(n) = Θ(f(n))\`.\n\n## Core Algorithms\n- **Greedy**: Kruskal's MST \`O(E log E)\`, Prim's MST, Dijkstra's SSSP.\n- **Dynamic Programming**: 0/1 Knapsack, Floyd-Warshall All-Pairs Shortest Path \`O(V^3)\`.\n- **Backtracking**: N-Queens Problem, Sum of Subsets.`
      },
      {
        id: 'sem4-lab',
        type: 'Lab Manual',
        title: 'BCSL404 ADA Lab Manual + Time Complexity Graphs',
        format: 'Built-in Lab Pack',
        url: '',
        content: `# BCSL404 ADA Lab Experiments\n\n1. Kruskal's Minimum Cost Spanning Tree.\n2. Prim's Minimum Cost Spanning Tree.\n3. Floyd's & Warshall's Algorithms.\n4. Dijkstra's Shortest Path.\n5. Topological Ordering of DAG.\n6. 0/1 Knapsack via Dynamic Programming.\n7. Quick Sort & Merge Sort empirical timing plots.\n8. N-Queens Problem using Backtracking.`
      }
    ]
  },
  {
    code: 'BCS501',
    title: 'Software Engineering & Project Management',
    semester: 'Semester 5',
    scheme: 'VTU 2022 Scheme',
    credits: 3,
    domain: 'Systems & Software Engineering',
    topics: ['Agile & Scrum Sprints', 'SRS & Requirements Engineering', 'UML Architecture Diagrams', 'Automated Testing & CI/CD', 'COCOMO Estimation & Risk Management'],
    materials: [
      {
        id: 'sem5-notes',
        type: 'Notes',
        title: 'SEPM Complete Modules (Agile, UML & Testing)',
        format: 'Built-in Study Guide',
        url: '',
        content: `# BCS501 — Software Engineering & Project Management\n\n## Process Models\n- Waterfall vs Incremental vs Spiral vs Agile (Scrum / Kanban).\n\n## Testing Pyramid\n1. Unit Testing (Vitest/Jest/Pytest)\n2. Integration & Contract Testing\n3. End-to-End System Testing (Playwright)\n\n## Estimation\n- Basic COCOMO: \`Effort = a * (KLOC)^b\``
      }
    ]
  },
  {
    code: 'BCS502',
    title: 'Computer Networks & Internetworking',
    semester: 'Semester 5',
    scheme: 'VTU 2022 Scheme',
    credits: 4,
    domain: 'Cloud & Distributed Systems',
    topics: ['OSI & TCP/IP Layers', 'Sliding Window & CRC', 'OSPF, BGP & IPv4/IPv6 Subnetting', 'TCP Congestion Control', 'DNS, HTTP/3 & TLS'],
    materials: [
      {
        id: 'sem5-cn-notes',
        type: 'Notes',
        title: 'Computer Networks Protocol & Subnetting Handbook',
        format: 'Built-in Study Guide',
        url: '',
        content: `# BCS502 — Computer Networks Quick Reference\n\n## OSI 7-Layer Stack\n7. Application (HTTP, DNS, SMTP)\n6. Presentation (TLS, Encoding)\n5. Session\n4. Transport (TCP, UDP)\n3. Network (IP, ICMP, OSPF)\n2. Data Link (Ethernet, ARP, CRC)\n1. Physical (Fiber, Copper, Wi-Fi)\n\n## TCP 3-Way Handshake\n\`SYN -> SYN-ACK -> ACK\``
      },
      {
        id: 'sem5-cn-lab',
        type: 'Lab Manual',
        title: 'NS3 & Socket Programming Lab Manual',
        format: 'Built-in Lab Pack',
        url: '',
        content: `# BCS502 Networks Lab\n\n1. Point-to-Point & Wireless LAN simulation in NS3.\n2. CRC-CCITT (16-bit) error detection in C/Java.\n3. Bellman-Ford Distance Vector Routing.\n4. TCP Client-Server file transfer sockets.\n5. Leaky Bucket Congestion Control.`
      }
    ]
  },
  {
    code: 'BCS601',
    title: 'Cloud Computing & Distributed Microservices',
    semester: 'Semester 6',
    scheme: 'VTU 2022 Scheme',
    credits: 4,
    domain: 'Cloud & Distributed Systems',
    topics: ['IaaS, PaaS, SaaS Architectures', 'Docker & Container Namespaces', 'Kubernetes Pods & Services', 'MapReduce & Spark', 'Serverless & AWS Lambda'],
    materials: [
      {
        id: 'sem6-cloud-notes',
        type: 'Notes',
        title: 'Cloud Architecture & Kubernetes Study Guide',
        format: 'Built-in Study Guide',
        url: '',
        content: `# BCS601 — Cloud Computing & Microservices\n\n## Core Commands (AWS Studio LAB-305)\n\`\`\`bash\ndocker build -t pace-cse-app:v1 .\nkubectl apply -f deployment.yaml\nkubectl get pods -A\n\`\`\`\n\n## CAP Theorem\nA distributed store can guarantee at most two of: **Consistency**, **Availability**, **Partition Tolerance**.`
      }
    ]
  },
  {
    code: 'BCS602',
    title: 'Cryptography & Network Security',
    semester: 'Semester 6',
    scheme: 'VTU 2022 Scheme',
    credits: 3,
    domain: 'Cybersecurity & Forensics',
    topics: ['AES & RSA Algorithms', 'Elliptic Curve Cryptography (ECC)', 'SHA-256 & Digital Signatures', 'TLS 1.3 Handshake Security', 'Zero-Trust & Firewalls'],
    materials: [
      {
        id: 'sem6-sec-notes',
        type: 'Notes',
        title: 'Applied Cryptography & Security Notes',
        format: 'Built-in Study Guide',
        url: '',
        content: `# BCS602 — Cryptography & Network Security\n\n## RSA Key Generation\n1. Choose primes \`p, q\`; compute \`n = p*q\` and \`φ(n) = (p-1)(q-1)\`.\n2. Pick \`e\` coprime to \`φ(n)\`.\n3. Compute \`d = e^(-1) mod φ(n)\`.\n4. Encrypt: \`C = M^e mod n\`, Decrypt: \`M = C^d mod n\`.`
      }
    ]
  },
  {
    code: 'BCS701',
    title: 'Deep Learning & Generative AI Architectures',
    semester: 'Semester 7',
    scheme: 'VTU 2022 Scheme',
    credits: 4,
    domain: 'AI & Machine Learning',
    topics: ['CNNs & ResNet Architectures', 'Transformers & Self-Attention', 'Quantization (GGUF / AWQ)', 'RAG & Vector Embeddings', 'Local LLM Inference (Ollama)'],
    materials: [
      {
        id: 'sem7-dl-notes',
        type: 'Notes',
        title: 'Transformers, Quantization & Local RAG Notes',
        format: 'Built-in Study Guide',
        url: '',
        content: `# BCS701 — Deep Learning & Generative AI\n\n## Scaled Dot-Product Attention\n\`Attention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V\`\n\n## Local Inference Quantization\n- **FP16**: 2 bytes/param (7B model ≈ 14 GB VRAM)\n- **Q4_K_M**: ~4.5 bits/param (7B model ≈ 4.5 GB RAM/VRAM — runs smoothly on student laptops!)`
      }
    ]
  },
  {
    code: 'BCS801',
    title: 'Major Project, Industry Internship & Technical Seminar',
    semester: 'Semester 8',
    scheme: 'VTU 2022 Scheme',
    credits: 10,
    domain: 'Systems & Software Engineering',
    topics: ['IEEE Paper Formatting', 'KSCST Project Proposal Template', 'System Architecture & SRS', 'Live Prototype Deployment', 'Final Viva-Voce Defense'],
    materials: [
      {
        id: 'sem8-proj',
        type: 'Syllabus',
        title: 'Final Year Project Report & IEEE Format Kit',
        format: 'Built-in Guide',
        url: '',
        content: `# BCS801 — Final Year Project & Internship Checklist\n\n## Deliverables\n1. **Phase 1**: Literature Survey (minimum 12 IEEE/Scopus papers) + Problem Statement.\n2. **Phase 2**: Architecture Diagram, Tech Stack, Database Schema & Prototype MVP.\n3. **Phase 3**: Testing Report, IEEE Conference Paper Draft & Hardbound VTU Thesis.\n\n> Contact Project Coordinator Prof. Fathimath Zuhara V. (Room 116) for KSCST sponsorship templates.`
      }
    ]
  }
];

export const STUDENT_NOTICES = [
  {
    id: 'not-1',
    category: 'EXAMS',
    priority: 'URGENT',
    date: 'Nov 28, 2026',
    title: 'VTU Odd Semester Practical Lab & Internal Assessment Schedule',
    summary: 'Lab internals for Semesters 3, 5, and 7 commence next week in LAB-101, LAB-105, and LAB-204. Download lab manuals from the Course Materials Vault.',
    actionText: 'OPEN COURSE MATERIALS',
    targetId: 'curriculum-section'
  },
  {
    id: 'not-2',
    category: 'PLACEMENTS',
    priority: 'NEW',
    date: 'Nov 25, 2026',
    title: 'Campus Placement Drive: Cloud, Full-Stack & AI Roles (2027 Batch)',
    summary: 'Pre-placement mock interviews and DSA problem sprints organized by Training & Placement Cell + Coders Club in Academic Block A.',
    actionText: 'CHECK TRACKS & PREP',
    targetId: 'domains-section'
  },
  {
    id: 'not-3',
    category: 'CIRCULARS',
    priority: 'VTU',
    date: 'Nov 22, 2026',
    title: 'KSCST 48th Series Student Project Proposal Submissions Open',
    summary: 'Final year and pre-final year student teams are invited to submit innovative hardware/software abstracts to Prof. Fathimath Zuhara V.',
    actionText: 'VIEW KSCST PROJECTS',
    targetId: 'projects-section'
  },
  {
    id: 'not-4',
    category: 'EVENTS',
    priority: 'WORKSHOP',
    date: 'Dec 02, 2026',
    title: 'GLUG PACE Session: Running Local LLMs & Coding Copilots Offline',
    summary: 'Hands-on install fest for Ollama, Qwen2.5-Coder, and Continue.dev on student laptops. Zero cloud API keys required.',
    actionText: 'GO TO LOCAL AI SETUP',
    targetId: 'local-ai-section'
  }
];

export const STUDENT_QUICK_LINKS = [
  { label: 'Dhi Academic ERP (PACE)', sub: 'com.heraizen.dhi v1.0.696 · Attendance & Timetable', url: '#dhi-erp-panel', tag: 'ERP APP' },
  { label: 'VTU Exam Results Portal', sub: 'results.vtu.ac.in', url: 'https://results.vtu.ac.in/', tag: 'OFFICIAL' },
  { label: 'VTU Academic Circulars', sub: 'vtu.ac.in/en/category/circulars', url: 'https://vtu.ac.in/en/category/circulars/', tag: 'VTU' },
  { label: 'PACE Official Portal', sub: 'pace.edu.in · Notices & Admissions', url: 'https://pace.edu.in/', tag: 'CAMPUS' },
  { label: 'IEEE Xplore & Digital Library', sub: 'Research Papers & Citation Index', url: 'https://ieeexplore.ieee.org/', tag: 'RESEARCH' },
  { label: 'Course Notes & Lab Vault', sub: 'Semesters 1–8 View & Download', url: '#curriculum-section', tag: 'STUDY' },
  { label: 'Local AI Student Setup', sub: 'Offline LLMs on Any Laptop', url: '#local-ai-section', tag: 'AI TOOLKIT' }
];

export const DHI_ERP_SYSTEM = {
  appName: 'Dhi Academic ERP',
  packageId: 'com.heraizen.dhi',
  version: '1.0.696',
  vendor: 'Heraizen Technologies',
  architecture: 'Multi-tenant Capacitor / Ionic ERP (nameresolver.dhi-edu.com)',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.heraizen.dhi',
  attendanceFields: ['Total Classes', 'Days Present', 'Days Absent', 'Subject-Wise %', 'Day-Wise Log'],
  modules: [
    {
      code: 'ATT-01',
      title: 'Attendance & Shortage Tracking',
      desc: 'Subject-wise and day-wise attendance logs, degree/course-level attendance configuration, and shortage/condonation tracking.',
      roles: ['Student', 'Faculty', 'HOD', 'Principal']
    },
    {
      code: 'SCH-02',
      title: 'Timetable, IA & UE Schedules',
      desc: 'Day-wise section timetables, Internal Assessment (IA) schedules, University Exam (UE) schedules, and faculty class transfer requests.',
      roles: ['Student', 'Faculty', 'HOD']
    },
    {
      code: 'PLN-03',
      title: 'Overall Lesson Plan & CO-PO',
      desc: 'Planned vs. actual topic coverage (DOC/LWD), CO-PO-PSO mapping, tutorials, assignments, MCQ tests, and study material links.',
      roles: ['Faculty', 'HOD', 'Student']
    },
    {
      code: 'SVC-04',
      title: 'Campus & Student Services',
      desc: 'Course enrollment, mentoring/counseling history, co-curricular records, leave management, exam registration, fee details, and grievances.',
      roles: ['Student', 'Class Coordinator', 'Faculty']
    }
  ]
};

export const LOCAL_AI_PROFILES = [
  {
    id: 'lite-cpu',
    tier: 'Tier 1 · Student Laptop (8 GB RAM, CPU Only)',
    vram: 'CPU / Integrated GPU',
    recommendedModels: {
      coding: { model: 'qwen2.5-coder:3b', size: '1.9 GB', speed: 'Fast on CPU', notes: 'Best lightweight C, Python, Java & SQL helper.' },
      rag: { model: 'llama3.2:3b', size: '2.0 GB', speed: 'Fast on CPU', notes: 'Great for summarizing VTU lecture notes offline.' },
      reasoning: { model: 'deepseek-r1:1.5b', size: '1.1 GB', speed: 'Very Fast', notes: 'Step-by-step math & algorithm trace walkthroughs.' }
    }
  },
  {
    id: 'mid-gpu',
    tier: 'Tier 2 · Gaming / MacBook (16 GB RAM or 6–8 GB VRAM)',
    vram: '6–8 GB VRAM / Apple Silicon',
    recommendedModels: {
      coding: { model: 'qwen2.5-coder:7b', size: '4.7 GB', speed: '40+ tok/s', notes: 'Near-GPT4 class code generation & debugging.' },
      rag: { model: 'gemma2:9b', size: '5.4 GB', speed: '30+ tok/s', notes: 'High accuracy Q&A across textbook PDFs.' },
      reasoning: { model: 'deepseek-r1:7b', size: '4.7 GB', speed: '35+ tok/s', notes: 'Deep reasoning for discrete math & OS problems.' }
    }
  },
  {
    id: 'lab-rtx',
    tier: 'Tier 3 · LAB-101 Workstation (32+ GB RAM / RTX 4080 16GB+)',
    vram: '16–24 GB VRAM',
    recommendedModels: {
      coding: { model: 'qwen2.5-coder:14b', size: '9.0 GB', speed: '65+ tok/s', notes: 'Full-repo architecture & multi-file refactoring.' },
      rag: { model: 'llama3.1:8b-instruct-fp16', size: '16 GB', speed: '55+ tok/s', notes: 'Uncompressed precision for research RAG.' },
      reasoning: { model: 'deepseek-r1:14b', size: '9.0 GB', speed: '50+ tok/s', notes: 'Research-grade proofs, compiler & security analysis.' }
    }
  }
];

export const STUDENT_PROJECTS = [
  {
    id: 'proj-1',
    title: 'AuraNet: Decentralized Disaster Mesh Communication Network',
    team: 'ASCII Student Innovation Cell',
    domain: 'Internet of Things & Edge Systems',
    status: 'Smart India Hackathon Finalist & KSCST Grantee',
    description: 'Off-grid emergency communications system using LoRa peer-to-peer radio relaying coordinates and medical triage telemetry during cellular outages.',
    technologies: ['ESP32', 'LoRa SX1262', 'React PWA', 'WebSockets', 'SQLite Embedded']
  },
  {
    id: 'proj-2',
    title: 'DeepShield: Real-time Audio & Video Synthetic Media Sentinel',
    team: 'SentinelX Research Group',
    domain: 'Cybersecurity & Machine Learning',
    status: 'Funded by KSCST 47th Series Student Project Scheme',
    description: 'A browser extension and API pipeline that analyzes facial micro-movements and spectral voice artifacts to detect deepfake media.',
    technologies: ['PyTorch', 'FastAPI', 'ONNX Runtime', 'WebExtension API', 'OpenCV']
  },
  {
    id: 'proj-3',
    title: 'CampusPulse: AI-Powered Smart Campus Energy & Classroom Analytics',
    team: 'PACE Green Campus Team',
    domain: 'Artificial Intelligence & IoT',
    status: 'Operational in PACE Academic Block A',
    description: 'Computer vision camera nodes tracking room occupancy to dynamically regulate HVAC cooling and illumination, achieving 34% energy savings.',
    technologies: ['YOLOv8', 'Edge TPU', 'MQTT', 'InfluxDB', 'Grafana Dashboard']
  },
  {
    id: 'proj-4',
    title: 'MedChain: Decentralized Patient Health Records Ledger',
    team: 'PACE ICSB Lab Cohort',
    domain: 'Blockchain & Secure Systems',
    status: 'Best Research Project Award @ PACE Annual Symposium',
    description: 'Zero-knowledge authenticated electronic health record system allowing patients to grant temporary, auditable cryptographic consent to hospitals.',
    technologies: ['Solidity', 'Ethereum L2', 'IPFS', 'Next.js', 'Ethers.js']
  }
];

export const UPCOMING_EVENTS = [
  {
    id: 'ev-1',
    title: 'NCETCIS: National Conference on Emerging Trends in Computing & Intelligent Systems',
    date: 'Nov 20–21, 2026',
    venue: 'PACE Central Auditorium & Seminar Hall',
    type: 'National Conference',
    description: 'Flagship academic symposium featuring peer-reviewed paper presentations, keynote talks by IISc & NITK professors, and technical research panels.'
  },
  {
    id: 'ev-2',
    title: 'GLUG PACE: Hands-on Workshop on Linux Kernel & Systems Programming',
    date: 'Nov 12, 2026',
    venue: 'GLUG Open Source Lab (LAB-105)',
    type: 'Hands-on Workshop',
    description: 'Intensive full-day workshop covering Linux kernel modules, system calls, memory management internals, and contributing to upstream open-source projects.'
  },
  {
    id: 'ev-3',
    title: 'ASCII TechFest: Annual Inter-Collegiate CSE Symposium & Code Sprint',
    date: 'Dec 05, 2026',
    venue: 'Academic Block A & Department Labs',
    type: 'Technical Symposium',
    description: 'Flagship departmental fest organized by ASCII featuring algorithmic code sprints, technical paper presentations, UI/UX design challenges, and debugging relays.'
  },
  {
    id: 'ev-4',
    title: 'IEEE PACE Student Branch: Annual Project Expo & Research Colloquium',
    date: 'Dec 18, 2026',
    venue: 'PACE Central Auditorium & Seminar Hall',
    type: 'IEEE Colloquium',
    description: 'Annual exhibition of student hardware/software prototypes, IEEE paper presentations, and industry mentorship reviews.'
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


export const SECTION_TIMETABLES = [
  {
    section: 'CSE-3A',
    semester: 'Semester 3',
    room: 'Academic Block A · Room 104',
    schedule: [
      { day: 'MON', slots: ['09:00 Data Structures (BCS304)', '10:00 OS & Architecture', '11:15 Discrete Math', '02:00 DSA Lab (LAB-105)'] },
      { day: 'TUE', slots: ['09:00 Discrete Math', '10:00 Data Structures (BCS304)', '11:15 OOP with Java', '02:00 Java Lab (LAB-112)'] },
      { day: 'WED', slots: ['09:00 OS & Architecture', '10:00 Digital Design', '11:15 Data Structures (BCS304)', '02:00 Library / GLUG'] },
      { day: 'THU', slots: ['09:00 OOP with Java', '10:00 Discrete Math', '11:15 Digital Design', '02:00 DSA Lab (LAB-105)'] },
      { day: 'FRI', slots: ['09:00 Data Structures (BCS304)', '10:00 OS & Architecture', '11:15 Seminar / ASCII', '02:00 Mentoring Hour'] }
    ]
  },
  {
    section: 'CSE-5A',
    semester: 'Semester 5',
    room: 'Academic Block A · Room 202',
    schedule: [
      { day: 'MON', slots: ['09:00 Computer Networks (BCS502)', '10:00 SEPM (BCS501)', '11:15 Theory of Computation', '02:00 Networks Lab (LAB-204)'] },
      { day: 'TUE', slots: ['09:00 SEPM (BCS501)', '10:00 Computer Networks (BCS502)', '11:15 Web Tech', '02:00 Web Lab (LAB-112)'] },
      { day: 'WED', slots: ['09:00 Theory of Computation', '10:00 AI Foundations', '11:15 Computer Networks (BCS502)', '02:00 Mini Project'] },
      { day: 'THU', slots: ['09:00 Web Tech', '10:00 SEPM (BCS501)', '11:15 AI Foundations', '02:00 Cloud Studio (LAB-305)'] },
      { day: 'FRI', slots: ['09:00 Computer Networks (BCS502)', '10:00 Theory of Computation', '11:15 Placement Prep', '02:00 ASCII / Club Hour'] }
    ]
  },
  {
    section: 'CSE-7A',
    semester: 'Semester 7',
    room: 'Academic Block A · Room 301',
    schedule: [
      { day: 'MON', slots: ['09:00 Deep Learning (BCS701)', '10:00 Cloud Security', '11:15 Parallel Computing', '02:00 AI/HPC Lab (LAB-101)'] },
      { day: 'TUE', slots: ['09:00 Parallel Computing', '10:00 Deep Learning (BCS701)', '11:15 Open Elective', '02:00 Major Project Phase-1'] },
      { day: 'WED', slots: ['09:00 Cloud Security', '10:00 Deep Learning (BCS701)', '11:15 Seminar Prep', '02:00 KSCST / R&D Review'] },
      { day: 'THU', slots: ['09:00 Open Elective', '10:00 Parallel Computing', '11:15 Cloud Security', '02:00 AI/HPC Lab (LAB-101)'] },
      { day: 'FRI', slots: ['09:00 Project Review', '10:00 Industry Mentoring', '11:15 Technical Viva', '02:00 Placement Drive'] }
    ]
  }
];
