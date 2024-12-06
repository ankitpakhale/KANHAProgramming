import React from 'react';
import PropTypes from 'prop-types';

export default function MCQQuestion({
  question,
  options,
  difficultyLevel,
  questionIndex,
  selectedOption,
  onOptionChange,
  isDisabled,
}) {
  return (
    <li className="mb-4 p-3 border rounded bg-light">
      <p className="fw-bold text-start mb-3">
        {questionIndex + 1}. {question}
      </p>
      <form>
        {options.map((option, i) => (
          <div className="form-check text-start mb-2" key={i}>
            <input
              className="form-check-input"
              type="radio"
              name={`question-${difficultyLevel}-${questionIndex}`}
              value={option}
              id={`option-${difficultyLevel}-${questionIndex}-${i}`}
              onChange={() =>
                onOptionChange(difficultyLevel, questionIndex, option)
              }
              checked={selectedOption === option}
              disabled={isDisabled}
              style={{ marginRight: '10px' }}
            />
            <label
              className="form-check-label"
              htmlFor={`option-${difficultyLevel}-${questionIndex}-${i}`}
            >
              {option}
            </label>
          </div>
        ))}
      </form>
    </li>
  );
}

MCQQuestion.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  difficultyLevel: PropTypes.string.isRequired,
  questionIndex: PropTypes.number.isRequired,
  selectedOption: PropTypes.string,
  onOptionChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};
