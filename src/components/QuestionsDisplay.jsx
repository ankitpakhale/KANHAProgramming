import React from 'react';
import PropTypes from 'prop-types';

export default function QuestionsDisplay({ qData }) {
  var questionsData = qData.payload;
  console.info(
    '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! questionsData: ',
    questionsData
  );
  return <div>QuestionsDisplay</div>;
}

QuestionsDisplay.propTypes = {
  qData: PropTypes.array.isRequired, // datatype of qData
};
