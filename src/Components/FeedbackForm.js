// frontend/src/components/FeedbackForm.js

import React, { useState, useEffect } from 'react';

function FeedbackForm({ initialFeedback, handleSubmit, buttonLabel }) {
  const [feedback, setFeedback] = useState(initialFeedback);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    setFeedback(initialFeedback);
  }, [initialFeedback]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const validate = () => {
    let errors = {};
    if (!feedback.user) errors.user = 'User name is required';
    if (!feedback.comment) errors.comment = 'Comment is required';
    if (!feedback.rating || feedback.rating < 1 || feedback.rating > 5) errors.rating = 'Rating must be between 1 and 5';
    return errors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        await handleSubmit(feedback);
        setMessage('Feedback submitted successfully');
        setFeedback({ user: '', comment: '', rating: '' });
        setErrors({});
      } catch (error) {
        setMessage('Failed to submit feedback');
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>{buttonLabel} Feedback</h2>
      <div>
        <input
          name="user"
          placeholder="User Name"
          value={feedback.user}
          onChange={handleChange}
          required
        />
        {errors.user && <span className="error">{errors.user}</span>}
      </div>
      <div>
        <textarea
          name="comment"
          placeholder="Comment"
          value={feedback.comment}
          onChange={handleChange}
          required
        />
        {errors.comment && <span className="error">{errors.comment}</span>}
      </div>
      <div>
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
        {errors.rating && <span className="error">{errors.rating}</span>}
      </div>
      <button type="submit">{buttonLabel} Feedback</button>
      {message && <p className="message">{message}</p>}
    </form>
  );
}

export default FeedbackForm;
