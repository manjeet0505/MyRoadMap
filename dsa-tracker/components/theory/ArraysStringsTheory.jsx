'use client'
import { useState } from 'react'

/* ─── shared styles ─────────────────────────────────────────── */
const G = {
  bg:      '#0d1117',
  surface: 'rgba(255,255,255,0.03)',
  border:  'rgba(255,255,255,0.07)',
  text:    '#e2e8f0',
  muted:   '#8b949e',
  cyan:    '#06b6d4',
  purple:  '#a855f7',
  green:   '#10b981',
  yellow:  '#f59e0b',
  red:     '#ef4444',
  blue:    '#3b82f6',
}

const card = {
  background: 'rgba(255,255,255,0.04)',
  border: `1px solid ${G.border}`,
  borderRadius: '12px',
  padding: '20px',
  backdropFilter: 'blur(8px)',
}

const code = (color = G.cyan) => ({
  background: 'rgba(0,0,0,0.4)',
  border: `1px solid ${color}30`,
  borderRadius: '10px',
  padding: '16px 20px',
  fontFamily: "'Fira Code', 'Cascadia Code', monospace",
  fontSize: '13px',
  color: G.text,
  overflowX: 'auto',
  lineHeight: 1.7,
  whiteSpace: 'pre',
})

const tag = (color) => ({
  display: 'inline-block',
  background: `${color}20`,
  border: `1px solid ${color}50`,
  borderRadius: '6px',
  padding: '2px 10px',
  fontSize: '11px',
  color,
  fontFamily: 'monospace',
  fontWeight: 600,
})

const h2 = { fontSize: '18px', fontWeight: 700, color: G.text, marginBottom: '4px' }
const h3 = { fontSize: '15px', fontWeight: 600, color: G.cyan, marginBottom: '12px' }
const p  = { color: G.muted,   fontSize: '14px', lineHeight: 1.8, marginBottom: '12px' }

/* ─── tab content ───────────────────────────────────────────── */

function Overview() {
  const complexities = [
    ['Access by index',    'O(1)',    'O(n)',   G.green],
    ['Search (unsorted)',  'O(n)',    'O(n)',   G.yellow],
    ['Insert at end',      'O(1)*',  'O(n)',   G.green],
    ['Insert at i',        'O(n)',    'O(n)',   G.yellow],
    ['Delete at i',        'O(n)',    'O(n)',   G.yellow],
    ['Length',             'O(1)',    'O(n)',   G.green],
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={card}>
        <div style={h3}>Why Arrays Are Fast ⚡</div>
        <p style={p}>
          An array stores elements in <strong style={{color:G.cyan}}>contiguous memory</strong>. If the array starts at address <code style={{color:G.green}}>1000</code> and each int is 4 bytes, then <code style={{color:G.green}}>arr[5]</code> is always at <code style={{color:G.green}}>1000 + 5×4 = 1020</code>. The CPU computes this in one step — no searching required. That's why access is O(1).
        </p>
        <div style={code(G.cyan)}>
{`arr = [10, 20, 30, 40, 50]
       ↑                   
    address: 1000  1004  1008  1012  1016

arr[0] → 1000 + 0×4 = 1000  ✅ direct
arr[3] → 1000 + 3×4 = 1012  ✅ direct
arr[k] → base + k × sizeof(type)  ← formula`}
        </div>
      </div>

      <div style={card}>
        <div style={h3}>String Immutability Trap 🪤 (Java / Python / JS)</div>
        <p style={p}>
          In Java, strings are <strong style={{color:G.red}}>immutable</strong>. Every concatenation in a loop creates a new object — your O(n) loop secretly becomes <strong style={{color:G.red}}>O(n²)</strong> in memory and time. Always use <code style={{color:G.green}}>StringBuilder</code>.
        </p>
        <div style={code(G.red)}>
{`// ❌ O(n²) — creates a new String every iteration
String result = "";
for (String s : words) {
    result += s;   // new object every time!
}

// ✅ O(n) — StringBuilder mutates in place
StringBuilder sb = new StringBuilder();
for (String s : words) {
    sb.append(s);
}
String result = sb.toString();`}
        </div>
      </div>

      <div style={card}>
        <div style={h3}>Complexity Cheat Sheet 📋</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr>
              {['Operation','Array','String'].map(h => (
                <th key={h} style={{ textAlign:'left', padding:'8px 12px', color:G.muted, borderBottom:`1px solid ${G.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {complexities.map(([op, arr, str, c]) => (
              <tr key={op} style={{ borderBottom: `1px solid ${G.border}20` }}>
                <td style={{ padding:'8px 12px', color:G.text }}>{op}</td>
                <td style={{ padding:'8px 12px' }}><span style={tag(c)}>{arr}</span></td>
                <td style={{ padding:'8px 12px' }}><span style={tag(G.yellow)}>{str}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={card}>
        <div style={h3}>Which Pattern Should I Use? 🧭</div>
        <div style={code(G.purple)}>
{`Problem says "sorted array" + find pair/triplet?
  → Two Pointers (Pattern 1)

"Subarray of size k" or "longest window with condition"?
  → Sliding Window (Pattern 2)

"Prefix / range sum" queries?
  → Prefix Sum (Pattern 4)

"Maximum subarray sum" (contiguous)?
  → Kadane's Algorithm (Pattern 5)

"Count / group / lookup in O(1)"?
  → HashMap / HashSet (Pattern 7)

"Need sorted order" first?
  → Sorting Based (Pattern 6)`}
        </div>
      </div>
    </div>
  )
}

function TwoPointers() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={card}>
        <div style={h3}>Core Idea 🧠</div>
        <p style={p}>Use two index variables that move toward each other (or in the same direction). Eliminates the need for a nested loop — turns O(n²) into O(n).</p>
        <div style={code(G.cyan)}>
{`// Template — Opposite Ends
int left = 0, right = n - 1;
while (left < right) {
    int sum = nums[left] + nums[right];
    if (sum == target)  { /* found! */ }
    else if (sum < target) left++;   // need bigger → move left right
    else                   right--;  // need smaller → move right left
}`}
        </div>
      </div>

      <div style={card}>
        <div style={h3}>Dry Run — Two Sum II (Sorted) 🔍</div>
        <div style={code(G.green)}>
{`nums = [-2, 1, 3, 5, 8]   target = 6
        L              R

Step 1: L=-2, R=8  sum=6  ✅ FOUND!  → return [L,R]

────────────────────────────────────
nums = [1, 2, 4, 7, 9]  target = 10
       L           R

Step 1: 1+9=10  ✅ FOUND immediately!

────────────────────────────────────
nums = [1, 2, 4, 7, 9]  target = 3
       L           R

Step 1: 1+9=10 > 3  → R-- → R points to 7
Step 2: 1+7 =8  > 3  → R-- → R points to 4
Step 3: 1+4 =5  > 3  → R-- → R points to 2
Step 4: L==R  → loop ends → not found`}
        </div>
      </div>

      <div style={card}>
        <div style={h3}>3Sum — Handling Duplicates 🔥</div>
        <p style={p}>Fix one element, run two pointers on the rest. Key trick: skip duplicate values to avoid duplicate triplets.</p>
        <div style={code(G.purple)}>
{`Arrays.sort(nums);
List<List<Integer>> res = new ArrayList<>();

for (int i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] == nums[i-1]) continue;  // skip dup i

    int left = i + 1, right = nums.length - 1;
    while (left < right) {
        int sum = nums[i] + nums[left] + nums[right];
        if (sum == 0) {
            res.add(Arrays.asList(nums[i], nums[left], nums[right]));
            while (left < right && nums[left]  == nums[left+1])  left++;
            while (left < right && nums[right] == nums[right-1]) right--;
            left++; right--;
        } else if (sum < 0) left++;
        else                right--;
    }
}
// Time: O(n²)   Space: O(1) extra`}
        </div>
      </div>

      <div style={card}>
        <div style={h3}>Container With Most Water 💧</div>
        <p style={p}>Greedy insight: always move the <strong style={{color:G.cyan}}>shorter</strong> pointer inward. Moving the taller one can only decrease area (width shrinks AND height can't improve).</p>
        <div style={code(G.yellow)}>
{`height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
           L                       R

Area = min(h[L], h[R]) × (R - L)

Step 1: min(1,7)×8 = 8   → h[L]<h[R] → L++
Step 2: min(8,7)×7 = 49  → h[R]<h[L] → R--
Step 3: min(8,3)×6 = 18  → R--
Step 4: min(8,8)×5 = 40  → L++ or R--
...
maxArea = 49 ✅`}
        </div>
      </div>

      <div style={card}>
        <div style={h3}>When to Use Two Pointers ✅</div>
        <div style={code(G.cyan)}>
{`✅ Array / string is SORTED (or you can sort it)
✅ Find a PAIR or TRIPLET with a condition
✅ Check if something is a PALINDROME
✅ Remove duplicates in-place
✅ Merge two sorted arrays

❌ Array is unsorted AND sorting changes the answer
❌ Need all possible subarrays (use prefix sum / sliding window)`}
        </div>
      </div>
    </div>
  )
}

function SlidingWindow() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={card}>
        <div style={h3}>Fixed Window — Core Template 🧠</div>
        <p style={p}>Window size <code style={{color:G.cyan}}>k</code> never changes. Build the first window, then slide it by removing the leftmost element and adding the next one.</p>
        <div style={code(G.cyan)}>
{`// Max sum of subarray of size k
int windowSum = 0, maxSum = 0;

// Build first window
for (int i = 0; i < k; i++) windowSum += nums[i];
maxSum = windowSum;

// Slide
for (int i = k; i < n; i++) {
    windowSum += nums[i];        // add new right
    windowSum -= nums[i - k];    // remove old left
    maxSum = Math.max(maxSum, windowSum);
}
// Time: O(n)   Space: O(1)`}
        </div>
      </div>

      <div style={card}>
        <div style={h3}>Fixed Window Dry Run 🔍</div>
        <div style={code(G.green)}>
{`nums = [2, 1, 5, 1, 3, 2]   k = 3

Window 1: [2,1,5] sum=8   maxSum=8
Slide  →  remove 2, add 1: [1,5,1] sum=7   maxSum=8
Slide  →  remove 1, add 3: [5,1,3] sum=9   maxSum=9  ✅
Slide  →  remove 5, add 2: [1,3,2] sum=6   maxSum=9

Answer: 9`}
        </div>
      </div>

      <div style={card}>
        <div style={h3}>Variable Window — Core Template 🧠</div>
        <p style={p}>Window grows from the right. When condition breaks, <strong style={{color:G.red}}>shrink from the left</strong> until condition is restored.</p>
        <div style={code(G.purple)}>
{`// Longest subarray with sum ≤ k
int left = 0, windowSum = 0, maxLen = 0;

for (int right = 0; right < n; right++) {
    windowSum += nums[right];           // expand right

    while (windowSum > k) {             // condition broke
        windowSum -= nums[left];        // shrink left
        left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
}
// Time: O(n)  — each element enters/exits window once`}
        </div>
      </div>

      <div style={card}>
        <div style={h3}>Variable Window with HashMap 🗺️</div>
        <p style={p}>Longest substring without repeating characters — use a HashMap to track last seen index.</p>
        <div style={code(G.yellow)}>
{`// s = "abcabcbb"
Map<Character, Integer> map = new HashMap<>();
int left = 0, maxLen = 0;

for (int right = 0; right < s.length(); right++) {
    char c = s.charAt(right);

    if (map.containsKey(c)) {
        // jump left past the duplicate
        left = Math.max(left, map.get(c) + 1);
    }
    map.put(c, right);
    maxLen = Math.max(maxLen, right - left + 1);
}

// Dry run "abcabcbb":
// right=0: a→{a:0}  window=a     len=1
// right=1: b→{b:1}  window=ab    len=2
// right=2: c→{c:2}  window=abc   len=3
// right=3: a→left=1 window=bca   len=3
// right=4: b→left=2 window=cab   len=3
// Answer: 3 ✅`}
        </div>
      </div>

      <div style={card}>
        <div style={h3}>Fixed vs Variable — Decision Guide 🧭</div>
        <div style={code(G.cyan)}>
{`Fixed Window  → problem gives you exact size k
  "max sum of subarray of size k"
  "average of every window of size k"

Variable Window → problem asks for LONGEST / SHORTEST
  "longest substring with at most k distinct chars"
  "smallest subarray with sum ≥ target"
  "minimum window substring"`}
        </div>
      </div>
    </div>
  )
}

function PrefixSum() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={card}>
        <div style={h3}>What Is Prefix Sum? 🧠</div>
        <p style={p}>
          Precompute cumulative sums so any range query <code style={{color:G.cyan}}>sum(L..R)</code> answers in O(1) instead of O(n).
        </p>
        <div style={code(G.cyan)}>
{`nums   = [3, 1, 4, 1, 5, 9]
prefix = [0, 3, 4, 8, 9, 14, 23]
         ↑ extra 0 at start (simplifies formula)

prefix[i] = prefix[i-1] + nums[i-1]

Range sum L..R  =  prefix[R+1] - prefix[L]

Example: sum(1..3) = prefix[4] - prefix[1]
                   = 9 - 3 = 6
Check: nums[1]+nums[2]+nums[3] = 1+4+1 = 6 ✅`}
        </div>
      </div>

      <div style={card}>
        <div style={h3}>Build & Query Template 🎯</div>
        <div style={code(G.green)}>
{`int n = nums.length;
int[] prefix = new int[n + 1];
for (int i = 0; i < n; i++) {
    prefix[i + 1] = prefix[i] + nums[i];
}

// Query: sum from index L to R (inclusive)
int rangeSum(int L, int R) {
    return prefix[R + 1] - prefix[L];
}`}
        </div>
      </div>

      <div style={card}>
        <div style={h3}>Subarray Sum = K — Full Dry Run 🔍</div>
        <p style={p}>
          We want count of subarrays summing to k. Key insight: if <code style={{color:G.cyan}}>prefixSum[j] - prefixSum[i] = k</code>, then subarray <code style={{color:G.cyan}}>i+1..j</code> sums to k. So for each j, check if <code style={{color:G.cyan}}>prefixSum[j] - k</code> was seen before.
        </p>
        <div style={code(G.purple)}>
{`nums = [1, 1, 1]   k = 2

HashMap: {0:1}   (prefix sum 0 seen once — empty prefix)
count = 0

i=0: sum=1  look for 1-2=-1  not found  map={0:1, 1:1}
i=1: sum=2  look for 2-2= 0  FOUND! ×1  count=1  map={0:1,1:1,2:1}
i=2: sum=3  look for 3-2= 1  FOUND! ×1  count=2  map={0:1,1:1,2:1,3:1}

Answer: 2 ✅

Code:
Map<Integer,Integer> map = new HashMap<>();
map.put(0, 1);
int sum = 0, count = 0;
for (int num : nums) {
    sum += num;
    count += map.getOrDefault(sum - k, 0);
    map.put(sum, map.getOrDefault(sum, 0) + 1);
}
return count;`}
        </div>
      </div>

      <div style={card}>
        <div style={h3}>Product of Array Except Self 🔥</div>
        <p style={p}>No division allowed! Build prefix products from left, then suffix products from right.</p>
        <div style={code(G.yellow)}>
{`nums = [1, 2, 3, 4]

Left  products: [1,  1,  2,  6]   (product of everything LEFT of i)
Right products: [24, 12, 4,  1]   (product of everything RIGHT of i)
Answer        : [24, 12, 8,  6]   (left[i] × right[i])

// O(n) time, O(1) extra space
int[] ans = new int[n];
Arrays.fill(ans, 1);

int prefix = 1;                      // left pass
for (int i = 0; i < n; i++) { ans[i] *= prefix; prefix *= nums[i]; }

int suffix = 1;                      // right pass
for (int i = n-1; i >= 0; i--) { ans[i] *= suffix; suffix *= nums[i]; }`}
        </div>
      </div>
    </div>
  )
}

function Kadanes() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={card}>
        <div style={h3}>Core Insight 🧠</div>
        <p style={p}>
          At every element, you have two choices: <strong style={{color:G.cyan}}>extend</strong> the existing subarray, or <strong style={{color:G.cyan}}>start fresh</strong> from here. Start fresh when the running sum goes <strong style={{color:G.red}}>negative</strong> — a negative prefix only hurts future elements.
        </p>
        <div style={code(G.cyan)}>
{`// Standard Kadane's
int maxSum = nums[0], currentSum = nums[0];

for (int i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    //           ^^^^^^^^^^^^^^^^  start fresh if current dragged down
    maxSum = Math.max(maxSum, currentSum);
}
return maxSum;

// ⚠️ Initialize with nums[0], NOT 0
//    If all numbers are negative, max is the least negative.
//    Starting with 0 would incorrectly return 0!`}
        </div>
      </div>

      <div style={card}>
        <div style={h3}>Complete Dry Run 🔍</div>
        <div style={code(G.green)}>
{`nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]

i=0: cur=-2          max=-2
i=1: cur=max(1, -2+1=−1)=1    max=1
i=2: cur=max(-3,1-3=-2)=-2    max=1
i=3: cur=max(4,-2+4=2)=4      max=4
i=4: cur=max(-1,4-1=3)=3      max=4
i=5: cur=max(2,3+2=5)=5       max=5
i=6: cur=max(1,5+1=6)=6       max=6  ✅
i=7: cur=max(-5,6-5=1)=1      max=6
i=8: cur=max(4,1+4=5)=5       max=6

Answer: 6  (subarray [4,-1,2,1])`}
        </div>
      </div>

      <div style={card}>
        <div style={h3}>Track the Actual Subarray 🎯</div>
        <div style={code(G.purple)}>
{`int maxSum = nums[0], curSum = nums[0];
int start = 0, end = 0, tempStart = 0;

for (int i = 1; i < nums.length; i++) {
    if (nums[i] > curSum + nums[i]) {
        curSum = nums[i];
        tempStart = i;     // potential new start
    } else {
        curSum += nums[i];
    }
    if (curSum > maxSum) {
        maxSum = curSum;
        start = tempStart;
        end = i;
    }
}
// nums[start..end] is your answer`}
        </div>
      </div>

      <div style={card}>
        <div style={h3}>Maximum Product Subarray (Variant) 🔥</div>
        <p style={p}>Track both max AND min at each step — a large negative × negative = large positive!</p>
        <div style={code(G.yellow)}>
{`int maxProd = nums[0], minProd = nums[0], ans = nums[0];

for (int i = 1; i < nums.length; i++) {
    int temp = maxProd;
    maxProd = Math.max(nums[i], Math.max(maxProd * nums[i], minProd * nums[i]));
    minProd = Math.min(nums[i], Math.min(temp    * nums[i], minProd * nums[i]));
    ans = Math.max(ans, maxProd);
}
return ans;

// Dry run: [2, 3, -2, 4]
// i=1: max=6  min=3
// i=2: max=-2  min=-12
// i=3: max=4  min=-48
// Answer: 6 ✅  (subarray [2,3])`}
        </div>
      </div>
    </div>
  )
}

function SortingPatterns() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={card}>
        <div style={h3}>Sorting Algorithms — Quick Comparison 📊</div>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'13px' }}>
          <thead>
            <tr>{['Algorithm','Best','Avg','Worst','Space','Stable'].map(h=>(
              <th key={h} style={{textAlign:'left',padding:'8px 10px',color:G.muted,borderBottom:`1px solid ${G.border}`}}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {[
              ['Bubble Sort','O(n)','O(n²)','O(n²)','O(1)','✅'],
              ['Selection Sort','O(n²)','O(n²)','O(n²)','O(1)','❌'],
              ['Insertion Sort','O(n)','O(n²)','O(n²)','O(1)','✅'],
              ['Merge Sort','O(n log n)','O(n log n)','O(n log n)','O(n)','✅'],
              ['Quick Sort','O(n log n)','O(n log n)','O(n²)','O(log n)','❌'],
              ['Heap Sort','O(n log n)','O(n log n)','O(n log n)','O(1)','❌'],
              ['Counting Sort','O(n+k)','O(n+k)','O(n+k)','O(k)','✅'],
            ].map(row=>(
              <tr key={row[0]} style={{borderBottom:`1px solid ${G.border}20`}}>
                {row.map((cell,i)=>(
                  <td key={i} style={{padding:'8px 10px',color:i===0?G.text:i===5?cell==='✅'?G.green:G.red:G.muted}}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={card}>
        <div style={h3}>Dutch National Flag — 3 Pointers Deep Dive 🇳🇱</div>
        <p style={p}>Sort array with only 0s, 1s, 2s in O(n) time, O(1) space. Three pointers: <code style={{color:G.cyan}}>low</code>, <code style={{color:G.cyan}}>mid</code>, <code style={{color:G.cyan}}>high</code>.</p>
        <div style={code(G.cyan)}>
{`Invariants at all times:
  nums[0..low-1]  = all 0s
  nums[low..mid-1]= all 1s
  nums[mid..high] = unexplored
  nums[high+1..n] = all 2s

int low = 0, mid = 0, high = n - 1;
while (mid <= high) {
    if      (nums[mid] == 0) swap(low++, mid++);
    else if (nums[mid] == 1) mid++;
    else                     swap(mid, high--);
    // mid stays when we swap from high (unknown element came in)
}`}
        </div>
        <div style={code(G.green)}>
{`Dry run: [2, 0, 2, 1, 1, 0]
         l=0 m=0 h=5

mid=2 → swap(mid,high): [0,0,2,1,1,2] h=4
mid=0 → swap(low,mid):  [0,0,2,1,1,2] l=1,m=1
mid=0 → swap(low,mid):  [0,0,2,1,1,2] l=2,m=2
mid=2 → swap(mid,high): [0,0,1,1,2,2] h=3
mid=1 → m=3
mid=1 → m=4   m>h → STOP

Result: [0,0,1,1,2,2] ✅`}
        </div>
      </div>

      <div style={card}>
        <div style={h3}>Merge Intervals 📅</div>
        <div style={code(G.purple)}>
{`// Sort by start time, then greedily merge overlapping
Arrays.sort(intervals, (a, b) -> a[0] - b[0]);

List<int[]> merged = new ArrayList<>();
merged.add(intervals[0]);

for (int i = 1; i < intervals.length; i++) {
    int[] last = merged.get(merged.size() - 1);
    if (intervals[i][0] <= last[1]) {          // overlap!
        last[1] = Math.max(last[1], intervals[i][1]);
    } else {
        merged.add(intervals[i]);
    }
}
// Time: O(n log n)   Space: O(n)`}
        </div>
      </div>
    </div>
  )
}

function HashMapPattern() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={card}>
        <div style={h3}>Why HashMap Changes Everything ⚡</div>
        <p style={p}>HashMap gives O(1) average for <strong style={{color:G.cyan}}>get</strong>, <strong style={{color:G.cyan}}>put</strong>, <strong style={{color:G.cyan}}>containsKey</strong>. This turns most O(n²) brute-force lookups into O(n).</p>
        <div style={code(G.cyan)}>
{`// Brute force Two Sum — O(n²)
for (int i = 0; i < n; i++)
    for (int j = i+1; j < n; j++)
        if (nums[i] + nums[j] == target) return [i, j];

// HashMap Two Sum — O(n)
Map<Integer, Integer> map = new HashMap<>();
for (int i = 0; i < n; i++) {
    int complement = target - nums[i];
    if (map.containsKey(complement))
        return new int[]{map.get(complement), i};
    map.put(nums[i], i);   // store VALUE → INDEX
}`}
        </div>
      </div>

      <div style={card}>
        <div style={h3}>Group Anagrams — Step by Step 🔍</div>
        <div style={code(G.green)}>
{`Input: ["eat","tea","tan","ate","nat","bat"]

Key idea: anagrams have the SAME sorted string
  "eat" → sort → "aet"
  "tea" → sort → "aet"   same key!
  "tan" → sort → "ant"
  "nat" → sort → "ant"   same key!
  "bat" → sort → "abt"

HashMap after processing:
{
  "aet" → ["eat","tea","ate"]
  "ant" → ["tan","nat"]
  "abt" → ["bat"]
}

return new ArrayList<>(map.values())  ✅`}
        </div>
      </div>

      <div style={card}>
        <div style={h3}>Longest Consecutive Sequence — O(n) Trick 🔥</div>
        <p style={p}>Add all numbers to a HashSet. Only start counting from a number if <code style={{color:G.cyan}}>num-1</code> is NOT in the set — that means it's a sequence start.</p>
        <div style={code(G.purple)}>
{`nums = [100, 4, 200, 1, 3, 2]
set  = {100, 4, 200, 1, 3, 2}

num=100 → 99 not in set → START → 100,101? no → len=1
num=4   →  3 in set    → SKIP
num=200 → 199 not in set → START → 200,201? no → len=1
num=1   →  0 not in set → START → 1,2,3,4,5? no → len=4  ✅
num=3   →  2 in set    → SKIP
num=2   →  1 in set    → SKIP

Answer: 4  (sequence [1,2,3,4])

// Why O(n)? Each number is visited at most twice.`}
        </div>
      </div>

      <div style={card}>
        <div style={h3}>HashMap vs HashSet — Quick Ref 📋</div>
        <div style={code(G.yellow)}>
{`HashMap<K,V>
  → stores key-value pairs
  → use when you need to MAP something (val→index, char→count)
  → map.put(k,v)  map.get(k)  map.containsKey(k)
  → map.getOrDefault(k, 0)   ← frequency counting

HashSet<E>
  → stores unique elements only
  → use when you only need EXISTENCE check
  → set.add(e)  set.contains(e)  set.remove(e)`}
        </div>
      </div>
    </div>
  )
}

function NotesTab() {
  const [notes, setNotes] = useState('')
  const checklist = [
    'Two Pointers — sorted array, need pair/triplet',
    'Sliding Window — subarray/substring with constraint',
    'Prefix Sum — range queries or subarray sum = k',
    "Kadane's — max contiguous subarray",
    'Sorting + Two Pointers — 3Sum, merge intervals',
    'HashMap — O(1) lookup, frequency count, grouping',
    'StringBuilder — never concatenate strings in a loop',
    'Initialize HashMap with (0,1) for prefix sum problems',
    'Dutch National Flag uses 3 pointers, NOT 2',
    'Check fast != null && fast.next != null in LL',
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={card}>
        <div style={h3}>My Notes ✍️</div>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Write your own insights, mistakes, and patterns here..."
          style={{
            width: '100%', minHeight: '180px', boxSizing: 'border-box',
            background: 'rgba(0,0,0,0.3)', border: `1px solid ${G.border}`,
            borderRadius: '10px', padding: '14px', color: G.text,
            fontSize: '13px', fontFamily: 'monospace', resize: 'vertical', outline: 'none',
          }}
        />
      </div>
      <div style={card}>
        <div style={h3}>Pre-Interview Checklist ✅</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {checklist.map((item, i) => (
            <label key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
              <input type="checkbox" style={{ marginTop: '3px', accentColor: G.cyan }} />
              <span style={{ color: G.muted, fontSize: '13px', lineHeight: 1.6 }}>{item}</span>
            </label>
          ))}
        </div>
      </div>
      <div style={card}>
        <div style={h3}>Common Mistakes ❌</div>
        <div style={code(G.red)}>
{`❌  String result = "" + s in loop   → O(n²)
✅  StringBuilder sb.append(s)       → O(n)

❌  if (slow.val == fast.val)         → compares values
✅  if (slow == fast)                 → compares references

❌  Not initializing map.put(0,1)    → misses subarrays from index 0
✅  Always seed prefix-sum map with (0,1)

❌  DNF with 2 pointers              → wrong
✅  DNF always needs low, mid, high  → 3 pointers

❌  Arrays.sort() on chars then concat without new String(chars)
✅  new String(charArray) to get string key from sorted chars`}
        </div>
      </div>
    </div>
  )
}

/* ─── main component ─────────────────────────────────────────── */
const TABS = [
  { id: 'overview',  label: '🏠 Overview'       },
  { id: 'two',       label: '👈👉 Two Pointers'  },
  { id: 'window',    label: '🪟 Sliding Window'  },
  { id: 'prefix',    label: '➕ Prefix Sum'      },
  { id: 'kadane',    label: "⚡ Kadane's"        },
  { id: 'sorting',   label: '🔃 Sorting'         },
  { id: 'hashmap',   label: '🗺️ HashMap'          },
  { id: 'notes',     label: '📝 My Notes'        },
]

export default function ArraysStringsTheory() {
  const [active, setActive] = useState('overview')

  return (
    <div style={{ minHeight: '100vh', background: G.bg, fontFamily: "'Segoe UI', system-ui, sans-serif", padding: '24px 16px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div style={{ fontSize: '13px', color: G.cyan, fontFamily: 'monospace', marginBottom: '6px', letterSpacing: '3px' }}>
          PATTERNS 1 – 7
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: G.text, margin: 0 }}>
          Arrays & Strings Theory
        </h1>
        <p style={{ color: G.muted, fontSize: '14px', marginTop: '8px' }}>
          Everything you need to know — concepts, dry runs, code templates, and common mistakes
        </p>
      </div>

      {/* Tab Bar */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '6px',
        justifyContent: 'center', marginBottom: '28px',
        background: 'rgba(255,255,255,0.02)',
        border: `1px solid ${G.border}`,
        borderRadius: '14px', padding: '10px',
      }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            style={{
              padding: '8px 16px', borderRadius: '9px',
              border: active === tab.id ? `1px solid ${G.cyan}` : '1px solid transparent',
              background: active === tab.id ? `${G.cyan}15` : 'transparent',
              color: active === tab.id ? G.cyan : G.muted,
              fontSize: '13px', cursor: 'pointer',
              transition: 'all 0.18s ease',
              fontWeight: active === tab.id ? 600 : 400,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        {active === 'overview' && <Overview />}
        {active === 'two'      && <TwoPointers />}
        {active === 'window'   && <SlidingWindow />}
        {active === 'prefix'   && <PrefixSum />}
        {active === 'kadane'   && <Kadanes />}
        {active === 'sorting'  && <SortingPatterns />}
        {active === 'hashmap'  && <HashMapPattern />}
        {active === 'notes'    && <NotesTab />}
      </div>
    </div>
  )
}