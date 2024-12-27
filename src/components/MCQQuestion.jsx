import React from 'react';
import PropTypes from 'prop-types';

export default function MCQQuestion({ questionData }) {
  return (
    <div className="questionBox">
      <p className="fw-bold text-start mb-3">{questionData.question}</p>
      <ul className="m-0 p-0 list-inline">
        {questionData.options.map((option, index) => (
          <li key={index + 1} className="mb-4 p-3 border rounded bg-light">
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}

MCQQuestion.propTypes = {
  questionData: PropTypes.string.isRequired,
};
