'use client';
import { useState, useEffect, useMemo } from "react";

/* ─────────────────────────────────────────────
   DATA  (456 questions across 34 patterns)
   Format: [id, title, difficulty]  E/M/H
───────────────────────────────────────────── */
const CATEGORIES = [
  { id: "all",        label: "All",              emoji: "🗂️" },
  { id: "arrays",     label: "Arrays & Strings",  emoji: "🔢" },
  { id: "linked",     label: "Linked List",        emoji: "🔗" },
  { id: "stackq",     label: "Stack & Queue",      emoji: "📚" },
  { id: "binsearch",  label: "Binary Search",      emoji: "🔍" },
  { id: "trees",      label: "Trees",              emoji: "🌳" },
  { id: "graphs",     label: "Graphs",             emoji: "🕸️" },
  { id: "heaps",      label: "Heaps",              emoji: "⛰️" },
  { id: "dp",         label: "Dynamic Programming",emoji: "💡" },
  { id: "others",     label: "Others",             emoji: "✨" },
];

const PATTERNS = [
  /* ── ARRAYS & STRINGS ── */
  { id:1, cat:"arrays", name:"Two Pointers (Opposite Ends)", qs:[
    ["1_1","Two Sum II – Input Array Is Sorted","M"],
    ["1_2","3Sum","M"],
    ["1_3","4Sum","H"],
    ["1_4","Container With Most Water","M"],
    ["1_5","Trapping Rain Water","H"],
    ["1_6","Move Zeroes","E"],
    ["1_7","Remove Duplicates from Sorted Array","E"],
    ["1_8","Remove Duplicates from Sorted Array II","M"],
    ["1_9","Valid Palindrome","E"],
    ["1_10","Sort Colors (Dutch National Flag)","M"],
    ["1_11","Boats to Save People","M"],
    ["1_12","Reverse Pairs","H"],
    ["1_13","Count Inversions in Array (Merge Sort)","M"],
  ]},
  { id:2, cat:"arrays", name:"Sliding Window (Fixed + Variable)", qs:[
    ["2_1","Maximum Sum Subarray of Size K","E"],
    ["2_2","Longest Substring Without Repeating Characters","M"],
    ["2_3","Minimum Window Substring","H"],
    ["2_4","Permutation in String","M"],
    ["2_5","Find All Anagrams in a String","M"],
    ["2_6","Fruits into Baskets","M"],
    ["2_7","Max Consecutive Ones III","M"],
    ["2_8","Number of Substrings Containing All 3 Characters","M"],
    ["2_9","Count Subarrays with K Different Integers","H"],
    ["2_10","Subarray Product Less Than K","M"],
    ["2_11","Longest Repeating Character Replacement","M"],
    ["2_12","Max Points You Can Obtain from Cards","M"],
    ["2_13","Binary Subarrays with Sum","M"],
    ["2_14","Count Nice Subarrays (Exactly K Odd)","M"],
    ["2_15","Maximum Erasure Value","M"],
  ]},
  { id:3, cat:"arrays", name:"Fast & Slow Pointers", qs:[
    ["3_1","Find the Duplicate Number","M"],
    ["3_2","Happy Number","E"],
    ["3_3","Missing Number (XOR/Floyd)","E"],
    ["3_4","Circular Array Loop","H"],
    ["3_5","Find Kth Missing Positive Number","E"],
  ]},
  { id:4, cat:"arrays", name:"Prefix Sum", qs:[
    ["4_1","Subarray Sum Equals K","M"],
    ["4_2","Product of Array Except Self","M"],
    ["4_3","Continuous Subarray Sum","M"],
    ["4_4","Subarray Sums Divisible by K","M"],
    ["4_5","Count Subarrays with Given XOR","M"],
    ["4_6","Find Pivot Index (Equilibrium Index)","E"],
    ["4_7","Range Sum Query – Immutable","E"],
    ["4_8","Range Sum Query 2D – Immutable","M"],
    ["4_9","Longest Subarray with Sum K","M"],
  ]},
  { id:5, cat:"arrays", name:"Kadane's Algorithm (Max Subarray)", qs:[
    ["5_1","Maximum Subarray (Kadane's)","M"],
    ["5_2","Maximum Product Subarray","M"],
    ["5_3","Best Time to Buy and Sell Stock","E"],
    ["5_4","Best Time to Buy and Sell Stock II","M"],
    ["5_5","Maximum Sum Circular Subarray","M"],
    ["5_6","Minimum Size Subarray Sum","M"],
  ]},
  { id:6, cat:"arrays", name:"Sorting Based Patterns", qs:[
    ["6_1","Bubble Sort","E"],
    ["6_2","Selection Sort","E"],
    ["6_3","Insertion Sort","E"],
    ["6_4","Merge Sort","M"],
    ["6_5","Quick Sort","M"],
    ["6_6","Sort Array by Parity","E"],
    ["6_7","Merge Intervals","M"],
    ["6_8","Insert Interval","M"],
    ["6_9","Non-overlapping Intervals","M"],
    ["6_10","Largest Number","M"],
    ["6_11","Meeting Rooms II","M"],
    ["6_12","Kth Largest Element in Array","M"],
    ["6_13","Maximum Gap (Bucket Sort)","H"],
    ["6_14","Wiggle Sort II","M"],
    ["6_15","Minimum Swaps to Sort Array","M"],
    ["6_16","Pancake Sorting","M"],
    ["6_17","Sort a Nearly Sorted (K-Sorted) Array","M"],
  ]},
  { id:7, cat:"arrays", name:"HashMap / Frequency Counting", qs:[
    ["7_1","Two Sum","E"],
    ["7_2","Group Anagrams","M"],
    ["7_3","Top K Frequent Elements","M"],
    ["7_4","Valid Anagram","E"],
    ["7_5","Longest Consecutive Sequence","M"],
    ["7_6","Majority Element","E"],
    ["7_7","Majority Element II","M"],
    ["7_8","Subarray with Zero Sum","M"],
    ["7_9","Count of Subarrays with Given Sum","M"],
    ["7_10","Isomorphic Strings","E"],
    ["7_11","Word Pattern","E"],
    ["7_12","First Non-Repeating Character","E"],
    ["7_13","Longest Subarray with Equal 0s and 1s","M"],
    ["7_14","4 Sum Count","M"],
    ["7_15","Pairs with Given Difference","M"],
    ["7_16","Count Zero-Filled Subarrays","M"],
  ]},

  /* ── LINKED LIST ── */
  { id:8, cat:"linked", name:"Fast & Slow (Cycle Detection)", qs:[
    ["8_1","Linked List Cycle Detection","E"],
    ["8_2","Linked List Cycle II – Find Start","M"],
    ["8_3","Middle of the Linked List","E"],
    ["8_4","Find the Duplicate Number (Floyd's Cycle)","M"],
    ["8_5","Happy Number (Fast/Slow)","E"],
    ["8_6","Reorder List","M"],
  ]},
  { id:9, cat:"linked", name:"Reversal Pattern (Linked List)", qs:[
    ["9_1","Reverse Linked List (Iterative)","E"],
    ["9_2","Reverse Linked List (Recursive)","E"],
    ["9_3","Reverse Linked List II (Sublist)","M"],
    ["9_4","Reverse Nodes in k-Group","H"],
    ["9_5","Palindrome Linked List","E"],
    ["9_6","Rotate List","M"],
    ["9_7","Swap Nodes in Pairs","M"],
    ["9_8","Odd Even Linked List","M"],
  ]},
  { id:10, cat:"linked", name:"Merge & Other LL Patterns", qs:[
    ["10_1","Merge Two Sorted Lists","E"],
    ["10_2","Merge K Sorted Lists","H"],
    ["10_3","Add Two Numbers","M"],
    ["10_4","Add Two Numbers II","M"],
    ["10_5","Intersection of Two Linked Lists","E"],
    ["10_6","Remove Nth Node From End of List","M"],
    ["10_7","Remove Duplicates from Sorted List","E"],
    ["10_8","Remove Duplicates from Sorted List II","M"],
    ["10_9","Sort List (Merge Sort on LL)","M"],
    ["10_10","Copy List with Random Pointer","M"],
    ["10_11","Flatten a Multilevel Doubly Linked List","M"],
    ["10_12","Delete Node in a Linked List","M"],
    ["10_13","Remove Linked List Elements","E"],
    ["10_14","Reverse Alternate K Nodes","M"],
  ]},

  /* ── STACK & QUEUE ── */
  { id:11, cat:"stackq", name:"Monotonic Stack", qs:[
    ["11_1","Next Greater Element I","E"],
    ["11_2","Next Greater Element II (Circular Array)","M"],
    ["11_3","Daily Temperatures","M"],
    ["11_4","Previous Smaller Element","M"],
    ["11_5","Largest Rectangle in Histogram","H"],
    ["11_6","Maximal Rectangle in Binary Matrix","H"],
    ["11_7","Remove K Digits","M"],
    ["11_8","132 Pattern","M"],
    ["11_9","Stock Span Problem","M"],
    ["11_10","Sum of Subarray Minimums","M"],
    ["11_11","Min Stack","M"],
    ["11_12","Online Stock Span","M"],
    ["11_13","Trapping Rain Water (Stack Approach)","H"],
    ["11_14","Buildings with an Ocean View","M"],
    ["11_15","Count Submatrices with All Ones","H"],
  ]},
  { id:12, cat:"stackq", name:"Queue Simulation / Design", qs:[
    ["12_1","Implement Queue using Stacks","E"],
    ["12_2","Implement Stack using Queues","E"],
    ["12_3","Design Circular Queue","M"],
    ["12_4","Sliding Window Maximum","H"],
    ["12_5","LRU Cache","M"],
    ["12_6","LFU Cache","H"],
    ["12_7","First Non-Repeating Character in Stream","M"],
    ["12_8","Valid Parentheses","E"],
    ["12_9","Decode String","M"],
    ["12_10","Asteroid Collision","M"],
    ["12_11","Design Hit Counter","M"],
    ["12_12","Maximum Frequency Stack","H"],
  ]},

  /* ── BINARY SEARCH ── */
  { id:13, cat:"binsearch", name:"Classic Binary Search", qs:[
    ["13_1","Binary Search (Standard)","E"],
    ["13_2","Search in Rotated Sorted Array","M"],
    ["13_3","Search in Rotated Sorted Array II (Duplicates)","M"],
    ["13_4","Find Minimum in Rotated Sorted Array","M"],
    ["13_5","Find Minimum in Rotated Sorted Array II","H"],
    ["13_6","First and Last Position of Element in Sorted Array","M"],
    ["13_7","Search a 2D Matrix","M"],
    ["13_8","Search a 2D Matrix II","M"],
    ["13_9","Count Occurrences of Element in Sorted Array","E"],
    ["13_10","Floor and Ceil in a Sorted Array","E"],
    ["13_11","Single Element in a Sorted Array","M"],
    ["13_12","Sqrt(x) using Binary Search","E"],
    ["13_13","Find Peak Element","M"],
    ["13_14","Find in Mountain Array","H"],
    ["13_15","Row with Maximum 1s (Sorted Binary Matrix)","E"],
  ]},
  { id:14, cat:"binsearch", name:"Binary Search on Answer", qs:[
    ["14_1","Koko Eating Bananas","M"],
    ["14_2","Minimum Days to Make m Bouquets","M"],
    ["14_3","Find the Smallest Divisor Given a Threshold","M"],
    ["14_4","Capacity to Ship Packages Within D Days","M"],
    ["14_5","Aggressive Cows","H"],
    ["14_6","Book Allocation Problem","H"],
    ["14_7","Painter's Partition Problem","H"],
    ["14_8","Split Array Largest Sum","H"],
    ["14_9","Median of Two Sorted Arrays","H"],
    ["14_10","Kth Element of Two Sorted Arrays","M"],
    ["14_11","Nth Root of M (Binary Search)","M"],
    ["14_12","Minimum Time to Complete Trips","M"],
    ["14_13","Minimum Number of Days to Disconnect Island","H"],
    ["14_14","Maximum Average Subarray II (Float BS)","H"],
    ["14_15","Cutting Ribbons","M"],
  ]},

  /* ── TREES ── */
  { id:15, cat:"trees", name:"DFS (Pre/In/Postorder Traversal)", qs:[
    ["15_1","Binary Tree Preorder Traversal","E"],
    ["15_2","Binary Tree Inorder Traversal","E"],
    ["15_3","Binary Tree Postorder Traversal","E"],
    ["15_4","Preorder Traversal (Iterative)","M"],
    ["15_5","Inorder Traversal (Iterative)","M"],
    ["15_6","Postorder Traversal (Iterative)","H"],
    ["15_7","Height (Max Depth) of Binary Tree","E"],
    ["15_8","Diameter of Binary Tree","E"],
    ["15_9","Check if Binary Tree is Balanced","E"],
    ["15_10","Same Tree","E"],
    ["15_11","Symmetric Tree","E"],
    ["15_12","Invert Binary Tree","E"],
    ["15_13","Path Sum","E"],
    ["15_14","Path Sum II (All Root-to-Leaf Paths)","M"],
    ["15_15","Binary Tree Maximum Path Sum","H"],
    ["15_16","Lowest Common Ancestor of Binary Tree","M"],
    ["15_17","Count Complete Tree Nodes","M"],
    ["15_18","Construct BT from Preorder + Inorder","M"],
    ["15_19","Construct BT from Postorder + Inorder","M"],
    ["15_20","Flatten Binary Tree to Linked List","M"],
    ["15_21","Morris Traversal – Inorder","H"],
    ["15_22","Morris Traversal – Preorder","H"],
    ["15_23","Children Sum Property","M"],
    ["15_24","All Nodes at Distance K in Binary Tree","M"],
    ["15_25","Time to Burn a Binary Tree","H"],
    ["15_26","Maximum Difference Between Node and Ancestor","M"],
    ["15_27","Count Good Nodes in Binary Tree","M"],
    ["15_28","Sum of Distances in Tree","H"],
    ["15_29","Serialize and Deserialize Binary Tree","H"],
    ["15_30","Find Leaves of Binary Tree","M"],
    ["15_31","Verify Preorder Sequence in BST","M"],
  ]},
  { id:16, cat:"trees", name:"BFS (Level Order Traversal)", qs:[
    ["16_1","Binary Tree Level Order Traversal","M"],
    ["16_2","Binary Tree Zigzag Level Order","M"],
    ["16_3","Binary Tree Right Side View","M"],
    ["16_4","Binary Tree Left Side View","M"],
    ["16_5","Average of Levels in Binary Tree","E"],
    ["16_6","Maximum Width of Binary Tree","M"],
    ["16_7","Populating Next Right Pointers I","M"],
    ["16_8","Populating Next Right Pointers II","M"],
    ["16_9","Vertical Order Traversal","H"],
    ["16_10","Top View of Binary Tree","M"],
    ["16_11","Bottom View of Binary Tree","M"],
    ["16_12","Diagonal Traversal of Binary Tree","M"],
    ["16_13","Boundary Traversal of Binary Tree","M"],
    ["16_14","Level Order Successor","E"],
    ["16_15","Connect Level Order Siblings","M"],
    ["16_16","Minimum Depth of Binary Tree","E"],
  ]},
  { id:17, cat:"trees", name:"BST Patterns", qs:[
    ["17_1","Search in a BST","E"],
    ["17_2","Insert into a BST","M"],
    ["17_3","Delete Node in a BST","M"],
    ["17_4","Validate BST","M"],
    ["17_5","Floor in BST","M"],
    ["17_6","Ceil in BST","M"],
    ["17_7","Kth Smallest Element in a BST","M"],
    ["17_8","Kth Largest Element in a BST","M"],
    ["17_9","Lowest Common Ancestor of BST","M"],
    ["17_10","Construct BST from Preorder Traversal","M"],
    ["17_11","BST to Greater Sum Tree","M"],
    ["17_12","Two Sum IV – Input is a BST","E"],
    ["17_13","Recover BST (Two Nodes Swapped)","H"],
    ["17_14","Convert Sorted Array to BST","E"],
    ["17_15","Merge Two BSTs","H"],
    ["17_16","In-order Successor in BST","M"],
    ["17_17","Trim a BST","M"],
    ["17_18","Range Sum of BST","E"],
  ]},

  /* ── GRAPHS ── */
  { id:18, cat:"graphs", name:"BFS / DFS on Grid & Graphs", qs:[
    ["18_1","BFS of Graph","E"],
    ["18_2","DFS of Graph","E"],
    ["18_3","Number of Islands","M"],
    ["18_4","Flood Fill","E"],
    ["18_5","Max Area of Island","M"],
    ["18_6","Surrounded Regions","M"],
    ["18_7","Rotting Oranges","M"],
    ["18_8","01 Matrix – Distance of Nearest Zero","M"],
    ["18_9","Word Search","M"],
    ["18_10","Number of Enclaves","M"],
    ["18_11","Distinct Islands","M"],
    ["18_12","Bipartite Graph Check (BFS)","M"],
    ["18_13","Bipartite Graph Check (DFS)","M"],
    ["18_14","Detect Cycle in Undirected Graph (DFS)","M"],
    ["18_15","Detect Cycle in Undirected Graph (BFS)","M"],
    ["18_16","Detect Cycle in Directed Graph (DFS)","M"],
    ["18_17","Shortest Path in Binary Matrix","M"],
    ["18_18","Distance of Nearest Cell Having 1","M"],
    ["18_19","Replace O's with X's","M"],
    ["18_20","Number of Provinces","M"],
  ]},
  { id:19, cat:"graphs", name:"Topological Sort", qs:[
    ["19_1","Topological Sort (DFS)","M"],
    ["19_2","Topological Sort (BFS / Kahn's Algorithm)","M"],
    ["19_3","Detect Cycle in Directed Graph (Topo)","M"],
    ["19_4","Course Schedule","M"],
    ["19_5","Course Schedule II","M"],
    ["19_6","Find Eventual Safe States","M"],
    ["19_7","Alien Dictionary","H"],
    ["19_8","Sequence Reconstruction","M"],
    ["19_9","Parallel Courses","M"],
    ["19_10","Longest Path in a DAG","M"],
    ["19_11","Shortest Path in a DAG","M"],
    ["19_12","All Paths from Source to Target","M"],
    ["19_13","Minimum Height Trees","M"],
    ["19_14","Build Order (Dependency Resolution)","M"],
    ["19_15","Minimum Time to Collect All Apples in a Tree","M"],
  ]},
  { id:20, cat:"graphs", name:"Dijkstra / Shortest Path / MST", qs:[
    ["20_1","Dijkstra's Algorithm (Shortest Path)","M"],
    ["20_2","Bellman Ford Algorithm","M"],
    ["20_3","Floyd Warshall Algorithm","H"],
    ["20_4","Path with Minimum Effort","M"],
    ["20_5","Cheapest Flights Within K Stops","M"],
    ["20_6","Network Delay Time","M"],
    ["20_7","Number of Ways to Arrive at Destination","M"],
    ["20_8","Minimum Multiplications to Reach End","M"],
    ["20_9","City with Smallest Number of Reachable Neighbors","M"],
    ["20_10","Minimum Spanning Tree – Prim's Algorithm","M"],
    ["20_11","Minimum Spanning Tree – Kruskal's Algorithm","M"],
    ["20_12","Minimum Weighted Cycle in a Graph","H"],
    ["20_13","Connecting Cities with Minimum Cost","M"],
    ["20_14","Critical Connections in a Network (Bridges)","H"],
    ["20_15","Swim in Rising Water","H"],
  ]},
  { id:21, cat:"graphs", name:"Union Find (DSU)", qs:[
    ["21_1","Number of Provinces (DSU)","M"],
    ["21_2","Number of Connected Components","M"],
    ["21_3","Redundant Connection","M"],
    ["21_4","Most Stones Removed with Same Row or Column","M"],
    ["21_5","Accounts Merge","M"],
    ["21_6","Number of Islands II (Dynamic Connections)","H"],
    ["21_7","Making a Large Island","H"],
    ["21_8","Satisfiability of Equality Equations","M"],
    ["21_9","Graph Valid Tree (DSU)","M"],
    ["21_10","Minimum Spanning Tree (Kruskal's + DSU)","M"],
    ["21_11","Is Graph Bipartite (DSU)","M"],
    ["21_12","Longest Consecutive Sequence (DSU)","M"],
    ["21_13","Minimize Malware Spread","H"],
  ]},

  /* ── HEAPS ── */
  { id:22, cat:"heaps", name:"Top K Elements (Heaps)", qs:[
    ["22_1","Kth Largest Element in an Array","M"],
    ["22_2","Kth Smallest Element in an Array","M"],
    ["22_3","Top K Frequent Elements","M"],
    ["22_4","K Closest Points to Origin","M"],
    ["22_5","Sort a K-Sorted Array","M"],
    ["22_6","Find K Pairs with Smallest Sums","M"],
    ["22_7","Kth Largest in Stream","E"],
    ["22_8","Task Scheduler","M"],
    ["22_9","Reorganize String","M"],
    ["22_10","Minimum Cost to Connect Sticks","M"],
    ["22_11","Minimum Cost to Hire K Workers","H"],
    ["22_12","Maximum Performance of a Team","H"],
  ]},
  { id:23, cat:"heaps", name:"Two Heaps", qs:[
    ["23_1","Find Median from Data Stream","H"],
    ["23_2","Sliding Window Median","H"],
    ["23_3","IPO – Maximize Capital","H"],
    ["23_4","Merge K Sorted Lists (Heap)","H"],
    ["23_5","K-th Smallest in Sorted Matrix (Heap)","M"],
  ]},

  /* ── DYNAMIC PROGRAMMING ── */
  { id:24, cat:"dp", name:"1D Dynamic Programming", qs:[
    ["24_1","Climbing Stairs","E"],
    ["24_2","Frog Jump (GFG)","E"],
    ["24_3","Frog Jump with K Steps","M"],
    ["24_4","House Robber","M"],
    ["24_5","House Robber II (Circular)","M"],
    ["24_6","Jump Game","M"],
    ["24_7","Jump Game II","M"],
    ["24_8","Min Cost Climbing Stairs","E"],
    ["24_9","Decode Ways","M"],
    ["24_10","Perfect Squares","M"],
    ["24_11","Word Break","M"],
    ["24_12","Coin Change (Minimum Coins)","M"],
    ["24_13","Coin Change II (Number of Ways)","M"],
    ["24_14","Maximum Sum of Non-Adjacent Elements","M"],
    ["24_15","Minimum Cost to Cut a Stick","H"],
    ["24_16","Number of Dice Rolls with Target Sum","M"],
    ["24_17","Paint Houses","M"],
  ]},
  { id:25, cat:"dp", name:"2D Dynamic Programming", qs:[
    ["25_1","Unique Paths","M"],
    ["25_2","Unique Paths II (With Obstacles)","M"],
    ["25_3","Minimum Path Sum","M"],
    ["25_4","Triangle – Minimum Path Top to Bottom","M"],
    ["25_5","Maximal Square","M"],
    ["25_6","Cherry Pickup","H"],
    ["25_7","Dungeon Game","H"],
    ["25_8","Minimum Falling Path Sum","M"],
    ["25_9","Count Paths in Grid with Obstacles","M"],
    ["25_10","Count Square Submatrices with All Ones","M"],
    ["25_11","Largest Plus Sign","M"],
    ["25_12","Gold Mine Problem","M"],
    ["25_13","Maximum Points on a Line (2D DP)","H"],
    ["25_14","Number of Paths with Max Score","H"],
    ["25_15","Maximal Rectangle (DP + Stack)","H"],
  ]},
  { id:26, cat:"dp", name:"Knapsack DP", qs:[
    ["26_1","0/1 Knapsack","M"],
    ["26_2","Subset Sum","M"],
    ["26_3","Partition Equal Subset Sum","M"],
    ["26_4","Count Subsets with Sum K","M"],
    ["26_5","Last Stone Weight II","M"],
    ["26_6","Target Sum (Assign +/- to Array)","M"],
    ["26_7","Count Partitions with Difference D","M"],
    ["26_8","Unbounded Knapsack","M"],
    ["26_9","Rod Cutting Problem","M"],
    ["26_10","Minimum Coin Change (Unbounded)","M"],
    ["26_11","Count Ways – Unbounded Coin Change","M"],
    ["26_12","Minimum Ribbon Cut","M"],
    ["26_13","Count of Subset Sum (Modular Arithmetic)","M"],
    ["26_14","Subset Sum Equal to Half of Array","M"],
    ["26_15","Minimum Difference Subset Partition","M"],
  ]},
  { id:27, cat:"dp", name:"LCS / LIS Patterns", qs:[
    ["27_1","Longest Common Subsequence","M"],
    ["27_2","Print the LCS","M"],
    ["27_3","Longest Increasing Subsequence","M"],
    ["27_4","Print the LIS","M"],
    ["27_5","LIS using Binary Search (Patience Sorting)","M"],
    ["27_6","Largest Divisible Subset","M"],
    ["27_7","Maximum Length of Pair Chain","M"],
    ["27_8","Number of Longest Increasing Subsequences","M"],
    ["27_9","Russian Doll Envelopes","H"],
    ["27_10","Longest Bitonic Subsequence","M"],
    ["27_11","Minimum Number of Insertions (LCS)","M"],
    ["27_12","Longest Common Substring","M"],
  ]},
  { id:28, cat:"dp", name:"DP on Strings", qs:[
    ["28_1","Edit Distance","M"],
    ["28_2","Wildcard Matching","H"],
    ["28_3","Regular Expression Matching","H"],
    ["28_4","Longest Palindromic Subsequence","M"],
    ["28_5","Longest Palindromic Substring","M"],
    ["28_6","Count Palindromic Subsequences","H"],
    ["28_7","Shortest Common Supersequence","M"],
    ["28_8","Minimum Insertions to Make String Palindrome","M"],
    ["28_9","Minimum Deletions to Make String Palindrome","M"],
    ["28_10","Distinct Subsequences","H"],
    ["28_11","Minimum Insertions/Deletions to Convert String","M"],
    ["28_12","Count Palindromic Substrings","M"],
    ["28_13","Word Break II (All Sentences)","H"],
    ["28_14","Palindrome Partitioning II (Min Cuts)","H"],
  ]},
  { id:29, cat:"dp", name:"DP on Trees", qs:[
    ["29_1","Diameter of Binary Tree (DP)","E"],
    ["29_2","Maximum Path Sum in Binary Tree (DP)","H"],
    ["29_3","House Robber III (Non-Adjacent Tree Nodes)","M"],
    ["29_4","Binary Tree Cameras (Tree DP)","H"],
    ["29_5","Count Unique BST Structures (Catalan)","M"],
    ["29_6","Distribute Coins in Binary Tree","M"],
    ["29_7","Sum of Distances in Tree (Re-rooting DP)","H"],
    ["29_8","Number of Good Leaf Node Pairs","M"],
  ]},

  /* ── OTHERS ── */
  { id:30, cat:"others", name:"Backtracking", qs:[
    ["30_1","Subsets (Power Set)","M"],
    ["30_2","Subsets II (With Duplicates)","M"],
    ["30_3","Combination Sum I","M"],
    ["30_4","Combination Sum II","M"],
    ["30_5","Combination Sum III","M"],
    ["30_6","Permutations I","M"],
    ["30_7","Permutations II (With Duplicates)","M"],
    ["30_8","N-Queens","H"],
    ["30_9","N-Queens II (Count Solutions)","H"],
    ["30_10","Sudoku Solver","H"],
    ["30_11","Word Search (Backtracking)","M"],
    ["30_12","Letter Combinations of a Phone Number","M"],
    ["30_13","Generate Parentheses","M"],
    ["30_14","Palindrome Partitioning","M"],
    ["30_15","Rat in a Maze","M"],
    ["30_16","M-Coloring Problem","M"],
    ["30_17","Word Break II (Backtracking)","H"],
    ["30_18","K-th Permutation Sequence","H"],
    ["30_19","Beautiful Arrangement","M"],
  ]},
  { id:31, cat:"others", name:"Greedy Algorithms", qs:[
    ["31_1","N Meetings in One Room (Activity Selection)","E"],
    ["31_2","Job Sequencing Problem","M"],
    ["31_3","Fractional Knapsack","M"],
    ["31_4","Minimum Platforms","M"],
    ["31_5","Jump Game (Greedy)","M"],
    ["31_6","Jump Game II (Greedy)","M"],
    ["31_7","Candy","H"],
    ["31_8","Gas Station","M"],
    ["31_9","Insert Interval","M"],
    ["31_10","Minimum Number of Arrows to Burst Balloons","M"],
    ["31_11","Lemonade Change","E"],
    ["31_12","Assign Cookies","E"],
    ["31_13","Valid Parenthesis String","M"],
    ["31_14","Two City Scheduling","M"],
    ["31_15","Maximum Performance of a Team (Greedy+Heap)","H"],
    ["31_16","Minimum Cost to Move Chips","E"],
    ["31_17","Maximum Profit in Job Scheduling","H"],
  ]},
  { id:32, cat:"others", name:"Bit Manipulation", qs:[
    ["32_1","Number of 1 Bits (Hamming Weight)","E"],
    ["32_2","Reverse Bits","E"],
    ["32_3","Single Number I","E"],
    ["32_4","Single Number II","M"],
    ["32_5","Single Number III (Two Non-Repeating)","M"],
    ["32_6","Power of Two","E"],
    ["32_7","Missing Number (XOR)","E"],
    ["32_8","XOR from L to R","E"],
    ["32_9","Divide Two Integers (Bit Ops)","M"],
    ["32_10","Minimum XOR Value Pair","M"],
    ["32_11","Count Subsets using Bitmask","M"],
    ["32_12","Find Two Numbers with Odd Occurrences","M"],
    ["32_13","Counting Bits (0 to N)","E"],
    ["32_14","Sum of XOR of All Pairs","M"],
    ["32_15","Number of Valid Words for Each Puzzle","H"],
  ]},
  { id:33, cat:"others", name:"Trie", qs:[
    ["33_1","Implement Trie (Insert, Search, StartsWith)","M"],
    ["33_2","Implement Trie II (Count Prefix & Word)","M"],
    ["33_3","Longest String with All Prefixes","M"],
    ["33_4","Count Distinct Substrings Using Trie","H"],
    ["33_5","Search Suggestions System","M"],
    ["33_6","Maximum XOR of Two Numbers in Array (Trie)","M"],
    ["33_7","Maximum XOR with Element from Array (Offline)","H"],
    ["33_8","Word Search II (Trie + Backtracking)","H"],
    ["33_9","Replace Words","M"],
    ["33_10","Map Sum Pairs","M"],
    ["33_11","Palindrome Pairs (Trie)","H"],
    ["33_12","Concatenated Words (Trie)","H"],
  ]},
  { id:34, cat:"others", name:"Intervals", qs:[
    ["34_1","Merge Intervals","M"],
    ["34_2","Insert Interval","M"],
    ["34_3","Non-overlapping Intervals","M"],
    ["34_4","Meeting Rooms","E"],
    ["34_5","Meeting Rooms II","M"],
    ["34_6","Minimum Number of Arrows to Burst Balloons","M"],
    ["34_7","Employee Free Time","H"],
    ["34_8","Interval List Intersections","M"],
    ["34_9","Data Stream as Disjoint Intervals","H"],
    ["34_10","Range Module","H"],
  ]},
];

const DIFF_COLOR = { E:"#22c55e", M:"#f59e0b", H:"#ef4444" };
const DIFF_LABEL = { E:"Easy", M:"Medium", H:"Hard" };
const CAT_COLORS  = {
  arrays:"#6366f1", linked:"#8b5cf6", stackq:"#ec4899",
  binsearch:"#06b6d4", trees:"#10b981", graphs:"#f59e0b",
  heaps:"#f97316", dp:"#3b82f6", others:"#a855f7",
};

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function DSATracker() {
  const [solved, setSolved]           = useState({});
  const [activeCat, setActiveCat]     = useState("all");
  const [expanded, setExpanded]       = useState({});
  const [filter, setFilter]           = useState("all"); // all|todo|done
  const [search, setSearch]           = useState("");
  const [loaded, setLoaded]           = useState(false);

  /* ── Load from persistent storage ── */
  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get("dsa_v2_solved");
        if (r) setSolved(JSON.parse(r.value));
      } catch {}
      setLoaded(true);
    })();
  }, []);

  /* ── Save to persistent storage ── */
  useEffect(() => {
    if (!loaded) return;
    (async () => {
      try { await window.storage.set("dsa_v2_solved", JSON.stringify(solved)); } catch {}
    })();
  }, [solved, loaded]);

  const toggle = (qid) => setSolved(p => ({ ...p, [qid]: !p[qid] }));

  const togglePattern = (pid) => setExpanded(p => ({ ...p, [pid]: !p[pid] }));

  /* ── Derived stats ── */
  const allQs    = useMemo(() => PATTERNS.flatMap(p => p.qs), []);
  const totalQ   = allQs.length;
  const solvedQ  = useMemo(() => allQs.filter(q => solved[q[0]]).length, [allQs, solved]);
  const pct      = totalQ ? Math.round((solvedQ / totalQ) * 100) : 0;

  /* ── Filtered patterns ── */
  const visiblePatterns = useMemo(() => {
    const sq = search.toLowerCase();
    return PATTERNS.map(p => {
      let qs = p.qs;
      if (activeCat !== "all") qs = qs.filter(() => p.cat === activeCat);
      if (activeCat !== "all" && p.cat !== activeCat) return null;
      if (filter === "done")  qs = qs.filter(q => solved[q[0]]);
      if (filter === "todo")  qs = qs.filter(q => !solved[q[0]]);
      if (sq) qs = qs.filter(q => q[1].toLowerCase().includes(sq));
      if (qs.length === 0 && (filter !== "all" || sq)) return null;
      return { ...p, qs };
    }).filter(Boolean);
  }, [activeCat, filter, search, solved]);

  /* ── Pattern-level stats ── */
  const patternSolved = (p) => p.qs.filter(q => solved[q[0]]).length;

  if (!loaded) return (
    <div style={{
      display:"flex", alignItems:"center", justifyContent:"center",
      height:"100vh", background:"#0a0a0f", color:"#6366f1",
      fontFamily:"monospace", fontSize:18
    }}>Loading your progress…</div>
  );

  return (
    <div style={{
      minHeight:"100vh", background:"#0a0a0f",
      fontFamily:"'IBM Plex Mono', 'Fira Code', monospace",
      color:"#e2e8f0",
    }}>
      {/* ── HEADER ── */}
      <div style={{
        background:"linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)",
        borderBottom:"1px solid #1e293b", padding:"28px 24px 0",
      }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"flex-end", gap:16, flexWrap:"wrap" }}>
            <div>
              <div style={{ fontSize:11, color:"#6366f1", letterSpacing:4, textTransform:"uppercase", marginBottom:4 }}>
                Striver A2Z × 34 Patterns
              </div>
              <h1 style={{ margin:0, fontSize:28, fontWeight:700, color:"#f1f5f9", lineHeight:1.1 }}>
                DSA Master Tracker
              </h1>
            </div>
            <div style={{ marginLeft:"auto", textAlign:"right" }}>
              <div style={{ fontSize:36, fontWeight:800, color:"#6366f1", lineHeight:1 }}>
                {solvedQ}<span style={{ fontSize:18, color:"#475569" }}>/{totalQ}</span>
              </div>
              <div style={{ fontSize:12, color:"#64748b" }}>questions solved</div>
            </div>
          </div>

          {/* Overall progress bar */}
          <div style={{ marginTop:20 }}>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"#64748b", marginBottom:6 }}>
              <span>Overall Progress</span>
              <span style={{ color: pct===100?"#22c55e":"#6366f1" }}>{pct}%</span>
            </div>
            <div style={{ height:8, background:"#1e293b", borderRadius:99, overflow:"hidden" }}>
              <div style={{
                height:"100%", borderRadius:99,
                background:"linear-gradient(90deg,#6366f1,#8b5cf6)",
                width:`${pct}%`, transition:"width .4s ease",
              }}/>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display:"flex", gap:20, marginTop:16, flexWrap:"wrap" }}>
            {["E","M","H"].map(d => {
              const tot  = allQs.filter(q=>q[2]===d).length;
              const done = allQs.filter(q=>q[2]===d && solved[q[0]]).length;
              return (
                <div key={d} style={{ display:"flex", alignItems:"center", gap:8, fontSize:12 }}>
                  <span style={{
                    display:"inline-block", width:8, height:8, borderRadius:"50%",
                    background: DIFF_COLOR[d]
                  }}/>
                  <span style={{ color:"#94a3b8" }}>{DIFF_LABEL[d]}</span>
                  <span style={{ color: DIFF_COLOR[d], fontWeight:700 }}>{done}/{tot}</span>
                </div>
              );
            })}
          </div>

          {/* Category tabs */}
          <div style={{
            display:"flex", gap:4, marginTop:20, overflowX:"auto",
            paddingBottom:0, scrollbarWidth:"none"
          }}>
            {CATEGORIES.map(c => (
              <button key={c.id} onClick={() => setActiveCat(c.id)} style={{
                flex:"0 0 auto",
                padding:"8px 14px",
                borderRadius:"8px 8px 0 0",
                border:"none", cursor:"pointer",
                fontSize:12, fontFamily:"inherit",
                background: activeCat===c.id ? "#0a0a0f" : "transparent",
                color: activeCat===c.id ? "#6366f1" : "#64748b",
                borderBottom: activeCat===c.id ? "2px solid #6366f1" : "2px solid transparent",
                transition:"all .2s",
                whiteSpace:"nowrap",
              }}>
                {c.emoji} {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTROLS ── */}
      <div style={{
        background:"#0d1117", borderBottom:"1px solid #1e293b",
        padding:"12px 24px", position:"sticky", top:0, zIndex:50,
      }}>
        <div style={{
          maxWidth:1100, margin:"0 auto",
          display:"flex", gap:12, alignItems:"center", flexWrap:"wrap"
        }}>
          {/* Search */}
          <input
            value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="🔍  Search questions…"
            style={{
              flex:"1 1 220px", padding:"8px 12px",
              background:"#1e293b", border:"1px solid #334155",
              borderRadius:8, color:"#e2e8f0", fontSize:13,
              fontFamily:"inherit", outline:"none",
            }}
          />

          {/* Filter */}
          {["all","todo","done"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding:"7px 16px", borderRadius:8,
              border:`1px solid ${filter===f?"#6366f1":"#334155"}`,
              background: filter===f?"#1e1b4b":"transparent",
              color: filter===f?"#818cf8":"#64748b",
              cursor:"pointer", fontSize:12, fontFamily:"inherit",
              transition:"all .2s",
            }}>
              {f==="all"?"All":f==="todo"?"To Do":"Done"}
            </button>
          ))}

          {/* Expand all / collapse all */}
          <button onClick={() => {
            const ids = visiblePatterns.map(p=>p.id);
            const allOpen = ids.every(id=>expanded[id]);
            const next = {};
            ids.forEach(id => { next[id] = !allOpen; });
            setExpanded(p => ({ ...p, ...next }));
          }} style={{
            padding:"7px 16px", borderRadius:8,
            border:"1px solid #334155", background:"transparent",
            color:"#64748b", cursor:"pointer", fontSize:12, fontFamily:"inherit",
          }}>
            {visiblePatterns.every(p=>expanded[p.id]) ? "⊟ Collapse All" : "⊞ Expand All"}
          </button>

          <span style={{ marginLeft:"auto", fontSize:12, color:"#475569" }}>
            {visiblePatterns.length} patterns · {visiblePatterns.reduce((a,p)=>a+p.qs.length,0)} questions
          </span>
        </div>
      </div>

      {/* ── PATTERN CARDS ── */}
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"24px" }}>
        {visiblePatterns.length === 0 ? (
          <div style={{ textAlign:"center", color:"#475569", padding:60, fontSize:14 }}>
            No questions match your filters.
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {visiblePatterns.map(p => {
              const done   = patternSolved(p);
              const total  = p.qs.length;
              const ppct   = total ? Math.round((done/total)*100) : 0;
              const accent = CAT_COLORS[p.cat] || "#6366f1";
              const open   = !!expanded[p.id];

              return (
                <div key={p.id} style={{
                  background:"#111827",
                  border:`1px solid ${open ? accent+"44" : "#1e293b"}`,
                  borderRadius:12, overflow:"hidden",
                  transition:"border-color .2s",
                }}>
                  {/* Card header */}
                  <button onClick={() => togglePattern(p.id)} style={{
                    width:"100%", padding:"16px 20px",
                    display:"flex", alignItems:"center", gap:14,
                    background:"none", border:"none", cursor:"pointer",
                    textAlign:"left", color:"inherit",
                  }}>
                    {/* Pattern number badge */}
                    <span style={{
                      flex:"0 0 36px", height:36, borderRadius:8,
                      background: accent+"22",
                      border:`1px solid ${accent}44`,
                      color: accent,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:13, fontWeight:700,
                    }}>
                      {p.id}
                    </span>

                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:14, fontWeight:600, color:"#e2e8f0", marginBottom:6 }}>
                        Pattern {p.id} — {p.name}
                      </div>
                      {/* Mini progress */}
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <div style={{
                          flex:1, height:4, background:"#1e293b", borderRadius:99, maxWidth:200
                        }}>
                          <div style={{
                            height:"100%", borderRadius:99,
                            background: ppct===100?"#22c55e":accent,
                            width:`${ppct}%`, transition:"width .3s",
                          }}/>
                        </div>
                        <span style={{ fontSize:11, color: ppct===100?"#22c55e":"#64748b", flexShrink:0 }}>
                          {done}/{total} {ppct===100?"✓":""}
                        </span>
                      </div>
                    </div>

                    {/* Question count chips */}
                    <div style={{ display:"flex", gap:4, flexShrink:0 }}>
                      {["E","M","H"].map(d => {
                        const c = p.qs.filter(q=>q[2]===d).length;
                        return c > 0 ? (
                          <span key={d} style={{
                            fontSize:10, padding:"2px 6px", borderRadius:99,
                            background: DIFF_COLOR[d]+"22",
                            color: DIFF_COLOR[d], fontWeight:700,
                          }}>{c}{d}</span>
                        ) : null;
                      })}
                    </div>

                    <span style={{ color:"#475569", fontSize:18, flexShrink:0 }}>
                      {open ? "▾" : "▸"}
                    </span>
                  </button>

                  {/* Questions list */}
                  {open && (
                    <div style={{ borderTop:`1px solid #1e293b` }}>
                      {p.qs.map((q, idx) => {
                        const [qid, title, diff] = q;
                        const isDone = !!solved[qid];
                        return (
                          <div key={qid} onClick={() => toggle(qid)} style={{
                            display:"flex", alignItems:"center", gap:12,
                            padding:"11px 20px 11px 24px",
                            borderBottom: idx < p.qs.length-1 ? "1px solid #0f172a" : "none",
                            cursor:"pointer",
                            background: isDone ? "#052e16" : "transparent",
                            transition:"background .15s",
                          }}
                          onMouseEnter={e => {
                            if (!isDone) e.currentTarget.style.background="#1e293b";
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = isDone ? "#052e16" : "transparent";
                          }}>
                            {/* Checkbox */}
                            <div style={{
                              width:18, height:18, borderRadius:4, flexShrink:0,
                              border: isDone ? "none" : "2px solid #334155",
                              background: isDone ? accent : "transparent",
                              display:"flex", alignItems:"center", justifyContent:"center",
                              transition:"all .2s",
                            }}>
                              {isDone && <span style={{ color:"#fff", fontSize:11, lineHeight:1 }}>✓</span>}
                            </div>

                            {/* Number */}
                            <span style={{ fontSize:11, color:"#334155", flexShrink:0, minWidth:20 }}>
                              {idx+1}.
                            </span>

                            {/* Title */}
                            <span style={{
                              flex:1, fontSize:13,
                              color: isDone ? "#4ade80" : "#cbd5e1",
                              textDecoration: isDone ? "line-through" : "none",
                              textDecorationColor: "#166534",
                            }}>
                              {title}
                            </span>

                            {/* Difficulty */}
                            <span style={{
                              fontSize:11, padding:"2px 8px", borderRadius:99, flexShrink:0,
                              background: DIFF_COLOR[diff]+"22",
                              color: DIFF_COLOR[diff], fontWeight:600,
                            }}>
                              {DIFF_LABEL[diff]}
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
      </div>

      {/* ── FOOTER ── */}
      <div style={{
        textAlign:"center", padding:"32px 24px",
        color:"#334155", fontSize:11, borderTop:"1px solid #1e293b",
      }}>
        {totalQ} questions · 34 patterns · Striver A2Z Sheet aligned · Progress auto-saved
      </div>
    </div>
  );
}