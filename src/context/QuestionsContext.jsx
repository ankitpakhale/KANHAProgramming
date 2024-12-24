import React, { createContext, useState, useContext } from 'react';

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
