// ========================================
// PyMaster — Complete DSA Curriculum
// 10 Sections, 30 Chapters, 130 Lessons
// ========================================

export const dsaCurriculum = {
  sections: [
    // =============================================
    // SECTION 1: TIME & SPACE COMPLEXITY
    // =============================================
    {
      id: 'dsa_s1',
      title: 'Time & Space Complexity',
      icon: 'cpu',
      description: 'Master the mathematical foundations of analyzing algorithm efficiency',
      chapters: [
        {
          id: 'dsa_s1c1',
          title: 'Big O Notation',
          lessons: [
            {
              id: 'dsa_s1c1l1',
              type: 'theory',
              title: 'What is Big O?',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Big O notation describes how the running time of an algorithm grows as the input size (N) increases, focusing on the worst-case scenario.',
                content: `An algorithm is a step-by-step set of instructions to solve a problem. But how do we compare two different algorithms that solve the same problem? We use **Big O Notation**.

Big O doesn't measure runtime in seconds because seconds depend on the hardware, the operating system, and other running applications. Instead, it measures how the **number of operations** grows relative to the input size ($N$).

Common time complexities:
- **$O(1)$ - Constant Time**: Running time is independent of the input size (e.g., accessing an array index).
- **$O(N)$ - Linear Time**: Running time grows proportionally to the input size (e.g., searching for a value in an unsorted list).
- **$O(N^2)$ - Quadratic Time**: Running time grows proportionally to the square of the input size (e.g., nested loops, Bubble Sort).`,
                codeExample: `# O(1) example\ndef get_first(arr):\n    return arr[0]\n\n# O(N) example\ndef print_all(arr):\n    for x in arr:\n        print(x)\n\n# O(N^2) example\ndef print_pairs(arr):\n    for x in arr:\n        for y in arr:\n            print(x, y)`
              },
              quiz: {
                question: 'What is the time complexity of a loop that runs N times containing another nested loop that also runs N times?',
                options: ['O(1)', 'O(N)', 'O(N^2)', 'O(log N)'],
                correct: 2,
                explanation: 'A nested loop where both loops run N times results in N * N = N^2 operations, making the time complexity O(N^2).'
              }
            },
            {
              id: 'dsa_s1c1l2',
              type: 'theory',
              title: 'Logarithmic & Linearithmic Time',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'O(log N) halves the problem each step (like binary search), and O(N log N) does N work for each halving level (like merge sort).',
                content: `Beyond constant, linear, and quadratic time, two more complexity classes appear constantly in DSA:

**$O(\\log N)$ - Logarithmic Time**: The algorithm halves the input size each iteration. This is extremely efficient. Binary search on a sorted list of 1 billion elements needs only ~30 steps!

**$O(N \\log N)$ - Linearithmic Time**: This is the sweet spot for efficient comparison-based sorting algorithms. Merge Sort and Quick Sort (average case) both achieve this. You can think of it as doing $\\log N$ passes over all $N$ elements.

The hierarchy from fastest to slowest:
$$O(1) < O(\\log N) < O(N) < O(N \\log N) < O(N^2) < O(2^N) < O(N!)$$

Understanding this hierarchy is crucial for choosing the right algorithm for any given problem.`,
                codeExample: `# O(log N) - Binary Search\ndef binary_search(arr, target):\n    lo, hi = 0, len(arr) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return -1\n\n# O(N log N) - Merge Sort\ndef merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    return merge(left, right)`
              },
              quiz: {
                question: 'If you double the input size from N to 2N for an O(log N) algorithm, how many additional steps does it need?',
                options: ['N more steps', 'Double the steps', 'Just 1 more step', 'N^2 more steps'],
                correct: 2,
                explanation: 'log(2N) = log(N) + log(2) = log(N) + 1. So doubling the input only adds one more step, which is incredibly efficient.'
              }
            },
            {
              id: 'dsa_s1c1l3',
              type: 'quiz',
              title: 'Time Complexity Quiz',
              xp: 5,
              difficulty: 'easy',
              quiz: {
                question: 'Which time complexity represents the fastest (most efficient) growth rate for large inputs?',
                options: ['O(N)', 'O(N^2)', 'O(1)', 'O(N log N)'],
                correct: 2,
                explanation: 'O(1) is constant time and does not grow with the input size, making it the most efficient growth rate.'
              }
            },
            {
              id: 'dsa_s1c1l4',
              type: 'theory',
              title: 'Dropping Constants & Lower-Order Terms',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'In Big O analysis, we drop constants (2N becomes N) and lower-order terms (N^2 + N becomes N^2) because we focus on growth rate for large inputs.',
                content: `When analyzing Big O, we simplify:

**Rule 1: Drop Constants**
If your algorithm does $3N + 5$ operations, we call it $O(N)$, not $O(3N+5)$. The constant factor becomes irrelevant at massive scale.

**Rule 2: Drop Lower-Order Terms**
If your algorithm is $O(N^2 + N)$, we simplify to $O(N^2)$. For large $N$, the $N^2$ term dominates so much that the $+ N$ is negligible.

**Rule 3: Different Variables for Different Inputs**
If a function takes an array of size $N$ and a string of size $M$, and iterates through both, the time complexity is $O(N + M)$, not $O(N)$ or $O(2N)$.

These rules keep the analysis clean and focused on the algorithm's fundamental behavior.`,
                codeExample: `# Example: O(N^2 + N) -> simplifies to O(N^2)\ndef example(arr):\n    n = len(arr)\n    # This loop is O(N^2)\n    for i in range(n):\n        for j in range(n):\n            print(i, j)\n    \n    # This loop is O(N)\n    for x in arr:\n        print(x)\n    # Total: O(N^2 + N) = O(N^2)`
              },
              quiz: {
                question: 'What is the simplified Big O of an algorithm that does 5N^2 + 3N + 100 operations?',
                options: ['O(5N^2 + 3N + 100)', 'O(N^2 + N)', 'O(N^2)', 'O(N)'],
                correct: 2,
                explanation: 'We drop the constant coefficients (5, 3) and the lower-order terms (3N, 100), leaving O(N^2).'
              }
            },
            {
              id: 'dsa_s1c1l5',
              type: 'challenge',
              title: 'Analyze This Code',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Read a number N from input. Write an algorithm with EXACTLY O(N) time complexity: iterate from 1 to N, printing each number. Then print "done" at the end.',
                starterCode: 'n = int(input())\n\n# Print each number from 1 to N, then print "done"\n',
                hints: [
                  'Use a for loop: for i in range(1, n+1): print(i)',
                  'After the loop, print("done")',
                  'This has O(N) complexity since it loops N times'
                ],
                testCases: [
                  { input: '3', expectedOutput: '1\n2\n3\ndone' },
                  { input: '1', expectedOutput: '1\ndone' },
                  { input: '5', expectedOutput: '1\n2\n3\n4\n5\ndone' }
                ]
              }
            }
          ]
        },
        {
          id: 'dsa_s1c2',
          title: 'Space Complexity',
          lessons: [
            {
              id: 'dsa_s1c2l1',
              type: 'theory',
              title: 'What is Space Complexity?',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Space complexity measures how much memory an algorithm needs relative to the input size (N) as it runs.',
                content: `Just like we analyze time efficiency, we must also analyze memory efficiency. **Space Complexity** measures the total amount of memory (auxiliary space + input space) an algorithm allocates as a function of the input size $N$.

- **$O(1)$ - Constant Space**: The algorithm uses a fixed amount of extra memory regardless of the input size (e.g., swapping two variables).
- **$O(N)$ - Linear Space**: The extra memory grows proportionally with $N$ (e.g., creating a new array containing all elements of the input array).
- **$O(N^2)$ - Quadratic Space**: The extra memory grows quadratically (e.g., creating a 2D matrix of size $N \\times N$).

Modern systems have lots of RAM, but space complexity is still crucial for embedded systems, mobile applications, and working with big data.`,
                codeExample: `# O(1) Space: Only uses a few integer counters\ndef sum_list(arr):\n    total = 0\n    for x in arr:\n        total += x\n    return total\n\n# O(N) Space: Creates a new list of size N\ndef copy_list(arr):\n    new_list = []\n    for x in arr:\n        new_list.append(x)\n    return new_list`
              },
              quiz: {
                question: 'If an algorithm creates an array of size N to store intermediate results, what is its space complexity?',
                options: ['O(1)', 'O(N)', 'O(N^2)', 'O(log N)'],
                correct: 1,
                explanation: 'Since the memory allocated grows proportionally with the size of N, the space complexity is O(N).'
              }
            },
            {
              id: 'dsa_s1c2l2',
              type: 'theory',
              title: 'Auxiliary Space vs Total Space',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Auxiliary space is the extra memory used beyond the input. Total space includes input + auxiliary. Most Big O space analysis refers to auxiliary space.',
                content: `When discussing space complexity, we distinguish between two types:

**Auxiliary Space**: The extra memory used by the algorithm beyond what's needed to store the input. This is what most interviewers care about.

**Total Space**: The sum of input space + auxiliary space.

Example: If you have an array of size $N$ and create a new array of size $N$ to store results:
- Input space: $O(N)$
- Auxiliary space: $O(N)$  
- Total space: $O(2N) = O(N)$

**In-place algorithms** use $O(1)$ auxiliary space — they modify the input directly without needing significant extra memory. These are highly desirable when memory is constrained.`,
                codeExample: `# In-place reversal: O(1) auxiliary space\ndef reverse_in_place(arr):\n    left, right = 0, len(arr) - 1\n    while left < right:\n        arr[left], arr[right] = arr[right], arr[left]\n        left += 1\n        right -= 1\n    return arr\n\n# NOT in-place: O(N) auxiliary space\ndef reverse_new(arr):\n    return arr[::-1]  # creates a new list`
              },
              quiz: {
                question: 'An algorithm sorts an array by creating a complete copy of it. What is the auxiliary space complexity?',
                options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
                correct: 2,
                explanation: 'Creating a full copy of an N-element array requires O(N) additional memory beyond the input.'
              }
            },
            {
              id: 'dsa_s1c2l3',
              type: 'quiz',
              title: 'Space Complexity Quiz',
              xp: 5,
              difficulty: 'easy',
              quiz: {
                question: 'What is the space complexity of a recursive function that recurses N levels deep?',
                options: ['O(1)', 'O(N)', 'O(log N)', 'O(N^2)'],
                correct: 1,
                explanation: 'Each recursive call adds a frame to the call stack. With N levels of recursion, the stack uses O(N) memory.'
              }
            },
            {
              id: 'dsa_s1c2l4',
              type: 'challenge',
              title: 'In-Place Sum',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Read a list of space-separated integers from input. Calculate the sum of all elements using O(1) auxiliary space (just a variable, no new list). Print the sum.',
                starterCode: 'numbers = [int(x) for x in input().split()]\n\n# Calculate sum using O(1) extra space and print it\n',
                hints: [
                  'Initialize a variable total = 0',
                  'Loop through each number and add it to total',
                  'Print the total at the end'
                ],
                testCases: [
                  { input: '1 2 3 4 5', expectedOutput: '15' },
                  { input: '10 -5 3', expectedOutput: '8' },
                  { input: '42', expectedOutput: '42' }
                ]
              }
            }
          ]
        },
        {
          id: 'dsa_s1c3',
          title: 'Best, Average & Worst Case',
          lessons: [
            {
              id: 'dsa_s1c3l1',
              type: 'theory',
              title: 'Understanding Case Analysis',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Algorithms can perform differently depending on the input. Best case is the fastest scenario, worst case is the slowest, and average case is the expected performance.',
                content: `For any algorithm, performance can vary based on the specific input:

**Best Case ($\\Omega$)**: The minimum time an algorithm takes. For linear search, the best case is $O(1)$ — the target is the very first element.

**Worst Case ($O$)**: The maximum time an algorithm takes. For linear search, the worst case is $O(N)$ — the target is last or not present.

**Average Case ($\\Theta$)**: The expected time over all possible inputs. For linear search, on average you check $N/2$ elements, which is still $O(N)$.

In interviews and practice, we almost always refer to **worst case** because it provides a guarantee. When someone says "this algorithm is O(N)", they typically mean worst-case time complexity.`,
                codeExample: `# Linear Search\ndef linear_search(arr, target):\n    for i in range(len(arr)):\n        if arr[i] == target:\n            return i    # Best case: found at index 0\n    return -1           # Worst case: not found\n\n# Best Case: O(1)  - target is arr[0]\n# Worst Case: O(N) - target is not in arr\n# Average Case: O(N) - check ~N/2 elements`
              },
              quiz: {
                question: 'For QuickSort, the worst case is O(N^2) but the average case is O(N log N). Which case do we typically reference?',
                options: ['Best case only', 'Average case', 'Worst case', 'It depends on the interviewer'],
                correct: 2,
                explanation: 'We typically reference worst case because it provides an upper-bound guarantee. However, for QuickSort specifically, the average case O(N log N) is often mentioned because the worst case is rare with randomized pivots.'
              }
            },
            {
              id: 'dsa_s1c3l2',
              type: 'quiz',
              title: 'Case Analysis Quiz',
              xp: 5,
              difficulty: 'easy',
              quiz: {
                question: 'What is the best-case time complexity of Bubble Sort?',
                options: ['O(N^2)', 'O(N log N)', 'O(N)', 'O(1)'],
                correct: 2,
                explanation: 'With an optimization that stops early if no swaps are made in a pass, Bubble Sort achieves O(N) when the array is already sorted — only one pass is needed.'
              }
            }
          ]
        }
      ]
    },

    // =============================================
    // SECTION 2: ARRAYS & STRINGS
    // =============================================
    {
      id: 'dsa_s2',
      title: 'Arrays & Strings',
      icon: 'code',
      description: 'Master list manipulation, dynamic memory layouts, and efficient indexing strategies',
      chapters: [
        {
          id: 'dsa_s2c1',
          title: 'Dynamic Arrays',
          lessons: [
            {
              id: 'dsa_s2c1l1',
              type: 'theory',
              title: 'Dynamic Arrays in Python',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Python lists are dynamic arrays under the hood, allocating contiguous memory and automatically resizing when full.',
                content: `An **Array** is a contiguous block of memory storing elements of the same type. In lower-level languages (like C), arrays have a fixed size. In Python, the standard \`list\` type is a **Dynamic Array**.

When you append to a Python list, the language handles memory management:
1. It pre-allocates extra space in memory.
2. When the list is full, it allocates a larger chunk of memory (usually double the size).
3. It copies the old elements to the new block.
4. It deletes the old array.

This resizing operation is expensive ($O(N)$), but because it happens infrequently, the average (amortized) time complexity for appending is $O(1)$.`,
                codeExample: `# Python lists grow dynamically\narr = [1, 2, 3]\narr.append(4)   # Amortized O(1) time\nprint(arr)      # [1, 2, 3, 4]\n\n# Accessing elements by index is O(1) time\nfirst = arr[0]`
              },
              quiz: {
                question: 'What is the worst-case time complexity of inserting an element at the beginning of an array of size N?',
                options: ['O(1)', 'O(N)', 'O(log N)', 'O(N^2)'],
                correct: 1,
                explanation: 'To insert at index 0, all existing N elements must be shifted one index to the right, which takes O(N) time.'
              }
            },
            {
              id: 'dsa_s2c1l2',
              type: 'theory',
              title: 'Array Operations & Complexities',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Understand the time complexities of common array operations: access O(1), search O(N), insert/delete at end O(1), insert/delete at start O(N).',
                content: `Knowing the time complexity of each array operation is essential:

| Operation | Time Complexity |
|-----------|----------------|
| Access by index | $O(1)$ |
| Search (unsorted) | $O(N)$ |
| Search (sorted, binary) | $O(\\log N)$ |
| Append to end | $O(1)$ amortized |
| Insert at position i | $O(N)$ |
| Delete from end | $O(1)$ |
| Delete at position i | $O(N)$ |

The key insight is that arrays excel at **random access** but suffer with **insertions and deletions** in the middle due to the shifting requirement.

Slicing in Python (e.g., \`arr[1:5]\`) creates a **new list** and is $O(k)$ where $k$ is the slice size.`,
                codeExample: `arr = [10, 20, 30, 40, 50]\n\n# O(1) - Access by index\nprint(arr[2])        # 30\n\n# O(N) - Insert at position 1\narr.insert(1, 15)    # [10, 15, 20, 30, 40, 50]\n\n# O(1) amortized - Append\narr.append(60)       # [10, 15, 20, 30, 40, 50, 60]\n\n# O(N) - Remove by value (searches then shifts)\narr.remove(30)       # [10, 15, 20, 40, 50, 60]\n\n# O(1) - Pop from end\narr.pop()            # [10, 15, 20, 40, 50]`
              },
              quiz: {
                question: 'What is the time complexity of Python\'s list.insert(0, value)?',
                options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
                correct: 2,
                explanation: 'Inserting at index 0 requires shifting all N elements one position to the right, which is O(N).'
              }
            },
            {
              id: 'dsa_s2c1l3',
              type: 'challenge',
              title: 'Find the Maximum',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Write a program that reads a list of space-separated integers from input. Find the maximum value in the list and print it.',
                starterCode: '# Read space-separated numbers from input\nnumbers = [int(x) for x in input().split()]\n\n# Find the maximum value and print it\n',
                hints: [
                  'You can use the built-in max() function in Python: print(max(numbers))',
                  'Or iterate: initialize max_val to numbers[0], loop through the list, and update if you find a larger number.',
                  'Solution: print(max(numbers))'
                ],
                testCases: [
                  { input: '1 5 3 9 2', expectedOutput: '9' },
                  { input: '-5 -1 -10 -2', expectedOutput: '-1' },
                  { input: '42', expectedOutput: '42' }
                ]
              }
            },
            {
              id: 'dsa_s2c1l4',
              type: 'challenge',
              title: 'Remove Duplicates',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Read a list of space-separated integers. Remove all duplicate values while preserving the original order. Print the unique elements space-separated.',
                starterCode: 'numbers = [int(x) for x in input().split()]\n\n# Remove duplicates preserving order and print\n',
                hints: [
                  'Use a set to track seen values and a new list for results',
                  'Loop through the array: if a value is not in the set, add it to both the set and the result list',
                  'Print the result list space-separated'
                ],
                testCases: [
                  { input: '1 2 3 2 1 4', expectedOutput: '1 2 3 4' },
                  { input: '5 5 5', expectedOutput: '5' },
                  { input: '1 2 3', expectedOutput: '1 2 3' }
                ]
              }
            }
          ]
        },
        {
          id: 'dsa_s2c2',
          title: 'Two Pointers Technique',
          lessons: [
            {
              id: 'dsa_s2c2l1',
              type: 'theory',
              title: 'The Two Pointer Strategy',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Use two index variables (pointers) moving towards each other or at different speeds to solve array problems in O(N) time.',
                content: `The **Two Pointers** technique is a powerful optimization strategy. Instead of nested loops ($O(N^2)$), we use two integer variables representing array indexes (pointers).

Typically, one pointer starts at the beginning (index 0) and the other at the end (index $N-1$). We then increment/decrement them based on conditions until they meet.

This is highly effective for:
- Reversing an array in-place.
- Finding if two numbers in a sorted array add up to a target sum.
- Checking if a string is a palindrome.
- Removing elements from a sorted array in-place.
- Container With Most Water (classic interview problem).`,
                codeExample: `# Check if palindrome using two pointers\ndef is_palindrome(s):\n    left, right = 0, len(s) - 1\n    while left < right:\n        if s[left] != s[right]:\n            return False\n        left += 1\n        right -= 1\n    return True\n\nprint(is_palindrome("racecar"))  # True\nprint(is_palindrome("hello"))    # False`
              },
              quiz: {
                question: 'What is the time complexity of checking if a string of length N is a palindrome using the two-pointer technique?',
                options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
                correct: 2,
                explanation: 'Since each character is visited at most once, the time complexity is linear O(N).'
              }
            },
            {
              id: 'dsa_s2c2l2',
              type: 'theory',
              title: 'Two Sum on Sorted Array',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'In a sorted array, use two pointers from both ends: if the sum is too small advance the left pointer, if too large retreat the right pointer.',
                content: `Given a **sorted** array and a target sum, find two numbers that add up to the target. With two pointers, this becomes an elegant $O(N)$ solution:

1. Place \`left\` at index 0 and \`right\` at index $N-1$.
2. Calculate \`current_sum = arr[left] + arr[right]\`.
3. If \`current_sum == target\`: found the pair!
4. If \`current_sum < target\`: we need a larger sum, so increment \`left\`.
5. If \`current_sum > target\`: we need a smaller sum, so decrement \`right\`.
6. Repeat until the pointers cross.

This works because the array is sorted: moving \`left\` right increases the sum, moving \`right\` left decreases it.`,
                codeExample: `def two_sum_sorted(arr, target):\n    left, right = 0, len(arr) - 1\n    while left < right:\n        s = arr[left] + arr[right]\n        if s == target:\n            return (left, right)\n        elif s < target:\n            left += 1\n        else:\n            right -= 1\n    return None\n\nprint(two_sum_sorted([1, 3, 5, 7, 11], 12))  # (1, 4)`
              },
              quiz: {
                question: 'Why does the two-pointer approach for Two Sum only work on sorted arrays?',
                options: [
                  'It works on any array',
                  'The sorted order guarantees that advancing left increases the sum and retreating right decreases it',
                  'Sorted arrays are always shorter',
                  'Python requires sorted input for indexing'
                ],
                correct: 1,
                explanation: 'The sorted property is key: arr[left] ≤ arr[right], so moving left up makes the sum larger, and moving right down makes it smaller. This directed search only works with sorted data.'
              }
            },
            {
              id: 'dsa_s2c2l3',
              type: 'challenge',
              title: 'Reverse an Array',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Write a program that reads a list of space-separated integers from input, reverses the list in-place, and prints the reversed elements separated by a single space.',
                starterCode: '# Read numbers\nnumbers = [int(x) for x in input().split()]\n\n# Reverse numbers and print space-separated\n',
                hints: [
                  'You can reverse in-place in Python using numbers.reverse() or slicing: numbers[::-1]',
                  'To print list elements space-separated, use: print(*(numbers)) or " ".join(map(str, numbers))',
                  'Solution:\nnumbers.reverse()\nprint(*(numbers))'
                ],
                testCases: [
                  { input: '1 2 3 4 5', expectedOutput: '5 4 3 2 1' },
                  { input: '10 20', expectedOutput: '20 10' },
                  { input: '42', expectedOutput: '42' }
                ]
              }
            },
            {
              id: 'dsa_s2c2l4',
              type: 'challenge',
              title: 'Palindrome Check',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Read a string from input. Print "True" if the string is a palindrome (reads the same forwards and backwards, case-sensitive), otherwise print "False".',
                starterCode: 's = input().strip()\n\n# Check if palindrome and print True or False\n',
                hints: [
                  'Use two pointers: left at 0 and right at len(s)-1',
                  'Compare characters at both pointers; if they differ, it is not a palindrome',
                  'Move pointers towards each other until they meet'
                ],
                testCases: [
                  { input: 'racecar', expectedOutput: 'True' },
                  { input: 'hello', expectedOutput: 'False' },
                  { input: 'a', expectedOutput: 'True' },
                  { input: 'abba', expectedOutput: 'True' }
                ]
              }
            }
          ]
        },
        {
          id: 'dsa_s2c3',
          title: 'Sliding Window',
          lessons: [
            {
              id: 'dsa_s2c3l1',
              type: 'theory',
              title: 'The Sliding Window Technique',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'Sliding window maintains a "window" of elements and slides it across the array, avoiding redundant recalculation to achieve O(N) time.',
                content: `The **Sliding Window** technique is used when you need to find or compute something among all contiguous subarrays (or substrings) of a given size or satisfying a condition.

**Fixed-size window**: Find the maximum sum of any subarray of size $K$.
- Naive approach: recalculate the sum for each window → $O(NK)$.
- Sliding window: add the new element entering the window, subtract the element leaving → $O(N)$.

**Variable-size window**: Find the smallest subarray whose sum is ≥ target.
- Expand the window by moving the right pointer.
- Shrink the window by moving the left pointer when the condition is met.

The key insight is: instead of recomputing from scratch for each window position, we update incrementally by processing only the changes at the window's edges.`,
                codeExample: `# Maximum sum subarray of size K\ndef max_sum_subarray(arr, k):\n    # Calculate sum of first window\n    window_sum = sum(arr[:k])\n    max_sum = window_sum\n    \n    # Slide the window\n    for i in range(k, len(arr)):\n        window_sum += arr[i] - arr[i - k]\n        max_sum = max(max_sum, window_sum)\n    \n    return max_sum\n\nprint(max_sum_subarray([2, 1, 5, 1, 3, 2], 3))  # 9`
              },
              quiz: {
                question: 'What is the time complexity of finding the maximum sum subarray of size K using the sliding window technique?',
                options: ['O(K)', 'O(N*K)', 'O(N)', 'O(N^2)'],
                correct: 2,
                explanation: 'The sliding window visits each element exactly once (adding it when it enters and subtracting it when it leaves), so the time complexity is O(N).'
              }
            },
            {
              id: 'dsa_s2c3l2',
              type: 'challenge',
              title: 'Max Sum Subarray',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Read a list of space-separated integers on line 1 and an integer K on line 2. Find the maximum sum of any contiguous subarray of size K. Print the maximum sum.',
                starterCode: 'arr = [int(x) for x in input().split()]\nk = int(input())\n\n# Find max sum of any subarray of size k and print\n',
                hints: [
                  'Calculate the sum of the first K elements',
                  'Slide the window: for each new position, add the entering element and subtract the leaving element',
                  'Track the maximum sum encountered'
                ],
                testCases: [
                  { input: '2 1 5 1 3 2\n3', expectedOutput: '9' },
                  { input: '1 2 3 4 5\n2', expectedOutput: '9' },
                  { input: '5 -1 3\n1', expectedOutput: '5' }
                ]
              }
            },
            {
              id: 'dsa_s2c3l3',
              type: 'quiz',
              title: 'Sliding Window Quiz',
              xp: 5,
              difficulty: 'medium',
              quiz: {
                question: 'Which problem is NOT suitable for the sliding window technique?',
                options: [
                  'Find maximum sum of K consecutive elements',
                  'Find the longest substring without repeating characters',
                  'Find if an element exists in an unsorted array',
                  'Find the smallest subarray with sum ≥ target'
                ],
                correct: 2,
                explanation: 'Finding an element in an unsorted array is a simple linear search. Sliding window is for contiguous subarray/substring problems, not element existence checks.'
              }
            },
            {
              id: 'dsa_s2c3l4',
              type: 'challenge',
              title: 'Count Substrings of Size K',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Read a string on line 1 and an integer K on line 2. Count the number of distinct substrings of length K. Print the count.',
                starterCode: 's = input().strip()\nk = int(input())\n\n# Count distinct substrings of length K and print\n',
                hints: [
                  'Use a set to store unique substrings',
                  'Slide a window of size K across the string',
                  'Add each substring s[i:i+k] to the set',
                  'Print the length of the set'
                ],
                testCases: [
                  { input: 'abcabc\n3', expectedOutput: '3' },
                  { input: 'aaaa\n2', expectedOutput: '1' },
                  { input: 'abcdef\n1', expectedOutput: '6' }
                ]
              }
            }
          ]
        }
      ]
    },

    // =============================================
    // SECTION 3: LINKED LISTS
    // =============================================
    {
      id: 'dsa_s3',
      title: 'Linked Lists',
      icon: 'git-branch',
      description: 'Understand linear data structures linked via pointers and references',
      chapters: [
        {
          id: 'dsa_s3c1',
          title: 'Singly Linked Lists',
          lessons: [
            {
              id: 'dsa_s3c1l1',
              type: 'theory',
              title: 'Linked List Concepts',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'A linked list is a linear collection of nodes where each node contains data and a pointer reference to the next node.',
                content: `Unlike arrays, a **Linked List** does not store its elements in contiguous memory locations. Instead, each element is a separate **Node** object.

Each node consists of two parts:
1. **Data**: The value stored in the node.
2. **Next**: A pointer or reference to the next node in the list. The last node points to \`None\` (null).

Pros and Cons vs Arrays:
- **Pros**: Inserting/deleting elements at the head of the list is extremely fast ($O(1)$) as no shifting is required.
- **Cons**: Random access is slow ($O(N)$) because you have to traverse the nodes sequentially from the head to reach index $i$.

The head pointer is the entry point to the list. To traverse, start at head and follow \`next\` references until you reach \`None\`.`,
                codeExample: `class Node:\n    def __init__(self, val):\n        self.val = val\n        self.next = None\n\n# Creating a linked list: 1 -> 2 -> 3\nhead = Node(1)\nhead.next = Node(2)\nhead.next.next = Node(3)\n\n# Traverse and print\ncurrent = head\nwhile current:\n    print(current.val, end=" ")\n    current = current.next\n# Output: 1 2 3`
              },
              quiz: {
                question: 'What is the time complexity to insert a node at the head of a Singly Linked List?',
                options: ['O(1)', 'O(N)', 'O(log N)', 'O(N^2)'],
                correct: 0,
                explanation: 'Inserting at the head only requires changing the new node\'s next pointer to point to the current head, which is O(1) constant time.'
              }
            },
            {
              id: 'dsa_s3c1l2',
              type: 'theory',
              title: 'Linked List Operations',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'Key operations include insertion (head/tail/middle), deletion, search, and length calculation — each with distinct time complexities.',
                content: `Common operations on singly linked lists:

**Insert at Head** - $O(1)$: Create new node, set its next to current head, update head.

**Insert at Tail** - $O(N)$: Traverse to the last node, set its next to the new node. (Can be $O(1)$ if you maintain a tail pointer.)

**Delete a Node** - $O(N)$: Find the node before the target (requires traversal), update its next to skip the target.

**Search** - $O(N)$: Traverse from head, checking each node's value.

**Length** - $O(N)$: Count nodes by traversing from head to None.

A critical technique is using a **dummy node** (sentinel) before the head. This simplifies edge cases when deleting the head node or inserting before the head.`,
                codeExample: `class LinkedList:\n    def __init__(self):\n        self.head = None\n    \n    def insert_head(self, val):\n        new_node = Node(val)\n        new_node.next = self.head\n        self.head = new_node\n    \n    def delete_val(self, val):\n        dummy = Node(0)\n        dummy.next = self.head\n        prev = dummy\n        curr = self.head\n        while curr:\n            if curr.val == val:\n                prev.next = curr.next\n                break\n            prev = curr\n            curr = curr.next\n        self.head = dummy.next`
              },
              quiz: {
                question: 'Why is a dummy/sentinel node useful in linked list operations?',
                options: [
                  'It stores the list length',
                  'It simplifies edge cases like deleting the head',
                  'It makes traversal faster',
                  'It doubles the available memory'
                ],
                correct: 1,
                explanation: 'A dummy node before the head means you never have to handle the special case of deleting or inserting before the head separately — the head is just another node after the dummy.'
              }
            },
            {
              id: 'dsa_s3c1l3',
              type: 'quiz',
              title: 'Linked List Properties',
              xp: 5,
              difficulty: 'easy',
              quiz: {
                question: 'Why is random access (accessing element at index i) slower in a linked list than in an array?',
                options: [
                  'Nodes are stored in disk instead of memory',
                  'You must traverse sequentially from the head node',
                  'Linked lists are always sorted',
                  'Nodes are encrypted'
                ],
                correct: 1,
                explanation: 'Since memory is non-contiguous, you cannot calculate the address of node i. You must start at the head and follow `next` references i times, taking O(N) time.'
              }
            },
            {
              id: 'dsa_s3c1l4',
              type: 'challenge',
              title: 'Traverse a Linked List',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Read space-separated integers from input. Build a singly linked list by appending each value in order, then traverse the list and print each value on a separate line.',
                starterCode: 'class Node:\n    def __init__(self, val):\n        self.val = val\n        self.next = None\n\nvalues = [int(x) for x in input().split()]\n\n# Build linked list and traverse to print each value\n',
                hints: [
                  'Create a dummy head to simplify building the list',
                  'Use a tail pointer to append each new node',
                  'Traverse from head to None, printing each value'
                ],
                testCases: [
                  { input: '1 2 3', expectedOutput: '1\n2\n3' },
                  { input: '10 20 30 40', expectedOutput: '10\n20\n30\n40' },
                  { input: '5', expectedOutput: '5' }
                ]
              }
            },
            {
              id: 'dsa_s3c1l5',
              type: 'challenge',
              title: 'Reverse a Linked List',
              xp: 25,
              difficulty: 'medium',
              challenge: {
                description: 'Read space-separated integers from input. Build a linked list, reverse it, then print each value space-separated on one line.',
                starterCode: 'class Node:\n    def __init__(self, val):\n        self.val = val\n        self.next = None\n\nvalues = [int(x) for x in input().split()]\n\n# Build, reverse, then print space-separated\n',
                hints: [
                  'To reverse: use three pointers — prev, curr, and next_node',
                  'At each step: save curr.next, set curr.next = prev, advance prev and curr',
                  'After the loop, prev is the new head'
                ],
                testCases: [
                  { input: '1 2 3 4 5', expectedOutput: '5 4 3 2 1' },
                  { input: '10 20', expectedOutput: '20 10' },
                  { input: '42', expectedOutput: '42' }
                ]
              }
            }
          ]
        },
        {
          id: 'dsa_s3c2',
          title: 'Doubly Linked Lists & Fast/Slow Pointers',
          lessons: [
            {
              id: 'dsa_s3c2l1',
              type: 'theory',
              title: 'Doubly Linked Lists',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'Each node has both a next and a prev pointer, enabling O(1) deletion when you have a reference to the node and bidirectional traversal.',
                content: `A **Doubly Linked List** extends the singly linked list by adding a \`prev\` pointer to each node, pointing to the previous node.

Advantages over singly linked lists:
- **Bidirectional traversal**: You can go forwards and backwards.
- **O(1) deletion with a node reference**: If you have a pointer to the node to delete, you can update both its prev.next and next.prev without searching from the head.

Disadvantages:
- **More memory per node**: Each node stores two pointers instead of one.
- **More complex code**: Insertion and deletion must update two pointers instead of one.

Doubly linked lists are the foundation of the **LRU Cache** data structure, which combines a hash map with a doubly linked list for $O(1)$ get and put operations.`,
                codeExample: `class DNode:\n    def __init__(self, val):\n        self.val = val\n        self.prev = None\n        self.next = None\n\n# Build: 1 <-> 2 <-> 3\nn1 = DNode(1)\nn2 = DNode(2)\nn3 = DNode(3)\nn1.next = n2\nn2.prev = n1\nn2.next = n3\nn3.prev = n2\n\n# Traverse backwards from n3\ncurr = n3\nwhile curr:\n    print(curr.val, end=" ")\n    curr = curr.prev\n# Output: 3 2 1`
              },
              quiz: {
                question: 'What is the time complexity to delete a node from a doubly linked list when you already have a reference to that node?',
                options: ['O(1)', 'O(N)', 'O(log N)', 'O(N^2)'],
                correct: 0,
                explanation: 'With a reference to the node, you simply update node.prev.next and node.next.prev, both O(1) operations.'
              }
            },
            {
              id: 'dsa_s3c2l2',
              type: 'theory',
              title: 'Fast & Slow Pointers (Floyd\'s Algorithm)',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'Use two pointers moving at different speeds: slow moves 1 step, fast moves 2 steps. Used to detect cycles and find the middle of a linked list.',
                content: `The **Fast & Slow Pointer** (also called Floyd's Tortoise and Hare) technique uses two pointers that traverse a linked list at different speeds:
- **Slow pointer** moves 1 step at a time.
- **Fast pointer** moves 2 steps at a time.

**Finding the middle node**: When fast reaches the end, slow is at the middle!

**Detecting a cycle**: If there's a cycle, the fast pointer will eventually "lap" and meet the slow pointer. If there's no cycle, fast reaches None.

This is an elegant $O(N)$ time, $O(1)$ space solution — no extra data structures needed.`,
                codeExample: `# Find middle of linked list\ndef find_middle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n    return slow  # slow is at the middle\n\n# Detect cycle in linked list\ndef has_cycle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast:\n            return True\n    return False`
              },
              quiz: {
                question: 'In Floyd\'s cycle detection, if the fast pointer reaches None, what does it mean?',
                options: [
                  'The list has a cycle',
                  'The list has no cycle',
                  'The list is empty',
                  'The list has an odd number of nodes'
                ],
                correct: 1,
                explanation: 'If fast reaches None, it means the list has an end and therefore no cycle. If there were a cycle, fast would loop forever and eventually meet slow.'
              }
            },
            {
              id: 'dsa_s3c2l3',
              type: 'challenge',
              title: 'Find the Middle Element',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Read space-separated integers. Build a linked list. Find the middle element using the fast/slow pointer technique and print its value. If even number of elements, print the second middle.',
                starterCode: 'class Node:\n    def __init__(self, val):\n        self.val = val\n        self.next = None\n\nvalues = [int(x) for x in input().split()]\n\n# Build linked list, find and print the middle value\n',
                hints: [
                  'Build the linked list by appending values in order',
                  'Use slow and fast pointers both starting at head',
                  'Move slow one step, fast two steps, until fast reaches the end',
                  'Print slow.val — that is the middle'
                ],
                testCases: [
                  { input: '1 2 3 4 5', expectedOutput: '3' },
                  { input: '1 2 3 4', expectedOutput: '3' },
                  { input: '10', expectedOutput: '10' }
                ]
              }
            },
            {
              id: 'dsa_s3c2l4',
              type: 'quiz',
              title: 'Linked List Techniques Quiz',
              xp: 5,
              difficulty: 'medium',
              quiz: {
                question: 'What is the space complexity of Floyd\'s cycle detection algorithm?',
                options: ['O(N)', 'O(log N)', 'O(N^2)', 'O(1)'],
                correct: 3,
                explanation: 'Floyd\'s algorithm only uses two pointer variables regardless of the list size, so the space complexity is O(1).'
              }
            }
          ]
        }
      ]
    },

    // =============================================
    // SECTION 4: STACKS & QUEUES
    // =============================================
    {
      id: 'dsa_s4',
      title: 'Stacks & Queues',
      icon: 'clipboard',
      description: 'Implement LIFO and FIFO protocols for managing execution workflows and buffers',
      chapters: [
        {
          id: 'dsa_s4c1',
          title: 'Stacks',
          lessons: [
            {
              id: 'dsa_s4c1l1',
              type: 'theory',
              title: 'LIFO Structure',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'A Stack is a Last-In-First-Out (LIFO) collection where elements are added and removed from the same end.',
                content: `A **Stack** behaves like a stack of plates in a cafeteria: the last plate placed on top is the first plate taken off. This is called **Last-In, First-Out (LIFO)**.

Main operations:
- **Push**: Add an item to the top of the stack ($O(1)$).
- **Pop**: Remove the top item from the stack ($O(1)$).
- **Peek**: View the top item without removing it ($O(1)$).

Stacks are used in many core technologies, such as:
- The browser history (the back button pops the last visited URL).
- The Undo/Redo features in text editors.
- The Call Stack in programming language execution engines.
- Expression evaluation and syntax parsing in compilers.`,
                codeExample: `# Implementing a stack using a Python list\nstack = []\n\n# Push operations\nstack.append('A')\nstack.append('B')\nstack.append('C')\n\nprint(stack)       # ['A', 'B', 'C']\n\n# Pop operation\ntop = stack.pop()  # Removes and returns 'C'\nprint(top)         # 'C'\n\n# Peek (view top without removing)\nprint(stack[-1])   # 'B'\nprint(len(stack))  # 2`
              },
              quiz: {
                question: 'Which stack operation has a time complexity of O(1)?',
                options: ['Push only', 'Pop only', 'Push and Pop', 'None of the above'],
                correct: 2,
                explanation: 'Both push (append) and pop (remove from end) are O(1) operations in a stack.'
              }
            },
            {
              id: 'dsa_s4c1l2',
              type: 'theory',
              title: 'Stack Applications',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'Stacks are used for function call tracking, expression evaluation, undo systems, and parsing matching pairs like brackets.',
                content: `Stacks power many fundamental computing concepts:

**1. Function Call Stack**: When a function calls another function, the current state is pushed onto the call stack. When the called function returns, the state is popped and execution resumes.

**2. Expression Evaluation**: Converting infix notation ($2 + 3$) to postfix notation ($2\\ 3\\ +$) and evaluating it uses two stacks.

**3. Bracket Matching**: Check if parentheses, brackets, and braces are properly nested — a classic interview problem.

**4. Monotonic Stack**: A stack where elements are in increasing or decreasing order. Used to find the next greater/smaller element for each element in an array in $O(N)$ time.

**5. Undo/Redo**: Each action is pushed to an undo stack. Undoing pops from undo and pushes to redo.`,
                codeExample: `# Evaluating a postfix expression\ndef eval_postfix(expression):\n    stack = []\n    for token in expression.split():\n        if token.isdigit():\n            stack.append(int(token))\n        else:\n            b = stack.pop()\n            a = stack.pop()\n            if token == '+': stack.append(a + b)\n            elif token == '-': stack.append(a - b)\n            elif token == '*': stack.append(a * b)\n            elif token == '/': stack.append(a // b)\n    return stack[0]\n\nprint(eval_postfix("3 4 + 2 *"))  # 14`
              },
              quiz: {
                question: 'What data structure does the operating system use to manage function calls?',
                options: ['Queue', 'Array', 'Stack (Call Stack)', 'Hash Table'],
                correct: 2,
                explanation: 'The OS uses a call stack. Each function call pushes a stack frame, and returning from a function pops the frame.'
              }
            },
            {
              id: 'dsa_s4c1l3',
              type: 'challenge',
              title: 'Balanced Parentheses',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Write a program that reads a string containing brackets `(`, `)`, `{`, `}`, `[` and `]` from input. Determine if the brackets are closed in the correct order. Print `True` if the string is balanced, and `False` otherwise.',
                starterCode: '# Read bracket string\ns = input().strip()\n\n# Verify if balanced and print True or False\n',
                hints: [
                  'Use a stack (a list in Python). Loop through each character.',
                  'If it is an opening bracket: push to stack.',
                  'If it is a closing bracket: check if the stack is empty (unbalanced!), or if the popped opening bracket matches the closing bracket.',
                  'After the loop, check if the stack is empty (if not, some brackets were not closed).'
                ],
                testCases: [
                  { input: '()[]{}', expectedOutput: 'True' },
                  { input: '([)]', expectedOutput: 'False' },
                  { input: '{[]}', expectedOutput: 'True' },
                  { input: '(', expectedOutput: 'False' }
                ]
              }
            },
            {
              id: 'dsa_s4c1l4',
              type: 'challenge',
              title: 'Reverse a String Using a Stack',
              xp: 15,
              difficulty: 'easy',
              challenge: {
                description: 'Read a string from input. Reverse it using a stack (push each character, then pop all characters). Print the reversed string.',
                starterCode: 's = input().strip()\n\n# Use a stack to reverse the string and print\n',
                hints: [
                  'Push each character onto a stack (list)',
                  'Pop all characters and join them to form the reversed string',
                  'print("".join(reversed_chars))'
                ],
                testCases: [
                  { input: 'hello', expectedOutput: 'olleh' },
                  { input: 'abcd', expectedOutput: 'dcba' },
                  { input: 'a', expectedOutput: 'a' }
                ]
              }
            }
          ]
        },
        {
          id: 'dsa_s4c2',
          title: 'Queues',
          lessons: [
            {
              id: 'dsa_s4c2l1',
              type: 'theory',
              title: 'FIFO Structure',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'A Queue is a First-In-First-Out (FIFO) collection where elements are added at the rear and removed from the front.',
                content: `A **Queue** models a real-world line of people: the first person to join is the first to be served. This is **First-In, First-Out (FIFO)**.

Main operations:
- **Enqueue**: Add an item to the rear ($O(1)$).
- **Dequeue**: Remove an item from the front ($O(1)$ with proper implementation).
- **Peek/Front**: View the front item without removing ($O(1)$).

**Important**: Don't use a Python list as a queue by doing \`list.pop(0)\` — that's $O(N)$ because it shifts all elements! Use \`collections.deque\` instead, which provides $O(1)$ operations on both ends.

Queues are essential for:
- **BFS (Breadth-First Search)** in graphs and trees.
- Task scheduling in operating systems.
- Print job management.
- Message queues in distributed systems.`,
                codeExample: `from collections import deque\n\n# Create a queue\nqueue = deque()\n\n# Enqueue operations\nqueue.append('A')   # rear\nqueue.append('B')\nqueue.append('C')\n\nprint(queue)         # deque(['A', 'B', 'C'])\n\n# Dequeue operation\nfront = queue.popleft()  # O(1)!\nprint(front)             # 'A'\nprint(queue)             # deque(['B', 'C'])`
              },
              quiz: {
                question: 'Why should you avoid using list.pop(0) for a queue in Python?',
                options: [
                  'It throws an error',
                  'It is O(N) because all remaining elements must shift',
                  'Lists don\'t support pop',
                  'It removes the last element instead'
                ],
                correct: 1,
                explanation: 'list.pop(0) removes the first element but must shift all remaining elements left by one position, making it O(N). collections.deque.popleft() is O(1).'
              }
            },
            {
              id: 'dsa_s4c2l2',
              type: 'theory',
              title: 'Priority Queues & Deques',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'A priority queue serves the highest-priority element first (implemented via heaps). A deque supports O(1) insertion/removal at both ends.',
                content: `Beyond simple queues, two advanced variants are extremely useful:

**Priority Queue**: Elements have priorities. The highest-priority element is dequeued first regardless of insertion order. Implemented using a **Heap** data structure.
- Enqueue: $O(\\log N)$
- Dequeue (min/max): $O(\\log N)$
- Peek (min/max): $O(1)$

In Python, use \`heapq\` for a min-heap (smallest element first).

**Deque (Double-Ended Queue)**: Supports insertion and deletion at **both** the front and rear in $O(1)$. Python's \`collections.deque\` is a deque.

Priority queues are used in:
- Dijkstra's shortest path algorithm
- Task scheduling with priorities
- Huffman encoding for compression`,
                codeExample: `import heapq\n\n# Priority Queue using heapq (min-heap)\npq = []\nheapq.heappush(pq, (3, 'Low priority'))\nheapq.heappush(pq, (1, 'High priority'))\nheapq.heappush(pq, (2, 'Medium priority'))\n\n# Dequeue in priority order\nwhile pq:\n    priority, task = heapq.heappop(pq)\n    print(f"{task} (priority {priority})")\n# High priority (priority 1)\n# Medium priority (priority 2)\n# Low priority (priority 3)`
              },
              quiz: {
                question: 'What data structure is typically used to implement a Priority Queue efficiently?',
                options: ['Array', 'Linked List', 'Heap', 'Stack'],
                correct: 2,
                explanation: 'A Heap (usually a binary min-heap or max-heap) provides O(log N) insertion and O(log N) extraction of the highest-priority element, making it ideal for priority queues.'
              }
            },
            {
              id: 'dsa_s4c2l3',
              type: 'challenge',
              title: 'Implement a Queue',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Read operations on line 1 (comma-separated): "E X" to enqueue value X, "D" to dequeue. Process each operation and after all operations, print the remaining queue elements space-separated (front to rear). If dequeue is called on empty queue, ignore it.',
                starterCode: 'from collections import deque\nops = input().split(",")\n\n# Process operations and print remaining queue\n',
                hints: [
                  'Use collections.deque for the queue',
                  'Split each operation by space to get the command',
                  'For "E X", append X to the queue',
                  'For "D", popleft if the queue is not empty'
                ],
                testCases: [
                  { input: 'E 1,E 2,E 3,D', expectedOutput: '2 3' },
                  { input: 'E 5,E 10,D,D', expectedOutput: '' },
                  { input: 'E 1,E 2,E 3', expectedOutput: '1 2 3' }
                ]
              }
            },
            {
              id: 'dsa_s4c2l4',
              type: 'quiz',
              title: 'Queues Quiz',
              xp: 5,
              difficulty: 'easy',
              quiz: {
                question: 'Which algorithm relies heavily on a Queue data structure?',
                options: [
                  'Depth-First Search (DFS)',
                  'Breadth-First Search (BFS)',
                  'Binary Search',
                  'Merge Sort'
                ],
                correct: 1,
                explanation: 'BFS uses a queue to explore nodes level by level. DFS uses a stack (or recursion). Binary Search uses index manipulation. Merge Sort uses recursion/divide-and-conquer.'
              }
            }
          ]
        },
        {
          id: 'dsa_s4c3',
          title: 'Monotonic Stacks & Queue Problems',
          lessons: [
            {
              id: 'dsa_s4c3l1',
              type: 'theory',
              title: 'Monotonic Stack',
              xp: 15,
              difficulty: 'hard',
              theory: {
                tldr: 'A monotonic stack maintains elements in sorted order (increasing or decreasing). Used to find the next greater/smaller element in O(N) time.',
                content: `A **Monotonic Stack** is a stack where the elements are always in a specific order — either always increasing from bottom to top, or always decreasing.

**Next Greater Element** problem: For each element in an array, find the first element to its right that is greater than it.

Brute force: $O(N^2)$ — for each element, scan right.
Monotonic Stack: $O(N)$ — process from right to left (or left to right), maintaining a decreasing stack.

Algorithm:
1. Traverse the array from right to left.
2. For each element, pop from stack while stack top ≤ current element.
3. If stack is empty, no greater element exists (answer is -1).
4. Otherwise, the stack top is the next greater element.
5. Push current element onto the stack.`,
                codeExample: `def next_greater_element(arr):\n    n = len(arr)\n    result = [-1] * n\n    stack = []  # stores indices\n    \n    for i in range(n - 1, -1, -1):\n        # Pop elements smaller or equal\n        while stack and arr[stack[-1]] <= arr[i]:\n            stack.pop()\n        \n        if stack:\n            result[i] = arr[stack[-1]]\n        \n        stack.append(i)\n    \n    return result\n\nprint(next_greater_element([4, 5, 2, 10, 8]))\n# [5, 10, 10, -1, -1]`
              },
              quiz: {
                question: 'What is the time complexity of finding the next greater element for all elements using a monotonic stack?',
                options: ['O(N^2)', 'O(N log N)', 'O(N)', 'O(log N)'],
                correct: 2,
                explanation: 'Each element is pushed and popped from the stack at most once, giving us O(N) total operations.'
              }
            },
            {
              id: 'dsa_s4c3l2',
              type: 'challenge',
              title: 'Next Greater Element',
              xp: 25,
              difficulty: 'hard',
              challenge: {
                description: 'Read space-separated integers. For each element, find the first element to its right that is strictly greater. If none exists, use -1. Print the results space-separated.',
                starterCode: 'arr = [int(x) for x in input().split()]\n\n# Find next greater element for each and print\n',
                hints: [
                  'Use a stack that stores indices',
                  'Process from right to left',
                  'Pop elements from stack while they are ≤ current element',
                  'Stack top (if exists) is the next greater element'
                ],
                testCases: [
                  { input: '4 5 2 10 8', expectedOutput: '5 10 10 -1 -1' },
                  { input: '3 2 1', expectedOutput: '-1 -1 -1' },
                  { input: '1 2 3', expectedOutput: '2 3 -1' }
                ]
              }
            }
          ]
        }
      ]
    },

    // =============================================
    // SECTION 5: RECURSION & BACKTRACKING
    // =============================================
    {
      id: 'dsa_s5',
      title: 'Recursion & Backtracking',
      icon: 'repeat',
      description: 'Learn to solve problems by breaking them down into smaller subproblems',
      chapters: [
        {
          id: 'dsa_s5c1',
          title: 'Recursion Fundamentals',
          lessons: [
            {
              id: 'dsa_s5c1l1',
              type: 'theory',
              title: 'What is Recursion?',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'Recursion is when a function calls itself. Every recursive function needs a base case (when to stop) and a recursive case (how to break the problem down).',
                content: `**Recursion** is a technique where a function calls itself to solve smaller instances of the same problem.

Every recursive function has two parts:
1. **Base Case**: The simplest version of the problem that can be solved directly without further recursion. Without a base case, recursion would continue forever (infinite loop → stack overflow).
2. **Recursive Case**: The function calls itself with a smaller or simpler input, moving towards the base case.

Example: Factorial
- Base case: $0! = 1$
- Recursive case: $N! = N \\times (N-1)!$

The call stack tracks each recursive call. When a base case is reached, the stack unwinds as each call returns its result to the caller.`,
                codeExample: `# Factorial using recursion\ndef factorial(n):\n    if n <= 1:          # Base case\n        return 1\n    return n * factorial(n - 1)  # Recursive case\n\nprint(factorial(5))  # 120\n\n# Call stack:\n# factorial(5) -> 5 * factorial(4)\n#   factorial(4) -> 4 * factorial(3)\n#     factorial(3) -> 3 * factorial(2)\n#       factorial(2) -> 2 * factorial(1)\n#         factorial(1) -> 1  (base case!)\n# Unwinds: 2*1=2, 3*2=6, 4*6=24, 5*24=120`
              },
              quiz: {
                question: 'What happens if a recursive function lacks a base case?',
                options: [
                  'It returns 0',
                  'It runs infinitely until a stack overflow',
                  'It uses a loop instead',
                  'It runs once and stops'
                ],
                correct: 1,
                explanation: 'Without a base case, the function keeps calling itself indefinitely, filling up the call stack until the system runs out of stack memory (stack overflow error).'
              }
            },
            {
              id: 'dsa_s5c1l2',
              type: 'theory',
              title: 'Recursion vs Iteration',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'Any recursive algorithm can be rewritten iteratively (and vice versa). Recursion is more elegant but uses stack memory; iteration is more memory-efficient.',
                content: `Every recursive solution has an equivalent iterative solution, and vice versa. The choice depends on the problem:

**When recursion shines**:
- Tree/graph traversal (DFS)
- Divide-and-conquer algorithms (merge sort, quicksort)
- Problems with branching decisions (backtracking, permutations)
- When the recursive solution is dramatically simpler

**When iteration is better**:
- Simple loops (sum, factorial)
- When stack overflow is a concern (Python's default limit is ~1000 frames)
- When you need maximum performance

**Tail Recursion**: When the recursive call is the last operation in the function. Some languages optimize this to use constant stack space (Python does not).`,
                codeExample: `# Recursive sum\ndef sum_recursive(n):\n    if n <= 0:\n        return 0\n    return n + sum_recursive(n - 1)\n\n# Iterative sum (more memory efficient)\ndef sum_iterative(n):\n    total = 0\n    for i in range(1, n + 1):\n        total += i\n    return total\n\n# Both give the same result\nprint(sum_recursive(100))   # 5050\nprint(sum_iterative(100))   # 5050`
              },
              quiz: {
                question: 'What is the space complexity of a recursive function that makes N recursive calls?',
                options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
                correct: 2,
                explanation: 'Each recursive call adds a frame to the call stack. With N calls, the stack uses O(N) space.'
              }
            },
            {
              id: 'dsa_s5c1l3',
              type: 'challenge',
              title: 'Fibonacci Recursion',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Read an integer N from input. Print the Nth Fibonacci number (0-indexed: fib(0)=0, fib(1)=1, fib(2)=1, fib(3)=2, ...). Use recursion.',
                starterCode: 'n = int(input())\n\n# Implement recursive fibonacci and print fib(n)\n',
                hints: [
                  'Base cases: fib(0) = 0, fib(1) = 1',
                  'Recursive case: fib(n) = fib(n-1) + fib(n-2)',
                  'For large n, this is slow (O(2^N)) — but works for small inputs'
                ],
                testCases: [
                  { input: '0', expectedOutput: '0' },
                  { input: '1', expectedOutput: '1' },
                  { input: '6', expectedOutput: '8' },
                  { input: '10', expectedOutput: '55' }
                ]
              }
            },
            {
              id: 'dsa_s5c1l4',
              type: 'challenge',
              title: 'Power Function',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Read two integers: base and exponent (space-separated). Compute base^exponent using recursion (not the ** operator). Print the result. Exponent is always >= 0.',
                starterCode: 'base, exp = map(int, input().split())\n\n# Implement recursive power and print result\n',
                hints: [
                  'Base case: anything to the power of 0 is 1',
                  'Recursive case: base^exp = base * base^(exp-1)',
                  'For efficiency: base^exp = (base^(exp//2))^2 if exp is even'
                ],
                testCases: [
                  { input: '2 10', expectedOutput: '1024' },
                  { input: '3 0', expectedOutput: '1' },
                  { input: '5 3', expectedOutput: '125' }
                ]
              }
            },
            {
              id: 'dsa_s5c1l5',
              type: 'quiz',
              title: 'Recursion Quiz',
              xp: 5,
              difficulty: 'medium',
              quiz: {
                question: 'What is the time complexity of the naive recursive Fibonacci (no memoization)?',
                options: ['O(N)', 'O(N^2)', 'O(2^N)', 'O(N log N)'],
                correct: 2,
                explanation: 'Each call branches into two more calls, creating a binary tree of calls. The total number of calls is approximately O(2^N), which is exponential and very slow.'
              }
            }
          ]
        },
        {
          id: 'dsa_s5c2',
          title: 'Backtracking',
          lessons: [
            {
              id: 'dsa_s5c2l1',
              type: 'theory',
              title: 'What is Backtracking?',
              xp: 15,
              difficulty: 'hard',
              theory: {
                tldr: 'Backtracking systematically explores all possible solutions, abandoning a path as soon as it determines it cannot lead to a valid solution.',
                content: `**Backtracking** is a refined form of brute-force search. Instead of generating all possible solutions and then filtering, it builds solutions incrementally and prunes invalid paths early.

The general pattern:
1. **Choose**: Make a decision (e.g., place a queen, pick a number).
2. **Explore**: Recursively solve the rest of the problem.
3. **Unchoose (Backtrack)**: If the current path doesn't lead to a solution, undo the decision and try the next option.

Classic problems:
- **N-Queens**: Place N queens on an N×N board so no two attack each other.
- **Sudoku Solver**: Fill in missing numbers following Sudoku rules.
- **Permutations/Combinations**: Generate all arrangements of a set.
- **Subset Sum**: Find subsets that sum to a target.

The key optimization is **pruning**: cutting off branches of the search tree that cannot possibly yield valid solutions.`,
                codeExample: `# Generate all permutations using backtracking\ndef permutations(nums):\n    result = []\n    \n    def backtrack(path, remaining):\n        if not remaining:\n            result.append(path[:])\n            return\n        \n        for i in range(len(remaining)):\n            # Choose\n            path.append(remaining[i])\n            # Explore\n            backtrack(path, remaining[:i] + remaining[i+1:])\n            # Unchoose (backtrack)\n            path.pop()\n    \n    backtrack([], nums)\n    return result\n\nprint(permutations([1, 2, 3]))`
              },
              quiz: {
                question: 'What is the main advantage of backtracking over brute-force enumeration?',
                options: [
                  'It guarantees polynomial time complexity',
                  'It prunes invalid paths early, reducing the search space',
                  'It always uses O(1) space',
                  'It only works for sorting problems'
                ],
                correct: 1,
                explanation: 'Backtracking prunes branches of the search tree as soon as it detects they cannot lead to valid solutions, often dramatically reducing the number of candidates explored.'
              }
            },
            {
              id: 'dsa_s5c2l2',
              type: 'theory',
              title: 'Generating Subsets',
              xp: 15,
              difficulty: 'hard',
              theory: {
                tldr: 'Generate all subsets by making a binary choice for each element: include it or exclude it. This creates 2^N subsets.',
                content: `The **Subsets** (Power Set) problem is a foundational backtracking exercise.

For a set of $N$ elements, there are $2^N$ possible subsets (including the empty set and the full set). At each element, we make a binary choice: **include** or **exclude**.

This creates a binary decision tree of depth $N$:
- At level 0, choose whether to include element 0.
- At level 1, choose whether to include element 1.
- ...and so on.

The leaves of this tree are all $2^N$ subsets.

Time Complexity: $O(2^N)$ — we must visit every possible subset.
Space Complexity: $O(N)$ — the recursion depth is $N$.`,
                codeExample: `# Generate all subsets\ndef subsets(nums):\n    result = []\n    \n    def backtrack(index, current):\n        if index == len(nums):\n            result.append(current[:])\n            return\n        \n        # Exclude nums[index]\n        backtrack(index + 1, current)\n        \n        # Include nums[index]\n        current.append(nums[index])\n        backtrack(index + 1, current)\n        current.pop()\n    \n    backtrack(0, [])\n    return result\n\nprint(subsets([1, 2, 3]))\n# [[], [3], [2], [2,3], [1], [1,3], [1,2], [1,2,3]]`
              },
              quiz: {
                question: 'How many subsets does a set of N elements have?',
                options: ['N', 'N^2', '2^N', 'N!'],
                correct: 2,
                explanation: 'Each element can either be included or excluded (2 choices), and there are N elements, giving 2^N total subsets.'
              }
            },
            {
              id: 'dsa_s5c2l3',
              type: 'challenge',
              title: 'Generate Permutations',
              xp: 25,
              difficulty: 'hard',
              challenge: {
                description: 'Read space-separated integers. Generate all permutations and print each on a separate line (elements space-separated within each permutation). Print permutations in lexicographic order.',
                starterCode: 'nums = [int(x) for x in input().split()]\n\n# Generate and print all permutations\n',
                hints: [
                  'Sort the input first for lexicographic order',
                  'Use backtracking with a path and remaining elements',
                  'At each step, choose an unused element, add to path, recurse, then remove (backtrack)',
                  'When path length equals nums length, print the permutation'
                ],
                testCases: [
                  { input: '1 2 3', expectedOutput: '1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1' },
                  { input: '1 2', expectedOutput: '1 2\n2 1' }
                ]
              }
            },
            {
              id: 'dsa_s5c2l4',
              type: 'challenge',
              title: 'Subset Sum',
              xp: 25,
              difficulty: 'hard',
              challenge: {
                description: 'Read space-separated positive integers on line 1, and a target sum on line 2. Print "True" if any subset of the numbers sums to the target, otherwise print "False".',
                starterCode: 'nums = [int(x) for x in input().split()]\ntarget = int(input())\n\n# Check if any subset sums to target\n',
                hints: [
                  'Use backtracking: for each element, try including or excluding it',
                  'Base case: if target == 0, return True',
                  'If index reaches end or target < 0, return False',
                  'Check: include nums[index] (reduce target) OR exclude it'
                ],
                testCases: [
                  { input: '3 34 4 12 5 2\n9', expectedOutput: 'True' },
                  { input: '3 34 4 12 5 2\n30', expectedOutput: 'False' },
                  { input: '1 2 3\n6', expectedOutput: 'True' }
                ]
              }
            }
          ]
        }
      ]
    },

    // =============================================
    // SECTION 6: TREES
    // =============================================
    {
      id: 'dsa_s6',
      title: 'Trees',
      icon: 'git-branch',
      description: 'Master hierarchical data structures from binary trees to balanced BSTs',
      chapters: [
        {
          id: 'dsa_s6c1',
          title: 'Binary Trees',
          lessons: [
            {
              id: 'dsa_s6c1l1',
              type: 'theory',
              title: 'Tree Terminology',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'A tree is a hierarchical structure with a root node, child nodes, and leaf nodes. Binary trees have at most 2 children per node.',
                content: `A **Tree** is a non-linear, hierarchical data structure consisting of nodes connected by edges.

Key terminology:
- **Root**: The topmost node (no parent).
- **Parent**: A node that has children.
- **Child**: A node that has a parent.
- **Leaf**: A node with no children.
- **Depth**: The number of edges from the root to a node.
- **Height**: The number of edges from a node to the deepest leaf below it. The height of the tree is the height of the root.
- **Subtree**: A node and all its descendants.

A **Binary Tree** is a tree where each node has at most **2 children**, referred to as the left child and right child.

Trees are everywhere: file systems, HTML DOM, organizational charts, and abstract syntax trees in compilers.`,
                codeExample: `class TreeNode:\n    def __init__(self, val):\n        self.val = val\n        self.left = None\n        self.right = None\n\n# Build a simple binary tree:\n#       1\n#      / \\\n#     2   3\n#    / \\\n#   4   5\nroot = TreeNode(1)\nroot.left = TreeNode(2)\nroot.right = TreeNode(3)\nroot.left.left = TreeNode(4)\nroot.left.right = TreeNode(5)`
              },
              quiz: {
                question: 'What is the maximum number of nodes at depth d in a binary tree?',
                options: ['d', 'd^2', '2^d', '2d'],
                correct: 2,
                explanation: 'At depth 0 (root), there is 1 node. At depth 1, up to 2 nodes. At depth d, up to 2^d nodes, since each level can have at most double the previous level.'
              }
            },
            {
              id: 'dsa_s6c1l2',
              type: 'theory',
              title: 'Tree Traversals',
              xp: 15,
              difficulty: 'medium',
              theory: {
                tldr: 'Three DFS traversals (pre-order, in-order, post-order) and one BFS traversal (level-order) cover all ways to visit every node in a tree.',
                content: `There are four main ways to traverse a binary tree:

**DFS (Depth-First Search) Traversals:**

1. **Pre-order** (Root, Left, Right): Visit the node, then traverse left subtree, then right subtree. Used for copying/serializing a tree.

2. **In-order** (Left, Root, Right): Traverse left, visit the node, then traverse right. For a BST, this gives nodes in sorted order!

3. **Post-order** (Left, Right, Root): Traverse left, traverse right, then visit the node. Used for deletion and calculating directory sizes.

**BFS (Breadth-First Search) Traversal:**

4. **Level-order**: Visit all nodes at depth 0, then depth 1, then depth 2, etc. Uses a queue.`,
                codeExample: `# DFS Traversals\ndef preorder(node):\n    if not node: return []\n    return [node.val] + preorder(node.left) + preorder(node.right)\n\ndef inorder(node):\n    if not node: return []\n    return inorder(node.left) + [node.val] + inorder(node.right)\n\ndef postorder(node):\n    if not node: return []\n    return postorder(node.left) + postorder(node.right) + [node.val]\n\n# BFS Level-order\nfrom collections import deque\ndef level_order(root):\n    if not root: return []\n    result, queue = [], deque([root])\n    while queue:\n        node = queue.popleft()\n        result.append(node.val)\n        if node.left: queue.append(node.left)\n        if node.right: queue.append(node.right)\n    return result`
              },
              quiz: {
                question: 'Which tree traversal visits nodes in sorted order for a Binary Search Tree?',
                options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'],
                correct: 1,
                explanation: 'In-order traversal (Left, Root, Right) visits BST nodes in ascending sorted order because left subtree values < root < right subtree values.'
              }
            },
            {
              id: 'dsa_s6c1l3',
              type: 'challenge',
              title: 'Tree Height',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Given a binary tree represented as a list of values (level-order, using -1 for null nodes), calculate and print the height of the tree. The height is the number of edges on the longest root-to-leaf path. A single node has height 0.',
                starterCode: 'values = [int(x) for x in input().split()]\n\n# Build tree from level-order list and compute height\n',
                hints: [
                  'Build the tree using a queue: for each node, the left child is at 2*i+1 and right at 2*i+2 in the list',
                  'Height = max(height(left), height(right)) + 1 for recursive approach',
                  'Base case: null node has height -1',
                  'Alternative: just compute from the array directly using recursion'
                ],
                testCases: [
                  { input: '1 2 3 4 5 -1 -1', expectedOutput: '2' },
                  { input: '1', expectedOutput: '0' },
                  { input: '1 2 -1 3 -1', expectedOutput: '2' }
                ]
              }
            },
            {
              id: 'dsa_s6c1l4',
              type: 'challenge',
              title: 'In-Order Traversal',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Given a binary tree as level-order values (-1 for null), print the in-order traversal space-separated.',
                starterCode: 'values = [int(x) for x in input().split()]\n\n# Build tree and print in-order traversal\n',
                hints: [
                  'Build tree from level-order list',
                  'In-order: traverse left, visit root, traverse right',
                  'Skip null (-1) nodes',
                  'Collect values into a list and print space-separated'
                ],
                testCases: [
                  { input: '1 2 3 4 5 6 7', expectedOutput: '4 2 5 1 6 3 7' },
                  { input: '1 2 3', expectedOutput: '2 1 3' },
                  { input: '5', expectedOutput: '5' }
                ]
              }
            },
            {
              id: 'dsa_s6c1l5',
              type: 'quiz',
              title: 'Tree Traversal Quiz',
              xp: 5,
              difficulty: 'medium',
              quiz: {
                question: 'What data structure does Level-Order (BFS) traversal use?',
                options: ['Stack', 'Queue', 'Heap', 'Hash Map'],
                correct: 1,
                explanation: 'Level-order traversal processes nodes level by level using a Queue (FIFO). It enqueues children and dequeues the next node to process.'
              }
            }
          ]
        },
        {
          id: 'dsa_s6c2',
          title: 'Binary Search Trees (BST)',
          lessons: [
            {
              id: 'dsa_s6c2l1',
              type: 'theory',
              title: 'BST Property & Operations',
              xp: 15,
              difficulty: 'medium',
              theory: {
                tldr: 'In a BST, for every node: all values in the left subtree are less, and all in the right subtree are greater. This enables O(log N) search, insert, and delete.',
                content: `A **Binary Search Tree (BST)** is a binary tree with a special ordering property:

For every node $X$:
- All values in the **left subtree** of $X$ are **less than** $X.val$.
- All values in the **right subtree** of $X$ are **greater than** $X.val$.

This property enables efficient operations:
- **Search**: Start at root. If target < node, go left. If target > node, go right. Takes $O(h)$ where $h$ is the height.
- **Insert**: Search for the position where the new value should go, then insert there.
- **Delete**: Three cases — leaf node (just remove), one child (replace with child), two children (replace with in-order successor or predecessor).

For a balanced BST, $h = O(\\log N)$. But in the worst case (skewed tree), $h = O(N)$.`,
                codeExample: `class BST:\n    def __init__(self):\n        self.root = None\n    \n    def insert(self, val):\n        if not self.root:\n            self.root = TreeNode(val)\n            return\n        curr = self.root\n        while curr:\n            if val < curr.val:\n                if not curr.left:\n                    curr.left = TreeNode(val)\n                    return\n                curr = curr.left\n            else:\n                if not curr.right:\n                    curr.right = TreeNode(val)\n                    return\n                curr = curr.right\n    \n    def search(self, val):\n        curr = self.root\n        while curr:\n            if val == curr.val: return True\n            elif val < curr.val: curr = curr.left\n            else: curr = curr.right\n        return False`
              },
              quiz: {
                question: 'What is the worst-case time complexity of searching in a BST?',
                options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
                correct: 2,
                explanation: 'In the worst case, the BST is completely skewed (like a linked list), making the height equal to N. So search takes O(N). This is why balanced BSTs (AVL, Red-Black) are important.'
              }
            },
            {
              id: 'dsa_s6c2l2',
              type: 'theory',
              title: 'BST Validation & Properties',
              xp: 15,
              difficulty: 'medium',
              theory: {
                tldr: 'To validate a BST, check that each node\'s value falls within an allowed range defined by its ancestors. In-order traversal of a valid BST produces sorted output.',
                content: `**Validating a BST** is a common interview problem. A naive approach of checking only parent-child relationships fails because a node must satisfy the BST property with respect to ALL ancestors, not just its parent.

Correct approach: pass a valid range \`(min_val, max_val)\` down the tree:
- Root can be any value: range is $(-\\infty, +\\infty)$.
- When going left from node $X$: new max is $X.val$.
- When going right from node $X$: new min is $X.val$.

**Other useful BST properties:**
- In-order traversal gives sorted order.
- The leftmost node is the minimum.
- The rightmost node is the maximum.
- The in-order successor of node $X$ is the leftmost node in $X$'s right subtree (if it exists).`,
                codeExample: `def is_valid_bst(node, min_val=float('-inf'), max_val=float('inf')):\n    if not node:\n        return True\n    \n    if node.val <= min_val or node.val >= max_val:\n        return False\n    \n    return (is_valid_bst(node.left, min_val, node.val) and\n            is_valid_bst(node.right, node.val, max_val))\n\n# Find minimum in BST\ndef find_min(node):\n    while node.left:\n        node = node.left\n    return node.val\n\n# Find maximum in BST\ndef find_max(node):\n    while node.right:\n        node = node.right\n    return node.val`
              },
              quiz: {
                question: 'What is the in-order traversal output of a valid BST containing values 5, 3, 7, 1, 4?',
                options: ['5 3 7 1 4', '1 3 4 5 7', '7 5 4 3 1', '3 1 4 5 7'],
                correct: 1,
                explanation: 'In-order traversal of a valid BST always produces values in ascending sorted order: 1, 3, 4, 5, 7.'
              }
            },
            {
              id: 'dsa_s6c2l3',
              type: 'challenge',
              title: 'BST Search',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Read space-separated integers on line 1 to build a BST by inserting them in order. Read a target integer on line 2. Print "Found" if the target exists in the BST, otherwise print "Not Found".',
                starterCode: 'class TreeNode:\n    def __init__(self, val):\n        self.val = val\n        self.left = None\n        self.right = None\n\nvalues = [int(x) for x in input().split()]\ntarget = int(input())\n\n# Build BST and search for target\n',
                hints: [
                  'Insert each value into the BST maintaining the BST property',
                  'To search: start at root, go left if target < node, right if target > node',
                  'If you reach None, the target is not found'
                ],
                testCases: [
                  { input: '5 3 7 1 4\n4', expectedOutput: 'Found' },
                  { input: '5 3 7 1 4\n6', expectedOutput: 'Not Found' },
                  { input: '10\n10', expectedOutput: 'Found' }
                ]
              }
            },
            {
              id: 'dsa_s6c2l4',
              type: 'quiz',
              title: 'BST Quiz',
              xp: 5,
              difficulty: 'medium',
              quiz: {
                question: 'In a BST, where is the smallest element located?',
                options: ['At the root', 'At the leftmost node', 'At the rightmost node', 'At a random position'],
                correct: 1,
                explanation: 'In a BST, smaller values are always to the left. Following left pointers until you can\'t go further leads you to the smallest element.'
              }
            }
          ]
        },
        {
          id: 'dsa_s6c3',
          title: 'Heaps',
          lessons: [
            {
              id: 'dsa_s6c3l1',
              type: 'theory',
              title: 'Binary Heaps',
              xp: 15,
              difficulty: 'medium',
              theory: {
                tldr: 'A binary heap is a complete binary tree where every parent is smaller (min-heap) or larger (max-heap) than its children. Stored as an array.',
                content: `A **Binary Heap** is a complete binary tree (every level is fully filled except possibly the last, which is filled from left to right) with the **heap property**:

**Min-Heap**: Every parent ≤ its children. The root is the minimum.
**Max-Heap**: Every parent ≥ its children. The root is the maximum.

Heaps are stored as **arrays** (not node objects). For a node at index $i$:
- Left child: $2i + 1$
- Right child: $2i + 2$
- Parent: $(i - 1) // 2$

Operations:
- **Insert**: Add at the end, then "bubble up" (swap with parent while violating heap property) — $O(\\log N)$.
- **Extract min/max**: Remove root, replace with last element, then "bubble down" — $O(\\log N)$.
- **Build heap from array**: $O(N)$ using bottom-up heapify (not $O(N \\log N)$!).`,
                codeExample: `import heapq\n\n# Min-Heap in Python\nheap = []\nheapq.heappush(heap, 5)\nheapq.heappush(heap, 1)\nheapq.heappush(heap, 3)\n\nprint(heap[0])         # 1 (peek min)\nprint(heapq.heappop(heap))  # 1 (extract min)\nprint(heapq.heappop(heap))  # 3\n\n# Build heap from list\narr = [5, 3, 8, 1, 2]\nheapq.heapify(arr)  # O(N)\nprint(arr)  # [1, 2, 8, 5, 3]`
              },
              quiz: {
                question: 'What is the time complexity of extracting the minimum element from a min-heap?',
                options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
                correct: 1,
                explanation: 'Extracting the min removes the root, places the last element at the root, and bubbles it down. Bubbling down takes O(log N) since the heap height is log N.'
              }
            },
            {
              id: 'dsa_s6c3l2',
              type: 'challenge',
              title: 'Kth Largest Element',
              xp: 25,
              difficulty: 'medium',
              challenge: {
                description: 'Read space-separated integers on line 1 and K on line 2. Find and print the Kth largest element in the array.',
                starterCode: 'import heapq\narr = [int(x) for x in input().split()]\nk = int(input())\n\n# Find and print the Kth largest element\n',
                hints: [
                  'Use a min-heap of size K',
                  'Add elements to the heap; if size exceeds K, pop the smallest',
                  'After processing all elements, the heap top is the Kth largest',
                  'Alternative: heapq.nlargest(k, arr)[-1]'
                ],
                testCases: [
                  { input: '3 2 1 5 6 4\n2', expectedOutput: '5' },
                  { input: '3 2 3 1 2 4 5 5 6\n4', expectedOutput: '4' },
                  { input: '1\n1', expectedOutput: '1' }
                ]
              }
            },
            {
              id: 'dsa_s6c3l3',
              type: 'challenge',
              title: 'Sort Using a Heap',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Read space-separated integers. Sort them using heap sort (use heapq) and print the sorted result space-separated.',
                starterCode: 'import heapq\narr = [int(x) for x in input().split()]\n\n# Sort using heap and print space-separated\n',
                hints: [
                  'heapq.heapify(arr) builds a min-heap in O(N)',
                  'Pop elements one by one to get them in sorted order',
                  'Or use: sorted_arr = [heapq.heappop(arr) for _ in range(len(arr))]'
                ],
                testCases: [
                  { input: '5 3 8 1 2', expectedOutput: '1 2 3 5 8' },
                  { input: '10 -1 5 3', expectedOutput: '-1 3 5 10' },
                  { input: '1', expectedOutput: '1' }
                ]
              }
            },
            {
              id: 'dsa_s6c3l4',
              type: 'quiz',
              title: 'Heap Quiz',
              xp: 5,
              difficulty: 'medium',
              quiz: {
                question: 'What is the time complexity of building a heap from an unsorted array using the heapify algorithm?',
                options: ['O(N log N)', 'O(N)', 'O(N^2)', 'O(log N)'],
                correct: 1,
                explanation: 'The bottom-up heapify algorithm is O(N), not O(N log N). This is because most nodes are near the bottom of the tree and require only a few swaps.'
              }
            }
          ]
        }
      ]
    },

    // =============================================
    // SECTION 7: GRAPHS
    // =============================================
    {
      id: 'dsa_s7',
      title: 'Graphs',
      icon: 'share-2',
      description: 'Navigate networks with BFS, DFS, shortest paths, and cycle detection',
      chapters: [
        {
          id: 'dsa_s7c1',
          title: 'Graph Fundamentals',
          lessons: [
            {
              id: 'dsa_s7c1l1',
              type: 'theory',
              title: 'Graph Representations',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'Graphs consist of vertices (nodes) and edges (connections). They can be represented as adjacency lists (space-efficient) or adjacency matrices (fast lookup).',
                content: `A **Graph** is a collection of **vertices** (nodes) connected by **edges**. Graphs model real-world networks: social networks, road maps, internet routing, and dependency chains.

**Types of graphs:**
- **Directed vs Undirected**: Edges have direction (one-way) or not (two-way).
- **Weighted vs Unweighted**: Edges have costs/distances or not.
- **Cyclic vs Acyclic**: Contains cycles or doesn't. A directed acyclic graph (DAG) is especially important.

**Representations:**

1. **Adjacency List**: Each vertex stores a list of its neighbors. Space: $O(V + E)$.
2. **Adjacency Matrix**: A 2D array where \`matrix[i][j] = 1\` if there's an edge from $i$ to $j$. Space: $O(V^2)$.

**Adjacency list** is preferred for sparse graphs (few edges). **Adjacency matrix** is preferred for dense graphs or when you need $O(1)$ edge lookup.`,
                codeExample: `# Adjacency List (most common)\ngraph = {\n    0: [1, 2],\n    1: [0, 3],\n    2: [0, 3],\n    3: [1, 2]\n}\n\n# Adjacency Matrix\nmatrix = [\n    [0, 1, 1, 0],\n    [1, 0, 0, 1],\n    [1, 0, 0, 1],\n    [0, 1, 1, 0]\n]\n\n# Building from edge list\nedges = [(0,1), (0,2), (1,3), (2,3)]\nadj = {}\nfor u, v in edges:\n    adj.setdefault(u, []).append(v)\n    adj.setdefault(v, []).append(u)`
              },
              quiz: {
                question: 'For a sparse graph with V vertices and E << V^2 edges, which representation is more space-efficient?',
                options: ['Adjacency Matrix', 'Adjacency List', 'Both are equal', 'Edge List'],
                correct: 1,
                explanation: 'Adjacency list uses O(V + E) space, while adjacency matrix uses O(V^2). When E << V^2, the adjacency list saves significant memory.'
              }
            },
            {
              id: 'dsa_s7c1l2',
              type: 'theory',
              title: 'BFS - Breadth-First Search',
              xp: 15,
              difficulty: 'medium',
              theory: {
                tldr: 'BFS explores a graph level by level using a queue. It finds the shortest path in unweighted graphs and processes all nodes at distance d before distance d+1.',
                content: `**BFS (Breadth-First Search)** explores nodes in order of their distance from the source:

1. Start at the source node; add it to a queue and mark as visited.
2. Dequeue a node, process it, and enqueue all its unvisited neighbors.
3. Repeat until the queue is empty.

**Properties:**
- Time Complexity: $O(V + E)$ — every vertex and edge is visited once.
- Space Complexity: $O(V)$ — for the queue and visited set.
- Finds **shortest path** in **unweighted** graphs.
- Explores nodes level by level (all nodes at distance 1, then distance 2, etc.).

**Common use cases:**
- Shortest path in unweighted graphs
- Level-order traversal of trees
- Finding connected components
- Checking if a graph is bipartite`,
                codeExample: `from collections import deque\n\ndef bfs(graph, start):\n    visited = set([start])\n    queue = deque([start])\n    order = []\n    \n    while queue:\n        node = queue.popleft()\n        order.append(node)\n        \n        for neighbor in graph[node]:\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append(neighbor)\n    \n    return order\n\ngraph = {0: [1,2], 1: [0,3], 2: [0,3], 3: [1,2]}\nprint(bfs(graph, 0))  # [0, 1, 2, 3]`
              },
              quiz: {
                question: 'What data structure does BFS use to determine the order of node exploration?',
                options: ['Stack', 'Queue', 'Heap', 'Array'],
                correct: 1,
                explanation: 'BFS uses a Queue (FIFO) to ensure nodes are explored in order of their distance from the source — level by level.'
              }
            },
            {
              id: 'dsa_s7c1l3',
              type: 'theory',
              title: 'DFS - Depth-First Search',
              xp: 15,
              difficulty: 'medium',
              theory: {
                tldr: 'DFS explores as deep as possible before backtracking. Uses a stack (or recursion). Essential for cycle detection, topological sorting, and finding connected components.',
                content: `**DFS (Depth-First Search)** dives deep into one path before exploring alternatives:

1. Start at the source; mark as visited.
2. Recursively (or using a stack) visit an unvisited neighbor.
3. When no unvisited neighbors remain, backtrack.
4. Repeat until all reachable nodes are visited.

**Properties:**
- Time Complexity: $O(V + E)$ — same as BFS.
- Space Complexity: $O(V)$ — for the recursion stack and visited set.
- Does NOT guarantee shortest path.
- Naturally implemented with recursion or an explicit stack.

**Common use cases:**
- Cycle detection
- Topological sorting (on DAGs)
- Finding connected components
- Maze solving
- Detecting bridges and articulation points`,
                codeExample: `# DFS - Recursive\ndef dfs_recursive(graph, node, visited=None):\n    if visited is None:\n        visited = set()\n    visited.add(node)\n    print(node, end=" ")\n    \n    for neighbor in graph[node]:\n        if neighbor not in visited:\n            dfs_recursive(graph, neighbor, visited)\n\n# DFS - Iterative (using stack)\ndef dfs_iterative(graph, start):\n    visited = set()\n    stack = [start]\n    \n    while stack:\n        node = stack.pop()\n        if node not in visited:\n            visited.add(node)\n            print(node, end=" ")\n            for neighbor in graph[node]:\n                if neighbor not in visited:\n                    stack.append(neighbor)`
              },
              quiz: {
                question: 'What is the key difference between BFS and DFS?',
                options: [
                  'BFS uses more memory',
                  'BFS explores level-by-level; DFS explores depth-first',
                  'DFS is always faster',
                  'BFS can only work on trees'
                ],
                correct: 1,
                explanation: 'BFS explores all neighbors at the current depth before moving to the next depth level (using a queue). DFS goes as deep as possible before backtracking (using a stack/recursion).'
              }
            },
            {
              id: 'dsa_s7c1l4',
              type: 'challenge',
              title: 'BFS Shortest Path',
              xp: 25,
              difficulty: 'medium',
              challenge: {
                description: 'Read N (number of nodes, 0-indexed) on line 1, M (number of edges) on line 2, then M edges (each line has two space-separated nodes). Read source and destination on the last line. Print the shortest path length (number of edges). If no path exists, print -1.',
                starterCode: 'from collections import deque\nn = int(input())\nm = int(input())\ngraph = {i: [] for i in range(n)}\nfor _ in range(m):\n    u, v = map(int, input().split())\n    graph[u].append(v)\n    graph[v].append(u)\nsrc, dst = map(int, input().split())\n\n# BFS to find shortest path and print length\n',
                hints: [
                  'Use BFS from the source node',
                  'Track distance using a dictionary: dist[start] = 0',
                  'For each neighbor, dist[neighbor] = dist[current] + 1',
                  'If you reach dst, print dist[dst]. If BFS finishes without reaching dst, print -1'
                ],
                testCases: [
                  { input: '4\n4\n0 1\n0 2\n1 3\n2 3\n0 3', expectedOutput: '2' },
                  { input: '3\n1\n0 1\n0 2', expectedOutput: '-1' },
                  { input: '2\n1\n0 1\n0 1', expectedOutput: '1' }
                ]
              }
            },
            {
              id: 'dsa_s7c1l5',
              type: 'challenge',
              title: 'Connected Components',
              xp: 25,
              difficulty: 'medium',
              challenge: {
                description: 'Read N (number of nodes, 0-indexed) on line 1, M (number of edges) on line 2, then M edges (undirected). Print the number of connected components in the graph.',
                starterCode: 'n = int(input())\nm = int(input())\ngraph = {i: [] for i in range(n)}\nfor _ in range(m):\n    u, v = map(int, input().split())\n    graph[u].append(v)\n    graph[v].append(u)\n\n# Count and print connected components\n',
                hints: [
                  'Use BFS or DFS from each unvisited node',
                  'Each time you start a new BFS/DFS from an unvisited node, increment the component count',
                  'Mark all nodes reached in that traversal as visited'
                ],
                testCases: [
                  { input: '5\n3\n0 1\n1 2\n3 4', expectedOutput: '2' },
                  { input: '4\n3\n0 1\n1 2\n2 3', expectedOutput: '1' },
                  { input: '3\n0', expectedOutput: '3' }
                ]
              }
            }
          ]
        },
        {
          id: 'dsa_s7c2',
          title: 'Advanced Graph Algorithms',
          lessons: [
            {
              id: 'dsa_s7c2l1',
              type: 'theory',
              title: 'Cycle Detection',
              xp: 15,
              difficulty: 'hard',
              theory: {
                tldr: 'Detect cycles in undirected graphs using DFS (if we visit an already-visited node that isn\'t the parent). In directed graphs, use DFS with coloring (white/gray/black).',
                content: `**Cycle Detection** determines whether a graph contains a cycle (a path that starts and ends at the same vertex).

**Undirected Graphs**: Use DFS. A cycle exists if we encounter a visited node that is NOT the parent of the current node in the DFS tree.

**Directed Graphs**: Use DFS with three states:
- **White (unvisited)**: Node hasn't been explored yet.
- **Gray (in progress)**: Node is currently being explored (still on the recursion stack).
- **Black (completed)**: Node and all its descendants have been fully explored.

A cycle exists if DFS encounters a **gray** node — that means we've found a back edge to an ancestor in the current path.

Cycle detection is crucial for:
- Deadlock detection in operating systems
- Dependency resolution (can we build this without circular deps?)
- Course prerequisite validation`,
                codeExample: `# Cycle detection in undirected graph\ndef has_cycle_undirected(graph, n):\n    visited = set()\n    \n    def dfs(node, parent):\n        visited.add(node)\n        for neighbor in graph[node]:\n            if neighbor not in visited:\n                if dfs(neighbor, node):\n                    return True\n            elif neighbor != parent:\n                return True  # Cycle!\n        return False\n    \n    for i in range(n):\n        if i not in visited:\n            if dfs(i, -1):\n                return True\n    return False`
              },
              quiz: {
                question: 'In DFS-based cycle detection for directed graphs, what does encountering a "gray" node indicate?',
                options: [
                  'The node has been fully processed',
                  'The node hasn\'t been visited',
                  'A back edge (cycle) has been found',
                  'The node is a leaf'
                ],
                correct: 2,
                explanation: 'A gray node is currently on the recursion stack. Encountering it again means we\'ve found a path from it back to itself — a cycle.'
              }
            },
            {
              id: 'dsa_s7c2l2',
              type: 'theory',
              title: 'Topological Sort',
              xp: 15,
              difficulty: 'hard',
              theory: {
                tldr: 'Topological sort orders vertices of a DAG so that every edge goes from earlier to later. Used for task scheduling, build systems, and course prerequisites.',
                content: `**Topological Sort** produces a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge $(u, v)$, vertex $u$ comes before $v$ in the ordering.

**Only possible for DAGs** — graphs with cycles have no valid topological order.

**Two approaches:**

1. **DFS-based (Kahn's reverse)**: Run DFS and add each vertex to a stack after processing all its descendants. The reverse of the stack is the topological order.

2. **BFS-based (Kahn's Algorithm)**: 
   - Calculate in-degree (number of incoming edges) for each vertex.
   - Add all vertices with in-degree 0 to a queue.
   - Process: dequeue, add to result, decrement in-degree of all neighbors. If any neighbor's in-degree becomes 0, enqueue it.
   - If all vertices are processed, we have a valid topological order.

Applications: build systems (Makefile), course prerequisites, task scheduling.`,
                codeExample: `from collections import deque\n\ndef topological_sort(graph, n):\n    in_degree = [0] * n\n    for u in graph:\n        for v in graph[u]:\n            in_degree[v] += 1\n    \n    queue = deque()\n    for i in range(n):\n        if in_degree[i] == 0:\n            queue.append(i)\n    \n    order = []\n    while queue:\n        node = queue.popleft()\n        order.append(node)\n        for neighbor in graph[node]:\n            in_degree[neighbor] -= 1\n            if in_degree[neighbor] == 0:\n                queue.append(neighbor)\n    \n    if len(order) == n:\n        return order  # Valid topological order\n    return None        # Cycle exists!`
              },
              quiz: {
                question: 'Can topological sort be performed on a graph that contains a cycle?',
                options: ['Yes, always', 'Yes, but only for undirected graphs', 'No, it requires a DAG', 'Only with BFS'],
                correct: 2,
                explanation: 'Topological sort requires a DAG (Directed Acyclic Graph). If a cycle exists, there is no valid linear ordering where all edges go from earlier to later.'
              }
            },
            {
              id: 'dsa_s7c2l3',
              type: 'theory',
              title: 'Dijkstra\'s Algorithm',
              xp: 15,
              difficulty: 'hard',
              theory: {
                tldr: 'Dijkstra\'s finds the shortest path from a source to all other vertices in a weighted graph with non-negative edge weights, using a priority queue.',
                content: `**Dijkstra's Algorithm** finds the shortest path from a source vertex to all other vertices in a weighted graph with **non-negative** edge weights.

Algorithm:
1. Set distance to source as 0, all others as infinity.
2. Use a min-heap (priority queue) starting with the source.
3. Extract the vertex with the smallest distance from the heap.
4. For each neighbor, if a shorter path is found through the current vertex, update its distance and add it to the heap.
5. Repeat until the heap is empty.

**Time Complexity**: $O((V + E) \\log V)$ with a binary heap.
**Space Complexity**: $O(V)$.

**Limitation**: Does NOT work with negative edge weights (use Bellman-Ford for that).`,
                codeExample: `import heapq\n\ndef dijkstra(graph, source, n):\n    dist = [float('inf')] * n\n    dist[source] = 0\n    heap = [(0, source)]  # (distance, node)\n    \n    while heap:\n        d, u = heapq.heappop(heap)\n        if d > dist[u]:\n            continue  # Skip stale entries\n        \n        for v, weight in graph[u]:\n            if dist[u] + weight < dist[v]:\n                dist[v] = dist[u] + weight\n                heapq.heappush(heap, (dist[v], v))\n    \n    return dist\n\n# Example: graph[u] = [(v, weight), ...]\ngraph = {0: [(1,4),(2,1)], 1: [(3,1)], 2: [(1,2),(3,5)], 3: []}\nprint(dijkstra(graph, 0, 4))  # [0, 3, 1, 4]`
              },
              quiz: {
                question: 'Why doesn\'t Dijkstra\'s algorithm work with negative edge weights?',
                options: [
                  'It causes an infinite loop',
                  'Negative weights make the priority queue invalid',
                  'Once a node is finalized, a negative edge could provide a shorter path later, violating the greedy assumption',
                  'Python heapq doesn\'t support negative numbers'
                ],
                correct: 2,
                explanation: 'Dijkstra assumes that once a vertex is extracted from the heap with the smallest distance, its shortest path is final. Negative edges can violate this by offering a shorter detour through an already-processed vertex.'
              }
            },
            {
              id: 'dsa_s7c2l4',
              type: 'challenge',
              title: 'Detect Cycle in Graph',
              xp: 25,
              difficulty: 'hard',
              challenge: {
                description: 'Read N (nodes, 0-indexed) on line 1, M (edges) on line 2, then M undirected edges. Print "Yes" if the graph contains a cycle, "No" otherwise.',
                starterCode: 'n = int(input())\nm = int(input())\ngraph = {i: [] for i in range(n)}\nfor _ in range(m):\n    u, v = map(int, input().split())\n    graph[u].append(v)\n    graph[v].append(u)\n\n# Detect cycle and print Yes or No\n',
                hints: [
                  'Use DFS from each unvisited node',
                  'Track the parent of each node in the DFS tree',
                  'If you visit a node that is already visited and it is not the parent, there is a cycle'
                ],
                testCases: [
                  { input: '4\n4\n0 1\n1 2\n2 3\n3 0', expectedOutput: 'Yes' },
                  { input: '3\n2\n0 1\n1 2', expectedOutput: 'No' },
                  { input: '4\n5\n0 1\n1 2\n2 0\n2 3\n3 1', expectedOutput: 'Yes' }
                ]
              }
            },
            {
              id: 'dsa_s7c2l5',
              type: 'quiz',
              title: 'Graph Algorithms Quiz',
              xp: 5,
              difficulty: 'hard',
              quiz: {
                question: 'What is the time complexity of Dijkstra\'s algorithm with a binary heap?',
                options: ['O(V^2)', 'O(V + E)', 'O((V + E) log V)', 'O(V * E)'],
                correct: 2,
                explanation: 'With a binary heap, each vertex is extracted once (O(V log V)) and each edge is relaxed once (O(E log V)), giving O((V + E) log V) total.'
              }
            }
          ]
        }
      ]
    },

    // =============================================
    // SECTION 8: SORTING ALGORITHMS
    // =============================================
    {
      id: 'dsa_s8',
      title: 'Sorting Algorithms',
      icon: 'filter',
      description: 'Compare and implement the most important sorting algorithms from O(N^2) to O(N log N)',
      chapters: [
        {
          id: 'dsa_s8c1',
          title: 'Elementary Sorts',
          lessons: [
            {
              id: 'dsa_s8c1l1',
              type: 'theory',
              title: 'Bubble Sort',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Bubble Sort repeatedly swaps adjacent elements if they are in the wrong order. Simple but O(N^2) — only good for small or nearly-sorted arrays.',
                content: `**Bubble Sort** is the simplest sorting algorithm. It works by repeatedly stepping through the list, comparing adjacent elements, and swapping them if they are in the wrong order.

After each pass, the largest unsorted element "bubbles up" to its correct position at the end.

**Optimization**: If no swaps are made during a pass, the array is already sorted — stop early!

| Property | Value |
|----------|-------|
| Time (Best) | $O(N)$ — when already sorted |
| Time (Average/Worst) | $O(N^2)$ |
| Space | $O(1)$ — in-place |
| Stable | Yes — equal elements maintain relative order |

Bubble Sort is almost never used in practice due to poor performance, but it's important for understanding sorting fundamentals.`,
                codeExample: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        swapped = False\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n                swapped = True\n        if not swapped:\n            break  # Early termination\n    return arr\n\nprint(bubble_sort([64, 34, 25, 12, 22, 11, 90]))\n# [11, 12, 22, 25, 34, 64, 90]`
              },
              quiz: {
                question: 'What does "stable sort" mean?',
                options: [
                  'It never crashes',
                  'Equal elements maintain their original relative order',
                  'It uses constant memory',
                  'It always runs in O(N log N)'
                ],
                correct: 1,
                explanation: 'A stable sort preserves the relative order of elements with equal keys. This matters when sorting by multiple criteria (e.g., sort by name, then by age).'
              }
            },
            {
              id: 'dsa_s8c1l2',
              type: 'theory',
              title: 'Selection Sort',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Selection Sort finds the minimum element in the unsorted portion and swaps it to the front. Always O(N^2) but minimizes swaps.',
                content: `**Selection Sort** divides the array into a sorted portion (left) and unsorted portion (right). In each iteration:

1. Find the minimum element in the unsorted portion.
2. Swap it with the first element of the unsorted portion.
3. The sorted portion grows by one.

| Property | Value |
|----------|-------|
| Time (All cases) | $O(N^2)$ |
| Space | $O(1)$ — in-place |
| Stable | No (due to swapping) |
| Swaps | $O(N)$ — makes the minimum number of swaps |

Selection Sort's advantage is that it performs at most $N$ swaps, making it useful when writing to memory is expensive (e.g., flash memory). But for general use, it's too slow.`,
                codeExample: `def selection_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        min_idx = i\n        for j in range(i + 1, n):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]\n    return arr\n\nprint(selection_sort([64, 25, 12, 22, 11]))\n# [11, 12, 22, 25, 64]`
              },
              quiz: {
                question: 'How many total swaps does Selection Sort perform on an array of N elements?',
                options: ['O(1)', 'O(N)', 'O(N log N)', 'O(N^2)'],
                correct: 1,
                explanation: 'Selection Sort performs exactly one swap per iteration (N iterations total), giving O(N) swaps. This is its main advantage over Bubble Sort which can make O(N^2) swaps.'
              }
            },
            {
              id: 'dsa_s8c1l3',
              type: 'theory',
              title: 'Insertion Sort',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Insertion Sort builds a sorted array one element at a time by inserting each new element into its correct position among the already-sorted elements.',
                content: `**Insertion Sort** works like sorting playing cards in your hand:

1. Start with the second element (first element is "already sorted").
2. Compare it with elements to its left.
3. Shift larger elements to the right.
4. Insert the current element into its correct position.
5. Repeat for all remaining elements.

| Property | Value |
|----------|-------|
| Time (Best) | $O(N)$ — when already sorted |
| Time (Average/Worst) | $O(N^2)$ |
| Space | $O(1)$ — in-place |
| Stable | Yes |

Insertion Sort is excellent for:
- Small arrays (often faster than Merge Sort for $N < 20$).
- Nearly sorted arrays.
- Online sorting (can sort as data arrives).

Python's built-in \`sorted()\` uses Timsort, which uses Insertion Sort for small subarrays.`,
                codeExample: `def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and arr[j] > key:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key\n    return arr\n\nprint(insertion_sort([12, 11, 13, 5, 6]))\n# [5, 6, 11, 12, 13]`
              },
              quiz: {
                question: 'When is Insertion Sort the best choice among O(N^2) sorting algorithms?',
                options: [
                  'When the array is very large',
                  'When the array is nearly sorted or very small',
                  'When the array contains only negative numbers',
                  'When memory is unlimited'
                ],
                correct: 1,
                explanation: 'Insertion Sort achieves O(N) time on nearly sorted arrays and has low overhead, making it faster than O(N log N) sorts for very small arrays (< 20 elements).'
              }
            },
            {
              id: 'dsa_s8c1l4',
              type: 'challenge',
              title: 'Implement Bubble Sort',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Read space-separated integers. Sort them using Bubble Sort (implement it yourself, don\'t use sorted()). Print the sorted array space-separated.',
                starterCode: 'arr = [int(x) for x in input().split()]\n\n# Implement bubble sort and print sorted array\n',
                hints: [
                  'Use nested loops: outer for passes, inner for comparisons',
                  'Compare adjacent elements and swap if arr[j] > arr[j+1]',
                  'Optimize: add a flag to stop early if no swaps are made'
                ],
                testCases: [
                  { input: '5 3 8 1 2', expectedOutput: '1 2 3 5 8' },
                  { input: '1 2 3', expectedOutput: '1 2 3' },
                  { input: '3 1', expectedOutput: '1 3' }
                ]
              }
            },
            {
              id: 'dsa_s8c1l5',
              type: 'challenge',
              title: 'Implement Insertion Sort',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Read space-separated integers. Sort them using Insertion Sort (implement it yourself). Print the sorted array space-separated.',
                starterCode: 'arr = [int(x) for x in input().split()]\n\n# Implement insertion sort and print sorted array\n',
                hints: [
                  'Iterate from index 1 to the end',
                  'Save the current element as key',
                  'Shift all elements greater than key one position right',
                  'Insert key at the correct position'
                ],
                testCases: [
                  { input: '12 11 13 5 6', expectedOutput: '5 6 11 12 13' },
                  { input: '1', expectedOutput: '1' },
                  { input: '3 2 1', expectedOutput: '1 2 3' }
                ]
              }
            }
          ]
        },
        {
          id: 'dsa_s8c2',
          title: 'Efficient Sorts',
          lessons: [
            {
              id: 'dsa_s8c2l1',
              type: 'theory',
              title: 'Merge Sort',
              xp: 15,
              difficulty: 'medium',
              theory: {
                tldr: 'Merge Sort divides the array in half recursively, sorts each half, and merges them. Always O(N log N) but uses O(N) extra space.',
                content: `**Merge Sort** is a classic divide-and-conquer algorithm:

1. **Divide**: Split the array into two halves.
2. **Conquer**: Recursively sort each half.
3. **Combine**: Merge the two sorted halves into one sorted array.

The merge step is the key: given two sorted arrays, we can combine them into one sorted array in $O(N)$ time by using two pointers.

| Property | Value |
|----------|-------|
| Time (All cases) | $O(N \\log N)$ |
| Space | $O(N)$ — needs auxiliary array for merging |
| Stable | Yes |

Merge Sort guarantees $O(N \\log N)$ in ALL cases (unlike QuickSort). It's the go-to algorithm for sorting linked lists and for external sorting (sorting data that doesn't fit in memory).`,
                codeExample: `def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    \n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    \n    return merge(left, right)\n\ndef merge(left, right):\n    result = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            j += 1\n    result.extend(left[i:])\n    result.extend(right[j:])\n    return result\n\nprint(merge_sort([38, 27, 43, 3, 9, 82, 10]))`
              },
              quiz: {
                question: 'Why is Merge Sort preferred over QuickSort for sorting linked lists?',
                options: [
                  'Merge Sort is always faster',
                  'Linked lists support efficient sequential access and splitting, and merge is O(1) extra space for linked lists',
                  'QuickSort doesn\'t work on linked lists',
                  'Merge Sort uses less recursion'
                ],
                correct: 1,
                explanation: 'Linked lists can be split at the middle and merged without extra space (just re-linking pointers). QuickSort\'s random access pattern (partitioning) is slow on linked lists.'
              }
            },
            {
              id: 'dsa_s8c2l2',
              type: 'theory',
              title: 'Quick Sort',
              xp: 15,
              difficulty: 'medium',
              theory: {
                tldr: 'QuickSort picks a pivot, partitions the array so smaller elements go left and larger go right, then recursively sorts each side. Average O(N log N), worst O(N^2).',
                content: `**Quick Sort** is another divide-and-conquer algorithm, often faster in practice than Merge Sort:

1. **Pick a pivot** element (often the last, first, random, or median).
2. **Partition**: Rearrange the array so all elements < pivot are on the left, all elements > pivot are on the right. The pivot is now in its final sorted position.
3. **Recursively sort** the left and right partitions.

| Property | Value |
|----------|-------|
| Time (Best/Average) | $O(N \\log N)$ |
| Time (Worst) | $O(N^2)$ — when pivot is always min or max |
| Space | $O(\\log N)$ — in-place, recursion stack |
| Stable | No |

The worst case ($O(N^2)$) is avoided by using **random pivot selection** or **median-of-three** strategy. In practice, QuickSort is usually faster than Merge Sort due to better cache performance and in-place sorting.`,
                codeExample: `def quick_sort(arr, low=0, high=None):\n    if high is None:\n        high = len(arr) - 1\n    if low < high:\n        pi = partition(arr, low, high)\n        quick_sort(arr, low, pi - 1)\n        quick_sort(arr, pi + 1, high)\n    return arr\n\ndef partition(arr, low, high):\n    pivot = arr[high]\n    i = low - 1\n    for j in range(low, high):\n        if arr[j] <= pivot:\n            i += 1\n            arr[i], arr[j] = arr[j], arr[i]\n    arr[i + 1], arr[high] = arr[high], arr[i + 1]\n    return i + 1\n\narr = [10, 7, 8, 9, 1, 5]\nquick_sort(arr)\nprint(arr)  # [1, 5, 7, 8, 9, 10]`
              },
              quiz: {
                question: 'What causes QuickSort\'s worst-case O(N^2) time?',
                options: [
                  'Too many recursive calls',
                  'The pivot is always the smallest or largest element, causing maximally unbalanced partitions',
                  'The array contains duplicates',
                  'The array is too large for memory'
                ],
                correct: 1,
                explanation: 'If the pivot is always the min or max, one partition has N-1 elements and the other has 0. This creates N levels of recursion, each doing O(N) work → O(N^2).'
              }
            },
            {
              id: 'dsa_s8c2l3',
              type: 'challenge',
              title: 'Implement Merge Sort',
              xp: 25,
              difficulty: 'medium',
              challenge: {
                description: 'Read space-separated integers. Sort them using Merge Sort (implement divide, merge, and conquer yourself). Print the sorted array space-separated.',
                starterCode: 'arr = [int(x) for x in input().split()]\n\n# Implement merge sort and print sorted array\n',
                hints: [
                  'Split array at midpoint: left = arr[:mid], right = arr[mid:]',
                  'Recursively sort each half',
                  'Merge two sorted halves using two pointers',
                  'Base case: array of length 0 or 1 is already sorted'
                ],
                testCases: [
                  { input: '38 27 43 3 9 82 10', expectedOutput: '3 9 10 27 38 43 82' },
                  { input: '5 4 3 2 1', expectedOutput: '1 2 3 4 5' },
                  { input: '1', expectedOutput: '1' }
                ]
              }
            },
            {
              id: 'dsa_s8c2l4',
              type: 'quiz',
              title: 'Sorting Comparison Quiz',
              xp: 5,
              difficulty: 'medium',
              quiz: {
                question: 'Which sorting algorithm is generally fastest in practice for large random arrays?',
                options: ['Bubble Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort'],
                correct: 3,
                explanation: 'QuickSort is typically the fastest in practice due to better cache locality and in-place sorting (no extra array needed). Its average O(N log N) with low constants makes it the practical choice.'
              }
            },
            {
              id: 'dsa_s8c2l5',
              type: 'theory',
              title: 'Sorting Algorithm Comparison',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'A comprehensive comparison of all sorting algorithms by time complexity, space, stability, and use cases.',
                content: `Here's a complete comparison of the sorting algorithms we've learned:

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Bubble Sort | $O(N)$ | $O(N^2)$ | $O(N^2)$ | $O(1)$ | Yes |
| Selection Sort | $O(N^2)$ | $O(N^2)$ | $O(N^2)$ | $O(1)$ | No |
| Insertion Sort | $O(N)$ | $O(N^2)$ | $O(N^2)$ | $O(1)$ | Yes |
| Merge Sort | $O(N \\log N)$ | $O(N \\log N)$ | $O(N \\log N)$ | $O(N)$ | Yes |
| Quick Sort | $O(N \\log N)$ | $O(N \\log N)$ | $O(N^2)$ | $O(\\log N)$ | No |
| Heap Sort | $O(N \\log N)$ | $O(N \\log N)$ | $O(N \\log N)$ | $O(1)$ | No |

**Key takeaways:**
- For small arrays ($N < 20$): Insertion Sort wins.
- For general purpose: Quick Sort (with random pivot).
- When stability matters: Merge Sort.
- When memory is constrained: Heap Sort ($O(1)$ space, $O(N \\log N)$ time).
- Python's \`sorted()\` uses **Timsort**: a hybrid of Merge Sort and Insertion Sort, achieving $O(N \\log N)$ with practical optimizations.`,
                codeExample: `# Python's built-in sort is Timsort\n# It combines Merge Sort and Insertion Sort\narr = [5, 3, 8, 1, 2, 7, 4, 6]\n\n# In-place sort\narr.sort()\nprint(arr)  # [1, 2, 3, 4, 5, 6, 7, 8]\n\n# Returns new sorted list\noriginal = [5, 3, 8, 1]\nsorted_arr = sorted(original)\nprint(original)    # [5, 3, 8, 1] — unchanged\nprint(sorted_arr)  # [1, 3, 5, 8]`
              },
              quiz: {
                question: 'Which sorting algorithm does Python\'s built-in sorted() use?',
                options: ['Quick Sort', 'Merge Sort', 'Heap Sort', 'Timsort (hybrid of Merge + Insertion Sort)'],
                correct: 3,
                explanation: 'Python uses Timsort, invented by Tim Peters. It is a hybrid stable sort that uses Insertion Sort for small chunks and Merge Sort to combine them, achieving excellent real-world performance.'
              }
            }
          ]
        }
      ]
    },

    // =============================================
    // SECTION 9: SEARCHING & HASHING
    // =============================================
    {
      id: 'dsa_s9',
      title: 'Searching & Hashing',
      icon: 'search',
      description: 'Optimize data retrieval with binary search, hash tables, and frequency counting',
      chapters: [
        {
          id: 'dsa_s9c1',
          title: 'Binary Search',
          lessons: [
            {
              id: 'dsa_s9c1l1',
              type: 'theory',
              title: 'Divide & Conquer Search',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'Binary Search searches a sorted list in O(log N) time by repeatedly splitting the search range in half.',
                content: `If you have an unsorted list, you must scan linearly ($O(N)$) to find an item. But if the list is **sorted**, we can use **Binary Search**.

Binary Search works like looking up a word in a physical dictionary:
1. Open the dictionary in the middle.
2. If your word is alphabetically before, search only the left half. Otherwise, search the right half.
3. Repeat this process until you find the word.

Because the search range is halved with each step, it takes at most $\\log_2 N$ comparisons. For a list of 1,000,000 items, Binary Search takes at most **20** steps!

**Key variants:**
- Find exact value
- Find first/last occurrence of a value
- Find insertion point (bisect)
- Search on answer space (binary search on result)`,
                codeExample: `# Binary Search implementation\ndef binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1\n\nprint(binary_search([1, 3, 5, 7, 9, 11], 7))  # 3\nprint(binary_search([1, 3, 5, 7, 9, 11], 4))  # -1`
              },
              quiz: {
                question: 'What is the primary prerequisite for running Binary Search on a list?',
                options: [
                  'The list must be non-empty',
                  'The list must be sorted',
                  'The list must contain only unique values',
                  'The list must have an odd length'
                ],
                correct: 1,
                explanation: 'Binary Search relies on comparing the midpoint to make assumptions about which half the target is in, which is only valid if the list is sorted.'
              }
            },
            {
              id: 'dsa_s9c1l2',
              type: 'theory',
              title: 'Binary Search Variants',
              xp: 15,
              difficulty: 'medium',
              theory: {
                tldr: 'Beyond finding a target, binary search can find the first/last occurrence, the insertion point, and solve "search on answer" problems.',
                content: `Binary search is more versatile than just finding a value:

**1. First Occurrence (Lower Bound)**:
When duplicates exist, find the leftmost occurrence. When \`arr[mid] == target\`, set \`high = mid - 1\` and save the result, then keep searching left.

**2. Last Occurrence (Upper Bound)**:
When \`arr[mid] == target\`, set \`low = mid + 1\` and save the result, then keep searching right.

**3. Insertion Point (bisect)**:
Find where to insert a value to keep the array sorted. Python's \`bisect\` module does this.

**4. Binary Search on Answer**:
The most powerful variant! When the answer is a number in a range, and you can check if a candidate answer is valid, binary search over the answer space.
Example: "What is the minimum capacity needed to ship all packages in D days?"`,
                codeExample: `# Find first occurrence\ndef first_occurrence(arr, target):\n    low, high, result = 0, len(arr) - 1, -1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            result = mid\n            high = mid - 1  # Keep searching left\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return result\n\n# Find last occurrence\ndef last_occurrence(arr, target):\n    low, high, result = 0, len(arr) - 1, -1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            result = mid\n            low = mid + 1  # Keep searching right\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return result\n\narr = [1, 2, 2, 2, 3, 4]\nprint(first_occurrence(arr, 2))  # 1\nprint(last_occurrence(arr, 2))   # 3`
              },
              quiz: {
                question: 'To find the first occurrence of a value in a sorted array with duplicates, what do you do when arr[mid] == target?',
                options: [
                  'Return mid immediately',
                  'Set low = mid + 1 and continue',
                  'Set high = mid - 1, save mid as result, and continue searching left',
                  'Return mid - 1'
                ],
                correct: 2,
                explanation: 'To find the FIRST occurrence, when you find the target at mid, save it as a candidate and keep searching left (high = mid - 1) to see if there\'s an earlier occurrence.'
              }
            },
            {
              id: 'dsa_s9c1l3',
              type: 'challenge',
              title: 'Binary Search Index',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Read a sorted list of space-separated integers on line 1, and a target integer on line 2. Find the 0-based index of the target using Binary Search. If the target appears multiple times, print the first occurrence index. If not found, print -1.',
                starterCode: 'arr = [int(x) for x in input().split()]\ntarget = int(input())\n\n# Binary search for first occurrence and print index\n',
                hints: [
                  'Initialize low = 0, high = len(arr) - 1, result = -1',
                  'When arr[mid] == target, save mid to result and set high = mid - 1',
                  'When arr[mid] < target, set low = mid + 1',
                  'When arr[mid] > target, set high = mid - 1'
                ],
                testCases: [
                  { input: '1 3 5 7 9\n7', expectedOutput: '3' },
                  { input: '2 4 6 8 10\n5', expectedOutput: '-1' },
                  { input: '1 2 2 2 3\n2', expectedOutput: '1' }
                ]
              }
            },
            {
              id: 'dsa_s9c1l4',
              type: 'challenge',
              title: 'Square Root (Binary Search)',
              xp: 25,
              difficulty: 'medium',
              challenge: {
                description: 'Read a non-negative integer N. Find the integer square root (floor of the actual square root) using binary search. Print the result.',
                starterCode: 'n = int(input())\n\n# Find integer square root using binary search\n',
                hints: [
                  'Binary search between 0 and N',
                  'If mid * mid <= N, it is a candidate; search right for a better one',
                  'If mid * mid > N, search left',
                  'The last valid candidate is the answer'
                ],
                testCases: [
                  { input: '16', expectedOutput: '4' },
                  { input: '8', expectedOutput: '2' },
                  { input: '1', expectedOutput: '1' },
                  { input: '0', expectedOutput: '0' }
                ]
              }
            }
          ]
        },
        {
          id: 'dsa_s9c2',
          title: 'Hash Tables',
          lessons: [
            {
              id: 'dsa_s9c2l1',
              type: 'theory',
              title: 'Hash Tables & Hash Functions',
              xp: 15,
              difficulty: 'medium',
              theory: {
                tldr: 'Hash tables map keys to values using a hash function for O(1) average-case lookup, insertion, and deletion. Python\'s dict is a hash table.',
                content: `A **Hash Table** (dictionary in Python) stores key-value pairs and provides near-instant lookups.

**How it works:**
1. A **hash function** converts the key into an integer (hash code).
2. The hash code is mapped to an index in an internal array (using modulo).
3. The value is stored at that index.

**Collisions** occur when two different keys hash to the same index. Common resolution strategies:
- **Chaining**: Each index stores a linked list of all key-value pairs that hash there.
- **Open Addressing**: If a slot is taken, probe the next available slot.

| Operation | Average | Worst Case |
|-----------|---------|------------|
| Lookup | $O(1)$ | $O(N)$ |
| Insert | $O(1)$ | $O(N)$ |
| Delete | $O(1)$ | $O(N)$ |

The worst case occurs when all keys hash to the same index (all in one chain). Good hash functions minimize this.`,
                codeExample: `# Python dict IS a hash table\nphone_book = {}\n\n# Insert: O(1) average\nphone_book["Alice"] = "555-1234"\nphone_book["Bob"] = "555-5678"\n\n# Lookup: O(1) average\nprint(phone_book["Alice"])  # "555-1234"\n\n# Check existence: O(1) average\nprint("Charlie" in phone_book)  # False\n\n# Delete: O(1) average\ndel phone_book["Bob"]\n\n# Counter pattern using dict\ndef count_freq(arr):\n    freq = {}\n    for x in arr:\n        freq[x] = freq.get(x, 0) + 1\n    return freq\n\nprint(count_freq([1, 2, 2, 3, 3, 3]))\n# {1: 1, 2: 2, 3: 3}`
              },
              quiz: {
                question: 'What is the average time complexity for looking up a value in a hash table?',
                options: ['O(N)', 'O(log N)', 'O(1)', 'O(N^2)'],
                correct: 2,
                explanation: 'Hash tables provide O(1) average-case lookup by computing the hash of the key and directly accessing the corresponding array slot.'
              }
            },
            {
              id: 'dsa_s9c2l2',
              type: 'theory',
              title: 'Common Hash Table Patterns',
              xp: 15,
              difficulty: 'medium',
              theory: {
                tldr: 'Frequency counting, two-sum with hash map, grouping anagrams, and caching are the most common hash table interview patterns.',
                content: `Hash tables unlock elegant solutions to many problems:

**1. Frequency Counting**: Count occurrences of each element in $O(N)$ time. Use \`collections.Counter\`.

**2. Two Sum**: Store each number's index. For each new number, check if its complement exists in the map.

**3. Grouping**: Group items by a common property. Example: group anagrams by their sorted string key.

**4. Caching/Memoization**: Store computed results to avoid redundant calculations.

**5. Set Operations**: Check membership in $O(1)$. Find duplicates, check if two lists have common elements, etc.

**Python tip**: Use \`defaultdict\` to avoid KeyError and \`Counter\` for frequency counting:
\`\`\`
from collections import defaultdict, Counter
\`\`\``,
                codeExample: `from collections import Counter, defaultdict\n\n# Frequency counting\narr = [1, 2, 2, 3, 3, 3]\nfreq = Counter(arr)\nprint(freq)          # Counter({3: 3, 2: 2, 1: 1})\nprint(freq.most_common(1))  # [(3, 3)]\n\n# Grouping anagrams\ndef group_anagrams(words):\n    groups = defaultdict(list)\n    for word in words:\n        key = "".join(sorted(word))\n        groups[key].append(word)\n    return list(groups.values())\n\nprint(group_anagrams(["eat","tea","tan","ate","nat","bat"]))\n# [['eat','tea','ate'], ['tan','nat'], ['bat']]`
              },
              quiz: {
                question: 'What is the time complexity of finding duplicates in an array using a hash set?',
                options: ['O(N^2)', 'O(N log N)', 'O(N)', 'O(1)'],
                correct: 2,
                explanation: 'Iterate through the array once. For each element, check if it exists in the set (O(1)). If yes, it\'s a duplicate. If no, add it to the set. Total: O(N).'
              }
            },
            {
              id: 'dsa_s9c2l3',
              type: 'challenge',
              title: 'Two Sum',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Read a list of space-separated integers on line 1, and a target integer on line 2. Find the indices of two numbers that add up to the target. Print the two indices sorted ascending, separated by a space. Exactly one solution exists.',
                starterCode: 'arr = [int(x) for x in input().split()]\ntarget = int(input())\n\n# Find indices and print them space-separated\n',
                hints: [
                  'Use a dictionary to store value -> index mappings',
                  'For each number, calculate complement = target - num',
                  'Check if complement is in the dictionary',
                  'Print the two indices sorted'
                ],
                testCases: [
                  { input: '2 7 11 15\n9', expectedOutput: '0 1' },
                  { input: '3 2 4\n6', expectedOutput: '1 2' },
                  { input: '-1 -3 -5 -7\n-8', expectedOutput: '1 2' }
                ]
              }
            },
            {
              id: 'dsa_s9c2l4',
              type: 'challenge',
              title: 'First Non-Repeating Character',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Read a string from input. Find and print the first non-repeating character. If all characters repeat, print "None".',
                starterCode: 's = input().strip()\n\n# Find and print first non-repeating character\n',
                hints: [
                  'Count the frequency of each character using a dictionary or Counter',
                  'Iterate through the string again and find the first character with count 1',
                  'If no such character exists, print "None"'
                ],
                testCases: [
                  { input: 'leetcode', expectedOutput: 'l' },
                  { input: 'aabb', expectedOutput: 'None' },
                  { input: 'abcabc', expectedOutput: 'None' },
                  { input: 'abacabad', expectedOutput: 'c' }
                ]
              }
            },
            {
              id: 'dsa_s9c2l5',
              type: 'challenge',
              title: 'Frequency Count',
              xp: 15,
              difficulty: 'easy',
              challenge: {
                description: 'Read space-separated integers. Print each unique value and its count in the format "value:count", one per line, sorted by value ascending.',
                starterCode: 'arr = [int(x) for x in input().split()]\n\n# Count frequencies and print sorted\n',
                hints: [
                  'Use a dictionary to count frequencies',
                  'Sort the dictionary keys',
                  'Print each key:count pair'
                ],
                testCases: [
                  { input: '1 2 2 3 3 3', expectedOutput: '1:1\n2:2\n3:3' },
                  { input: '5 5 5', expectedOutput: '5:3' },
                  { input: '3 1 2 1 3 2', expectedOutput: '1:2\n2:2\n3:2' }
                ]
              }
            }
          ]
        }
      ]
    },

    // =============================================
    // SECTION 10: DYNAMIC PROGRAMMING
    // =============================================
    {
      id: 'dsa_s10',
      title: 'Dynamic Programming',
      icon: 'layers',
      description: 'Solve optimization problems by breaking them into overlapping subproblems',
      chapters: [
        {
          id: 'dsa_s10c1',
          title: 'DP Fundamentals',
          lessons: [
            {
              id: 'dsa_s10c1l1',
              type: 'theory',
              title: 'What is Dynamic Programming?',
              xp: 15,
              difficulty: 'hard',
              theory: {
                tldr: 'DP solves problems by breaking them into overlapping subproblems, solving each once, and storing results. It transforms exponential recursion into polynomial time.',
                content: `**Dynamic Programming (DP)** is an optimization technique that solves complex problems by breaking them down into simpler **overlapping subproblems** and storing the results to avoid redundant computation.

Two requirements for DP:
1. **Optimal Substructure**: The optimal solution to the problem contains optimal solutions to its subproblems.
2. **Overlapping Subproblems**: The same subproblems are solved multiple times in a naive recursive approach.

Two approaches:
1. **Top-Down (Memoization)**: Start with the original problem, recursively solve subproblems, and cache results in a dictionary or array.
2. **Bottom-Up (Tabulation)**: Start with the smallest subproblems and iteratively build up to the answer, filling a table.

**Example**: Naive recursive Fibonacci is $O(2^N)$ because it recomputes the same values many times. With DP (memoization or tabulation), it becomes $O(N)$.`,
                codeExample: `# Naive Fibonacci: O(2^N) - SLOW!\ndef fib_naive(n):\n    if n <= 1: return n\n    return fib_naive(n-1) + fib_naive(n-2)\n\n# Top-Down DP (Memoization): O(N)\ndef fib_memo(n, memo={}):\n    if n <= 1: return n\n    if n in memo: return memo[n]\n    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)\n    return memo[n]\n\n# Bottom-Up DP (Tabulation): O(N)\ndef fib_tab(n):\n    if n <= 1: return n\n    dp = [0] * (n + 1)\n    dp[1] = 1\n    for i in range(2, n + 1):\n        dp[i] = dp[i-1] + dp[i-2]\n    return dp[n]\n\nprint(fib_tab(50))  # 12586269025 — instant!`
              },
              quiz: {
                question: 'What are the two key properties a problem must have for Dynamic Programming to apply?',
                options: [
                  'Sorted input and unique elements',
                  'Optimal substructure and overlapping subproblems',
                  'Linear time and constant space',
                  'Binary tree structure and balanced nodes'
                ],
                correct: 1,
                explanation: 'DP requires optimal substructure (the optimal solution uses optimal sub-solutions) and overlapping subproblems (same subproblems are computed repeatedly in the naive approach).'
              }
            },
            {
              id: 'dsa_s10c1l2',
              type: 'theory',
              title: 'Memoization vs Tabulation',
              xp: 15,
              difficulty: 'hard',
              theory: {
                tldr: 'Memoization (top-down) adds caching to recursion. Tabulation (bottom-up) fills a table iteratively. Both avoid redundant computation but differ in approach.',
                content: `**Top-Down (Memoization)**:
- Start with the original problem
- Recurse into subproblems
- Cache results in a hash map or array
- Only solves subproblems that are actually needed
- Easier to write (just add caching to recursive solution)
- Risk of stack overflow for deep recursion

**Bottom-Up (Tabulation)**:
- Start with the base cases
- Iteratively build up to the answer
- Fill a table (array) from smallest to largest subproblem
- Solves all subproblems (even ones not needed)
- No recursion = no stack overflow risk
- Often slightly faster due to no function call overhead

**Space Optimization**: Many DP problems only need the previous 1-2 rows/values, so you can reduce space from $O(N)$ to $O(1)$.`,
                codeExample: `# Climbing Stairs: How many ways to reach step N\n# taking 1 or 2 steps at a time?\n\n# Top-Down (Memoization)\ndef climb_memo(n, memo={}):\n    if n <= 2: return n\n    if n in memo: return memo[n]\n    memo[n] = climb_memo(n-1, memo) + climb_memo(n-2, memo)\n    return memo[n]\n\n# Bottom-Up (Tabulation)\ndef climb_tab(n):\n    if n <= 2: return n\n    dp = [0] * (n + 1)\n    dp[1], dp[2] = 1, 2\n    for i in range(3, n + 1):\n        dp[i] = dp[i-1] + dp[i-2]\n    return dp[n]\n\n# Space-Optimized\ndef climb_optimal(n):\n    if n <= 2: return n\n    a, b = 1, 2\n    for _ in range(3, n + 1):\n        a, b = b, a + b\n    return b\n\nprint(climb_optimal(10))  # 89`
              },
              quiz: {
                question: 'What is the main advantage of bottom-up tabulation over top-down memoization?',
                options: [
                  'It\'s always faster',
                  'It avoids recursion and stack overflow risk',
                  'It uses more memory',
                  'It\'s easier to understand'
                ],
                correct: 1,
                explanation: 'Bottom-up tabulation uses iteration instead of recursion, eliminating the risk of hitting Python\'s recursion limit (default ~1000). It also avoids function call overhead.'
              }
            },
            {
              id: 'dsa_s10c1l3',
              type: 'challenge',
              title: 'Climbing Stairs',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Read an integer N. You can climb 1 or 2 steps at a time. How many distinct ways can you climb to the top (step N)? Print the number of ways.',
                starterCode: 'n = int(input())\n\n# Calculate and print number of ways to climb N stairs\n',
                hints: [
                  'This is like Fibonacci! ways(n) = ways(n-1) + ways(n-2)',
                  'Base cases: ways(1) = 1, ways(2) = 2',
                  'Use bottom-up DP or space-optimized approach'
                ],
                testCases: [
                  { input: '2', expectedOutput: '2' },
                  { input: '3', expectedOutput: '3' },
                  { input: '5', expectedOutput: '8' },
                  { input: '10', expectedOutput: '89' }
                ]
              }
            },
            {
              id: 'dsa_s10c1l4',
              type: 'challenge',
              title: 'Fibonacci (DP)',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Read an integer N (can be large, up to 1000). Print the Nth Fibonacci number using Dynamic Programming (not naive recursion).',
                starterCode: 'n = int(input())\n\n# Compute fib(n) using DP and print\n',
                hints: [
                  'Use tabulation: create a dp array of size n+1',
                  'dp[0] = 0, dp[1] = 1',
                  'Fill: dp[i] = dp[i-1] + dp[i-2]',
                  'Or use space optimization with just two variables'
                ],
                testCases: [
                  { input: '0', expectedOutput: '0' },
                  { input: '10', expectedOutput: '55' },
                  { input: '20', expectedOutput: '6765' },
                  { input: '50', expectedOutput: '12586269025' }
                ]
              }
            },
            {
              id: 'dsa_s10c1l5',
              type: 'quiz',
              title: 'DP Fundamentals Quiz',
              xp: 5,
              difficulty: 'hard',
              quiz: {
                question: 'Memoized Fibonacci reduces the time complexity from O(2^N) to what?',
                options: ['O(N^2)', 'O(N log N)', 'O(N)', 'O(log N)'],
                correct: 2,
                explanation: 'Memoization ensures each Fibonacci value is computed only once. There are N+1 unique subproblems, each taking O(1) to compute (just an addition), giving O(N) total.'
              }
            }
          ]
        },
        {
          id: 'dsa_s10c2',
          title: 'Classic DP Problems',
          lessons: [
            {
              id: 'dsa_s10c2l1',
              type: 'theory',
              title: 'Maximum Subarray (Kadane\'s Algorithm)',
              xp: 15,
              difficulty: 'medium',
              theory: {
                tldr: 'Kadane\'s algorithm finds the maximum sum contiguous subarray in O(N) time by tracking the max sum ending at each position.',
                content: `The **Maximum Subarray** problem: Find the contiguous subarray within an array that has the largest sum.

**Kadane's Algorithm** solves this in $O(N)$ time and $O(1)$ space:

For each position $i$, decide: should we extend the previous subarray or start a new one?

$$\\text{max\\_ending\\_here} = \\max(arr[i], \\text{max\\_ending\\_here} + arr[i])$$

If adding the current element to the running sum makes it worse than starting fresh, start fresh.

Track the global maximum across all positions.

This is a DP problem because at each position, we make an optimal choice based on the solution to the subproblem at the previous position.`,
                codeExample: `def max_subarray(arr):\n    max_ending_here = arr[0]\n    max_so_far = arr[0]\n    \n    for i in range(1, len(arr)):\n        max_ending_here = max(arr[i], max_ending_here + arr[i])\n        max_so_far = max(max_so_far, max_ending_here)\n    \n    return max_so_far\n\nprint(max_subarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))  # 6\n# The subarray [4, -1, 2, 1] has the largest sum = 6`
              },
              quiz: {
                question: 'What is the time complexity of Kadane\'s algorithm?',
                options: ['O(N^2)', 'O(N log N)', 'O(N)', 'O(1)'],
                correct: 2,
                explanation: 'Kadane\'s algorithm makes a single pass through the array, computing the max sum ending at each position in O(1), giving O(N) total.'
              }
            },
            {
              id: 'dsa_s10c2l2',
              type: 'challenge',
              title: 'Maximum Subarray Sum',
              xp: 25,
              difficulty: 'medium',
              challenge: {
                description: 'Read space-separated integers. Find the maximum sum of any contiguous subarray. Print the maximum sum.',
                starterCode: 'arr = [int(x) for x in input().split()]\n\n# Find and print maximum subarray sum\n',
                hints: [
                  'Use Kadane\'s algorithm',
                  'Track max_ending_here and max_so_far',
                  'At each element: max_ending_here = max(arr[i], max_ending_here + arr[i])',
                  'Update max_so_far = max(max_so_far, max_ending_here)'
                ],
                testCases: [
                  { input: '-2 1 -3 4 -1 2 1 -5 4', expectedOutput: '6' },
                  { input: '1 2 3 4', expectedOutput: '10' },
                  { input: '-1 -2 -3', expectedOutput: '-1' }
                ]
              }
            },
            {
              id: 'dsa_s10c2l3',
              type: 'theory',
              title: 'Coin Change Problem',
              xp: 15,
              difficulty: 'hard',
              theory: {
                tldr: 'Given coins of different denominations, find the minimum number of coins needed to make a target amount. Classic DP with O(amount × coins) time.',
                content: `The **Coin Change** problem: Given an array of coin denominations and a target amount, find the minimum number of coins needed to make that amount.

**DP Formulation:**
- State: \`dp[i]\` = minimum coins to make amount $i$.
- Base case: \`dp[0] = 0\` (0 coins to make amount 0).
- Transition: For each amount $i$ and each coin $c$:
  $$dp[i] = \\min(dp[i], dp[i - c] + 1) \\text{ if } i \\geq c$$
- Answer: \`dp[amount]\`. If it's still infinity, the amount cannot be made.

**Time**: $O(\\text{amount} \\times \\text{number of coins})$
**Space**: $O(\\text{amount})$

This is an **unbounded knapsack** variant — you can use each coin unlimited times.`,
                codeExample: `def coin_change(coins, amount):\n    dp = [float('inf')] * (amount + 1)\n    dp[0] = 0\n    \n    for i in range(1, amount + 1):\n        for coin in coins:\n            if coin <= i and dp[i - coin] + 1 < dp[i]:\n                dp[i] = dp[i - coin] + 1\n    \n    return dp[amount] if dp[amount] != float('inf') else -1\n\nprint(coin_change([1, 5, 10, 25], 30))  # 2 (25 + 5)\nprint(coin_change([2], 3))              # -1 (impossible)`
              },
              quiz: {
                question: 'In the Coin Change problem, what does dp[i] represent?',
                options: [
                  'The number of ways to make amount i',
                  'The minimum number of coins to make amount i',
                  'The maximum number of coins to make amount i',
                  'Whether amount i is possible'
                ],
                correct: 1,
                explanation: 'dp[i] stores the minimum number of coins needed to make the amount i. We build this up from dp[0] = 0 using the transition dp[i] = min(dp[i], dp[i-coin] + 1).'
              }
            },
            {
              id: 'dsa_s10c2l4',
              type: 'challenge',
              title: 'Coin Change',
              xp: 25,
              difficulty: 'hard',
              challenge: {
                description: 'Read coin denominations (space-separated) on line 1, and a target amount on line 2. Print the minimum number of coins needed. If impossible, print -1.',
                starterCode: 'coins = [int(x) for x in input().split()]\namount = int(input())\n\n# Find minimum coins and print\n',
                hints: [
                  'Create dp array of size amount+1, initialized to infinity',
                  'dp[0] = 0 (base case)',
                  'For each amount from 1 to target, try each coin',
                  'dp[i] = min(dp[i], dp[i-coin] + 1) if coin <= i'
                ],
                testCases: [
                  { input: '1 5 10 25\n30', expectedOutput: '2' },
                  { input: '2\n3', expectedOutput: '-1' },
                  { input: '1 2 5\n11', expectedOutput: '3' }
                ]
              }
            },
            {
              id: 'dsa_s10c2l5',
              type: 'theory',
              title: '0/1 Knapsack Problem',
              xp: 15,
              difficulty: 'hard',
              theory: {
                tldr: 'Given items with weights and values, and a weight capacity, maximize the total value without exceeding the capacity. Each item can be used at most once.',
                content: `The **0/1 Knapsack** is a classic DP problem: You have a bag (knapsack) with a weight capacity $W$, and $N$ items, each with a weight and value. Pick items to maximize total value without exceeding $W$. Each item is either taken (1) or left (0).

**DP Formulation:**
- State: \`dp[i][w]\` = maximum value using the first $i$ items with capacity $w$.
- Base case: \`dp[0][w] = 0\` for all $w$ (no items = no value).
- Transition: For item $i$ with weight $w_i$ and value $v_i$:
  - Don't take item $i$: \`dp[i][w] = dp[i-1][w]\`
  - Take item $i$ (if $w_i \\leq w$): \`dp[i][w] = dp[i-1][w - w_i] + v_i\`
  - Choose the max of both options.

**Time**: $O(N \\times W)$
**Space**: $O(N \\times W)$, optimizable to $O(W)$.`,
                codeExample: `def knapsack(weights, values, capacity):\n    n = len(weights)\n    dp = [[0] * (capacity + 1) for _ in range(n + 1)]\n    \n    for i in range(1, n + 1):\n        for w in range(capacity + 1):\n            # Don't take item i\n            dp[i][w] = dp[i-1][w]\n            # Take item i (if it fits)\n            if weights[i-1] <= w:\n                dp[i][w] = max(dp[i][w],\n                    dp[i-1][w - weights[i-1]] + values[i-1])\n    \n    return dp[n][capacity]\n\nweights = [2, 3, 4, 5]\nvalues  = [3, 4, 5, 6]\ncapacity = 5\nprint(knapsack(weights, values, capacity))  # 7`
              },
              quiz: {
                question: 'In the 0/1 Knapsack, why is it called "0/1"?',
                options: [
                  'Items have binary weights',
                  'Each item is either taken (1) or not taken (0) — no fractions',
                  'The knapsack can hold 0 or 1 items',
                  'The values are always 0 or 1'
                ],
                correct: 1,
                explanation: 'The "0/1" refers to the decision for each item: 0 (don\'t take it) or 1 (take it). Unlike the fractional knapsack, you cannot take a partial amount of an item.'
              }
            },
            {
              id: 'dsa_s10c2l6',
              type: 'challenge',
              title: 'Longest Common Subsequence',
              xp: 25,
              difficulty: 'hard',
              challenge: {
                description: 'Read two strings, one per line. Find the length of their longest common subsequence (LCS). Print the length.',
                starterCode: 's1 = input().strip()\ns2 = input().strip()\n\n# Find and print length of LCS\n',
                hints: [
                  'Create a 2D DP table of size (len(s1)+1) x (len(s2)+1)',
                  'If s1[i-1] == s2[j-1]: dp[i][j] = dp[i-1][j-1] + 1',
                  'Else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])',
                  'Answer is dp[len(s1)][len(s2)]'
                ],
                testCases: [
                  { input: 'abcde\nace', expectedOutput: '3' },
                  { input: 'abc\nabc', expectedOutput: '3' },
                  { input: 'abc\ndef', expectedOutput: '0' }
                ]
              }
            },
            {
              id: 'dsa_s10c2l7',
              type: 'quiz',
              title: 'Dynamic Programming Quiz',
              xp: 5,
              difficulty: 'hard',
              quiz: {
                question: 'What is the time complexity of the Longest Common Subsequence DP solution for two strings of length M and N?',
                options: ['O(M + N)', 'O(M * N)', 'O(2^(M+N))', 'O(M * N * (M + N))'],
                correct: 1,
                explanation: 'The LCS DP table has M × N cells, and each cell takes O(1) to compute, giving O(M * N) total time complexity.'
              }
            }
          ]
        },
        {
          id: 'dsa_s10c3',
          title: 'DP Practice',
          lessons: [
            {
              id: 'dsa_s10c3l1',
              type: 'theory',
              title: 'Longest Increasing Subsequence',
              xp: 15,
              difficulty: 'hard',
              theory: {
                tldr: 'Find the longest subsequence where each element is strictly greater than the previous. O(N^2) DP solution, optimizable to O(N log N) with binary search.',
                content: `The **Longest Increasing Subsequence (LIS)** problem: Given an array, find the length of the longest subsequence where elements are in strictly increasing order.

Note: A **subsequence** doesn't need to be contiguous (unlike a subarray).

**DP Solution ($O(N^2)$)**:
- \`dp[i]\` = length of the LIS ending at index $i$.
- For each $i$, check all $j < i$: if $arr[j] < arr[i]$, then \`dp[i] = max(dp[i], dp[j] + 1)\`.
- Answer: max of all \`dp[i]\`.

**Optimized Solution ($O(N \\log N)$)**:
- Maintain a "tails" array where \`tails[i]\` is the smallest ending element of all increasing subsequences of length $i+1$.
- For each element, use binary search to find its position in tails.
- The length of tails is the LIS length.`,
                codeExample: `# O(N^2) DP solution\ndef lis_dp(arr):\n    n = len(arr)\n    dp = [1] * n  # Every element is a subsequence of length 1\n    \n    for i in range(1, n):\n        for j in range(i):\n            if arr[j] < arr[i]:\n                dp[i] = max(dp[i], dp[j] + 1)\n    \n    return max(dp)\n\n# O(N log N) optimized solution\nimport bisect\ndef lis_optimal(arr):\n    tails = []\n    for num in arr:\n        pos = bisect.bisect_left(tails, num)\n        if pos == len(tails):\n            tails.append(num)\n        else:\n            tails[pos] = num\n    return len(tails)\n\nprint(lis_dp([10, 9, 2, 5, 3, 7, 101, 18]))  # 4\n# LIS: [2, 3, 7, 101] or [2, 5, 7, 101]`
              },
              quiz: {
                question: 'What is the difference between a subsequence and a subarray?',
                options: [
                  'They are the same thing',
                  'A subarray must be contiguous; a subsequence can skip elements but must maintain order',
                  'A subsequence must be contiguous',
                  'A subarray can skip elements'
                ],
                correct: 1,
                explanation: 'A subarray consists of consecutive elements (e.g., [3,4,5] from [1,3,4,5,2]). A subsequence maintains relative order but can skip elements (e.g., [1,4,5] from [1,3,4,5,2]).'
              }
            },
            {
              id: 'dsa_s10c3l2',
              type: 'challenge',
              title: 'Longest Increasing Subsequence',
              xp: 25,
              difficulty: 'hard',
              challenge: {
                description: 'Read space-separated integers. Find and print the length of the longest strictly increasing subsequence.',
                starterCode: 'arr = [int(x) for x in input().split()]\n\n# Find and print LIS length\n',
                hints: [
                  'Create dp array where dp[i] = LIS length ending at index i',
                  'Initialize all dp[i] = 1',
                  'For each i, check all j < i: if arr[j] < arr[i], dp[i] = max(dp[i], dp[j]+1)',
                  'Answer is max(dp)'
                ],
                testCases: [
                  { input: '10 9 2 5 3 7 101 18', expectedOutput: '4' },
                  { input: '1 2 3 4 5', expectedOutput: '5' },
                  { input: '5 4 3 2 1', expectedOutput: '1' }
                ]
              }
            },
            {
              id: 'dsa_s10c3l3',
              type: 'challenge',
              title: 'House Robber',
              xp: 25,
              difficulty: 'hard',
              challenge: {
                description: 'Read space-separated integers representing money in each house (in a row). You cannot rob two adjacent houses. Print the maximum amount you can rob.',
                starterCode: 'houses = [int(x) for x in input().split()]\n\n# Find and print maximum money without robbing adjacent\n',
                hints: [
                  'dp[i] = max money robbing from houses 0..i',
                  'dp[i] = max(dp[i-1], dp[i-2] + houses[i])',
                  'Either skip house i (take dp[i-1]) or rob house i (take dp[i-2] + houses[i])',
                  'Can optimize space to O(1) using two variables'
                ],
                testCases: [
                  { input: '1 2 3 1', expectedOutput: '4' },
                  { input: '2 7 9 3 1', expectedOutput: '12' },
                  { input: '5', expectedOutput: '5' }
                ]
              }
            },
            {
              id: 'dsa_s10c3l4',
              type: 'challenge',
              title: 'Min Cost Climbing Stairs',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Read space-separated integers representing the cost at each step. You can start at step 0 or step 1. At each step, you can climb 1 or 2 steps. Find the minimum cost to reach the top (past the last step). Print the minimum cost.',
                starterCode: 'cost = [int(x) for x in input().split()]\n\n# Find and print minimum cost to climb stairs\n',
                hints: [
                  'dp[i] = min cost to reach step i',
                  'dp[i] = cost[i] + min(dp[i-1], dp[i-2])',
                  'Base cases: dp[0] = cost[0], dp[1] = cost[1]',
                  'Answer is min(dp[n-1], dp[n-2]) — you can reach the top from either of the last two steps'
                ],
                testCases: [
                  { input: '10 15 20', expectedOutput: '15' },
                  { input: '1 100 1 1 1 100 1 1 100 1', expectedOutput: '6' },
                  { input: '0 0 0', expectedOutput: '0' }
                ]
              }
            },
            {
              id: 'dsa_s10c3l5',
              type: 'quiz',
              title: 'DP Mastery Quiz',
              xp: 5,
              difficulty: 'hard',
              quiz: {
                question: 'Which of the following problems can be solved with Dynamic Programming?',
                options: [
                  'Finding an element in an unsorted array',
                  'Maximum subarray sum, coin change, and longest common subsequence',
                  'Sorting an array',
                  'Finding the median of an array'
                ],
                correct: 1,
                explanation: 'Maximum subarray (Kadane\'s), Coin Change, and LCS are all classic DP problems with overlapping subproblems and optimal substructure.'
              }
            }
          ]
        }
      ]
    }
  ]
};

// ========================================
// Helper Functions
// ========================================

let _allDSALessons = null;

export function getAllDSALessons() {
  if (_allDSALessons) return _allDSALessons;
  _allDSALessons = [];
  for (const section of dsaCurriculum.sections) {
    for (const chapter of section.chapters) {
      for (const lesson of chapter.lessons) {
        _allDSALessons.push(lesson);
      }
    }
  }
  return _allDSALessons;
}

export function getDSALessonById(id) {
  return getAllDSALessons().find(l => l.id === id) || null;
}

export function getDSAChapterForLesson(lessonId) {
  for (const section of dsaCurriculum.sections) {
    for (const chapter of section.chapters) {
      if (chapter.lessons.some(l => l.id === lessonId)) {
        return chapter;
      }
    }
  }
  return null;
}

export function getDSASectionForLesson(lessonId) {
  for (const section of dsaCurriculum.sections) {
    for (const chapter of section.chapters) {
      if (chapter.lessons.some(l => l.id === lessonId)) {
        return section;
      }
    }
  }
  return null;
}

export function getNextDSALesson(currentId) {
  const all = getAllDSALessons();
  const idx = all.findIndex(l => l.id === currentId);
  return idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;
}

export function getPrevDSALesson(currentId) {
  const all = getAllDSALessons();
  const idx = all.findIndex(l => l.id === currentId);
  return idx > 0 ? all[idx - 1] : null;
}

export function getDSALessonIndex(lessonId) {
  return getAllDSALessons().findIndex(l => l.id === lessonId);
}
