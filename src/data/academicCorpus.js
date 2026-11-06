// Canonical Academic Corpus & Pre-Indexed Knowledge Base
// Department of Computer Science & Engineering, P.A. College of Engineering (PACE), Mangaluru
// Scheme: Autonomous Scheme (Affiliated to VTU Belagavi, Accredited by NBA Tier-1)

export const ACADEMIC_SCHEMES = [
  { id: 'scheme-2021', name: '2021 Autonomous Scheme', status: 'Active' },
  { id: 'scheme-2022-nep', name: '2022 NEP Scheme', status: 'Active' }
];

export const SUBJECT_CORPUS = [
  {
    courseCode: '21CS401',
    title: 'Design & Analysis of Algorithms',
    shortTitle: 'Algorithms (DAA)',
    semester: 'Semester 4',
    credits: 4,
    facultyInCharge: 'Prof. Anushree Raj',
    department: 'Full-Stack Software Engineering & Compilers',
    prescribedTextbooks: [
      {
        title: 'Introduction to Algorithms (CLRS)',
        authors: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein',
        edition: '3rd Edition, MIT Press',
        callNumber: 'QA76.6 .I5858 2009'
      },
      {
        title: 'Computer Algorithms: Introduction to Design and Analysis',
        authors: 'Sara Baase, Allen Van Gelder',
        edition: '3rd Edition, Pearson'
      }
    ],
    modules: [
      {
        index: 1,
        title: 'Introduction, Asymptotic Analysis & Divide-and-Conquer',
        hours: 10,
        topics: [
          'Order of Growth (Big-O, Big-Omega, Big-Theta, Little-o)',
          'Recurrence Relations & Substitution Method',
          'Recursion-Tree Method & Master Theorem',
          'Merge Sort & Quick Sort Worst/Average Case Analysis',
          'Strassen Matrix Multiplication'
        ]
      },
      {
        index: 2,
        title: 'Greedy Heuristics & Dynamic Programming Paradigms',
        hours: 10,
        topics: [
          'Elements of the Greedy Strategy',
          'Minimum Spanning Trees: Kruskal & Prim Algorithms',
          'Single-Source Shortest Paths: Dijkstra Algorithm',
          'Dynamic Programming: Optimal Substructure & Overlapping Subproblems',
          '0/1 Knapsack Problem & Matrix Chain Multiplication',
          'All-Pairs Shortest Paths: Floyd-Warshall Algorithm'
        ]
      },
      {
        index: 3,
        title: 'Decrease-and-Conquer & Space-Time Tradeoffs',
        hours: 8,
        topics: [
          'Topological Sorting (DFS & Source Removal)',
          'Binary Search & Interpolation Search',
          'String Matching: Horspool & Knuth-Morris-Pratt (KMP)',
          'B-Trees & B+ Trees Indexing Principles'
        ]
      },
      {
        index: 4,
        title: 'Backtracking & Branch-and-Bound',
        hours: 8,
        topics: [
          'N-Queens Problem & State-Space Tree Exploration',
          'Hamiltonian Circuit & Subset Sum Problem',
          'Assignment Problem using Branch-and-Bound',
          'Traveling Salesperson Problem (TSP) Bounds'
        ]
      },
      {
        index: 5,
        title: 'NP-Completeness & Approximation Algorithms',
        hours: 8,
        topics: [
          'Tractable vs Intractable Problems',
          'Complexity Classes: P, NP, NP-Complete, NP-Hard',
          'Cook-Levin Theorem & Polynomial Reductions (3-SAT to CLIQUE)',
          'Vertex Cover & Traveling Salesperson Approximations'
        ]
      }
    ]
  },
  {
    courseCode: '21CS402',
    title: 'Operating Systems & Concurrency',
    shortTitle: 'Operating Systems (OS)',
    semester: 'Semester 4',
    credits: 4,
    facultyInCharge: 'Prof. Mohammed Hafeez M.K.',
    department: 'Full-Stack Software Engineering & Compilers',
    prescribedTextbooks: [
      {
        title: 'Operating System Concepts (Silberschatz)',
        authors: 'Abraham Silberschatz, Peter B. Galvin, Greg Gagne',
        edition: '10th Edition, Wiley',
        callNumber: 'QA76.76.O63 S558 2018'
      }
    ],
    modules: [
      {
        index: 1,
        title: 'OS Structures, System Calls & Process Management',
        hours: 10,
        topics: [
          'Dual-Mode Operation (User Mode vs Kernel Mode)',
          'System Call Architecture & Trap Handlers',
          'Process Control Block (PCB) & Context Switching',
          'Inter-Process Communication (IPC): Shared Memory & Message Passing',
          'POSIX fork(), exec(), wait(), and exit() system calls'
        ]
      },
      {
        index: 2,
        title: 'CPU Scheduling & Threading Models',
        hours: 10,
        topics: [
          'POSIX Pthreads & Kernel vs User Thread Models',
          'Scheduling Criteria: Turnaround, Waiting, Response Time',
          'Scheduling Algorithms: FCFS, SJF, Priority, Round Robin, Multilevel Feedback Queue',
          'Multi-Core Processor Scheduling & Cache Affinity'
        ]
      },
      {
        index: 3,
        title: 'Synchronization & Deadlocks',
        hours: 10,
        topics: [
          'Critical Section Problem & Peterson Solution',
          'Hardware Synchronization: TestAndSet, CompareAndSwap',
          'Mutex Locks & Counting Semaphores',
          'Classic Synchronization: Producer-Consumer, Dining Philosophers, Readers-Writers',
          'Deadlock Conditions, Banker Algorithm for Avoidance, Detection & Recovery'
        ]
      },
      {
        index: 4,
        title: 'Memory Management & Virtual Memory',
        hours: 10,
        topics: [
          'Contiguous Allocation, Paging & Page Tables (Multi-level, Inverted)',
          'Translation Lookaside Buffer (TLB) Hit Ratio Analysis',
          'Virtual Memory & Demand Paging',
          'Page Replacement Algorithms: FIFO, Optimal, LRU, Clock (Second Chance)',
          'Thrashing & Working Set Model'
        ]
      },
      {
        index: 5,
        title: 'Storage & File Systems',
        hours: 8,
        topics: [
          'File Concept, Access Methods & Directory Structures',
          'Allocation Methods: Contiguous, Linked, Indexed (Inodes in ext4)',
          'Free-Space Management & Bit Vectors',
          'Disk Scheduling Algorithms: FCFS, SSTF, SCAN, C-SCAN'
        ]
      }
    ]
  },
  {
    courseCode: '21CS501',
    title: 'Computer Networks & Internetworking',
    shortTitle: 'Computer Networks (CN)',
    semester: 'Semester 5',
    credits: 4,
    facultyInCharge: 'Prof. Habeeb Ur Rehman P.B.',
    department: 'Cloud Computing, Virtualization & DevOps',
    prescribedTextbooks: [
      {
        title: 'Computer Networking: A Top-Down Approach',
        authors: 'James F. Kurose, Keith W. Ross',
        edition: '8th Edition, Pearson'
      }
    ],
    modules: [
      {
        index: 1,
        title: 'Application Layer & Socket Programming',
        hours: 10,
        topics: ['HTTP/1.1 vs HTTP/2 vs HTTP/3 (QUIC)', 'DNS Hierarchy & RR Records', 'Socket Programming in C/Python (TCP vs UDP)']
      },
      {
        index: 2,
        title: 'Transport Layer Protocols & Congestion Control',
        hours: 10,
        topics: ['TCP 3-Way Handshake & Teardown', 'Sliding Window & Flow Control', 'TCP Reno vs Cubic Congestion Control', 'UDP Datagrams']
      },
      {
        index: 3,
        title: 'Network Layer: Data Plane & Routing Algorithms',
        hours: 10,
        topics: ['IPv4 Addressing, Subnetting & CIDR', 'IPv6 Header & Transition', 'Dijkstra Link-State (OSPF)', 'Bellman-Ford Distance Vector (BGP)']
      }
    ]
  },
  {
    courseCode: '21CS502',
    title: 'Database Management Systems & Modeling',
    shortTitle: 'DBMS',
    semester: 'Semester 5',
    credits: 4,
    facultyInCharge: 'Prof. Anushree Raj',
    department: 'Full-Stack Software Engineering & Compilers',
    prescribedTextbooks: [
      {
        title: 'Fundamentals of Database Systems',
        authors: 'Ramez Elmasri, Shamkant B. Navathe',
        edition: '7th Edition, Pearson'
      }
    ],
    modules: [
      {
        index: 1,
        title: 'Relational Model, ER Modeling & SQL',
        hours: 10,
        topics: ['Entity-Relationship Diagrams', 'Relational Algebra (Select, Project, Join, Division)', 'SQL DDL, DML, Nested Subqueries & Window Functions']
      },
      {
        index: 2,
        title: 'Relational Design & Normalization Theory',
        hours: 10,
        topics: ['Functional Dependencies & Armstrong Axioms', '1NF, 2NF, 3NF Normal Forms', 'Boyce-Codd Normal Form (BCNF) vs 3NF Tradeoffs', 'Lossless Join & Dependency Preservation']
      },
      {
        index: 3,
        title: 'Transaction Processing, Concurrency & Indexing',
        hours: 10,
        topics: ['ACID Properties & Transaction States', 'Two-Phase Locking (2PL) Protocol', 'Write-Ahead Logging (WAL) & ARIES Recovery', 'B+ Tree Indexing & Query Profiling']
      }
    ]
  },
  {
    courseCode: '21CS601',
    title: 'Machine Learning & Statistical Pattern Recognition',
    shortTitle: 'Machine Learning (ML)',
    semester: 'Semester 6',
    credits: 4,
    facultyInCharge: 'Dr. Sharmila Kumari M.',
    department: 'Artificial Intelligence & Machine Learning',
    prescribedTextbooks: [
      {
        title: 'Pattern Recognition and Machine Learning',
        authors: 'Christopher M. Bishop',
        edition: 'Springer, 2006'
      },
      {
        title: 'Machine Learning',
        authors: 'Tom M. Mitchell',
        edition: 'McGraw Hill, 1997'
      }
    ],
    modules: [
      {
        index: 1,
        title: 'Concept Learning, Decision Trees & Hypothesis Space',
        hours: 10,
        topics: ['Find-S & Candidate Elimination Algorithms', 'Entropy & Information Gain (ID3 Algorithm)', 'Overfitting & Tree Pruning']
      },
      {
        index: 2,
        title: 'Neural Networks & Gradient Optimization',
        hours: 10,
        topics: ['Perceptron Training Rule & Linear Separability', 'Multilayer Perceptrons & Sigmoid Units', 'Backpropagation Derivation using Chain Rule', 'Stochastic Gradient Descent & Adam Optimizer']
      },
      {
        index: 3,
        title: 'Bayesian Learning & Statistical Models',
        hours: 10,
        topics: ['Bayes Theorem & Maximum A Posteriori (MAP)', 'Naive Bayes Classifier for Text Classification', 'Expectation-Maximization (EM) Algorithm', 'k-Nearest Neighbors (k-NN) & Locally Weighted Regression']
      }
    ]
  }
];

// Pre-indexed Knowledge Chunks with Anthropic-Style Contextual Headers
export const INDEXED_CHUNKS = [
  // 21CS401: Algorithms Chunks
  {
    id: '21CS401-CHUNK-01',
    courseCode: '21CS401',
    courseTitle: 'Design & Analysis of Algorithms',
    semester: 'Semester 4',
    module: 2,
    moduleTitle: 'Greedy Heuristics & Dynamic Programming Paradigms',
    topic: "Dijkstra's Single-Source Shortest Path Algorithm",
    resourceType: 'textbook',
    source: 'CLRS 3rd Edition, Chapter 24 (Single-Source Shortest Paths), pp. 658-662',
    tags: ['dijkstra', 'shortest-path', 'greedy', 'priority-queue', 'graph-algorithms'],
    contextHeader: '[PACE CSE ACADEMIC REPOSITORY | 2021 Autonomous Scheme | 21CS401 Algorithms | Module 2: Greedy & DP]',
    content: `Dijkstra's algorithm solves the single-source shortest-paths problem on a weighted, directed graph G = (V, E) for the case in which all edge weights are non-negative (w(u, v) >= 0 for all (u, v) in E).

Algorithmic Steps:
1. Initialize single-source: Set dist[s] = 0 and dist[v] = infinity for all v in V - {s}. Set predecessor pred[v] = NIL.
2. Maintain a set S of vertices whose final shortest-path weights from source s have already been determined. Initially, S = empty.
3. Insert all vertices into a min-priority queue Q keyed by dist values.
4. While Q is not empty:
   a. Extract vertex u = EXTRACT-MIN(Q).
   b. Add u to S (S = S union {u}).
   c. For each neighbor v adjacent to u:
      If dist[v] > dist[u] + w(u, v):
         dist[v] = dist[u] + w(u, v)  // RELAX(u, v, w)
         pred[v] = u
         DECREASE-KEY(Q, v, dist[v])

Complexity Analysis:
- Using an Array for Priority Queue: O(V^2)
- Using a Binary Min-Heap: O((V + E) log V)
- Using a Fibonacci Heap: O(V log V + E)

Limitation: Fails with negative edge weights because once a vertex is added to set S, its distance is never reconsidered. For graphs with negative edge weights, Bellman-Ford algorithm must be used.`,
    examRelevance: {
      marks: 8,
      vtuFrequency: 'Repeated 5 times in VTU/Autonomous exams (Dec 2022, July 2023, Dec 2023, July 2024)',
      standardQuestion: "State Dijkstra's algorithm. Apply it to find the shortest path from vertex A in the given graph and derive its time complexity with a min-heap."
    }
  },
  {
    id: '21CS401-CHUNK-02',
    courseCode: '21CS401',
    courseTitle: 'Design & Analysis of Algorithms',
    semester: 'Semester 4',
    module: 1,
    moduleTitle: 'Introduction, Asymptotic Analysis & Divide-and-Conquer',
    topic: 'Master Theorem for Divide-and-Conquer Recurrences',
    resourceType: 'textbook',
    source: 'CLRS 3rd Edition, Chapter 4 (Divide-and-Conquer), pp. 93-97',
    tags: ['master-theorem', 'recurrence', 'divide-and-conquer', 'time-complexity', 'asymptotic-notation'],
    contextHeader: '[PACE CSE ACADEMIC REPOSITORY | 2021 Autonomous Scheme | 21CS401 Algorithms | Module 1: Recurrences]',
    content: `The Master Theorem provides a cookbook method for solving recurrences of the form:
T(n) = a * T(n / b) + f(n), where a >= 1 and b > 1 are constants, and f(n) is an asymptotically positive function.

Interpretation:
- 'a' is the number of subproblems.
- 'n/b' is the size of each subproblem.
- 'f(n)' is the cost of dividing the problem and combining the subproblem results.

Three Cases based on comparing f(n) with n^(log_b a):
Case 1 (Watermark: Leaves dominate):
If f(n) = O(n^(log_b(a) - epsilon)) for some constant epsilon > 0, then:
T(n) = Theta(n^(log_b a))
Example: T(n) = 9 T(n/3) + n. Here a=9, b=3. log_3(9) = 2. n^(log_b a) = n^2. Since f(n)=n = O(n^(2 - 1)), T(n) = Theta(n^2).

Case 2 (Watermark: Balanced work across levels):
If f(n) = Theta(n^(log_b a) * log^k(n)) for some k >= 0, then:
T(n) = Theta(n^(log_b a) * log^(k+1)(n))
Example (Merge Sort): T(n) = 2 T(n/2) + Theta(n). Here a=2, b=2. n^(log_2 2) = n. With k=0: T(n) = Theta(n log n).

Case 3 (Watermark: Root dominates):
If f(n) = Omega(n^(log_b(a) + epsilon)) for some constant epsilon > 0, AND regularity condition holds: a * f(n/b) <= c * f(n) for some c < 1 and large n, then:
T(n) = Theta(f(n))
Example: T(n) = 3 T(n/4) + n log n. Here a=3, b=4. log_4(3) approx 0.793. f(n) dominates, so T(n) = Theta(n log n).`,
    examRelevance: {
      marks: 6,
      vtuFrequency: 'Appears in every semester exam under Module 1 (Question 1 or 2)',
      standardQuestion: 'State Master Theorem for divide-and-conquer recurrences. Solve the recurrence T(n) = 4T(n/2) + n^2 and T(n) = 8T(n/2) + 1000n^2.'
    }
  },
  {
    id: '21CS401-CHUNK-03',
    courseCode: '21CS401',
    courseTitle: 'Design & Analysis of Algorithms',
    semester: 'Semester 4',
    module: 2,
    moduleTitle: 'Greedy Heuristics & Dynamic Programming Paradigms',
    topic: '0/1 Knapsack Problem using Dynamic Programming',
    resourceType: 'notes',
    source: 'PACE CSE Department Lecture Notes · Module 2 · Prof. Anushree Raj',
    tags: ['0-1-knapsack', 'dynamic-programming', 'table-filling', 'optimal-substructure'],
    contextHeader: '[PACE CSE ACADEMIC REPOSITORY | 2021 Autonomous Scheme | 21CS401 Algorithms | Module 2: DP]',
    content: `Problem Statement: Given n items, each with weight w[i] and profit p[i], and a knapsack of maximum capacity W, find a subset of items such that total weight <= W and total profit is maximized. An item cannot be broken (either take 0 or 1).

Recurrence Relation:
Let V[i, j] represent the maximum profit considering first i items with knapsack capacity j (0 <= i <= n, 0 <= j <= W):

V[i, j] = 0                                           if i = 0 or j = 0
V[i, j] = V[i-1, j]                                   if w[i] > j (item cannot fit)
V[i, j] = max(V[i-1, j], p[i] + V[i-1, j - w[i]])      if w[i] <= j (choose max of excluding or including item i)

Algorithm:
1. Initialize a 2D table V of dimensions (n+1) x (W+1) with 0s in row 0 and column 0.
2. Fill row by row from i = 1 to n, and j = 1 to W using the recurrence.
3. The value at V[n, W] holds the optimal profit.
4. Backtracking to find selected items:
   - Start from i = n, j = W.
   - If V[i, j] != V[i-1, j], item i was included; add item i to result and update j = j - w[i].
   - Decrement i = i - 1. Repeat until i = 0 or j = 0.

Complexity:
- Time Complexity: O(n * W) (Pseudo-polynomial time)
- Space Complexity: O(n * W) (Can be optimized to O(W) with rolling array)`,
    examRelevance: {
      marks: 10,
      vtuFrequency: 'Standard 10-mark problem with numerical weights (e.g., weights = [2, 3, 4, 5], profits = [3, 4, 5, 6], W = 5)',
      standardQuestion: 'Explain the 0/1 Knapsack problem using Dynamic Programming. Write the algorithm and trace it with n = 4 items, W = 5.'
    }
  },

  // 21CS402: Operating Systems Chunks
  {
    id: '21CS402-CHUNK-01',
    courseCode: '21CS402',
    courseTitle: 'Operating Systems & Concurrency',
    semester: 'Semester 4',
    module: 3,
    moduleTitle: 'Synchronization & Deadlocks',
    topic: "Banker's Algorithm for Deadlock Avoidance",
    resourceType: 'textbook',
    source: 'Silberschatz OS Concepts 10th Ed, Chapter 8 (Deadlocks), pp. 329-335',
    tags: ['bankers-algorithm', 'deadlock-avoidance', 'safe-state', 'resource-allocation'],
    contextHeader: '[PACE CSE ACADEMIC REPOSITORY | 2021 Autonomous Scheme | 21CS402 OS | Module 3: Deadlocks]',
    content: `The Banker's Algorithm is a deadlock avoidance algorithm developed by Edsger Dijkstra for systems with multiple instances of each resource type. It ensures the system never enters an unsafe state.

Data Structures (for n processes and m resource types):
1. Available[m]: Available[j] = k means k instances of resource R_j are free.
2. Max[n, m]: Max[i, j] = k means process P_i may request at most k instances of R_j.
3. Allocation[n, m]: Allocation[i, j] = k means P_i currently holds k instances of R_j.
4. Need[n, m]: Need[i, j] = Max[i, j] - Allocation[i, j] (remaining resources needed by P_i).

Safety Algorithm:
1. Initialize Work = Available (vector of size m) and Finish[i] = false for all i in [0..n-1].
2. Find an index i such that:
   a. Finish[i] == false
   b. Need[i] <= Work
   If no such i exists, go to Step 4.
3. Work = Work + Allocation[i]
   Finish[i] = true
   Go to Step 2.
4. If Finish[i] == true for all i, the system is in a SAFE STATE. The sequence of indices found is the SAFE SEQUENCE. Otherwise, UNSAFE (deadlock possible).

Resource-Request Algorithm for Process P_i:
1. If Request_i <= Need_i, proceed; else raise error (process exceeded maximum claim).
2. If Request_i <= Available, proceed; else P_i must wait (resources not free).
3. Pretend to allocate:
   Available = Available - Request_i
   Allocation_i = Allocation_i + Request_i
   Need_i = Need_i - Request_i
4. Run Safety Algorithm. If safe, grant resources; else rollback state and P_i must wait.`,
    examRelevance: {
      marks: 10,
      vtuFrequency: 'Guaranteed 10-mark numerical question in VTU examinations',
      standardQuestion: "Consider 5 processes P0 to P4 and 3 resources A, B, C. Given Allocation, Max, and Available matrices, determine if the system is in a safe state using Banker's Algorithm and find the safe sequence."
    }
  },
  {
    id: '21CS402-CHUNK-02',
    courseCode: '21CS402',
    courseTitle: 'Operating Systems & Concurrency',
    semester: 'Semester 4',
    module: 1,
    moduleTitle: 'OS Structures, System Calls & Process Management',
    topic: 'POSIX Process Creation: fork(), exec(), wait(), and exit()',
    resourceType: 'lab_manual',
    source: 'PACE CSE Lab Manual LAB-105 GLUG PACE & Systems Programming',
    tags: ['fork', 'exec', 'posix', 'system-calls', 'process-lifecycle', 'lab-programs'],
    contextHeader: '[PACE CSE ACADEMIC REPOSITORY | 2021 Autonomous Scheme | 21CS402 OS | Lab 1 & Module 1]',
    content: `Process Lifecycle in Unix/Linux Systems:
Processes are created using the fork() system call. A new process (child) is an exact duplicate of the calling process (parent), except for PID and memory space.

Key System Calls:
1. pid_t fork(void):
   - Returns 0 to the child process.
   - Returns Child PID (> 0) to the parent process.
   - Returns -1 if process creation failed.
2. int execvp(const char *file, char *const argv[]):
   - Replaces the current process image with a new executable program.
   - Does not return on success; only returns -1 on failure.
3. pid_t wait(int *status):
   - Blocks the parent process until one of its child processes terminates.
   - Prevents creation of Zombie processes.
4. void exit(int status):
   - Terminates process immediately and returns exit status to waiting parent.

Example C Program for Lab 1:
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

int main() {
    pid_t pid = fork();

    if (pid < 0) {
        perror("Fork failed");
        exit(EXIT_FAILURE);
    } else if (pid == 0) {
        // Child Process
        printf("[CHILD] PID: %d, Parent PID: %d\\n", getpid(), getppid());
        char *args[] = {"ls", "-l", NULL};
        execvp(args[0], args);
        perror("execvp failed"); // Only reaches here if execvp failed
        exit(EXIT_FAILURE);
    } else {
        // Parent Process
        printf("[PARENT] PID: %d, Created Child PID: %d\\n", getpid(), pid);
        int status;
        wait(&status); // Wait for child to prevent zombie state
        printf("[PARENT] Child finished with exit status %d\\n", WEXITSTATUS(status));
    }
    return 0;
}
\`\`\`
Compilation Flag: gcc -Wall -O2 lab1_process.c -o lab1_process`,
    examRelevance: {
      marks: 8,
      vtuFrequency: 'Core question in Module 1 and mandatory in OS Lab Examination',
      standardQuestion: 'Explain fork() and exec() system calls with a C code example. What happens if parent terminates without wait()?'
    }
  },

  // 21CS502: DBMS Chunks
  {
    id: '21CS502-CHUNK-01',
    courseCode: '21CS502',
    courseTitle: 'Database Management Systems & Modeling',
    semester: 'Semester 5',
    module: 2,
    moduleTitle: 'Relational Design & Normalization Theory',
    topic: 'Normalization: 1NF, 2NF, 3NF, and Boyce-Codd Normal Form (BCNF)',
    resourceType: 'textbook',
    source: 'Elmasri & Navathe, Fundamentals of Database Systems 7th Ed, Chapter 14',
    tags: ['normalization', 'functional-dependency', 'bcnf', '3nf', 'lossless-join'],
    contextHeader: '[PACE CSE ACADEMIC REPOSITORY | 2021 Autonomous Scheme | 21CS502 DBMS | Module 2: Normalization]',
    content: `Normalization is the systematic approach of decomposing tables to eliminate data redundancy and insertion, update, and deletion anomalies.

Normal Form Hierarchy:
1. First Normal Form (1NF):
   - Every column must contain atomic (indivisible) values. No multi-valued or composite attributes allowed.
   - Example Violation: Student(ID, PhoneNumbers) where PhoneNumbers has multiple numbers in one cell.

2. Second Normal Form (2NF):
   - Table must be in 1NF.
   - No Partial Dependency: Every non-prime attribute must be fully functionally dependent on the entire primary key (applies to composite primary keys).
   - Violation Example: Enroll(StudentID, CourseID, CourseFee) where CourseFee depends only on CourseID.

3. Third Normal Form (3NF):
   - Table must be in 2NF.
   - No Transitive Dependency: For every functional dependency X -> Y, either:
     a. X is a superkey, OR
     b. Y is a prime attribute (member of a candidate key).
   - Violation Example: Emp(EmpID, DeptID, DeptName) where EmpID -> DeptID and DeptID -> DeptName.

4. Boyce-Codd Normal Form (BCNF - Strict 3NF):
   - A relation R is in BCNF if for EVERY non-trivial functional dependency X -> A, X is a SUPERKEY.
   - Distinction between 3NF and BCNF:
     - 3NF allows X -> A if A is a prime attribute even if X is not a superkey.
     - BCNF strictly forbids this. Every determinant must be a candidate/super key.
     - 3NF guarantees dependency preservation; BCNF may not always preserve all functional dependencies.`,
    examRelevance: {
      marks: 10,
      vtuFrequency: 'Appears in every semester DBMS examination without exception',
      standardQuestion: 'Define 1NF, 2NF, 3NF and BCNF with suitable examples. Show an example of a relation in 3NF but not in BCNF.'
    }
  },

  // 21CS601: Machine Learning Chunks
  {
    id: '21CS601-CHUNK-01',
    courseCode: '21CS601',
    courseTitle: 'Machine Learning & Statistical Pattern Recognition',
    semester: 'Semester 6',
    module: 2,
    moduleTitle: 'Neural Networks & Gradient Optimization',
    topic: 'Backpropagation Algorithm & Weight Update Derivation',
    resourceType: 'textbook',
    source: 'Tom Mitchell, Machine Learning Chapter 4 (Artificial Neural Networks), pp. 95-103',
    tags: ['backpropagation', 'gradient-descent', 'neural-networks', 'chain-rule', 'activation-functions'],
    contextHeader: '[PACE CSE ACADEMIC REPOSITORY | 2021 Autonomous Scheme | 21CS601 ML | Module 2: Neural Networks]',
    content: `The Backpropagation algorithm learns weights in a multilayer feedforward neural network using gradient descent to minimize the squared error over training examples.

Error Function for target t_k and output o_k:
E_d(w) = (1/2) * sum_{k in outputs} (t_k - o_k)^2

Activation Function: Sigmoid function sigma(y) = 1 / (1 + e^(-y))
Key Property of Sigmoid derivative: d(sigma)/dy = sigma(y) * (1 - sigma(y)) = o * (1 - o)

Weight Update Rule using Gradient Descent:
Delta w_{ji} = - eta * (dE_d / dw_{ji}) = eta * delta_j * x_{ji}
where eta is the learning rate, and delta_j is the error term for unit j.

Derivation of Error Terms (delta):
1. For Output Unit k:
   delta_k = - (dE_d / d net_k) = (t_k - o_k) * o_k * (1 - o_k)
   Weight update from hidden unit h to output unit k:
   Delta w_{kh} = eta * delta_k * o_h

2. For Hidden Unit h:
   Hidden units have no direct target t_h, so error is propagated backwards from downstream units:
   delta_h = o_h * (1 - o_h) * sum_{k in Downstream(h)} (delta_k * w_{kh})
   Weight update from input i to hidden unit h:
   Delta w_{hi} = eta * delta_h * x_i

Stopping Criteria:
- Convergence when error gradient falls below threshold epsilon.
- Cross-validation early stopping to prevent overfitting.`,
    examRelevance: {
      marks: 10,
      vtuFrequency: '10-mark derivation question in Module 2 for 6th Sem ML',
      standardQuestion: 'Derive the backpropagation weight update rule for output units and hidden units in a multilayer neural network with sigmoid activation.'
    }
  }
];

// Curated Laboratory Experiments Repository with Complete Code
export const LAB_EXPERIMENTS = [
  {
    courseCode: '21CS401',
    labTitle: 'Design & Analysis of Algorithms Lab (21CSL46)',
    labNumber: 'LAB-4',
    title: "Dijkstra's Shortest Path Algorithm in C",
    language: 'C',
    objectives: 'Implement single-source shortest path algorithm using adjacency matrix and min-priority queue.',
    compilation: 'gcc -Wall -O2 dijkstra.c -o dijkstra',
    sourceCode: `#include <stdio.h>
#define INF 9999
#define MAX 10

void dijkstra(int cost[MAX][MAX], int n, int src) {
    int dist[MAX], visited[MAX], count, min_dist, next_node, i, j;

    for (i = 0; i < n; i++) {
        dist[i] = cost[src][i];
        visited[i] = 0;
    }

    dist[src] = 0;
    visited[src] = 1;
    count = 1;

    while (count < n - 1) {
        min_dist = INF;
        for (i = 0; i < n; i++) {
            if (dist[i] < min_dist && !visited[i]) {
                min_dist = dist[i];
                next_node = i;
            }
        }

        visited[next_node] = 1;
        for (i = 0; i < n; i++) {
            if (!visited[i]) {
                if (min_dist + cost[next_node][i] < dist[i]) {
                    dist[i] = min_dist + cost[next_node][i];
                }
            }
        }
        count++;
    }

    printf("Shortest distances from source node %d:\\n", src);
    for (i = 0; i < n; i++) {
        if (i != src)
            printf("Node %d -> Node %d = %d\\n", src, i, dist[i]);
    }
}

int main() {
    int cost[MAX][MAX], n, src, i, j;
    printf("Enter number of vertices: ");
    if (scanf("%d", &n) != 1) return 1;

    printf("Enter cost adjacency matrix (use 9999 for infinity):\\n");
    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
            scanf("%d", &cost[i][j]);
        }
    }

    printf("Enter source vertex: ");
    scanf("%d", &src);

    dijkstra(cost, n, src);
    return 0;
}`,
    vivaQuestions: [
      { q: "Why doesn't Dijkstra's algorithm work with negative edge weights?", a: "Because it greedily assumes once a node is marked visited with minimum distance, no shorter path can be found. A negative edge later could invalidate this." },
      { q: "What is the time complexity with adjacency matrix vs adjacency list?", a: "Adjacency matrix is O(V^2). With adjacency list and binary min-heap, it is O((V + E) log V)." },
      { q: "How is Dijkstra different from Prim's algorithm?", a: "Dijkstra finds the shortest distance from one source to all nodes. Prim's finds a Minimum Spanning Tree connecting all nodes with minimum total edge weight." }
    ]
  },
  {
    courseCode: '21CS402',
    labTitle: 'Operating Systems & Concurrency Lab (21CSL47)',
    labNumber: 'LAB-3',
    title: 'Producer-Consumer Synchronization using POSIX Semaphores',
    language: 'C',
    objectives: 'Solve bounded-buffer problem using mutex locks and counting semaphores.',
    compilation: 'gcc -Wall -pthread lab3_producer_consumer.c -o lab3_prod_cons',
    sourceCode: `#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <semaphore.h>
#include <unistd.h>

#define BUFFER_SIZE 5
int buffer[BUFFER_SIZE];
int in = 0, out = 0;

sem_t empty_slots;
sem_t full_slots;
pthread_mutex_t mutex;

void *producer(void *param) {
    int item;
    for (int i = 0; i < 5; i++) {
        item = rand() % 100;
        sem_wait(&empty_slots);
        pthread_mutex_lock(&mutex);

        buffer[in] = item;
        printf("[PRODUCER] Produced item %d at index %d\\n", item, in);
        in = (in + 1) % BUFFER_SIZE;

        pthread_mutex_unlock(&mutex);
        sem_post(&full_slots);
        sleep(1);
    }
    pthread_exit(NULL);
}

void *consumer(void *param) {
    int item;
    for (int i = 0; i < 5; i++) {
        sem_wait(&full_slots);
        pthread_mutex_lock(&mutex);

        item = buffer[out];
        printf("[CONSUMER] Consumed item %d from index %d\\n", item, out);
        out = (out + 1) % BUFFER_SIZE;

        pthread_mutex_unlock(&mutex);
        sem_post(&empty_slots);
        sleep(2);
    }
    pthread_exit(NULL);
}

int main() {
    pthread_t prod_thread, cons_thread;

    sem_init(&empty_slots, 0, BUFFER_SIZE);
    sem_init(&full_slots, 0, 0);
    pthread_mutex_init(&mutex, NULL);

    pthread_create(&prod_thread, NULL, producer, NULL);
    pthread_create(&cons_thread, NULL, consumer, NULL);

    pthread_join(prod_thread, NULL);
    pthread_join(cons_thread, NULL);

    sem_destroy(&empty_slots);
    sem_destroy(&full_slots);
    pthread_mutex_destroy(&mutex);

    return 0;
}`,
    vivaQuestions: [
      { q: 'What is the purpose of empty_slots and full_slots semaphores?', a: 'empty_slots is initialized to buffer capacity to block producer when full. full_slots is initialized to 0 to block consumer when empty.' },
      { q: 'Why is mutex lock required in addition to semaphores?', a: 'To protect the critical section (buffer array, in and out index pointers) from concurrent race conditions.' },
      { q: 'What happens if sem_wait(&empty_slots) and pthread_mutex_lock(&mutex) are swapped?', a: 'Deadlock can occur if the buffer is full: producer acquires mutex and then blocks on empty_slots, while consumer cannot acquire mutex to empty a slot.' }
    ]
  }
];

// Standard Question Bank & Model Answer Blueprints
export const VTU_QUESTION_BANK = [
  {
    id: 'Q-DAA-01',
    courseCode: '21CS401',
    question: "Explain Dijkstra's algorithm with an example and derive its time complexity.",
    module: 2,
    marks: 8,
    frequency: 'VTU Dec 2023 / July 2024',
    modelAnswerKey: [
      '1. Algorithm definition and non-negative edge weight precondition (2 Marks)',
      '2. Pseudocode / steps including RELAX operation and priority queue initialization (3 Marks)',
      '3. Step-by-step trace on a 5-node directed graph with distance table (2 Marks)',
      '4. Asymptotic time complexity derivation with min-heap O((V + E) log V) (1 Mark)'
    ]
  },
  {
    id: 'Q-OS-01',
    courseCode: '21CS402',
    question: "Explain Banker's Algorithm for deadlock avoidance with safety and resource-request algorithms.",
    module: 3,
    marks: 10,
    frequency: 'VTU Dec 2022 / July 2023',
    modelAnswerKey: [
      '1. Need Matrix formula: Need[i][j] = Max[i][j] - Allocation[i][j] (2 Marks)',
      '2. Safety algorithm steps with Work and Finish vectors (3 Marks)',
      '3. Resource-Request algorithm conditional checks (2 Marks)',
      '4. Numerical example demonstrating safe sequence [P1, P3, P4, P0, P2] (3 Marks)'
    ]
  },
  {
    id: 'Q-DBMS-01',
    courseCode: '21CS502',
    question: 'Compare 3NF and BCNF with suitable examples. Why is 3NF preferred in certain distributed databases?',
    module: 2,
    marks: 8,
    frequency: 'VTU July 2023 / Dec 2023',
    modelAnswerKey: [
      '1. Definitions of 3NF (allows prime attributes on RHS) vs BCNF (every determinant is superkey) (3 Marks)',
      '2. Canonical example of relation in 3NF but not BCNF (e.g. Student-Advisor-Subject) (3 Marks)',
      '3. Dependency preservation tradeoff explanation in 3NF (2 Marks)'
    ]
  },
  {
    id: 'Q-ML-01',
    courseCode: '21CS601',
    question: 'Derive the weight update rule for output and hidden units in the Backpropagation algorithm using Sigmoid units.',
    module: 2,
    marks: 10,
    frequency: 'VTU Dec 2023',
    modelAnswerKey: [
      '1. Definition of squared sum of errors E_d and sigmoid activation function (2 Marks)',
      '2. Derivative of sigmoid function proof: sigma\'(y) = sigma(y)(1 - sigma(y)) (2 Marks)',
      '3. Output unit error term delta_k derivation using chain rule (3 Marks)',
      '4. Hidden unit error term delta_h derivation backpropagating from output layer (3 Marks)'
    ]
  }
];
