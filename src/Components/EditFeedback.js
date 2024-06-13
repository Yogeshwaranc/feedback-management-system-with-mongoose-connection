// frontend/src/components/EditFeedback.js

import React, { useState, useEffect } from 'react';

function EditFeedback({ editingFeedback, updateFeedback }) {
  const [feedback, setFeedback] = useState(editingFeedback);

  useEffect(() => {
    setFeedback(editingFeedback);
  }, [editingFeedback]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFeedback(feedback.id, feedback);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Feedback</h2>
      <input name="user" placeholder="User Name" value={feedback.user} onChange={handleChange} required />
      <textarea name="comment" placeholder="Comment" value={feedback.comment} onChange={handleChange} required />
      <input
        name="rating"
        type="number"
        placeholder="Rating (1-5)"
        value={feedback.rating}
        onChange={handleChange}
        min="1"
        max="5"
        required
      />
      <button type="submit">Update Feedback</button>
    </form>
  );
}

export default EditFeedback;
