"use client";
import { useState } from "react";

const G = {
  page: { minHeight:"100vh", background:"linear-gradient(135deg,#0f0c29,#1a1a3e,#0d2137)", padding:"32px 16px", fontFamily:"'Segoe UI',system-ui,sans-serif" },
  glass: { background:"rgba(255,255,255,0.05)", backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:"16px", padding:"22px" },
  card: { background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"12px", padding:"16px 18px", marginBottom:"14px" },
  code: { background:"rgba(0,0,0,0.45)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"10px", padding:"14px 16px", fontFamily:"'Cascadia Code','Fira Code',monospace", fontSize:"12.5px", lineHeight:"1.9", color:"#e2e8f0", whiteSpace:"pre", overflowX:"auto", margin:"10px 0" },
  h2: { fontSize:"15px", fontWeight:600, color:"#f1f5f9", marginBottom:"12px", display:"flex", alignItems:"center", gap:"8px" },
  body: { fontSize:"13.5px", color:"#cbd5e1", lineHeight:"1.8", marginBottom:"10px" },
  tag: (c) => ({ fontSize:"11px", fontWeight:700, padding:"3px 10px", borderRadius:"5px", ...TC[c] }),
  pill: (a) => ({ padding:"7px 16px", borderRadius:"20px", fontSize:"12.5px", fontWeight:500, cursor:"pointer", border: a?"1px solid rgba(20,184,166,0.7)":"1px solid rgba(255,255,255,0.1)", background: a?"rgba(20,184,166,0.2)":"rgba(255,255,255,0.04)", color: a?"#5eead4":"#94a3b8", transition:"all 0.2s", whiteSpace:"nowrap" }),
  highlight: { background:"rgba(20,184,166,0.12)", border:"1px solid rgba(20,184,166,0.3)", borderRadius:"8px", padding:"11px 14px", margin:"10px 0", fontSize:"13px", color:"#5eead4", lineHeight:"1.7" },
  warn: { background:"rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.3)", borderRadius:"8px", padding:"11px 14px", margin:"10px 0", fontSize:"13px", color:"#fcd34d", lineHeight:"1.7" },
  success: { background:"rgba(34,197,94,0.1)", border:"1px solid rgba(34,197,94,0.3)", borderRadius:"8px", padding:"11px 14px", margin:"10px 0", fontSize:"13px", color:"#86efac", lineHeight:"1.7" },
  danger: { background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.3)", borderRadius:"8px", padding:"11px 14px", margin:"10px 0", fontSize:"13px", color:"#fca5a5", lineHeight:"1.7" },
};
const TC = {
  blue:   { background:"rgba(59,130,246,0.2)",  color:"#93c5fd", border:"1px solid rgba(59,130,246,0.3)"  },
  green:  { background:"rgba(34,197,94,0.2)",   color:"#86efac", border:"1px solid rgba(34,197,94,0.3)"   },
  amber:  { background:"rgba(245,158,11,0.2)",  color:"#fcd34d", border:"1px solid rgba(245,158,11,0.3)"  },
  red:    { background:"rgba(239,68,68,0.2)",   color:"#fca5a5", border:"1px solid rgba(239,68,68,0.3)"   },
  purple: { background:"rgba(139,92,246,0.2)",  color:"#c4b5fd", border:"1px solid rgba(139,92,246,0.3)"  },
  teal:   { background:"rgba(20,184,166,0.2)",  color:"#5eead4", border:"1px solid rgba(20,184,166,0.3)"  },
  pink:   { background:"rgba(236,72,153,0.2)",  color:"#f9a8d4", border:"1px solid rgba(236,72,153,0.3)"  },
};
const S = ({ title, tag, tc, children }) => (
  <div style={G.card}>
    <div style={G.h2}>{tag&&<span style={G.tag(tc||"teal")}>{tag}</span>}{title}</div>
    {children}
  </div>
);
const OPRow = ({ name, comp }) => {
  const c = comp==="O(1)"?"green":comp==="O(n)"?"amber":"red";
  return <div style={{display:"flex",alignItems:"center",padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,0.05)",fontSize:"13px"}}>
    <span style={{flex:1,color:"#e2e8f0"}}>{name}</span>
    <span style={G.tag(c)}>{comp}</span>
  </div>;
};

const Basics = () => (
  <div>
    <S title="What Is a Linked List & Why It Exists" tag="Fundamentals" tc="teal">
      <p style={G.body}>Arrays store elements in contiguous memory — this gives O(1) random access but makes insertions/deletions at the front or middle expensive (O(n) shifts). Linked Lists solve this: each element (node) stores a pointer to the next, so insertion/deletion at the head is always O(1). The trade-off: no random access — you must traverse from the beginning.</p>
      <div style={G.code}>{`// ARRAY — contiguous memory
[10][20][30][40][50]
  ↑   ↑   ↑   ↑   ↑
1000 1004 1008 1012 1016  (addresses)
→ arr[3] = address(1000 + 3×4) = 1012  O(1)!

// LINKED LIST — scattered memory
10 → 20 → 30 → 40 → 50 → null
↑    ↑    ↑    ↑    ↑
1000 2A40 00F8 3B10 1E50  (random addresses)
→ To get node 3: must follow 0→1→2→3  O(n)!

// Insert 5 at HEAD:
// Array:    shift ALL elements right  O(n) ❌
// LL:       newNode.next = head; head = newNode  O(1) ✅`}</div>
    </S>
    <S title="Node Structure in Java" tag="Node" tc="blue">
      <div style={G.code}>{`// Singly Linked List Node
class ListNode {
    int val;           // the data stored
    ListNode next;     // pointer to next node (null if last)

    ListNode(int val) {
        this.val = val;
        this.next = null; // Java initializes to null by default too
    }
}

// Doubly Linked List Node
class DListNode {
    int val;
    DListNode next;   // forward pointer
    DListNode prev;   // backward pointer — extra memory cost!

    DListNode(int val) { this.val = val; }
}

// How nodes connect:
ListNode a = new ListNode(1); // val=1, next=null
ListNode b = new ListNode(2); // val=2, next=null
ListNode c = new ListNode(3); // val=3, next=null
a.next = b;  // 1 → 2
b.next = c;  // 1 → 2 → 3
// head = a   (entry point to the list)`}</div>
    </S>
    <S title="How Memory Looks — Reality vs Diagram" tag="Memory Model" tc="purple">
      <div style={G.code}>{`// What we DRAW (logical view):
head
 ↓
[1] → [2] → [3] → [4] → null

// What ACTUALLY exists in heap memory:
┌──────────────┐     ┌──────────────┐
│ address:0x100│     │ address:0x2A4│
│ val  = 1     │     │ val  = 2     │
│ next = 0x2A4 │────►│ next = 0x5F1 │
└──────────────┘     └──────────────┘
                           │
                           ▼
                     ┌──────────────┐
                     │ address:0x5F1│
                     │ val  = 3     │
                     │ next = null  │
                     └──────────────┘

// Key point: nodes are scattered RANDOMLY in heap memory.
// The ONLY way to reach node 3 is:
// start at head(0x100) → follow next → 0x2A4 → follow next → 0x5F1`}</div>
    </S>
    <S title="Building a Linked List from Array" tag="Code Pattern" tc="green">
      <div style={G.code}>{`// Pattern you'll use in EVERY linked list problem setup:
int[] arr = {1, 2, 3, 4, 5};

ListNode head = new ListNode(arr[0]);
ListNode curr = head;  // curr = traveling pointer
for (int i = 1; i < arr.length; i++) {
    curr.next = new ListNode(arr[i]);
    curr = curr.next;  // advance curr
}
// Result: 1 → 2 → 3 → 4 → 5 → null

// PRINT a linked list (always use separate pointer!):
ListNode temp = head;  // NEVER use head directly!
while (temp != null) {
    System.out.print(temp.val + " → ");
    temp = temp.next;
}
System.out.println("null");`}</div>
    </S>
  </div>
);

const Types = () => (
  <div>
    <S title="Type 1 — Singly Linked List" tag="Most Common" tc="teal">
      <p style={G.body}>Each node has exactly one pointer: next. Traversal is one-directional (forward only). This is the most common type in interviews.</p>
      <div style={G.code}>{`head
 ↓
[1] → [2] → [3] → [4] → [5] → null

Properties:
→ One pointer per node (next)
→ Forward traversal ONLY
→ To delete a node, need the PREVIOUS node
→ Extra memory: 1 pointer per node

Use cases:
→ Implementing stacks
→ Hash chaining in HashMaps
→ 90% of interview problems`}</div>
    </S>
    <S title="Type 2 — Doubly Linked List" tag="Bidirectional" tc="blue">
      <p style={G.body}>Each node has two pointers: next AND prev. Can traverse in both directions. Deletion of a given node is O(1) since you can access the previous node directly.</p>
      <div style={G.code}>{`       head                         tail
        ↓                             ↓
null ← [1] ⇄ [2] ⇄ [3] ⇄ [4] ⇄ [5] → null

// Doubly LL node:
class DNode {
    int val;
    DNode next, prev;
}

Key advantages over Singly LL:
→ Traverse backward: curr = curr.prev
→ Delete node in O(1) given the node reference:
    node.prev.next = node.next;
    node.next.prev = node.prev;
  (No need to find previous node separately!)

Real-world uses:
→ LRU Cache (move node to front in O(1))
→ Browser history (back/forward navigation)
→ Undo/redo functionality
→ Java's java.util.LinkedList is doubly linked!`}</div>
    </S>
    <S title="Type 3 — Circular Linked List" tag="No null end" tc="amber">
      <p style={G.body}>Last node's next points back to the head instead of null. There is no null termination. Used in problems about cycles and round-robin scheduling.</p>
      <div style={G.code}>{`  ┌────────────────────────────┐
  ↓                            │
[1] → [2] → [3] → [4] → [5] ──┘

// Key difference from normal LL:
// Normal:   tail.next == null
// Circular: tail.next == head

// Traversal must use a visited check or count:
ListNode curr = head;
do {
    System.out.println(curr.val);
    curr = curr.next;
} while (curr != head); // stop when we loop back

Real-world uses:
→ Operating system round-robin CPU scheduling
→ Multiplayer board games (player turns)
→ Basis for cycle detection interview problems`}</div>
    </S>
    <S title="Type 4 — Circular Doubly LL" tag="Most Complex" tc="purple">
      <div style={G.code}>{`// Both circular AND doubly linked:
  ┌─────────────────────────────────────┐
  ↕                                     ↕
[1] ⇄ [2] ⇄ [3] ⇄ [4] ⇄ [5] ← head.prev

→ Prev of head = tail
→ Next of tail = head
→ Most flexible but most complex

Used in:
→ Java's internal LinkedList structure
→ Fibonacci heap
→ OS process scheduling with priority`}</div>
    </S>
  </div>
);

const Operations = () => (
  <div>
    <S title="All Operations — Complexity Reference" tag="Big O" tc="green">
      <OPRow name="Access node at index i" comp="O(n)" />
      <OPRow name="Search for a value" comp="O(n)" />
      <OPRow name="Insert at HEAD" comp="O(1)" />
      <OPRow name="Insert at TAIL (tail pointer exists)" comp="O(1)" />
      <OPRow name="Insert at TAIL (no tail pointer)" comp="O(n)" />
      <OPRow name="Insert in MIDDLE (after finding position)" comp="O(1)" />
      <OPRow name="Delete at HEAD" comp="O(1)" />
      <OPRow name="Delete at TAIL (singly LL)" comp="O(n)" />
      <OPRow name="Delete at TAIL (doubly LL)" comp="O(1)" />
      <OPRow name="Delete given node reference (doubly LL)" comp="O(1)" />
    </S>
    <S title="Insert at HEAD — Order Matters!" tag="Insert" tc="blue">
      <div style={G.code}>{`// Goal: insert value 0 before head
// BEFORE: head → [1] → [2] → [3]
// AFTER:  head → [0] → [1] → [2] → [3]

// CORRECT ORDER — must link first, then update head!
ListNode newNode = new ListNode(0);
newNode.next = head;  // step 1: new node points to old head
head = newNode;       // step 2: head now points to new node ✅

// WRONG ORDER — disaster!
head = newNode;       // ❌ head now points to new node
newNode.next = head;  // ❌ head IS newNode, so newNode.next = newNode!
                      //    circular reference! lost old list!`}</div>
    </S>
    <S title="Delete a Node — Need Previous!" tag="Delete" tc="red">
      <div style={G.code}>{`// Delete node with val=3
// BEFORE: 1 → 2 → 3 → 4 → null
// AFTER:  1 → 2 → 4 → null

// Pattern: maintain prev pointer, skip the target node
ListNode prev = null, curr = head;
while (curr != null) {
    if (curr.val == 3) {
        if (prev == null) head = curr.next; // deleting head!
        else              prev.next = curr.next; // skip curr
        break;
    }
    prev = curr;
    curr = curr.next;
}
// Time: O(n) to find node  |  Space: O(1)

// IMPORTANT: You CANNOT delete a singly LL node
// given only that node's reference!
// (Java interview trick: copy next node's data, delete next)
void deleteNode(ListNode node) {
    node.val  = node.next.val;   // copy next value here
    node.next = node.next.next;  // skip next node
    // Effectively "deleted" this node by overwriting it!
}`}</div>
    </S>
    <S title="Traversal — Never Move head!" tag="Core Rule" tc="amber">
      <div style={G.code}>{`// ALWAYS create a separate pointer for traversal!
ListNode curr = head;      // curr is a COPY of the reference
while (curr != null) {
    System.out.println(curr.val);
    curr = curr.next;      // move curr, NOT head
}
// head is still pointing to first node ✅

// NEVER do this:
while (head != null) {
    System.out.println(head.val);
    head = head.next;      // ❌ you just lost your list forever!
}
// head is now null — can never access the list again!

// WHY is this a rule?
// ListNode head = ... means head holds a REFERENCE (memory address)
// Moving head changes what it points to — permanently!
// curr = head copies the reference — modifying curr doesn't affect head`}</div>
    </S>
  </div>
);

const JavaCode = () => (
  <div>
    <S title="5 Essential Code Templates" tag="Must Know" tc="teal">
      <div style={G.code}>{`// 1. TRAVERSE — never touch head
ListNode curr = head;
while (curr != null) { curr = curr.next; }

// 2. FIND LENGTH — count while traversing
int len = 0;
ListNode curr = head;
while (curr != null) { len++; curr = curr.next; }

// 3. FIND MIDDLE — fast & slow
ListNode slow = head, fast = head;
while (fast != null && fast.next != null) {
    slow = slow.next;       // 1 step
    fast = fast.next.next;  // 2 steps
}
// When fast hits end, slow is at middle!
// [1,2,3,4,5] → slow stops at 3 ✅
// [1,2,3,4]   → slow stops at 2 (first middle) ✅

// 4. Nth FROM END — gap trick
ListNode fast = head, slow = head;
for (int i = 0; i < n; i++) fast = fast.next; // create n gap
while (fast != null) { slow = slow.next; fast = fast.next; }
// slow is now at Nth from end!
// [1,2,3,4,5], n=2: slow stops at 4 ✅

// 5. DUMMY NODE — eliminates head edge cases
ListNode dummy = new ListNode(-1);
dummy.next = head;
ListNode curr = dummy;
// ... all operations on curr ...
return dummy.next; // return new head safely`}</div>
    </S>
    <S title="Dummy Node Pattern — Why It's Critical" tag="Game Changer" tc="purple">
      <p style={G.body}>The dummy node pattern is the #1 technique for avoiding edge cases in linked list problems. When the head of the list might change (deletion of head, insertion before head), using a dummy node means you always have a stable "previous" node.</p>
      <div style={G.code}>{`// Problem: Remove all nodes with val = 1
// Input:  1 → 1 → 2 → 3 → 1 → null
// Output: 2 → 3 → null

// WITHOUT dummy — messy head edge case:
while (head != null && head.val == 1) head = head.next; // handle head manually
ListNode curr = head;
while (curr != null && curr.next != null) {
    if (curr.next.val == 1) curr.next = curr.next.next;
    else curr = curr.next;
}
// Ugly — different logic for head vs rest!

// WITH dummy — clean, uniform:
ListNode dummy = new ListNode(-1);
dummy.next = head;
ListNode curr = dummy;

while (curr.next != null) {
    if (curr.next.val == 1) {
        curr.next = curr.next.next; // delete node
    } else {
        curr = curr.next;           // move forward
    }
}
return dummy.next; // new head (dummy.next handles head deletion!)
// Same logic throughout — no special head handling!`}</div>
      <div style={G.highlight}>Rule: If head itself might be deleted or changed, use a dummy node. The dummy acts as a "fake head" that never gets deleted, so dummy.next is always the correct return value.</div>
    </S>
  </div>
);

const LLvsArray = () => (
  <div>
    <S title="Head-to-Head Comparison" tag="LL vs Array" tc="teal">
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"14px" }}>
        {[
          ["Array","#93c5fd",[
            "Access arr[i]: O(1)","Search unsorted: O(n)",
            "Insert at head: O(n) shift","Insert at tail: O(1) amortized",
            "Delete at head: O(n) shift","Memory: contiguous blocks",
            "Cache friendly: YES ✅","Random access: YES ✅",
            "Size fixed or resize costly","No pointer overhead",
          ]],
          ["Linked List","#5eead4",[
            "Access node i: O(n)","Search: O(n)",
            "Insert at head: O(1) ✅","Insert at tail: O(1) w/tail ptr",
            "Delete at head: O(1) ✅","Memory: scattered heap",
            "Cache friendly: NO ❌","Random access: NO ❌",
            "Size always dynamic ✅","Extra: 1-2 pointers per node",
          ]],
        ].map(([title,color,items])=>(
          <div key={title} style={{ background:"rgba(0,0,0,0.2)", borderRadius:"10px", padding:"12px" }}>
            <div style={{ fontSize:"14px", fontWeight:600, color, marginBottom:"10px" }}>{title}</div>
            {items.map((item,i)=>(
              <div key={i} style={{ fontSize:"12px", color:"#94a3b8", padding:"4px 0", borderBottom:"1px solid rgba(255,255,255,0.05)", lineHeight:"1.5" }}>{item}</div>
            ))}
          </div>
        ))}
      </div>
      <div style={G.highlight}>
        Choose Array when: frequent index access, iteration with cache, known size, math on indices<br/>
        Choose LL when: frequent head insertions/deletions, unknown/dynamic size, implementing stacks/queues
      </div>
    </S>
    <S title="When Arrays Beat Linked Lists (Often!)" tag="Reality Check" tc="amber">
      <div style={G.code}>{`// Surprise: Arrays are often FASTER in practice even for
// operations where LL has better Big-O!

// WHY? CPU Cache Lines
// Array: elements sit next to each other in memory
//   → accessing arr[i] likely loads arr[i+1..i+7] into cache too
//   → next access = cache HIT = extremely fast

// LL: nodes scattered across heap
//   → accessing node[i] doesn't help with node[i+1]
//   → next access = likely cache MISS = slow memory fetch

// Example: iterating through 10,000 elements
// Array LL traversal: ~2x faster due to cache effects!
// Even though both are O(n), constant factors differ massively.

// Interview tip: mention cache locality when comparing structures!`}</div>
    </S>
  </div>
);

const Pattern8 = () => (
  <div>
    <S title="Fast & Slow — Floyd's Tortoise and Hare" tag="Pattern 8" tc="teal">
      <p style={G.body}>Two pointers moving at different speeds through the linked list. Slow moves 1 step, fast moves 2 steps. The mathematical guarantee: if there is a cycle, the fast pointer will eventually lap the slow pointer — they MUST meet inside the cycle.</p>
      <div style={G.code}>{`// In a cycle of length L:
// Each round: fast gains 1 step on slow
// After at most L rounds: fast catches up to slow completely
// They will meet! ✅

// No cycle:
// fast will reach null before meeting slow
// null check terminates loop ✅

// The template (memorize this):
ListNode slow = head, fast = head;
while (fast != null && fast.next != null) {
    slow = slow.next;          // 1 step
    fast = fast.next.next;     // 2 steps
    // ... use slow and fast here ...
}
// Check: fast != null AND fast.next != null — BOTH required!
// fast.next.next fails if fast.next is null → NullPointerException!`}</div>
    </S>
    <S title="Cycle Detection — Full Dry Run" tag="LC #141" tc="blue">
      <div style={G.code}>{`// List: 1 → 2 → 3 → 4 → 5 → (back to 3)
//                     ↑___________↑  (cycle!)

// Initial: slow=1, fast=1

Step 1: slow=2(next of 1),    fast=3(next.next of 1)
Step 2: slow=3(next of 2),    fast=5(next.next of 3)
Step 3: slow=4(next of 3),    fast=4(next.next of 5 in cycle)
// slow==fast → CYCLE DETECTED! ✅

public boolean hasCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;  // reference equality!
    }
    return false;
}
// WRONG: if (slow.val == fast.val) ← values can coincidentally be equal!
// CORRECT: if (slow == fast)       ← same NODE in memory!`}</div>
      <div style={G.danger}>Never compare slow.val == fast.val for cycle detection. Two different nodes can have the same value. You must compare slow == fast (same reference = same memory address = same node).</div>
    </S>
    <S title="Find Middle — Dry Run Both Cases" tag="LC #876" tc="green">
      <div style={G.code}>{`// Odd length: [1, 2, 3, 4, 5]
// Initial: slow=1, fast=1
// Step 1:  slow=2, fast=3
// Step 2:  slow=3, fast=5  ← fast.next=null → STOP
// slow = 3 = middle ✅

// Even length: [1, 2, 3, 4]
// Initial: slow=1, fast=1
// Step 1:  slow=2, fast=3
// Step 2:  slow=3, fast=null (fast goes past end)
// Wait! fast=5, fast.next=null:
// Actually [1,2,3,4]:
// Step 1: slow=2, fast=3
// Step 2: slow=3, fast=null(fast was 3, fast.next=4, fast.next.next=null)
// Wait let me redo:
// fast starts at 1, fast.next=2, fast.next.next=3
// Step1: slow=2, fast=3
// fast=3, fast.next=4, fast.next.next=null → STOP
// slow = 2 = first middle ✅ (for even: first of two middles)

public ListNode findMiddle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}
// Note: for palindrome problems you often want the second middle
// → modify: while (fast.next != null && fast.next.next != null)`}</div>
    </S>
    <S title="Find Cycle Start — The Math Trick" tag="LC #142 Hard" tc="purple">
      <p style={G.body}>After detecting a cycle (slow == fast at meeting point), reset one pointer to head. Move both one step at a time. They will meet at the cycle start. This is based on a mathematical proof.</p>
      <div style={G.code}>{`// The Math (you don't need to derive this, just remember it!):
// Let:  a = distance from head to cycle start
//       b = distance from cycle start to meeting point
//       c = cycle length
//
// When they meet:
//   slow traveled: a + b
//   fast traveled: a + b + c  (fast did one full loop more)
//   fast = 2 × slow: a + b + c = 2(a + b)
//   → c = a + b
//   → a = c - b  (distance remaining in cycle back to start!)
//
// So: resetting slow to head and moving both 1 step at a time
//     → slow travels a steps
//     → fast travels a steps from meeting point = c-b = a steps to start
//     They meet at cycle start! ✅

public ListNode detectCycleStart(ListNode head) {
    ListNode slow = head, fast = head;

    // Phase 1: detect meeting point
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) break;
    }
    if (fast == null || fast.next == null) return null; // no cycle

    // Phase 2: find start — reset slow, keep fast at meeting point
    slow = head;
    while (slow != fast) {
        slow = slow.next;  // 1 step
        fast = fast.next;  // 1 step (NOT 2 anymore!)
    }
    return slow; // cycle start!
}`}</div>
      <div style={G.warn}>In Phase 2, fast moves 1 step (not 2). This is the most common mistake. Fast must move at the same speed as slow in Phase 2.</div>
    </S>
    <S title="Find Duplicate Number (Array as LL)" tag="LC #287 Clever" tc="pink">
      <div style={G.code}>{`// nums = [1,3,4,2,2] — find the duplicate!
// INSIGHT: treat values as "next pointers"!
// index 0 → go to index nums[0] = index 1
// index 1 → go to index nums[1] = index 3
// index 3 → go to index nums[3] = index 2
// index 2 → go to index nums[2] = index 4
// index 4 → go to index nums[4] = index 2 ← CYCLE! (duplicate = 2)

// Now apply Floyd's cycle detection on this "linked list":
public int findDuplicate(int[] nums) {
    int slow = nums[0], fast = nums[0];

    // Phase 1: find meeting point
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow != fast);

    // Phase 2: find cycle start = duplicate number
    slow = nums[0];
    while (slow != fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    return slow;
}
// Time: O(n)  |  Space: O(1) — no extra array needed!`}</div>
    </S>
  </div>
);

const Pattern9 = () => (
  <div>
    <S title="Reversal — The 3-Pointer Technique" tag="Pattern 9" tc="teal">
      <p style={G.body}>Reversing a linked list requires three pointers: prev, curr, and next. At each step: save curr.next (or you'll lose the rest of the list), reverse the link (curr.next = prev), then advance both pointers. The order of these steps is critical.</p>
      <div style={G.code}>{`// Reverse: 1 → 2 → 3 → 4 → 5 → null
//    Into: null ← 1 ← 2 ← 3 ← 4 ← 5

// 3 pointers: prev=null, curr=head, next=?
// At each node: (1) save next (2) reverse link (3) advance

public ListNode reverse(ListNode head) {
    ListNode prev = null, curr = head;
    while (curr != null) {
        ListNode next = curr.next;  // step 1: SAVE next (critical!)
        curr.next = prev;           // step 2: REVERSE the link
        prev = curr;                // step 3: advance prev
        curr = next;                // step 4: advance curr
    }
    return prev; // prev is now the new head!
}`}</div>
    </S>
    <S title="Reversal Dry Run — Step by Step" tag="Visual" tc="blue">
      <div style={G.code}>{`Input: 1 → 2 → 3 → null

Initial: prev=null, curr=[1]

Iteration 1:
  next = curr.next = [2]
  curr.next = prev = null     →  null ← [1]  [2] → [3] → null
  prev = curr = [1]
  curr = next = [2]

Iteration 2:
  next = curr.next = [3]
  curr.next = prev = [1]      →  null ← [1] ← [2]  [3] → null
  prev = curr = [2]
  curr = next = [3]

Iteration 3:
  next = curr.next = null
  curr.next = prev = [2]      →  null ← [1] ← [2] ← [3]
  prev = curr = [3]
  curr = next = null

Loop ends (curr == null)
return prev = [3]  ← new head ✅

Result: 3 → 2 → 1 → null ✅`}</div>
    </S>
    <S title="Reverse in K Groups" tag="LC #25 Hard" tc="purple">
      <div style={G.code}>{`// Input: 1→2→3→4→5, k=2
// Output: 2→1→4→3→5

// Strategy: reverse k nodes at a time, connect groups
public ListNode reverseKGroup(ListNode head, int k) {
    // Check if k nodes exist from current position
    ListNode check = head;
    int count = 0;
    while (check != null && count < k) { check = check.next; count++; }
    if (count < k) return head; // less than k nodes left — don't reverse

    // Reverse k nodes
    ListNode prev=null, curr=head;
    for (int i=0; i<k; i++) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    // After reversal: prev = new head of this group
    //                 head = last node of this group (originally first)
    //                 curr = start of next group

    // Recursively reverse next group and connect
    head.next = reverseKGroup(curr, k);
    return prev;
}

// Dry run: [1,2,3,4,5], k=2
// Group 1 [1,2] → reversed [2,1], head(1).next = reverseK([3,4,5])
// Group 2 [3,4] → reversed [4,3], head(3).next = reverseK([5])
// [5]: only 1 node < k=2 → return as-is
// Final: 2→1→4→3→5 ✅`}</div>
    </S>
    <S title="Palindrome Check — Reverse Half" tag="Classic" tc="amber">
      <div style={G.code}>{`// Input: 1 → 2 → 2 → 1  → true
// Input: 1 → 2 → 3     → false

// 4-step approach:
public boolean isPalindrome(ListNode head) {
    // Step 1: Find middle
    ListNode slow=head, fast=head;
    while (fast!=null && fast.next!=null) {
        slow=slow.next; fast=fast.next.next;
    }

    // Step 2: Reverse second half (slow = start of second half)
    ListNode prev=null, curr=slow;
    while (curr!=null) {
        ListNode next=curr.next;
        curr.next=prev;
        prev=curr; curr=next;
    }
    // prev = head of reversed second half

    // Step 3: Compare first and second half
    ListNode left=head, right=prev;
    while (right!=null) { // right (shorter) determines loop
        if (left.val != right.val) return false;
        left=left.next; right=right.next;
    }

    // Step 4 (optional): restore list (good practice in interviews)
    return true;
}
// Dry run: 1→2→2→1
// Middle: slow stops at second '2'
// Reverse [2,1]: prev = 1→2→null
// Compare: left=1,right=1 ✅  left=2,right=2 ✅ → true`}</div>
    </S>
  </div>
);

const Pattern10 = () => (
  <div>
    <S title="Merge Two Sorted Lists — Dummy Node" tag="Pattern 10" tc="teal">
      <p style={G.body}>Classic merge from merge sort. Use a dummy node to avoid head edge cases. Compare heads of both lists, always pick the smaller, advance that list's pointer.</p>
      <div style={G.code}>{`// l1: 1→2→4  l2: 1→3→4
// Output: 1→1→2→3→4→4

public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(-1); // fake head
    ListNode curr  = dummy;

    while (l1 != null && l2 != null) {
        if (l1.val <= l2.val) {
            curr.next = l1;
            l1 = l1.next;
        } else {
            curr.next = l2;
            l2 = l2.next;
        }
        curr = curr.next;
    }
    // Attach remaining list (at most one is non-null)
    curr.next = (l1 != null) ? l1 : l2;

    return dummy.next; // real head
}

// Dry run: l1=[1,2,4], l2=[1,3,4]
// curr=dummy
// l1.val(1)<=l2.val(1): link l1=1, l1→[2,4], curr→[1]
// l1.val(2)>l2.val(1):  link l2=1, l2→[3,4], curr→[1]
// l1.val(2)<=l2.val(3): link l1=2, l1→[4],   curr→[2]
// l1.val(4)>l2.val(3):  link l2=3, l2→[4],   curr→[3]
// l1.val(4)<=l2.val(4): link l1=4, l1=null,  curr→[4]
// l1 null: attach l2=[4]
// Result: 1→1→2→3→4→4 ✅`}</div>
    </S>
    <S title="Merge K Sorted Lists — Min-Heap" tag="LC #23 Hard" tc="red">
      <div style={G.code}>{`// lists = [[1,4,5],[1,3,4],[2,6]]
// Output: 1→1→2→3→4→4→5→6

// NAIVE: merge two at a time → O(kN) where N=total nodes
// OPTIMAL: use Min-Heap → O(N log k)

public ListNode mergeKLists(ListNode[] lists) {
    // PriorityQueue sorted by node value (min-heap)
    PriorityQueue<ListNode> pq =
        new PriorityQueue<>((a,b) -> a.val - b.val);

    // Add head of each list
    for (ListNode node : lists)
        if (node != null) pq.add(node);

    ListNode dummy = new ListNode(-1), curr = dummy;
    while (!pq.isEmpty()) {
        ListNode node = pq.poll();   // extract minimum
        curr.next = node;
        curr = curr.next;
        if (node.next != null) pq.add(node.next); // add next from same list
    }
    return dummy.next;
}
// WHY O(N log k)?
// N total nodes, each inserted/removed from heap once
// Each heap operation = O(log k)  (k = number of lists)
// Total = O(N log k) ✅`}</div>
    </S>
    <S title="Add Two Numbers (LL as Numbers)" tag="Classic" tc="purple">
      <div style={G.code}>{`// l1=[2,4,3] represents 342  (stored in reverse!)
// l2=[5,6,4] represents 465
// Output: [7,0,8] representing 807  (342+465=807)

public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    ListNode dummy=new ListNode(0), curr=dummy;
    int carry=0;

    while (l1!=null || l2!=null || carry!=0) {
        int sum = carry;
        if (l1!=null) { sum+=l1.val; l1=l1.next; }
        if (l2!=null) { sum+=l2.val; l2=l2.next; }

        carry = sum/10;               // carry for next digit
        curr.next = new ListNode(sum%10); // current digit
        curr = curr.next;
    }
    return dummy.next;
}
// carry!=0 in while condition handles final carry:
// e.g. 99+1=100 → last iteration creates the '1' node`}</div>
    </S>
  </div>
);

const InterviewTricks = () => (
  <div>
    <S title="7 Golden Rules — Never Forget" tag="Rules" tc="teal">
      {[
        ["Never move head — always use curr = head","red","Moving head permanently loses your list. curr is a copy of the reference."],
        ["Dummy node when head might change","purple","Insert before head, delete head, merge lists — all use dummy to avoid edge cases."],
        ["Always: fast!=null AND fast.next!=null","amber","fast.next.next crashes if fast.next is null. Both checks are mandatory."],
        ["Draw 3-4 nodes + arrows on paper first","teal","LL problems are purely visual. Drawing eliminates pointer confusion."],
        ["slow==fast compares references, not values","red","Different nodes can hold equal values. You want same memory address."],
        ["Test on odd-length AND even-length lists","blue","Middle, palindrome, reverse — all behave differently for odd vs even."],
        ["To delete curr you need prev — maintain it","green","Singly LL has no backward pointer. Always track previous node."],
      ].map(([rule,c,detail],i)=>(
        <div key={i} style={{ padding:"10px 0", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"4px" }}>
            <span style={{ ...G.tag(c), fontSize:"10px", padding:"2px 6px" }}>{i+1}</span>
            <span style={{ fontSize:"13px", fontWeight:500, color:"#f1f5f9", fontFamily:"monospace" }}>{rule}</span>
          </div>
          <p style={{ fontSize:"12.5px", color:"#64748b", lineHeight:"1.6", marginLeft:"28px" }}>{detail}</p>
        </div>
      ))}
    </S>
    <S title="Classic Q&A — Know These Cold" tag="Interview Q&A" tc="blue">
      <div style={G.code}>{`Q: Detect cycle?
A: Fast & Slow (Floyd's) — slow==fast → cycle exists

Q: Find middle?
A: Fast & Slow — when fast hits end, slow is at middle

Q: Find cycle start?
A: Phase 1: detect meeting point (fast & slow)
   Phase 2: reset slow to head, move both 1 step — meet at start
   Mathematical proof: dist(head→start) = dist(meet→start)

Q: Reverse a linked list?
A: 3 pointers: prev=null, curr=head
   At each node: save next, reverse link, advance both
   Return prev (new head)

Q: Merge two sorted lists?
A: Dummy node + compare heads + attach smaller + advance that list

Q: Merge K sorted lists?
A: Min-heap (PriorityQueue) — add all heads, extract min, add next

Q: Nth node from end?
A: Two pointer with N-gap — advance fast N steps, then both together

Q: Palindrome check?
A: Find middle → reverse second half → compare

Q: LRU Cache?
A: HashMap (key→node) + Doubly Linked List (order)
   HashMap gives O(1) lookup, DLL gives O(1) move-to-front

Q: Delete a node given only that node (not head)?
A: Copy next node's value into current, delete next node`}</div>
    </S>
    <S title="Recognizing Which Pattern to Use" tag="Pattern Recognition" tc="amber">
      <div style={G.code}>{`Problem says "detect cycle"?
└─► Fast & Slow (Floyd's) — Pattern 8

Problem says "find middle"?
└─► Fast & Slow — Pattern 8

Problem says "reverse" something?
└─► 3-pointer reversal — Pattern 9

Problem says "merge" sorted lists?
└─► Dummy node + pointer technique — Pattern 10

Problem involves reordering with "even/odd positions"?
└─► Two passes or fast & slow — Pattern 8/9

Problem says "head might be deleted" / "modify the list"?
└─► Dummy node ALWAYS

Problem says "find kth from end"?
└─► Two pointer with k-gap — Pattern 8 variant`}</div>
    </S>
  </div>
);

const NotesTab = ({ notes, setNotes }) => (
  <div>
    <S title="Your Notes" tag="Personal" tc="teal">
      <textarea value={notes} onChange={e=>setNotes(e.target.value)}
        placeholder={"Your personal notes for Linked Lists...\n\nExample:\n- NEVER move head — always curr = head!\n- Dummy node: when head itself might change\n- fast!=null && fast.next!=null — BOTH checks!\n- slow==fast: compare REFERENCES not values\n- Cycle start Phase 2: fast moves 1 step, not 2!\n- Reversal: save next FIRST before reversing link"}
        style={{ width:"100%", minHeight:"220px", background:"rgba(0,0,0,0.35)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"10px", padding:"14px", color:"#e2e8f0", fontSize:"13px", lineHeight:"1.8", fontFamily:"'Cascadia Code','Fira Code',monospace", resize:"vertical", outline:"none" }}
      />
    </S>
    <S title="Pre-Interview Checklist" tag="Checklist" tc="green">
      {[
        ["Am I using curr = head instead of moving head directly?","teal"],
        ["Does head get deleted or changed? If yes, using dummy node?","purple"],
        ["Fast & Slow: wrote fast!=null && fast.next!=null?","amber"],
        ["Comparing slow==fast (references) not slow.val==fast.val?","red"],
        ["Cycle start Phase 2: fast moves 1 step not 2?","red"],
        ["Reversal: saving next BEFORE reversing link?","blue"],
        ["Tested on odd-length AND even-length input?","green"],
        ["If deleting nodes, maintaining prev pointer?","amber"],
        ["Merge: using dummy node to avoid head edge case?","teal"],
        ["Can I draw the pointer changes on paper before coding?","purple"],
      ].map(([item,c],i)=>(
        <div key={i} style={{display:"flex",alignItems:"flex-start",gap:"10px",padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
          <input type="checkbox" style={{marginTop:"3px",accentColor:"#14b8a6",flexShrink:0}}/>
          <span style={{fontSize:"13px",color:"#cbd5e1",lineHeight:"1.6"}}>{item}</span>
        </div>
      ))}
    </S>
    <S title="Common Mistakes — Quick Reference" tag="Avoid" tc="red">
      <div style={G.code}>{`❌ Moving head pointer directly → lose access to list
❌ No dummy node when head changes → messy edge cases
❌ Only checking fast!=null (missing fast.next!=null check)
❌ Comparing slow.val==fast.val for cycle → wrong!
❌ Phase 2 of cycle start: fast.next.next instead of fast.next
❌ Reversal: forgetting to save next → lose rest of list
❌ Reversal: returning curr instead of prev (curr is null at end!)
❌ Testing only on odd-length lists → even fails
❌ Merge: not handling remaining elements after one list ends
❌ Delete: trying to delete without knowing previous node`}</div>
    </S>
  </div>
);

const TABS = ["Basics","Types","Operations","Java Code","LL vs Array","Pattern 8","Pattern 9","Pattern 10","Interview Tricks","Notes"];
const CONTENT = { "Basics":<Basics/>, "Types":<Types/>, "Operations":<Operations/>, "Java Code":<JavaCode/>, "LL vs Array":<LLvsArray/>, "Pattern 8":<Pattern8/>, "Pattern 9":<Pattern9/>, "Pattern 10":<Pattern10/>, "Interview Tricks":<InterviewTricks/> };

export default function LinkedListTheory() {
  const [tab, setTab] = useState("Basics");
  const [notes, setNotes] = useState("");
  return (
    <div style={G.page}>
      <div style={{ maxWidth:"860px", margin:"0 auto" }}>
        <div style={{ marginBottom:"28px" }}>
          <span style={{ fontSize:"11px", fontWeight:700, letterSpacing:"2px", color:"#14b8a6", textTransform:"uppercase" }}>Patterns 8 · 9 · 10</span>
          <h1 style={{ fontSize:"30px", fontWeight:700, color:"#f1f5f9", margin:"6px 0 4px" }}>Linked List</h1>
          <p style={{ fontSize:"14px", color:"#64748b" }}>Complete deep-dive — Singly · Doubly · Circular · Fast & Slow · Reversal · Merge Patterns</p>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", marginBottom:"24px" }}>
          {TABS.map(t=><button key={t} style={G.pill(tab===t)} onClick={()=>setTab(t)}>{t}</button>)}
        </div>
        <div style={G.glass}>
          {tab==="Notes" ? <NotesTab notes={notes} setNotes={setNotes}/> : CONTENT[tab]}
        </div>
      </div>
    </div>
  );
}