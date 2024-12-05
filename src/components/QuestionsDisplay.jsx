import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ToastNotification, { showToast } from '../utils/ToastNotification';

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

    // calculate score only for 'easy' type questions
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
    showToast('Answers submitted!', 'success');
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      {/* quiz title */}
      <h1 className="text-center text-success mb-4">Quiz</h1>
      {Object.keys(questionsData).map((difficultyLevel) => {
        // show the difficulty section only if data exists
        if (questionsData[difficultyLevel]?.length > 0) {
          return (
            <div key={difficultyLevel} className="mb-4">
              {/* difficulty title */}
              <h2 className="text-center text-dark mb-3">
                {difficultyLevel.toUpperCase()}
              </h2>
              <ul className="list-unstyled">
                {questionsData[difficultyLevel].map((question, index) => (
                  <li key={index} className="mb-4 p-3 border rounded bg-light">
                    <p className="fw-bold text-start mb-3">
                      {index + 1}. {question.question}
                    </p>
                    <form>
                      {question.options.map((option, i) => (
                        <div className="form-check text-start mb-2" key={i}>
                          <input
                            className="form-check-input"
                            type="radio"
                            name={`question-${difficultyLevel}-${index}`}
                            value={option}
                            id={`option-${difficultyLevel}-${index}-${i}`}
                            onChange={() =>
                              handleOptionChange(difficultyLevel, index, option)
                            }
                            checked={
                              userAnswers[difficultyLevel]?.[index] === option
                            }
                            style={{ marginRight: '10px' }}
                            disabled={codeSubmit}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`option-${difficultyLevel}-${index}-${i}`}
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </form>
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        return null; // do not render if there are no questions for the difficulty level
      })}
      {/* submit button */}
      <button
        className="btn btn-success w-100"
        onClick={handleSubmit}
        disabled={codeSubmit}
      >
        Submit
      </button>
      {/* score display */}
      {score !== null && (
        <div className="mt-4 alert alert-info text-center">
          <strong>Your Score: {score}</strong>
        </div>
      )}
      {/* Toast Notification */}
      <ToastNotification />
    </div>
  );
}

QuestionsDisplay.propTypes = {
  qData: PropTypes.shape({
    payload: PropTypes.object.isRequired,
  }).isRequired,
};
