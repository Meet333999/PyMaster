// ========================================
// PyMaster — Complete Python Curriculum
// 10 Sections, 40+ Chapters, 150+ Lessons
// ========================================

export const curriculum = {
  sections: [
    // =============================================
    // SECTION 1: PYTHON FUNDAMENTALS
    // =============================================
    {
      id: 's1',
      title: 'Python Fundamentals',
      icon: 'terminal',
      description: 'Learn the basics of Python programming',
      chapters: [
        {
          id: 's1c1',
          title: 'Hello World',
          lessons: [
            {
              id: 's1c1l1',
              type: 'theory',
              title: 'What is Python?',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Python is a beginner-friendly, versatile programming language used in web development, data science, AI, and more.',
                content: `Python is one of the most popular programming languages in the world, and for good reason. Created by Guido van Rossum in 1991, Python was designed to be easy to read and write — almost like writing in English.

Unlike many other languages, Python uses **indentation** (spaces) to define code blocks instead of curly braces. This makes Python code clean and readable. Python is used everywhere: from building websites (Instagram, Spotify) to data science, artificial intelligence, automation, and even game development.

In this course, you'll start from the very basics and work your way up to advanced Python concepts. Every concept comes with hands-on coding challenges so you learn by doing, not just reading.

Let's write your very first Python program!`,
                codeExample: `# Your first Python program\nprint("Hello, World!")\n\n# This outputs: Hello, World!`
              },
              quiz: {
                question: 'Who created Python?',
                options: ['Elon Musk', 'Guido van Rossum', 'Mark Zuckerberg', 'Bill Gates'],
                correct: 1,
                explanation: 'Python was created by Guido van Rossum and first released in 1991.'
              }
            },
            {
              id: 's1c1l2',
              type: 'challenge',
              title: 'Your First Print',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Write a program that prints `Hello, World!` to the screen. Use the `print()` function with the text inside quotes.',
                starterCode: '# Print Hello, World! below\n',
                hints: [
                  'Use the print() function to display text',
                  'Put your text inside parentheses after print',
                  'Text must be wrapped in quotes: "Hello, World!"',
                  'Solution: print("Hello, World!")'
                ],
                testCases: [
                  { input: '', expectedOutput: 'Hello, World!' }
                ]
              }
            },
            {
              id: 's1c1l3',
              type: 'theory',
              title: 'The print() Function',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'print() displays output to the screen. You can print strings, numbers, and multiple values separated by commas.',
                content: `The \`print()\` function is your primary tool for displaying output in Python. You can print text (strings), numbers, or even multiple values at once.

When printing text, wrap it in either **single quotes** (\`'hello'\`) or **double quotes** (\`"hello"\`) — both work the same way. You can also print multiple items by separating them with commas, and Python will add a space between each one.

You can also use the \`print()\` function with no arguments to print a blank line — useful for formatting your output.`,
                codeExample: `print("Hello!")          # Using double quotes\nprint('Hello!')          # Using single quotes\nprint("Age:", 25)        # Printing multiple values\nprint()                  # Blank line\nprint("Name", "is", "Python")`
              },
              quiz: {
                question: 'What happens when you write print("Hi", "there")?',
                options: ['Error', 'Hithere', 'Hi there', 'Hi, there'],
                correct: 2,
                explanation: 'When you pass multiple arguments to print(), Python separates them with a space by default.'
              }
            },
            {
              id: 's1c1l4',
              type: 'challenge',
              title: 'Multiple Prints',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Write a program that prints three lines:\nLine 1: `Python is fun`\nLine 2: `I am learning`\nLine 3: `Hello, PyMaster!`',
                starterCode: '# Print three lines below\n',
                hints: [
                  'Use three separate print() statements',
                  'Each print() creates a new line automatically',
                  'Make sure the text matches exactly, including capitalization',
                  'print("Python is fun")\nprint("I am learning")\nprint("Hello, PyMaster!")'
                ],
                testCases: [
                  { input: '', expectedOutput: 'Python is fun\nI am learning\nHello, PyMaster!' }
                ]
              }
            },
            {
              id: 's1c1l5',
              type: 'quiz',
              title: 'Hello World Quiz',
              xp: 5,
              difficulty: 'easy',
              quiz: {
                question: 'Which of the following is the correct way to print text in Python?',
                options: ['echo("Hello")', 'print("Hello")', 'console.log("Hello")', 'System.out.println("Hello")'],
                correct: 1,
                explanation: 'In Python, we use print() to display output. echo is PHP, console.log is JavaScript, and System.out.println is Java.'
              }
            }
          ]
        },
        {
          id: 's1c2',
          title: 'Variables',
          lessons: [
            {
              id: 's1c2l1',
              type: 'theory',
              title: 'What are Variables?',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Variables are containers that store data values. Create them with the = sign: name = "Alice"',
                content: `Think of a variable as a **labeled box** that holds a value. You give the box a name, and you can put different things inside it — numbers, text, or other types of data.

In Python, you create a variable by choosing a name and using the **equals sign** (\`=\`) to assign a value to it. Unlike some other languages, you don't need to declare the type of data — Python figures it out automatically!

Variables are essential because they let you store and reuse data throughout your program. Instead of typing the same value over and over, you store it in a variable and use the variable name instead.`,
                codeExample: `name = "Alice"        # A text (string) variable\nage = 25              # A number (integer) variable\nheight = 5.6          # A decimal (float) variable\nis_student = True     # A boolean variable\n\nprint(name)           # Output: Alice\nprint(age)            # Output: 25`
              },
              quiz: {
                question: 'How do you create a variable called "score" with value 100?',
                options: ['var score = 100', 'score = 100', 'int score = 100', 'let score = 100'],
                correct: 1,
                explanation: 'In Python, you simply write the variable name, an equals sign, and the value. No keywords like var, let, or int are needed.'
              }
            },
            {
              id: 's1c2l2',
              type: 'challenge',
              title: 'Create Variables',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Create two variables:\n1. A variable called `player_name` with value `"Hero"`\n2. A variable called `player_score` with value `100`\n\nThen print both variables.',
                starterCode: '# Create your variables here\n\n# Print them\n',
                hints: [
                  'Use the = sign to assign values to variables',
                  'Text values need quotes, numbers do not',
                  'player_name = "Hero"\nplayer_score = 100',
                  'Full solution:\nplayer_name = "Hero"\nplayer_score = 100\nprint(player_name)\nprint(player_score)'
                ],
                testCases: [
                  { input: '', expectedOutput: 'Hero\n100' }
                ]
              }
            },
            {
              id: 's1c2l3',
              type: 'theory',
              title: 'Variable Naming Rules',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Variable names must start with a letter or underscore, can contain letters/numbers/underscores, and are case-sensitive.',
                content: `Python has specific rules for naming variables:

**Rules (must follow):**
- Must start with a letter (a-z, A-Z) or underscore (_)
- Can contain letters, numbers, and underscores
- Cannot start with a number
- Cannot use Python **keywords** (like \`if\`, \`for\`, \`print\`)
- Names are **case-sensitive**: \`name\` and \`Name\` are different variables

**Conventions (best practices):**
- Use **snake_case** for variable names: \`player_score\`, \`first_name\`
- Use meaningful, descriptive names: \`age\` instead of \`a\`
- Avoid single-letter names (except in loops)`,
                codeExample: `# ✅ Valid variable names\nmy_name = "Alice"\n_private = 42\nplayerScore2 = 100\n\n# ❌ Invalid variable names\n# 2player = "Bob"    # Can't start with number\n# my-name = "Eve"    # Can't use hyphens\n# for = 5            # Can't use keywords`
              },
              quiz: {
                question: 'Which of these is a VALID Python variable name?',
                options: ['2fast', 'my-var', 'player_score', 'class'],
                correct: 2,
                explanation: 'player_score follows all rules: starts with a letter, uses only letters and underscores. 2fast starts with a number, my-var uses a hyphen, and class is a reserved keyword.'
              }
            },
            {
              id: 's1c2l4',
              type: 'challenge',
              title: 'Swap Variables',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'You are given two variables `a = 5` and `b = 10`. Swap their values so that `a` becomes `10` and `b` becomes `5`, then print both.',
                starterCode: 'a = 5\nb = 10\n\n# Swap the values of a and b\n\nprint(a)\nprint(b)\n',
                hints: [
                  'You need a temporary variable to hold one value during the swap',
                  'Or you can use Python\'s elegant tuple swap: a, b = b, a',
                  'Method 1: temp = a, then a = b, then b = temp',
                  'Simplest: a, b = b, a'
                ],
                testCases: [
                  { input: '', expectedOutput: '10\n5' }
                ]
              }
            },
            {
              id: 's1c2l5',
              type: 'quiz',
              title: 'Variables Quiz',
              xp: 5,
              difficulty: 'easy',
              quiz: {
                question: 'What will print(x) output after: x = 5, then x = 10?',
                options: ['5', '10', '15', 'Error'],
                correct: 1,
                explanation: 'When you assign a new value to a variable, it overwrites the old value. So x becomes 10.'
              }
            }
          ]
        },
        {
          id: 's1c3',
          title: 'Data Types',
          lessons: [
            {
              id: 's1c3l1',
              type: 'theory',
              title: 'Numbers: Integers & Floats',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Integers are whole numbers (42). Floats are decimal numbers (3.14). You can do math with both.',
                content: `Python has two main types of numbers:

**Integers (int):** Whole numbers without decimal points. They can be positive, negative, or zero: \`42\`, \`-7\`, \`0\`, \`1000000\`.

**Floats (float):** Numbers with decimal points: \`3.14\`, \`-0.5\`, \`2.0\`. Even \`2.0\` is a float because it has a decimal point.

You can do all standard math operations with both types. When you mix integers and floats in a calculation, Python automatically gives you a float result. You can check a value's type using the \`type()\` function.`,
                codeExample: `score = 100          # int\npi = 3.14159         # float\ntemperature = -5     # negative int\n\nprint(type(score))        # <class 'int'>\nprint(type(pi))           # <class 'float'>\nprint(score + pi)         # 103.14159 (float result)`
              },
              quiz: {
                question: 'What type is the value 7.0?',
                options: ['int', 'float', 'str', 'bool'],
                correct: 1,
                explanation: '7.0 has a decimal point, making it a float, even though it represents a whole number.'
              }
            },
            {
              id: 's1c3l2',
              type: 'challenge',
              title: 'Number Operations',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Create two variables:\n- `price` with value `49.99`\n- `quantity` with value `3`\n\nCalculate the total cost and store it in a variable called `total`. Then print the total.',
                starterCode: '# Create variables and calculate total\n',
                hints: [
                  'Multiply price by quantity to get the total',
                  'Use the * operator for multiplication',
                  'total = price * quantity',
                  'price = 49.99\nquantity = 3\ntotal = price * quantity\nprint(total)'
                ],
                testCases: [
                  { input: '', expectedOutput: '149.97' }
                ]
              }
            },
            {
              id: 's1c3l3',
              type: 'theory',
              title: 'Strings',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Strings are text data wrapped in quotes. You can concatenate them with + and repeat with *.',
                content: `Strings are sequences of characters — basically, text. In Python, you create strings by wrapping text in **single quotes** (\`'hello'\`), **double quotes** (\`"hello"\`), or **triple quotes** (\`'''hello'''\` or \`"""hello"""\`) for multi-line text.

You can **concatenate** (join) strings using the \`+\` operator, and **repeat** strings using the \`*\` operator. Strings also have a **length**, which you can find using the \`len()\` function.

One important thing: you can't directly concatenate a string with a number. You need to convert the number to a string first using \`str()\`.`,
                codeExample: `greeting = "Hello"\nname = "World"\n\n# Concatenation\nmessage = greeting + ", " + name + "!"\nprint(message)        # Hello, World!\n\n# Repetition\nline = "-" * 20\nprint(line)           # --------------------\n\n# Length\nprint(len(greeting))  # 5`
              },
              quiz: {
                question: 'What does "Ha" * 3 produce?',
                options: ['Ha3', 'HaHaHa', 'Ha Ha Ha', 'Error'],
                correct: 1,
                explanation: 'The * operator repeats a string. "Ha" * 3 produces "HaHaHa".'
              }
            },
            {
              id: 's1c3l4',
              type: 'challenge',
              title: 'String Creation',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Create a variable `language` with value `"Python"` and a variable `version` with value `3`. Print: `Python 3` (hint: you\'ll need to convert the number to a string).',
                starterCode: '# Create variables and print the result\n',
                hints: [
                  'Create language = "Python" and version = 3',
                  'You need to convert version to a string using str()',
                  'Concatenate with: language + " " + str(version)',
                  'language = "Python"\nversion = 3\nprint(language + " " + str(version))'
                ],
                testCases: [
                  { input: '', expectedOutput: 'Python 3' }
                ]
              }
            },
            {
              id: 's1c3l5',
              type: 'theory',
              title: 'Booleans',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Booleans are True or False values. They\'re used for conditions and comparisons.',
                content: `Booleans represent one of two values: **True** or **False** (note the capital letters — this matters in Python!).

Booleans are essential for making decisions in your programs. They're the result of **comparisons** and **logical operations**. For example, \`5 > 3\` evaluates to \`True\`, and \`10 == 20\` evaluates to \`False\`.

You can also convert other types to booleans using \`bool()\`. Most values are \`True\`, except for \`0\`, \`""\` (empty string), \`None\`, and empty collections, which are \`False\`.`,
                codeExample: `is_active = True\nis_logged_in = False\n\nprint(5 > 3)          # True\nprint(10 == 20)       # False\nprint(bool(1))        # True\nprint(bool(0))        # False\nprint(bool("hello"))  # True\nprint(bool(""))       # False`
              },
              quiz: {
                question: 'What is bool(0)?',
                options: ['True', 'False', '0', 'Error'],
                correct: 1,
                explanation: 'In Python, 0 is considered "falsy", so bool(0) returns False.'
              }
            },
            {
              id: 's1c3l6',
              type: 'challenge',
              title: 'Boolean Values',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Create a variable `temperature` with value `35`. Create a boolean variable `is_hot` that is `True` if temperature is greater than 30. Print `is_hot`.',
                starterCode: '# Create temperature and is_hot\n',
                hints: [
                  'Use > to compare: temperature > 30',
                  'Store the comparison result in is_hot',
                  'is_hot = temperature > 30',
                  'temperature = 35\nis_hot = temperature > 30\nprint(is_hot)'
                ],
                testCases: [
                  { input: '', expectedOutput: 'True' }
                ]
              }
            },
            {
              id: 's1c3l7',
              type: 'quiz',
              title: 'Data Types Quiz',
              xp: 5,
              difficulty: 'easy',
              quiz: {
                question: 'What is type("42")?',
                options: ['int', 'float', 'str', 'bool'],
                correct: 2,
                explanation: '"42" is wrapped in quotes, making it a string (str), not a number.'
              }
            }
          ]
        },
        {
          id: 's1c4',
          title: 'Comments',
          lessons: [
            {
              id: 's1c4l1',
              type: 'theory',
              title: 'Single-Line Comments',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Use # to write comments. Python ignores everything after # on that line.',
                content: `Comments are notes you write in your code that Python **completely ignores**. They're for humans only — they help explain what your code does and why.

In Python, you create a single-line comment by starting with the **hash symbol** (\`#\`). Everything after \`#\` on that line is treated as a comment. You can put comments on their own line or at the end of a code line.

Good comments explain **why** you wrote something, not **what** the code does (the code itself shows that). Writing clear comments is a professional habit that makes your code easier to maintain.`,
                codeExample: `# This is a full-line comment\nname = "Alice"  # This is an inline comment\n\n# Calculate the final price with tax\nprice = 100\ntax_rate = 0.08\ntotal = price * (1 + tax_rate)  # Add 8% tax`
              },
              quiz: {
                question: 'What symbol starts a comment in Python?',
                options: ['//', '#', '/*', '--'],
                correct: 1,
                explanation: 'Python uses # for comments. // is used in JavaScript/C++, /* in C/Java, and -- in SQL.'
              }
            },
            {
              id: 's1c4l2',
              type: 'theory',
              title: 'Multi-Line Comments',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Use triple quotes (""" or \'\'\') for multi-line strings/comments, or multiple # for multi-line comments.',
                content: `Python doesn't have a dedicated multi-line comment syntax like some other languages. Instead, there are two approaches:

**Method 1: Multiple # signs** — Simply put \`#\` at the start of each line. This is the most common and recommended approach for actual comments.

**Method 2: Triple-quoted strings** — Use \`"""\` or \`'''\` to create a multi-line string. If this string isn't assigned to a variable, Python ignores it. These are technically strings, not comments, but they're commonly used as **docstrings** to document functions and classes.`,
                codeExample: `# Method 1: Multiple hash comments\n# This function calculates\n# the total price including\n# tax and shipping\n\n"""\nMethod 2: Triple-quoted string\nThis is often used as a docstring\nfor documenting functions\n"""\n\ndef greet(name):\n    """This is a docstring for the function."""\n    print("Hello, " + name)`
              },
              quiz: {
                question: 'Which is the recommended way to write multi-line comments?',
                options: ['/* comment */', '// comment', 'Multiple # on each line', '<!-- comment -->'],
                correct: 2,
                explanation: 'In Python, the recommended way is to use # at the beginning of each comment line.'
              }
            },
            {
              id: 's1c4l3',
              type: 'challenge',
              title: 'Add Comments',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'The code below calculates a rectangle\'s area. Add a comment above the code that says `# Calculate the area of a rectangle`, then print the result.',
                starterCode: 'width = 5\nheight = 10\narea = width * height\nprint(area)\n',
                hints: [
                  'Add a line starting with # before the code',
                  'Your comment should say: # Calculate the area of a rectangle',
                  'Put the comment on the first line, before width = 5',
                  '# Calculate the area of a rectangle\nwidth = 5\nheight = 10\narea = width * height\nprint(area)'
                ],
                testCases: [
                  { input: '', expectedOutput: '50' }
                ]
              }
            },
            {
              id: 's1c4l4',
              type: 'quiz',
              title: 'Comments Quiz',
              xp: 5,
              difficulty: 'easy',
              quiz: {
                question: 'What will this code output: # print("Hello")',
                options: ['Hello', '# print("Hello")', 'Nothing (it\'s a comment)', 'Error'],
                correct: 2,
                explanation: 'The entire line is a comment because it starts with #. Python ignores it completely, so nothing is printed.'
              }
            }
          ]
        },
        {
          id: 's1c5',
          title: 'Input & Output',
          lessons: [
            {
              id: 's1c5l1',
              type: 'theory',
              title: 'The input() Function',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'input() reads text from the user. It always returns a string, so convert numbers with int() or float().',
                content: `The \`input()\` function allows your program to **receive data from the user**. When Python reaches an \`input()\` call, it pauses and waits for the user to type something and press Enter.

You can pass a **prompt message** inside \`input()\` to tell the user what to enter. The function always returns a **string**, even if the user types a number. To use the input as a number, you need to convert it with \`int()\` or \`float()\`.`,
                codeExample: `name = input("What's your name? ")\nprint("Hello, " + name + "!")\n\n# For numbers, convert the input:\nage = int(input("How old are you? "))\nprint("Next year you'll be", age + 1)`
              },
              quiz: {
                question: 'What type does input() always return?',
                options: ['int', 'float', 'str', 'It depends on what the user types'],
                correct: 2,
                explanation: 'input() ALWAYS returns a string (str). Even if the user types 42, it returns "42" as a string.'
              }
            },
            {
              id: 's1c5l2',
              type: 'challenge',
              title: 'Get User Input',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Read a number from input, double it, and print the result. The input will be an integer.',
                starterCode: '# Read a number, double it, and print\n',
                hints: [
                  'Use input() to read the value',
                  'Convert it to int with int()',
                  'Multiply by 2 and print',
                  'num = int(input())\nprint(num * 2)'
                ],
                testCases: [
                  { input: '5', expectedOutput: '10' },
                  { input: '0', expectedOutput: '0' },
                  { input: '7', expectedOutput: '14' }
                ]
              }
            },
            {
              id: 's1c5l3',
              type: 'theory',
              title: 'Formatted Output',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'f-strings let you embed variables directly in strings: f"Hello, {name}!" — the cleanest way to format output.',
                content: `Python offers several ways to format output, but **f-strings** (formatted string literals) are the most modern and readable approach. Create an f-string by putting \`f\` before the opening quote, then use **curly braces** \`{}\` to embed variables or expressions directly.

F-strings can contain any valid Python expression inside the curly braces — variables, math operations, function calls, and more. They're available in Python 3.6+ and are the recommended way to format strings.`,
                codeExample: `name = "Alice"\nage = 25\nscore = 95.5\n\n# f-string formatting\nprint(f"Name: {name}")\nprint(f"Age: {age}")\nprint(f"Score: {score}%")\nprint(f"Next year: {age + 1}")\nprint(f"{'='*20}")  # Expressions work too!`
              },
              quiz: {
                question: 'What does f"Score: {10 + 5}" print?',
                options: ['Score: {10 + 5}', 'Score: 10 + 5', 'Score: 15', 'Error'],
                correct: 2,
                explanation: 'f-strings evaluate expressions inside curly braces. {10 + 5} becomes 15.'
              }
            },
            {
              id: 's1c5l4',
              type: 'challenge',
              title: 'Greeting Program',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Read a name from input and print: `Hello, <name>! Welcome to PyMaster.` Use an f-string for formatting.',
                starterCode: '# Read name and print greeting\n',
                hints: [
                  'Use input() to read the name',
                  'Use an f-string: f"Hello, {name}!..."',
                  'The full greeting is: Hello, <name>! Welcome to PyMaster.',
                  'name = input()\nprint(f"Hello, {name}! Welcome to PyMaster.")'
                ],
                testCases: [
                  { input: 'Alice', expectedOutput: 'Hello, Alice! Welcome to PyMaster.' },
                  { input: 'Bob', expectedOutput: 'Hello, Bob! Welcome to PyMaster.' }
                ]
              }
            },
            {
              id: 's1c5l5',
              type: 'quiz',
              title: 'Input/Output Quiz',
              xp: 5,
              difficulty: 'easy',
              quiz: {
                question: 'Which correctly creates an f-string with a variable name?',
                options: ['print("Hello {name}")', 'print(f"Hello {name}")', 'print(f"Hello [name]")', 'print("Hello" + {name})'],
                correct: 1,
                explanation: 'f-strings require the f prefix before the quote and curly braces {} around variable names.'
              }
            }
          ]
        }
      ]
    },

    // =============================================
    // SECTION 2: OPERATORS & EXPRESSIONS
    // =============================================
    {
      id: 's2',
      title: 'Operators & Expressions',
      icon: 'code',
      description: 'Master arithmetic, comparison, and logical operators',
      chapters: [
        {
          id: 's2c1',
          title: 'Arithmetic Operators',
          lessons: [
            {
              id: 's2c1l1',
              type: 'theory',
              title: 'Basic Math: +, -, *, /',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Python supports standard math: + (add), - (subtract), * (multiply), / (divide). Division always returns a float.',
                content: `Python makes math easy! The four basic arithmetic operators work exactly as you'd expect. One important detail: the \`/\` operator always returns a **float** result, even when dividing two integers evenly (e.g., \`10 / 2\` gives \`5.0\`, not \`5\`).

Python follows standard **order of operations** (PEMDAS): Parentheses, Exponents, Multiplication/Division, Addition/Subtraction. Use parentheses to control the order when needed.`,
                codeExample: `print(10 + 3)    # 13\nprint(10 - 3)    # 7\nprint(10 * 3)    # 30\nprint(10 / 3)    # 3.3333333333333335\nprint(10 / 2)    # 5.0 (always float!)\n\n# Order of operations\nprint(2 + 3 * 4)     # 14 (not 20)\nprint((2 + 3) * 4)   # 20 (parentheses first)`
              },
              quiz: {
                question: 'What is the result of 10 / 5 in Python?',
                options: ['2', '2.0', '2.5', 'Error'],
                correct: 1,
                explanation: 'Division (/) always returns a float in Python, so 10 / 5 = 2.0, not 2.'
              }
            },
            {
              id: 's2c1l2',
              type: 'challenge',
              title: 'Simple Calculator',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Read two integers from input (one per line). Print their sum, difference, product, and quotient on separate lines.',
                starterCode: '# Read two numbers and perform operations\n',
                hints: [
                  'Read each number with int(input())',
                  'Use +, -, *, / for the four operations',
                  'Print each result on a separate line',
                  'a = int(input())\nb = int(input())\nprint(a + b)\nprint(a - b)\nprint(a * b)\nprint(a / b)'
                ],
                testCases: [
                  { input: '10\n3', expectedOutput: '13\n7\n30\n3.3333333333333335' },
                  { input: '8\n4', expectedOutput: '12\n4\n32\n2.0' }
                ]
              }
            },
            {
              id: 's2c1l3',
              type: 'theory',
              title: 'Floor Division, Modulo & Power',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: '// is integer division, % gives remainder, ** is exponentiation (power).',
                content: `Python has three more arithmetic operators that are incredibly useful:

**Floor Division (//):** Divides and rounds down to the nearest integer. \`7 // 2\` gives \`3\` (not 3.5).

**Modulo (%):** Returns the **remainder** of division. \`7 % 2\` gives \`1\` because 7 ÷ 2 = 3 remainder 1. This is great for checking if a number is even/odd!

**Exponentiation (**):** Raises a number to a power. \`2 ** 3\` gives \`8\` (2 × 2 × 2).`,
                codeExample: `print(7 // 2)    # 3 (floor division)\nprint(7 % 2)     # 1 (remainder)\nprint(2 ** 3)    # 8 (2 to the power of 3)\n\n# Practical: check even/odd\nprint(10 % 2)    # 0 → even!\nprint(7 % 2)     # 1 → odd!\n\n# Square root (power of 0.5)\nprint(25 ** 0.5) # 5.0`
              },
              quiz: {
                question: 'What is 17 % 5?',
                options: ['3', '2', '3.4', '12'],
                correct: 1,
                explanation: '17 ÷ 5 = 3 remainder 2. The modulo operator (%) returns the remainder, which is 2.'
              }
            },
            {
              id: 's2c1l4',
              type: 'challenge',
              title: 'Area Calculator',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Read the radius of a circle from input (integer). Calculate and print the area using the formula: area = π × r². Use 3.14159 for π.',
                starterCode: '# Calculate circle area\n',
                hints: [
                  'Area formula: pi * r ** 2',
                  'Use 3.14159 for pi',
                  'Read radius with int(input())',
                  'r = int(input())\narea = 3.14159 * r ** 2\nprint(area)'
                ],
                testCases: [
                  { input: '5', expectedOutput: '78.53975' },
                  { input: '10', expectedOutput: '314.159' }
                ]
              }
            },
            {
              id: 's2c1l5',
              type: 'quiz',
              title: 'Arithmetic Quiz',
              xp: 5,
              difficulty: 'easy',
              quiz: {
                question: 'What is 2 ** 4?',
                options: ['6', '8', '16', '24'],
                correct: 2,
                explanation: '** is the exponentiation operator. 2 ** 4 = 2×2×2×2 = 16.'
              }
            }
          ]
        },
        {
          id: 's2c2',
          title: 'Comparison Operators',
          lessons: [
            {
              id: 's2c2l1',
              type: 'theory',
              title: 'Comparing Values',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Comparison operators (==, !=, >, <, >=, <=) compare values and return True or False.',
                content: `Comparison operators let you compare two values and get a **boolean** result (\`True\` or \`False\`). They're essential for making decisions in your programs.

Here are all six comparison operators:
- \`==\` Equal to (note: two equals signs, not one!)
- \`!=\` Not equal to
- \`>\` Greater than
- \`<\` Less than
- \`>=\` Greater than or equal to
- \`<=\` Less than or equal to

You can compare numbers, strings (alphabetically), and other types.`,
                codeExample: `print(5 == 5)     # True\nprint(5 != 3)     # True\nprint(10 > 5)     # True\nprint(3 < 1)      # False\nprint(5 >= 5)     # True\nprint(4 <= 3)     # False\n\n# Strings compare alphabetically\nprint("apple" < "banana")  # True\nprint("a" == "A")          # False (case-sensitive)`
              },
              quiz: {
                question: 'What does 5 == "5" return in Python?',
                options: ['True', 'False', 'Error', '5'],
                correct: 1,
                explanation: '5 (int) and "5" (str) are different types, so == returns False.'
              }
            },
            {
              id: 's2c2l2',
              type: 'challenge',
              title: 'Compare Values',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Read two integers from input. Print `True` if the first number is greater than or equal to the second, `False` otherwise.',
                starterCode: '# Compare two numbers\n',
                hints: [
                  'Read two numbers using int(input())',
                  'Use the >= operator to compare',
                  'Print the result of the comparison directly',
                  'a = int(input())\nb = int(input())\nprint(a >= b)'
                ],
                testCases: [
                  { input: '10\n5', expectedOutput: 'True' },
                  { input: '3\n7', expectedOutput: 'False' },
                  { input: '5\n5', expectedOutput: 'True' }
                ]
              }
            },
            {
              id: 's2c2l3',
              type: 'quiz',
              title: 'Comparison Quiz',
              xp: 5,
              difficulty: 'easy',
              quiz: {
                question: 'Which operator checks if two values are NOT equal?',
                options: ['<>', '!=', '=/=', 'not =='],
                correct: 1,
                explanation: '!= is the "not equal to" operator in Python.'
              }
            }
          ]
        },
        {
          id: 's2c3',
          title: 'Logical Operators',
          lessons: [
            {
              id: 's2c3l1',
              type: 'theory',
              title: 'and, or, not',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: '`and` requires both True, `or` requires at least one True, `not` flips True↔False.',
                content: `Logical operators combine or modify boolean values:

**\`and\`:** Returns \`True\` only if **both** sides are \`True\`. Think: "Is it sunny AND warm?" — both must be true.

**\`or\`:** Returns \`True\` if **at least one** side is \`True\`. Think: "Is it Saturday OR Sunday?" — either works.

**\`not\`:** **Flips** a boolean value. \`not True\` becomes \`False\`, \`not False\` becomes \`True\`.

These operators are essential for building complex conditions in your programs.`,
                codeExample: `age = 25\nhas_id = True\n\n# and: both must be true\ncan_enter = age >= 18 and has_id\nprint(can_enter)  # True\n\n# or: at least one must be true\nis_weekend = False\nis_holiday = True\nday_off = is_weekend or is_holiday\nprint(day_off)    # True\n\n# not: flips the value\nis_raining = False\nprint(not is_raining)  # True`
              },
              quiz: {
                question: 'What is True and False?',
                options: ['True', 'False', 'None', 'Error'],
                correct: 1,
                explanation: 'The `and` operator returns True only if BOTH sides are True. Since one is False, the result is False.'
              }
            },
            {
              id: 's2c3l2',
              type: 'challenge',
              title: 'Logical Expressions',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Read an integer from input. Print `True` if the number is between 1 and 100 (inclusive), `False` otherwise.',
                starterCode: '# Check if number is between 1 and 100\n',
                hints: [
                  'Use `and` to combine two conditions',
                  'Check if num >= 1 AND num <= 100',
                  'You can also use: 1 <= num <= 100',
                  'num = int(input())\nprint(1 <= num <= 100)'
                ],
                testCases: [
                  { input: '50', expectedOutput: 'True' },
                  { input: '0', expectedOutput: 'False' },
                  { input: '100', expectedOutput: 'True' },
                  { input: '101', expectedOutput: 'False' }
                ]
              }
            },
            {
              id: 's2c3l3',
              type: 'quiz',
              title: 'Logical Operators Quiz',
              xp: 5,
              difficulty: 'easy',
              quiz: {
                question: 'What is not (5 > 3)?',
                options: ['True', 'False', '5', 'Error'],
                correct: 1,
                explanation: '5 > 3 is True, and not True is False.'
              }
            }
          ]
        },
        {
          id: 's2c4',
          title: 'Assignment Operators',
          lessons: [
            {
              id: 's2c4l1',
              type: 'theory',
              title: 'Compound Assignment',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Compound operators (+=, -=, *=, /=) combine assignment with an operation. x += 5 is the same as x = x + 5.',
                content: `Compound assignment operators are shortcuts that combine an operation with assignment. Instead of writing \`x = x + 5\`, you can write \`x += 5\` — it does the same thing but is shorter and cleaner.

All arithmetic operators have compound versions:
- \`+=\` Add and assign
- \`-=\` Subtract and assign
- \`*=\` Multiply and assign
- \`/=\` Divide and assign
- \`//=\` Floor divide and assign
- \`%=\` Modulo and assign
- \`**=\` Power and assign`,
                codeExample: `score = 100\nscore += 10   # score is now 110\nscore -= 5    # score is now 105\nscore *= 2    # score is now 210\n\nprint(score)  # 210\n\n# Works with strings too!\ngreeting = "Hello"\ngreeting += " World"\nprint(greeting)  # Hello World`
              },
              quiz: {
                question: 'After x = 10 and x *= 3, what is x?',
                options: ['10', '13', '30', '3'],
                correct: 2,
                explanation: 'x *= 3 is the same as x = x * 3, so x = 10 * 3 = 30.'
              }
            },
            {
              id: 's2c4l2',
              type: 'challenge',
              title: 'Compound Assignment',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Start with `balance = 1000`. Apply these operations in order using compound operators:\n1. Add 500\n2. Subtract 200\n3. Multiply by 2\n\nPrint the final balance.',
                starterCode: 'balance = 1000\n\n# Apply operations\n',
                hints: [
                  'Use += to add 500',
                  'Use -= to subtract 200',
                  'Use *= to multiply by 2',
                  'balance = 1000\nbalance += 500\nbalance -= 200\nbalance *= 2\nprint(balance)'
                ],
                testCases: [
                  { input: '', expectedOutput: '2600' }
                ]
              }
            },
            {
              id: 's2c4l3',
              type: 'quiz',
              title: 'Assignment Quiz',
              xp: 5,
              difficulty: 'easy',
              quiz: {
                question: 'Which is equivalent to x = x + 1?',
                options: ['x ++ 1', 'x += 1', 'x =+ 1', 'x + 1 = x'],
                correct: 1,
                explanation: 'x += 1 is the compound assignment that adds 1 to x. Python does not have ++ operator.'
              }
            }
          ]
        }
      ]
    },

    // =============================================
    // SECTION 3: CONTROL FLOW
    // =============================================
    {
      id: 's3',
      title: 'Control Flow',
      icon: 'git-branch',
      description: 'Master if/else statements, loops, and program flow',
      chapters: [
        {
          id: 's3c1',
          title: 'If Statements',
          lessons: [
            { id: 's3c1l1', type: 'theory', title: 'If Statement Basics', xp: 10, difficulty: 'easy', theory: { tldr: 'if condition: runs code only when the condition is True. Indentation defines the code block.', content: `The \`if\` statement lets your program make decisions. If the condition is \`True\`, the indented code block runs. If it's \`False\`, the block is skipped.\n\nIndentation (usually 4 spaces) is crucial in Python — it defines which lines belong to the if block. All lines at the same indentation level are part of the same block.`, codeExample: `age = 20\n\nif age >= 18:\n    print("You are an adult")\n    print("You can vote")\n\nprint("This always runs")  # Not indented = not part of if` }, quiz: { question: 'What defines a code block in Python?', options: ['Curly braces {}', 'Indentation', 'Parentheses ()', 'Square brackets []'], correct: 1, explanation: 'Python uses indentation (spaces/tabs) to define code blocks, unlike most other languages that use curly braces.' } },
            { id: 's3c1l2', type: 'challenge', title: 'Age Check', xp: 20, difficulty: 'easy', challenge: { description: 'Read an age from input. If the age is 18 or older, print `Adult`. If under 18, print `Minor`.', starterCode: '# Check age and print result\n', hints: ['Use if and else', 'The condition is age >= 18', 'if age >= 18: print("Adult") else: print("Minor")', 'age = int(input())\nif age >= 18:\n    print("Adult")\nelse:\n    print("Minor")'], testCases: [{ input: '20', expectedOutput: 'Adult' }, { input: '15', expectedOutput: 'Minor' }, { input: '18', expectedOutput: 'Adult' }] } },
            { id: 's3c1l3', type: 'theory', title: 'If-Else Statements', xp: 10, difficulty: 'easy', theory: { tldr: 'else provides an alternative block that runs when the if condition is False.', content: `The \`else\` clause gives your program a second path. If the \`if\` condition is \`True\`, the if-block runs. If it's \`False\`, the else-block runs instead. Exactly one of the two blocks always executes.\n\nThe \`else\` keyword must be on the same indentation level as its matching \`if\`, followed by a colon.`, codeExample: `temperature = 30\n\nif temperature > 25:\n    print("It's hot!")\n    print("Wear light clothes")\nelse:\n    print("It's cool")\n    print("Bring a jacket")` }, quiz: { question: 'Can you have else without if?', options: ['Yes', 'No', 'Only in Python 3', 'Only with elif'], correct: 1, explanation: 'else must always be paired with a preceding if (or elif). It cannot stand alone.' } },
            { id: 's3c1l4', type: 'challenge', title: 'Even or Odd', xp: 20, difficulty: 'easy', challenge: { description: 'Read an integer from input. Print `Even` if the number is even, or `Odd` if it\'s odd.', starterCode: '# Check even or odd\n', hints: ['Use the modulo operator %', 'A number is even if num % 2 == 0', 'Use if/else to choose which to print', 'num = int(input())\nif num % 2 == 0:\n    print("Even")\nelse:\n    print("Odd")'], testCases: [{ input: '4', expectedOutput: 'Even' }, { input: '7', expectedOutput: 'Odd' }, { input: '0', expectedOutput: 'Even' }] } },
            { id: 's3c1l5', type: 'quiz', title: 'If Statements Quiz', xp: 5, difficulty: 'easy', quiz: { question: 'What is the output?\nx = 5\nif x > 10:\n    print("big")\nelse:\n    print("small")', options: ['big', 'small', 'big small', 'Error'], correct: 1, explanation: 'x is 5, which is not > 10, so the else block runs and prints "small".' } }
          ]
        },
        {
          id: 's3c2',
          title: 'Elif Chains',
          lessons: [
            { id: 's3c2l1', type: 'theory', title: 'The elif Keyword', xp: 10, difficulty: 'easy', theory: { tldr: 'elif lets you check multiple conditions in sequence. Only the first True condition\'s block runs.', content: `Sometimes you need to check more than two possibilities. The \`elif\` (short for "else if") keyword lets you chain multiple conditions together.\n\nPython checks conditions from top to bottom. The **first** condition that's \`True\` has its block executed, and the rest are skipped. If no condition is \`True\`, the \`else\` block runs (if provided).`, codeExample: `score = 85\n\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelif score >= 70:\n    grade = "C"\nelif score >= 60:\n    grade = "D"\nelse:\n    grade = "F"\n\nprint(f"Grade: {grade}")  # Grade: B` }, quiz: { question: 'How many elif blocks can you have?', options: ['Only 1', 'Up to 3', 'Up to 10', 'As many as you need'], correct: 3, explanation: 'You can use as many elif blocks as needed. There is no limit.' } },
            { id: 's3c2l2', type: 'challenge', title: 'Grade Calculator', xp: 20, difficulty: 'medium', challenge: { description: 'Read a score (0-100) from input and print the grade:\n- 90+: `A`\n- 80-89: `B`\n- 70-79: `C`\n- 60-69: `D`\n- Below 60: `F`', starterCode: '# Calculate grade from score\n', hints: ['Use if/elif/else chain', 'Start with the highest grade first', 'Check score >= 90, then >= 80, etc.', 'score = int(input())\nif score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")\nelif score >= 70:\n    print("C")\nelif score >= 60:\n    print("D")\nelse:\n    print("F")'], testCases: [{ input: '95', expectedOutput: 'A' }, { input: '82', expectedOutput: 'B' }, { input: '55', expectedOutput: 'F' }] } },
            { id: 's3c2l3', type: 'quiz', title: 'Elif Quiz', xp: 5, difficulty: 'easy', quiz: { question: 'In an if-elif chain, how many blocks execute?', options: ['All True blocks', 'Only the first True block', 'Only the last True block', 'All blocks'], correct: 1, explanation: 'Only the FIRST True condition\'s block runs. The rest are skipped, even if they would also be True.' } }
          ]
        },
        {
          id: 's3c3',
          title: 'For Loops',
          lessons: [
            { id: 's3c3l1', type: 'theory', title: 'For Loop Basics', xp: 10, difficulty: 'easy', theory: { tldr: 'for loops iterate over sequences. Use range(n) to loop n times.', content: `A \`for\` loop lets you repeat a block of code for each item in a sequence (like a list, string, or range of numbers). It's the most common type of loop in Python.\n\nThe \`range()\` function generates a sequence of numbers, which is perfect for repeating something a specific number of times. \`range(5)\` generates numbers 0, 1, 2, 3, 4 (5 numbers starting from 0).`, codeExample: `# Loop through a range\nfor i in range(5):\n    print(i)  # Prints 0, 1, 2, 3, 4\n\n# Loop through a string\nfor char in "Python":\n    print(char)  # Prints each letter\n\n# Loop through a list\nfruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n    print(fruit)` }, quiz: { question: 'What does range(3) generate?', options: ['1, 2, 3', '0, 1, 2', '0, 1, 2, 3', '1, 2'], correct: 1, explanation: 'range(3) generates 0, 1, 2 — three numbers starting from 0.' } },
            { id: 's3c3l2', type: 'challenge', title: 'Print Numbers', xp: 20, difficulty: 'easy', challenge: { description: 'Read an integer n from input. Print all numbers from 1 to n (inclusive), each on a separate line.', starterCode: '# Print numbers from 1 to n\n', hints: ['Use range() in a for loop', 'range(1, n+1) gives numbers from 1 to n', 'Use for i in range(1, n+1): print(i)', 'n = int(input())\nfor i in range(1, n + 1):\n    print(i)'], testCases: [{ input: '5', expectedOutput: '1\n2\n3\n4\n5' }, { input: '3', expectedOutput: '1\n2\n3' }] } },
            { id: 's3c3l3', type: 'theory', title: 'The range() Function', xp: 10, difficulty: 'easy', theory: { tldr: 'range(start, stop, step) generates numbers from start to stop-1 with given step.', content: `\`range()\` is incredibly flexible with up to 3 arguments:\n\n- \`range(stop)\`: 0 to stop-1\n- \`range(start, stop)\`: start to stop-1\n- \`range(start, stop, step)\`: start to stop-1, jumping by step\n\nYou can even count backwards with a negative step!`, codeExample: `# range(stop)\nfor i in range(3):       # 0, 1, 2\n    print(i)\n\n# range(start, stop)\nfor i in range(2, 6):    # 2, 3, 4, 5\n    print(i)\n\n# range(start, stop, step)\nfor i in range(0, 10, 2): # 0, 2, 4, 6, 8\n    print(i)\n\n# Counting backwards\nfor i in range(5, 0, -1): # 5, 4, 3, 2, 1\n    print(i)` }, quiz: { question: 'What does range(2, 8, 3) generate?', options: ['2, 5, 8', '2, 5', '2, 3, 5, 8', '3, 6'], correct: 1, explanation: 'Starting from 2, adding 3 each time: 2, 5. The next would be 8, but range stops BEFORE the stop value.' } },
            { id: 's3c3l4', type: 'challenge', title: 'Sum of Numbers', xp: 20, difficulty: 'medium', challenge: { description: 'Read an integer n from input. Calculate and print the sum of all numbers from 1 to n.', starterCode: '# Calculate sum from 1 to n\n', hints: ['Create a variable total = 0', 'Use a for loop to add each number', 'total += i inside the loop', 'n = int(input())\ntotal = 0\nfor i in range(1, n + 1):\n    total += i\nprint(total)'], testCases: [{ input: '5', expectedOutput: '15' }, { input: '10', expectedOutput: '55' }, { input: '1', expectedOutput: '1' }] } },
            { id: 's3c3l5', type: 'quiz', title: 'For Loops Quiz', xp: 5, difficulty: 'easy', quiz: { question: 'How many times does "for i in range(4):" loop?', options: ['3', '4', '5', 'Infinite'], correct: 1, explanation: 'range(4) produces 4 values (0, 1, 2, 3), so the loop runs 4 times.' } }
          ]
        },
        {
          id: 's3c4',
          title: 'While Loops',
          lessons: [
            { id: 's3c4l1', type: 'theory', title: 'While Loop Basics', xp: 10, difficulty: 'easy', theory: { tldr: 'while loops repeat as long as a condition is True. Make sure the condition eventually becomes False!', content: `A \`while\` loop keeps repeating its block of code as long as its condition remains \`True\`. Unlike \`for\` loops that iterate a known number of times, \`while\` loops are great when you don't know in advance how many times you need to loop.\n\n**Important:** You must make sure the condition eventually becomes \`False\`, otherwise you'll create an **infinite loop** that never stops!`, codeExample: `count = 0\nwhile count < 5:\n    print(count)\n    count += 1    # Don't forget this!\n# Output: 0, 1, 2, 3, 4\n\n# Counting down\nn = 3\nwhile n > 0:\n    print(n)\n    n -= 1\nprint("Go!")` }, quiz: { question: 'When does a while loop stop?', options: ['After 10 iterations', 'When the condition becomes False', 'When break is called', 'When the program ends'], correct: 1, explanation: 'A while loop continues as long as its condition is True, and stops when the condition becomes False.' } },
            { id: 's3c4l2', type: 'challenge', title: 'Countdown', xp: 20, difficulty: 'easy', challenge: { description: 'Read a number n from input. Print a countdown from n to 1, then print `Go!`.', starterCode: '# Countdown from n to 1, then Go!\n', hints: ['Use a while loop with n > 0', 'Print n, then decrease n by 1', 'After the loop, print "Go!"', 'n = int(input())\nwhile n > 0:\n    print(n)\n    n -= 1\nprint("Go!")'], testCases: [{ input: '3', expectedOutput: '3\n2\n1\nGo!' }, { input: '5', expectedOutput: '5\n4\n3\n2\n1\nGo!' }] } },
            { id: 's3c4l3', type: 'quiz', title: 'While Loops Quiz', xp: 5, difficulty: 'easy', quiz: { question: 'What causes an infinite loop?', options: ['Using while True', 'A condition that never becomes False', 'Forgetting the else clause', 'Both A and B'], correct: 3, explanation: 'Both "while True" and a condition that never becomes False create infinite loops. They run forever unless break is used.' } }
          ]
        },
        {
          id: 's3c5',
          title: 'Break & Continue',
          lessons: [
            { id: 's3c5l1', type: 'theory', title: 'Break Statement', xp: 10, difficulty: 'easy', theory: { tldr: 'break immediately exits the current loop. Useful for stopping when a condition is met.', content: `The \`break\` statement immediately **exits** the loop, even if the loop condition is still \`True\` or there are more items to iterate over. It's commonly used to stop a loop early when you've found what you're looking for.\n\n\`break\` only exits the **innermost** loop — if you have nested loops, it only breaks out of the one it's directly inside.`, codeExample: `# Find the first number divisible by 7\nfor i in range(1, 100):\n    if i % 7 == 0:\n        print(f"Found it: {i}")\n        break  # Stop the loop\n# Output: Found it: 7\n\n# Exit a while loop\nwhile True:\n    text = input("Type 'quit' to exit: ")\n    if text == "quit":\n        break\nprint("Goodbye!")` }, quiz: { question: 'What does break do?', options: ['Skips the current iteration', 'Exits the loop immediately', 'Ends the program', 'Pauses the loop'], correct: 1, explanation: 'break immediately exits the current loop and continues with the code after the loop.' } },
            { id: 's3c5l2', type: 'theory', title: 'Continue Statement', xp: 10, difficulty: 'easy', theory: { tldr: 'continue skips the rest of the current iteration and moves to the next one.', content: `The \`continue\` statement skips the **rest of the current iteration** and jumps to the next one. Unlike \`break\`, it doesn't exit the loop — it just skips ahead.\n\nThis is useful when you want to skip certain values but keep the loop going.`, codeExample: `# Print only odd numbers\nfor i in range(10):\n    if i % 2 == 0:\n        continue  # Skip even numbers\n    print(i)\n# Output: 1, 3, 5, 7, 9` }, quiz: { question: 'What does continue do?', options: ['Exits the loop', 'Skips to the next iteration', 'Repeats the current iteration', 'Stops the program'], correct: 1, explanation: 'continue skips the rest of the current iteration and moves to the next iteration of the loop.' } },
            { id: 's3c5l3', type: 'challenge', title: 'Find First Even', xp: 20, difficulty: 'medium', challenge: { description: 'Read integers from input until you get a 0. Print the first even number you find. If no even number is found, print `No even number`.', starterCode: '# Find first even number from input\n', hints: ['Use a while loop to read numbers', 'Check if each number is even with % 2 == 0', 'Use break when you find an even number', 'found = False\nwhile True:\n    n = int(input())\n    if n == 0:\n        break\n    if n % 2 == 0:\n        print(n)\n        found = True\n        break\nif not found:\n    print("No even number")'], testCases: [{ input: '3\n5\n4\n0', expectedOutput: '4' }, { input: '1\n3\n0', expectedOutput: 'No even number' }] } },
            { id: 's3c5l4', type: 'quiz', title: 'Break & Continue Quiz', xp: 5, difficulty: 'easy', quiz: { question: 'In a nested loop, which loop does break exit?', options: ['All loops', 'The outermost loop', 'The innermost loop', 'It depends'], correct: 2, explanation: 'break only exits the innermost loop that contains it. Outer loops continue running.' } }
          ]
        }
      ]
    },

    // =============================================
    // SECTION 4: DATA STRUCTURES
    // =============================================
    {
      id: 's4',
      title: 'Data Structures',
      icon: 'package',
      description: 'Master lists, tuples, dictionaries, sets, and string methods',
      chapters: [
        {
          id: 's4c1',
          title: 'Lists',
          lessons: [
            { id: 's4c1l1', type: 'theory', title: 'List Basics', xp: 10, difficulty: 'easy', theory: { tldr: 'Lists store multiple items in order. Create with []. Access items by index (0-based).', content: `A list is an **ordered collection** of items. Lists can contain any type of data, and items can be added, removed, or changed.\n\nCreate a list with square brackets \`[]\`, and access items using their **index** (position), starting from 0. You can also use negative indices: \`-1\` is the last item, \`-2\` is second-to-last, etc.`, codeExample: `fruits = ["apple", "banana", "cherry"]\nprint(fruits[0])     # apple (first item)\nprint(fruits[-1])    # cherry (last item)\nprint(len(fruits))   # 3 (number of items)\n\nnumbers = [1, 2, 3, 4, 5]\nmixed = [1, "hello", True, 3.14]  # Mixed types OK` }, quiz: { question: 'What is the index of the first item in a list?', options: ['1', '0', '-1', 'first'], correct: 1, explanation: 'Python uses 0-based indexing. The first item is at index 0.' } },
            { id: 's4c1l2', type: 'challenge', title: 'Create Lists', xp: 20, difficulty: 'easy', challenge: { description: 'Create a list called `colors` containing `"red"`, `"green"`, `"blue"`. Print the second item.', starterCode: '# Create list and print second item\n', hints: ['Create with square brackets', 'The second item is at index 1', 'colors = ["red", "green", "blue"]', 'colors = ["red", "green", "blue"]\nprint(colors[1])'], testCases: [{ input: '', expectedOutput: 'green' }] } },
            { id: 's4c1l3', type: 'theory', title: 'List Methods', xp: 10, difficulty: 'easy', theory: { tldr: 'Lists have methods: append(), insert(), remove(), pop(), sort(), reverse().', content: `Lists come with powerful built-in methods:\n\n- \`append(item)\`: Add item to end\n- \`insert(idx, item)\`: Insert at position\n- \`remove(item)\`: Remove first occurrence\n- \`pop(idx)\`: Remove and return item at index\n- \`sort()\`: Sort in place\n- \`reverse()\`: Reverse in place\n- \`index(item)\`: Find position of item\n- \`count(item)\`: Count occurrences`, codeExample: `nums = [3, 1, 4, 1, 5]\nnums.append(9)      # [3, 1, 4, 1, 5, 9]\nnums.sort()          # [1, 1, 3, 4, 5, 9]\nnums.reverse()       # [9, 5, 4, 3, 1, 1]\nnums.pop()           # Removes last → [9, 5, 4, 3, 1]\nprint(nums)` }, quiz: { question: 'Which method adds an item to the END of a list?', options: ['add()', 'append()', 'insert()', 'push()'], correct: 1, explanation: 'append() adds an item to the end of a list. insert() lets you choose the position.' } },
            { id: 's4c1l4', type: 'challenge', title: 'List Operations', xp: 20, difficulty: 'medium', challenge: { description: 'Start with the list `[5, 3, 8, 1, 9]`. Sort it, then print the sorted list.', starterCode: '# Sort the list and print\n', hints: ['Create the list', 'Use the .sort() method', 'sort() modifies the list in place', 'nums = [5, 3, 8, 1, 9]\nnums.sort()\nprint(nums)'], testCases: [{ input: '', expectedOutput: '[1, 3, 5, 8, 9]' }] } },
            { id: 's4c1l5', type: 'theory', title: 'List Slicing', xp: 10, difficulty: 'medium', theory: { tldr: 'Slicing extracts a portion: list[start:stop:step]. Doesn\'t include stop index.', content: `Slicing lets you extract a portion of a list using the syntax \`list[start:stop:step]\`. The \`stop\` index is **exclusive** (not included).\n\nYou can omit any part: \`list[:3]\` gets the first 3, \`list[2:]\` gets from index 2 to end, \`list[:]\` copies the whole list.`, codeExample: `nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\nprint(nums[2:5])    # [2, 3, 4]\nprint(nums[:3])     # [0, 1, 2]\nprint(nums[7:])     # [7, 8, 9]\nprint(nums[::2])    # [0, 2, 4, 6, 8] (every 2nd)\nprint(nums[::-1])   # [9, 8, 7, ...] (reversed)` }, quiz: { question: 'What does [1,2,3,4,5][1:4] return?', options: ['[1, 2, 3, 4]', '[2, 3, 4]', '[2, 3, 4, 5]', '[1, 2, 3]'], correct: 1, explanation: 'Slicing [1:4] starts at index 1 and goes up to (but not including) index 4: [2, 3, 4].' } },
            { id: 's4c1l6', type: 'challenge', title: 'Slice a List', xp: 20, difficulty: 'medium', challenge: { description: 'Given `nums = [10, 20, 30, 40, 50, 60, 70]`, print the middle 3 elements (30, 40, 50).', starterCode: 'nums = [10, 20, 30, 40, 50, 60, 70]\n# Print middle 3 elements\n', hints: ['Use slicing with start and stop', '30 is at index 2, 50 is at index 4', 'Slice is nums[2:5]', 'nums = [10, 20, 30, 40, 50, 60, 70]\nprint(nums[2:5])'], testCases: [{ input: '', expectedOutput: '[30, 40, 50]' }] } },
            { id: 's4c1l7', type: 'quiz', title: 'Lists Quiz', xp: 5, difficulty: 'easy', quiz: { question: 'Are Python lists mutable (changeable)?', options: ['Yes', 'No', 'Only with numbers', 'Only with strings'], correct: 0, explanation: 'Lists are mutable — you can add, remove, and change items after creation.' } }
          ]
        },
        {
          id: 's4c2',
          title: 'Tuples',
          lessons: [
            { id: 's4c2l1', type: 'theory', title: 'Tuple Basics', xp: 10, difficulty: 'easy', theory: { tldr: 'Tuples are like lists but immutable (can\'t be changed). Create with (). Good for fixed data.', content: `Tuples are ordered collections like lists, but they're **immutable** — once created, you cannot add, remove, or change items. Create them with parentheses \`()\` or just commas.\n\nUse tuples when you want data that shouldn't change, like coordinates, RGB colors, or database records. They're also slightly faster and use less memory than lists.`, codeExample: `# Creating tuples\npoint = (3, 7)\ncolors = ("red", "green", "blue")\nsingle = (42,)   # Note the comma for single-item tuple\n\n# Accessing items\nprint(point[0])      # 3\nprint(colors[-1])    # blue\n\n# Tuple unpacking\nx, y = point\nprint(f"x={x}, y={y}")  # x=3, y=7` }, quiz: { question: 'Can you modify a tuple after creation?', options: ['Yes', 'No', 'Only append', 'Only with special methods'], correct: 1, explanation: 'Tuples are immutable. Once created, their contents cannot be changed.' } },
            { id: 's4c2l2', type: 'challenge', title: 'Create Tuples', xp: 20, difficulty: 'easy', challenge: { description: 'Create a tuple `dimensions` with values `(1920, 1080)`. Print each value on a separate line using tuple unpacking.', starterCode: '# Create dimensions tuple and unpack\n', hints: ['Create with parentheses: (1920, 1080)', 'Unpack with: width, height = dimensions', 'Print each variable', 'dimensions = (1920, 1080)\nwidth, height = dimensions\nprint(width)\nprint(height)'], testCases: [{ input: '', expectedOutput: '1920\n1080' }] } },
            { id: 's4c2l3', type: 'quiz', title: 'Tuples Quiz', xp: 5, difficulty: 'easy', quiz: { question: 'Which creates a single-item tuple?', options: ['(42)', '(42,)', '[42]', '{42}'], correct: 1, explanation: 'A single-item tuple requires a trailing comma: (42,). Without it, (42) is just the number 42 in parentheses.' } }
          ]
        },
        {
          id: 's4c3',
          title: 'Dictionaries',
          lessons: [
            { id: 's4c3l1', type: 'theory', title: 'Dictionary Basics', xp: 10, difficulty: 'medium', theory: { tldr: 'Dictionaries store key-value pairs. Access values by key, not by index. Create with {}.', content: `Dictionaries store data as **key-value pairs**, like a real dictionary where words (keys) map to definitions (values). Keys must be unique and immutable (strings, numbers, tuples).\n\nCreate with curly braces \`{}\` and access values using their key in square brackets. Dictionaries are incredibly useful for structured data.`, codeExample: `student = {\n    "name": "Alice",\n    "age": 20,\n    "grade": "A"\n}\n\nprint(student["name"])    # Alice\nstudent["age"] = 21       # Update value\nstudent["email"] = "a@b"  # Add new key\nprint(student)` }, quiz: { question: 'How do you access the value for key "name" in dict d?', options: ['d.name', 'd["name"]', 'd(name)', 'd[0]'], correct: 1, explanation: 'Use square brackets with the key: d["name"]. Dictionaries use keys, not numeric indices.' } },
            { id: 's4c3l2', type: 'challenge', title: 'Create a Dictionary', xp: 20, difficulty: 'medium', challenge: { description: 'Create a dictionary `person` with keys `"name"` (value `"Alice"`) and `"age"` (value `25`). Print the name.', starterCode: '# Create dictionary and print name\n', hints: ['Use curly braces with key: value pairs', 'person = {"name": "Alice", "age": 25}', 'Access with person["name"]', 'person = {"name": "Alice", "age": 25}\nprint(person["name"])'], testCases: [{ input: '', expectedOutput: 'Alice' }] } },
            { id: 's4c3l3', type: 'theory', title: 'Dictionary Methods', xp: 10, difficulty: 'medium', theory: { tldr: 'Key methods: .keys(), .values(), .items(), .get(), .update(), .pop()', content: `Dictionaries have useful methods:\n\n- \`.keys()\`: Returns all keys\n- \`.values()\`: Returns all values\n- \`.items()\`: Returns key-value pairs as tuples\n- \`.get(key, default)\`: Safe access (returns default if key missing)\n- \`.update(dict)\`: Merge another dictionary\n- \`.pop(key)\`: Remove and return a value`, codeExample: `d = {"a": 1, "b": 2, "c": 3}\n\nprint(list(d.keys()))    # ['a', 'b', 'c']\nprint(list(d.values()))  # [1, 2, 3]\n\n# Safe access with .get()\nprint(d.get("z", 0))    # 0 (default)\n\n# Iterate\nfor key, value in d.items():\n    print(f"{key}: {value}")` }, quiz: { question: 'What does .get("missing", 0) return if the key doesn\'t exist?', options: ['None', 'Error', '0', 'False'], correct: 2, explanation: '.get() returns the default value (0) when the key is not found, instead of raising an error.' } },
            { id: 's4c3l4', type: 'challenge', title: 'Student Records', xp: 20, difficulty: 'medium', challenge: { description: 'Create a dictionary with these student grades: `"Math": 90`, `"Science": 85`, `"English": 92`. Print the average grade.', starterCode: '# Create grades dict and calculate average\n', hints: ['Create the dictionary with 3 key-value pairs', 'Use .values() to get all grades', 'Calculate average: sum(values) / len(values)', 'grades = {"Math": 90, "Science": 85, "English": 92}\navg = sum(grades.values()) / len(grades)\nprint(avg)'], testCases: [{ input: '', expectedOutput: '89.0' }] } },
            { id: 's4c3l5', type: 'quiz', title: 'Dictionaries Quiz', xp: 5, difficulty: 'medium', quiz: { question: 'What happens if you access a non-existent key with d["missing"]?', options: ['Returns None', 'Returns 0', 'KeyError', 'Returns empty string'], correct: 2, explanation: 'Accessing a missing key with [] raises a KeyError. Use .get() for safe access.' } }
          ]
        },
        {
          id: 's4c4',
          title: 'Sets',
          lessons: [
            { id: 's4c4l1', type: 'theory', title: 'Set Basics', xp: 10, difficulty: 'medium', theory: { tldr: 'Sets store unique, unordered items. Duplicates are automatically removed. Create with {} or set().', content: `Sets are collections of **unique items** with no defined order. If you add a duplicate, it's simply ignored. Sets are great for removing duplicates, membership testing, and mathematical set operations.\n\nCreate with curly braces \`{}\` (but use \`set()\` for an empty set, since \`{}\` creates an empty dict).`, codeExample: `numbers = {1, 2, 3, 2, 1}  # Duplicates removed\nprint(numbers)              # {1, 2, 3}\n\n# Check membership (very fast!)\nprint(3 in numbers)         # True\nprint(5 in numbers)         # False\n\nnumbers.add(4)              # Add item\nnumbers.remove(1)           # Remove item\nprint(numbers)              # {2, 3, 4}` }, quiz: { question: 'What is {1, 2, 2, 3, 3, 3}?', options: ['{1, 2, 2, 3, 3, 3}', '{1, 2, 3}', '[1, 2, 3]', 'Error'], correct: 1, explanation: 'Sets automatically remove duplicates, so {1, 2, 2, 3, 3, 3} becomes {1, 2, 3}.' } },
            { id: 's4c4l2', type: 'challenge', title: 'Unique Items', xp: 20, difficulty: 'medium', challenge: { description: 'Given the list `[1, 2, 2, 3, 3, 3, 4, 4, 4, 4]`, convert it to a set and print the number of unique items.', starterCode: 'nums = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]\n# Find unique count\n', hints: ['Convert to set: set(nums)', 'Use len() to count items', 'unique = set(nums)', 'nums = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]\nprint(len(set(nums)))'], testCases: [{ input: '', expectedOutput: '4' }] } },
            { id: 's4c4l3', type: 'quiz', title: 'Sets Quiz', xp: 5, difficulty: 'medium', quiz: { question: 'How do you create an empty set?', options: ['{}', 'set()', '[]', 'set{}'], correct: 1, explanation: '{} creates an empty dictionary, not a set. Use set() for an empty set.' } }
          ]
        },
        {
          id: 's4c5',
          title: 'String Methods',
          lessons: [
            { id: 's4c5l1', type: 'theory', title: 'String Methods', xp: 10, difficulty: 'medium', theory: { tldr: 'Strings have methods: .upper(), .lower(), .strip(), .split(), .join(), .replace(), .find(), .startswith()', content: `Strings come with dozens of built-in methods. They always return a **new string** (strings are immutable). Key methods include:\n\n- \`.upper()\` / \`.lower()\`: Change case\n- \`.strip()\`: Remove whitespace\n- \`.split(sep)\`: Split into list\n- \`.join(list)\`: Join list into string\n- \`.replace(old, new)\`: Replace text\n- \`.find(sub)\`: Find position (-1 if not found)\n- \`.startswith()\` / \`.endswith()\`: Check prefix/suffix`, codeExample: `text = "  Hello, World!  "\nprint(text.strip())        # "Hello, World!"\nprint(text.upper())        # "  HELLO, WORLD!  "\n\nwords = "one,two,three".split(",")\nprint(words)               # ['one', 'two', 'three']\n\njoined = " - ".join(words)\nprint(joined)              # "one - two - three"\n\nprint("hello".replace("l", "L"))  # "heLLo"` }, quiz: { question: 'Does .upper() modify the original string?', options: ['Yes', 'No, it returns a new string', 'Only if assigned back', 'It depends'], correct: 1, explanation: 'Strings are immutable. .upper() returns a NEW string — the original is unchanged.' } },
            { id: 's4c5l2', type: 'challenge', title: 'String Manipulation', xp: 20, difficulty: 'medium', challenge: { description: 'Read a string from input. Print it in all uppercase.', starterCode: '# Read string and print uppercase\n', hints: ['Use input() to read', 'Use the .upper() method', 'Print the result', 'text = input()\nprint(text.upper())'], testCases: [{ input: 'hello world', expectedOutput: 'HELLO WORLD' }, { input: 'Python', expectedOutput: 'PYTHON' }] } },
            { id: 's4c5l3', type: 'theory', title: 'F-Strings Advanced', xp: 10, difficulty: 'medium', theory: { tldr: 'F-strings support formatting: {value:.2f} for decimals, {value:>10} for alignment, {value:,} for thousands.', content: `F-strings have powerful formatting capabilities using format specifiers after a colon:\n\n- \`{num:.2f}\`: Float with 2 decimal places\n- \`{text:>10}\`: Right-align in 10 chars\n- \`{text:<10}\`: Left-align in 10 chars\n- \`{text:^10}\`: Center in 10 chars\n- \`{num:,}\`: Number with comma separator\n- \`{num:05d}\`: Zero-padded to 5 digits`, codeExample: 'pi = 3.14159265\nprint(f"Pi: {pi:.2f}")         # Pi: 3.14\nprint(f"Pi: {pi:.4f}")         # Pi: 3.1416\n\nprice = 1234567\nprint(f"${price:,}")           # $1,234,567\n\nname = "Alice"\nprint(f"|{name:>10}|")        # |     Alice|\nprint(f"|{name:<10}|")        # |Alice     |\nprint(f"|{name:^10}|")        # |  Alice   |' }, quiz: { question: 'What does f"{3.14159:.2f}" output?', options: ['3.14159', '3.14', '3.1', '3'], correct: 1, explanation: ':.2f formats a float to 2 decimal places. 3.14159 becomes 3.14.' } },
            { id: 's4c5l4', type: 'challenge', title: 'Format Output', xp: 20, difficulty: 'medium', challenge: { description: 'Read a price (float) from input. Print it formatted as currency with 2 decimal places, like: `$XX.XX`', starterCode: '# Format as currency\n', hints: ['Read with float(input())', 'Use f-string: f"$" + "{price:.2f}"', 'The :.2f ensures 2 decimal places', 'price = float(input())\nprint(f"${price:.2f}")'], testCases: [{ input: '9.5', expectedOutput: '$9.50' }, { input: '1234.5', expectedOutput: '$1234.50' }] } },
            { id: 's4c5l5', type: 'quiz', title: 'String Methods Quiz', xp: 5, difficulty: 'medium', quiz: { question: 'What does "a,b,c".split(",") return?', options: ['"abc"', '["a", "b", "c"]', '("a", "b", "c")', '["a,b,c"]'], correct: 1, explanation: '.split(",") splits the string at each comma, returning a list of substrings.' } }
          ]
        }
      ]
    },

    // =============================================
    // SECTION 5: FUNCTIONS
    // =============================================
    {
      id: 's5',
      title: 'Functions',
      icon: 'settings',
      description: 'Learn to write reusable functions with parameters and return values',
      chapters: [
        {
          id: 's5c1',
          title: 'Defining Functions',
          lessons: [
            { id: 's5c1l1', type: 'theory', title: 'The def Keyword', xp: 10, difficulty: 'medium', theory: { tldr: 'Define functions with def name(): followed by indented code. Call with name().', content: `Functions are reusable blocks of code. Define a function once with \`def\`, then **call** it as many times as you want. Functions help you organize code, avoid repetition, and make programs easier to understand.\n\nThe syntax is: \`def function_name():\` followed by an indented block of code. To run the function, call it by name with parentheses.`, codeExample: `def greet():\n    print("Hello!")\n    print("Welcome to PyMaster!")\n\n# Call the function\ngreet()   # Prints both lines\ngreet()   # Call again — reusable!\n\ndef say_goodbye():\n    print("Goodbye! 👋")\n\nsay_goodbye()` }, quiz: { question: 'What keyword defines a function in Python?', options: ['function', 'func', 'def', 'define'], correct: 2, explanation: 'Python uses the def keyword to define functions.' } },
            { id: 's5c1l2', type: 'challenge', title: 'Create a Function', xp: 20, difficulty: 'medium', challenge: { description: 'Create a function called `welcome` that prints `Welcome to Python!`. Then call it.', starterCode: '# Define and call the function\n', hints: ['Use def welcome():', 'Put the print inside the function (indented)', 'Call it after defining: welcome()', 'def welcome():\n    print("Welcome to Python!")\n\nwelcome()'], testCases: [{ input: '', expectedOutput: 'Welcome to Python!' }] } },
            { id: 's5c1l3', type: 'theory', title: 'Parameters & Arguments', xp: 10, difficulty: 'medium', theory: { tldr: 'Parameters are variables in the function definition. Arguments are values you pass when calling.', content: `Functions become powerful when they accept **parameters** — input values that the function can use. Define parameters in the parentheses, then pass **arguments** when calling.\n\nYou can have multiple parameters, separated by commas.`, codeExample: `def greet(name):\n    print(f"Hello, {name}!")\n\ngreet("Alice")    # Hello, Alice!\ngreet("Bob")      # Hello, Bob!\n\ndef add(a, b):\n    print(a + b)\n\nadd(3, 5)         # 8\nadd(10, 20)       # 30` }, quiz: { question: 'In def greet(name), what is "name"?', options: ['An argument', 'A parameter', 'A variable', 'A keyword'], correct: 1, explanation: 'In the function definition, "name" is a parameter. When you call greet("Alice"), "Alice" is the argument.' } },
            { id: 's5c1l4', type: 'challenge', title: 'Add Function', xp: 20, difficulty: 'medium', challenge: { description: 'Create a function `add` that takes two parameters and prints their sum. Read two numbers from input and call the function.', starterCode: '# Create add function and call it\n', hints: ['Define: def add(a, b):', 'Print a + b inside the function', 'Read two numbers with int(input())', 'def add(a, b):\n    print(a + b)\n\na = int(input())\nb = int(input())\nadd(a, b)'], testCases: [{ input: '3\n5', expectedOutput: '8' }, { input: '10\n20', expectedOutput: '30' }] } },
            { id: 's5c1l5', type: 'quiz', title: 'Functions Quiz', xp: 5, difficulty: 'medium', quiz: { question: 'What happens if you call a function before defining it?', options: ['It works fine', 'NameError', 'SyntaxError', 'It prints None'], correct: 1, explanation: 'Python reads code top to bottom. If you call a function before it\'s defined, you get a NameError.' } }
          ]
        },
        {
          id: 's5c2',
          title: 'Return Values',
          lessons: [
            { id: 's5c2l1', type: 'theory', title: 'The return Statement', xp: 10, difficulty: 'medium', theory: { tldr: 'return sends a value back from a function. Without return, functions return None.', content: `The \`return\` statement sends a value back to the code that called the function. This is essential when you want to **use the result** of a function in other calculations or assignments.\n\nA function without \`return\` (or with just \`return\` with no value) returns \`None\`.`, codeExample: `def add(a, b):\n    return a + b\n\nresult = add(3, 5)\nprint(result)        # 8\nprint(add(10, 20))   # 30\n\n# Use in expressions\ntotal = add(1, 2) + add(3, 4)\nprint(total)         # 10` }, quiz: { question: 'What does a function return if it has no return statement?', options: ['0', 'False', 'None', 'Error'], correct: 2, explanation: 'Functions without a return statement (or with bare return) automatically return None.' } },
            { id: 's5c2l2', type: 'challenge', title: 'Calculate Area', xp: 20, difficulty: 'medium', challenge: { description: 'Create a function `rectangle_area(width, height)` that returns the area. Read width and height from input and print the result.', starterCode: '# Create function and calculate\n', hints: ['return width * height', 'Don\'t print inside the function, return instead', 'Call the function and print the result', 'def rectangle_area(width, height):\n    return width * height\n\nw = int(input())\nh = int(input())\nprint(rectangle_area(w, h))'], testCases: [{ input: '5\n10', expectedOutput: '50' }, { input: '3\n7', expectedOutput: '21' }] } },
            { id: 's5c2l3', type: 'quiz', title: 'Return Values Quiz', xp: 5, difficulty: 'medium', quiz: { question: 'Can a function have multiple return statements?', options: ['No', 'Yes, but only the first one runs', 'Yes, in different if/else branches', 'Only in Python 3'], correct: 2, explanation: 'A function can have multiple return statements in different branches (if/elif/else). Only one executes per call.' } }
          ]
        },
        {
          id: 's5c3',
          title: 'Advanced Parameters',
          lessons: [
            { id: 's5c3l1', type: 'theory', title: 'Default Parameters', xp: 10, difficulty: 'medium', theory: { tldr: 'Default parameters have fallback values. Called without that argument, the default is used.', content: `You can give parameters **default values**. If the caller doesn't provide that argument, the default is used. Parameters with defaults must come **after** parameters without defaults.`, codeExample: `def greet(name, greeting="Hello"):\n    print(f"{greeting}, {name}!")\n\ngreet("Alice")              # Hello, Alice!\ngreet("Bob", "Hi")          # Hi, Bob!\ngreet("Charlie", "Hey")     # Hey, Charlie!` }, quiz: { question: 'Where must default parameters be placed?', options: ['First', 'Last', 'Anywhere', 'Middle'], correct: 1, explanation: 'Parameters with default values must come after parameters without defaults.' } },
            { id: 's5c3l2', type: 'challenge', title: 'Greet Function', xp: 20, difficulty: 'medium', challenge: { description: 'Create a function `greet(name, greeting="Hello")` that prints `{greeting}, {name}!`. Call it with just a name from input.', starterCode: '# Create greet function\n', hints: ['Use a default parameter for greeting', 'f-string: f"{greeting}, {name}!"', 'Read name with input()', 'def greet(name, greeting="Hello"):\n    print(f"{greeting}, {name}!")\n\nname = input()\ngreet(name)'], testCases: [{ input: 'Alice', expectedOutput: 'Hello, Alice!' }, { input: 'Bob', expectedOutput: 'Hello, Bob!' }] } },
            { id: 's5c3l3', type: 'theory', title: '*args and **kwargs', xp: 10, difficulty: 'hard', theory: { tldr: '*args captures extra positional arguments as a tuple. **kwargs captures extra keyword arguments as a dict.', content: `Sometimes you want a function that accepts a variable number of arguments:\n\n**\`*args\`**: Collects extra positional arguments into a **tuple**.\n**\`**kwargs\`**: Collects extra keyword arguments into a **dictionary**.\n\nThese are incredibly useful for flexible functions.`, codeExample: `def total(*args):\n    print(sum(args))\n\ntotal(1, 2, 3)       # 6\ntotal(10, 20, 30, 40) # 100\n\ndef info(**kwargs):\n    for key, value in kwargs.items():\n        print(f"{key}: {value}")\n\ninfo(name="Alice", age=25)` }, quiz: { question: 'What type does *args collect into?', options: ['List', 'Tuple', 'Dict', 'Set'], correct: 1, explanation: '*args collects extra positional arguments into a tuple.' } },
            { id: 's5c3l4', type: 'challenge', title: 'Flexible Sum', xp: 20, difficulty: 'hard', challenge: { description: 'Create a function `total(*numbers)` that returns the sum of any number of arguments. Test it by printing total(1, 2, 3) and total(10, 20, 30, 40).', starterCode: '# Create flexible sum function\n', hints: ['Use *numbers to accept any number of args', 'Use sum() on the numbers tuple', 'Return the sum', 'def total(*numbers):\n    return sum(numbers)\n\nprint(total(1, 2, 3))\nprint(total(10, 20, 30, 40))'], testCases: [{ input: '', expectedOutput: '6\n100' }] } },
            { id: 's5c3l5', type: 'quiz', title: 'Advanced Params Quiz', xp: 5, difficulty: 'hard', quiz: { question: 'What type does **kwargs collect into?', options: ['Tuple', 'List', 'Dictionary', 'Set'], correct: 2, explanation: '**kwargs collects extra keyword arguments into a dictionary.' } }
          ]
        },
        {
          id: 's5c4',
          title: 'Lambda & Scope',
          lessons: [
            { id: 's5c4l1', type: 'theory', title: 'Lambda Functions', xp: 10, difficulty: 'hard', theory: { tldr: 'Lambda creates small anonymous functions in one line: lambda args: expression', content: `Lambda functions are small, anonymous (unnamed) functions defined in a single line. They're useful for short operations, especially when passing functions as arguments.\n\nSyntax: \`lambda arguments: expression\`. The expression is automatically returned.`, codeExample: `# Regular function\ndef double(x):\n    return x * 2\n\n# Same as lambda\ndouble = lambda x: x * 2\nprint(double(5))   # 10\n\n# Sorting with lambda\nnames = ["Charlie", "Alice", "Bob"]\nnames.sort(key=lambda x: len(x))\nprint(names)  # ['Bob', 'Alice', 'Charlie']` }, quiz: { question: 'What is a lambda function?', options: ['A named function', 'An anonymous one-line function', 'A class method', 'A built-in function'], correct: 1, explanation: 'Lambda creates small anonymous (unnamed) functions in a single expression.' } },
            { id: 's5c4l2', type: 'challenge', title: 'Lambda Sort', xp: 20, difficulty: 'hard', challenge: { description: 'Sort the list `["banana", "apple", "cherry", "date"]` alphabetically by the LAST letter of each word. Print the sorted list.', starterCode: '# Sort by last letter using lambda\n', hints: ['Use .sort() with a key parameter', 'The key should be a lambda that returns the last character', 'Last character: word[-1]', 'words = ["banana", "apple", "cherry", "date"]\nwords.sort(key=lambda w: w[-1])\nprint(words)'], testCases: [{ input: '', expectedOutput: "['banana', 'apple', 'date', 'cherry']" }] } },
            { id: 's5c4l3', type: 'theory', title: 'Variable Scope', xp: 10, difficulty: 'hard', theory: { tldr: 'Variables inside functions are local. Variables outside are global. Use global keyword to modify global vars.', content: `**Scope** determines where a variable can be accessed:\n\n- **Local scope**: Variables created inside a function exist only inside that function.\n- **Global scope**: Variables created outside functions can be read anywhere, but to **modify** them inside a function, use the \`global\` keyword.\n\nThis is important for avoiding bugs!`, codeExample: `x = 10  # Global variable\n\ndef change():\n    x = 5  # Local variable (different!)\n    print(f"Inside: {x}")  # 5\n\nchange()\nprint(f"Outside: {x}")    # 10 (unchanged!)\n\ndef change_global():\n    global x\n    x = 99\n\nchange_global()\nprint(f"After global: {x}")  # 99` }, quiz: { question: 'Can you read a global variable inside a function?', options: ['Yes, always', 'No, never', 'Only with global keyword', 'Only in Python 3'], correct: 0, explanation: 'You can read global variables inside functions. You only need the global keyword to MODIFY them.' } },
            { id: 's5c4l4', type: 'quiz', title: 'Scope Quiz', xp: 5, difficulty: 'hard', quiz: { question: 'What happens to a local variable after the function returns?', options: ['It becomes global', 'It is destroyed', 'It stays in memory', 'It becomes None'], correct: 1, explanation: 'Local variables are destroyed when the function returns. They only exist during function execution.' } }
          ]
        }
      ]
    },

    // =============================================
    // SECTIONS 6-10 (Compact format)
    // =============================================
    {
      id: 's6', title: 'Modules & File Handling', icon: 'file-code', description: 'Import modules and work with files',
      chapters: [
        { id: 's6c1', title: 'Importing Modules', lessons: [
          { id: 's6c1l1', type: 'theory', title: 'The import Statement', xp: 10, difficulty: 'medium', theory: { tldr: 'import loads external modules. import math gives access to math.sqrt(), math.pi, etc.', content: `Modules are files containing Python code that you can **reuse** in your programs. Python comes with a rich **standard library** of modules. Use \`import\` to load them.\n\nCommon modules include \`math\` (math functions), \`random\` (random numbers), \`datetime\` (dates/times), and \`os\` (operating system).`, codeExample: `import math\nprint(math.sqrt(16))    # 4.0\nprint(math.pi)          # 3.14159...\n\nimport random\nprint(random.randint(1, 10))  # Random 1-10\n\nfrom math import sqrt, pi\nprint(sqrt(25))         # 5.0 (no math. prefix)` }, quiz: { question: 'What does "from math import sqrt" do?', options: ['Imports the entire math module', 'Imports only the sqrt function', 'Creates a new function called sqrt', 'Renames the math module'], correct: 1, explanation: '"from math import sqrt" imports only the sqrt function, letting you use it without the math. prefix.' } },
          { id: 's6c1l2', type: 'challenge', title: 'Math Module', xp: 20, difficulty: 'medium', challenge: { description: 'Import the math module. Read a number from input and print its square root rounded to 2 decimal places.', starterCode: '# Import math and calculate square root\n', hints: ['import math', 'Use math.sqrt()', 'Round with round(value, 2)', 'import math\nn = int(input())\nprint(round(math.sqrt(n), 2))'], testCases: [{ input: '16', expectedOutput: '4.0' }, { input: '2', expectedOutput: '1.41' }] } },
          { id: 's6c1l3', type: 'quiz', title: 'Modules Quiz', xp: 5, difficulty: 'medium', quiz: { question: 'What does "import random as r" do?', options: ['Creates a copy of random', 'Gives random an alias "r"', 'Only imports the "r" function', 'Error'], correct: 1, explanation: '"as r" creates an alias. You can now use r.randint() instead of random.randint().' } }
        ]},
        { id: 's6c2', title: 'Error Handling', lessons: [
          { id: 's6c2l1', type: 'theory', title: 'Try and Except', xp: 10, difficulty: 'medium', theory: { tldr: 'try/except catches errors gracefully instead of crashing. Wrap risky code in try, handle errors in except.', content: `Errors happen — users enter wrong data, files don't exist, math goes wrong. Instead of letting your program **crash**, you can **catch** errors with \`try\`/\`except\`.\n\nPut risky code in the \`try\` block. If an error occurs, Python jumps to the \`except\` block instead of crashing.`, codeExample: `try:\n    num = int(input("Enter a number: "))\n    result = 100 / num\n    print(f"Result: {result}")\nexcept ValueError:\n    print("That's not a valid number!")\nexcept ZeroDivisionError:\n    print("Can't divide by zero!")\nexcept Exception as e:\n    print(f"Error: {e}")` }, quiz: { question: 'What happens if code in try raises an error?', options: ['Program crashes', 'The except block runs', 'The error is ignored', 'Python retries automatically'], correct: 1, explanation: 'When an error occurs in the try block, Python jumps to the matching except block.' } },
          { id: 's6c2l2', type: 'challenge', title: 'Safe Division', xp: 20, difficulty: 'medium', challenge: { description: 'Read two numbers from input. Divide the first by the second. If division by zero occurs, print `Cannot divide by zero`. Otherwise print the result.', starterCode: '# Safe division with error handling\n', hints: ['Wrap division in try/except', 'Catch ZeroDivisionError', 'Print the result in try block', 'a = int(input())\nb = int(input())\ntry:\n    print(a / b)\nexcept ZeroDivisionError:\n    print("Cannot divide by zero")'], testCases: [{ input: '10\n3', expectedOutput: '3.3333333333333335' }, { input: '10\n0', expectedOutput: 'Cannot divide by zero' }] } },
          { id: 's6c2l3', type: 'quiz', title: 'Error Handling Quiz', xp: 5, difficulty: 'medium', quiz: { question: 'Which catches ALL types of exceptions?', options: ['except ValueError:', 'except Error:', 'except Exception:', 'except:'], correct: 3, explanation: 'A bare "except:" without specifying a type catches all exceptions (though except Exception: is preferred).' } }
        ]}
      ]
    },
    {
      id: 's7', title: 'Object-Oriented Programming', icon: 'cpu', description: 'Master classes, objects, and OOP concepts',
      chapters: [
        { id: 's7c1', title: 'Classes & Objects', lessons: [
          { id: 's7c1l1', type: 'theory', title: 'Creating Classes', xp: 10, difficulty: 'medium', theory: { tldr: 'Classes are blueprints for objects. Define with class Name: and create objects with Name().', content: `A **class** is a blueprint for creating objects. Think of it like a cookie cutter — the class defines the shape, and each object (cookie) is an instance created from it.\n\nThe \`__init__\` method is a special **constructor** that runs when you create a new object. \`self\` refers to the current object instance.`, codeExample: `class Dog:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n    \n    def bark(self):\n        print(f"{self.name} says: Woof!")\n\n# Create objects\nmy_dog = Dog("Rex", 3)\nprint(my_dog.name)    # Rex\nmy_dog.bark()         # Rex says: Woof!` }, quiz: { question: 'What does __init__ do?', options: ['Deletes the object', 'Initializes a new object', 'Imports modules', 'Creates a copy'], correct: 1, explanation: '__init__ is the constructor method that initializes a new object when it\'s created.' } },
          { id: 's7c1l2', type: 'challenge', title: 'Create a Class', xp: 20, difficulty: 'medium', challenge: { description: 'Create a `Person` class with `name` and `age` attributes. Create a person with name from input and age 25. Print: `<name> is 25 years old`', starterCode: '# Create Person class\n', hints: ['Define class Person with __init__', 'self.name = name, self.age = age', 'Use f-string to print', 'class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\nname = input()\np = Person(name, 25)\nprint(f"{p.name} is {p.age} years old")'], testCases: [{ input: 'Alice', expectedOutput: 'Alice is 25 years old' }, { input: 'Bob', expectedOutput: 'Bob is 25 years old' }] } },
          { id: 's7c1l3', type: 'quiz', title: 'OOP Basics Quiz', xp: 5, difficulty: 'medium', quiz: { question: 'What does "self" represent in a method?', options: ['The class itself', 'The current object instance', 'The parent class', 'A global variable'], correct: 1, explanation: '"self" refers to the current object instance. It lets methods access the object\'s attributes.' } }
        ]},
        { id: 's7c2', title: 'Inheritance', lessons: [
          { id: 's7c2l1', type: 'theory', title: 'Inheritance Basics', xp: 10, difficulty: 'hard', theory: { tldr: 'Inheritance lets a class inherit attributes and methods from a parent class. Child extends parent.', content: `**Inheritance** lets you create a new class based on an existing one. The child class **inherits** all attributes and methods from the parent, and can add its own or **override** inherited ones.\n\nThis promotes code reuse and creates logical hierarchies (Animal → Dog, Cat).`, codeExample: `class Animal:\n    def __init__(self, name):\n        self.name = name\n    \n    def speak(self):\n        print(f"{self.name} makes a sound")\n\nclass Dog(Animal):  # Inherits from Animal\n    def speak(self):  # Override\n        print(f"{self.name} says: Woof!")\n\nclass Cat(Animal):\n    def speak(self):\n        print(f"{self.name} says: Meow!")\n\ndog = Dog("Rex")\ndog.speak()  # Rex says: Woof!` }, quiz: { question: 'How do you make Cat inherit from Animal?', options: ['class Cat(Animal):', 'class Cat extends Animal:', 'class Cat inherits Animal:', 'class Cat: Animal'], correct: 0, explanation: 'In Python, put the parent class in parentheses: class Cat(Animal):' } },
          { id: 's7c2l2', type: 'challenge', title: 'Animal Classes', xp: 20, difficulty: 'hard', challenge: { description: 'Create an `Animal` class with a `name` attribute. Create a `Dog` class that inherits from Animal and has a `bark()` method that prints `<name>: Woof!`. Create a dog named "Buddy" and call bark().', starterCode: '# Create Animal and Dog classes\n', hints: ['class Animal with __init__ setting self.name', 'class Dog(Animal) inherits from Animal', 'Dog needs a bark method using self.name', 'class Animal:\n    def __init__(self, name):\n        self.name = name\n\nclass Dog(Animal):\n    def bark(self):\n        print(f"{self.name}: Woof!")\n\ndog = Dog("Buddy")\ndog.bark()'], testCases: [{ input: '', expectedOutput: 'Buddy: Woof!' }] } },
          { id: 's7c2l3', type: 'quiz', title: 'Inheritance Quiz', xp: 5, difficulty: 'hard', quiz: { question: 'Can a child class override parent methods?', options: ['Yes', 'No', 'Only with @override', 'Only if parent allows it'], correct: 0, explanation: 'Child classes can freely override parent methods by defining a method with the same name.' } }
        ]}
      ]
    },
    {
      id: 's8', title: 'Advanced Python', icon: 'rocket', description: 'Decorators, generators, comprehensions, and more',
      chapters: [
        { id: 's8c1', title: 'List Comprehensions', lessons: [
          { id: 's8c1l1', type: 'theory', title: 'List Comprehensions', xp: 10, difficulty: 'hard', theory: { tldr: 'List comprehensions create lists in one line: [expression for item in iterable if condition]', content: `List comprehensions provide a concise way to create lists. Instead of a for loop with append, you can do it in one line!\n\nSyntax: \`[expression for item in iterable if condition]\`. The \`if\` part is optional.`, codeExample: `# Traditional way\nsquares = []\nfor x in range(5):\n    squares.append(x ** 2)\n\n# List comprehension\nsquares = [x ** 2 for x in range(5)]\nprint(squares)  # [0, 1, 4, 9, 16]\n\n# With condition\nevens = [x for x in range(10) if x % 2 == 0]\nprint(evens)    # [0, 2, 4, 6, 8]` }, quiz: { question: 'What does [x*2 for x in range(4)] produce?', options: ['[0, 2, 4, 6]', '[2, 4, 6, 8]', '[0, 1, 2, 3]', '[1, 2, 3, 4]'], correct: 0, explanation: 'range(4) gives 0,1,2,3. Multiplied by 2: 0,2,4,6.' } },
          { id: 's8c1l2', type: 'challenge', title: 'Comprehension Practice', xp: 20, difficulty: 'hard', challenge: { description: 'Use a list comprehension to create a list of squares of odd numbers from 1 to 10. Print the list.', starterCode: '# Create list of squares of odd numbers 1-10\n', hints: ['Use [x**2 for x in range(1, 11) if ...]', 'Odd check: x % 2 != 0', 'Combine: [x**2 for x in range(1,11) if x%2 != 0]', 'result = [x**2 for x in range(1, 11) if x % 2 != 0]\nprint(result)'], testCases: [{ input: '', expectedOutput: '[1, 9, 25, 49, 81]' }] } },
          { id: 's8c1l3', type: 'quiz', title: 'Comprehensions Quiz', xp: 5, difficulty: 'hard', quiz: { question: 'Can you use if/else in a list comprehension?', options: ['No', 'Yes, but syntax changes', 'Only if', 'Only else'], correct: 1, explanation: 'Yes! With if/else, the syntax changes: [x if condition else y for x in iterable] — the if/else goes BEFORE for.' } }
        ]},
        { id: 's8c2', title: 'Decorators', lessons: [
          { id: 's8c2l1', type: 'theory', title: 'Function Decorators', xp: 10, difficulty: 'hard', theory: { tldr: 'Decorators wrap functions with additional behavior using @decorator_name syntax.', content: `A **decorator** is a function that takes another function and extends its behavior without modifying it. Use the \`@decorator_name\` syntax above a function definition.\n\nDecorators are widely used in Python frameworks (Flask, Django) for routing, authentication, logging, etc.`, codeExample: `def uppercase(func):\n    def wrapper():\n        result = func()\n        return result.upper()\n    return wrapper\n\n@uppercase\ndef greet():\n    return "hello, world!"\n\nprint(greet())  # HELLO, WORLD!\n\n# Same as:\n# greet = uppercase(greet)` }, quiz: { question: 'What does @decorator do?', options: ['Deletes the function', 'Wraps the function with extra behavior', 'Makes the function private', 'Compiles the function'], correct: 1, explanation: '@decorator wraps the function, adding behavior before/after the original function runs.' } },
          { id: 's8c2l2', type: 'challenge', title: 'Create a Decorator', xp: 20, difficulty: 'hard', challenge: { description: 'Create a decorator `stars` that prints a line of `***` before and after the decorated function\'s output. Apply it to a function that prints `Hello!`.', starterCode: '# Create stars decorator\n', hints: ['def stars(func): that returns wrapper', 'wrapper prints ***, calls func(), prints ***', 'Use @stars above the function', 'def stars(func):\n    def wrapper():\n        print("***")\n        func()\n        print("***")\n    return wrapper\n\n@stars\ndef say_hello():\n    print("Hello!")\n\nsay_hello()'], testCases: [{ input: '', expectedOutput: '***\nHello!\n***' }] } },
          { id: 's8c2l3', type: 'quiz', title: 'Decorators Quiz', xp: 5, difficulty: 'hard', quiz: { question: '@my_decorator is equivalent to:', options: ['func = my_decorator()', 'func = my_decorator(func)', 'my_decorator = func()', 'func(my_decorator)'], correct: 1, explanation: '@my_decorator above def func() is equivalent to func = my_decorator(func).' } }
        ]},
        { id: 's8c3', title: 'Generators', lessons: [
          { id: 's8c3l1', type: 'theory', title: 'Generator Functions', xp: 10, difficulty: 'hard', theory: { tldr: 'Generators use yield instead of return. They produce values lazily, one at a time, saving memory.', content: `Generators are functions that use \`yield\` instead of \`return\`. They produce values **one at a time** (lazily), which is memory-efficient for large sequences.\n\nEach time you call \`next()\` or iterate, the generator resumes from where it left off.`, codeExample: `def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n\n# Use in a for loop\nfor num in countdown(5):\n    print(num)  # 5, 4, 3, 2, 1\n\n# Fibonacci generator\ndef fibonacci():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b` }, quiz: { question: 'What keyword makes a function a generator?', options: ['return', 'yield', 'generate', 'next'], correct: 1, explanation: 'The yield keyword turns a regular function into a generator function.' } },
          { id: 's8c3l2', type: 'challenge', title: 'Fibonacci Generator', xp: 20, difficulty: 'hard', challenge: { description: 'Create a generator function `fib(n)` that yields the first n Fibonacci numbers (starting with 0, 1, 1, 2, 3, 5...). Print them space-separated.', starterCode: '# Create Fibonacci generator\n', hints: ['Use yield inside a loop', 'Start with a, b = 0, 1', 'Each iteration: yield a, then a, b = b, a+b', 'def fib(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b\n\nprint(*fib(8))'], testCases: [{ input: '', expectedOutput: '0 1 1 2 3 5 8 13' }] } },
          { id: 's8c3l3', type: 'quiz', title: 'Generators Quiz', xp: 5, difficulty: 'hard', quiz: { question: 'What is the main advantage of generators?', options: ['Faster execution', 'Memory efficiency', 'Simpler syntax', 'Thread safety'], correct: 1, explanation: 'Generators produce values one at a time (lazy evaluation), using minimal memory even for huge sequences.' } }
        ]}
      ]
    },
    {
      id: 's9', title: 'Professional Python', icon: 'award', description: 'Regular expressions, collections, and datetime',
      chapters: [
        { id: 's9c1', title: 'Regular Expressions', lessons: [
          { id: 's9c1l1', type: 'theory', title: 'Regex Basics', xp: 10, difficulty: 'hard', theory: { tldr: 'Regular expressions (regex) find patterns in text. Use re module: re.search(), re.findall(), re.sub().', content: `Regular expressions are powerful tools for finding **patterns** in text. Python's \`re\` module provides regex support.\n\nCommon patterns:\n- \`\\d\`: Any digit (0-9)\n- \`\\w\`: Any word character (letter, digit, underscore)\n- \`.\`: Any character\n- \`*\`: Zero or more\n- \`+\`: One or more\n- \`[abc]\`: Any of a, b, or c`, codeExample: `import re\n\ntext = "My email is user@example.com"\n\n# Search for a pattern\nmatch = re.search(r'\\w+@\\w+\\.\\w+', text)\nif match:\n    print(match.group())  # user@example.com\n\n# Find all numbers\nnumbers = re.findall(r'\\d+', "I have 3 cats and 2 dogs")\nprint(numbers)  # ['3', '2']` }, quiz: { question: 'What does \\d match?', options: ['Any letter', 'Any digit', 'Any space', 'Any character'], correct: 1, explanation: '\\d matches any digit character (0-9).' } },
          { id: 's9c1l2', type: 'challenge', title: 'Find Numbers', xp: 20, difficulty: 'hard', challenge: { description: 'Read a string from input. Find and print all numbers in it, separated by spaces. Use re.findall().', starterCode: 'import re\n# Find all numbers in the string\n', hints: ['Use re.findall(r"\\d+", text)', 'Read input with input()', 'Join results with " ".join()', 'import re\ntext = input()\nnumbers = re.findall(r"\\d+", text)\nprint(" ".join(numbers))'], testCases: [{ input: 'I have 3 cats and 12 dogs', expectedOutput: '3 12' }, { input: 'Room 404 on floor 4', expectedOutput: '404 4' }] } },
          { id: 's9c1l3', type: 'quiz', title: 'Regex Quiz', xp: 5, difficulty: 'hard', quiz: { question: 'What does + mean in regex?', options: ['Literal plus sign', 'One or more of the previous', 'Zero or more', 'Exactly one'], correct: 1, explanation: '+ means "one or more" of the preceding pattern. \\d+ matches one or more digits.' } }
        ]},
        { id: 's9c2', title: 'Collections Module', lessons: [
          { id: 's9c2l1', type: 'theory', title: 'Counter', xp: 10, difficulty: 'hard', theory: { tldr: 'Counter counts occurrences of elements. Counter("hello") → {"l": 2, "h": 1, "e": 1, "o": 1}', content: `The \`collections\` module provides specialized container types. **Counter** is one of the most useful — it counts how many times each element appears.\n\nCounter works with any iterable: strings, lists, tuples, etc. It creates a dictionary-like object with elements as keys and counts as values.`, codeExample: `from collections import Counter\n\n# Count letters\nletters = Counter("mississippi")\nprint(letters)  # Counter({'s': 4, 'i': 4, 'p': 2, 'm': 1})\n\n# Most common\nprint(letters.most_common(2))  # [('s', 4), ('i', 4)]\n\n# Count list items\nfruits = ["apple", "banana", "apple", "cherry", "banana", "apple"]\nprint(Counter(fruits))` }, quiz: { question: 'What does Counter.most_common(1) return?', options: ['The most common element', 'A list with one (element, count) tuple', 'Just the count', 'The element name'], correct: 1, explanation: 'most_common(1) returns a list containing one tuple: [(element, count)] for the most frequent element.' } },
          { id: 's9c2l2', type: 'challenge', title: 'Word Counter', xp: 20, difficulty: 'hard', challenge: { description: 'Read a sentence from input. Count how many times each word appears and print the most common word and its count in format: `word count`', starterCode: 'from collections import Counter\n# Count words\n', hints: ['Split the sentence into words with .split()', 'Use Counter on the words list', 'Use .most_common(1) to get the top word', 'from collections import Counter\ntext = input()\nwords = Counter(text.split())\nword, count = words.most_common(1)[0]\nprint(word, count)'], testCases: [{ input: 'the cat sat on the mat the', expectedOutput: 'the 3' }, { input: 'hello world hello', expectedOutput: 'hello 2' }] } },
          { id: 's9c2l3', type: 'quiz', title: 'Collections Quiz', xp: 5, difficulty: 'hard', quiz: { question: 'Which collections type sets a default value for missing keys?', options: ['Counter', 'defaultdict', 'OrderedDict', 'deque'], correct: 1, explanation: 'defaultdict automatically provides a default value for keys that don\'t exist, avoiding KeyError.' } }
        ]},
        { id: 's9c3', title: 'Working with Dates', lessons: [
          { id: 's9c3l1', type: 'theory', title: 'The datetime Module', xp: 10, difficulty: 'hard', theory: { tldr: 'datetime module handles dates and times. datetime.now() gets current time. timedelta for date math.', content: `The \`datetime\` module is Python's tool for working with dates and times. You can get the current date/time, create specific dates, format them as strings, and do date arithmetic with \`timedelta\`.`, codeExample: `from datetime import datetime, timedelta\n\n# Current date and time\nnow = datetime.now()\nprint(now)  # 2024-01-15 14:30:45.123456\n\n# Create a specific date\nbirthday = datetime(2000, 5, 15)\nprint(birthday)  # 2000-05-15 00:00:00\n\n# Date arithmetic\ntomorrow = now + timedelta(days=1)\nnext_week = now + timedelta(weeks=1)\n\n# Formatting\nprint(now.strftime("%Y-%m-%d"))    # 2024-01-15\nprint(now.strftime("%B %d, %Y"))   # January 15, 2024` }, quiz: { question: 'What does timedelta represent?', options: ['A point in time', 'A duration/difference', 'A timezone', 'A timestamp'], correct: 1, explanation: 'timedelta represents a duration — the difference between two dates/times. It\'s used for date arithmetic.' } },
          { id: 's9c3l2', type: 'challenge', title: 'Days Until New Year', xp: 20, difficulty: 'hard', challenge: { description: 'Calculate how many days are in a year by computing the difference between Jan 1, 2025 and Jan 1, 2024. Print just the number of days.', starterCode: 'from datetime import datetime\n# Calculate days in a year\n', hints: ['Create two datetime objects', 'Subtract them to get a timedelta', 'Access .days on the timedelta', 'from datetime import datetime\nstart = datetime(2024, 1, 1)\nend = datetime(2025, 1, 1)\ndiff = end - start\nprint(diff.days)'], testCases: [{ input: '', expectedOutput: '366' }] } },
          { id: 's9c3l3', type: 'quiz', title: 'Datetime Quiz', xp: 5, difficulty: 'hard', quiz: { question: 'What method formats a datetime as a string?', options: ['format()', 'strftime()', 'toString()', 'str()'], correct: 1, explanation: 'strftime() (string format time) converts a datetime object to a formatted string.' } }
        ]}
      ]
    },
    {
      id: 's10', title: 'Map, Filter & Reduce', icon: 'refresh', description: 'Functional programming tools in Python',
      chapters: [
        { id: 's10c1', title: 'Map and Filter', lessons: [
          { id: 's10c1l1', type: 'theory', title: 'The map() Function', xp: 10, difficulty: 'hard', theory: { tldr: 'map(func, iterable) applies a function to every item. Returns a map object (convert with list()).', content: `\`map()\` applies a function to every item in an iterable. It's a functional programming tool that replaces simple for loops.\n\nmap returns a map object (lazy), so wrap it in \`list()\` to see results.`, codeExample: `# Double every number\nnumbers = [1, 2, 3, 4, 5]\ndoubled = list(map(lambda x: x * 2, numbers))\nprint(doubled)  # [2, 4, 6, 8, 10]\n\n# Convert strings to int\nstr_nums = ["1", "2", "3"]\nnums = list(map(int, str_nums))\nprint(nums)  # [1, 2, 3]` }, quiz: { question: 'What does map() return?', options: ['A list', 'A map object', 'A dictionary', 'A tuple'], correct: 1, explanation: 'map() returns a lazy map object. Use list() to convert it to a list.' } },
          { id: 's10c1l2', type: 'theory', title: 'The filter() Function', xp: 10, difficulty: 'hard', theory: { tldr: 'filter(func, iterable) keeps only items where the function returns True.', content: `\`filter()\` keeps only the items that pass a test. The function you provide should return \`True\` (keep) or \`False\` (discard) for each item.\n\nLike map, filter returns a lazy object — convert with \`list()\`.`, codeExample: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n\n# Keep only even numbers\nevens = list(filter(lambda x: x % 2 == 0, numbers))\nprint(evens)  # [2, 4, 6, 8, 10]\n\n# Keep positive numbers\nmixed = [-3, -1, 0, 2, 5]\npositives = list(filter(lambda x: x > 0, mixed))\nprint(positives)  # [2, 5]` }, quiz: { question: 'filter() keeps items where the function returns:', options: ['False', 'True', 'None', 'Any value'], correct: 1, explanation: 'filter() keeps items where the function returns True and discards items where it returns False.' } },
          { id: 's10c1l3', type: 'challenge', title: 'Data Processing', xp: 20, difficulty: 'hard', challenge: { description: 'Given the list `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`, use filter to get even numbers, then use map to square them. Print the result as a list.', starterCode: 'nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n# Filter evens, then square them\n', hints: ['First filter: filter(lambda x: x % 2 == 0, nums)', 'Then map: map(lambda x: x ** 2, evens)', 'Chain them or use intermediate variables', 'nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nevens = filter(lambda x: x % 2 == 0, nums)\nresult = list(map(lambda x: x ** 2, evens))\nprint(result)'], testCases: [{ input: '', expectedOutput: '[4, 16, 36, 64, 100]' }] } },
          { id: 's10c1l4', type: 'quiz', title: 'Functional Python Quiz', xp: 5, difficulty: 'hard', quiz: { question: 'Which is more Pythonic for simple transformations?', options: ['map/filter', 'List comprehension', 'for loop', 'They are equal'], correct: 1, explanation: 'In Python, list comprehensions are generally preferred over map/filter for readability. Use map/filter for complex functions.' } }
        ]}
      ]
    }
  ]
};


// ========================================
// Helper Functions
// ========================================

let _allLessons = null;

export function getAllLessons() {
  if (_allLessons) return _allLessons;
  _allLessons = [];
  for (const section of curriculum.sections) {
    for (const chapter of section.chapters) {
      for (const lesson of chapter.lessons) {
        _allLessons.push(lesson);
      }
    }
  }
  return _allLessons;
}

export function getLessonById(id) {
  return getAllLessons().find(l => l.id === id) || null;
}

export function getChapterForLesson(lessonId) {
  for (const section of curriculum.sections) {
    for (const chapter of section.chapters) {
      if (chapter.lessons.some(l => l.id === lessonId)) {
        return chapter;
      }
    }
  }
  return null;
}

export function getSectionForLesson(lessonId) {
  for (const section of curriculum.sections) {
    for (const chapter of section.chapters) {
      if (chapter.lessons.some(l => l.id === lessonId)) {
        return section;
      }
    }
  }
  return null;
}

export function getNextLesson(currentId) {
  const all = getAllLessons();
  const idx = all.findIndex(l => l.id === currentId);
  return idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;
}

export function getPrevLesson(currentId) {
  const all = getAllLessons();
  const idx = all.findIndex(l => l.id === currentId);
  return idx > 0 ? all[idx - 1] : null;
}

export function getLessonIndex(lessonId) {
  return getAllLessons().findIndex(l => l.id === lessonId);
}
