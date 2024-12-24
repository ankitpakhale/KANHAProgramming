import React from 'react';
import PropTypes from 'prop-types';

export default function PSQQuestions({ questionData }) {
  const qData = questionData;

  return (
    <div className="my-5 p-4 border rounded shadow-sm">
      <div className="mb-3">
        <p className="fw-bold mb-1 fs-6">Problem Description:</p>
        <p className="fs-6">{qData.problem_description}</p>
      </div>

      <div className="mb-3">
        <p className="fw-bold mb-1 fs-6">Input Format:</p>
        <p className="fs-6">{qData.input_format}</p>
      </div>

      <div className="mb-3">
        <p className="fw-bold mb-1 fs-6">Output Format:</p>
        <p className="fs-6">{qData.output_format}</p>
      </div>

      <div className="mb-3">
        <p className="fw-bold mb-1 fs-6">Constraints:</p>
        <p className="fs-6">{qData.constraints}</p>
      </div>

      <div className="mb-3">
        <p className="fw-bold fs-6">Examples:</p>
        <div className="list-group">
          {qData.examples.map((example, index) => (
            <div key={index} className="list-group-item">
              <p className="fs-6">
                <strong>Input:</strong> {example.input}
              </p>
              <p className="fs-6">
                <strong>Output:</strong> {example.output}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <p className="fw-bold fs-6">Edge Cases:</p>
        <div className="list-group">
          {qData.edge_cases.map((edge_case, index) => (
            <div key={index} className="list-group-item">
              <p className="fs-6">
                <strong>Input:</strong> {edge_case.input}
              </p>
              <p className="fs-6">
                <strong>Output:</strong> {edge_case.output}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

PSQQuestions.propTypes = {
  questionData: PropTypes.object.isRequired,
};
