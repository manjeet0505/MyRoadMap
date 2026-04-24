'use client';
import { useState, useEffect, useMemo } from "react";
import { createClient } from '@/lib/supabase';

const CATEGORIES = [
  { id: "all",        label: "All",               emoji: "🗂️" },
  { id: "arrays",     label: "Arrays & Strings",   emoji: "🔢" },
  { id: "linked",     label: "Linked List",         emoji: "🔗" },
  { id: "stackq",     label: "Stack & Queue",       emoji: "📚" },
  { id: "binsearch",  label: "Binary Search",       emoji: "🔍" },
  { id: "trees",      label: "Trees",               emoji: "🌳" },
  { id: "graphs",     label: "Graphs",              emoji: "🕸️" },
  { id: "heaps",      label: "Heaps",               emoji: "⛰️" },
  { id: "dp",         label: "Dynamic Programming", emoji: "💡" },
  { id: "others",     label: "Others",              emoji: "✨" },
];

/* Format: [id, title, difficulty, url] */
const PATTERNS = [
  { id:1, cat:"arrays", name:"Two Pointers (Opposite Ends)", qs:[
    ["1_1","Two Sum II – Input Array Is Sorted","M","https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/"],
    ["1_2","3Sum","M","https://leetcode.com/problems/3sum/"],
    ["1_3","4Sum","H","https://leetcode.com/problems/4sum/"],
    ["1_4","Container With Most Water","M","https://leetcode.com/problems/container-with-most-water/"],
    ["1_5","Trapping Rain Water","H","https://leetcode.com/problems/trapping-rain-water/"],
    ["1_6","Move Zeroes","E","https://leetcode.com/problems/move-zeroes/"],
    ["1_7","Remove Duplicates from Sorted Array","E","https://leetcode.com/problems/remove-duplicates-from-sorted-array/"],
    ["1_8","Remove Duplicates from Sorted Array II","M","https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/"],
    ["1_9","Valid Palindrome","E","https://leetcode.com/problems/valid-palindrome/"],
    ["1_10","Sort Colors (Dutch National Flag)","M","https://leetcode.com/problems/sort-colors/"],
    ["1_11","Boats to Save People","M","https://leetcode.com/problems/boats-to-save-people/"],
    ["1_12","Reverse Pairs","H","https://leetcode.com/problems/reverse-pairs/"],
    ["1_13","Count Inversions in Array (Merge Sort)","M","https://www.geeksforgeeks.org/count-inversions-in-an-array/"],
  ]},
  { id:2, cat:"arrays", name:"Sliding Window (Fixed + Variable)", qs:[
    ["2_1","Maximum Sum Subarray of Size K","E","https://www.geeksforgeeks.org/window-sliding-technique/"],
    ["2_2","Longest Substring Without Repeating Characters","M","https://leetcode.com/problems/longest-substring-without-repeating-characters/"],
    ["2_3","Minimum Window Substring","H","https://leetcode.com/problems/minimum-window-substring/"],
    ["2_4","Permutation in String","M","https://leetcode.com/problems/permutation-in-string/"],
    ["2_5","Find All Anagrams in a String","M","https://leetcode.com/problems/find-all-anagrams-in-a-string/"],
    ["2_6","Fruits into Baskets","M","https://leetcode.com/problems/fruit-into-baskets/"],
    ["2_7","Max Consecutive Ones III","M","https://leetcode.com/problems/max-consecutive-ones-iii/"],
    ["2_8","Number of Substrings Containing All 3 Characters","M","https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/"],
    ["2_9","Count Subarrays with K Different Integers","H","https://leetcode.com/problems/subarrays-with-k-different-integers/"],
    ["2_10","Subarray Product Less Than K","M","https://leetcode.com/problems/subarray-product-less-than-k/"],
    ["2_11","Longest Repeating Character Replacement","M","https://leetcode.com/problems/longest-repeating-character-replacement/"],
    ["2_12","Max Points You Can Obtain from Cards","M","https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/"],
    ["2_13","Binary Subarrays with Sum","M","https://leetcode.com/problems/binary-subarrays-with-sum/"],
    ["2_14","Count Nice Subarrays (Exactly K Odd)","M","https://leetcode.com/problems/count-number-of-nice-subarrays/"],
    ["2_15","Maximum Erasure Value","M","https://leetcode.com/problems/maximum-erasure-value/"],
  ]},
  { id:3, cat:"arrays", name:"Fast & Slow Pointers", qs:[
    ["3_1","Find the Duplicate Number","M","https://leetcode.com/problems/find-the-duplicate-number/"],
    ["3_2","Happy Number","E","https://leetcode.com/problems/happy-number/"],
    ["3_3","Missing Number (XOR/Floyd)","E","https://leetcode.com/problems/missing-number/"],
    ["3_4","Circular Array Loop","H","https://leetcode.com/problems/circular-array-loop/"],
    ["3_5","Find Kth Missing Positive Number","E","https://leetcode.com/problems/kth-missing-positive-number/"],
  ]},
  { id:4, cat:"arrays", name:"Prefix Sum", qs:[
    ["4_1","Subarray Sum Equals K","M","https://leetcode.com/problems/subarray-sum-equals-k/"],
    ["4_2","Product of Array Except Self","M","https://leetcode.com/problems/product-of-array-except-self/"],
    ["4_3","Continuous Subarray Sum","M","https://leetcode.com/problems/continuous-subarray-sum/"],
    ["4_4","Subarray Sums Divisible by K","M","https://leetcode.com/problems/subarray-sums-divisible-by-k/"],
    ["4_5","Count Subarrays with Given XOR","M","https://www.geeksforgeeks.org/count-of-subarrays-having-xor-of-elements-as-given-value-k/"],
    ["4_6","Find Pivot Index (Equilibrium Index)","E","https://leetcode.com/problems/find-pivot-index/"],
    ["4_7","Range Sum Query – Immutable","E","https://leetcode.com/problems/range-sum-query-immutable/"],
    ["4_8","Range Sum Query 2D – Immutable","M","https://leetcode.com/problems/range-sum-query-2d-immutable/"],
    ["4_9","Longest Subarray with Sum K","M","https://www.geeksforgeeks.org/longest-sub-array-sum-k/"],
  ]},
  { id:5, cat:"arrays", name:"Kadane's Algorithm (Max Subarray)", qs:[
    ["5_1","Maximum Subarray (Kadane's)","M","https://leetcode.com/problems/maximum-subarray/"],
    ["5_2","Maximum Product Subarray","M","https://leetcode.com/problems/maximum-product-subarray/"],
    ["5_3","Best Time to Buy and Sell Stock","E","https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"],
    ["5_4","Best Time to Buy and Sell Stock II","M","https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/"],
    ["5_5","Maximum Sum Circular Subarray","M","https://leetcode.com/problems/maximum-sum-circular-subarray/"],
    ["5_6","Minimum Size Subarray Sum","M","https://leetcode.com/problems/minimum-size-subarray-sum/"],
  ]},
  { id:6, cat:"arrays", name:"Sorting Based Patterns", qs:[
    ["6_1","Bubble Sort","E","https://www.geeksforgeeks.org/bubble-sort/"],
    ["6_2","Selection Sort","E","https://www.geeksforgeeks.org/selection-sort/"],
    ["6_3","Insertion Sort","E","https://www.geeksforgeeks.org/insertion-sort/"],
    ["6_4","Merge Sort","M","https://www.geeksforgeeks.org/merge-sort/"],
    ["6_5","Quick Sort","M","https://www.geeksforgeeks.org/quick-sort/"],
    ["6_6","Sort Array by Parity","E","https://leetcode.com/problems/sort-array-by-parity/"],
    ["6_7","Merge Intervals","M","https://leetcode.com/problems/merge-intervals/"],
    ["6_8","Insert Interval","M","https://leetcode.com/problems/insert-interval/"],
    ["6_9","Non-overlapping Intervals","M","https://leetcode.com/problems/non-overlapping-intervals/"],
    ["6_10","Largest Number","M","https://leetcode.com/problems/largest-number/"],
    ["6_11","Meeting Rooms II","M","https://www.geeksforgeeks.org/minimum-number-of-platforms-required-for-a-railway-station/"],
    ["6_12","Kth Largest Element in Array","M","https://leetcode.com/problems/kth-largest-element-in-an-array/"],
    ["6_13","Maximum Gap (Bucket Sort)","H","https://leetcode.com/problems/maximum-gap/"],
    ["6_14","Wiggle Sort II","M","https://leetcode.com/problems/wiggle-sort-ii/"],
    ["6_15","Minimum Swaps to Sort Array","M","https://www.geeksforgeeks.org/minimum-number-swaps-required-sort-array/"],
    ["6_16","Pancake Sorting","M","https://leetcode.com/problems/pancake-sorting/"],
    ["6_17","Sort a Nearly Sorted (K-Sorted) Array","M","https://www.geeksforgeeks.org/nearly-sorted-algorithm/"],
  ]},
  { id:7, cat:"arrays", name:"HashMap / Frequency Counting", qs:[
    ["7_1","Two Sum","E","https://leetcode.com/problems/two-sum/"],
    ["7_2","Group Anagrams","M","https://leetcode.com/problems/group-anagrams/"],
    ["7_3","Top K Frequent Elements","M","https://leetcode.com/problems/top-k-frequent-elements/"],
    ["7_4","Valid Anagram","E","https://leetcode.com/problems/valid-anagram/"],
    ["7_5","Longest Consecutive Sequence","M","https://leetcode.com/problems/longest-consecutive-sequence/"],
    ["7_6","Majority Element","E","https://leetcode.com/problems/majority-element/"],
    ["7_7","Majority Element II","M","https://leetcode.com/problems/majority-element-ii/"],
    ["7_8","Subarray with Zero Sum","M","https://www.geeksforgeeks.org/find-if-there-is-a-subarray-with-0-sum/"],
    ["7_9","Count of Subarrays with Given Sum","M","https://www.geeksforgeeks.org/number-subarrays-sum-exactly-equal-k/"],
    ["7_10","Isomorphic Strings","E","https://leetcode.com/problems/isomorphic-strings/"],
    ["7_11","Word Pattern","E","https://leetcode.com/problems/word-pattern/"],
    ["7_12","First Non-Repeating Character","E","https://www.geeksforgeeks.org/given-a-string-find-its-first-non-repeating-character/"],
    ["7_13","Longest Subarray with Equal 0s and 1s","M","https://www.geeksforgeeks.org/largest-subarray-with-equal-number-of-0s-and-1s/"],
    ["7_14","4 Sum Count","M","https://leetcode.com/problems/4sum-ii/"],
    ["7_15","Pairs with Given Difference","M","https://www.geeksforgeeks.org/count-pairs-difference-equal-k/"],
    ["7_16","Count Zero-Filled Subarrays","M","https://leetcode.com/problems/count-zero-filled-subarrays/"],
  ]},
  { id:8, cat:"linked", name:"Fast & Slow (Cycle Detection)", qs:[
    ["8_1","Linked List Cycle Detection","E","https://leetcode.com/problems/linked-list-cycle/"],
    ["8_2","Linked List Cycle II – Find Start","M","https://leetcode.com/problems/linked-list-cycle-ii/"],
    ["8_3","Middle of the Linked List","E","https://leetcode.com/problems/middle-of-the-linked-list/"],
    ["8_4","Find the Duplicate Number (Floyd's Cycle)","M","https://leetcode.com/problems/find-the-duplicate-number/"],
    ["8_5","Happy Number (Fast/Slow)","E","https://leetcode.com/problems/happy-number/"],
    ["8_6","Reorder List","M","https://leetcode.com/problems/reorder-list/"],
  ]},
  { id:9, cat:"linked", name:"Reversal Pattern (Linked List)", qs:[
    ["9_1","Reverse Linked List (Iterative)","E","https://leetcode.com/problems/reverse-linked-list/"],
    ["9_2","Reverse Linked List (Recursive)","E","https://leetcode.com/problems/reverse-linked-list/"],
    ["9_3","Reverse Linked List II (Sublist)","M","https://leetcode.com/problems/reverse-linked-list-ii/"],
    ["9_4","Reverse Nodes in k-Group","H","https://leetcode.com/problems/reverse-nodes-in-k-group/"],
    ["9_5","Palindrome Linked List","E","https://leetcode.com/problems/palindrome-linked-list/"],
    ["9_6","Rotate List","M","https://leetcode.com/problems/rotate-list/"],
    ["9_7","Swap Nodes in Pairs","M","https://leetcode.com/problems/swap-nodes-in-pairs/"],
    ["9_8","Odd Even Linked List","M","https://leetcode.com/problems/odd-even-linked-list/"],
  ]},
  { id:10, cat:"linked", name:"Merge & Other LL Patterns", qs:[
    ["10_1","Merge Two Sorted Lists","E","https://leetcode.com/problems/merge-two-sorted-lists/"],
    ["10_2","Merge K Sorted Lists","H","https://leetcode.com/problems/merge-k-sorted-lists/"],
    ["10_3","Add Two Numbers","M","https://leetcode.com/problems/add-two-numbers/"],
    ["10_4","Add Two Numbers II","M","https://leetcode.com/problems/add-two-numbers-ii/"],
    ["10_5","Intersection of Two Linked Lists","E","https://leetcode.com/problems/intersection-of-two-linked-lists/"],
    ["10_6","Remove Nth Node From End of List","M","https://leetcode.com/problems/remove-nth-node-from-end-of-list/"],
    ["10_7","Remove Duplicates from Sorted List","E","https://leetcode.com/problems/remove-duplicates-from-sorted-list/"],
    ["10_8","Remove Duplicates from Sorted List II","M","https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/"],
    ["10_9","Sort List (Merge Sort on LL)","M","https://leetcode.com/problems/sort-list/"],
    ["10_10","Copy List with Random Pointer","M","https://leetcode.com/problems/copy-list-with-random-pointer/"],
    ["10_11","Flatten a Multilevel Doubly Linked List","M","https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/"],
    ["10_12","Delete Node in a Linked List","M","https://leetcode.com/problems/delete-node-in-a-linked-list/"],
    ["10_13","Remove Linked List Elements","E","https://leetcode.com/problems/remove-linked-list-elements/"],
    ["10_14","Reverse Alternate K Nodes","M","https://www.geeksforgeeks.org/reverse-alternate-k-nodes-in-a-singly-linked-list/"],
  ]},
  { id:11, cat:"stackq", name:"Monotonic Stack", qs:[
    ["11_1","Next Greater Element I","E","https://leetcode.com/problems/next-greater-element-i/"],
    ["11_2","Next Greater Element II (Circular Array)","M","https://leetcode.com/problems/next-greater-element-ii/"],
    ["11_3","Daily Temperatures","M","https://leetcode.com/problems/daily-temperatures/"],
    ["11_4","Previous Smaller Element","M","https://www.geeksforgeeks.org/previous-smaller-element/"],
    ["11_5","Largest Rectangle in Histogram","H","https://leetcode.com/problems/largest-rectangle-in-histogram/"],
    ["11_6","Maximal Rectangle in Binary Matrix","H","https://leetcode.com/problems/maximal-rectangle/"],
    ["11_7","Remove K Digits","M","https://leetcode.com/problems/remove-k-digits/"],
    ["11_8","132 Pattern","M","https://leetcode.com/problems/132-pattern/"],
    ["11_9","Stock Span Problem","M","https://leetcode.com/problems/online-stock-span/"],
    ["11_10","Sum of Subarray Minimums","M","https://leetcode.com/problems/sum-of-subarray-minimums/"],
    ["11_11","Min Stack","M","https://leetcode.com/problems/min-stack/"],
    ["11_12","Online Stock Span","M","https://leetcode.com/problems/online-stock-span/"],
    ["11_13","Trapping Rain Water (Stack Approach)","H","https://leetcode.com/problems/trapping-rain-water/"],
    ["11_14","Buildings with an Ocean View","M","https://www.geeksforgeeks.org/count-buildings-facing-sunset/"],
    ["11_15","Count Submatrices with All Ones","H","https://leetcode.com/problems/count-submatrices-with-all-ones/"],
  ]},
  { id:12, cat:"stackq", name:"Queue Simulation / Design", qs:[
    ["12_1","Implement Queue using Stacks","E","https://leetcode.com/problems/implement-queue-using-stacks/"],
    ["12_2","Implement Stack using Queues","E","https://leetcode.com/problems/implement-stack-using-queues/"],
    ["12_3","Design Circular Queue","M","https://leetcode.com/problems/design-circular-queue/"],
    ["12_4","Sliding Window Maximum","H","https://leetcode.com/problems/sliding-window-maximum/"],
    ["12_5","LRU Cache","M","https://leetcode.com/problems/lru-cache/"],
    ["12_6","LFU Cache","H","https://leetcode.com/problems/lfu-cache/"],
    ["12_7","First Non-Repeating Character in Stream","M","https://www.geeksforgeeks.org/find-first-non-repeating-character-stream-characters/"],
    ["12_8","Valid Parentheses","E","https://leetcode.com/problems/valid-parentheses/"],
    ["12_9","Decode String","M","https://leetcode.com/problems/decode-string/"],
    ["12_10","Asteroid Collision","M","https://leetcode.com/problems/asteroid-collision/"],
    ["12_11","Design Hit Counter","M","https://www.geeksforgeeks.org/design-a-hit-counter/"],
    ["12_12","Maximum Frequency Stack","H","https://leetcode.com/problems/maximum-frequency-stack/"],
  ]},
  { id:13, cat:"binsearch", name:"Classic Binary Search", qs:[
    ["13_1","Binary Search (Standard)","E","https://leetcode.com/problems/binary-search/"],
    ["13_2","Search in Rotated Sorted Array","M","https://leetcode.com/problems/search-in-rotated-sorted-array/"],
    ["13_3","Search in Rotated Sorted Array II (Duplicates)","M","https://leetcode.com/problems/search-in-rotated-sorted-array-ii/"],
    ["13_4","Find Minimum in Rotated Sorted Array","M","https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/"],
    ["13_5","Find Minimum in Rotated Sorted Array II","H","https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/"],
    ["13_6","First and Last Position of Element in Sorted Array","M","https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/"],
    ["13_7","Search a 2D Matrix","M","https://leetcode.com/problems/search-a-2d-matrix/"],
    ["13_8","Search a 2D Matrix II","M","https://leetcode.com/problems/search-a-2d-matrix-ii/"],
    ["13_9","Count Occurrences of Element in Sorted Array","E","https://www.geeksforgeeks.org/count-number-of-occurrences-or-frequency-in-a-sorted-array/"],
    ["13_10","Floor and Ceil in a Sorted Array","E","https://www.geeksforgeeks.org/floor-and-ceil-from-a-bst/"],
    ["13_11","Single Element in a Sorted Array","M","https://leetcode.com/problems/single-element-in-a-sorted-array/"],
    ["13_12","Sqrt(x) using Binary Search","E","https://leetcode.com/problems/sqrtx/"],
    ["13_13","Find Peak Element","M","https://leetcode.com/problems/find-peak-element/"],
    ["13_14","Find in Mountain Array","H","https://leetcode.com/problems/find-in-mountain-array/"],
    ["13_15","Row with Maximum 1s (Sorted Binary Matrix)","E","https://www.geeksforgeeks.org/find-the-row-with-maximum-number-1s/"],
  ]},
  { id:14, cat:"binsearch", name:"Binary Search on Answer", qs:[
    ["14_1","Koko Eating Bananas","M","https://leetcode.com/problems/koko-eating-bananas/"],
    ["14_2","Minimum Days to Make m Bouquets","M","https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/"],
    ["14_3","Find the Smallest Divisor Given a Threshold","M","https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/"],
    ["14_4","Capacity to Ship Packages Within D Days","M","https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/"],
    ["14_5","Aggressive Cows","H","https://www.geeksforgeeks.org/aggressive-cows/"],
    ["14_6","Book Allocation Problem","H","https://www.geeksforgeeks.org/allocate-minimum-number-pages/"],
    ["14_7","Painter's Partition Problem","H","https://www.geeksforgeeks.org/painters-partition-problem/"],
    ["14_8","Split Array Largest Sum","H","https://leetcode.com/problems/split-array-largest-sum/"],
    ["14_9","Median of Two Sorted Arrays","H","https://leetcode.com/problems/median-of-two-sorted-arrays/"],
    ["14_10","Kth Element of Two Sorted Arrays","M","https://www.geeksforgeeks.org/k-th-element-two-sorted-arrays/"],
    ["14_11","Nth Root of M (Binary Search)","M","https://www.geeksforgeeks.org/n-th-root-of-a-number/"],
    ["14_12","Minimum Time to Complete Trips","M","https://leetcode.com/problems/minimum-time-to-complete-trips/"],
    ["14_13","Minimum Number of Days to Disconnect Island","H","https://leetcode.com/problems/minimum-number-of-days-to-disconnect-island/"],
    ["14_14","Maximum Average Subarray II (Float BS)","H","https://leetcode.com/problems/maximum-average-subarray-ii/"],
    ["14_15","Cutting Ribbons","M","https://www.geeksforgeeks.org/cut-the-sticks/"],
  ]},
  { id:15, cat:"trees", name:"DFS (Pre/In/Postorder Traversal)", qs:[
    ["15_1","Binary Tree Preorder Traversal","E","https://leetcode.com/problems/binary-tree-preorder-traversal/"],
    ["15_2","Binary Tree Inorder Traversal","E","https://leetcode.com/problems/binary-tree-inorder-traversal/"],
    ["15_3","Binary Tree Postorder Traversal","E","https://leetcode.com/problems/binary-tree-postorder-traversal/"],
    ["15_4","Preorder Traversal (Iterative)","M","https://leetcode.com/problems/binary-tree-preorder-traversal/"],
    ["15_5","Inorder Traversal (Iterative)","M","https://leetcode.com/problems/binary-tree-inorder-traversal/"],
    ["15_6","Postorder Traversal (Iterative)","H","https://leetcode.com/problems/binary-tree-postorder-traversal/"],
    ["15_7","Height (Max Depth) of Binary Tree","E","https://leetcode.com/problems/maximum-depth-of-binary-tree/"],
    ["15_8","Diameter of Binary Tree","E","https://leetcode.com/problems/diameter-of-binary-tree/"],
    ["15_9","Check if Binary Tree is Balanced","E","https://leetcode.com/problems/balanced-binary-tree/"],
    ["15_10","Same Tree","E","https://leetcode.com/problems/same-tree/"],
    ["15_11","Symmetric Tree","E","https://leetcode.com/problems/symmetric-tree/"],
    ["15_12","Invert Binary Tree","E","https://leetcode.com/problems/invert-binary-tree/"],
    ["15_13","Path Sum","E","https://leetcode.com/problems/path-sum/"],
    ["15_14","Path Sum II (All Root-to-Leaf Paths)","M","https://leetcode.com/problems/path-sum-ii/"],
    ["15_15","Binary Tree Maximum Path Sum","H","https://leetcode.com/problems/binary-tree-maximum-path-sum/"],
    ["15_16","Lowest Common Ancestor of Binary Tree","M","https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/"],
    ["15_17","Count Complete Tree Nodes","M","https://leetcode.com/problems/count-complete-tree-nodes/"],
    ["15_18","Construct BT from Preorder + Inorder","M","https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/"],
    ["15_19","Construct BT from Postorder + Inorder","M","https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/"],
    ["15_20","Flatten Binary Tree to Linked List","M","https://leetcode.com/problems/flatten-binary-tree-to-linked-list/"],
    ["15_21","Morris Traversal – Inorder","H","https://www.geeksforgeeks.org/inorder-tree-traversal-without-recursion-and-without-stack/"],
    ["15_22","Morris Traversal – Preorder","H","https://www.geeksforgeeks.org/morris-traversal-for-preorder/"],
    ["15_23","Children Sum Property","M","https://www.geeksforgeeks.org/check-for-children-sum-property-in-a-binary-tree/"],
    ["15_24","All Nodes at Distance K in Binary Tree","M","https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/"],
    ["15_25","Time to Burn a Binary Tree","H","https://www.geeksforgeeks.org/time-to-burn-a-tree-starting-from-a-leaf-node/"],
    ["15_26","Maximum Difference Between Node and Ancestor","M","https://leetcode.com/problems/maximum-difference-between-node-and-ancestor/"],
    ["15_27","Count Good Nodes in Binary Tree","M","https://leetcode.com/problems/count-good-nodes-in-binary-tree/"],
    ["15_28","Sum of Distances in Tree","H","https://leetcode.com/problems/sum-of-distances-in-tree/"],
    ["15_29","Serialize and Deserialize Binary Tree","H","https://leetcode.com/problems/serialize-and-deserialize-binary-tree/"],
    ["15_30","Find Leaves of Binary Tree","M","https://www.geeksforgeeks.org/print-leaf-nodes-left-right-binary-tree/"],
    ["15_31","Verify Preorder Sequence in BST","M","https://www.geeksforgeeks.org/check-if-a-given-array-can-represent-preorder-traversal-of-binary-search-tree/"],
  ]},
  { id:16, cat:"trees", name:"BFS (Level Order Traversal)", qs:[
    ["16_1","Binary Tree Level Order Traversal","M","https://leetcode.com/problems/binary-tree-level-order-traversal/"],
    ["16_2","Binary Tree Zigzag Level Order","M","https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/"],
    ["16_3","Binary Tree Right Side View","M","https://leetcode.com/problems/binary-tree-right-side-view/"],
    ["16_4","Binary Tree Left Side View","M","https://www.geeksforgeeks.org/print-left-view-binary-tree/"],
    ["16_5","Average of Levels in Binary Tree","E","https://leetcode.com/problems/average-of-levels-in-binary-tree/"],
    ["16_6","Maximum Width of Binary Tree","M","https://leetcode.com/problems/maximum-width-of-binary-tree/"],
    ["16_7","Populating Next Right Pointers I","M","https://leetcode.com/problems/populating-next-right-pointers-in-each-node/"],
    ["16_8","Populating Next Right Pointers II","M","https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/"],
    ["16_9","Vertical Order Traversal","H","https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/"],
    ["16_10","Top View of Binary Tree","M","https://www.geeksforgeeks.org/print-nodes-top-view-binary-tree/"],
    ["16_11","Bottom View of Binary Tree","M","https://www.geeksforgeeks.org/bottom-view-binary-tree/"],
    ["16_12","Diagonal Traversal of Binary Tree","M","https://www.geeksforgeeks.org/diagonal-traversal-of-binary-tree/"],
    ["16_13","Boundary Traversal of Binary Tree","M","https://www.geeksforgeeks.org/boundary-traversal-of-binary-tree/"],
    ["16_14","Level Order Successor","E","https://www.geeksforgeeks.org/level-order-successor-of-a-node-in-binary-tree/"],
    ["16_15","Connect Level Order Siblings","M","https://www.geeksforgeeks.org/connect-nodes-at-same-level/"],
    ["16_16","Minimum Depth of Binary Tree","E","https://leetcode.com/problems/minimum-depth-of-binary-tree/"],
  ]},
  { id:17, cat:"trees", name:"BST Patterns", qs:[
    ["17_1","Search in a BST","E","https://leetcode.com/problems/search-in-a-binary-search-tree/"],
    ["17_2","Insert into a BST","M","https://leetcode.com/problems/insert-into-a-binary-search-tree/"],
    ["17_3","Delete Node in a BST","M","https://leetcode.com/problems/delete-node-in-a-bst/"],
    ["17_4","Validate BST","M","https://leetcode.com/problems/validate-binary-search-tree/"],
    ["17_5","Floor in BST","M","https://www.geeksforgeeks.org/floor-in-binary-search-tree-bst/"],
    ["17_6","Ceil in BST","M","https://www.geeksforgeeks.org/ceil-in-bst/"],
    ["17_7","Kth Smallest Element in a BST","M","https://leetcode.com/problems/kth-smallest-element-in-a-bst/"],
    ["17_8","Kth Largest Element in a BST","M","https://www.geeksforgeeks.org/kth-largest-element-in-bst-when-modification-to-bst-is-not-allowed/"],
    ["17_9","Lowest Common Ancestor of BST","M","https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/"],
    ["17_10","Construct BST from Preorder Traversal","M","https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/"],
    ["17_11","BST to Greater Sum Tree","M","https://leetcode.com/problems/convert-bst-to-greater-tree/"],
    ["17_12","Two Sum IV – Input is a BST","E","https://leetcode.com/problems/two-sum-iv-input-is-a-bst/"],
    ["17_13","Recover BST (Two Nodes Swapped)","H","https://leetcode.com/problems/recover-binary-search-tree/"],
    ["17_14","Convert Sorted Array to BST","E","https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/"],
    ["17_15","Merge Two BSTs","H","https://www.geeksforgeeks.org/merge-two-bsts-with-limited-extra-space/"],
    ["17_16","In-order Successor in BST","M","https://www.geeksforgeeks.org/inorder-successor-in-binary-search-tree/"],
    ["17_17","Trim a BST","M","https://leetcode.com/problems/trim-a-binary-search-tree/"],
    ["17_18","Range Sum of BST","E","https://leetcode.com/problems/range-sum-of-bst/"],
  ]},
  { id:18, cat:"graphs", name:"BFS / DFS on Grid & Graphs", qs:[
    ["18_1","BFS of Graph","E","https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/"],
    ["18_2","DFS of Graph","E","https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/"],
    ["18_3","Number of Islands","M","https://leetcode.com/problems/number-of-islands/"],
    ["18_4","Flood Fill","E","https://leetcode.com/problems/flood-fill/"],
    ["18_5","Max Area of Island","M","https://leetcode.com/problems/max-area-of-island/"],
    ["18_6","Surrounded Regions","M","https://leetcode.com/problems/surrounded-regions/"],
    ["18_7","Rotting Oranges","M","https://leetcode.com/problems/rotting-oranges/"],
    ["18_8","01 Matrix – Distance of Nearest Zero","M","https://leetcode.com/problems/01-matrix/"],
    ["18_9","Word Search","M","https://leetcode.com/problems/word-search/"],
    ["18_10","Number of Enclaves","M","https://leetcode.com/problems/number-of-enclaves/"],
    ["18_11","Distinct Islands","M","https://www.geeksforgeeks.org/find-the-number-of-distinct-islands-in-a-2d-matrix/"],
    ["18_12","Bipartite Graph Check (BFS)","M","https://leetcode.com/problems/is-graph-bipartite/"],
    ["18_13","Bipartite Graph Check (DFS)","M","https://leetcode.com/problems/is-graph-bipartite/"],
    ["18_14","Detect Cycle in Undirected Graph (DFS)","M","https://www.geeksforgeeks.org/detect-cycle-undirected-graph/"],
    ["18_15","Detect Cycle in Undirected Graph (BFS)","M","https://www.geeksforgeeks.org/detect-cycle-in-an-undirected-graph-using-bfs/"],
    ["18_16","Detect Cycle in Directed Graph (DFS)","M","https://www.geeksforgeeks.org/detect-cycle-in-a-graph/"],
    ["18_17","Shortest Path in Binary Matrix","M","https://leetcode.com/problems/shortest-path-in-binary-matrix/"],
    ["18_18","Distance of Nearest Cell Having 1","M","https://www.geeksforgeeks.org/find-distance-nearest-cell-having-1-binary-matrix/"],
    ["18_19","Replace O's with X's","M","https://leetcode.com/problems/surrounded-regions/"],
    ["18_20","Number of Provinces","M","https://leetcode.com/problems/number-of-provinces/"],
  ]},
  { id:19, cat:"graphs", name:"Topological Sort", qs:[
    ["19_1","Topological Sort (DFS)","M","https://www.geeksforgeeks.org/topological-sorting/"],
    ["19_2","Topological Sort (BFS / Kahn's Algorithm)","M","https://www.geeksforgeeks.org/topological-sorting-indegree-based-solution/"],
    ["19_3","Detect Cycle in Directed Graph (Topo)","M","https://www.geeksforgeeks.org/detect-cycle-in-a-graph/"],
    ["19_4","Course Schedule","M","https://leetcode.com/problems/course-schedule/"],
    ["19_5","Course Schedule II","M","https://leetcode.com/problems/course-schedule-ii/"],
    ["19_6","Find Eventual Safe States","M","https://leetcode.com/problems/find-eventual-safe-states/"],
    ["19_7","Alien Dictionary","H","https://www.geeksforgeeks.org/given-sorted-dictionary-find-precedence-characters/"],
    ["19_8","Sequence Reconstruction","M","https://www.geeksforgeeks.org/sequence-reconstruction/"],
    ["19_9","Parallel Courses","M","https://www.geeksforgeeks.org/parallel-courses/"],
    ["19_10","Longest Path in a DAG","M","https://www.geeksforgeeks.org/find-longest-path-directed-acyclic-graph/"],
    ["19_11","Shortest Path in a DAG","M","https://www.geeksforgeeks.org/shortest-path-for-directed-acyclic-graphs/"],
    ["19_12","All Paths from Source to Target","M","https://leetcode.com/problems/all-paths-from-source-to-target/"],
    ["19_13","Minimum Height Trees","M","https://leetcode.com/problems/minimum-height-trees/"],
    ["19_14","Build Order (Dependency Resolution)","M","https://www.geeksforgeeks.org/topological-sorting/"],
    ["19_15","Minimum Time to Collect All Apples in a Tree","M","https://leetcode.com/problems/minimum-time-to-collect-all-apples-in-a-tree/"],
  ]},
  { id:20, cat:"graphs", name:"Dijkstra / Shortest Path / MST", qs:[
    ["20_1","Dijkstra's Algorithm (Shortest Path)","M","https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/"],
    ["20_2","Bellman Ford Algorithm","M","https://www.geeksforgeeks.org/bellman-ford-algorithm-dp-23/"],
    ["20_3","Floyd Warshall Algorithm","H","https://www.geeksforgeeks.org/floyd-warshall-algorithm-dp-16/"],
    ["20_4","Path with Minimum Effort","M","https://leetcode.com/problems/path-with-minimum-effort/"],
    ["20_5","Cheapest Flights Within K Stops","M","https://leetcode.com/problems/cheapest-flights-within-k-stops/"],
    ["20_6","Network Delay Time","M","https://leetcode.com/problems/network-delay-time/"],
    ["20_7","Number of Ways to Arrive at Destination","M","https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/"],
    ["20_8","Minimum Multiplications to Reach End","M","https://www.geeksforgeeks.org/minimum-multiplications-to-reach-end/"],
    ["20_9","City with Smallest Number of Reachable Neighbors","M","https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/"],
    ["20_10","Minimum Spanning Tree – Prim's Algorithm","M","https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/"],
    ["20_11","Minimum Spanning Tree – Kruskal's Algorithm","M","https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/"],
    ["20_12","Minimum Weighted Cycle in a Graph","H","https://www.geeksforgeeks.org/minimum-weighted-cycle-in-a-directed-graph/"],
    ["20_13","Connecting Cities with Minimum Cost","M","https://leetcode.com/problems/min-cost-to-connect-all-points/"],
    ["20_14","Critical Connections in a Network (Bridges)","H","https://leetcode.com/problems/critical-connections-in-a-network/"],
    ["20_15","Swim in Rising Water","H","https://leetcode.com/problems/swim-in-rising-water/"],
  ]},
  { id:21, cat:"graphs", name:"Union Find (DSU)", qs:[
    ["21_1","Number of Provinces (DSU)","M","https://leetcode.com/problems/number-of-provinces/"],
    ["21_2","Number of Connected Components","M","https://www.geeksforgeeks.org/connected-components-in-an-undirected-graph/"],
    ["21_3","Redundant Connection","M","https://leetcode.com/problems/redundant-connection/"],
    ["21_4","Most Stones Removed with Same Row or Column","M","https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/"],
    ["21_5","Accounts Merge","M","https://leetcode.com/problems/accounts-merge/"],
    ["21_6","Number of Islands II (Dynamic Connections)","H","https://www.geeksforgeeks.org/number-of-islands-after-adding-each-cell/"],
    ["21_7","Making a Large Island","H","https://leetcode.com/problems/making-a-large-island/"],
    ["21_8","Satisfiability of Equality Equations","M","https://leetcode.com/problems/satisfiability-of-equality-equations/"],
    ["21_9","Graph Valid Tree (DSU)","M","https://www.geeksforgeeks.org/check-given-graph-tree/"],
    ["21_10","Minimum Spanning Tree (Kruskal's + DSU)","M","https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/"],
    ["21_11","Is Graph Bipartite (DSU)","M","https://leetcode.com/problems/is-graph-bipartite/"],
    ["21_12","Longest Consecutive Sequence (DSU)","M","https://leetcode.com/problems/longest-consecutive-sequence/"],
    ["21_13","Minimize Malware Spread","H","https://leetcode.com/problems/minimize-malware-spread/"],
  ]},
  { id:22, cat:"heaps", name:"Top K Elements (Heaps)", qs:[
    ["22_1","Kth Largest Element in an Array","M","https://leetcode.com/problems/kth-largest-element-in-an-array/"],
    ["22_2","Kth Smallest Element in an Array","M","https://www.geeksforgeeks.org/kth-smallest-largest-element-in-unsorted-array/"],
    ["22_3","Top K Frequent Elements","M","https://leetcode.com/problems/top-k-frequent-elements/"],
    ["22_4","K Closest Points to Origin","M","https://leetcode.com/problems/k-closest-points-to-origin/"],
    ["22_5","Sort a K-Sorted Array","M","https://www.geeksforgeeks.org/nearly-sorted-algorithm/"],
    ["22_6","Find K Pairs with Smallest Sums","M","https://leetcode.com/problems/find-k-pairs-with-smallest-sums/"],
    ["22_7","Kth Largest in Stream","E","https://leetcode.com/problems/kth-largest-element-in-a-stream/"],
    ["22_8","Task Scheduler","M","https://leetcode.com/problems/task-scheduler/"],
    ["22_9","Reorganize String","M","https://leetcode.com/problems/reorganize-string/"],
    ["22_10","Minimum Cost to Connect Sticks","M","https://www.geeksforgeeks.org/minimum-cost-to-connect-n-ropes/"],
    ["22_11","Minimum Cost to Hire K Workers","H","https://leetcode.com/problems/minimum-cost-to-hire-k-workers/"],
    ["22_12","Maximum Performance of a Team","H","https://leetcode.com/problems/maximum-performance-of-a-team/"],
  ]},
  { id:23, cat:"heaps", name:"Two Heaps", qs:[
    ["23_1","Find Median from Data Stream","H","https://leetcode.com/problems/find-median-from-data-stream/"],
    ["23_2","Sliding Window Median","H","https://leetcode.com/problems/sliding-window-median/"],
    ["23_3","IPO – Maximize Capital","H","https://leetcode.com/problems/ipo/"],
    ["23_4","Merge K Sorted Lists (Heap)","H","https://leetcode.com/problems/merge-k-sorted-lists/"],
    ["23_5","K-th Smallest in Sorted Matrix (Heap)","M","https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/"],
  ]},
  { id:24, cat:"dp", name:"1D Dynamic Programming", qs:[
    ["24_1","Climbing Stairs","E","https://leetcode.com/problems/climbing-stairs/"],
    ["24_2","Frog Jump (GFG)","E","https://www.geeksforgeeks.org/minimum-cost-to-reach-from-0-to-n-1-in-a-frog-jump/"],
    ["24_3","Frog Jump with K Steps","M","https://www.geeksforgeeks.org/minimum-cost-to-reach-the-top-of-the-floor-by-climbing-k-steps-at-a-time/"],
    ["24_4","House Robber","M","https://leetcode.com/problems/house-robber/"],
    ["24_5","House Robber II (Circular)","M","https://leetcode.com/problems/house-robber-ii/"],
    ["24_6","Jump Game","M","https://leetcode.com/problems/jump-game/"],
    ["24_7","Jump Game II","M","https://leetcode.com/problems/jump-game-ii/"],
    ["24_8","Min Cost Climbing Stairs","E","https://leetcode.com/problems/min-cost-climbing-stairs/"],
    ["24_9","Decode Ways","M","https://leetcode.com/problems/decode-ways/"],
    ["24_10","Perfect Squares","M","https://leetcode.com/problems/perfect-squares/"],
    ["24_11","Word Break","M","https://leetcode.com/problems/word-break/"],
    ["24_12","Coin Change (Minimum Coins)","M","https://leetcode.com/problems/coin-change/"],
    ["24_13","Coin Change II (Number of Ways)","M","https://leetcode.com/problems/coin-change-ii/"],
    ["24_14","Maximum Sum of Non-Adjacent Elements","M","https://www.geeksforgeeks.org/maximum-sum-such-that-no-two-elements-are-adjacent/"],
    ["24_15","Minimum Cost to Cut a Stick","H","https://leetcode.com/problems/minimum-cost-to-cut-a-stick/"],
    ["24_16","Number of Dice Rolls with Target Sum","M","https://leetcode.com/problems/number-of-dice-rolls-with-target-sum/"],
    ["24_17","Paint Houses","M","https://www.geeksforgeeks.org/paint-houses/"],
  ]},
  { id:25, cat:"dp", name:"2D Dynamic Programming", qs:[
    ["25_1","Unique Paths","M","https://leetcode.com/problems/unique-paths/"],
    ["25_2","Unique Paths II (With Obstacles)","M","https://leetcode.com/problems/unique-paths-ii/"],
    ["25_3","Minimum Path Sum","M","https://leetcode.com/problems/minimum-path-sum/"],
    ["25_4","Triangle – Minimum Path Top to Bottom","M","https://leetcode.com/problems/triangle/"],
    ["25_5","Maximal Square","M","https://leetcode.com/problems/maximal-square/"],
    ["25_6","Cherry Pickup","H","https://leetcode.com/problems/cherry-pickup/"],
    ["25_7","Dungeon Game","H","https://leetcode.com/problems/dungeon-game/"],
    ["25_8","Minimum Falling Path Sum","M","https://leetcode.com/problems/minimum-falling-path-sum/"],
    ["25_9","Count Paths in Grid with Obstacles","M","https://leetcode.com/problems/unique-paths-ii/"],
    ["25_10","Count Square Submatrices with All Ones","M","https://leetcode.com/problems/count-square-submatrices-with-all-ones/"],
    ["25_11","Largest Plus Sign","M","https://leetcode.com/problems/largest-plus-sign/"],
    ["25_12","Gold Mine Problem","M","https://www.geeksforgeeks.org/gold-mine-problem/"],
    ["25_13","Maximum Points on a Line (2D DP)","H","https://www.geeksforgeeks.org/maximum-points-from-top-left-to-bottom-right-and-back/"],
    ["25_14","Number of Paths with Max Score","H","https://leetcode.com/problems/number-of-paths-with-max-score/"],
    ["25_15","Maximal Rectangle (DP + Stack)","H","https://leetcode.com/problems/maximal-rectangle/"],
  ]},
  { id:26, cat:"dp", name:"Knapsack DP", qs:[
    ["26_1","0/1 Knapsack","M","https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/"],
    ["26_2","Subset Sum","M","https://www.geeksforgeeks.org/subset-sum-problem-dp-25/"],
    ["26_3","Partition Equal Subset Sum","M","https://leetcode.com/problems/partition-equal-subset-sum/"],
    ["26_4","Count Subsets with Sum K","M","https://www.geeksforgeeks.org/count-of-subsets-with-given-sum/"],
    ["26_5","Last Stone Weight II","M","https://leetcode.com/problems/last-stone-weight-ii/"],
    ["26_6","Target Sum (Assign +/- to Array)","M","https://leetcode.com/problems/target-sum/"],
    ["26_7","Count Partitions with Difference D","M","https://www.geeksforgeeks.org/number-of-subsets-with-given-difference/"],
    ["26_8","Unbounded Knapsack","M","https://www.geeksforgeeks.org/unbounded-knapsack-repetition-items-allowed/"],
    ["26_9","Rod Cutting Problem","M","https://www.geeksforgeeks.org/cutting-a-rod-dp-13/"],
    ["26_10","Minimum Coin Change (Unbounded)","M","https://leetcode.com/problems/coin-change/"],
    ["26_11","Count Ways – Unbounded Coin Change","M","https://leetcode.com/problems/coin-change-ii/"],
    ["26_12","Minimum Ribbon Cut","M","https://www.geeksforgeeks.org/minimum-cuts-ribbon/"],
    ["26_13","Count of Subset Sum (Modular Arithmetic)","M","https://www.geeksforgeeks.org/count-of-subsets-with-given-sum/"],
    ["26_14","Subset Sum Equal to Half of Array","M","https://leetcode.com/problems/partition-equal-subset-sum/"],
    ["26_15","Minimum Difference Subset Partition","M","https://www.geeksforgeeks.org/partition-a-set-into-two-subsets-such-that-the-difference-of-subset-sums-is-minimum/"],
  ]},
  { id:27, cat:"dp", name:"LCS / LIS Patterns", qs:[
    ["27_1","Longest Common Subsequence","M","https://leetcode.com/problems/longest-common-subsequence/"],
    ["27_2","Print the LCS","M","https://www.geeksforgeeks.org/printing-longest-common-subsequence/"],
    ["27_3","Longest Increasing Subsequence","M","https://leetcode.com/problems/longest-increasing-subsequence/"],
    ["27_4","Print the LIS","M","https://www.geeksforgeeks.org/construction-of-longest-monotonically-increasing-subsequence-n-log-n/"],
    ["27_5","LIS using Binary Search (Patience Sorting)","M","https://leetcode.com/problems/longest-increasing-subsequence/"],
    ["27_6","Largest Divisible Subset","M","https://leetcode.com/problems/largest-divisible-subset/"],
    ["27_7","Maximum Length of Pair Chain","M","https://leetcode.com/problems/maximum-length-of-pair-chain/"],
    ["27_8","Number of Longest Increasing Subsequences","M","https://leetcode.com/problems/number-of-longest-increasing-subsequences/"],
    ["27_9","Russian Doll Envelopes","H","https://leetcode.com/problems/russian-doll-envelopes/"],
    ["27_10","Longest Bitonic Subsequence","M","https://www.geeksforgeeks.org/longest-bitonic-subsequence-dp-15/"],
    ["27_11","Minimum Number of Insertions (LCS)","M","https://www.geeksforgeeks.org/minimum-number-insertions-string-palindrome/"],
    ["27_12","Longest Common Substring","M","https://www.geeksforgeeks.org/longest-common-substring-dp-29/"],
  ]},
  { id:28, cat:"dp", name:"DP on Strings", qs:[
    ["28_1","Edit Distance","M","https://leetcode.com/problems/edit-distance/"],
    ["28_2","Wildcard Matching","H","https://leetcode.com/problems/wildcard-matching/"],
    ["28_3","Regular Expression Matching","H","https://leetcode.com/problems/regular-expression-matching/"],
    ["28_4","Longest Palindromic Subsequence","M","https://leetcode.com/problems/longest-palindromic-subsequence/"],
    ["28_5","Longest Palindromic Substring","M","https://leetcode.com/problems/longest-palindromic-substring/"],
    ["28_6","Count Palindromic Subsequences","H","https://leetcode.com/problems/count-different-palindromic-subsequences/"],
    ["28_7","Shortest Common Supersequence","M","https://leetcode.com/problems/shortest-common-supersequence/"],
    ["28_8","Minimum Insertions to Make String Palindrome","M","https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/"],
    ["28_9","Minimum Deletions to Make String Palindrome","M","https://www.geeksforgeeks.org/minimum-number-deletions-make-string-palindrome/"],
    ["28_10","Distinct Subsequences","H","https://leetcode.com/problems/distinct-subsequences/"],
    ["28_11","Minimum Insertions/Deletions to Convert String","M","https://leetcode.com/problems/delete-operation-for-two-strings/"],
    ["28_12","Count Palindromic Substrings","M","https://leetcode.com/problems/palindromic-substrings/"],
    ["28_13","Word Break II (All Sentences)","H","https://leetcode.com/problems/word-break-ii/"],
    ["28_14","Palindrome Partitioning II (Min Cuts)","H","https://leetcode.com/problems/palindrome-partitioning-ii/"],
  ]},
  { id:29, cat:"dp", name:"DP on Trees", qs:[
    ["29_1","Diameter of Binary Tree (DP)","E","https://leetcode.com/problems/diameter-of-binary-tree/"],
    ["29_2","Maximum Path Sum in Binary Tree (DP)","H","https://leetcode.com/problems/binary-tree-maximum-path-sum/"],
    ["29_3","House Robber III (Non-Adjacent Tree Nodes)","M","https://leetcode.com/problems/house-robber-iii/"],
    ["29_4","Binary Tree Cameras (Tree DP)","H","https://leetcode.com/problems/binary-tree-cameras/"],
    ["29_5","Count Unique BST Structures (Catalan)","M","https://leetcode.com/problems/unique-binary-search-trees/"],
    ["29_6","Distribute Coins in Binary Tree","M","https://leetcode.com/problems/distribute-coins-in-binary-tree/"],
    ["29_7","Sum of Distances in Tree (Re-rooting DP)","H","https://leetcode.com/problems/sum-of-distances-in-tree/"],
    ["29_8","Number of Good Leaf Node Pairs","M","https://leetcode.com/problems/number-of-good-leaf-nodes-pairs/"],
  ]},
  { id:30, cat:"others", name:"Backtracking", qs:[
    ["30_1","Subsets (Power Set)","M","https://leetcode.com/problems/subsets/"],
    ["30_2","Subsets II (With Duplicates)","M","https://leetcode.com/problems/subsets-ii/"],
    ["30_3","Combination Sum I","M","https://leetcode.com/problems/combination-sum/"],
    ["30_4","Combination Sum II","M","https://leetcode.com/problems/combination-sum-ii/"],
    ["30_5","Combination Sum III","M","https://leetcode.com/problems/combination-sum-iii/"],
    ["30_6","Permutations I","M","https://leetcode.com/problems/permutations/"],
    ["30_7","Permutations II (With Duplicates)","M","https://leetcode.com/problems/permutations-ii/"],
    ["30_8","N-Queens","H","https://leetcode.com/problems/n-queens/"],
    ["30_9","N-Queens II (Count Solutions)","H","https://leetcode.com/problems/n-queens-ii/"],
    ["30_10","Sudoku Solver","H","https://leetcode.com/problems/sudoku-solver/"],
    ["30_11","Word Search (Backtracking)","M","https://leetcode.com/problems/word-search/"],
    ["30_12","Letter Combinations of a Phone Number","M","https://leetcode.com/problems/letter-combinations-of-a-phone-number/"],
    ["30_13","Generate Parentheses","M","https://leetcode.com/problems/generate-parentheses/"],
    ["30_14","Palindrome Partitioning","M","https://leetcode.com/problems/palindrome-partitioning/"],
    ["30_15","Rat in a Maze","M","https://www.geeksforgeeks.org/rat-in-a-maze-problem-when-movement-in-all-possible-directions-is-allowed/"],
    ["30_16","M-Coloring Problem","M","https://www.geeksforgeeks.org/m-coloring-problem-backtracking-5/"],
    ["30_17","Word Break II (Backtracking)","H","https://leetcode.com/problems/word-break-ii/"],
    ["30_18","K-th Permutation Sequence","H","https://leetcode.com/problems/permutation-sequence/"],
    ["30_19","Beautiful Arrangement","M","https://leetcode.com/problems/beautiful-arrangement/"],
  ]},
  { id:31, cat:"others", name:"Greedy Algorithms", qs:[
    ["31_1","N Meetings in One Room (Activity Selection)","E","https://www.geeksforgeeks.org/activity-selection-problem-greedy-algo-1/"],
    ["31_2","Job Sequencing Problem","M","https://www.geeksforgeeks.org/job-sequencing-problem/"],
    ["31_3","Fractional Knapsack","M","https://www.geeksforgeeks.org/fractional-knapsack-problem/"],
    ["31_4","Minimum Platforms","M","https://www.geeksforgeeks.org/minimum-number-of-platforms-required-for-a-railway-station/"],
    ["31_5","Jump Game (Greedy)","M","https://leetcode.com/problems/jump-game/"],
    ["31_6","Jump Game II (Greedy)","M","https://leetcode.com/problems/jump-game-ii/"],
    ["31_7","Candy","H","https://leetcode.com/problems/candy/"],
    ["31_8","Gas Station","M","https://leetcode.com/problems/gas-station/"],
    ["31_9","Insert Interval","M","https://leetcode.com/problems/insert-interval/"],
    ["31_10","Minimum Number of Arrows to Burst Balloons","M","https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/"],
    ["31_11","Lemonade Change","E","https://leetcode.com/problems/lemonade-change/"],
    ["31_12","Assign Cookies","E","https://leetcode.com/problems/assign-cookies/"],
    ["31_13","Valid Parenthesis String","M","https://leetcode.com/problems/valid-parenthesis-string/"],
    ["31_14","Two City Scheduling","M","https://leetcode.com/problems/two-city-scheduling/"],
    ["31_15","Maximum Performance of a Team (Greedy+Heap)","H","https://leetcode.com/problems/maximum-performance-of-a-team/"],
    ["31_16","Minimum Cost to Move Chips","E","https://leetcode.com/problems/minimum-cost-to-move-chips-to-the-same-position/"],
    ["31_17","Maximum Profit in Job Scheduling","H","https://leetcode.com/problems/maximum-profit-in-job-scheduling/"],
  ]},
  { id:32, cat:"others", name:"Bit Manipulation", qs:[
    ["32_1","Number of 1 Bits (Hamming Weight)","E","https://leetcode.com/problems/number-of-1-bits/"],
    ["32_2","Reverse Bits","E","https://leetcode.com/problems/reverse-bits/"],
    ["32_3","Single Number I","E","https://leetcode.com/problems/single-number/"],
    ["32_4","Single Number II","M","https://leetcode.com/problems/single-number-ii/"],
    ["32_5","Single Number III (Two Non-Repeating)","M","https://leetcode.com/problems/single-number-iii/"],
    ["32_6","Power of Two","E","https://leetcode.com/problems/power-of-two/"],
    ["32_7","Missing Number (XOR)","E","https://leetcode.com/problems/missing-number/"],
    ["32_8","XOR from L to R","E","https://www.geeksforgeeks.org/xor-of-all-elements-in-range-l-to-r/"],
    ["32_9","Divide Two Integers (Bit Ops)","M","https://leetcode.com/problems/divide-two-integers/"],
    ["32_10","Minimum XOR Value Pair","M","https://www.geeksforgeeks.org/minimum-xor-value-pair/"],
    ["32_11","Count Subsets using Bitmask","M","https://www.geeksforgeeks.org/finding-all-subsets-of-a-given-set-in-java/"],
    ["32_12","Find Two Numbers with Odd Occurrences","M","https://www.geeksforgeeks.org/find-the-two-numbers-with-odd-occurences-in-an-unsorted-array/"],
    ["32_13","Counting Bits (0 to N)","E","https://leetcode.com/problems/counting-bits/"],
    ["32_14","Sum of XOR of All Pairs","M","https://www.geeksforgeeks.org/sum-of-xor-of-all-pairs-of-numbers-in-the-array/"],
    ["32_15","Number of Valid Words for Each Puzzle","H","https://leetcode.com/problems/number-of-valid-words-for-each-puzzle/"],
  ]},
  { id:33, cat:"others", name:"Trie", qs:[
    ["33_1","Implement Trie (Insert, Search, StartsWith)","M","https://leetcode.com/problems/implement-trie-prefix-tree/"],
    ["33_2","Implement Trie II (Count Prefix & Word)","M","https://www.geeksforgeeks.org/trie-insert-and-search/"],
    ["33_3","Longest String with All Prefixes","M","https://www.geeksforgeeks.org/longest-string-where-each-character-is-same-as-the-previous-string/"],
    ["33_4","Count Distinct Substrings Using Trie","H","https://www.geeksforgeeks.org/count-distinct-substrings-of-a-string-using-suffix-trie/"],
    ["33_5","Search Suggestions System","M","https://leetcode.com/problems/search-suggestions-system/"],
    ["33_6","Maximum XOR of Two Numbers in Array (Trie)","M","https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/"],
    ["33_7","Maximum XOR with Element from Array (Offline)","H","https://leetcode.com/problems/maximum-xor-with-an-element-from-array/"],
    ["33_8","Word Search II (Trie + Backtracking)","H","https://leetcode.com/problems/word-search-ii/"],
    ["33_9","Replace Words","M","https://leetcode.com/problems/replace-words/"],
    ["33_10","Map Sum Pairs","M","https://leetcode.com/problems/map-sum-pairs/"],
    ["33_11","Palindrome Pairs (Trie)","H","https://leetcode.com/problems/palindrome-pairs/"],
    ["33_12","Concatenated Words (Trie)","H","https://leetcode.com/problems/concatenated-words/"],
  ]},
  { id:34, cat:"others", name:"Intervals", qs:[
    ["34_1","Merge Intervals","M","https://leetcode.com/problems/merge-intervals/"],
    ["34_2","Insert Interval","M","https://leetcode.com/problems/insert-interval/"],
    ["34_3","Non-overlapping Intervals","M","https://leetcode.com/problems/non-overlapping-intervals/"],
    ["34_4","Meeting Rooms","E","https://www.geeksforgeeks.org/minimum-number-of-platforms-required-for-a-railway-station/"],
    ["34_5","Meeting Rooms II","M","https://www.geeksforgeeks.org/minimum-number-of-platforms-required-for-a-railway-station/"],
    ["34_6","Minimum Number of Arrows to Burst Balloons","M","https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/"],
    ["34_7","Employee Free Time","H","https://www.geeksforgeeks.org/find-the-employees-free-time/"],
    ["34_8","Interval List Intersections","M","https://leetcode.com/problems/interval-list-intersections/"],
    ["34_9","Data Stream as Disjoint Intervals","H","https://leetcode.com/problems/data-stream-as-disjoint-intervals/"],
    ["34_10","Range Module","H","https://leetcode.com/problems/range-module/"],
  ]},
];

const DIFF_COLOR = { E:"#22c55e", M:"#f59e0b", H:"#ef4444" };
const DIFF_LABEL = { E:"Easy", M:"Medium", H:"Hard" };
const CAT_COLORS = {
  arrays:"#6366f1", linked:"#8b5cf6", stackq:"#ec4899",
  binsearch:"#06b6d4", trees:"#10b981", graphs:"#f59e0b",
  heaps:"#f97316", dp:"#3b82f6", others:"#a855f7",
};

export default function DSATracker() {
  const [solved, setSolved]       = useState({});
  const [activeCat, setActiveCat] = useState("all");
  const [expanded, setExpanded]   = useState({});
  const [filter, setFilter]       = useState("all");
  const [search, setSearch]       = useState("");
  const [loaded, setLoaded]       = useState(false);
  const [user, setUser]           = useState(null);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);
      if (!currentUser) { setLoaded(true); return; }
      const { data } = await supabase
        .from('dsa_progress').select('question_id, solved').eq('user_id', currentUser.id);
      if (data) {
        const map = {};
        data.forEach(row => { map[row.question_id] = row.solved; });
        setSolved(map);
      }
      setLoaded(true);
    };
    load();
  }, []);

  const toggle = async (qid) => {
    const newVal = !solved[qid];
    setSolved(p => ({ ...p, [qid]: newVal }));
    if (!user) return;
    const supabase = createClient();
    await supabase.from('dsa_progress').upsert({
      user_id: user.id, question_id: qid, solved: newVal,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id,question_id' });
  };

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  const togglePattern = (pid) => setExpanded(p => ({ ...p, [pid]: !p[pid] }));

  const allQs   = useMemo(() => PATTERNS.flatMap(p => p.qs), []);
  const totalQ  = allQs.length;
  const solvedQ = useMemo(() => allQs.filter(q => solved[q[0]]).length, [allQs, solved]);
  const pct     = totalQ ? Math.round((solvedQ / totalQ) * 100) : 0;

  const visiblePatterns = useMemo(() => {
    const sq = search.toLowerCase();
    return PATTERNS.map(p => {
      let qs = p.qs;
      if (activeCat !== "all" && p.cat !== activeCat) return null;
      if (filter === "done") qs = qs.filter(q => solved[q[0]]);
      if (filter === "todo") qs = qs.filter(q => !solved[q[0]]);
      if (sq) qs = qs.filter(q => q[1].toLowerCase().includes(sq));
      if (qs.length === 0 && (filter !== "all" || sq)) return null;
      return { ...p, qs };
    }).filter(Boolean);
  }, [activeCat, filter, search, solved]);

  const patternSolved = (p) => p.qs.filter(q => solved[q[0]]).length;

  if (!loaded) return (
    <div style={{
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      height:"100vh", background:"#020408", gap:16,
    }}>
      <div style={{
        width:40, height:40, borderRadius:"50%",
        border:"3px solid rgba(99,102,241,0.2)",
        borderTopColor:"#6366f1",
        animation:"spin 0.8s linear infinite",
      }}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ color:"#475569", fontFamily:"monospace", fontSize:13, letterSpacing:2 }}>
        LOADING PROGRESS…
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight:"100vh",
      background:"#020408",
      fontFamily:"'DM Sans', 'IBM Plex Mono', monospace",
      color:"#e2e8f0",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
        
        .dsa-orb { position:fixed; border-radius:50%; filter:blur(100px); opacity:0.15; pointer-events:none; }
        .dsa-orb-1 { width:600px; height:600px; background:#6366f1; top:-200px; left:-100px; }
        .dsa-orb-2 { width:400px; height:400px; background:#a855f7; bottom:-100px; right:-100px; }

        .pattern-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .pattern-card:hover { transform: translateY(-2px); }

        .cat-btn { transition: all 0.2s ease; }
        .cat-btn:hover { color: #e2e8f0 !important; }

        .q-row { transition: background 0.15s ease; }

        .filter-btn { transition: all 0.2s ease; }
        .filter-btn:hover { border-color: rgba(99,102,241,0.5) !important; color: #c7d2fe !important; }

        .signout-btn { transition: all 0.2s ease; }
        .signout-btn:hover { border-color: #ef4444 !important; color: #ef4444 !important; background: rgba(239,68,68,0.08) !important; }

        .checkbox { transition: all 0.2s ease; cursor: pointer; }
        .checkbox:hover { transform: scale(1.15); }
      `}</style>

      {/* Background orbs */}
      <div className="dsa-orb dsa-orb-1" />
      <div className="dsa-orb dsa-orb-2" />

      {/* ── HEADER ── */}
      <div style={{
        background:"linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(168,85,247,0.08) 50%, rgba(6,182,212,0.06) 100%)",
        borderBottom:"1px solid rgba(255,255,255,0.06)",
        padding:"32px 32px 0",
        position:"relative", overflow:"hidden",
        backdropFilter:"blur(10px)",
      }}>
        {/* Subtle grid */}
        <div style={{
          position:"absolute", inset:0, pointerEvents:"none",
          backgroundImage:"linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)",
          backgroundSize:"40px 40px",
        }}/>

        <div style={{ maxWidth:1200, margin:"0 auto", position:"relative" }}>

          {/* Top row */}
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:16, marginBottom:24 }}>

            {/* Title block */}
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:"#6366f1", boxShadow:"0 0 10px #6366f1" }}/>
                <span style={{ fontSize:10, color:"#6366f1", letterSpacing:4, textTransform:"uppercase", fontFamily:"monospace" }}>
                  Striver A2Z × 34 Patterns
                </span>
              </div>
              <h1 style={{
                margin:0, fontFamily:"'Syne', sans-serif",
                fontSize:"clamp(28px, 4vw, 42px)", fontWeight:800,
                background:"linear-gradient(135deg, #f1f5f9 0%, #94a3b8 100%)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                backgroundClip:"text", lineHeight:1.1,
              }}>
                DSA Master Tracker
              </h1>
            </div>

            {/* Right side: user + stats */}
            <div style={{ display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>

              {/* User card */}
              {user && (
                <div style={{
                  display:"flex", alignItems:"center", gap:12,
                  padding:"10px 16px",
                  background:"rgba(255,255,255,0.04)",
                  backdropFilter:"blur(20px)",
                  border:"1px solid rgba(255,255,255,0.08)",
                  borderRadius:14,
                }}>
                  {user.user_metadata?.avatar_url ? (
                    <img src={user.user_metadata.avatar_url} alt="avatar"
                      referrerPolicy="no-referrer"
                      style={{ width:34, height:34, borderRadius:"50%", border:"2px solid rgba(99,102,241,0.5)" }}
                    />
                  ) : (
                    <div style={{
                      width:34, height:34, borderRadius:"50%",
                      background:"linear-gradient(135deg,#6366f1,#a855f7)",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      color:"#fff", fontSize:13, fontWeight:700,
                    }}>
                      {(user.user_metadata?.full_name || user.email || "?")[0].toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div style={{ fontSize:13, color:"#e2e8f0", fontWeight:500 }}>
                      {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </div>
                    <div style={{ fontSize:10, color:"#475569" }}>{user.email}</div>
                  </div>
                  <button onClick={signOut} className="signout-btn" style={{
                    padding:"6px 12px", borderRadius:8,
                    border:"1px solid rgba(255,255,255,0.08)",
                    background:"transparent", color:"#475569",
                    cursor:"pointer", fontSize:11, fontFamily:"inherit",
                    marginLeft:4,
                  }}>
                    Sign out
                  </button>
                </div>
              )}

              {/* Solved counter */}
              <div style={{
                padding:"10px 20px",
                background:"rgba(99,102,241,0.1)",
                border:"1px solid rgba(99,102,241,0.2)",
                borderRadius:14, textAlign:"center",
              }}>
                <div style={{
                  fontFamily:"'Syne', sans-serif", fontSize:32, fontWeight:800, lineHeight:1,
                  background:"linear-gradient(135deg,#6366f1,#a855f7)",
                  WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                }}>
                  {solvedQ}<span style={{ fontSize:16, WebkitTextFillColor:"#334155" }}>/{totalQ}</span>
                </div>
                <div style={{ fontSize:10, color:"#475569", marginTop:4, letterSpacing:1, textTransform:"uppercase" }}>
                  solved
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginBottom:20 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
              <span style={{ fontSize:11, color:"#475569", letterSpacing:2, textTransform:"uppercase" }}>Overall Progress</span>
              <span style={{
                fontSize:12, fontWeight:700,
                color: pct===100 ? "#22c55e" : "#6366f1",
                fontFamily:"monospace",
              }}>{pct}%</span>
            </div>
            <div style={{ height:6, background:"rgba(255,255,255,0.06)", borderRadius:99, overflow:"hidden" }}>
              <div style={{
                height:"100%", borderRadius:99,
                background:"linear-gradient(90deg, #6366f1, #a855f7, #06b6d4)",
                width:`${pct}%`, transition:"width 0.6s ease",
                boxShadow: pct > 0 ? "0 0 12px rgba(99,102,241,0.6)" : "none",
              }}/>
            </div>
          </div>

          {/* Difficulty stats */}
          <div style={{ display:"flex", gap:24, marginBottom:20, flexWrap:"wrap" }}>
            {["E","M","H"].map(d => {
              const tot  = allQs.filter(q=>q[2]===d).length;
              const done = allQs.filter(q=>q[2]===d && solved[q[0]]).length;
              const dpct = tot ? Math.round((done/tot)*100) : 0;
              return (
                <div key={d} style={{
                  display:"flex", alignItems:"center", gap:10,
                  padding:"8px 16px",
                  background:"rgba(255,255,255,0.03)",
                  border:`1px solid ${DIFF_COLOR[d]}22`,
                  borderRadius:10,
                }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:DIFF_COLOR[d], boxShadow:`0 0 8px ${DIFF_COLOR[d]}` }}/>
                  <span style={{ fontSize:12, color:"#64748b" }}>{DIFF_LABEL[d]}</span>
                  <span style={{ fontSize:13, color:DIFF_COLOR[d], fontWeight:700, fontFamily:"monospace" }}>{done}/{tot}</span>
                  <span style={{ fontSize:10, color:"#334155" }}>({dpct}%)</span>
                </div>
              );
            })}
          </div>

          {/* Category tabs */}
          <div style={{ display:"flex", gap:6, overflowX:"auto", paddingBottom:0, scrollbarWidth:"none" }}>
            {CATEGORIES.map(c => {
              const isActive = activeCat === c.id;
              const accent = CAT_COLORS[c.id] || "#6366f1";
              return (
                <button key={c.id} onClick={() => setActiveCat(c.id)} className="cat-btn" style={{
                  flex:"0 0 auto", padding:"9px 16px",
                  borderRadius:"10px 10px 0 0",
                  border:"none", cursor:"pointer",
                  fontSize:12, fontFamily:"inherit",
                  background: isActive ? "rgba(255,255,255,0.06)" : "transparent",
                  color: isActive ? (CAT_COLORS[c.id] || "#6366f1") : "#475569",
                  borderBottom: isActive ? `2px solid ${accent}` : "2px solid transparent",
                  borderTop: isActive ? `1px solid rgba(255,255,255,0.08)` : "1px solid transparent",
                  borderLeft: isActive ? `1px solid rgba(255,255,255,0.08)` : "1px solid transparent",
                  borderRight: isActive ? `1px solid rgba(255,255,255,0.08)` : "1px solid transparent",
                  transition:"all .2s", whiteSpace:"nowrap",
                  boxShadow: isActive ? `0 -4px 12px ${accent}22` : "none",
                }}>
                  {c.emoji} {c.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── CONTROLS ── */}
      <div style={{
        background:"rgba(2,4,8,0.8)",
        backdropFilter:"blur(20px)",
        borderBottom:"1px solid rgba(255,255,255,0.05)",
        padding:"14px 32px",
        position:"sticky", top:56, zIndex:50,
      }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
          <div style={{ position:"relative", flex:"1 1 240px" }}>
            <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"#334155", fontSize:14 }}>🔍</span>
            <input
              value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Search questions…"
              style={{
                width:"100%", padding:"9px 12px 9px 36px",
                background:"rgba(255,255,255,0.04)",
                border:"1px solid rgba(255,255,255,0.08)",
                borderRadius:10, color:"#e2e8f0", fontSize:13,
                fontFamily:"inherit", outline:"none",
                transition:"border-color 0.2s",
              }}
              onFocus={e => e.target.style.borderColor="rgba(99,102,241,0.5)"}
              onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.08)"}
            />
          </div>

          <div style={{ display:"flex", gap:6 }}>
            {["all","todo","done"].map(f => (
              <button key={f} onClick={() => setFilter(f)} className="filter-btn" style={{
                padding:"8px 18px", borderRadius:8,
                border:`1px solid ${filter===f ? "#6366f1" : "rgba(255,255,255,0.08)"}`,
                background: filter===f ? "rgba(99,102,241,0.15)" : "transparent",
                color: filter===f ? "#818cf8" : "#475569",
                cursor:"pointer", fontSize:12, fontFamily:"inherit",
                boxShadow: filter===f ? "0 0 16px rgba(99,102,241,0.2)" : "none",
              }}>
                {f==="all"?"All":f==="todo"?"To Do":"Done"}
              </button>
            ))}
          </div>

          <button onClick={() => {
            const ids = visiblePatterns.map(p=>p.id);
            const allOpen = ids.every(id=>expanded[id]);
            const next = {}; ids.forEach(id => { next[id]=!allOpen; });
            setExpanded(p => ({ ...p, ...next }));
          }} style={{
            padding:"8px 18px", borderRadius:8,
            border:"1px solid rgba(255,255,255,0.08)",
            background:"rgba(255,255,255,0.03)",
            color:"#475569", cursor:"pointer", fontSize:12, fontFamily:"inherit",
            transition:"all 0.2s",
          }}>
            {visiblePatterns.every(p=>expanded[p.id]) ? "⊟ Collapse All" : "⊞ Expand All"}
          </button>

          <span style={{ marginLeft:"auto", fontSize:11, color:"#334155", fontFamily:"monospace" }}>
            {visiblePatterns.length} patterns · {visiblePatterns.reduce((a,p)=>a+p.qs.length,0)} questions
          </span>
        </div>
      </div>

      {/* ── PATTERN CARDS ── */}
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"28px 32px" }}>
        {visiblePatterns.length === 0 ? (
          <div style={{
            textAlign:"center", padding:80,
            color:"#334155", fontSize:14,
          }}>
            <div style={{ fontSize:40, marginBottom:16 }}>🔍</div>
            No questions match your filters.
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {visiblePatterns.map(p => {
              const done   = patternSolved(p);
              const total  = p.qs.length;
              const ppct   = total ? Math.round((done/total)*100) : 0;
              const accent = CAT_COLORS[p.cat] || "#6366f1";
              const open   = !!expanded[p.id];

              return (
                <div key={p.id} className="pattern-card" style={{
                  background:"rgba(255,255,255,0.02)",
                  border:`1px solid ${open ? accent+"33" : "rgba(255,255,255,0.06)"}`,
                  borderLeft:`3px solid ${open ? accent : "rgba(255,255,255,0.06)"}`,
                  borderRadius:14, overflow:"hidden",
                  boxShadow: open ? `0 4px 24px ${accent}15` : "none",
                  backdropFilter:"blur(10px)",
                }}>

                  {/* Pattern header */}
                  <button onClick={() => togglePattern(p.id)} style={{
                    width:"100%", padding:"16px 20px",
                    display:"flex", alignItems:"center", gap:14,
                    background:"none", border:"none", cursor:"pointer",
                    textAlign:"left", color:"inherit",
                  }}>
                    <span style={{
                      flex:"0 0 38px", height:38, borderRadius:10,
                      background:`${accent}18`,
                      border:`1px solid ${accent}33`,
                      color:accent,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:13, fontWeight:800, fontFamily:"'Syne', sans-serif",
                      boxShadow:`0 0 12px ${accent}22`,
                    }}>
                      {p.id}
                    </span>

                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{
                        fontSize:14, fontWeight:600,
                        color: open ? "#f1f5f9" : "#cbd5e1",
                        marginBottom:6, fontFamily:"'DM Sans', sans-serif",
                      }}>
                        Pattern {p.id} — {p.name}
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <div style={{ flex:1, height:3, background:"rgba(255,255,255,0.05)", borderRadius:99, maxWidth:180 }}>
                          <div style={{
                            height:"100%", borderRadius:99,
                            background: ppct===100 ? "#22c55e" : `linear-gradient(90deg, ${accent}, ${accent}99)`,
                            width:`${ppct}%`, transition:"width 0.4s ease",
                            boxShadow: ppct > 0 ? `0 0 8px ${accent}66` : "none",
                          }}/>
                        </div>
                        <span style={{
                          fontSize:11, fontFamily:"monospace",
                          color: ppct===100 ? "#22c55e" : "#475569",
                        }}>
                          {done}/{total}{ppct===100 ? " ✓" : ""}
                        </span>
                      </div>
                    </div>

                    <div style={{ display:"flex", gap:4, flexShrink:0 }}>
                      {["E","M","H"].map(d => {
                        const c = p.qs.filter(q=>q[2]===d).length;
                        return c > 0 ? (
                          <span key={d} style={{
                            fontSize:10, padding:"3px 7px", borderRadius:99,
                            background:`${DIFF_COLOR[d]}18`,
                            border:`1px solid ${DIFF_COLOR[d]}33`,
                            color:DIFF_COLOR[d], fontWeight:700, fontFamily:"monospace",
                          }}>{c}{d}</span>
                        ) : null;
                      })}
                    </div>

                    <span style={{
                      color: open ? accent : "#334155",
                      fontSize:16, flexShrink:0,
                      transition:"transform 0.2s, color 0.2s",
                      transform: open ? "rotate(90deg)" : "rotate(0deg)",
                      display:"inline-block",
                    }}>▸</span>
                  </button>

                  {/* Questions list */}
                  {open && (
                    <div style={{ borderTop:`1px solid rgba(255,255,255,0.04)` }}>
                      {p.qs.map((q, idx) => {
                        const [qid, title, diff, url] = q;
                        const isDone = !!solved[qid];
                        return (
                          <div key={qid} className="q-row" style={{
                            display:"flex", alignItems:"center", gap:12,
                            padding:"11px 20px 11px 26px",
                            borderBottom: idx < p.qs.length-1 ? "1px solid rgba(255,255,255,0.03)" : "none",
                            background: isDone ? "rgba(34,197,94,0.06)" : "transparent",
                          }}
                          onMouseEnter={e => { if(!isDone) e.currentTarget.style.background="rgba(255,255,255,0.03)"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = isDone ? "rgba(34,197,94,0.06)" : "transparent"; }}>

                            {/* Checkbox */}
                            <div className="checkbox" onClick={() => toggle(qid)} style={{
                              width:18, height:18, borderRadius:5, flexShrink:0,
                              border: isDone ? "none" : "2px solid rgba(255,255,255,0.12)",
                              background: isDone ? accent : "transparent",
                              display:"flex", alignItems:"center", justifyContent:"center",
                              boxShadow: isDone ? `0 0 10px ${accent}66` : "none",
                            }}>
                              {isDone && <span style={{ color:"#fff", fontSize:10, lineHeight:1 }}>✓</span>}
                            </div>

                            <span style={{ fontSize:11, color:"#1e293b", flexShrink:0, minWidth:22, fontFamily:"monospace" }}>
                              {idx+1}.
                            </span>

                            <span style={{ flex:1, display:"flex", alignItems:"center", gap:8, minWidth:0 }}>
                              <span style={{
                                fontSize:13,
                                color: isDone ? "#4ade80" : "#94a3b8",
                                textDecoration: isDone ? "line-through" : "none",
                                textDecorationColor: isDone ? "#166534" : "transparent",
                              }}>
                                {title}
                              </span>
                              <a href={url} target="_blank" rel="noreferrer"
                                onClick={e => e.stopPropagation()}
                                style={{
                                  display:"inline-flex", alignItems:"center", justifyContent:"center",
                                  flexShrink:0, width:20, height:20, borderRadius:5,
                                  background: url.includes("geeksforgeeks") ? "rgba(22,163,74,0.12)" : "rgba(99,102,241,0.12)",
                                  border:`1px solid ${url.includes("geeksforgeeks") ? "rgba(22,163,74,0.25)" : "rgba(99,102,241,0.25)"}`,
                                  color: url.includes("geeksforgeeks") ? "#4ade80" : "#818cf8",
                                  fontSize:9, fontWeight:700, textDecoration:"none",
                                  transition:"all .15s",
                                }}
                                onMouseEnter={e => { e.currentTarget.style.opacity="0.7"; }}
                                onMouseLeave={e => { e.currentTarget.style.opacity="1"; }}
                              >
                                {url.includes("geeksforgeeks") ? "G" : "LC"}
                              </a>
                            </span>

                            <span style={{
                              fontSize:11, padding:"3px 10px", borderRadius:99, flexShrink:0,
                              background:`${DIFF_COLOR[diff]}12`,
                              border:`1px solid ${DIFF_COLOR[diff]}25`,
                              color:DIFF_COLOR[diff], fontWeight:600,
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

      <div style={{
        textAlign:"center", padding:"32px 24px",
        color:"#1e293b", fontSize:11, letterSpacing:2,
        borderTop:"1px solid rgba(255,255,255,0.03)",
        fontFamily:"monospace",
      }}>
        {totalQ} QUESTIONS · 34 PATTERNS · STRIVER A2Z · LC = LEETCODE · G = GFG
      </div>
    </div>
  );
}