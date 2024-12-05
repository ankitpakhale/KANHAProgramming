import React, { useState } from 'react';
import Select from 'react-select';

import fetchData from '../api/fetcher';
import { API_ENDPOINTS, Q_DATA } from '../utils/constants';
import QuestionsDisplay from './QuestionsDisplay';

export default function QuestionsForm() {
  const [difficulty, setDifficulty] = useState(null);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [customLanguages, setCustomLanguages] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [customTopics, setCustomTopics] = useState([]);

  const [questionsData, setQuestionsData] = useState(Q_DATA); // State for API data
  // const [isLoading, setIsLoading] = useState(false); // State for loading
  const [error, setError] = useState(null); // State for errors

  // Existing options
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
    { value: 'other', label: 'Other' },
  ];

  const topicOptions = [
    { value: 'all', label: 'All' },
    { value: 'oop', label: 'Object-Oriented Programming' },
    { value: 'loops', label: 'Loops' },
    {
      value: 'conditionalStatements',
      label: 'Conditional Statements',
    },
    { value: 'strings', label: 'Strings' },
    { value: 'arrays', label: 'Arrays' },
    { value: 'linkedLists', label: 'Linked Lists' },
    { value: 'stacks', label: 'Stacks' },
    { value: 'queues', label: 'Queues' },
    {
      value: 'sorting',
      label: 'Sorting Algorithms',
    },
    { value: 'searching', label: 'Searching Algorithms' },
    { value: 'recursion', label: 'Recursion' },
    { value: 'hashing', label: 'Hashing' },
    { value: 'other', label: 'Other' },
  ];

  // Handle changes
  const handleDifficultyChange = (selectedOption) =>
    setDifficulty(selectedOption);
  const handleLanguageChange = (selectedOptions) =>
    setSelectedLanguages(selectedOptions || []);
  const handleTopicsChange = (selectedOptions) =>
    setSelectedTopics(selectedOptions || []);

  // handle other programming language additions
  const handleAddCustomLanguage = () => {
    const input = document.getElementById('customLanguageInput');
    if (input.value.trim()) {
      setCustomLanguages((prev) => [...prev, input.value.trim()]);
      input.value = '';
    }
  };

  // handle other topic additions
  const handleAddCustomTopic = () => {
    const input = document.getElementById('customTopicInput');
    if (input.value.trim()) {
      setCustomTopics((prev) => [...prev, input.value.trim()]);
      input.value = '';
    }
  };

  // handle removals (for custom and regular selections)
  const handleRemoveLanguage = (index, isCustom) => {
    if (isCustom) {
      setCustomLanguages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setSelectedLanguages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleRemoveTopic = (index, isCustom) => {
    if (isCustom) {
      setCustomTopics((prev) => prev.filter((_, i) => i !== index));
    } else {
      setSelectedTopics((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async () => {
    // Prepare data to send as form data
    const formData = new FormData();

    // Filter out "other" from the selected languages and topics
    const filteredLanguages = [
      ...selectedLanguages.map((lang) => lang.value),
      ...customLanguages,
    ].filter((lang) => lang !== 'other'); // Remove 'other' if present

    const filteredTopics = [
      ...selectedTopics.map((topic) => topic.value),
      ...customTopics,
    ].filter((topic) => topic !== 'other'); // Remove 'other' if present

    // Append filtered data to FormData
    formData.append('difficulty_level', difficulty ? difficulty.value : null);
    formData.append('programming_language', filteredLanguages.join(',')); // join the languages into a comma-separated string
    formData.append('topics', filteredTopics.join(',')); // join the topics into a comma-separated string

    const endpoint = API_ENDPOINTS.GENERATE_QUESTIONS;
    console.info(' ?????????????????????? endpoint: ', endpoint);
    const headers = {};

    // Headers are managed by fetchData based on the payload type
    const responseData = await fetchData(endpoint, formData, headers);

    // Handle the success case
    if (responseData.response && responseData.error === null) {
      // If responseData is not an error, process it
      setQuestionsData(responseData.response);
      console.log(
        '>>>>>>>>>>>>>>>>>>>> Questions generated:',
        responseData.response
      );
    } else {
      // If responseData contains an error, handle the error
      setError(responseData.error);
      console.error('Error generating questions:', responseData.error);
      console.info('>>>>>>>>>>>>>>>>>>>> error: ', error);
    }
  };

  // Render removable badges with cross buttons
  const renderRemovableBadges = (
    selections,
    customInputs,
    removeHandler,
    isCustom
  ) => (
    <>
      {selections.map((sel, index) => (
        <span key={index} className="badge bg-primary ms-2 position-relative">
          {sel.label}
          <button
            type="button"
            className="btn-close position-absolute top-0 end-0 mt-1 me-1 text-danger"
            aria-label="Close"
            onClick={() => removeHandler(index, isCustom)}
          ></button>
        </span>
      ))}
      {customInputs.map((input, index) => (
        <span key={index} className="badge bg-secondary ms-2 position-relative">
          {input}
          <button
            type="button"
            className="btn-close position-absolute top-0 end-0 mt-1 me-1 text-danger"
            aria-label="Close"
            onClick={() => removeHandler(index, true)}
          ></button>
        </span>
      ))}
    </>
  );

  return (
    <div className="col-8 col-md-6 col-lg-4 mt-3 mx-auto">
      <form>
        {/* Difficulty Section */}
        <div className="mb-3 row">
          <label htmlFor="difficultyLevel" className="col-sm-4 col-form-label">
            Difficulty Level
          </label>
          <div className="col-sm-8">
            <Select
              id="difficultyLevel"
              options={difficultyOptions}
              value={difficulty}
              onChange={handleDifficultyChange}
              placeholder="Select Difficulty"
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>
        </div>

        {/* Language Section */}
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
              onChange={handleLanguageChange}
              placeholder="Select Programming Languages"
              className="react-select-container"
              classNamePrefix="react-select"
            />
            {selectedLanguages.some((option) => option.value === 'other') && (
              <div className="mt-2">
                <div className="input-group">
                  <input
                    id="customLanguageInput"
                    type="text"
                    className="form-control"
                    placeholder="Specify other programming languages"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={handleAddCustomLanguage}
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Topics Section */}
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
              onChange={handleTopicsChange}
              placeholder="Select Topics"
              className="react-select-container"
              classNamePrefix="react-select"
            />
            {selectedTopics.some((option) => option.value === 'other') && (
              <div className="mt-2">
                <div className="input-group">
                  <input
                    id="customTopicInput"
                    type="text"
                    className="form-control"
                    placeholder="Specify other topics"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleAddCustomTopic}
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Summary Section */}
        <div className="summary-container">
          <div className="summary-item">
            <strong>Difficulty Level:</strong>
            <span className="values">
              {difficulty ? difficulty.label : 'None'}
            </span>
          </div>
          <div className="summary-item">
            <strong>Programming Languages:</strong>
            <span className="values">
              {selectedLanguages.length > 0 || customLanguages.length > 0 ? (
                <>
                  {renderRemovableBadges(
                    selectedLanguages,
                    customLanguages,
                    handleRemoveLanguage,
                    false
                  )}
                </>
              ) : (
                ' None'
              )}
            </span>
          </div>
          <div className="summary-item">
            <strong>Topics:</strong>
            <span className="values">
              {selectedTopics.length > 0 || customTopics.length > 0 ? (
                <>
                  {renderRemovableBadges(
                    selectedTopics,
                    customTopics,
                    handleRemoveTopic,
                    false
                  )}
                </>
              ) : (
                ' None'
              )}
            </span>
          </div>
        </div>
        {/* Submit Button */}
        <div className="mb-3 row">
          <div className="col-sm-12 text-center">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </form>

      {/* show question data if available */}
      {questionsData && (
        <div style={{ padding: '20px' }}>
          <QuestionsDisplay qData={questionsData} />
        </div>
      )}
    </div>
  );
}
