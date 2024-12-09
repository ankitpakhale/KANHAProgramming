export const API_ENDPOINTS = {
  GENERATE_QUESTIONS: 'generate-questions',
  ANSWER_EVALUATION: 'answer-evaluation',
};

export const Q_DATA_MCQ = {
  status: true,
  payload: {
    easy: [
      {
        q_type: 'MCQ',
        question: 'Which of the following is not a valid data type in Python?',
        options: ['int', 'string', 'list', 'tuple'],
        correct_answer: 'tuple',
      },
      {
        q_type: 'MCQ',
        question:
          'What is the output of the following code snippet?\n\nprint(3 * 2 ** 3)',
        options: ['48', '24', '18', '12'],
        correct_answer: '24',
      },
    ],
    medium: [],
    hard: [],
  },
  message: 'Questions Generated Successfully',
  status_code: 200,
};

export const Q_DATA = {
  status: true,
  payload: {
    easy: [],
    medium: [],
    hard: [
      {
        q_type: 'problem_solving',
        problem_description:
          'Write a Python function that takes a list of integers and returns the maximum product of three numbers from the list. The function should handle both positive and negative integers.',
        input_format: 'Input consists of a list of integers.',
        output_format:
          'Output should be an integer representing the maximum product of three numbers.',
        constraints:
          'The length of the list will be at least 3 and at most 10^4. Integers in the list will be in the range [-1000, 1000].',
        examples: [
          {
            input: '[1, 2, 3, 4, 5]',
            output: '60',
          },
          {
            input: '[-10, -5, 1, 2, 3]',
            output: '150',
          },
        ],
        edge_cases: [
          {
            input: '[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]',
            output: '125',
          },
        ],
      },
      {
        q_type: 'problem_solving',
        problem_description:
          'Implement a Python function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string.',
        input_format: 'Input consists of an array of strings.',
        output_format:
          'Output should be a string representing the longest common prefix.',
        constraints:
          'The number of strings in the array will be at least 1 and at most 200. The length of each string will be at most 200.',
        examples: [
          {
            input: '["flower", "flow", "flight"]',
            output: '"fl"',
          },
          {
            input: '["dog", "racecar", "car"]',
            output: '""',
          },
        ],
        edge_cases: [
          {
            input: '["apple", "app", "application"]',
            output: '"app"',
          },
        ],
      },
    ],
  },
  message: 'Questions Generated Successfully',
  status_code: 200,
};
