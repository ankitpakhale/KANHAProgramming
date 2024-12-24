import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QuestionsProvider } from './context/QuestionsContext';
import QuestionsForm from './components/QuestionsForm';
import Questions from './components/Questions';

function App() {
  return (
    <QuestionsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<QuestionsForm />} />
          <Route path="/questions" element={<Questions />} />
        </Routes>
      </Router>
    </QuestionsProvider>
  );
}

export default App;
