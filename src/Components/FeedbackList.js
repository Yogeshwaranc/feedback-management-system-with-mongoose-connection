// frontend/src/components/FeedbackList.js

import React from 'react';
import Feedback from './Feedback';

function FeedbackList({ feedbacks, setEditingFeedback, deleteFeedback }) {
  return (
    <div>
      <h2>Feedback List</h2>
      {feedbacks.map((feedback) => (
        <Feedback key={feedback.id} feedback={feedback} setEditingFeedback={setEditingFeedback} deleteFeedback={deleteFeedback} />
      ))}
    </div>
  );
}

export default FeedbackList;
