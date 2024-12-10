import React, { useState } from 'react';
import PropTypes from 'prop-types';

const QuestionsDisplay = ({ qData }) => {
  const questionsData = qData.payload;
  console.info('??????????????????????????????qData: ', questionsData);

  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [codeSubmit, setCodeSubmit] = useState(false);

  // handle the option change for multiple choice questions
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

  // handle form submission to calculate the score
  const handleSubmit = () => {
    let localScore = 0;

    // calculate score for easy difficulty level questions
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

  // Define a simple showToast function (or import it if you have it already)
  const showToast = (message, type) => {
    console.log(`${type.toUpperCase()}: ${message}`);
  };

  return (
    <div>
      <ul>
        {/* render questions */}
        {questionsData &&
          Object.keys(questionsData).map((difficultyLevel) => {
            const questionsForDifficulty = questionsData[difficultyLevel];

            // Ensure we are working with an array for .map()
            if (Array.isArray(questionsForDifficulty)) {
              return questionsForDifficulty.map((question, index) => {
                const qTypePrefix = question.q_type.slice(0, 3); // get the first 3 characters of q_type

                if (qTypePrefix === 'psq') {
                  // render problem-solving question
                  return (
                    <li
                      key={index}
                      className="mb-4 p-3 text-start border rounded"
                    >
                      <div className="row bg-info">
                        <div className="col d-flex">
                          <p className="fw-bold me-1">question no:</p>
                          <p className="text-muted ms-1">{index + 1}.</p>
                        </div>

                        <div className="col d-flex">
                          <p className="fw-bold me-1">question type:</p>
                          <p className="text-success ms-1">problem solving</p>
                        </div>
                      </div>

                      {/* problem description */}
                      <div className="my-2">
                        <p className="fw-bold">problem description:</p>
                        <p className="text-muted">
                          {question.problem_description}
                        </p>
                      </div>

                      {/* input format */}
                      <div className="my-2">
                        <p className="fw-bold">input format:</p>
                        <p className="text-muted">{question.input_format}</p>
                      </div>

                      {/* output format */}
                      <div className="my-2">
                        <p className="fw-bold">output format:</p>
                        <p className="text-muted">{question.output_format}</p>
                      </div>

                      {/* constraints */}
                      <div className="my-2">
                        <p className="fw-bold">constraints:</p>
                        <p className="text-muted">{question.constraints}</p>
                      </div>

                      {/* examples section */}
                      {question.examples && question.examples.length > 0 && (
                        <div className="mt-3">
                          <p className="fw-bold mb-2">examples:</p>
                          {question.examples.map((example, exampleIndex) => (
                            <div key={exampleIndex} className="mb-2">
                              <p className="text-muted mr-2 mb-0">
                                <strong>input:</strong> {example.input}
                              </p>
                              <p className="text-muted mb-0">
                                <strong>output:</strong> {example.output}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* edge cases section */}
                      {question.edge_cases &&
                        question.edge_cases.length > 0 && (
                          <div className="mt-3">
                            <p className="fw-bold mb-2">edge cases:</p>
                            {question.edge_cases.map(
                              (edgeCase, edgeCaseIndex) => (
                                <div key={edgeCaseIndex} className="mb-2">
                                  <p className="text-muted mr-2 mb-0">
                                    <strong>input:</strong> {edgeCase.input}
                                  </p>
                                  <p className="text-muted mb-0">
                                    <strong>output:</strong> {edgeCase.output}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        )}

                      {/* problem to solve here */}
                      <div className="my-2">
                        <p className="fw-bold">problem to solve here:</p>
                        <textarea
                          className="form-control"
                          rows="4"
                          placeholder="write your solution here..."
                        />
                      </div>
                    </li>
                  );
                } else if (qTypePrefix === 'mcq') {
                  // render multiple choice question
                  return (
                    <li
                      key={index}
                      className="mb-4 p-3 text-start border rounded"
                    >
                      <div className="row bg-info">
                        <div className="col d-flex">
                          <p className="fw-bold me-1">question no:</p>
                          <p className="text-muted ms-1">{index + 1}.</p>
                        </div>

                        <div className="col d-flex">
                          <p className="fw-bold me-1">question type:</p>
                          <p className="text-success ms-1">multiple choice</p>
                        </div>
                      </div>

                      {/* mcq question */}
                      <div className="my-2">
                        <p className="fw-bold">question:</p>
                        <p className="text-muted">{question.mcq_question}</p>
                      </div>

                      {/* options */}
                      <div className="my-2">
                        <p className="fw-bold">options:</p>
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name={`mcq-${difficultyLevel}-${index}`}
                              id={`option-${optionIndex}`}
                              checked={
                                userAnswers[difficultyLevel] &&
                                userAnswers[difficultyLevel][index] === option
                              }
                              onChange={() =>
                                handleOptionChange(
                                  difficultyLevel,
                                  index,
                                  option
                                )
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`option-${optionIndex}`}
                            >
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    </li>
                  );
                } else {
                  // render fallback for unsupported types
                  return (
                    <li
                      key={index}
                      className="mb-4 p-3 text-start border rounded"
                    >
                      <p className="fw-bold">unsupported question type:</p>
                      <p className="text-muted">{question.q_type}</p>
                    </li>
                  );
                }
              });
            } else {
              // Handle case where the difficulty level data is not an array
              return (
                <div key={difficultyLevel} className="alert alert-warning">
                  No questions available for difficulty level: {difficultyLevel}
                </div>
              );
            }
          })}
      </ul>

      {/* score section */}
      {codeSubmit && (
        <div className="mt-4">
          <p className="fw-bold">Your Score: {score}</p>
        </div>
      )}

      {/* submit button */}
      <div className="mt-3">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit Answers
        </button>
      </div>
    </div>
  );
};

// PropTypes validation for the props
QuestionsDisplay.propTypes = {
  qData: PropTypes.shape({
    payload: PropTypes.shape({
      easy: PropTypes.array,
      medium: PropTypes.array,
      hard: PropTypes.array,
    }),
  }).isRequired,
};

export default QuestionsDisplay;
