import Loader from '../components/Loader';
import Questions from '../components/Questions';
import QuestionsForm from '../components/QuestionsForm';
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const ActiveRoutes = () => {
  return (
    <>
      <div className="page-wrapper home-1">
        <Suspense fallback={<Loader />}>
          <div className="container z-index-3">
            <div className="row">
              <Routes>
                <Route path="/" element={<QuestionsForm />} />
                <Route path="/questions" element={<Questions />} />
                {/* <Route
                  path="/faq"
                  element={
                    <FAQ experience={calculateExperience(experienceData)} />
                  }
                />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Error />} /> */}
              </Routes>
            </div>
          </div>
        </Suspense>
      </div>
    </>
  );
};

export default ActiveRoutes;
