import React from 'react';
import { useQuestions } from '../context/QuestionsContext';
import MCQQuestion from './MCQQuestion';
import ProblemSolvingQuestions from './ProblemSolvingQuestions';

export default function Questions() {
  const { questionsData, isLoading, error } = useQuestions();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h3>Questions</h3>
      <ul>
        {questionsData.map((question, index) => {
          const questionType = question.q_id.substring(0, 3); // Extract the first 3 characters of q_id
          return (
            <li key={index}>
              {/* Conditional Rendering based on q_id */}
              {questionType === 'mcq' ? (
                <MCQQuestion questionData={question} />
              ) : questionType === 'psq' ? (
                <ProblemSolvingQuestions question={question} />
              ) : (
                <div>Unknown question type</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
