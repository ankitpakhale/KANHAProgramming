import React from 'react';
import PropTypes from 'prop-types';

export default function PSQQuestions({ questionData, num }) {
  const qData = questionData;

  return (
    <div className="questionBox text-start">
      <div className="mb-3">
        <p className="questionNum">Question: {num + 1}</p>
      </div>
      <div className="mb-3">
        <p className="psqHeading mb-1">Problem Description:</p>
        <p
          className="psqData"
          style={{ backgroundColor: '#e7f3fe', color: '#0056b3' }}
        >
          {qData.problem_description}
        </p>
      </div>

      <div className="mb-3">
        <p className="psqHeading mb-1">Input Format:</p>
        <p
          className="psqData"
          style={{ backgroundColor: '#fff3cd', color: '#856404' }}
        >
          {qData.input_format}
        </p>
      </div>

      <div className="mb-3">
        <p className="psqHeading mb-1">Output Format:</p>
        <p
          className="psqData"
          style={{ backgroundColor: '#d4edda', color: '#155724' }}
        >
          {qData.output_format}
        </p>
      </div>

      <div className="mb-3">
        <p className="psqHeading">Constraints:</p>
        <p
          className="psqData"
          style={{ backgroundColor: '#d1ecf1', color: '#0c5460' }}
        >
          {qData.constraints}
        </p>
      </div>

      <div className="mb-3">
        <p className="psqHeading">Examples:</p>
        <div className="list-group">
          {qData.examples.map((example, index) => (
            <div key={index} className="list-group-item">
              <p className="">
                <strong>Input:</strong> {example.input}
              </p>
              <p className="">
                <strong>Output:</strong>{' '}
                <span style={{ backgroundColor: '#d4edda', color: '#155724' }}>
                  {example.output}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <p className="psqHeading text-start">Edge Cases:</p>
        <div className="list-group">
          {qData.edge_cases.map((edge_case, index) => (
            <div key={index} className="list-group-item">
              <p className="">
                <strong>Input:</strong> {edge_case.input}
              </p>
              <p className="">
                <strong>Output:</strong>{' '}
                <span style={{ backgroundColor: '#f8d7da', color: '#721c24' }}>
                  {edge_case.output}
                </span>
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
  num: PropTypes.object.isRequired,
};
