import React from 'react';
import PropTypes from 'prop-types';

export default function MCQQuestion({ questionData, num }) {
  return (
    <div className="questionBox">
      <p className="questionNum">Question: {num + 1}</p>
      <p className="fw-bold text-start mb-3">{questionData.question}</p>
      <ul className="m-0 p-0 list-inline">
        {questionData.options.map((option, index) => (
          <li key={index + 1} className="border rounded bg-light text-start">
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}

MCQQuestion.propTypes = {
  questionData: PropTypes.string.isRequired,
  num: PropTypes.string.isRequired,
};
