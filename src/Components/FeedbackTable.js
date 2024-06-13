// frontend/src/Components/FeedbackTable.js

import React from 'react';
import Feedback from './Feedback';

function FeedbackTable({ feedbacks, setEditingFeedback, deleteFeedback }) {
  return (
    <div className="FeedbackTable">
      <h2>Feedback List</h2>
      {feedbacks.map((feedback) => (
        <Feedback key={feedback.id} feedback={feedback} setEditingFeedback={setEditingFeedback} deleteFeedback={deleteFeedback} />
      ))}
    </div>
  );
}

export default FeedbackTable;
