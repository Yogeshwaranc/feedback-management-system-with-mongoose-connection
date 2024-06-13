// frontend/src/components/Feedback.js

import React from 'react';

function Feedback({ feedback, setEditingFeedback, deleteFeedback }) {
  return (
    <div className="feedback">
      <h3>{feedback.user}</h3>
      <p>{feedback.comment}</p>
      <p>Rating: {feedback.rating}</p>
      <button onClick={() => setEditingFeedback(feedback)}>Edit</button>
      <button onClick={() => deleteFeedback(feedback.id)}>Delete</button>
    </div>
  );
}

export default Feedback;
