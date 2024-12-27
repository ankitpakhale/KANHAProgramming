import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const QuestionsContext = createContext();

export const useQuestions = () => useContext(QuestionsContext);

export const QuestionsProvider = ({ children }) => {
  const [questionsData, setQuestionsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <QuestionsContext.Provider
      value={{
        questionsData,
        setQuestionsData,
        isLoading,
        setIsLoading,
        error,
        setError,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

QuestionsProvider.propTypes = {
  children: PropTypes.string.isRequired,
};
