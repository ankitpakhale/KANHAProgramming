import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ToastNotification, { showToast } from '../utils/ToastNotification';
import MCQQuestion from './MCQQuestion';

export default function QuestionsDisplay({ qData }) {
  const questionsData = qData.payload;

  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [codeSubmit, setCodeSubmit] = useState(false);

  const handleOptionChange = (
    difficultyLevel,
    questionIndex,
    selectedOption
  ) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [difficultyLevel]: {
        ...prevAnswers[difficultyLevel],
        [questionIndex]: selectedOption,
      },
    }));
  };

  const handleSubmit = () => {
    let localScore = 0;

    // Calculate score only for 'easy' type questions
    if (questionsData.easy) {
      questionsData.easy.forEach((question, index) => {
        if (
          userAnswers.easy &&
          userAnswers.easy[index] === question.correct_answer
        ) {
          localScore++;
        }
      });
    }

    setScore(localScore);
    setCodeSubmit(true);
    showToast('Answers submitted successfully!', 'success');
  };

  const renderQuestion = (question, difficultyLevel, index) => {
    // TODO: convert this into if else statements instead of switch
    switch (question.q_type) {
      case 'MCQ':
        return (
          <MCQQuestion
            key={index}
            question={question.question}
            options={question.options}
            difficultyLevel={difficultyLevel}
            questionIndex={index}
            selectedOption={userAnswers[difficultyLevel]?.[index]}
            onOptionChange={handleOptionChange}
            isDisabled={codeSubmit}
          />
        );

      // add support for problem-solving questions or other types here
      default:
        return (
          <li key={index} className="mb-4 p-3 border rounded bg-light">
            <p className="fw-bold text-start mb-3">
              {index + 1}. {question.question}
            </p>
            <p className="text-muted">
              [Problem-solving question type not implemented]
            </p>
          </li>
        );
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <h1 className="text-center text-success mb-4">Quiz</h1>
      {Object.keys(questionsData).map((difficultyLevel) => {
        if (questionsData[difficultyLevel]?.length > 0) {
          return (
            <div key={difficultyLevel} className="mb-4">
              <h2 className="text-center text-dark mb-3">
                {difficultyLevel.toUpperCase()}
              </h2>
              <ul className="list-unstyled">
                {questionsData[difficultyLevel].map((question, index) =>
                  renderQuestion(question, difficultyLevel, index)
                )}
              </ul>
            </div>
          );
        }
        return null;
      })}
      <button
        className="btn btn-success w-100"
        onClick={handleSubmit}
        disabled={codeSubmit}
      >
        Submit
      </button>
      {score !== null && (
        <div className="mt-4 alert alert-info text-center">
          <strong>Your Score: {score}</strong>
        </div>
      )}
      <ToastNotification />
    </div>
  );
}

QuestionsDisplay.propTypes = {
  qData: PropTypes.shape({
    payload: PropTypes.shape({
      easy: PropTypes.array,
      medium: PropTypes.array,
      hard: PropTypes.array,
    }).isRequired,
  }).isRequired,
};
