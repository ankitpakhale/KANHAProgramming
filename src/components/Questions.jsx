import React, { useEffect } from 'react';
import { useQuestions } from '../context/QuestionsContext';
import MCQQuestion from './MCQQuestion';
import PSQQuestions from './PSQQuestions';
import { useNavigate } from 'react-router-dom';

export default function Questions() {
  const navigate = useNavigate();

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

  useEffect(() => {
    console.info('!!!!!!!!!!!!!!!! questionsData useEffect');
    if (questionsData == null || questionsData.length === 0) {
      console.info('!!!!!!!!!!!!!!!! questionsData is empty, redirecting to /');
      navigate('/');
    }
  }, [questionsData, navigate]);

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
                <PSQQuestions questionData={question} />
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
