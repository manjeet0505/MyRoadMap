'use client';
import { useState, useEffect, useMemo, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   SDE PREP ARSENAL  ·  by Manjeet Singh
   Complete Interview Prep Tracker — DSA + CS Fundamentals + Aptitude
   ═══════════════════════════════════════════════════════════════ */

/* ── FONT INJECTION ── */
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    ::-webkit-scrollbar{width:4px;height:4px}
    ::-webkit-scrollbar-track{background:transparent}
    ::-webkit-scrollbar-thumb{background:#3b1f6e;border-radius:4px}
    html{scroll-behavior:smooth}
    @keyframes pulse-glow{0%,100%{box-shadow:0 0 12px rgba(168,85,247,.2)}50%{box-shadow:0 0 28px rgba(168,85,247,.5)}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
    .card-hover{transition:all .2s ease}
    .card-hover:hover{transform:translateY(-1px);border-color:rgba(168,85,247,.35)!important}
    .item-row:hover{background:rgba(168,85,247,.06)!important}
    .tab-btn:hover{color:#e2e8f0!important;background:rgba(255,255,255,.05)!important}
    .res-chip:hover{background:rgba(168,85,247,.2)!important;border-color:rgba(168,85,247,.5)!important;color:#d8b4fe!important}
    .check-box:hover{border-color:#a855f7!important}
    .shimmer-bar{background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,.08) 50%,transparent 100%);background-size:200% 100%;animation:shimmer 1.5s infinite}
  `}</style>
);

/* ═══════════════════════════════════════════════════════════════
   SUBJECTS CONFIG
═══════════════════════════════════════════════════════════════ */
const SUBJECTS = [
  { id:"all",       label:"All",          emoji:"⚡",  color:"#a855f7", glow:"rgba(168,85,247,.3)"  },
  { id:"oops",      label:"OOPs",         emoji:"🧱",  color:"#a855f7", glow:"rgba(168,85,247,.3)"  },
  { id:"dbms",      label:"DBMS",         emoji:"🗄️",  color:"#22d3ee", glow:"rgba(34,211,238,.3)"  },
  { id:"sql",       label:"SQL",          emoji:"📊",  color:"#4ade80", glow:"rgba(74,222,128,.3)"  },
  { id:"os",        label:"OS",           emoji:"⚙️",  color:"#fbbf24", glow:"rgba(251,191,36,.3)"  },
  { id:"cn",        label:"Networks",     emoji:"🌐",  color:"#fb923c", glow:"rgba(251,146,60,.3)"  },
  { id:"lld",       label:"LLD",          emoji:"🏗️",  color:"#f472b6", glow:"rgba(244,114,182,.3)" },
  { id:"aptitude",  label:"Aptitude",     emoji:"🧮",  color:"#818cf8", glow:"rgba(129,140,248,.3)" },
  { id:"behavioral",label:"Behavioral",  emoji:"🎯",  color:"#34d399", glow:"rgba(52,211,153,.3)"  },
];

const LV = { F:{ color:"#4ade80", bg:"rgba(74,222,128,.1)",  label:"Must" },
             M:{ color:"#fbbf24", bg:"rgba(251,191,36,.1)",  label:"Mid"  },
             A:{ color:"#f87171", bg:"rgba(248,113,113,.1)", label:"Adv"  } };

/* ═══════════════════════════════════════════════════════════════
   CHAPTERS DATA  (with resources)
═══════════════════════════════════════════════════════════════ */
const CHAPTERS = [

  /* ──────────── OOPs ──────────── */
  {
    id:1, sub:"oops", name:"4 Pillars of OOP", order:1,
    desc:"Absolute basics — asked in every single interview",
    resources:[
      { label:"Striver OOP Playlist", url:"https://www.youtube.com/playlist?list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma", type:"video" },
      { label:"GFG OOP Concepts",     url:"https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/", type:"article" },
      { label:"InterviewBit OOP Qs",  url:"https://www.interviewbit.com/oops-interview-questions/", type:"practice" },
    ],
    items:[
      {id:"o1_1", text:"What is OOP? Real-world analogy (class=blueprint, object=house)",  lv:"F"},
      {id:"o1_2", text:"Encapsulation — definition, getter/setter, data hiding benefits",   lv:"F"},
      {id:"o1_3", text:"Abstraction — abstract class vs interface, when to use which",      lv:"F"},
      {id:"o1_4", text:"Inheritance — single, multiple, multilevel, hierarchical, hybrid",  lv:"F"},
      {id:"o1_5", text:"Polymorphism — compile-time (overloading) vs runtime (overriding)", lv:"F"},
      {id:"o1_6", text:"Method overloading vs overriding — rules and differences",          lv:"F"},
      {id:"o1_7", text:"Why Java doesn't support multiple inheritance with classes?",        lv:"F"},
      {id:"o1_8", text:"Can we override static / private / final methods?",                 lv:"F"},
      {id:"o1_9", text:"Constructor vs method — purpose, return type, naming",              lv:"F"},
    ]
  },
  {
    id:2, sub:"oops", name:"Java Internals & Collections", order:2,
    desc:"Java-specific deep dives — Flipkart, Microsoft ask these",
    resources:[
      { label:"Java Collections GFG",     url:"https://www.geeksforgeeks.org/collections-in-java-2/", type:"article" },
      { label:"HashMap Internal Working", url:"https://www.geeksforgeeks.org/internal-working-of-hashmap-java/", type:"article" },
      { label:"Java Concepts Playlist",   url:"https://www.youtube.com/playlist?list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop", type:"video" },
    ],
    items:[
      {id:"o2_1",  text:"abstract class vs Interface — practical decision guide",           lv:"F"},
      {id:"o2_2",  text:"final, finally, finalize — differences with examples",             lv:"F"},
      {id:"o2_3",  text:"static keyword — class vs instance level, static block",           lv:"F"},
      {id:"o2_4",  text:"this vs super keyword — constructor chaining",                     lv:"F"},
      {id:"o2_5",  text:"Immutable class in Java — how to create one (String example)",     lv:"M"},
      {id:"o2_6",  text:"String vs StringBuilder vs StringBuffer — when to use",            lv:"F"},
      {id:"o2_7",  text:"== vs .equals() — memory reference vs value comparison",           lv:"F"},
      {id:"o2_8",  text:"ArrayList vs LinkedList — internal structure, O(n) operations",    lv:"F"},
      {id:"o2_9",  text:"HashMap internal — hashing, collision (chaining vs OA), load factor", lv:"M"},
      {id:"o2_10", text:"ConcurrentHashMap vs HashMap vs Hashtable",                        lv:"M"},
      {id:"o2_11", text:"Generics in Java — type safety, bounded wildcards",                lv:"M"},
      {id:"o2_12", text:"Comparable vs Comparator — write code for custom sort",            lv:"M"},
      {id:"o2_13", text:"Java 8 features — streams, lambda, Optional, method references",  lv:"M"},
    ]
  },
  {
    id:3, sub:"oops", name:"SOLID Principles + Design Patterns", order:3,
    desc:"Asked directly in interviews + tested through LLD questions",
    resources:[
      { label:"SOLID Principles Video",   url:"https://www.youtube.com/watch?v=HLFbeC78YlU", type:"video" },
      { label:"Refactoring Guru Patterns",url:"https://refactoring.guru/design-patterns", type:"article" },
      { label:"GFG Design Patterns",      url:"https://www.geeksforgeeks.org/software-design-patterns/", type:"article" },
    ],
    items:[
      {id:"o3_1", text:"S — Single Responsibility: one class, one job (code example)",      lv:"F"},
      {id:"o3_2", text:"O — Open/Closed: open for extension, closed for modification",      lv:"F"},
      {id:"o3_3", text:"L — Liskov Substitution: child class can replace parent",           lv:"M"},
      {id:"o3_4", text:"I — Interface Segregation: no fat interfaces",                      lv:"M"},
      {id:"o3_5", text:"D — Dependency Inversion: depend on abstractions",                  lv:"M"},
      {id:"o3_6", text:"Singleton Pattern — thread-safe implementation (double-check lock)", lv:"F"},
      {id:"o3_7", text:"Factory Pattern — creational, decouples object creation",           lv:"F"},
      {id:"o3_8", text:"Observer Pattern — pub/sub event system",                           lv:"M"},
      {id:"o3_9", text:"Strategy Pattern — runtime algorithm switching",                    lv:"M"},
      {id:"o3_10",text:"Builder Pattern — telescoping constructor problem solved",           lv:"M"},
    ]
  },

  /* ──────────── DBMS ──────────── */
  {
    id:4, sub:"dbms", name:"Core DBMS Concepts", order:1,
    desc:"Foundation — ACID is asked in literally every interview",
    resources:[
      { label:"Gate Smashers DBMS",   url:"https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBuCdJnetworkingOs2WYA", type:"video" },
      { label:"GFG DBMS Interview",   url:"https://www.geeksforgeeks.org/commonly-asked-dbms-interview-questions/", type:"practice" },
      { label:"InterviewBit DBMS",    url:"https://www.interviewbit.com/dbms-interview-questions/", type:"practice" },
    ],
    items:[
      {id:"d1_1", text:"DBMS vs File System — 5 reasons why DBMS exists",                  lv:"F"},
      {id:"d1_2", text:"ACID — Atomicity, Consistency, Isolation, Durability (each with example)", lv:"F"},
      {id:"d1_3", text:"Isolation levels — Read Uncommitted → Serializable tradeoffs",     lv:"M"},
      {id:"d1_4", text:"RDBMS vs NoSQL — consistency vs availability tradeoff",            lv:"F"},
      {id:"d1_5", text:"Primary Key vs Foreign Key vs Unique vs Composite Key",            lv:"F"},
      {id:"d1_6", text:"ER Diagram — Entity, Attribute types, Relationship types",         lv:"F"},
      {id:"d1_7", text:"Cardinality — 1:1, 1:N, M:N with junction table",                 lv:"F"},
    ]
  },
  {
    id:5, sub:"dbms", name:"Normalization (1NF → BCNF)", order:2,
    desc:"Must explain with table examples — very frequently asked",
    resources:[
      { label:"Normalization GFG",     url:"https://www.geeksforgeeks.org/introduction-of-database-normalization/", type:"article" },
      { label:"Gate Smashers Normal.", url:"https://www.youtube.com/watch?v=ABwD8IYByfk", type:"video" },
    ],
    items:[
      {id:"d2_1", text:"What is normalization? Anomalies it solves (insert, update, delete)", lv:"F"},
      {id:"d2_2", text:"1NF — atomic values, no repeating groups",                          lv:"F"},
      {id:"d2_3", text:"2NF — no partial dependency (example with composite key)",          lv:"F"},
      {id:"d2_4", text:"3NF — no transitive dependency",                                    lv:"F"},
      {id:"d2_5", text:"BCNF — every determinant is a candidate key",                       lv:"M"},
      {id:"d2_6", text:"Denormalization — when to do it (performance vs redundancy)",       lv:"M"},
      {id:"d2_7", text:"Functional dependency — full vs partial vs transitive",             lv:"M"},
    ]
  },
  {
    id:6, sub:"dbms", name:"Indexing, Transactions & Concurrency", order:3,
    desc:"B-Tree + deadlocks are top picks for senior-style fresher questions",
    resources:[
      { label:"Indexing Deep Dive",    url:"https://www.geeksforgeeks.org/indexing-in-databases-set-1/", type:"article" },
      { label:"Transactions GFG",      url:"https://www.geeksforgeeks.org/transaction-in-dbms/", type:"article" },
    ],
    items:[
      {id:"d3_1", text:"Index — how it speeds up SELECT, slows INSERT/UPDATE",             lv:"F"},
      {id:"d3_2", text:"B-Tree index internals — how MySQL InnoDB uses it",                lv:"M"},
      {id:"d3_3", text:"Clustered vs Non-clustered index — key difference",               lv:"M"},
      {id:"d3_4", text:"Deadlock in DB — detection, prevention, avoidance",               lv:"M"},
      {id:"d3_5", text:"Shared lock vs Exclusive lock",                                   lv:"M"},
      {id:"d3_6", text:"Dirty read, Non-repeatable read, Phantom read",                   lv:"M"},
      {id:"d3_7", text:"CAP Theorem — explain with real system examples",                 lv:"M"},
      {id:"d3_8", text:"Horizontal vs Vertical scaling in databases",                     lv:"F"},
    ]
  },

  /* ──────────── SQL ──────────── */
  {
    id:7, sub:"sql", name:"SQL Fundamentals — Write Cold", order:1,
    desc:"You will write queries on whiteboard/IDE. No excuses.",
    resources:[
      { label:"LeetCode SQL 50",       url:"https://leetcode.com/studyplan/top-sql-50/", type:"practice" },
      { label:"Mode SQL Tutorial",     url:"https://mode.com/sql-tutorial/", type:"article" },
      { label:"W3Schools SQL",         url:"https://www.w3schools.com/sql/", type:"article" },
    ],
    items:[
      {id:"s1_1", text:"SELECT, WHERE, ORDER BY, GROUP BY, HAVING — syntax + difference", lv:"F"},
      {id:"s1_2", text:"INNER JOIN with example — employees + departments tables",         lv:"F"},
      {id:"s1_3", text:"LEFT JOIN vs RIGHT JOIN vs FULL OUTER JOIN",                       lv:"F"},
      {id:"s1_4", text:"SELF JOIN — employees who earn more than their manager",           lv:"M"},
      {id:"s1_5", text:"Subqueries — correlated vs non-correlated",                       lv:"M"},
      {id:"s1_6", text:"IN, NOT IN, EXISTS, NOT EXISTS — performance difference",         lv:"M"},
      {id:"s1_7", text:"UNION vs UNION ALL",                                               lv:"F"},
      {id:"s1_8", text:"DELETE vs TRUNCATE vs DROP",                                       lv:"F"},
    ]
  },
  {
    id:8, sub:"sql", name:"Window Functions + Classic Queries", order:2,
    desc:"S&P Global, Visa, Flipkart asked window functions on the spot",
    resources:[
      { label:"Window Functions Guide", url:"https://www.geeksforgeeks.org/window-functions-in-sql/", type:"article" },
      { label:"SQL Practice Problems",  url:"https://www.hackerrank.com/domains/sql", type:"practice" },
    ],
    items:[
      {id:"s2_1", text:"ROW_NUMBER() — assign unique row number",                         lv:"M"},
      {id:"s2_2", text:"RANK() vs DENSE_RANK() — gap vs no-gap on ties",                 lv:"M"},
      {id:"s2_3", text:"LAG() and LEAD() — compare current vs previous/next row",        lv:"M"},
      {id:"s2_4", text:"SUM() OVER(PARTITION BY) — running total",                       lv:"M"},
      {id:"s2_5", text:"PARTITION BY vs GROUP BY — key difference",                       lv:"M"},
      {id:"s2_6", text:"Find 2nd highest salary — 3 approaches",                          lv:"F"},
      {id:"s2_7", text:"Find Nth highest salary using DENSE_RANK",                        lv:"M"},
      {id:"s2_8", text:"Department-wise top 3 salaries",                                  lv:"M"},
      {id:"s2_9", text:"Delete duplicate rows keeping one",                               lv:"M"},
      {id:"s2_10",text:"Consecutive numbers appearing 3+ times",                          lv:"M"},
    ]
  },

  /* ──────────── OS ──────────── */
  {
    id:9, sub:"os", name:"Processes, Threads & Scheduling", order:1,
    desc:"Most asked OS section — processes vs threads always comes up",
    resources:[
      { label:"Gate Smashers OS",      url:"https://www.youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p", type:"video" },
      { label:"GFG OS Interview Qs",   url:"https://www.geeksforgeeks.org/commonly-asked-operating-systems-interview-questions/", type:"practice" },
    ],
    items:[
      {id:"p1_1", text:"Process vs Thread — memory, creation cost, communication",         lv:"F"},
      {id:"p1_2", text:"Process states — New→Ready→Running→Waiting→Terminated",           lv:"F"},
      {id:"p1_3", text:"Context switching — what happens, why it's expensive",            lv:"M"},
      {id:"p1_4", text:"Zombie process vs Orphan process",                                lv:"M"},
      {id:"p1_5", text:"FCFS, SJF, Round Robin, Priority — Gantt chart + metrics",       lv:"F"},
      {id:"p1_6", text:"Preemptive vs Non-preemptive — starvation in priority scheduling", lv:"F"},
      {id:"p1_7", text:"Calculate: Burst time, Waiting time, Turnaround time",            lv:"F"},
    ]
  },
  {
    id:10, sub:"os", name:"Memory Management & Deadlocks", order:2,
    desc:"Virtual memory + deadlock Coffman conditions are exam favourites",
    resources:[
      { label:"Memory Management GFG", url:"https://www.geeksforgeeks.org/memory-management-in-operating-system/", type:"article" },
      { label:"Deadlock Explained",     url:"https://www.geeksforgeeks.org/introduction-of-deadlock-in-operating-system/", type:"article" },
    ],
    items:[
      {id:"p2_1", text:"Paging — logical vs physical address, page table",                lv:"F"},
      {id:"p2_2", text:"Virtual memory — demand paging, page fault handling",             lv:"M"},
      {id:"p2_3", text:"Page replacement: FIFO, LRU, Optimal — compare",                 lv:"M"},
      {id:"p2_4", text:"Belady's Anomaly — why FIFO fails with more frames",              lv:"M"},
      {id:"p2_5", text:"Thrashing — definition, working set model solution",              lv:"M"},
      {id:"p2_6", text:"4 Coffman conditions for deadlock",                               lv:"F"},
      {id:"p2_7", text:"Mutex vs Semaphore vs Monitor — differences",                    lv:"F"},
      {id:"p2_8", text:"Producer-Consumer problem with semaphore solution",               lv:"M"},
      {id:"p2_9", text:"Race condition + Critical section — Peterson's solution",          lv:"M"},
      {id:"p2_10",text:"Banker's Algorithm — resource allocation",                        lv:"M"},
    ]
  },

  /* ──────────── CN ──────────── */
  {
    id:11, sub:"cn", name:"The 'google.com' Question + Protocols", order:1,
    desc:"Asked in 90% of CN rounds — know this end-to-end cold",
    resources:[
      { label:"What happens when... GitHub", url:"https://github.com/alex/what-happens-when", type:"article" },
      { label:"Gate Smashers CN",            url:"https://www.youtube.com/playlist?list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_", type:"video" },
      { label:"Kunal Kushwaha Networking",   url:"https://www.youtube.com/watch?v=IPvYjXCsTg8", type:"video" },
    ],
    items:[
      {id:"n1_1", text:"What happens when you type 'google.com'? Full walkthrough",       lv:"F"},
      {id:"n1_2", text:"DNS resolution — recursive vs iterative query",                   lv:"F"},
      {id:"n1_3", text:"TCP 3-way handshake — SYN, SYN-ACK, ACK",                        lv:"F"},
      {id:"n1_4", text:"OSI 7 layers — name, function, example protocol each",            lv:"F"},
      {id:"n1_5", text:"TCP vs UDP — reliability, order, use cases",                      lv:"F"},
      {id:"n1_6", text:"HTTP vs HTTPS — TLS handshake, certificates",                    lv:"F"},
      {id:"n1_7", text:"HTTP/1.1 vs HTTP/2 vs HTTP/3 — multiplexing, QUIC",              lv:"M"},
      {id:"n1_8", text:"HTTP status codes — 2xx, 3xx, 4xx, 5xx with examples",           lv:"F"},
    ]
  },
  {
    id:12, sub:"cn", name:"REST APIs & Web Concepts", order:2,
    desc:"Microsoft asked REST API + rate limiting deep questions",
    resources:[
      { label:"REST API Best Practices", url:"https://www.freecodecamp.org/news/rest-api-best-practices-rest-endpoint-design-examples/", type:"article" },
      { label:"JWT Auth Explained",      url:"https://jwt.io/introduction", type:"article" },
    ],
    items:[
      {id:"n2_1", text:"REST API 6 constraints — stateless, uniform interface, etc.",     lv:"F"},
      {id:"n2_2", text:"HTTP methods — GET, POST, PUT, PATCH, DELETE semantics",         lv:"F"},
      {id:"n2_3", text:"Idempotency — which methods are idempotent and why",              lv:"M"},
      {id:"n2_4", text:"JWT authentication — structure, how to verify",                  lv:"M"},
      {id:"n2_5", text:"WebSockets vs HTTP — persistent connection, use cases",          lv:"M"},
      {id:"n2_6", text:"CORS — what it is, how to fix cross-origin errors",              lv:"M"},
      {id:"n2_7", text:"Load balancer — L4 vs L7, Round Robin vs Least Connections",    lv:"M"},
      {id:"n2_8", text:"CDN — how it reduces latency",                                   lv:"M"},
      {id:"n2_9", text:"Proxy vs Reverse Proxy",                                         lv:"M"},
    ]
  },

  /* ──────────── LLD ──────────── */
  {
    id:13, sub:"lld", name:"LLD Framework & OOP Design", order:1,
    desc:"How to approach any LLD question — structure before code",
    resources:[
      { label:"Shreyansh Jain LLD",    url:"https://www.youtube.com/playlist?list=PL6W8uoQQ2c61X_9e6Net0WdYZidm7zooW", type:"video" },
      { label:"LLD GitHub Repo",       url:"https://github.com/prasadgujar/low-level-design-primer", type:"article" },
      { label:"Refactoring Guru",      url:"https://refactoring.guru/design-patterns", type:"article" },
    ],
    items:[
      {id:"l1_1", text:"Step 1: Gather requirements — functional vs non-functional",      lv:"F"},
      {id:"l1_2", text:"Step 2: Identify entities → classes → relationships",            lv:"F"},
      {id:"l1_3", text:"Step 3: Define interfaces before implementation",                lv:"F"},
      {id:"l1_4", text:"Step 4: Apply SOLID, handle edge cases, plan extensions",        lv:"M"},
      {id:"l1_5", text:"UML class diagram — association, aggregation, composition",      lv:"M"},
      {id:"l1_6", text:"Write clean, readable code (naming, single responsibility)",     lv:"F"},
    ]
  },
  {
    id:14, sub:"lld", name:"Machine Coding Problems", order:2,
    desc:"Practice coding these from scratch in 60-90 min — Flipkart's primary filter",
    resources:[
      { label:"Machine Coding Problems List", url:"https://workat.tech/machine-coding/article/how-to-practice-for-machine-coding-kp0oj3sw2jca", type:"practice" },
      { label:"LRU Cache Implementation",     url:"https://www.geeksforgeeks.org/lru-cache-implementation/", type:"article" },
    ],
    items:[
      {id:"l2_1",  text:"LRU Cache — doubly linked list + HashMap implementation",        lv:"F"},
      {id:"l2_2",  text:"LFU Cache — with frequency map",                                 lv:"M"},
      {id:"l2_3",  text:"Parking Lot System — full OOP, multiple floors/slots",           lv:"F"},
      {id:"l2_4",  text:"Elevator/Lift System — state machine design",                   lv:"M"},
      {id:"l2_5",  text:"Vending Machine — states, coins, item dispensing",              lv:"M"},
      {id:"l2_6",  text:"Tic-Tac-Toe — extensible for N×N, any number of players",      lv:"F"},
      {id:"l2_7",  text:"Splitwise — expense sharing, minimum transactions",             lv:"M"},
      {id:"l2_8",  text:"Rate Limiter — Token Bucket + Sliding Window implementations",  lv:"M"},
      {id:"l2_9",  text:"Pub-Sub Event System — subscribe, publish, unsubscribe",        lv:"M"},
      {id:"l2_10", text:"Snake & Ladder game",                                            lv:"M"},
      {id:"l2_11", text:"Chess — board, pieces, move validation (basic)",                lv:"M"},
      {id:"l2_12", text:"Library Management System",                                      lv:"F"},
    ]
  },
  {
    id:15, sub:"lld", name:"HLD Awareness (Fresher Level)", order:3,
    desc:"NOT deep SD — just enough to answer scale follow-up questions",
    resources:[
      { label:"System Design Primer",  url:"https://github.com/donnemartin/system-design-primer", type:"article" },
      { label:"Basic HLD Concepts",    url:"https://www.geeksforgeeks.org/system-design-tutorial/", type:"article" },
    ],
    items:[
      {id:"l3_1", text:"Monolith vs Microservices — tradeoffs, when to split",           lv:"F"},
      {id:"l3_2", text:"SQL vs NoSQL — when to pick which (with real examples)",         lv:"F"},
      {id:"l3_3", text:"Caching — what, when, Redis basics, eviction policies",          lv:"F"},
      {id:"l3_4", text:"Message queue — Kafka use case, async processing",               lv:"M"},
      {id:"l3_5", text:"Horizontal vs Vertical scaling",                                  lv:"F"},
      {id:"l3_6", text:"Design URL Shortener — basic flow only",                         lv:"M"},
      {id:"l3_7", text:"Design a notification system — high level",                      lv:"M"},
    ]
  },

  /* ──────────── APTITUDE ──────────── */
  {
    id:16, sub:"aptitude", name:"Quantitative Aptitude", order:1,
    desc:"OA rounds always have 15-20 quant questions — don't skip",
    resources:[
      { label:"IndiaBIX Aptitude",    url:"https://www.indiabix.com/aptitude/questions-and-answers/", type:"practice" },
      { label:"PrepInsta Quant",      url:"https://prepinsta.com/quantitative-aptitude/", type:"practice" },
      { label:"CareerRide Formulas",  url:"https://www.careerride.com/aptitude-formulas.aspx", type:"article" },
    ],
    items:[
      {id:"a1_1",  text:"Number System — LCM, HCF, divisibility rules",                  lv:"F"},
      {id:"a1_2",  text:"Percentages — increase/decrease, successive %, reverse %",      lv:"F"},
      {id:"a1_3",  text:"Profit & Loss — SP, CP, discount, marked price",                lv:"F"},
      {id:"a1_4",  text:"Simple & Compound Interest — formulas + tricky Qs",             lv:"F"},
      {id:"a1_5",  text:"Ratio & Proportion + Mixtures & Alligation",                    lv:"F"},
      {id:"a1_6",  text:"Time & Work — pipes & cisterns, work efficiency",               lv:"F"},
      {id:"a1_7",  text:"Speed, Distance & Time — trains, boats & streams",              lv:"F"},
      {id:"a1_8",  text:"Permutations & Combinations — nPr, nCr formulas",              lv:"M"},
      {id:"a1_9",  text:"Probability — basic, conditional, cards/dice problems",         lv:"M"},
      {id:"a1_10", text:"Averages, Ages, Partnership problems",                           lv:"F"},
      {id:"a1_11", text:"Data Interpretation — tables, bar/pie/line charts",             lv:"M"},
      {id:"a1_12", text:"Geometry basics — area, volume, Pythagoras",                    lv:"F"},
    ]
  },
  {
    id:17, sub:"aptitude", name:"Logical Reasoning", order:2,
    desc:"Always paired with quant in OA — fast pattern recognition",
    resources:[
      { label:"IndiaBIX Logical",      url:"https://www.indiabix.com/logical-reasoning/questions-and-answers/", type:"practice" },
      { label:"PrepInsta Logical",     url:"https://prepinsta.com/logical-reasoning/", type:"practice" },
    ],
    items:[
      {id:"a2_1",  text:"Number Series — arithmetic, geometric, mixed patterns",         lv:"F"},
      {id:"a2_2",  text:"Letter/Alphabet Series",                                         lv:"F"},
      {id:"a2_3",  text:"Coding-Decoding — letter/number substitution",                  lv:"F"},
      {id:"a2_4",  text:"Blood Relations — family tree problems",                        lv:"F"},
      {id:"a2_5",  text:"Directions & Distances",                                         lv:"F"},
      {id:"a2_6",  text:"Syllogisms — all/some/none statement conclusions",              lv:"M"},
      {id:"a2_7",  text:"Puzzles — seating arrangement, scheduling",                     lv:"M"},
      {id:"a2_8",  text:"Clocks & Calendars — angle, day of week",                       lv:"M"},
      {id:"a2_9",  text:"Statement & Assumptions / Conclusions",                         lv:"M"},
      {id:"a2_10", text:"Analogy — word/letter/number pairs",                            lv:"F"},
    ]
  },
  {
    id:18, sub:"aptitude", name:"Verbal Ability", order:3,
    desc:"English section in OA — often underestimated",
    resources:[
      { label:"IndiaBIX Verbal",       url:"https://www.indiabix.com/verbal-ability/questions-and-answers/", type:"practice" },
      { label:"GFG Verbal",            url:"https://www.geeksforgeeks.org/english-grammar/", type:"article" },
    ],
    items:[
      {id:"a3_1",  text:"Reading Comprehension — main idea, inference questions",        lv:"F"},
      {id:"a3_2",  text:"Sentence Completion — grammar-based fill in the blank",         lv:"F"},
      {id:"a3_3",  text:"Synonyms & Antonyms — top 100 commonly asked words",            lv:"F"},
      {id:"a3_4",  text:"Sentence Error Detection — grammar rules",                      lv:"M"},
      {id:"a3_5",  text:"Para-jumbles — rearrange sentences logically",                  lv:"M"},
      {id:"a3_6",  text:"Idioms & Phrases",                                               lv:"M"},
    ]
  },

  /* ──────────── BEHAVIORAL ──────────── */
  {
    id:19, sub:"behavioral", name:"Self Introduction & Motivation", order:1,
    desc:"First 5 minutes of every interview — prepare this perfectly",
    resources:[
      { label:"Tell Me About Yourself Guide", url:"https://www.youtube.com/watch?v=MmFuWmzeiDs", type:"video" },
      { label:"Common HR Questions GFG",      url:"https://www.geeksforgeeks.org/hr-interview-questions/", type:"practice" },
    ],
    items:[
      {id:"b1_1", text:"Tell me about yourself — 90 second crisp version (STAR format)", lv:"F"},
      {id:"b1_2", text:"Why do you want to join [Company]? (research them beforehand)",  lv:"F"},
      {id:"b1_3", text:"Strengths — 2 strengths with concrete examples",                 lv:"F"},
      {id:"b1_4", text:"Weaknesses — honest + what you're doing to improve",             lv:"F"},
      {id:"b1_5", text:"Why should we hire you? — your unique value prop",               lv:"F"},
      {id:"b1_6", text:"Where do you see yourself in 3-5 years?",                        lv:"F"},
    ]
  },
  {
    id:20, sub:"behavioral", name:"Project Deep Dive (S3 Dashboard + Research)", order:2,
    desc:"Your biggest differentiator — prepare S3 Dashboard answers cold",
    resources:[
      { label:"STAR Method Guide",    url:"https://www.youtube.com/watch?v=0nN7Q7DrI6Q", type:"video" },
      { label:"Tech Project Questions",url:"https://www.interviewkickstart.com/career-advice/project-related-interview-questions", type:"article" },
    ],
    items:[
      {id:"b2_1", text:"Architecture walkthrough — explain S3 Dashboard in 3 min",       lv:"F"},
      {id:"b2_2", text:"Biggest technical challenge + how you solved it",                lv:"F"},
      {id:"b2_3", text:"Why this tech stack? (Next.js, FastAPI, MongoDB, Qdrant)",       lv:"F"},
      {id:"b2_4", text:"How would you scale this to 10x users?",                         lv:"M"},
      {id:"b2_5", text:"What trade-offs did you make and why?",                          lv:"M"},
      {id:"b2_6", text:"What would you do differently if you rebuilt it?",               lv:"M"},
      {id:"b2_7", text:"Research paper — explain LLM chatbot architecture simply",       lv:"F"},
    ]
  },
  {
    id:21, sub:"behavioral", name:"Teamwork, Leadership & Situational", order:3,
    desc:"Amazon LP-style — everyone asks these. Prepare 5 STAR stories.",
    resources:[
      { label:"Amazon Leadership Principles", url:"https://www.amazon.jobs/content/en/our-workplace/leadership-principles", type:"article" },
      { label:"STAR Method Practice",         url:"https://www.youtube.com/watch?v=8QfSnuL8Ny8", type:"video" },
    ],
    items:[
      {id:"b3_1", text:"Time you disagreed with someone — how you handled it",           lv:"F"},
      {id:"b3_2", text:"Time you failed — what did you learn?",                          lv:"F"},
      {id:"b3_3", text:"Time you led an initiative without being asked",                 lv:"F"},
      {id:"b3_4", text:"Time you had too many tasks — how you prioritized",              lv:"F"},
      {id:"b3_5", text:"Time you had to learn something very fast",                      lv:"F"},
      {id:"b3_6", text:"Time you received critical feedback — how you responded",        lv:"M"},
      {id:"b3_7", text:"Prepare 3 strong questions to ask the interviewer",              lv:"F"},
      {id:"b3_8", text:"Salary negotiation — how to handle the CTC question",           lv:"F"},
    ]
  },
];

/* ═══════════════════════════════════════════════════════════════
   STUDY PLAN
═══════════════════════════════════════════════════════════════ */
const PLAN = [
  { day:"Day 1–2", title:"OOPs Mastery",        subs:["oops"],      goal:"4 pillars + SOLID + top patterns" },
  { day:"Day 3–4", title:"DBMS + SQL",           subs:["dbms","sql"],goal:"ACID, normalisation, window functions" },
  { day:"Day 5–6", title:"OS Fundamentals",      subs:["os"],        goal:"Processes, scheduling, deadlocks" },
  { day:"Day 7",   title:"Networks + REST",      subs:["cn"],        goal:"google.com question, HTTP, REST" },
  { day:"Day 8–9", title:"LLD Practice",         subs:["lld"],       goal:"LRU + Parking Lot from scratch" },
  { day:"Day 10",  title:"Aptitude Blitz",       subs:["aptitude"],  goal:"Quant + Logical shortcuts" },
  { day:"Day 11",  title:"Behavioral Stories",   subs:["behavioral"],goal:"5 STAR stories polished" },
  { day:"Ongoing", title:"Mock Interviews",      subs:[],            goal:"2 mocks per week — timed + aloud" },
];

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function SDEPrepArsenal() {
  const [done, setDone]         = useState({});
  const [sub, setSub]           = useState("all");
  const [expanded, setExpanded] = useState({});
  const [filter, setFilter]     = useState("all");
  const [search, setSearch]     = useState("");
  const [loaded, setLoaded]     = useState(false);
  const [showRes, setShowRes]   = useState({});

  /* ── Persistence ── */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sde_arsenal_v2");
      if (saved) setDone(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem("sde_arsenal_v2", JSON.stringify(done)); } catch {}
  }, [done, loaded]);

  const toggle = useCallback((id) => setDone(p => ({ ...p, [id]: !p[id] })), []);
  const toggleCh = useCallback((id) => setExpanded(p => ({ ...p, [id]: !p[id] })), []);
  const toggleRes = useCallback((id) => setShowRes(p => ({ ...p, [id]: !p[id] })), []);

  /* ── Stats ── */
  const allItems  = useMemo(() => CHAPTERS.flatMap(c => c.items), []);
  const totalItems = allItems.length;
  const doneItems  = useMemo(() => allItems.filter(i => done[i.id]).length, [allItems, done]);
  const pct        = totalItems ? Math.round((doneItems / totalItems) * 100) : 0;

  /* ── Filtered chapters ── */
  const visible = useMemo(() => {
    const sq = search.toLowerCase();
    return CHAPTERS.map(c => {
      if (sub !== "all" && c.sub !== sub) return null;
      let items = c.items;
      if (filter === "done") items = items.filter(i => done[i.id]);
      if (filter === "todo") items = items.filter(i => !done[i.id]);
      if (sq) items = items.filter(i => i.text.toLowerCase().includes(sq));
      if (items.length === 0 && (filter !== "all" || sq)) return null;
      return { ...c, items };
    }).filter(Boolean);
  }, [sub, filter, search, done]);

  const chDone  = (c) => c.items.filter(i => done[i.id]).length;
  const subObj  = (id) => SUBJECTS.find(s => s.id === id) || SUBJECTS[0];
  const accent  = subObj(sub).color;

  if (!loaded) return (
    <div style={{
      display:"flex",alignItems:"center",justifyContent:"center",
      height:"100vh",background:"#020308",fontFamily:"'JetBrains Mono',monospace",
      color:"#a855f7",fontSize:14,letterSpacing:2
    }}>
      LOADING ARSENAL...
    </div>
  );

  const typeIcon = { video:"▶", article:"📖", practice:"⚡" };
  const typeColor = { video:"#f472b6", article:"#22d3ee", practice:"#4ade80" };

  return (
    <div style={{
      minHeight:"100vh",
      background:"#020308",
      fontFamily:"'Plus Jakarta Sans', sans-serif",
      color:"#e2e8f0",
      position:"relative",
      overflowX:"hidden",
    }}>
      <FontStyle />

      {/* Background grid pattern */}
      <div style={{
        position:"fixed",top:0,left:0,right:0,bottom:0,
        backgroundImage:`
          linear-gradient(rgba(168,85,247,.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(168,85,247,.04) 1px, transparent 1px)
        `,
        backgroundSize:"48px 48px",
        pointerEvents:"none",zIndex:0,
      }}/>

      {/* Ambient glows */}
      <div style={{
        position:"fixed",top:"-20%",left:"-10%",width:"50%",height:"50%",
        background:"radial-gradient(circle,rgba(168,85,247,.08) 0%,transparent 70%)",
        pointerEvents:"none",zIndex:0,
      }}/>
      <div style={{
        position:"fixed",bottom:"-20%",right:"-10%",width:"50%",height:"50%",
        background:"radial-gradient(circle,rgba(34,211,238,.06) 0%,transparent 70%)",
        pointerEvents:"none",zIndex:0,
      }}/>

      {/* ── HEADER ── */}
      <header style={{ position:"relative",zIndex:10, borderBottom:"1px solid rgba(168,85,247,.15)" }}>
        <div style={{
          background:"linear-gradient(180deg,rgba(30,10,60,.95) 0%,rgba(2,3,8,.8) 100%)",
          backdropFilter:"blur(20px)",
          padding:"32px 32px 0",
          maxWidth:1280,margin:"0 auto",
        }}>

          {/* Honest Notice Banner */}
          <div style={{
            background:"linear-gradient(135deg,rgba(124,58,237,.15),rgba(34,211,238,.1))",
            border:"1px solid rgba(168,85,247,.3)",
            borderRadius:12,padding:"12px 18px",marginBottom:28,
            display:"flex",alignItems:"flex-start",gap:12,
          }}>
            <span style={{ fontSize:18,lineHeight:1,flexShrink:0 }}>📌</span>
            <div style={{ fontSize:12.5,lineHeight:1.7,color:"#a5b4fc" }}>
              <strong style={{ color:"#c4b5fd",fontFamily:"'JetBrains Mono',monospace" }}>
                HONEST GUIDE FOR FRESHERS:
              </strong>{" "}
              DSA = #1 priority (your bootcamp handles this).{" "}
              <span style={{ color:"#4ade80" }}>OOPs + DBMS + OS + CN = required everywhere.</span>{" "}
              LLD = required at Flipkart & startups.{" "}
              <span style={{ color:"#f87171" }}>Deep HLD/System Design = NOT expected from freshers.</span>{" "}
              Aptitude = tested in every OA round — don't skip.
            </div>
          </div>

          {/* Title Row */}
          <div style={{ display:"flex",alignItems:"flex-end",gap:20,flexWrap:"wrap",marginBottom:28 }}>
            <div>
              <div style={{
                fontFamily:"'JetBrains Mono',monospace",
                fontSize:10,color:"#7c3aed",letterSpacing:4,
                textTransform:"uppercase",marginBottom:8,
              }}>
                SDE Prep Arsenal · Beyond DSA
              </div>
              <h1 style={{
                fontFamily:"'Syne',sans-serif",
                fontSize:"clamp(26px,4vw,40px)",fontWeight:800,
                color:"#f8fafc",lineHeight:1,margin:0,
                letterSpacing:"-1px",
              }}>
                Complete Interview{" "}
                <span style={{
                  background:"linear-gradient(135deg,#a855f7,#22d3ee)",
                  WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
                }}>
                  Tracker
                </span>
              </h1>
              <p style={{ fontSize:13,color:"#64748b",marginTop:8,fontFamily:"'JetBrains Mono',monospace" }}>
                OOPs · DBMS · SQL · OS · Networks · LLD · Aptitude · Behavioral
              </p>
            </div>

            {/* Big progress indicator */}
            <div style={{ marginLeft:"auto",textAlign:"right" }}>
              <div style={{
                fontFamily:"'Syne',sans-serif",
                fontSize:"clamp(36px,5vw,52px)",fontWeight:800,
                color:"#a855f7",lineHeight:1,
              }}>
                {doneItems}
                <span style={{ fontSize:"40%",color:"#334155" }}>/{totalItems}</span>
              </div>
              <div style={{ fontSize:11,color:"#475569",fontFamily:"'JetBrains Mono',monospace",marginTop:2 }}>
                TOPICS MASTERED
              </div>
              <div style={{
                marginTop:8,height:6,width:160,marginLeft:"auto",
                background:"rgba(255,255,255,.06)",borderRadius:99,overflow:"hidden",
              }}>
                <div style={{
                  height:"100%",borderRadius:99,
                  background:`linear-gradient(90deg,#7c3aed,#a855f7,#22d3ee)`,
                  width:`${pct}%`,transition:"width .5s ease",
                  boxShadow:"0 0 12px rgba(168,85,247,.6)",
                }}/>
              </div>
              <div style={{ fontSize:10,color:"#64748b",marginTop:4,fontFamily:"'JetBrains Mono',monospace" }}>
                {pct}% COMPLETE
              </div>
            </div>
          </div>

          {/* Subject mini stats */}
          <div style={{
            display:"flex",gap:8,flexWrap:"wrap",marginBottom:24,
          }}>
            {SUBJECTS.filter(s=>s.id!=="all").map(s => {
              const chaps = CHAPTERS.filter(c=>c.sub===s.id);
              const tot   = chaps.flatMap(c=>c.items).length;
              const dn    = chaps.flatMap(c=>c.items).filter(i=>done[i.id]).length;
              const sp    = tot ? Math.round(dn/tot*100) : 0;
              return (
                <button key={s.id} onClick={() => setSub(sub===s.id?"all":s.id)} className="tab-btn" style={{
                  padding:"6px 12px",borderRadius:8,border:`1px solid ${sub===s.id ? s.color+"60":"rgba(255,255,255,.07)"}`,
                  background: sub===s.id ? s.color+"15":"rgba(255,255,255,.02)",
                  color: sub===s.id ? s.color:"#64748b",
                  cursor:"pointer",fontSize:12,fontFamily:"'JetBrains Mono',monospace",
                  transition:"all .2s",
                }}>
                  {s.emoji} {s.label} <span style={{ color:s.color,fontWeight:700 }}>{dn}/{tot}</span>
                  {sp===100&&<span style={{ marginLeft:4 }}>✓</span>}
                </button>
              );
            })}
          </div>

          {/* Subject tab nav */}
          <div style={{ display:"flex",gap:0,overflowX:"auto",scrollbarWidth:"none" }}>
            {SUBJECTS.map(s => (
              <button key={s.id} onClick={() => setSub(s.id)} style={{
                flex:"0 0 auto",padding:"10px 18px",
                border:"none",background:"none",cursor:"pointer",
                fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,fontWeight:500,
                color: sub===s.id ? s.color:"#475569",
                borderBottom: sub===s.id ? `2px solid ${s.color}`:"2px solid transparent",
                transition:"all .2s",whiteSpace:"nowrap",
              }}>
                {s.emoji} {s.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── STICKY CONTROLS ── */}
      <div style={{
        position:"sticky",top:0,zIndex:50,
        background:"rgba(2,3,8,.92)",backdropFilter:"blur(20px)",
        borderBottom:"1px solid rgba(255,255,255,.06)",
        padding:"10px 32px",
      }}>
        <div style={{
          maxWidth:1280,margin:"0 auto",
          display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",
        }}>
          <div style={{ position:"relative",flex:"1 1 200px" }}>
            <span style={{ position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"#475569",fontSize:13 }}>🔍</span>
            <input
              value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Search topics…"
              style={{
                width:"100%",padding:"7px 12px 7px 34px",
                background:"rgba(255,255,255,.05)",
                border:"1px solid rgba(255,255,255,.1)",
                borderRadius:8,color:"#e2e8f0",fontSize:13,
                fontFamily:"'Plus Jakarta Sans',sans-serif",outline:"none",
              }}
            />
          </div>
          {["all","todo","done"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding:"7px 16px",borderRadius:8,cursor:"pointer",
              fontSize:12,fontFamily:"'JetBrains Mono',monospace",
              border:`1px solid ${filter===f?accent+"60":"rgba(255,255,255,.08)"}`,
              background: filter===f?accent+"15":"transparent",
              color: filter===f?accent:"#475569",
              transition:"all .2s",
            }}>
              {f==="all"?"ALL":f==="todo"?"TODO":"DONE"}
            </button>
          ))}
          <button onClick={() => {
            const ids = visible.map(c=>c.id);
            const allOpen = ids.every(id=>expanded[id]);
            const next = {}; ids.forEach(id => { next[id]=!allOpen; });
            setExpanded(p=>({...p,...next}));
          }} style={{
            padding:"7px 16px",borderRadius:8,cursor:"pointer",fontSize:12,
            fontFamily:"'JetBrains Mono',monospace",
            border:"1px solid rgba(255,255,255,.08)",background:"transparent",
            color:"#475569",transition:"all .2s",
          }}>
            {visible.every(c=>expanded[c.id])?"⊟ COLLAPSE":"⊞ EXPAND"}
          </button>
          <span style={{ marginLeft:"auto",fontSize:11,color:"#334155",fontFamily:"'JetBrains Mono',monospace" }}>
            {visible.length} chapters · {visible.reduce((a,c)=>a+c.items.length,0)} topics
          </span>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main style={{ maxWidth:1280,margin:"0 auto",padding:"28px 32px",position:"relative",zIndex:5 }}>

        {/* 7-Day Study Plan */}
        {sub==="all" && !search && filter==="all" && (
          <section style={{ marginBottom:36 }}>
            <div style={{
              fontFamily:"'JetBrains Mono',monospace",
              fontSize:10,color:"#7c3aed",letterSpacing:3,
              textTransform:"uppercase",marginBottom:14,
            }}>
              ⚡ Recommended Study Plan
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:10 }}>
              {PLAN.map((p,i) => {
                const subDone = p.subs.flatMap(s=>CHAPTERS.filter(c=>c.sub===s).flatMap(c=>c.items)).filter(it=>done[it.id]).length;
                const subTot  = p.subs.flatMap(s=>CHAPTERS.filter(c=>c.sub===s).flatMap(c=>c.items)).length;
                const cp = subTot ? Math.round(subDone/subTot*100) : 0;
                const complete = subTot>0 && cp===100;
                return (
                  <div key={i} className="card-hover" style={{
                    background: complete?"rgba(5,46,22,.6)":"rgba(255,255,255,.02)",
                    border:`1px solid ${complete?"rgba(74,222,128,.3)":"rgba(255,255,255,.07)"}`,
                    borderRadius:12,padding:"14px",
                  }}>
                    <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#475569",marginBottom:4 }}>{p.day}</div>
                    <div style={{ fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:complete?"#4ade80":"#e2e8f0",marginBottom:4 }}>{p.title}</div>
                    <div style={{ fontSize:11,color:"#475569",marginBottom:10,lineHeight:1.5 }}>{p.goal}</div>
                    {subTot>0 ? (
                      <div>
                        <div style={{ height:3,background:"rgba(255,255,255,.06)",borderRadius:99,overflow:"hidden",marginBottom:4 }}>
                          <div style={{
                            height:"100%",borderRadius:99,
                            background:complete?"#4ade80":"linear-gradient(90deg,#7c3aed,#a855f7)",
                            width:`${cp}%`,transition:"width .4s",
                          }}/>
                        </div>
                        <div style={{ fontSize:9,color:"#334155",fontFamily:"'JetBrains Mono',monospace" }}>{subDone}/{subTot} {complete&&"✓"}</div>
                      </div>
                    ) : (
                      <div style={{ fontSize:10,color:"#334155",fontFamily:"'JetBrains Mono',monospace" }}>ONGOING PRACTICE</div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Chapters */}
        {visible.length===0 ? (
          <div style={{
            textAlign:"center",padding:"80px 20px",
            color:"#334155",fontFamily:"'JetBrains Mono',monospace",fontSize:13,
          }}>
            NO TOPICS MATCH YOUR FILTERS
          </div>
        ) : (
          <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
            {visible.map(c => {
              const dn    = chDone(c);
              const tot   = c.items.length;
              const ppct  = tot ? Math.round((dn/tot)*100) : 0;
              const s     = subObj(c.sub);
              const open  = !!expanded[c.id];
              const resOpen = !!showRes[c.id];

              return (
                <div key={c.id} className="card-hover" style={{
                  background:"rgba(255,255,255,.02)",
                  border:`1px solid ${open?s.color+"30":"rgba(255,255,255,.07)"}`,
                  borderRadius:14,overflow:"hidden",
                }}>
                  {/* Chapter header */}
                  <div style={{ padding:"16px 20px",display:"flex",alignItems:"center",gap:14 }}>

                    {/* Number badge */}
                    <div style={{
                      flexShrink:0,width:38,height:38,borderRadius:10,
                      background:`linear-gradient(135deg,${s.color}22,${s.color}11)`,
                      border:`1px solid ${s.color}33`,
                      color:s.color,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontFamily:"'JetBrains Mono',monospace",fontSize:13,fontWeight:700,
                    }}>
                      {c.id}
                    </div>

                    {/* Title + desc */}
                    <div style={{ flex:1,minWidth:0 }}>
                      <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:5,flexWrap:"wrap" }}>
                        <span style={{
                          fontFamily:"'JetBrains Mono',monospace",
                          fontSize:9,padding:"2px 8px",borderRadius:99,
                          background:`${s.color}15`,color:s.color,
                          fontWeight:700,textTransform:"uppercase",letterSpacing:1,
                        }}>
                          {s.emoji} {s.label}
                        </span>
                        <span style={{ fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:"#f1f5f9" }}>
                          {c.name}
                        </span>
                      </div>
                      <p style={{ fontSize:12,color:"#475569",margin:0,marginBottom:6 }}>{c.desc}</p>
                      <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                        <div style={{ flex:1,height:3,background:"rgba(255,255,255,.06)",borderRadius:99,maxWidth:200 }}>
                          <div style={{
                            height:"100%",borderRadius:99,
                            background:ppct===100?"#4ade80":`linear-gradient(90deg,${s.color},${s.color}cc)`,
                            width:`${ppct}%`,transition:"width .4s",
                            boxShadow:ppct===100?"0 0 8px rgba(74,222,128,.5)":`0 0 8px ${s.glow}`,
                          }}/>
                        </div>
                        <span style={{
                          fontFamily:"'JetBrains Mono',monospace",fontSize:10,
                          color:ppct===100?"#4ade80":"#475569",
                        }}>
                          {dn}/{tot}{ppct===100&&" ✓"}
                        </span>
                      </div>
                    </div>

                    {/* Level chips */}
                    <div style={{ display:"flex",gap:4,flexShrink:0 }}>
                      {["F","M","A"].map(lv => {
                        const cnt = c.items.filter(i=>i.lv===lv).length;
                        return cnt>0?(
                          <span key={lv} style={{
                            fontSize:9,padding:"2px 7px",borderRadius:99,
                            background:LV[lv].bg,color:LV[lv].color,
                            fontFamily:"'JetBrains Mono',monospace",fontWeight:700,
                          }}>{cnt} {LV[lv].label}</span>
                        ):null;
                      })}
                    </div>

                    {/* Resources button */}
                    <button onClick={()=>toggleRes(c.id)} style={{
                      flexShrink:0,padding:"5px 10px",borderRadius:8,cursor:"pointer",
                      fontSize:10,fontFamily:"'JetBrains Mono',monospace",
                      border:`1px solid ${resOpen?"rgba(34,211,238,.4)":"rgba(255,255,255,.1)"}`,
                      background:resOpen?"rgba(34,211,238,.1)":"transparent",
                      color:resOpen?"#22d3ee":"#475569",transition:"all .2s",
                    }}>
                      📚 {resOpen?"HIDE":"RESOURCES"}
                    </button>

                    {/* Expand toggle */}
                    <button onClick={()=>toggleCh(c.id)} style={{
                      flexShrink:0,padding:"6px 10px",borderRadius:8,cursor:"pointer",
                      fontSize:12,border:`1px solid rgba(255,255,255,.08)`,
                      background:"transparent",color:"#475569",transition:"all .2s",
                    }}>
                      {open?"▾":"▸"}
                    </button>
                  </div>

                  {/* Resources panel */}
                  {resOpen && (
                    <div style={{
                      borderTop:"1px solid rgba(255,255,255,.05)",
                      padding:"12px 20px",
                      background:"rgba(34,211,238,.03)",
                      display:"flex",flexWrap:"wrap",gap:8,alignItems:"center",
                    }}>
                      <span style={{ fontSize:10,color:"#475569",fontFamily:"'JetBrains Mono',monospace",marginRight:4 }}>
                        RESOURCES:
                      </span>
                      {c.resources.map((r,i) => (
                        <a key={i} href={r.url} target="_blank" rel="noreferrer"
                          className="res-chip"
                          style={{
                            display:"inline-flex",alignItems:"center",gap:5,
                            padding:"5px 12px",borderRadius:99,
                            border:"1px solid rgba(255,255,255,.1)",
                            background:"rgba(255,255,255,.04)",
                            color:"#94a3b8",fontSize:11,
                            fontFamily:"'Plus Jakarta Sans',sans-serif",
                            textDecoration:"none",cursor:"pointer",transition:"all .2s",
                          }}
                        >
                          <span style={{ color:typeColor[r.type],fontSize:10 }}>{typeIcon[r.type]}</span>
                          {r.label}
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Items list */}
                  {open && (
                    <div style={{ borderTop:"1px solid rgba(255,255,255,.05)" }}>
                      {c.items.map((item,idx) => {
                        const isDone = !!done[item.id];
                        return (
                          <div key={item.id} className="item-row" onClick={()=>toggle(item.id)} style={{
                            display:"flex",alignItems:"center",gap:12,
                            padding:"11px 20px 11px 24px",cursor:"pointer",
                            borderBottom:idx<c.items.length-1?"1px solid rgba(255,255,255,.03)":"none",
                            background:isDone?"rgba(74,222,128,.04)":"transparent",
                            transition:"background .15s",
                          }}>
                            {/* Checkbox */}
                            <div className="check-box" style={{
                              width:18,height:18,borderRadius:5,flexShrink:0,
                              border:isDone?"none":"1px solid rgba(255,255,255,.15)",
                              background:isDone?s.color:"transparent",
                              display:"flex",alignItems:"center",justifyContent:"center",
                              transition:"all .2s",boxShadow:isDone?`0 0 8px ${s.glow}`:"none",
                            }}>
                              {isDone&&<span style={{ color:"#fff",fontSize:10,fontWeight:700 }}>✓</span>}
                            </div>

                            <span style={{
                              fontSize:10,color:"#334155",flexShrink:0,minWidth:22,
                              fontFamily:"'JetBrains Mono',monospace",
                            }}>
                              {idx+1}.
                            </span>

                            <span style={{
                              flex:1,fontSize:13,lineHeight:1.5,
                              color:isDone?"#4ade80":"#cbd5e1",
                              textDecorationLine:isDone?"line-through":"none",
                              textDecorationColor:isDone?"rgba(74,222,128,.4)":"transparent",
                            }}>
                              {item.text}
                            </span>

                            <span style={{
                              fontSize:9,padding:"2px 8px",borderRadius:99,flexShrink:0,
                              background:LV[item.lv].bg,color:LV[item.lv].color,
                              fontFamily:"'JetBrains Mono',monospace",fontWeight:700,
                            }}>
                              {LV[item.lv].label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop:"1px solid rgba(255,255,255,.05)",
        padding:"28px 32px",marginTop:40,position:"relative",zIndex:5,
        background:"rgba(2,3,8,.8)",backdropFilter:"blur(20px)",
      }}>
        <div style={{ maxWidth:1280,margin:"0 auto",display:"flex",flexWrap:"wrap",gap:16,alignItems:"center" }}>
          <div>
            <div style={{
              fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,
              color:"#a855f7",marginBottom:4,
            }}>
              SDE Prep Arsenal
            </div>
            <div style={{ fontSize:11,color:"#334155",fontFamily:"'JetBrains Mono',monospace" }}>
              {totalItems} topics · 9 subjects · Fresher-optimised · Built by Manjeet Singh
            </div>
          </div>
          <div style={{ marginLeft:"auto",display:"flex",gap:12,flexWrap:"wrap" }}>
            {["▶ Video","📖 Article","⚡ Practice"].map((t,i) => (
              <span key={i} style={{ fontSize:11,color:"#475569",fontFamily:"'JetBrains Mono',monospace" }}>{t}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}