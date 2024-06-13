// frontend/src/components/AddFeedback.js

import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

function AddFeedback({ addFeedback }) {
  const [feedback, setFeedback] = useState({ user: '', comment: '', rating: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to add feedback
      const response = await axios.post('/api/feedbacks', feedback);
      // Check if the request was successful
      if (response.status === 200) {
        // Call the addFeedback function with the feedback data
        addFeedback(response.data);
        // Reset feedback state
        setFeedback({ user: '', comment: '', rating: '' });
      } else {
        // Handle unsuccessful request
        console.error('Failed to add feedback');
      }
    } catch (error) {
      console.error('Error adding feedback:', error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Feedback</h2>
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
      <button type="submit">Add Feedback</button>
    </form>
  );
}

export default AddFeedback;
