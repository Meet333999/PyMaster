// ========================================
// PyMaster — Complete SQL Curriculum
// 10 Sections, 30 Chapters, 133 Lessons
// ========================================

export const sqlCurriculum = {
  sections: [
    // =============================================
    // SECTION 1: SQL BASICS
    // =============================================
    {
      id: 'sql_s1',
      title: 'SQL Basics',
      icon: 'database',
      description: 'Learn the foundational concepts of relational databases and querying',
      chapters: [
        {
          id: 'sql_s1c1',
          title: 'Introduction to SQL',
          lessons: [
            {
              id: 'sql_s1c1l1',
              type: 'theory',
              title: 'What is SQL?',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'SQL (Structured Query Language) is the standard language used to store, manipulate, and retrieve data in relational databases.',
                content: `SQL stands for Structured Query Language. It is a domain-specific language designed for managing data held in a Relational Database Management System (RDBMS). Relational databases organize data into tables, which consist of rows (records) and columns (attributes).

Unlike programming languages like Python where you write step-by-step instructions (imperative), SQL is a **declarative** language. This means you specify *what* data you want, and the database engine decides *how* to retrieve it.

SQL is the backbone of modern data systems. It is used by developers, data analysts, and scientists to query databases, build backend systems, and analyze massive amounts of information. Let's begin your journey with the most basic query.`,
                codeExample: `-- A simple SELECT query\nSELECT * FROM employees;\n\n-- This retrieves all columns and all rows from the employees table.`
              },
              quiz: {
                question: 'What does SQL stand for?',
                options: ['Simple Query Language', 'Sequential Query Language', 'Structured Query Language', 'Standard Queue Language'],
                correct: 2,
                explanation: 'SQL stands for Structured Query Language, the industry standard for querying relational databases.'
              }
            },
            {
              id: 'sql_s1c1l2',
              type: 'challenge',
              title: 'First SELECT',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Write a query to select ALL columns from the `employees` table. Use the `SELECT *` syntax to retrieve every column.',
                starterCode: '-- Select all columns from the employees table\n',
                setupSQL: `CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT NOT NULL, department TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, 'Alice Johnson', 'Engineering', 85000);
INSERT INTO employees VALUES (2, 'Bob Smith', 'Marketing', 65000);
INSERT INTO employees VALUES (3, 'Carol Williams', 'Engineering', 92000);`,
                hints: [
                  'Use SELECT followed by * to select all columns',
                  'Add FROM followed by the table name (employees)',
                  'End the query with a semicolon (;)',
                  'Solution: SELECT * FROM employees;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'id|name|department|salary\n1|Alice Johnson|Engineering|85000\n2|Bob Smith|Marketing|65000\n3|Carol Williams|Engineering|92000' }
                ]
              }
            },
            {
              id: 'sql_s1c1l3',
              type: 'theory',
              title: 'SELECT Specific Columns',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Instead of SELECT *, list the specific columns you need separated by commas: SELECT name, salary FROM employees;',
                content: `In production environments, using \`SELECT *\` is generally discouraged because it retrieves all columns, which consumes unnecessary network bandwidth and memory.

Instead, you should list only the columns you actually need, separated by commas. This is faster and makes your query results clean and focused.

For example, if you only need the name and department of your employees, you specify those column names in your query.`,
                codeExample: `-- Selecting specific columns\nSELECT name, department FROM employees;\n\n-- This only returns name and department.`
              },
              quiz: {
                question: 'Which clause specifies which columns to retrieve?',
                options: ['FROM', 'WHERE', 'SELECT', 'ORDER BY'],
                correct: 2,
                explanation: 'The SELECT clause determines which columns/attributes are returned in the result set.'
              }
            },
            {
              id: 'sql_s1c1l4',
              type: 'challenge',
              title: 'Selecting Specific Columns',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Write a query to retrieve only the `name` and `salary` columns from the `employees` table.',
                starterCode: '-- Select name and salary from employees\n',
                setupSQL: `CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT NOT NULL, department TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, 'Alice Johnson', 'Engineering', 85000);
INSERT INTO employees VALUES (2, 'Bob Smith', 'Marketing', 65000);
INSERT INTO employees VALUES (3, 'Carol Williams', 'Engineering', 92000);`,
                hints: [
                  'List name and salary after SELECT, separated by a comma',
                  'Use FROM employees',
                  'Solution: SELECT name, salary FROM employees;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'name|salary\nAlice Johnson|85000\nBob Smith|65000\nCarol Williams|92000' }
                ]
              }
            },
            {
              id: 'sql_s1c1l5',
              type: 'quiz',
              title: 'Introduction Quiz',
              xp: 5,
              difficulty: 'easy',
              quiz: {
                question: 'Which character is used to select all columns in SQL?',
                options: ['%', '?', '*', '#'],
                correct: 2,
                explanation: 'The asterisk (*) wildcard is used in SQL to denote all columns of a table.'
              }
            }
          ]
        },
        {
          id: 'sql_s1c2',
          title: 'Columns & Expressions',
          lessons: [
            {
              id: 'sql_s1c2l1',
              type: 'theory',
              title: 'Expressions in SELECT',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'You can perform calculations, string manipulations, and operations directly inside the SELECT clause.',
                content: `The SELECT clause can do more than just fetch existing database columns. You can perform basic arithmetic (+, -, *, /) on numeric columns, concatenate strings, or compute expressions.

For example, if you have a product price column, you can calculate the tax on each product on the fly by multiplying the price by a decimal.

These calculated values do not change the data in the table; they are only calculated and displayed in the query results.`,
                codeExample: `-- Compute a 10% bonus for employees\nSELECT name, salary * 0.1 FROM employees;`
              },
              quiz: {
                question: 'Can you perform arithmetic operations in a SELECT clause?',
                options: ['Yes, using standard math symbols', 'No, arithmetic must be done in WHERE', 'No, SQL is only for fetching raw data', 'Yes, but only addition'],
                correct: 0,
                explanation: 'SQL supports arithmetic (+, -, *, /) directly on columns and values in the SELECT clause.'
              }
            },
            {
              id: 'sql_s1c2l2',
              type: 'challenge',
              title: 'Calculated Columns',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Write a query that displays the employee `name`, their current `salary`, and a calculated column representing their salary increased by 10% (i.e. `salary * 1.1`).',
                starterCode: '-- Select name, salary, and salary * 1.1\n',
                setupSQL: `CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT NOT NULL, salary INTEGER);
INSERT INTO employees VALUES (1, 'Alice Johnson', 80000);
INSERT INTO employees VALUES (2, 'Bob Smith', 60000);`,
                hints: [
                  'Your query should SELECT three values: name, salary, and salary * 1.1',
                  'Use FROM employees',
                  'Solution: SELECT name, salary, salary * 1.1 FROM employees;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'name|salary|salary * 1.1\nAlice Johnson|80000|88000\nBob Smith|60000|66000' }
                ]
              }
            },
            {
              id: 'sql_s1c2l3',
              type: 'theory',
              title: 'Column Aliases',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Use the AS keyword to rename a column in your query results: SELECT name AS employee_name FROM employees;',
                content: `When you perform calculations, the resulting column header in the output can look messy (e.g. \`salary * 1.1\`).

To make query outputs readable and clear, you can assign temporary names to columns using the \`AS\` keyword. These temporary names are called **aliases**.

Aliases are also useful to rename regular columns to make them more descriptive in reports.`,
                codeExample: `-- Rename a calculated column\nSELECT name, salary * 1.1 AS new_salary FROM employees;`
              },
              quiz: {
                question: 'Which keyword is used to create an alias for a column?',
                options: ['LIKE', 'AS', 'NAME', 'TO'],
                correct: 1,
                explanation: 'The AS keyword is used to assign an alias (temporary name) to a column or table in SQL.'
              }
            },
            {
              id: 'sql_s1c2l4',
              type: 'challenge',
              title: 'Using Column Aliases',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Select the `name` column aliased as `employee_name` and the `salary * 1.1` calculation aliased as `increased_salary` from the `employees` table.',
                starterCode: '-- Select name as employee_name and salary * 1.1 as increased_salary\n',
                setupSQL: `CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, 'Alice', 80000);
INSERT INTO employees VALUES (2, 'Bob', 60000);`,
                hints: [
                  'Use SELECT name AS employee_name',
                  'Add a comma, then salary * 1.1 AS increased_salary',
                  'Solution: SELECT name AS employee_name, salary * 1.1 AS increased_salary FROM employees;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'employee_name|increased_salary\nAlice|88000\nBob|66000' }
                ]
              }
            },
            {
              id: 'sql_s1c2l5',
              type: 'quiz',
              title: 'Aliases Quiz',
              xp: 5,
              difficulty: 'easy',
              quiz: {
                question: 'Do column aliases change the actual column names in the database tables?',
                options: ['Yes, permanently', 'Yes, until database restarts', 'No, they only affect the query output display', 'Only if the table is empty'],
                correct: 2,
                explanation: 'Column aliases are temporary and only affect how the columns are named in the result set of that specific query.'
              }
            }
          ]
        },
        {
          id: 'sql_s1c3',
          title: 'The WHERE Clause',
          lessons: [
            {
              id: 'sql_s1c3l1',
              type: 'theory',
              title: 'Filtering Rows',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Use the WHERE clause to filter rows based on conditions: SELECT * FROM table WHERE column = value;',
                content: `Often, you don't want to retrieve all rows from a table. You only want rows that meet specific criteria (e.g., only active users, or products priced under $10).

The \`WHERE\` clause allows you to filter rows based on one or more conditions. It appears after the \`FROM\` clause.

Text values in SQL conditions must be enclosed in single quotes (\`'Engineering'\`), whereas numeric values do not need quotes.`,
                codeExample: `-- Find employees in Engineering\nSELECT * FROM employees WHERE department = 'Engineering';`
              },
              quiz: {
                question: 'Where does the WHERE clause go in a basic SELECT statement?',
                options: ['Before SELECT', 'Before FROM', 'After FROM', 'At the very end, after ORDER BY'],
                correct: 2,
                explanation: 'In a query, WHERE comes directly after the FROM clause.'
              }
            },
            {
              id: 'sql_s1c3l2',
              type: 'challenge',
              title: 'WHERE Equality',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Write a query to select all columns from the `products` table where the `category` is exactly `\'Electronics\'`.',
                starterCode: '-- Select electronics products\n',
                setupSQL: `CREATE TABLE products (id INTEGER, name TEXT, category TEXT, price INTEGER);
INSERT INTO products VALUES (1, 'Laptop', 'Electronics', 1200);
INSERT INTO products VALUES (2, 'Desk Chair', 'Furniture', 150);
INSERT INTO products VALUES (3, 'Smartphone', 'Electronics', 800);`,
                hints: [
                  'Use SELECT * FROM products',
                  'Add a WHERE category = \'Electronics\' clause',
                  'Text literals must use single quotes',
                  'Solution: SELECT * FROM products WHERE category = \'Electronics\';'
                ],
                testCases: [
                  { input: '', expectedOutput: 'id|name|category|price\n1|Laptop|Electronics|1200\n3|Smartphone|Electronics|800' }
                ]
              }
            },
            {
              id: 'sql_s1c3l3',
              type: 'theory',
              title: 'Comparison Operators',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'SQL supports comparison operators like =, <, >, <=, >=, and != (or <>) for filtering.',
                content: `You can use various comparison operators in the WHERE clause:
- \`=\` : Equals
- \`!=\` or \`<>\` : Not Equals
- \`>\` : Greater Than
- \`<\` : Less Than
- \`>=\` : Greater Than or Equal To
- \`<=\` : Less Than or Equal To

These work on both numbers and dates, and even strings (alphabetical sorting order).`,
                codeExample: `-- Products priced over $500\nSELECT * FROM products WHERE price > 500;`
              },
              quiz: {
                question: 'Which operator represents "not equal to" in standard SQL?',
                options: ['!= or <>', '==', 'NOT', '!'],
                correct: 0,
                explanation: 'Both != and <> are widely accepted as the "not equal to" comparison operator in SQL.'
              }
            },
            {
              id: 'sql_s1c3l4',
              type: 'challenge',
              title: 'Comparison Filtering',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Write a query to select the `name` and `price` of all products from the `products` table that cost less than `500`.',
                starterCode: '-- Select name and price for products costing < 500\n',
                setupSQL: `CREATE TABLE products (id INTEGER, name TEXT, category TEXT, price INTEGER);
INSERT INTO products VALUES (1, 'Laptop', 'Electronics', 1200);
INSERT INTO products VALUES (2, 'Desk Chair', 'Furniture', 150);
INSERT INTO products VALUES (3, 'Keyboard', 'Electronics', 80);`,
                hints: [
                  'Only select the columns name and price',
                  'WHERE price < 500',
                  'Solution: SELECT name, price FROM products WHERE price < 500;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'name|price\nDesk Chair|150\nKeyboard|80' }
                ]
              }
            },
            {
              id: 'sql_s1c3l5',
              type: 'quiz',
              title: 'WHERE Clause Quiz',
              xp: 5,
              difficulty: 'easy',
              quiz: {
                question: 'Which of the following WHERE clauses filters for values greater than or equal to 100?',
                options: ['WHERE val => 100', 'WHERE val >= 100', 'WHERE val > 100', 'WHERE val = 100+'],
                correct: 1,
                explanation: '>= is the correct operator for greater than or equal to. => is not a valid SQL operator.'
              }
            }
          ]
        }
      ]
    },

    // =============================================
    // SECTION 2: FILTERING & SORTING
    // =============================================
    {
      id: 'sql_s2',
      title: 'Filtering & Sorting',
      icon: 'search',
      description: 'Combine filters with logical operators, search for ranges, and sort your outputs',
      chapters: [
        {
          id: 'sql_s2c1',
          title: 'Logical Operators',
          lessons: [
            {
              id: 'sql_s2c1l1',
              type: 'theory',
              title: 'AND & OR Operators',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Combine filters using AND (both must be true) and OR (at least one must be true).',
                content: `To filter rows using multiple conditions, use the logical operators \`AND\` and \`OR\`.

- \`AND\` requires **both** conditions to be true for a row to be included.
- \`OR\` requires **at least one** condition to be true.

You can also use parentheses \`()\` to group conditions and establish precedence, which is important when mixing \`AND\` and \`OR\`.`,
                codeExample: `-- Filter with AND\nSELECT * FROM employees WHERE department = 'Sales' AND salary > 50000;`
              },
              quiz: {
                question: 'Which logical operator requires ALL conditions to be true?',
                options: ['OR', 'AND', 'NOT', 'BOTH'],
                correct: 1,
                explanation: 'The AND operator returns rows only when all connected conditions evaluate to true.'
              }
            },
            {
              id: 'sql_s2c1l2',
              type: 'challenge',
              title: 'AND/OR Filtering',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Select all columns from the `products` table where the `category` is `\'Electronics\'` AND the `price` is greater than or equal to `100`.',
                starterCode: '-- Select expensive electronics\n',
                setupSQL: `CREATE TABLE products (id INTEGER, name TEXT, category TEXT, price INTEGER);
INSERT INTO products VALUES (1, 'Laptop', 'Electronics', 1200);
INSERT INTO products VALUES (2, 'Keyboard', 'Electronics', 80);
INSERT INTO products VALUES (3, 'Table Lamp', 'Home', 45);
INSERT INTO products VALUES (4, 'Monitor', 'Electronics', 300);`,
                hints: [
                  'Filter with: WHERE category = \'Electronics\' AND price >= 100',
                  'Make sure to select * (all columns)',
                  'Solution: SELECT * FROM products WHERE category = \'Electronics\' AND price >= 100;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'id|name|category|price\n1|Laptop|Electronics|1200\n4|Monitor|Electronics|300' }
                ]
              }
            },
            {
              id: 'sql_s2c1l3',
              type: 'theory',
              title: 'The NOT Operator',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Use NOT to negate a condition: WHERE NOT department = \'HR\';',
                content: `The \`NOT\` operator reverses the value of a logical condition. It will include rows where the specified condition is **false**.

This is particularly useful when combined with other operators like \`IN\`, \`BETWEEN\`, or \`LIKE\`, allowing you to exclude specific subsets of data.`,
                codeExample: `-- Find employees NOT in the Sales department\nSELECT * FROM employees WHERE NOT department = 'Sales';`
              },
              quiz: {
                question: 'What is the purpose of the NOT operator?',
                options: ['To delete records', 'To join tables', 'To negate a condition', 'To check for nulls'],
                correct: 2,
                explanation: 'The NOT operator is used to negate a condition, reversing its true/false evaluation.'
              }
            },
            {
              id: 'sql_s2c1l4',
              type: 'challenge',
              title: 'Using NOT',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Select the `name` and `category` of products from the `products` table that are NOT in the `\'Electronics\'` category.',
                starterCode: '-- Select products not in Electronics\n',
                setupSQL: `CREATE TABLE products (id INTEGER, name TEXT, category TEXT, price INTEGER);
INSERT INTO products VALUES (1, 'Laptop', 'Electronics', 1200);
INSERT INTO products VALUES (2, 'Chair', 'Furniture', 120);
INSERT INTO products VALUES (3, 'Notebook', 'Stationery', 5);`,
                hints: [
                  'Use SELECT name, category FROM products',
                  'Filter with WHERE NOT category = \'Electronics\'',
                  'Solution: SELECT name, category FROM products WHERE NOT category = \'Electronics\';'
                ],
                testCases: [
                  { input: '', expectedOutput: 'name|category\nChair|Furniture\nNotebook|Stationery' }
                ]
              }
            },
            {
              id: 'sql_s2c1l5',
              type: 'quiz',
              title: 'Logical Operators Quiz',
              xp: 5,
              difficulty: 'easy',
              quiz: {
                question: 'If you have: WHERE A OR B AND C, which evaluates first in standard SQL?',
                options: ['A OR B', 'B AND C', 'They evaluate left to right', 'It is random'],
                correct: 1,
                explanation: 'In SQL operator precedence, AND has a higher precedence than OR and evaluates first unless parentheses are used.'
              }
            }
          ]
        },
        {
          id: 'sql_s2c2',
          title: 'Range & Set Operators',
          lessons: [
            {
              id: 'sql_s2c2l1',
              type: 'theory',
              title: 'IN Operator',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Use IN to check if a value matches any value in a list: WHERE column IN (val1, val2, ...);',
                content: `If you want to filter a column for multiple specific values, writing several \`OR\` conditions can become long and messy:
\`WHERE dept = 'HR' OR dept = 'Sales' OR dept = 'Finance'\`

The \`IN\` operator simplifies this by letting you specify a list of values to match. It is clean, readable, and faster to execute.`,
                codeExample: `-- Filter departments using IN\nSELECT * FROM employees WHERE department IN ('HR', 'Sales', 'Finance');`
              },
              quiz: {
                question: 'What is the benefit of the IN operator?',
                options: ['It speed up queries by 100x', 'It replaces multiple OR conditions with a clean list', 'It automatically joins tables', 'It allows calculations'],
                correct: 1,
                explanation: 'The IN operator is shorthand for multiple OR conditions on a single column.'
              }
            },
            {
              id: 'sql_s2c2l2',
              type: 'challenge',
              title: 'Using IN',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Select all columns from the `products` table where the `category` is either `\'Furniture\'` or `\'Office\'`. Use the `IN` operator.',
                starterCode: '-- Select furniture and office products using IN\n',
                setupSQL: `CREATE TABLE products (id INTEGER, name TEXT, category TEXT, price INTEGER);
INSERT INTO products VALUES (1, 'Laptop', 'Electronics', 1200);
INSERT INTO products VALUES (2, 'Desk Chair', 'Furniture', 150);
INSERT INTO products VALUES (3, 'Pen Pack', 'Office', 10);
INSERT INTO products VALUES (4, 'Bed Frame', 'Furniture', 400);`,
                hints: [
                  'Use SELECT * FROM products',
                  'Add: WHERE category IN (\'Furniture\', \'Office\')',
                  'Solution: SELECT * FROM products WHERE category IN (\'Furniture\', \'Office\');'
                ],
                testCases: [
                  { input: '', expectedOutput: 'id|name|category|price\n2|Desk Chair|Furniture|150\n3|Pen Pack|Office|10\n4|Bed Frame|Furniture|400' }
                ]
              }
            },
            {
              id: 'sql_s2c2l3',
              type: 'theory',
              title: 'BETWEEN Operator',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Use BETWEEN to filter for values within a range (inclusive): WHERE column BETWEEN min AND max;',
                content: `The \`BETWEEN\` operator filters values that fall within a specified range. It is inclusive, meaning the minimum and maximum values are included in the range.

This works on numbers, dates, and text (in alphabetical order). It is a cleaner alternative to writing:
\`WHERE price >= 10 AND price <= 50\``,
                codeExample: `-- Select products with prices between $10 and $50\nSELECT * FROM products WHERE price BETWEEN 10 AND 50;`
              },
              quiz: {
                question: 'Is the BETWEEN operator range inclusive or exclusive?',
                options: ['Exclusive (endpoints not included)', 'Inclusive (endpoints are included)', 'Only the minimum is inclusive', 'Depends on database settings'],
                correct: 1,
                explanation: 'BETWEEN is inclusive in SQL; both boundary values are included in the filter range.'
              }
            },
            {
              id: 'sql_s2c2l4',
              type: 'challenge',
              title: 'Using BETWEEN',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Write a query to select the `name` and `price` of products from the `products` table whose `price` is between `100` and `500` (inclusive).',
                starterCode: '-- Select products priced between 100 and 500\n',
                setupSQL: `CREATE TABLE products (id INTEGER, name TEXT, price INTEGER);
INSERT INTO products VALUES (1, 'Laptop', 1200);
INSERT INTO products VALUES (2, 'Desk Chair', 150);
INSERT INTO products VALUES (3, 'Keyboard', 80);
INSERT INTO products VALUES (4, 'Monitor', 300);`,
                hints: [
                  'Use SELECT name, price FROM products',
                  'Filter using: WHERE price BETWEEN 100 AND 500',
                  'Solution: SELECT name, price FROM products WHERE price BETWEEN 100 AND 500;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'name|price\nDesk Chair|150\nMonitor|300' }
                ]
              }
            },
            {
              id: 'sql_s2c2l5',
              type: 'quiz',
              title: 'Range & Set Quiz',
              xp: 5,
              difficulty: 'easy',
              quiz: {
                question: 'Which of the following is equivalent to: WHERE NOT val IN (1, 2)?',
                options: ['WHERE val != 1 AND val != 2', 'WHERE val != 1 OR val != 2', 'WHERE val = 1 OR val = 2', 'WHERE val < 1 AND val > 2'],
                correct: 0,
                explanation: 'Negating an IN list means the value cannot be 1 AND it cannot be 2.'
              }
            }
          ]
        },
        {
          id: 'sql_s2c3',
          title: 'Sorting & Limiting',
          lessons: [
            {
              id: 'sql_s2c3l1',
              type: 'theory',
              title: 'ORDER BY Clause',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Use ORDER BY to sort query results: SELECT * FROM table ORDER BY column ASC|DESC;',
                content: `By default, relational databases do not guarantee any order in query results. To sort results, you must use the \`ORDER BY\` clause at the end of the query.

- \`ASC\` (default) sorts in ascending order (smallest to largest, A to Z).
- \`DESC\` sorts in descending order (largest to smallest, Z to A).

You can also sort by multiple columns by listing them separated by commas.`,
                codeExample: `-- Sort employees by salary in descending order\nSELECT * FROM employees ORDER BY salary DESC;`
              },
              quiz: {
                question: 'What is the default sorting order of ORDER BY?',
                options: ['Descending (DESC)', 'Ascending (ASC)', 'Unsorted', 'Alphabetical only'],
                correct: 1,
                explanation: 'ORDER BY sorts in ascending (ASC) order by default if no direction is specified.'
              }
            },
            {
              id: 'sql_s2c3l2',
              type: 'challenge',
              title: 'Sorting Results',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Select all columns from the `products` table and sort the results by `price` in descending (`DESC`) order.',
                starterCode: '-- Select all products ordered by price descending\n',
                setupSQL: `CREATE TABLE products (id INTEGER, name TEXT, price INTEGER);
INSERT INTO products VALUES (1, 'Laptop', 1200);
INSERT INTO products VALUES (2, 'Desk Chair', 150);
INSERT INTO products VALUES (3, 'Keyboard', 80);`,
                hints: [
                  'Use ORDER BY price DESC',
                  'Solution: SELECT * FROM products ORDER BY price DESC;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'id|name|price\n1|Laptop|1200\n2|Desk Chair|150\n3|Keyboard|80' }
                ]
              }
            },
            {
              id: 'sql_s2c3l3',
              type: 'theory',
              title: 'LIMIT & OFFSET',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Use LIMIT to restrict the number of rows returned, and OFFSET to skip a number of rows.',
                content: `When dealing with thousands of rows, you often only want a small subset, like the "top 10 highest-paid employees" or page-by-page results (pagination).

- \`LIMIT\` specifies the maximum number of rows to return.
- \`OFFSET\` specifies how many rows to skip before starting to return the results.

These are placed at the very end of your SQL query.`,
                codeExample: `-- Get the top 5 highest-priced products\nSELECT * FROM products ORDER BY price DESC LIMIT 5;`
              },
              quiz: {
                question: 'If you want to skip the first 10 rows and return the next 5, which combination is correct?',
                options: ['LIMIT 10 OFFSET 5', 'LIMIT 5 OFFSET 10', 'OFFSET 5 LIMIT 10', 'SKIP 10 LIMIT 5'],
                correct: 1,
                explanation: 'LIMIT 5 OFFSET 10 returns 5 rows, skipping the first 10 rows.'
              }
            },
            {
              id: 'sql_s2c3l4',
              type: 'challenge',
              title: 'Limiting Results',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Write a query to retrieve the single cheapest product (lowest price) from the `products` table.',
                starterCode: '-- Select the single cheapest product\n',
                setupSQL: `CREATE TABLE products (id INTEGER, name TEXT, price INTEGER);
INSERT INTO products VALUES (1, 'Laptop', 1200);
INSERT INTO products VALUES (2, 'Desk Chair', 150);
INSERT INTO products VALUES (3, 'Keyboard', 80);`,
                hints: [
                  'Order the products by price ascending (ASC)',
                  'Apply a LIMIT of 1 to get only the first row',
                  'Solution: SELECT * FROM products ORDER BY price ASC LIMIT 1;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'id|name|price\n3|Keyboard|80' }
                ]
              }
            },
            {
              id: 'sql_s2c3l5',
              type: 'quiz',
              title: 'Sorting & Limiting Quiz',
              xp: 5,
              difficulty: 'easy',
              quiz: {
                question: 'In a query containing SELECT, WHERE, ORDER BY, and LIMIT, which clause must come last?',
                options: ['WHERE', 'ORDER BY', 'LIMIT', 'SELECT'],
                correct: 2,
                explanation: 'The LIMIT clause is always placed at the very end of the query statement.'
              }
            }
          ]
        }
      ]
    },

    // =============================================
    // SECTION 3: FUNCTIONS & AGGREGATION
    // =============================================
    {
      id: 'sql_s3',
      title: 'Functions & Aggregation',
      icon: 'bar-chart',
      description: 'Summarize details, perform math, and group rows to compute totals',
      chapters: [
        {
          id: 'sql_s3c1',
          title: 'Aggregate Functions',
          lessons: [
            {
              id: 'sql_s3c1l1',
              type: 'theory',
              title: 'Aggregates & COUNT',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Aggregate functions summarize data from multiple rows. COUNT(column) returns the number of rows.',
                content: `Aggregate functions perform calculations on multiple rows and return a single summary value.

The \`COUNT()\` function counts the number of rows that match a condition.
- \`COUNT(*)\` counts all rows, including NULL values.
- \`COUNT(column_name)\` counts only rows where that column is NOT null.`,
                codeExample: `-- Count all employees\nSELECT COUNT(*) FROM employees;\n\n-- Count employees with a non-null manager\nSELECT COUNT(manager_id) FROM employees;`
              },
              quiz: {
                question: 'What is the main difference between COUNT(*) and COUNT(column)?',
                options: ['COUNT(*) is slower', 'COUNT(column) excludes NULL values', 'COUNT(*) only counts primary keys', 'There is no difference'],
                correct: 1,
                explanation: 'COUNT(column) only counts rows where the specified column value is not NULL, whereas COUNT(*) counts all rows.'
              }
            },
            {
              id: 'sql_s3c1l2',
              type: 'challenge',
              title: 'COUNT Rows',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Write a query to count how many employees are in the `\'Sales\'` department. Name the output column `sales_count` using an alias.',
                starterCode: '-- Count Sales employees\n',
                setupSQL: `CREATE TABLE employees (id INTEGER, name TEXT, department TEXT);
INSERT INTO employees VALUES (1, 'Alice', 'Engineering');
INSERT INTO employees VALUES (2, 'Bob', 'Sales');
INSERT INTO employees VALUES (3, 'Carol', 'Sales');
INSERT INTO employees VALUES (4, 'David', 'Marketing');`,
                hints: [
                  'Use SELECT COUNT(*) AS sales_count',
                  'Add: WHERE department = \'Sales\'',
                  'Solution: SELECT COUNT(*) AS sales_count FROM employees WHERE department = \'Sales\';'
                ],
                testCases: [
                  { input: '', expectedOutput: 'sales_count\n2' }
                ]
              }
            },
            {
              id: 'sql_s3c1l3',
              type: 'theory',
              title: 'SUM, AVG, MIN, MAX',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Use SUM() for totals, AVG() for averages, MIN() for the smallest value, and MAX() for the largest.',
                content: `Other common SQL aggregate functions include:
- \`SUM(column)\` : Adds up all numeric values.
- \`AVG(column)\` : Calculates the average of numeric values.
- \`MIN(column)\` : Returns the lowest value.
- \`MAX(column)\` : Returns the highest value.

These functions ignore NULL values. You can combine multiple aggregates in a single SELECT query.`,
                codeExample: `-- Get average salary and maximum salary\nSELECT AVG(salary), MAX(salary) FROM employees;`
              },
              quiz: {
                question: 'Which aggregate function would you use to find the lowest price in a table?',
                options: ['LOW()', 'MIN()', 'SMALLEST()', 'AVG()'],
                correct: 1,
                explanation: 'The MIN() aggregate function returns the minimum (lowest) value in a column.'
              }
            },
            {
              id: 'sql_s3c1l4',
              type: 'challenge',
              title: 'SUM & AVG Calculation',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Retrieve the total salary (aliased as `total_salary`) and the average salary (aliased as `average_salary`) of all employees in the table.',
                starterCode: '-- Calculate total and average salary\n',
                setupSQL: `CREATE TABLE employees (id INTEGER, name TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, 'Alice', 80000);
INSERT INTO employees VALUES (2, 'Bob', 60000);
INSERT INTO employees VALUES (3, 'Carol', 70000);`,
                hints: [
                  'Use SUM(salary) AS total_salary',
                  'Use AVG(salary) AS average_salary',
                  'Solution: SELECT SUM(salary) AS total_salary, AVG(salary) AS average_salary FROM employees;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'total_salary|average_salary\n210000|70000' }
                ]
              }
            },
            {
              id: 'sql_s3c1l5',
              type: 'quiz',
              title: 'Aggregate Functions Quiz',
              xp: 5,
              difficulty: 'easy',
              quiz: {
                question: 'What happens if you run an aggregate function on a column containing only NULLs?',
                options: ['It returns 0', 'It raises an error', 'It returns NULL', 'It skips the table'],
                correct: 2,
                explanation: 'Aggregate functions (except COUNT) return NULL if they operate on an empty set or a column containing only NULLs.'
              }
            }
          ]
        },
        {
          id: 'sql_s3c2',
          title: 'GROUP BY & HAVING',
          lessons: [
            {
              id: 'sql_s3c2l1',
              type: 'theory',
              title: 'GROUP BY Clause',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Use GROUP BY to group rows that have the same values and run aggregate functions on them.',
                content: `Sometimes you don't want the total average of all rows, but rather the average *per category* (e.g. average salary *by department*).

The \`GROUP BY\` clause groups rows with identical values in specified columns into summary rows. It is placed after the \`WHERE\` clause and before the \`ORDER BY\` clause.

Every column in your SELECT statement that is not wrapped in an aggregate function **must** be listed in the GROUP BY clause.`,
                codeExample: `-- Average salary by department\nSELECT department, AVG(salary) FROM employees GROUP BY department;`
              },
              quiz: {
                question: 'If you select "department" and "AVG(salary)", what MUST go in the GROUP BY clause?',
                options: ['salary', 'AVG(salary)', 'department', 'Nothing'],
                correct: 2,
                explanation: 'Any non-aggregated column in the SELECT clause must be included in the GROUP BY clause.'
              }
            },
            {
              id: 'sql_s3c2l2',
              type: 'challenge',
              title: 'Grouping Data',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Write a query to display the `category` and the count of products in each category (aliased as `product_count`) from the `products` table. Group by `category`.',
                starterCode: '-- Count products by category\n',
                setupSQL: `CREATE TABLE products (id INTEGER, name TEXT, category TEXT);
INSERT INTO products VALUES (1, 'Laptop', 'Electronics');
INSERT INTO products VALUES (2, 'Keyboard', 'Electronics');
INSERT INTO products VALUES (3, 'Chair', 'Furniture');
INSERT INTO products VALUES (4, 'Desk', 'Furniture');
INSERT INTO products VALUES (5, 'Pen', 'Office');`,
                hints: [
                  'Use SELECT category, COUNT(*) AS product_count',
                  'Add: GROUP BY category',
                  'Solution: SELECT category, COUNT(*) AS product_count FROM products GROUP BY category;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'category|product_count\nElectronics|2\nFurniture|2\nOffice|1' }
                ]
              }
            },
            {
              id: 'sql_s3c2l3',
              type: 'theory',
              title: 'HAVING Clause',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Use HAVING to filter groups returned by GROUP BY. (WHERE filters rows BEFORE grouping, HAVING filters AFTER grouping).',
                content: `You cannot use aggregate functions inside a \`WHERE\` clause because the \`WHERE\` clause filters rows *before* they are grouped.
For example, \`WHERE AVG(salary) > 50000\` is invalid.

To filter grouped results, use the \`HAVING\` clause. It is placed after the \`GROUP BY\` clause.`,
                codeExample: `-- Departments with average salary > 60000\nSELECT department, AVG(salary) FROM employees GROUP BY department HAVING AVG(salary) > 60000;`
              },
              quiz: {
                question: 'What is the main difference between WHERE and HAVING?',
                options: ['HAVING is faster', 'WHERE filters rows before grouping, HAVING filters groups after grouping', 'HAVING can only be used on string columns', 'WHERE is obsolete'],
                correct: 1,
                explanation: 'WHERE filters individual records before groups are formed. HAVING filters the summarized groups generated by GROUP BY.'
              }
            },
            {
              id: 'sql_s3c2l4',
              type: 'challenge',
              title: 'Filtering Groups',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Write a query to display the `department` and its average salary (aliased as `avg_salary`). Only return departments where the average salary is greater than `65000`.',
                starterCode: '-- Departments with average salary > 65000\n',
                setupSQL: `CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, 'Alice', 'Engineering', 80000);
INSERT INTO employees VALUES (2, 'Bob', 'Engineering', 90000);
INSERT INTO employees VALUES (3, 'Carol', 'Sales', 55000);
INSERT INTO employees VALUES (4, 'David', 'Sales', 60000);`,
                hints: [
                  'Use SELECT department, AVG(salary) AS avg_salary',
                  'Group by department',
                  'Add: HAVING AVG(salary) > 65000',
                  'Solution: SELECT department, AVG(salary) AS avg_salary FROM employees GROUP BY department HAVING AVG(salary) > 65000;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'department|avg_salary\nEngineering|85000' }
                ]
              }
            },
            {
              id: 'sql_s3c2l5',
              type: 'quiz',
              title: 'GROUP BY Quiz',
              xp: 5,
              difficulty: 'easy',
              quiz: {
                question: 'Can you use HAVING without GROUP BY?',
                options: ['No, never', 'Yes, it works like WHERE on the whole table', 'Yes, but only on numeric columns', 'Only in Subqueries'],
                correct: 1,
                explanation: 'While rarely done, HAVING without GROUP BY acts on the entire table as a single group. However, you should generally use WHERE for non-grouped filters.'
              }
            }
          ]
        },
        {
          id: 'sql_s3c3',
          title: 'String & Math Functions',
          lessons: [
            {
              id: 'sql_s3c3l1',
              type: 'theory',
              title: 'String Functions',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Use functions like UPPER(), LOWER(), LENGTH(), and SUBSTR() to transform and inspect text.',
                content: `Relational databases provide built-in functions to manipulate text:
- \`UPPER(string)\` : Converts text to uppercase.
- \`LOWER(string)\` : Converts text to lowercase.
- \`LENGTH(string)\` : Returns character length.
- \`SUBSTR(string, start, length)\` : Extracts a substring.
- \`TRIM(string)\` : Removes leading and trailing spaces.

Note that functions can vary slightly between database engines (e.g. SQLite uses \`SUBSTR\`, while SQL Server uses \`SUBSTRING\`).`,
                codeExample: `-- Convert names to uppercase\nSELECT UPPER(name) FROM employees;`
              },
              quiz: {
                question: 'Which function returns the number of characters in a string in SQLite?',
                options: ['LEN()', 'CHAR_LEN()', 'LENGTH()', 'SIZE()'],
                correct: 2,
                explanation: 'SQLite uses LENGTH() to return the character count of a string.'
              }
            },
            {
              id: 'sql_s3c3l2',
              type: 'challenge',
              title: 'Transforming Strings',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Write a query that returns the employee `name` in lowercase (aliased as `lower_name`) and the length of their name (aliased as `name_length`) from the `employees` table.',
                starterCode: '-- Select lowercase name and name length\n',
                setupSQL: `CREATE TABLE employees (id INTEGER, name TEXT);
INSERT INTO employees VALUES (1, 'Alice');
INSERT INTO employees VALUES (2, 'Charlie');`,
                hints: [
                  'Use LOWER(name) AS lower_name',
                  'Use LENGTH(name) AS name_length',
                  'Solution: SELECT LOWER(name) AS lower_name, LENGTH(name) AS name_length FROM employees;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'lower_name|name_length\nalice|5\ncharlie|7' }
                ]
              }
            },
            {
              id: 'sql_s3c3l3',
              type: 'theory',
              title: 'Math Functions',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Use ROUND() to format decimals, ABS() for absolute values, and arithmetic operators for calculations.',
                content: `SQL includes several built-in functions for mathematical operations:
- \`ROUND(number, decimals)\` : Rounds a number to a specified number of decimal places.
- \`ABS(number)\` : Returns the absolute value of a number.
- \`RANDOM()\` : Generates a pseudo-random integer.

SQLite also supports standard math operators directly in the query.`,
                codeExample: `-- Round averages to 2 decimal places\nSELECT ROUND(AVG(salary), 2) FROM employees;`
              },
              quiz: {
                question: 'What is the result of ROUND(123.456, 1)?',
                options: ['123', '123.4', '123.5', '120'],
                correct: 2,
                explanation: 'ROUND(123.456, 1) rounds to one decimal place, resulting in 123.5.'
              }
            },
            {
              id: 'sql_s3c3l4',
              type: 'challenge',
              title: 'Math Calculations',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Write a query to retrieve the `name` and the rounded average score (aliased as `avg_score`) of each student from the `students` table. Round the score to `1` decimal place. Group by `name`.',
                starterCode: '-- Select student name and rounded average score\n',
                setupSQL: `CREATE TABLE students (id INTEGER, name TEXT, score REAL);
INSERT INTO students VALUES (1, 'Alice', 85.33);
INSERT INTO students VALUES (1, 'Alice', 90.5);
INSERT INTO students VALUES (2, 'Bob', 72.88);
INSERT INTO students VALUES (2, 'Bob', 79.1);`,
                hints: [
                  'Use SELECT name, ROUND(AVG(score), 1) AS avg_score',
                  'Group by name',
                  'Solution: SELECT name, ROUND(AVG(score), 1) AS avg_score FROM students GROUP BY name;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'name|avg_score\nAlice|87.9\nBob|76' }
                ]
              }
            },
            {
              id: 'sql_s3c3l5',
              type: 'quiz',
              title: 'Functions Quiz',
              xp: 5,
              difficulty: 'easy',
              quiz: {
                question: 'Which of the following functions removes spaces from both the beginning and end of a text string?',
                options: ['REPLACE()', 'CLEAN()', 'TRIM()', 'REMOVE()'],
                correct: 2,
                explanation: 'The TRIM() function is used to remove leading and trailing white space characters from a string.'
              }
            }
          ]
        }
      ]
    },

    // =============================================
    // SECTION 4: WORKING WITH MULTIPLE TABLES
    // =============================================
    {
      id: 'sql_s4',
      title: 'Working with Multiple Tables',
      icon: 'layers',
      description: 'Combine related data stored in separate tables using joins',
      chapters: [
        {
          id: 'sql_s4c1',
          title: 'INNER JOIN',
          lessons: [
            {
              id: 'sql_s4c1l1',
              type: 'theory',
              title: 'Relational Database Concepts',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Relational databases split data into multiple tables to avoid duplication. Tables are linked by Primary and Foreign keys.',
                content: `A key principle of relational databases is **normalization** — organizing data to reduce redundancy. Instead of putting all information in one giant table (like an Excel sheet), we split it.

For example, instead of storing a department's location and budget on *every* employee record, we create a separate \`departments\` table.

The tables are linked using keys:
- **Primary Key**: A unique identifier for a row in a table (e.g. \`dept_id\` in \`departments\`).
- **Foreign Key**: A column in one table that references the Primary Key of another (e.g. \`department_id\` in the \`employees\` table).`,
                codeExample: `-- Primary key in departments is id\n-- Foreign key in employees is department_id`
              },
              quiz: {
                question: 'What links a record in one table to a unique record in another table?',
                options: ['Indexes', 'Secondary Keys', 'Foreign Keys referencing a Primary Key', 'Views'],
                correct: 2,
                explanation: 'A Foreign Key in one table references the Primary Key of another table, establishing a relationship.'
              }
            },
            {
              id: 'sql_s4c1l2',
              type: 'theory',
              title: 'INNER JOIN Syntax',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'INNER JOIN combines rows from two tables where a specified join condition is met: SELECT * FROM t1 INNER JOIN t2 ON t1.fk = t2.pk;',
                content: `An \`INNER JOIN\` retrieves rows that have matching values in both tables. If a row in the first table has no matching row in the second table, it is excluded from the result set.

The \`ON\` keyword specifies the columns that should match (usually Foreign Key = Primary Key).

You can prefix column names with table names (\`employees.name\`) to avoid ambiguity if two tables have columns with the same name.`,
                codeExample: `-- Join employees and departments\nSELECT employees.name, departments.name AS department_name\nFROM employees\nINNER JOIN departments ON employees.department_id = departments.id;`
              },
              quiz: {
                question: 'What happens to a row if the join condition finds no match in an INNER JOIN?',
                options: ['It is returned with NULLs', 'It is excluded from the results', 'An error is thrown', 'The query stops running'],
                correct: 1,
                explanation: 'INNER JOIN only returns rows where there is a match in both tables. Unmatched rows are excluded.'
              }
            },
            {
              id: 'sql_s4c1l3',
              type: 'challenge',
              title: 'Basic INNER JOIN',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Join the `employees` table and `departments` table. Select the employee `name` and their department `dept_name`. Use `ON employees.dept_id = departments.id`.',
                starterCode: '-- Join employees and departments\n',
                setupSQL: `CREATE TABLE departments (id INTEGER PRIMARY KEY, dept_name TEXT);
CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, dept_id INTEGER);
INSERT INTO departments VALUES (10, 'Engineering');
INSERT INTO departments VALUES (20, 'Sales');
INSERT INTO employees VALUES (1, 'Alice', 10);
INSERT INTO employees VALUES (2, 'Bob', 20);`,
                hints: [
                  'Use SELECT employees.name, departments.dept_name',
                  'FROM employees INNER JOIN departments ON employees.dept_id = departments.id',
                  'Solution: SELECT employees.name, departments.dept_name FROM employees INNER JOIN departments ON employees.dept_id = departments.id;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'name|dept_name\nAlice|Engineering\nBob|Sales' }
                ]
              }
            },
            {
              id: 'sql_s4c1l4',
              type: 'challenge',
              title: 'Join with WHERE',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Write a query to retrieve the employee `name` and their department `dept_name` for employees who earn more than `70000`. Filter using a WHERE clause after the JOIN.',
                starterCode: '-- Join tables and filter by salary\n',
                setupSQL: `CREATE TABLE departments (id INTEGER PRIMARY KEY, dept_name TEXT);
CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, dept_id INTEGER, salary INTEGER);
INSERT INTO departments VALUES (1, 'HR');
INSERT INTO departments VALUES (2, 'Finance');
INSERT INTO employees VALUES (101, 'Alice', 1, 60000);
INSERT INTO employees VALUES (102, 'Bob', 2, 85000);`,
                hints: [
                  'Join employees and departments on dept_id = departments.id',
                  'Add WHERE salary > 70000',
                  'Solution: SELECT employees.name, departments.dept_name FROM employees INNER JOIN departments ON employees.dept_id = departments.id WHERE salary > 70000;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'name|dept_name\nBob|Finance' }
                ]
              }
            },
            {
              id: 'sql_s4c1l5',
              type: 'quiz',
              title: 'INNER JOIN Quiz',
              xp: 5,
              difficulty: 'easy',
              quiz: {
                question: 'Which of the following is equivalent to "INNER JOIN"?',
                options: ['LEFT JOIN', 'JOIN', 'FULL JOIN', 'CROSS JOIN'],
                correct: 1,
                explanation: 'In standard SQL, the JOIN keyword alone defaults to an INNER JOIN.'
              }
            }
          ]
        },
        {
          id: 'sql_s4c2',
          title: 'Outer Joins',
          lessons: [
            {
              id: 'sql_s4c2l1',
              type: 'theory',
              title: 'LEFT JOIN Concept',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'LEFT JOIN returns all rows from the left table, and matching rows from the right. If no match, right-side columns are NULL.',
                content: `Unlike \`INNER JOIN\`, a \`LEFT JOIN\` (sometimes called \`LEFT OUTER JOIN\`) returns **all** records from the left table, even if there are no matching rows in the right table.

If there is no match, the database engine returns \`NULL\` values for all columns of the right table.

This is extremely useful when you want to list everything in a main table and see if any related data exists (e.g. listing all customers, along with their orders if they have any).`,
                codeExample: `-- List all employees and their departments (even if unassigned)\nSELECT employees.name, departments.name\nFROM employees\nLEFT JOIN departments ON employees.dept_id = departments.id;`
              },
              quiz: {
                question: 'In a LEFT JOIN, what values are displayed for the right table columns if no match is found?',
                options: ['Zero (0)', 'Blank spaces', 'NULL', 'An empty string'],
                correct: 2,
                explanation: 'If no match is found, columns from the right table are populated with NULL values.'
              }
            },
            {
              id: 'sql_s4c2l2',
              type: 'challenge',
              title: 'LEFT JOIN Query',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Write a query to retrieve all customer names from the `customers` table and their order ids (if any) from the `orders` table. Perform a `LEFT JOIN` on `customer_id`.',
                starterCode: '-- Select customer name and order_id using LEFT JOIN\n',
                setupSQL: `CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (order_id INTEGER PRIMARY KEY, customer_id INTEGER, amount INTEGER);
INSERT INTO customers VALUES (1, 'Alice');
INSERT INTO customers VALUES (2, 'Bob');
INSERT INTO customers VALUES (3, 'Charlie');
INSERT INTO orders VALUES (101, 1, 250);
INSERT INTO orders VALUES (102, 1, 120);
INSERT INTO orders VALUES (103, 3, 45);`,
                hints: [
                  'Start with FROM customers (left table)',
                  'LEFT JOIN orders ON customers.id = orders.customer_id',
                  'Select customers.name and orders.order_id',
                  'Solution: SELECT customers.name, orders.order_id FROM customers LEFT JOIN orders ON customers.id = orders.customer_id;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'name|order_id\nAlice|101\nAlice|102\nBob|NULL\nCharlie|103' }
                ]
              }
            },
            {
              id: 'sql_s4c2l3',
              type: 'theory',
              title: 'RIGHT & FULL OUTER JOIN',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'RIGHT JOIN is the mirror of LEFT JOIN. FULL OUTER JOIN returns all rows from both tables, filling with NULLs where there are no matches.',
                content: `- **RIGHT JOIN** returns all rows from the right table, and matching rows from the left table. If no match, left-side columns are filled with NULLs.
- **FULL OUTER JOIN** returns all rows from both tables, combining LEFT JOIN and RIGHT JOIN.

*Note on SQLite:* SQLite does not support \`RIGHT JOIN\` or \`FULL OUTER JOIN\` natively. To perform a RIGHT JOIN in SQLite, you simply swap the order of the tables and use a \`LEFT JOIN\`. To perform a FULL JOIN, you use a \`UNION\` of a \`LEFT JOIN\` and a swapped \`LEFT JOIN\`.`,
                codeExample: `-- Emulating FULL OUTER JOIN in SQLite\nSELECT * FROM t1 LEFT JOIN t2 ON t1.id = t2.id\nUNION\nSELECT * FROM t2 LEFT JOIN t1 ON t1.id = t2.id;`
              },
              quiz: {
                question: 'How do you perform a RIGHT JOIN in SQLite since it is not natively supported?',
                options: ['Use the RIGHT keyword anyway', 'Swap the tables and use a LEFT JOIN', 'It is impossible', 'Use an INNER JOIN'],
                correct: 1,
                explanation: 'A RIGHT JOIN can always be rewritten as a LEFT JOIN by swapping the tables in the FROM and JOIN clauses.'
              }
            },
            {
              id: 'sql_s4c2l4',
              type: 'challenge',
              title: 'Outer Join Alternatives',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Write a query that displays all orders and customer names, even if the customer has been deleted (i.e. customer_id does not exist in customers table). Swap table positions to make `orders` the left table.',
                starterCode: '-- Select order_id, amount, customer name\n',
                setupSQL: `CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (order_id INTEGER PRIMARY KEY, customer_id INTEGER, amount INTEGER);
INSERT INTO customers VALUES (1, 'Alice');
INSERT INTO orders VALUES (101, 1, 250);
INSERT INTO orders VALUES (102, 2, 120);`,
                hints: [
                  'Use orders as the main table in the FROM clause',
                  'LEFT JOIN customers ON orders.customer_id = customers.id',
                  'Select order_id, amount, customers.name',
                  'Solution: SELECT orders.order_id, orders.amount, customers.name FROM orders LEFT JOIN customers ON orders.customer_id = customers.id;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'order_id|amount|name\n101|250|Alice\n102|120|NULL' }
                ]
              }
            },
            {
              id: 'sql_s4c2l5',
              type: 'quiz',
              title: 'Outer Joins Quiz',
              xp: 5,
              difficulty: 'medium',
              quiz: {
                question: 'Which join type returns ALL rows from BOTH tables?',
                options: ['INNER JOIN', 'LEFT JOIN', 'FULL OUTER JOIN', 'CROSS JOIN'],
                correct: 2,
                explanation: 'FULL OUTER JOIN returns all records from both tables, inserting NULL where matches are absent.'
              }
            }
          ]
        },
        {
          id: 'sql_s4c3',
          title: 'Self & Multiple Joins',
          lessons: [
            {
              id: 'sql_s4c3l1',
              type: 'theory',
              title: 'Joining Multiple Tables',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'You can join more than two tables in a single query by chaining JOIN clauses: SELECT * FROM t1 JOIN t2 ON ... JOIN t3 ON ...;',
                content: `In database design, tables are often linked transitively. For example:
- \`orders\` references \`customers\`
- \`order_items\` references \`orders\` and \`products\`

To get a complete invoice showing customer names and the products they purchased, you must join three or more tables together. You can chain as many \`JOIN\` clauses as needed. The database evaluates them in order.`,
                codeExample: `-- Join three tables\nSELECT c.name, p.product_name\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nJOIN order_items oi ON o.id = oi.order_id\nJOIN products p ON oi.product_id = p.id;`
              },
              quiz: {
                question: 'Is there a hard limit to how many tables you can join in a single query?',
                options: ['Yes, max 3', 'Yes, max 10', 'No, you can chain as many joins as system resources allow', 'Yes, only 2 tables'],
                correct: 2,
                explanation: 'You can join as many tables as needed in a single query, limited only by your database limits and server resources.'
              }
            },
            {
              id: 'sql_s4c3l2',
              type: 'challenge',
              title: 'Three-Table Join',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Write a query to retrieve the student `name`, the `course_name` they enrolled in, and the `grade` from the three tables. Join them using `student_id` and `course_id`.',
                starterCode: '-- Join students, enrollments, and courses\n',
                setupSQL: `CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE courses (id INTEGER PRIMARY KEY, course_name TEXT);
CREATE TABLE enrollments (student_id INTEGER, course_id INTEGER, grade TEXT);
INSERT INTO students VALUES (1, 'Alice');
INSERT INTO students VALUES (2, 'Bob');
INSERT INTO courses VALUES (101, 'SQL 101');
INSERT INTO courses VALUES (102, 'Python 101');
INSERT INTO enrollments VALUES (1, 101, 'A');
INSERT INTO enrollments VALUES (2, 102, 'B');`,
                hints: [
                  'Start with FROM students',
                  'JOIN enrollments ON students.id = enrollments.student_id',
                  'JOIN courses ON enrollments.course_id = courses.id',
                  'Solution: SELECT students.name, courses.course_name, enrollments.grade FROM students JOIN enrollments ON students.id = enrollments.student_id JOIN courses ON enrollments.course_id = courses.id;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'name|course_name|grade\nAlice|SQL 101|A\nBob|Python 101|B' }
                ]
              }
            },
            {
              id: 'sql_s4c3l3',
              type: 'theory',
              title: 'Self JOIN',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'A self join is a regular join in which a table is joined with itself. Table aliases are mandatory to distinguish columns.',
                content: `A **Self JOIN** is used when a table contains hierarchical relationships within itself.
For example, an \`employees\` table might have a column \`manager_id\` that references the \`id\` of another employee in the *same* table.

To perform a self join, you must reference the table twice in the query and assign different **table aliases** to distinguish between the two roles.`,
                codeExample: `-- Join employee table to itself\nSELECT e.name AS employee, m.name AS manager\nFROM employees e\nJOIN employees m ON e.manager_id = m.id;`
              },
              quiz: {
                question: 'Why are table aliases required in a self join?',
                options: ['To speed up database search', 'To distinguish between the two instances of the same table', 'To prevent database deletion', 'They are not required'],
                correct: 1,
                explanation: 'Table aliases are mandatory in self joins so the database engine knows which copy of the table you are referring to in column selections and join filters.'
              }
            },
            {
              id: 'sql_s4c3l4',
              type: 'challenge',
              title: 'Self Join Query',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Write a query to retrieve the employee `name` and their manager\'s name (aliased as `manager_name`) from the `employees` table. Use a Self Join.',
                starterCode: '-- Self join employees table\n',
                setupSQL: `CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, manager_id INTEGER);
INSERT INTO employees VALUES (1, 'Alice', NULL);
INSERT INTO employees VALUES (2, 'Bob', 1);
INSERT INTO employees VALUES (3, 'Charlie', 1);`,
                hints: [
                  'Alias the employee instance as e, and manager instance as m',
                  'Use: FROM employees e JOIN employees m ON e.manager_id = m.id',
                  'Select e.name and m.name AS manager_name',
                  'Solution: SELECT e.name, m.name AS manager_name FROM employees e JOIN employees m ON e.manager_id = m.id;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'name|manager_name\nBob|Alice\nCharlie|Alice' }
                ]
              }
            },
            {
              id: 'sql_s4c3l5',
              type: 'quiz',
              title: 'Joins Mastery Quiz',
              xp: 5,
              difficulty: 'medium',
              quiz: {
                question: 'Which type of join would you use to generate all possible combinations of rows from two tables?',
                options: ['INNER JOIN', 'LEFT JOIN', 'CROSS JOIN (Cartesian Product)', 'Self JOIN'],
                correct: 2,
                explanation: 'A CROSS JOIN returns the Cartesian product of the two tables, joining every row of the first table with every row of the second table.'
              }
            }
          ]
        }
      ]
    },

    // =============================================
    // SECTION 5: SUBQUERIES & CTES
    // =============================================
    {
      id: 'sql_s5',
      title: 'Subqueries & CTEs',
      icon: 'git-branch',
      description: 'Write nested queries and use Common Table Expressions to structure complex operations',
      chapters: [
        {
          id: 'sql_s5c1',
          title: 'Subqueries',
          lessons: [
            {
              id: 'sql_s5c1l1',
              type: 'theory',
              title: 'What are Subqueries?',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'A subquery is a query nested inside another SQL statement. It is enclosed in parentheses.',
                content: `A **subquery** (or inner query) is a query nested inside another query (the outer query). Subqueries can be used in the SELECT, FROM, WHERE, and HAVING clauses of a SQL statement.

Subqueries are executed first, and their results are passed to the outer query.

Common uses of subqueries:
1. Finding records that are above/below an average value.
2. Checking if a value exists in another dataset using \`IN\` or \`EXISTS\`.`,
                codeExample: `-- Subquery in WHERE\nSELECT name FROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees);`
              },
              quiz: {
                question: 'Which query executes first in a query containing a subquery?',
                options: ['The outer query', 'The subquery (inner query)', 'They execute concurrently', 'Depends on database size'],
                correct: 1,
                explanation: 'The subquery is executed first, and its result is used by the outer query to complete the execution.'
              }
            },
            {
              id: 'sql_s5c1l2',
              type: 'challenge',
              title: 'Subquery in WHERE',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Write a query to select the `name` and `price` of products from the `products` table that cost more than the average price of all products.',
                starterCode: '-- Select products priced above average\n',
                setupSQL: `CREATE TABLE products (id INTEGER, name TEXT, price INTEGER);
INSERT INTO products VALUES (1, 'Laptop', 1200);
INSERT INTO products VALUES (2, 'Keyboard', 80);
INSERT INTO products VALUES (3, 'Monitor', 500);
INSERT INTO products VALUES (4, 'Mouse', 20);`,
                hints: [
                  'First, write a subquery to calculate the average price: (SELECT AVG(price) FROM products)',
                  'Put this subquery in the WHERE clause: WHERE price > (subquery)',
                  'Solution: SELECT name, price FROM products WHERE price > (SELECT AVG(price) FROM products);'
                ],
                testCases: [
                  { input: '', expectedOutput: 'name|price\nLaptop|1200\nMonitor|500' }
                ]
              }
            },
            {
              id: 'sql_s5c1l3',
              type: 'theory',
              title: 'Subqueries in FROM & SELECT',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'Nested queries can behave as virtual tables in FROM, or calculate single values in SELECT.',
                content: `Subqueries can be placed in other parts of a query:
- **In SELECT**: Calculates a single scalar value for every row returned.
- **In FROM**: Behaves as a temporary table (also called a derived table). When used in FROM, you must give the subquery an alias.`,
                codeExample: `-- Subquery in SELECT\nSELECT name, (SELECT AVG(salary) FROM employees) AS company_avg FROM employees;\n\n-- Subquery in FROM\nSELECT dept_id FROM (SELECT dept_id, COUNT(*) AS cnt FROM employees GROUP BY dept_id) WHERE cnt > 5;`
              },
              quiz: {
                question: 'What is required when a subquery is placed in the FROM clause?',
                options: ['It must contain a WHERE clause', 'An alias name must be given to the subquery', 'It must return a single row', 'It cannot use joins'],
                correct: 1,
                explanation: 'A subquery in the FROM clause acts as a temporary table and must be given a table alias so it can be referenced.'
              }
            },
            {
              id: 'sql_s5c1l4',
              type: 'challenge',
              title: 'Subquery in SELECT',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'For each employee, retrieve their `name`, `salary`, and the difference between their salary and the highest salary in the table (aliased as `diff_from_max`). Use a subquery in the SELECT clause.',
                starterCode: '-- Select name, salary, and (MAX(salary) - salary)\n',
                setupSQL: `CREATE TABLE employees (id INTEGER, name TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, 'Alice', 80000);
INSERT INTO employees VALUES (2, 'Bob', 60000);
INSERT INTO employees VALUES (3, 'Carol', 95000);`,
                hints: [
                  'Calculate: (SELECT MAX(salary) FROM employees) - salary',
                  'Alias the result column as diff_from_max',
                  'Solution: SELECT name, salary, (SELECT MAX(salary) FROM employees) - salary AS diff_from_max FROM employees;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'name|salary|diff_from_max\nAlice|80000|15000\nBob|60000|35000\nCarol|95000|0' }
                ]
              }
            }
          ]
        },
        {
          id: 'sql_s5c2',
          title: 'Common Table Expressions',
          lessons: [
            {
              id: 'sql_s5c2l1',
              type: 'theory',
              title: 'Introduction to CTEs',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'Common Table Expressions (CTEs) define temporary result sets using the WITH keyword, making complex queries readable.',
                content: `A **Common Table Expression (CTE)** is a temporary result set that you can reference within a SELECT, INSERT, UPDATE, or DELETE statement.

CTEs are defined at the start of a query using the \`WITH\` keyword.

They serve the same purpose as subqueries in the FROM clause, but are much easier to write, read, and maintain because they are defined separately at the top rather than nested deep inside the query.`,
                codeExample: `-- Basic CTE syntax\nWITH dept_avg AS (\n  SELECT dept_id, AVG(salary) AS avg_sal FROM employees GROUP BY dept_id\n)\nSELECT * FROM dept_avg WHERE avg_sal > 50000;`
              },
              quiz: {
                question: 'Which keyword starts a Common Table Expression?',
                options: ['CTE', 'WITH', 'DEFINE', 'DECLARE'],
                correct: 1,
                explanation: 'A CTE always begins with the WITH keyword, followed by the alias and query definition.'
              }
            },
            {
              id: 'sql_s5c2l2',
              type: 'challenge',
              title: 'Basic CTE',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Write a CTE called `high_earners` that selects all columns from `employees` where `salary > 70000`. Then, in your main query, select `name` and `salary` from the `high_earners` CTE.',
                starterCode: '-- Write high_earners CTE and select from it\n',
                setupSQL: `CREATE TABLE employees (id INTEGER, name TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, 'Alice', 80000);
INSERT INTO employees VALUES (2, 'Bob', 60000);
INSERT INTO employees VALUES (3, 'Carol', 90000);`,
                hints: [
                  'Define CTE: WITH high_earners AS (SELECT * FROM employees WHERE salary > 70000)',
                  'Write main query: SELECT name, salary FROM high_earners',
                  'Solution: WITH high_earners AS (SELECT * FROM employees WHERE salary > 70000) SELECT name, salary FROM high_earners;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'name|salary\nAlice|80000\nCarol|90000' }
                ]
              }
            },
            {
              id: 'sql_s5c2l3',
              type: 'theory',
              title: 'Multiple CTEs',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'You can define multiple CTEs in a single WITH clause by separating them with commas.',
                content: `For highly complex queries, you can chain multiple CTEs together. You write the \`WITH\` keyword only once, and define subsequent CTEs separated by commas.

Each CTE can reference any previously defined CTE. This allows you to build complex multi-stage data pipelines in a modular, readable way.`,
                codeExample: `-- Define multiple CTEs\nWITH\ncte1 AS (SELECT * FROM t1),\ncte2 AS (SELECT * FROM cte1 JOIN t2 ON ...)\nSELECT * FROM cte2;`
              },
              quiz: {
                question: 'Can a CTE reference a previously defined CTE in the same WITH statement?',
                options: ['Yes, absolutely', 'No, they are isolated', 'Only in SQL Server', 'Only if they have the same columns'],
                correct: 0,
                explanation: 'Yes, a CTE can reference any CTE defined before it in the same query.'
              }
            },
            {
              id: 'sql_s5c2l4',
              type: 'challenge',
              title: 'Multiple CTEs',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Create two CTEs:\n1. \`sales_dept\` selecting \`id\` from \`departments\` where \`dept_name = \'Sales\'\`\n2. \`sales_staff\` selecting \`name\`, \`salary\` from \`employees\` where \`dept_id\` is in \`sales_dept\`\n\nFinally, select all columns from \`sales_staff\`.',
                starterCode: '-- Define multiple CTEs and query final output\n',
                setupSQL: `CREATE TABLE departments (id INTEGER, dept_name TEXT);
CREATE TABLE employees (id INTEGER, name TEXT, salary INTEGER, dept_id INTEGER);
INSERT INTO departments VALUES (1, 'Sales');
INSERT INTO departments VALUES (2, 'HR');
INSERT INTO employees VALUES (101, 'Alice', 60000, 1);
INSERT INTO employees VALUES (102, 'Bob', 50000, 2);
INSERT INTO employees VALUES (103, 'Charlie', 75000, 1);`,
                hints: [
                  'Use comma to separate CTEs: WITH sales_dept AS (...), sales_staff AS (...)',
                  'Refer to sales_dept in sales_staff using a subquery or JOIN',
                  'Solution: WITH sales_dept AS (SELECT id FROM departments WHERE dept_name = \'Sales\'), sales_staff AS (SELECT name, salary FROM employees WHERE dept_id IN (SELECT id FROM sales_dept)) SELECT * FROM sales_staff;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'name|salary\nAlice|60000\nCharlie|75000' }
                ]
              }
            }
          ]
        },
        {
          id: 'sql_s5c3',
          title: 'Advanced CTEs & Subqueries',
          lessons: [
            {
              id: 'sql_s5c3l1',
              type: 'theory',
              title: 'Recursive CTEs',
              xp: 10,
              difficulty: 'hard',
              theory: {
                tldr: 'Recursive CTEs reference themselves and are used to traverse hierarchical data like org charts or graphs.',
                content: `A **recursive CTE** references itself. It is composed of three parts:
1. **Anchor member**: A query that returns the starting point of the recursion.
2. **Recursive member**: A query that references the CTE itself and joins it with the anchor or underlying tables.
3. **Termination condition**: Implicitly defined when the recursive member returns no rows.

They are defined using \`WITH RECURSIVE\` (required in SQLite and PostgreSQL). They are ideal for representing tree structures, directories, or calculating fibonacci sequences.`,
                codeExample: `-- Generate numbers 1 to 5\nWITH RECURSIVE count_to_five(n) AS (\n  SELECT 1 -- Anchor\n  UNION ALL\n  SELECT n + 1 FROM count_to_five WHERE n < 5 -- Recursive member\n)\nSELECT * FROM count_to_five;`
              },
              quiz: {
                question: 'Which keyword is required to create a self-referencing CTE in SQLite?',
                options: ['ITERATIVE', 'RECURSIVE', 'SELF', 'LOOP'],
                correct: 1,
                explanation: 'The RECURSIVE keyword must be appended to WITH to enable recursive queries.'
              }
            },
            {
              id: 'sql_s5c3l2',
              type: 'challenge',
              title: 'Recursive CTE Challenge',
              xp: 20,
              difficulty: 'hard',
              challenge: {
                description: 'Write a recursive CTE named `numbers` that generates integers starting from `10` down to `1` (inclusive) in descending order.',
                starterCode: '-- Write a recursive CTE to count down from 10 to 1\n',
                setupSQL: '',
                hints: [
                  'Use WITH RECURSIVE numbers(val) AS (...)',
                  'Anchor: SELECT 10',
                  'Recursive part: SELECT val - 1 FROM numbers WHERE val > 1',
                  'Solution: WITH RECURSIVE numbers(val) AS (SELECT 10 UNION ALL SELECT val - 1 FROM numbers WHERE val > 1) SELECT * FROM numbers;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'val\n10\n9\n8\n7\n6\n5\n4\n3\n2\n1' }
                ]
              }
            },
            {
              id: 'sql_s5c3l3',
              type: 'theory',
              title: 'Correlated Subqueries',
              xp: 10,
              difficulty: 'hard',
              theory: {
                tldr: 'A correlated subquery is a subquery that uses values from the outer query. It executes once for each row in the outer query.',
                content: `Unlike regular subqueries, a **correlated subquery** refers to a column of the outer query. This makes the subquery dependent on the outer query's row context.

Because the subquery must run repeatedly for every row processed by the outer query, correlated subqueries can be slow on large tables.

Typical use case: finding employees who earn more than the average salary *of their specific department*.`,
                codeExample: `-- Find employees earning above their dept average\nSELECT e1.name, e1.salary, e1.dept_id\nFROM employees e1\nWHERE e1.salary > (\n  SELECT AVG(e2.salary) FROM employees e2 WHERE e2.dept_id = e1.dept_id\n);`
              },
              quiz: {
                question: 'How many times is a correlated subquery executed compared to a non-correlated subquery?',
                options: ['Just once', 'Once for each row in the outer query', 'Twice', 'Depends on joins'],
                correct: 1,
                explanation: 'A correlated subquery executes once for each row evaluated by the outer query, making it potentially resource-intensive.'
              }
            },
            {
              id: 'sql_s5c3l4',
              type: 'challenge',
              title: 'Correlated Subquery',
              xp: 20,
              difficulty: 'hard',
              challenge: {
                description: 'Write a query to retrieve the `id`, `name`, and `score` from the `students` table of students who scored higher than the average score of their own `class_id`.',
                starterCode: '-- Write a correlated subquery\n',
                setupSQL: `CREATE TABLE students (id INTEGER, name TEXT, class_id INTEGER, score INTEGER);
INSERT INTO students VALUES (1, 'Alice', 101, 85);
INSERT INTO students VALUES (2, 'Bob', 101, 75);
INSERT INTO students VALUES (3, 'Charlie', 102, 92);
INSERT INTO students VALUES (4, 'David', 102, 80);`,
                hints: [
                  'Assign alias s1 to the outer students table',
                  'In the WHERE clause, filter: score > (subquery calculating average score for s2.class_id = s1.class_id)',
                  'Solution: SELECT s1.id, s1.name, s1.score FROM students s1 WHERE s1.score > (SELECT AVG(s2.score) FROM students s2 WHERE s2.class_id = s1.class_id);'
                ],
                testCases: [
                  { input: '', expectedOutput: 'id|name|score\n1|Alice|85\n3|Charlie|92' }
                ]
              }
            }
          ]
        }
      ]
    },

    // =============================================
    // SECTION 6: DATA MODIFICATION
    // =============================================
    {
      id: 'sql_s6',
      title: 'Data Modification',
      icon: 'terminal',
      description: 'Add new data, update existing records, and delete information safely',
      chapters: [
        {
          id: 'sql_s6c1',
          title: 'INSERT Statements',
          lessons: [
            {
              id: 'sql_s6c1l1',
              type: 'theory',
              title: 'The INSERT INTO Statement',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Use INSERT INTO to add rows to a table: INSERT INTO table (col1, col2) VALUES (val1, val2);',
                content: `So far, you have only read data. Now let's modify tables. The \`INSERT INTO\` statement is used to insert new rows of data into a table.

You specify the table name, the columns you want to populate in parentheses, and the corresponding values after the \`VALUES\` keyword.

If you are inserting values for **all** columns in the table in the exact order they are defined in the schema, you can omit the column names. However, listing columns explicitly is best practice to avoid future query breakage if the table schema changes.`,
                codeExample: `-- Insert with columns specified\nINSERT INTO employees (id, name, salary) VALUES (4, 'David', 72000);`
              },
              quiz: {
                question: 'What happens if you insert a row but omit a column that does not have a DEFAULT value and is defined as NOT NULL?',
                options: ['It inserts NULL', 'The database returns an error and rejects the insert', 'It inserts 0', 'It inserts a blank space'],
                correct: 1,
                explanation: 'If a column is defined as NOT NULL and has no default value, omitting it in an INSERT statement violates the constraint, causing an error.'
              }
            },
            {
              id: 'sql_s6c1l2',
              type: 'challenge',
              title: 'Single Row Insert',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Insert a new product into the `products` table. Use these values:\n`id: 4`, `name: \'Tablet\'`, `price: 450`.\nThen, select all columns from the table to verify.',
                starterCode: '-- Insert row then SELECT * FROM products\n',
                setupSQL: `CREATE TABLE products (id INTEGER, name TEXT, price INTEGER);
INSERT INTO products VALUES (1, 'Laptop', 1200);
INSERT INTO products VALUES (2, 'Keyboard', 80);
INSERT INTO products VALUES (3, 'Monitor', 300);`,
                hints: [
                  'Write the INSERT statement first, followed by a semicolon',
                  'INSERT INTO products (id, name, price) VALUES (4, \'Tablet\', 450);',
                  'On the next line, write: SELECT * FROM products;',
                  'Solution: INSERT INTO products (id, name, price) VALUES (4, \'Tablet\', 450); SELECT * FROM products;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'id|name|price\n1|Laptop|1200\n2|Keyboard|80\n3|Monitor|300\n4|Tablet|450' }
                ]
              }
            },
            {
              id: 'sql_s6c1l3',
              type: 'theory',
              title: 'Inserting Multiple Rows',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Insert multiple rows at once by separating value sets with commas: INSERT INTO table VALUES (...), (...);',
                content: `To insert multiple records, you do not need to write multiple \`INSERT\` statements.

You can combine them into a single query by specifying a single \`INSERT INTO\` clause and listing the value sets separated by commas. This is faster and uses less database overhead.`,
                codeExample: `-- Insert three employees at once\nINSERT INTO employees (name, salary) VALUES \n  ('Alice', 80000),\n  ('Bob', 65000),\n  ('Charlie', 70000);`
              },
              quiz: {
                question: 'Which character separates sets of values in a multi-row INSERT statement?',
                options: ['Semicolon (;)', 'Comma (,)', 'Slash (/)', 'Pipe (|)'],
                correct: 1,
                explanation: 'Comma (,) is used to separate value lists in a single INSERT statement.'
              }
            },
            {
              id: 'sql_s6c1l4',
              type: 'challenge',
              title: 'Multi-Row Insert',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Insert two new categories into the `categories` table in a single query:\n1. `id: 3`, `name: \'Kitchen\'`\n2. `id: 4`, `name: \'Garden\'`\nThen, SELECT all columns from `categories`.',
                starterCode: '-- Insert two rows then SELECT * FROM categories\n',
                setupSQL: `CREATE TABLE categories (id INTEGER PRIMARY KEY, name TEXT);
INSERT INTO categories VALUES (1, 'Electronics');
INSERT INTO categories VALUES (2, 'Furniture');`,
                hints: [
                  'Write VALUES (3, \'Kitchen\'), (4, \'Garden\')',
                  'Solution: INSERT INTO categories VALUES (3, \'Kitchen\'), (4, \'Garden\'); SELECT * FROM categories;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'id|name\n1|Electronics\n2|Furniture\n3|Kitchen\n4|Garden' }
                ]
              }
            }
          ]
        },
        {
          id: 'sql_s6c2',
          title: 'UPDATE & DELETE',
          lessons: [
            {
              id: 'sql_s6c2l1',
              type: 'theory',
              title: 'The UPDATE Statement',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'Use UPDATE to modify existing records: UPDATE table SET col = val WHERE condition;',
                content: `To edit existing data in a table, use the \`UPDATE\` statement. You specify the table, the columns to modify using \`SET\`, and a \`WHERE\` clause.

> [!WARNING]
> Always include a \`WHERE\` clause in your \`UPDATE\` statements! If you omit the \`WHERE\` clause, **every single row** in the table will be updated with the new value.`,
                codeExample: `-- Give Alice a raise\nUPDATE employees SET salary = 90000 WHERE name = 'Alice';`
              },
              quiz: {
                question: 'What happens if you run an UPDATE query without a WHERE clause?',
                options: ['Nothing, it fails', 'Only the first record is updated', 'Every record in the table is updated', 'It deletes the table'],
                correct: 2,
                explanation: 'Without a WHERE filter, the UPDATE statement applies the SET modifications to all records in the table.'
              }
            },
            {
              id: 'sql_s6c2l2',
              type: 'challenge',
              title: 'Updating Data',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Update the `products` table. Change the `price` of the product with `id = 2` to `95`. Then, SELECT all columns from `products`.',
                starterCode: '-- Update price and select products\n',
                setupSQL: `CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER);
INSERT INTO products VALUES (1, 'Laptop', 1200);
INSERT INTO products VALUES (2, 'Keyboard', 80);`,
                hints: [
                  'UPDATE products SET price = 95 WHERE id = 2;',
                  'Don\'t forget the WHERE clause!',
                  'Solution: UPDATE products SET price = 95 WHERE id = 2; SELECT * FROM products;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'id|name|price\n1|Laptop|1200\n2|Keyboard|95' }
                ]
              }
            },
            {
              id: 'sql_s6c2l3',
              type: 'theory',
              title: 'The DELETE Statement',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'Use DELETE FROM to remove rows from a table: DELETE FROM table WHERE condition;',
                content: `The \`DELETE\` statement removes rows from a table.

> [!WARNING]
> Just like UPDATE, always include a \`WHERE\` clause in your \`DELETE\` statements! If you omit the \`WHERE\` clause, **all records** will be deleted from the table, leaving it completely empty.`,
                codeExample: `-- Remove employees who have resigned\nDELETE FROM employees WHERE status = 'Resigned';`
              },
              quiz: {
                question: 'What is the correct syntax to delete all employees named Bob?',
                options: ['REMOVE FROM employees WHERE name = "Bob"', 'DELETE name FROM employees WHERE name = "Bob"', 'DELETE FROM employees WHERE name = \'Bob\'', 'DROP Bob FROM employees'],
                correct: 2,
                explanation: 'The correct syntax is: DELETE FROM table_name WHERE condition.'
              }
            },
            {
              id: 'sql_s6c2l4',
              type: 'challenge',
              title: 'Deleting Data',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Delete the employee with `id = 1` from the `employees` table. Then, SELECT all columns to verify.',
                starterCode: '-- Delete employee id 1 and select all\n',
                setupSQL: `CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT);
INSERT INTO employees VALUES (1, 'Alice');
INSERT INTO employees VALUES (2, 'Bob');`,
                hints: [
                  'DELETE FROM employees WHERE id = 1;',
                  'Run: SELECT * FROM employees;',
                  'Solution: DELETE FROM employees WHERE id = 1; SELECT * FROM employees;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'id|name\n2|Bob' }
                ]
              }
            }
          ]
        },
        {
          id: 'sql_s6c3',
          title: 'Upsert & Safe Modification',
          lessons: [
            {
              id: 'sql_s6c3l1',
              type: 'theory',
              title: 'UPSERT (INSERT ON CONFLICT)',
              xp: 10,
              difficulty: 'hard',
              theory: {
                tldr: 'An UPSERT inserts a row if it doesn\'t exist, or updates it if a key conflict occurs.',
                content: `An **UPSERT** (a portmanteau of "UPDATE" and "INSERT") is a feature that allows a database to atomically insert a row, or, if the row already exists (violates a unique constraint), update the existing row instead.

In SQLite (and PostgreSQL), this is achieved using the \`ON CONFLICT\` clause inside an \`INSERT INTO\` statement.

This avoids having to query the database first to check if a record exists before deciding whether to perform an INSERT or an UPDATE.`,
                codeExample: `-- Insert product, if id exists, update price\nINSERT INTO products (id, name, price)\nVALUES (2, 'Keyboard', 90)\nON CONFLICT(id) DO UPDATE SET price = excluded.price;`
              },
              quiz: {
                question: 'What does the keyword "excluded" represent in an ON CONFLICT clause?',
                options: ['Deleted records', 'The new values you attempted to insert', 'Rows that matched the filter', 'Invalid values'],
                correct: 1,
                explanation: 'The "excluded" table refers to the row values that you proposed to insert but caused a conflict.'
              }
            },
            {
              id: 'sql_s6c3l2',
              type: 'challenge',
              title: 'Performing UPSERT',
              xp: 20,
              difficulty: 'hard',
              challenge: {
                description: 'Insert or update a user\'s score in `scores`. Attempt to insert `(1, \'Alice\', 150)`. If a conflict on `id` occurs, update the `score` to `150`. Then, SELECT all columns.',
                starterCode: '-- Write UPSERT statement then select\n',
                setupSQL: `CREATE TABLE scores (id INTEGER PRIMARY KEY, name TEXT, score INTEGER);
INSERT INTO scores VALUES (1, 'Alice', 100);
INSERT INTO scores VALUES (2, 'Bob', 120);`,
                hints: [
                  'Use INSERT INTO scores (id, name, score) VALUES (1, \'Alice\', 150)',
                  'Add ON CONFLICT(id) DO UPDATE SET score = excluded.score;',
                  'Solution: INSERT INTO scores (id, name, score) VALUES (1, \'Alice\', 150) ON CONFLICT(id) DO UPDATE SET score = excluded.score; SELECT * FROM scores;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'id|name|score\n1|Alice|150\n2|Bob|120' }
                ]
              }
            },
            {
              id: 'sql_s6c3l3',
              type: 'theory',
              title: 'TRUNCATE vs DELETE',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'TRUNCATE removes all rows rapidly by deallocating data pages, whereas DELETE removes rows one by one.',
                content: `To delete all rows in a table:
- \`DELETE FROM table_name;\` deletes rows one-by-one and logs each deletion (which is slow for large tables).
- \`TRUNCATE TABLE table_name;\` deallocates the table's storage, instantly removing all rows. It is much faster and uses fewer resources.

*Note on SQLite:* SQLite does not have a \`TRUNCATE\` command. Instead, SQLite automatically optimizes \`DELETE FROM table\` to instantly truncate the file if there is no \`WHERE\` clause.`,
                codeExample: `-- Rapid empty table in standard databases\nTRUNCATE TABLE logs;`
              },
              quiz: {
                question: 'Which statement is generally faster to empty a table containing millions of rows?',
                options: ['DELETE FROM', 'TRUNCATE TABLE', 'DROP TABLE', 'ALTER TABLE'],
                correct: 1,
                explanation: 'TRUNCATE TABLE is faster because it deallocates the data storage directly rather than deleting rows one by one.'
              }
            },
            {
              id: 'sql_s6c3l4',
              type: 'challenge',
              title: 'Safe Deletions',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Write a query to empty all records from the `logs` table in SQLite. Then SELECT all columns.',
                starterCode: '-- Delete all logs and select\n',
                setupSQL: `CREATE TABLE logs (id INTEGER PRIMARY KEY, log_text TEXT);
INSERT INTO logs VALUES (1, 'User logged in');
INSERT INTO logs VALUES (2, 'Error connecting to DB');`,
                hints: [
                  'Use DELETE FROM logs;',
                  'Then run: SELECT * FROM logs;',
                  'Solution: DELETE FROM logs; SELECT * FROM logs;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'id|log_text' }
                ]
              }
            }
          ]
        }
      ]
    },

    // =============================================
    // SECTION 7: TABLE DESIGN
    // =============================================
    {
      id: 'sql_s7',
      title: 'Table Design',
      icon: 'shield',
      description: 'Define database schemas, enforce rules with constraints, and alter structures',
      chapters: [
        {
          id: 'sql_s7c1',
          title: 'CREATE TABLE',
          lessons: [
            {
              id: 'sql_s7c1l1',
              type: 'theory',
              title: 'Schema Design & Constraints',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Use CREATE TABLE to define a new table and specify column names, data types, and constraints.',
                content: `Before you can store data, you must design the structure (schema) of the table.

The \`CREATE TABLE\` statement specifies:
1. The table name.
2. The name of each column.
3. The data type of each column.
4. Optional constraints (rules like NOT NULL, UNIQUE).`,
                codeExample: `-- Create a basic table\nCREATE TABLE members (\n  id INTEGER PRIMARY KEY,\n  username TEXT NOT NULL\n);`
              },
              quiz: {
                question: 'What is a database schema?',
                options: ['The queries written by users', 'The logical design and structure of the database tables', 'The server hosting the database', 'The security backup files'],
                correct: 1,
                explanation: 'A database schema is the formal structure definition of tables, columns, types, and constraints.'
              }
            },
            {
              id: 'sql_s7c1l2',
              type: 'challenge',
              title: 'Create Basic Table',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Write a statement to create a table named `tasks` with two columns:\n1. `id` (integer datatype, primary key)\n2. `title` (text datatype, cannot be null)\n\nThen, write a SELECT query to query the schema from sqlite_master to verify: `SELECT name, tbl_name FROM sqlite_master WHERE type=\'table\' AND name=\'tasks\';`',
                starterCode: '-- Create table tasks then select schema details\n',
                setupSQL: '',
                hints: [
                  'CREATE TABLE tasks (id INTEGER PRIMARY KEY, title TEXT NOT NULL);',
                  'Then write the SELECT statement',
                  'Solution: CREATE TABLE tasks (id INTEGER PRIMARY KEY, title TEXT NOT NULL); SELECT name, tbl_name FROM sqlite_master WHERE type=\'table\' AND name=\'tasks\';'
                ],
                testCases: [
                  { input: '', expectedOutput: 'name|tbl_name\ntasks|tasks' }
                ]
              }
            },
            {
              id: 'sql_s7c1l3',
              type: 'theory',
              title: 'SQL Data Types',
              xp: 10,
              difficulty: 'easy',
              theory: {
                tldr: 'Common data types include INTEGER (whole numbers), REAL (floats), TEXT (strings), and BLOB (binary).',
                content: `Database systems support different data types:
- **INTEGER / INT**: Whole numbers.
- **REAL / DOUBLE / FLOAT**: Decimal numbers.
- **TEXT / VARCHAR(n)**: Character text.
- **BLOB**: Binary Large Objects (e.g. files, images).
- **DATE / TIMESTAMP**: Calendar date and time values.

Choosing the correct data type optimizes index storage and ensures data integrity.`,
                codeExample: `-- Create table with float and text types\nCREATE TABLE products (\n  id INTEGER,\n  price REAL,\n  name TEXT\n);`
              },
              quiz: {
                question: 'Which datatype should you choose to store floating-point decimal prices?',
                options: ['INTEGER', 'REAL', 'BLOB', 'TEXT'],
                correct: 1,
                explanation: 'REAL (or FLOAT/NUMERIC/DECIMAL) is used to store decimal values.'
              }
            },
            {
              id: 'sql_s7c1l4',
              type: 'challenge',
              title: 'CREATE TABLE with Data Types',
              xp: 20,
              difficulty: 'easy',
              challenge: {
                description: 'Create a table named `items` with columns:\n- `id` (INTEGER)\n- `weight` (REAL)\n- `sku` (TEXT)\n\nThen, query sqlite_master to verify: `SELECT name FROM sqlite_master WHERE type=\'table\' AND name=\'items\';`',
                starterCode: '-- Create table items and query schema\n',
                setupSQL: '',
                hints: [
                  'CREATE TABLE items (id INTEGER, weight REAL, sku TEXT);',
                  'Solution: CREATE TABLE items (id INTEGER, weight REAL, sku TEXT); SELECT name FROM sqlite_master WHERE type=\'table\' AND name=\'items\';'
                ],
                testCases: [
                  { input: '', expectedOutput: 'name\nitems' }
                ]
              }
            }
          ]
        },
        {
          id: 'sql_s7c2',
          title: 'Keys & Constraints',
          lessons: [
            {
              id: 'sql_s7c2l1',
              type: 'theory',
              title: 'Primary & Foreign Keys',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'Primary Key uniquely identifies a row. Foreign Key establishes a link to a primary key in another table.',
                content: `Constraints enforce rules on table columns:
- **PRIMARY KEY**: Uniquely identifies each record. It must contain unique values and cannot contain NULL.
- **FOREIGN KEY**: Links a column in one table to the Primary Key of another table. This enforces **referential integrity**, ensuring you cannot add a record with a non-existent parent key.`,
                codeExample: `-- Define foreign key constraint\nCREATE TABLE orders (\n  id INTEGER PRIMARY KEY,\n  customer_id INTEGER,\n  FOREIGN KEY(customer_id) REFERENCES customers(id)\n);`
              },
              quiz: {
                question: 'What is referential integrity?',
                options: ['Making sure tables load fast', 'Ensuring foreign key values always point to valid primary keys', 'Checking user permissions', 'Creating indexes'],
                correct: 1,
                explanation: 'Referential integrity is a constraint that ensures relationships between tables remain consistent.'
              }
            },
            {
              id: 'sql_s7c2l2',
              type: 'challenge',
              title: 'Defining Keys',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Create a table named `comments` with three columns:\n- `id` (INTEGER PRIMARY KEY)\n- `post_id` (INTEGER)\n- `comment_text` (TEXT)\n- Add a FOREIGN KEY constraint on `post_id` referencing `posts(id)`.',
                starterCode: '-- Create table comments with foreign key and select table name\n',
                setupSQL: `CREATE TABLE posts (id INTEGER PRIMARY KEY, title TEXT);`,
                hints: [
                  'CREATE TABLE comments (id INTEGER PRIMARY KEY, post_id INTEGER, comment_text TEXT, FOREIGN KEY(post_id) REFERENCES posts(id));',
                  'Then query sqlite_master for table comments name.',
                  'Solution: CREATE TABLE comments (id INTEGER PRIMARY KEY, post_id INTEGER, comment_text TEXT, FOREIGN KEY(post_id) REFERENCES posts(id)); SELECT name FROM sqlite_master WHERE type=\'table\' AND name=\'comments\';'
                ],
                testCases: [
                  { input: '', expectedOutput: 'name\ncomments' }
                ]
              }
            },
            {
              id: 'sql_s7c2l3',
              type: 'theory',
              title: 'CHECK & UNIQUE',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'UNIQUE prevents duplicate values. CHECK verifies that values in a column meet specific conditions.',
                content: `Additional constraints:
- **UNIQUE**: Ensures all values in a column are distinct.
- **DEFAULT**: Specifies a fallback value if no value is provided during insert.
- **CHECK**: Ensures that the values in a column satisfy a boolean condition (e.g. \`CHECK (age >= 18)\`).`,
                codeExample: `-- Add check and unique constraints\nCREATE TABLE users (\n  id INTEGER PRIMARY KEY,\n  email TEXT UNIQUE,\n  age INTEGER CHECK(age >= 18)\n);`
              },
              quiz: {
                question: 'Which constraint ensures that a column cannot have duplicate values across rows?',
                options: ['CHECK', 'UNIQUE', 'DEFAULT', 'NOT NULL'],
                correct: 1,
                explanation: 'The UNIQUE constraint guarantees that all records store distinct values in that column.'
              }
            },
            {
              id: 'sql_s7c2l4',
              type: 'challenge',
              title: 'Unique Constraint Table',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Create a table named `users` with columns:\n- `id` (INTEGER PRIMARY KEY)\n- `email` (TEXT, unique, not null)\n- `age` (INTEGER with CHECK constraint that age must be greater than or equal to `13`)\n\nThen, query sqlite_master to verify: `SELECT name FROM sqlite_master WHERE name=\'users\';`',
                starterCode: '-- Create users table with constraints and query schema\n',
                setupSQL: '',
                hints: [
                  'CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT UNIQUE NOT NULL, age INTEGER CHECK(age >= 13));',
                  'Solution: CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT UNIQUE NOT NULL, age INTEGER CHECK(age >= 13)); SELECT name FROM sqlite_master WHERE name=\'users\';'
                ],
                testCases: [
                  { input: '', expectedOutput: 'name\nusers' }
                ]
              }
            }
          ]
        },
        {
          id: 'sql_s7c3',
          title: 'ALTER TABLE',
          lessons: [
            {
              id: 'sql_s7c3l1',
              type: 'theory',
              title: 'Altering Existing Tables',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'Use ALTER TABLE to add, rename, or drop columns of an existing table without recreating it.',
                content: `As business requirements change, you may need to modify the structure of tables that already contain data.

The \`ALTER TABLE\` statement allows you to:
- Add columns: \`ALTER TABLE table ADD COLUMN col type;\`
- Rename columns: \`ALTER TABLE table RENAME COLUMN old TO new;\`
- Rename the table itself: \`ALTER TABLE table RENAME TO new_table_name;\``,
                codeExample: `-- Add a phone number to users\nALTER TABLE users ADD COLUMN phone TEXT;`
              },
              quiz: {
                question: 'Can you use ALTER TABLE to add a column with NOT NULL constraint if the table already has data?',
                options: ['Yes, always', 'No, unless you specify a DEFAULT value', 'Only if the database is shut down', 'Yes, it fills with blank spaces'],
                correct: 1,
                explanation: 'If a table has rows, adding a NOT NULL column requires a DEFAULT value so existing rows have a value populated.'
              }
            },
            {
              id: 'sql_s7c3l2',
              type: 'challenge',
              title: 'Add and Rename Column',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Alter the `employees` table: Add a new column `notes` of type `TEXT`. Then, SELECT all columns from `employees`.',
                starterCode: '-- Alter employees table then select\n',
                setupSQL: `CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT);
INSERT INTO employees VALUES (1, 'Alice');`,
                hints: [
                  'ALTER TABLE employees ADD COLUMN notes TEXT;',
                  'Then run: SELECT * FROM employees;',
                  'Solution: ALTER TABLE employees ADD COLUMN notes TEXT; SELECT * FROM employees;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'id|name|notes\n1|Alice|NULL' }
                ]
              }
            },
            {
              id: 'sql_s7c3l3',
              type: 'theory',
              title: 'DROP TABLE',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'Use DROP TABLE to delete a table and all of its data permanently from the database.',
                content: `If a table is no longer needed, you can delete it using the \`DROP TABLE\` statement.

> [!CAUTION]
> Dropping a table is permanent. It deletes the table definition, all indexes, triggers, and every single row of data inside it. It cannot be undone.

To avoid syntax errors if a table might not exist, use \`DROP TABLE IF EXISTS table_name;\`.`,
                codeExample: `-- Remove backup table permanently\nDROP TABLE IF EXISTS old_backup_employees;`
              },
              quiz: {
                question: 'What is the main difference between DELETE FROM table and DROP TABLE?',
                options: ['There is no difference', 'DELETE removes rows but keeps the table structure; DROP deletes the rows and the table structure entirely', 'DROP only deletes indexes', 'DELETE is permanent, DROP is temporary'],
                correct: 1,
                explanation: 'DELETE empties the rows from a table but leaves the schema intact. DROP removes both the rows and the table metadata structure permanently.'
              }
            },
            {
              id: 'sql_s7c3l4',
              type: 'challenge',
              title: 'Dropping Table Elements',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Drop the table named `temp_logs` permanently. Then select all table names from `sqlite_master` where `type=\'table\'`.',
                starterCode: '-- Drop temp_logs and select remaining tables\n',
                setupSQL: `CREATE TABLE employees (id INTEGER, name TEXT);
CREATE TABLE temp_logs (id INTEGER, text TEXT);`,
                hints: [
                  'Use DROP TABLE temp_logs;',
                  'Then run: SELECT name FROM sqlite_master WHERE type=\'table\';',
                  'Solution: DROP TABLE temp_logs; SELECT name FROM sqlite_master WHERE type=\'table\';'
                ],
                testCases: [
                  { input: '', expectedOutput: 'name\nemployees' }
                ]
              }
            }
          ]
        }
      ]
    },

    // =============================================
    // SECTION 8: ADVANCED QUERIES
    // =============================================
    {
      id: 'sql_s8',
      title: 'Advanced Queries',
      icon: 'code',
      description: 'Implement conditional logic, handle missing values, and query with window functions',
      chapters: [
        {
          id: 'sql_s8c1',
          title: 'CASE Expressions',
          lessons: [
            {
              id: 'sql_s8c1l1',
              type: 'theory',
              title: 'CASE WHEN Statement',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'Use CASE WHEN to implement if-else conditional logic inside your SQL SELECT statements.',
                content: `The \`CASE\` expression is SQL's way of executing conditional "if-then-else" logic. It evaluates conditions and returns a value when the first condition is met.

Syntax:
\`\`\`sql
CASE
  WHEN condition1 THEN result1
  WHEN condition2 THEN result2
  ELSE result3
END
\`\`\`

If no conditions are true and there is no \`ELSE\` clause, it returns \`NULL\`.`,
                codeExample: `-- Categorize employee salaries\nSELECT name, salary,\n  CASE\n    WHEN salary > 80000 THEN 'High'\n    ELSE 'Standard'\n  END AS salary_class\nFROM employees;`
              },
              quiz: {
                question: 'Which keyword ends a CASE block?',
                options: ['END', 'FINISH', 'STOP', 'ELSE'],
                correct: 0,
                explanation: 'A CASE expression must always be terminated with the END keyword.'
              }
            },
            {
              id: 'sql_s8c1l2',
              type: 'challenge',
              title: 'Basic CASE',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Select the product `name`, `price`, and a calculated column named `price_category` using a `CASE` expression:\n- If price >= 100, return `\'Expensive\'`\n- Else, return `\'Cheap\'` from the `products` table.',
                starterCode: '-- Select name, price, and price_category using CASE\n',
                setupSQL: `CREATE TABLE products (id INTEGER, name TEXT, price INTEGER);
INSERT INTO products VALUES (1, 'Laptop', 1200);
INSERT INTO products VALUES (2, 'Mouse', 25);`,
                hints: [
                  'Use SELECT name, price, CASE WHEN price >= 100 THEN \'Expensive\' ELSE \'Cheap\' END AS price_category FROM products;',
                  'Solution: SELECT name, price, CASE WHEN price >= 100 THEN \'Expensive\' ELSE \'Cheap\' END AS price_category FROM products;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'name|price|price_category\nLaptop|1200|Expensive\nMouse|25|Cheap' }
                ]
              }
            },
            {
              id: 'sql_s8c1l3',
              type: 'theory',
              title: 'Searched CASE',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'Searched CASE allows comparing different columns or using complex conditions in each WHEN clause.',
                content: `There are two types of CASE expressions:
1. **Simple CASE**: Compares an expression to static values.
2. **Searched CASE**: Evaluates a list of independent boolean conditions. This is much more powerful because you can use operators (>=, LIKE, AND/OR) and compare multiple columns in each condition.`,
                codeExample: `-- Searched CASE\nSELECT name, \n  CASE\n    WHEN salary > 80000 AND dept = 'Sales' THEN 'Top Seller'\n    WHEN salary > 80000 THEN 'High Earner'\n    ELSE 'General'\n  END AS classification\nFROM employees;`
              },
              quiz: {
                question: 'Which of the following is evaluated in a CASE statement when multiple WHEN conditions are true?',
                options: ['All matching THEN results', 'Only the first matching WHEN condition', 'Only the ELSE condition', 'An error is returned'],
                correct: 1,
                explanation: 'SQL evaluates CASE expressions sequentially and returns the result of the FIRST condition that is met, ignoring subsequent matches.'
              }
            },
            {
              id: 'sql_s8c1l4',
              type: 'challenge',
              title: 'Searched CASE Query',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Write a query that displays each employee\'s `name` and a column `role_title`:\n- If `dept_id = 1` AND `salary > 70000` return `\'Senior Eng\'`\n- If `dept_id = 1` and salary <= 70000 return `\'Junior Eng\'`\n- Else return `\'Staff\'` from the `employees` table.',
                starterCode: '-- Select name and role_title\n',
                setupSQL: `CREATE TABLE employees (id INTEGER, name TEXT, dept_id INTEGER, salary INTEGER);
INSERT INTO employees VALUES (1, 'Alice', 1, 80000);
INSERT INTO employees VALUES (2, 'Bob', 1, 50000);
INSERT INTO employees VALUES (3, 'Charlie', 2, 90000);`,
                hints: [
                  'Use a searched CASE expression',
                  'WHEN dept_id = 1 AND salary > 70000 THEN \'Senior Eng\'',
                  'WHEN dept_id = 1 AND salary <= 70000 THEN \'Junior Eng\'',
                  'Solution: SELECT name, CASE WHEN dept_id = 1 AND salary > 70000 THEN \'Senior Eng\' WHEN dept_id = 1 AND salary <= 70000 THEN \'Junior Eng\' ELSE \'Staff\' END AS role_title FROM employees;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'name|role_title\nAlice|Senior Eng\nBob|Junior Eng\nCharlie|Staff' }
                ]
              }
            }
          ]
        },
        {
          id: 'sql_s8c2',
          title: 'Handling NULLs',
          lessons: [
            {
              id: 'sql_s8c2l1',
              type: 'theory',
              title: 'Working with NULL Values',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'NULL represents missing or unknown data. Always use IS NULL or IS NOT NULL to check for nulls, not = NULL.',
                content: `In SQL, \`NULL\` represents missing or unknown data. It is not equivalent to a number 0, nor is it an empty string.

Because \`NULL\` represents an "unknown" value, any comparison with \`NULL\` using normal operators (like \`= NULL\` or \`!= NULL\`) returns \`UNKNOWN\` (not true).

Therefore, you must use the special operators \`IS NULL\` and \`IS NOT NULL\` to filter for missing values.`,
                codeExample: `-- Find employees with no assigned department\nSELECT * FROM employees WHERE department_id IS NULL;`
              },
              quiz: {
                question: 'Which clause correctly finds records where the email column is missing?',
                options: ['WHERE email = NULL', 'WHERE email IS NULL', 'WHERE email IS empty', 'WHERE email = \'\''],
                correct: 1,
                explanation: 'IS NULL is the standard SQL operator used to test for missing (null) values.'
              }
            },
            {
              id: 'sql_s8c2l2',
              type: 'challenge',
              title: 'Handling NULL',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Select the `name` of all employees from the `employees` table who do NOT have a manager (i.e. `manager_id` is null).',
                starterCode: '-- Select employees with no manager\n',
                setupSQL: `CREATE TABLE employees (id INTEGER, name TEXT, manager_id INTEGER);
INSERT INTO employees VALUES (1, 'Alice', NULL);
INSERT INTO employees VALUES (2, 'Bob', 1);
INSERT INTO employees VALUES (3, 'Charlie', NULL);`,
                hints: [
                  'Use SELECT name FROM employees',
                  'Filter using: WHERE manager_id IS NULL',
                  'Solution: SELECT name FROM employees WHERE manager_id IS NULL;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'name\nAlice\nCharlie' }
                ]
              }
            },
            {
              id: 'sql_s8c2l3',
              type: 'theory',
              title: 'COALESCE & IFNULL',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'Use COALESCE() to return the first non-null value in a list of arguments, replacing nulls with default values.',
                content: `When displaying data to users, displaying "NULL" looks unprofessional. You can replace NULLs with default fallback values.

- \`COALESCE(val1, val2, ...)\` evaluates arguments in order and returns the first non-null value.
- \`IFNULL(val, default)\` is SQLite-specific and takes exactly two arguments.

For example, \`COALESCE(phone, 'No Phone')\` will return the phone number if available, otherwise it displays the text 'No Phone'.`,
                codeExample: `-- Replace null managers with 'CEO'\nSELECT name, COALESCE(manager_name, 'CEO') FROM employees;`
              },
              quiz: {
                question: 'What is returned by: COALESCE(NULL, NULL, \'Apple\', \'Banana\')?',
                options: ['NULL', 'Apple', 'Banana', 'An error'],
                correct: 1,
                explanation: 'COALESCE returns the first non-null argument, which is \'Apple\'.'
              }
            },
            {
              id: 'sql_s8c2l4',
              type: 'challenge',
              title: 'COALESCE Query',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Select the product `name` and a calculated column `discount_amount` using `COALESCE`. If `discount` is NULL, return `0` instead. Retrieve from `products`.',
                starterCode: '-- Select product name and discount amount\n',
                setupSQL: `CREATE TABLE products (id INTEGER, name TEXT, discount INTEGER);
INSERT INTO products VALUES (1, 'Laptop', NULL);
INSERT INTO products VALUES (2, 'Keyboard', 15);`,
                hints: [
                  'Use SELECT name, COALESCE(discount, 0) AS discount_amount FROM products;',
                  'Solution: SELECT name, COALESCE(discount, 0) AS discount_amount FROM products;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'name|discount_amount\nLaptop|0\nKeyboard|15' }
                ]
              }
            }
          ]
        },
        {
          id: 'sql_s8c3',
          title: 'Window Functions',
          lessons: [
            {
              id: 'sql_s8c3l1',
              type: 'theory',
              title: 'Window Functions Intro',
              xp: 10,
              difficulty: 'hard',
              theory: {
                tldr: 'Window functions perform calculations across a set of table rows that are related to the current row, without collapsing them.',
                content: `Unlike regular aggregate functions (which collapse rows into a single summary), **window functions** calculate a value for each row based on a "window" of related rows.

They use the \`OVER()\` clause to define the window:
- \`PARTITION BY\` groups rows (similar to GROUP BY, but rows are not collapsed).
- \`ORDER BY\` defines the sorting order within the window.`,
                codeExample: `-- Calculate a running total of salaries\nSELECT name, department, salary,\n  SUM(salary) OVER(ORDER BY salary) AS running_total\nFROM employees;`
              },
              quiz: {
                question: 'Do window functions collapse rows like GROUP BY does?',
                options: ['Yes, always', 'No, they retain the individuality of each row', 'Only if using SUM()', 'Only in SQL Server'],
                correct: 1,
                explanation: 'Window functions perform calculations over a set of rows but do not combine them into a single row; each individual record is preserved in the output.'
              }
            },
            {
              id: 'sql_s8c3l2',
              type: 'challenge',
              title: 'ROW_NUMBER',
              xp: 20,
              difficulty: 'hard',
              challenge: {
                description: 'Write a query that retrieves the employee `name`, `department`, `salary`, and a column `row_num` that assigns a sequential integer `1, 2, ...` to each employee partitioned by `department` and ordered by `salary` descending.',
                starterCode: '-- Select name, department, salary, and ROW_NUMBER()\n',
                setupSQL: `CREATE TABLE employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);
INSERT INTO employees VALUES (1, 'Alice', 'Eng', 80000);
INSERT INTO employees VALUES (2, 'Bob', 'Eng', 90000);
INSERT INTO employees VALUES (3, 'Charlie', 'Sales', 50000);`,
                hints: [
                  'Use ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS row_num',
                  'Solution: SELECT name, department, salary, ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS row_num FROM employees;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'name|department|salary|row_num\nBob|Eng|90000|1\nAlice|Eng|80000|2\nCharlie|Sales|50000|1' }
                ]
              }
            },
            {
              id: 'sql_s8c3l3',
              type: 'theory',
              title: 'RANK & DENSE_RANK',
              xp: 10,
              difficulty: 'hard',
              theory: {
                tldr: 'RANK skips rank numbers when ties occur, whereas DENSE_RANK assigns consecutive ranks without gaps.',
                content: `Ranking functions assign a rank to each row in a partition:
- \`ROW_NUMBER()\` : Returns a unique, sequential number (e.g. 1, 2, 3, 4).
- \`RANK()\` : Assigns ties the same rank, but skips ranks (e.g. 1, 2, 2, 4).
- \`DENSE_RANK()\` : Assigns ties the same rank, but does NOT skip ranks (e.g. 1, 2, 2, 3).`,
                codeExample: `-- Compare rank functions\nSELECT name, score,\n  RANK() OVER(ORDER BY score DESC) as rnk,\n  DENSE_RANK() OVER(ORDER BY score DESC) as drnk\nFROM scores;`
              },
              quiz: {
                question: 'If two students tie for 2nd place, what rank will the next student get using DENSE_RANK()?',
                options: ['3', '4', '2', '5'],
                correct: 0,
                explanation: 'DENSE_RANK() does not skip rank positions. After ties at rank 2, the next rank is 3.'
              }
            },
            {
              id: 'sql_s8c3l4',
              type: 'challenge',
              title: 'Rank Records',
              xp: 20,
              difficulty: 'hard',
              challenge: {
                description: 'Retrieve the `name`, `score`, and a column `dense_rnk` showing the `DENSE_RANK()` of the students ordered by `score` descending.',
                starterCode: '-- Use DENSE_RANK()\n',
                setupSQL: `CREATE TABLE students (id INTEGER, name TEXT, score INTEGER);
INSERT INTO students VALUES (1, 'Alice', 95);
INSERT INTO students VALUES (2, 'Bob', 90);
INSERT INTO students VALUES (3, 'Charlie', 90);
INSERT INTO students VALUES (4, 'David', 85);`,
                hints: [
                  'Use DENSE_RANK() OVER (ORDER BY score DESC) AS dense_rnk',
                  'Solution: SELECT name, score, DENSE_RANK() OVER (ORDER BY score DESC) AS dense_rnk FROM students;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'name|score|dense_rnk\nAlice|95|1\nBob|90|2\nCharlie|90|2\nDavid|85|3' }
                ]
              }
            },
            {
              id: 'sql_s8c3l5',
              type: 'quiz',
              title: 'Window Functions Quiz',
              xp: 5,
              difficulty: 'hard',
              quiz: {
                question: 'Which clause is mandatory for window functions to establish the group boundaries?',
                options: ['PARTITION BY', 'GROUP BY', 'OVER', 'HAVING'],
                correct: 2,
                explanation: 'A window function always requires the OVER clause to declare its execution window context.'
              }
            }
          ]
        }
      ]
    },

    // =============================================
    // SECTION 9: DATABASE MANAGEMENT
    // =============================================
    {
      id: 'sql_s9',
      title: 'Database Management',
      icon: 'settings',
      description: 'Optimize queries with indexes, simplify reports with views, and control transactions',
      chapters: [
        {
          id: 'sql_s9c1',
          title: 'Views',
          lessons: [
            {
              id: 'sql_s9c1l1',
              type: 'theory',
              title: 'Database Views',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'A View is a virtual table defined by a saved SELECT query. It does not store physical data itself.',
                content: `A **View** is a saved SQL query that acts as a virtual table. When you query a View, the database engine executes the underlying query on the fly.

Why use views?
1. **Security**: You can expose only specific columns to certain users.
2. **Simplicity**: You can save complex joins and aggregates so users can write simple SELECT queries against the view.
3. **Consistency**: Changes to the underlying tables don't break queries referencing the view if the view columns remain constant.`,
                codeExample: `-- Create a view\nCREATE VIEW staff_view AS\nSELECT id, name, department FROM employees;`
              },
              quiz: {
                question: 'Do views store duplicate copies of the table data on disk?',
                options: ['Yes, always', 'No, they are virtual tables that query the base tables on the fly', 'Only if the view contains group by', 'Only in SQLite'],
                correct: 1,
                explanation: 'Views are virtual and do not duplicate base table data on disk; they dynamically run the underlying query when requested.'
              }
            },
            {
              id: 'sql_s9c1l2',
              type: 'challenge',
              title: 'Create View',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Create a view named `eng_view` that selects `id` and `name` from `employees` where `department = \'Engineering\'`. Then select all columns from `eng_view`.',
                starterCode: '-- Create view then SELECT * FROM view\n',
                setupSQL: `CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, department TEXT);
INSERT INTO employees VALUES (1, 'Alice', 'Engineering');
INSERT INTO employees VALUES (2, 'Bob', 'Sales');`,
                hints: [
                  'CREATE VIEW eng_view AS SELECT id, name FROM employees WHERE department = \'Engineering\';',
                  'Then: SELECT * FROM eng_view;',
                  'Solution: CREATE VIEW eng_view AS SELECT id, name FROM employees WHERE department = \'Engineering\'; SELECT * FROM eng_view;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'id|name\n1|Alice' }
                ]
              }
            },
            {
              id: 'sql_s9c1l3',
              type: 'theory',
              title: 'Managing Views',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'Use DROP VIEW to delete a view, and CREATE OR REPLACE VIEW to modify it.',
                content: `If a view is no longer needed, you can delete it using the \`DROP VIEW\` statement:
\`DROP VIEW view_name;\`

To modify a view, you must drop it first, or use the \`CREATE OR REPLACE VIEW\` syntax (supported by PostgreSQL and MySQL, but SQLite requires dropping and recreating).`,
                codeExample: `-- Drop a view\nDROP VIEW IF EXISTS eng_view;`
              },
              quiz: {
                question: 'What happens to the underlying database tables when you drop a view?',
                options: ['They are also dropped', 'Nothing, only the view definition is deleted', 'They are emptied of all rows', 'An error is thrown'],
                correct: 1,
                explanation: 'Dropping a view only removes the virtual view definition; it has no effect on the underlying physical tables.'
              }
            },
            {
              id: 'sql_s9c1l4',
              type: 'challenge',
              title: 'View with Joins',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Create a view named `emp_dept_view` that selects `employees.name` (aliased as `emp_name`) and `departments.dept_name`. Join the tables. Then select all columns from `emp_dept_view`.',
                starterCode: '-- Create view with join and select from it\n',
                setupSQL: `CREATE TABLE departments (id INTEGER, dept_name TEXT);
CREATE TABLE employees (id INTEGER, name TEXT, dept_id INTEGER);
INSERT INTO departments VALUES (1, 'Engineering');
INSERT INTO employees VALUES (10, 'Alice', 1);`,
                hints: [
                  'CREATE VIEW emp_dept_view AS SELECT employees.name AS emp_name, departments.dept_name FROM employees JOIN departments ON employees.dept_id = departments.id;',
                  'Then write the SELECT query',
                  'Solution: CREATE VIEW emp_dept_view AS SELECT employees.name AS emp_name, departments.dept_name FROM employees JOIN departments ON employees.dept_id = departments.id; SELECT * FROM emp_dept_view;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'emp_name|dept_name\nAlice|Engineering' }
                ]
              }
            }
          ]
        },
        {
          id: 'sql_s9c2',
          title: 'Indexes',
          lessons: [
            {
              id: 'sql_s9c2l1',
              type: 'theory',
              title: 'Database Indexing',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'An index is a structure that speeds up data retrieval. Think of it like an index at the back of a book.',
                content: `Without an index, the database engine must scan **every single row** in a table (Full Table Scan) to find matching rows for a query. This is extremely slow for tables with millions of records.

An **Index** is a data structure (typically a B-Tree) that the database maintains to look up values rapidly.

Downsides of indexes:
1. They take up additional disk space.
2. They slow down \`INSERT\`, \`UPDATE\`, and \`DELETE\` statements because the indexes must be updated whenever the data changes.`,
                codeExample: `-- Create index on employees email\nCREATE INDEX idx_emp_email ON employees(email);`
              },
              quiz: {
                question: 'What is the primary trade-off of using database indexes?',
                options: ['Queries are slower, updates are faster', 'Queries are faster, data modifications (inserts/updates) are slower', 'Data becomes corrupted easily', 'Indexes use no memory'],
                correct: 1,
                explanation: 'Indexes speed up SELECT queries but add overhead to INSERT/UPDATE/DELETE operations because the index trees must be restructured on changes.'
              }
            },
            {
              id: 'sql_s9c2l2',
              type: 'challenge',
              title: 'Creating Indexes',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Create an index named `idx_prod_category` on the `category` column of the `products` table. Then select all index names from `sqlite_master` where `type=\'index\'`.',
                starterCode: '-- Create index then select index list\n',
                setupSQL: `CREATE TABLE products (id INTEGER, name TEXT, category TEXT);`,
                hints: [
                  'CREATE INDEX idx_prod_category ON products(category);',
                  'Then: SELECT name FROM sqlite_master WHERE type=\'index\';',
                  'Solution: CREATE INDEX idx_prod_category ON products(category); SELECT name FROM sqlite_master WHERE type=\'index\';'
                ],
                testCases: [
                  { input: '', expectedOutput: 'name\nidx_prod_category' }
                ]
              }
            },
            {
              id: 'sql_s9c2l3',
              type: 'theory',
              title: 'Unique Indexes',
              xp: 10,
              difficulty: 'medium',
              theory: {
                tldr: 'A unique index prevents duplicate values in a column, functioning both as an index and a constraint.',
                content: `A **Unique Index** serves a dual purpose. It speed up searches just like a normal index, but it also enforces a business rule: no two rows can have the same value in the indexed column.

Databases automatically create unique indexes for primary keys and columns defined with the \`UNIQUE\` constraint.`,
                codeExample: `-- Create unique index\nCREATE UNIQUE INDEX idx_user_username ON users(username);`
              },
              quiz: {
                question: 'Which of the following is automatically created when you declare a column as PRIMARY KEY?',
                options: ['A View', 'A Trigger', 'A Unique Index', 'A Foreign Key'],
                correct: 2,
                explanation: 'A unique index is automatically generated by the RDBMS to enforce the uniqueness constraint of a Primary Key.'
              }
            },
            {
              id: 'sql_s9c2l4',
              type: 'challenge',
              title: 'Multi-column Index',
              xp: 20,
              difficulty: 'medium',
              challenge: {
                description: 'Create an index named `idx_emp_dept_salary` on two columns of `employees`: `dept_id` and `salary`. Then select the index name from `sqlite_master`.',
                starterCode: '-- Create multi-column index\n',
                setupSQL: `CREATE TABLE employees (id INTEGER, name TEXT, dept_id INTEGER, salary INTEGER);`,
                hints: [
                  'Use CREATE INDEX idx_emp_dept_salary ON employees(dept_id, salary);',
                  'Solution: CREATE INDEX idx_emp_dept_salary ON employees(dept_id, salary); SELECT name FROM sqlite_master WHERE type=\'index\';'
                ],
                testCases: [
                  { input: '', expectedOutput: 'name\nidx_emp_dept_salary' }
                ]
              }
            }
          ]
        },
        {
          id: 'sql_s9c3',
          title: 'Transactions',
          lessons: [
            {
              id: 'sql_s9c3l1',
              type: 'theory',
              title: 'Transaction Control',
              xp: 10,
              difficulty: 'hard',
              theory: {
                tldr: 'A transaction is a unit of work. It is fully completed (COMMIT) or completely undone (ROLLBACK), adhering to ACID properties.',
                content: `A **transaction** is a sequence of one or more SQL statements executed as a single, atomic unit of work.

Transactions are governed by the **ACID** properties:
- **Atomicity**: "All or nothing". If one query in the transaction fails, the entire transaction is rolled back.
- **Consistency**: The database goes from one valid state to another.
- **Isolation**: Concurrent transactions do not interfere with each other.
- **Durability**: Committed changes are permanent.`,
                codeExample: `-- Transaction block\nBEGIN TRANSACTION;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;`
              },
              quiz: {
                question: 'What does the "A" in ACID stand for?',
                options: ['Accuracy', 'Access', 'Atomicity', 'Authority'],
                correct: 2,
                explanation: 'Atomicity ensures that a transaction is treated as a single, indivisible unit of work.'
              }
            },
            {
              id: 'sql_s9c3l2',
              type: 'challenge',
              title: 'COMMIT & ROLLBACK',
              xp: 20,
              difficulty: 'hard',
              challenge: {
                description: 'Start a transaction, update Alice\'s balance to `900`, but rollback the transaction. Then SELECT all columns from `accounts`.',
                starterCode: '-- Perform transaction with rollback\n',
                setupSQL: `CREATE TABLE accounts (id INTEGER, name TEXT, balance INTEGER);
INSERT INTO accounts VALUES (1, 'Alice', 1000);`,
                hints: [
                  'Use BEGIN TRANSACTION;',
                  'UPDATE accounts SET balance = 900 WHERE name = \'Alice\';',
                  'Use ROLLBACK;',
                  'Solution: BEGIN TRANSACTION; UPDATE accounts SET balance = 900 WHERE name = \'Alice\'; ROLLBACK; SELECT * FROM accounts;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'id|name|balance\n1|Alice|1000' }
                ]
              }
            },
            {
              id: 'sql_s9c3l3',
              type: 'theory',
              title: 'Isolation Levels',
              xp: 10,
              difficulty: 'hard',
              theory: {
                tldr: 'Isolation levels determine how transaction integrity is visible to other concurrent transactions.',
                content: `When multiple users read/write to a database simultaneously, we must control concurrent access:
- **Read Uncommitted**: Low isolation. Allows dirty reads (reading uncommitted changes).
- **Read Committed**: Only reads committed data.
- **Repeatable Read**: Guarantees that reads within the same transaction return the same values.
- **Serializable**: Highest isolation. Transactions run as if they are serial (one after another).`,
                codeExample: `-- SQL standard setting (syntaxes vary)\n-- SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;`
              },
              quiz: {
                question: 'Which transaction isolation level is the strictest and prevents all concurrency anomalies?',
                options: ['Read Uncommitted', 'Read Committed', 'Repeatable Read', 'Serializable'],
                correct: 3,
                explanation: 'Serializable isolation is the most restrictive level, preventing dirty, non-repeatable, and phantom reads.'
              }
            },
            {
              id: 'sql_s9c3l4',
              type: 'quiz',
              title: 'Transactions Quiz',
              xp: 5,
              difficulty: 'hard',
              quiz: {
                question: 'Which command saves all modifications made since the beginning of a transaction?',
                options: ['SAVE', 'COMMIT', 'ROLLBACK', 'STORE'],
                correct: 1,
                explanation: 'COMMIT permanently writes all changes made during the transaction to the database.'
              }
            }
          ]
        }
      ]
    },

    // =============================================
    // SECTION 10: REAL-WORLD SQL
    // =============================================
    {
      id: 'sql_s10',
      title: 'Real-World SQL',
      icon: 'book',
      description: 'Apply SQL skills to solve realistic business intelligence and data cleaning problems',
      chapters: [
        {
          id: 'sql_s10c1',
          title: 'E-Commerce Analytics',
          lessons: [
            {
              id: 'sql_s10c1l1',
              type: 'theory',
              title: 'E-Commerce Data Models',
              xp: 10,
              difficulty: 'hard',
              theory: {
                tldr: 'E-commerce reporting requires aggregating across orders, users, and line items to calculate core business metrics.',
                content: `In actual analytics roles, you will query complex transactional schemas. E-commerce schemas typically contain:
- \`users\` (demographics)
- \`orders\` (payment status, timestamp, totals)
- \`order_items\` (individual product items and quantities bought per order)
- \`products\` (prices, categories)

Key KPI metrics to calculate include Revenue, Average Order Value (AOV), Conversion Rates, and User Retention.`,
                codeExample: `-- Compute AOV (Average Order Value)\nSELECT AVG(amount) FROM orders;`
              },
              quiz: {
                question: 'What does AOV stand for in business analytics?',
                options: ['Average Order Volume', 'Average Order Value', 'All Order Validation', 'Account Outflow Velocity'],
                correct: 1,
                explanation: 'AOV stands for Average Order Value, calculated as Total Revenue divided by Total Orders.'
              }
            },
            {
              id: 'sql_s10c1l2',
              type: 'challenge',
              title: 'Calculating Revenue',
              xp: 20,
              difficulty: 'hard',
              challenge: {
                description: 'Write a query to calculate the total revenue (sum of order amounts, aliased as `total_revenue`) from the `orders` table for orders with `status = \'Completed\'`.',
                starterCode: '-- Calculate completed revenue\n',
                setupSQL: `CREATE TABLE orders (id INTEGER PRIMARY KEY, status TEXT, amount INTEGER);
INSERT INTO orders VALUES (1, 'Completed', 150);
INSERT INTO orders VALUES (2, 'Pending', 40);
INSERT INTO orders VALUES (3, 'Completed', 200);
INSERT INTO orders VALUES (4, 'Refunded', 80);`,
                hints: [
                  'Use SUM(amount) AS total_revenue',
                  'WHERE status = \'Completed\'',
                  'Solution: SELECT SUM(amount) AS total_revenue FROM orders WHERE status = \'Completed\';'
                ],
                testCases: [
                  { input: '', expectedOutput: 'total_revenue\n350' }
                ]
              }
            },
            {
              id: 'sql_s10c1l3',
              type: 'challenge',
              title: 'Customer Lifetime Value',
              xp: 20,
              difficulty: 'hard',
              challenge: {
                description: 'Calculate Customer Lifetime Value (CLV). Write a query to display the customer `name` and their total spending (aliased as `clv`). Join `customers` and `orders`, group by customer `name`, and order by `clv` descending.',
                starterCode: '-- Calculate customer CLV\n',
                setupSQL: `CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, amount INTEGER);
INSERT INTO customers VALUES (1, 'Alice');
INSERT INTO customers VALUES (2, 'Bob');
INSERT INTO orders VALUES (101, 1, 150);
INSERT INTO orders VALUES (102, 2, 80);
INSERT INTO orders VALUES (103, 1, 120);`,
                hints: [
                  'Join customers and orders on customers.id = orders.customer_id',
                  'SELECT name, SUM(amount) AS clv',
                  'GROUP BY name ORDER BY clv DESC',
                  'Solution: SELECT customers.name, SUM(orders.amount) AS clv FROM customers JOIN orders ON customers.id = orders.customer_id GROUP BY customers.name ORDER BY clv DESC;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'name|clv\nAlice|270\nBob|80' }
                ]
              }
            },
            {
              id: 'sql_s10c1l4',
              type: 'challenge',
              title: 'Segmenting Customers',
              xp: 20,
              difficulty: 'hard',
              challenge: {
                description: 'Select customer `name` and a `segment` label: if CLV (sum of order amounts) >= 200, return `\'VIP\'`, else return `\'Regular\'`. Group by customer `name` and order by customer `name` ascending.',
                starterCode: '-- Segment customers using CASE and aggregate SUM\n',
                setupSQL: `CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, amount INTEGER);
INSERT INTO customers VALUES (1, 'Alice');
INSERT INTO customers VALUES (2, 'Bob');
INSERT INTO orders VALUES (101, 1, 250);
INSERT INTO orders VALUES (102, 2, 120);`,
                hints: [
                  'Join customers and orders',
                  'Use CASE WHEN SUM(amount) >= 200 THEN \'VIP\' ELSE \'Regular\' END AS segment',
                  'Group by customers.name',
                  'Solution: SELECT customers.name, CASE WHEN SUM(orders.amount) >= 200 THEN \'VIP\' ELSE \'Regular\' END AS segment FROM customers JOIN orders ON customers.id = orders.customer_id GROUP BY customers.name ORDER BY customers.name ASC;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'name|segment\nAlice|VIP\nBob|Regular' }
                ]
              }
            }
          ]
        },
        {
          id: 'sql_s10c2',
          title: 'Reporting Trends',
          lessons: [
            {
              id: 'sql_s10c2l1',
              type: 'theory',
              title: 'Time Series in SQL',
              xp: 10,
              difficulty: 'hard',
              theory: {
                tldr: 'Time series reporting extracts parts of dates (like month, year) to analyze trends over time.',
                content: `A core reporting requirement is cohort analysis or month-over-month sales trends.

To group data by date intervals, you must parse timestamps:
- In SQLite, use: \`strftime('%Y-%m', date_column)\` to get the Year-Month string (e.g. \`2026-06\`).
- In other systems, functions like \`DATE_TRUNC\` or \`EXTRACT\` are common.

Once dates are aggregated into months, you can apply window functions to compare figures with previous periods.`,
                codeExample: `-- Count orders by month\nSELECT strftime('%Y-%m', order_date) AS month, COUNT(*) \nFROM orders \nGROUP BY month;`
              },
              quiz: {
                question: 'Which SQLite function parses and formats date strings?',
                options: ['DATE_FORMAT()', 'strftime()', 'EXTRACT()', 'CONVERT()'],
                correct: 1,
                explanation: 'SQLite uses strftime(format, timestring) to extract and format specific elements of date/time fields.'
              }
            },
            {
              id: 'sql_s10c2l2',
              type: 'challenge',
              title: 'Month-over-Month Growth',
              xp: 20,
              difficulty: 'hard',
              challenge: {
                description: 'Write a query to extract the month (aliased as `order_month` using `strftime(\'%Y-%m\', order_date)`) and calculate total sales (aliased as `monthly_sales`) from the `orders` table. Group by `order_month` and order by `order_month` ascending.',
                starterCode: '-- Calculate monthly sales trends\n',
                setupSQL: `CREATE TABLE orders (id INTEGER, order_date TEXT, amount INTEGER);
INSERT INTO orders VALUES (1, '2026-01-15', 500);
INSERT INTO orders VALUES (2, '2026-01-20', 300);
INSERT INTO orders VALUES (3, '2026-02-10', 400);`,
                hints: [
                  'Use SELECT strftime(\'%Y-%m\', order_date) AS order_month, SUM(amount) AS monthly_sales',
                  'Group by order_month',
                  'Solution: SELECT strftime(\'%Y-%m\', order_date) AS order_month, SUM(amount) AS monthly_sales FROM orders GROUP BY order_month ORDER BY order_month ASC;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'order_month|monthly_sales\n2026-01|800\n2026-02|400' }
                ]
              }
            },
            {
              id: 'sql_s10c2l3',
              type: 'challenge',
              title: 'Top Selling Products',
              xp: 20,
              difficulty: 'hard',
              challenge: {
                description: 'Write a query to find the top selling product. Select the product `name` and the sum of quantities sold (aliased as `total_qty`). Join `products` and `sales`, group by product `name`, order by `total_qty` descending, and limit to `1` row.',
                starterCode: '-- Top selling product query\n',
                setupSQL: `CREATE TABLE products (id INTEGER, name TEXT);
CREATE TABLE sales (product_id INTEGER, qty INTEGER);
INSERT INTO products VALUES (1, 'Laptop');
INSERT INTO products VALUES (2, 'Monitor');
INSERT INTO sales VALUES (1, 5);
INSERT INTO sales VALUES (2, 10);
INSERT INTO sales VALUES (1, 3);`,
                hints: [
                  'Join products and sales on products.id = sales.product_id',
                  'Use SELECT name, SUM(qty) AS total_qty',
                  'Group by name, order by total_qty DESC, LIMIT 1',
                  'Solution: SELECT products.name, SUM(sales.qty) AS total_qty FROM products JOIN sales ON products.id = sales.product_id GROUP BY products.name ORDER BY total_qty DESC LIMIT 1;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'name|total_qty\nMonitor|10' }
                ]
              }
            },
            {
              id: 'sql_s10c2l4',
              type: 'challenge',
              title: 'AOV Trends',
              xp: 20,
              difficulty: 'hard',
              challenge: {
                description: 'Retrieve the `order_date` and the calculated Average Order Value (AOV) for each day (aliased as `daily_aov`). Order by `order_date` ascending.',
                starterCode: '-- daily AOV trends\n',
                setupSQL: `CREATE TABLE orders (id INTEGER, order_date TEXT, amount INTEGER);
INSERT INTO orders VALUES (1, '2026-06-01', 100);
INSERT INTO orders VALUES (2, '2026-06-01', 200);
INSERT INTO orders VALUES (3, '2026-06-02', 150);`,
                hints: [
                  'Daily AOV is SUM(amount) / COUNT(*) or AVG(amount)',
                  'Group by order_date',
                  'Solution: SELECT order_date, AVG(amount) AS daily_aov FROM orders GROUP BY order_date ORDER BY order_date ASC;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'order_date|daily_aov\n2026-06-01|150\n2026-06-02|150' }
                ]
              }
            }
          ]
        },
        {
          id: 'sql_s10c3',
          title: 'Data Cleaning',
          lessons: [
            {
              id: 'sql_s10c3l1',
              type: 'theory',
              title: 'Identifying Dirty Data',
              xp: 10,
              difficulty: 'hard',
              theory: {
                tldr: 'Real-world data is messy. SQL is used to identify duplicates, handle missing values, and trim formats.',
                content: `Before doing any machine learning or business intelligence, you must perform **ETL** (Extract, Transform, Load) and clean your data.

Data cleaning tasks include:
- Finding rows where fields are unexpectedly NULL.
- Identifying and merging duplicate rows.
- Standardizing text fields (e.g. converting names to consistent title case or trimming trailing spaces).

You will use subqueries, window functions like \`ROW_NUMBER()\`, and string functions together to clean datasets.`,
                codeExample: `-- Find duplicate email registrations\nSELECT email, COUNT(*) FROM users GROUP BY email HAVING COUNT(*) > 1;`
              },
              quiz: {
                question: 'Which clause is best for filtering aggregated queries to find duplicate keys?',
                options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'],
                correct: 1,
                explanation: 'HAVING filters aggregated groups, making it ideal for checking COUNT(*) > 1 in a group of keys.'
              }
            },
            {
              id: 'sql_s10c3l2',
              type: 'challenge',
              title: 'Deduplicate Records',
              xp: 20,
              difficulty: 'hard',
              challenge: {
                description: 'Write a query to identify and delete duplicate rows in the `contacts` table, keeping only the record with the lowest `id` for each duplicate `email`. Then select all columns from `contacts` ordered by `id` ascending.',
                starterCode: '-- Delete duplicates and select remaining\n',
                setupSQL: `CREATE TABLE contacts (id INTEGER PRIMARY KEY, name TEXT, email TEXT);
INSERT INTO contacts VALUES (1, 'Alice', 'alice@gmail.com');
INSERT INTO contacts VALUES (2, 'Alice Smith', 'alice@gmail.com');
INSERT INTO contacts VALUES (3, 'Bob', 'bob@gmail.com');`,
                hints: [
                  'Use a subquery to find the min(id) grouped by email',
                  'DELETE FROM contacts WHERE id NOT IN (SELECT MIN(id) FROM contacts GROUP BY email);',
                  'Then: SELECT * FROM contacts ORDER BY id ASC;',
                  'Solution: DELETE FROM contacts WHERE id NOT IN (SELECT MIN(id) FROM contacts GROUP BY email); SELECT * FROM contacts ORDER BY id ASC;'
                ],
                testCases: [
                  { input: '', expectedOutput: 'id|name|email\n1|Alice|alice@gmail.com\n3|Bob|bob@gmail.com' }
                ]
              }
            },
            {
              id: 'sql_s10c3l3',
              type: 'theory',
              title: 'Handling Missing Data',
              xp: 10,
              difficulty: 'hard',
              theory: {
                tldr: 'Standardizing missing data involves turning empty strings, blanks, and nulls into a unified NULL value or a fallback.',
                content: `Sometimes systems record missing data as an empty string \`''\` or a space, and other times as a proper \`NULL\`.

To standardize these, you can use \`CASE\` or \`NULLIF(val1, val2)\` which returns \`NULL\` if the two arguments are equal.

For example, \`NULLIF(email, '')\` returns \`NULL\` if the email is empty, otherwise it returns the email address.`,
                codeExample: `-- Convert empty strings to NULL\nSELECT name, NULLIF(email, '') AS cleaned_email FROM users;`
              },
              quiz: {
                question: 'What does NULLIF(\'hello\', \'hello\') return?',
                options: ['\'hello\'', 'NULL', '0', 'An error'],
                correct: 1,
                explanation: 'NULLIF returns NULL if both arguments are equal; otherwise it returns the first argument.'
              }
            },
            {
              id: 'sql_s10c3l4',
              type: 'quiz',
              title: 'SQL Graduation Quiz',
              xp: 25,
              difficulty: 'hard',
              quiz: {
                question: 'Congratulations! You have completed the SQL course. What is the standard language for querying relational databases?',
                options: ['Python', 'HTML', 'SQL', 'C++'],
                correct: 2,
                explanation: 'SQL (Structured Query Language) is the global standard language for interacting with relational databases.'
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
let _allSQLLessons = null;

export function getAllSQLLessons() {
  if (!_allSQLLessons) {
    _allSQLLessons = [];
    for (const section of sqlCurriculum.sections) {
      for (const chapter of section.chapters) {
        _allSQLLessons.push(...chapter.lessons);
      }
    }
  }
  return _allSQLLessons;
}

export function getSQLLessonById(id) {
  return getAllSQLLessons().find(l => l.id === id) || null;
}

export function getSQLChapterForLesson(lessonId) {
  for (const section of sqlCurriculum.sections) {
    for (const chapter of section.chapters) {
      if (chapter.lessons.some(l => l.id === lessonId)) {
        return chapter;
      }
    }
  }
  return null;
}

export function getSQLSectionForLesson(lessonId) {
  for (const section of sqlCurriculum.sections) {
    for (const chapter of section.chapters) {
      if (chapter.lessons.some(l => l.id === lessonId)) {
        return section;
      }
    }
  }
  return null;
}

export function getNextSQLLesson(currentId) {
  const all = getAllSQLLessons();
  const idx = all.findIndex(l => l.id === currentId);
  return idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;
}

export function getPrevSQLLesson(currentId) {
  const all = getAllSQLLessons();
  const idx = all.findIndex(l => l.id === currentId);
  return idx > 0 ? all[idx - 1] : null;
}

export function getSQLLessonIndex(lessonId) {
  return getAllSQLLessons().findIndex(l => l.id === lessonId);
}
