import React, { useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import fetchData from '../api/fetcher';
import { API_ENDPOINTS } from '../utils/constants';
import { useQuestions } from '../context/QuestionsContext';

export default function QuestionsForm() {
  const { setQuestionsData, setIsLoading, setError } = useQuestions();
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState(null);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);

  // Options for select dropdowns
  const difficultyOptions = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
  ];

  const programmingLanguageOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'c', label: 'C' },
    { value: 'cpp', label: 'C++' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'php', label: 'PHP' },
    { value: 'swift', label: 'Swift' },
    { value: 'go', label: 'Go' },
    { value: 'kotlin', label: 'Kotlin' },
  ];

  const topicOptions = [
    { value: 'all', label: 'All' },
    { value: 'oop', label: 'Object-Oriented Programming' },
    { value: 'loops', label: 'Loops' },
    { value: 'conditionalStatements', label: 'Conditional Statements' },
    { value: 'strings', label: 'Strings' },
    { value: 'arrays', label: 'Arrays' },
    { value: 'linkedLists', label: 'Linked Lists' },
    { value: 'stacks', label: 'Stacks' },
    { value: 'queues', label: 'Queues' },
    { value: 'sorting', label: 'Sorting Algorithms' },
    { value: 'searching', label: 'Searching Algorithms' },
    { value: 'recursion', label: 'Recursion' },
    { value: 'hashing', label: 'Hashing' },
  ];

  // Handle submit
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const filteredLanguages = selectedLanguages.map((lang) => lang.value);
      const filteredTopics = selectedTopics.map((topic) => topic.value);

      const formData = new FormData();
      formData.append('difficulty_level', difficulty ? difficulty.value : null);
      formData.append('programming_language', filteredLanguages.join(','));
      formData.append('topics', JSON.stringify(filteredTopics));

      const responseData = await fetchData(
        API_ENDPOINTS.GENERATE_QUESTIONS,
        formData
      );

      if (responseData.response && responseData.error === null) {
        setQuestionsData(responseData.response);
        // Navigate to the /questions route after successful data fetch
        navigate('/questions');
      } else {
        throw new Error(responseData.error || 'An unknown error occurred');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch questions.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="col-8 col-md-6 col-lg-4 mt-3 mx-auto">
      <form>
        <div className="mb-3 row">
          <label htmlFor="difficultyLevel" className="col-sm-4 col-form-label">
            Difficulty Level
          </label>
          <div className="col-sm-8">
            <Select
              id="difficultyLevel"
              options={difficultyOptions}
              value={difficulty}
              onChange={setDifficulty}
              placeholder="Select Difficulty"
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label
            htmlFor="programmingLanguage"
            className="col-sm-4 col-form-label"
          >
            Programming Language
          </label>
          <div className="col-sm-8">
            <Select
              id="programmingLanguage"
              options={programmingLanguageOptions}
              isMulti
              value={selectedLanguages}
              onChange={setSelectedLanguages}
              placeholder="Select Programming Languages"
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="topics" className="col-sm-4 col-form-label">
            Topics
          </label>
          <div className="col-sm-8">
            <Select
              id="topics"
              options={topicOptions}
              isMulti
              value={selectedTopics}
              onChange={setSelectedTopics}
              placeholder="Select Topics"
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>
        </div>

        <div className="mb-3 row">
          <div className="col-sm-12 text-center">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              {isLoading ? 'Loading...' : 'Submit'}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
