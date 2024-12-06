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
          <li key={index} className="mb-4 p-3 text-start border rounded">
            <div className="row bg-info">
              <div className="col d-flex">
                <p className="fw-bold me-1">Question No:</p>
                <p className="text-muted ms-1">{index + 1}.</p>
              </div>

              <div className="col d-flex">
                <p className="fw-bold me-1">Question Type:</p>
                <p className="text-success ms-1">
                  {question.q_type == 'problem_solving' && 'Problem Solving'}
                </p>
              </div>
            </div>

            {/* problem description */}
            <div className="my-2">
              <p className="fw-bold">Problem Description:</p>
              <p className="text-muted">{question.problem_description}</p>
            </div>

            {/* input format */}
            <div className="my-2">
              <p className="fw-bold">Input Format:</p>
              <p className="text-muted">{question.input_format}</p>
            </div>

            {/* output format */}
            <div className="my-2">
              <p className="fw-bold">Output Format:</p>
              <p className="text-muted">{question.output_format}</p>
            </div>

            {/* constraints */}
            <div className="my-2">
              <p className="fw-bold">Constraints:</p>
              <p className="text-muted">{question.constraints}</p>
            </div>

            {/* examples section */}
            {question.examples && question.examples.length > 0 && (
              <div className="mt-3">
                <p className="fw-bold mb-2">Examples:</p>
                {question.examples.map((example, exampleIndex) => (
                  <div key={exampleIndex} className="mb-2">
                    <p className="text-muted mr-2 mb-0">
                      <strong>Input:</strong> {example.input}
                    </p>
                    <p className="text-muted mb-0">
                      <strong>Output:</strong> {example.output}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* edge cases section */}
            {question.edge_cases && question.edge_cases.length > 0 && (
              <div className="mt-3">
                <p className="fw-bold mb-2">Edge Cases:</p>
                {question.edge_cases.map((edgeCase, edgeCaseIndex) => (
                  <div key={edgeCaseIndex} className="mb-2">
                    <p className="text-muted mr-2 mb-0">
                      <strong>Input:</strong> {edgeCase.input}
                    </p>
                    <p className="text-muted mb-0">
                      <strong>Output:</strong> {edgeCase.output}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* problem to solve here */}
            <div className="my-2">
              <p className="fw-bold">Problem To Solve Here:</p>
              <textarea
                className="form-control"
                rows="4"
                placeholder="write your solution here..."
              />
            </div>
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
