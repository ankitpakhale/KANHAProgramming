export const API_ENDPOINTS = {
  GENERATE_QUESTIONS: 'generate-questions',
  ANSWER_EVALUATION: 'answer-evaluation',
};

export const Q_DATA = {
  status: true,
  payload: {
    easy: [
      {
        question: 'Which of the following is not a valid data type in Python?',
        options: ['int', 'string', 'boolean', 'tuple'],
        correct_answer: 'tuple',
      },
      {
        question:
          'What is the output of the following Python code snippet?\n\nprint(10 > 5)',
        options: ['True', 'False', '10', '5'],
        correct_answer: 'True',
      },
    ],
    medium: [],
    hard: [],
  },
  message: 'Questions Generated Successfully',
  status_code: 200,
};
