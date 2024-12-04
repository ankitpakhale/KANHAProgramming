import React, { useState } from 'react';
import Select from 'react-select';

export default function QuestionsForm() {
  const [difficulty, setDifficulty] = useState(null);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [customLanguages, setCustomLanguages] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [customTopics, setCustomTopics] = useState([]);

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

  // Handle custom additions
  const handleAddCustomLanguage = () => {
    const input = document.getElementById('customLanguageInput');
    if (input.value.trim()) {
      setCustomLanguages((prev) => [...prev, input.value.trim()]);
      input.value = '';
    }
  };

  const handleAddCustomTopic = () => {
    const input = document.getElementById('customTopicInput');
    if (input.value.trim()) {
      setCustomTopics((prev) => [...prev, input.value.trim()]);
      input.value = '';
    }
  };

  // Handle removals
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

  // Render removable badges
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
            className="btn-close btn-close-white position-absolute end-0 me-1"
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
            className="btn-close btn-close-white position-absolute end-0 me-1"
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
                  {selectedLanguages.map((lang, index) => (
                    <span key={index} className="badge bg-primary ms-2">
                      {lang.label}
                    </span>
                  ))}
                  {customLanguages.map((lang, index) => (
                    <span key={index} className="badge bg-secondary ms-2">
                      {lang}
                    </span>
                  ))}
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
                  {selectedTopics.map((topic, index) => (
                    <span key={index} className="badge bg-primary ms-2">
                      {topic.label}
                    </span>
                  ))}
                  {customTopics.map((topic, index) => (
                    <span key={index} className="badge bg-secondary ms-2">
                      {topic}
                    </span>
                  ))}
                </>
              ) : (
                ' None'
              )}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
