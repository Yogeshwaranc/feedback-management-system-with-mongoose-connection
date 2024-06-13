// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FeedbackTable from './Components/FeedbackTable';
import AddFeedback from './Components/AddFeedback';
import EditFeedback from './Components/EditFeedback';
import './App.css';

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    const response = await axios.get('http://localhost:5001/api/feedbacks');
    setFeedbacks(response.data);
  };

  const addFeedback = async (feedback) => {
    const response = await axios.post('http://localhost:5001/api/feedbacks', feedback);
    setFeedbacks([...feedbacks, response.data]);
  };

  const updateFeedback = async (id, updatedFeedback) => {
    const response = await axios.put(`http://localhost:5001/api/feedbacks/${id}`, updatedFeedback);
    setFeedbacks(feedbacks.map((feedback) => (feedback.id === id ? response.data : feedback)));
    setEditingFeedback(null);
  };

  const deleteFeedback = async (id) => {
    await axios.delete(`http://localhost:5001/api/feedbacks/${id}`);
    setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id));
  };

  const filteredFeedbacks = feedbacks.filter(
    feedback =>
      feedback.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Feedback Management System</h1>
      <input
        type="text"
        placeholder="Search feedback"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <AddFeedback addFeedback={addFeedback} />
      {editingFeedback && <EditFeedback editingFeedback={editingFeedback} updateFeedback={updateFeedback} />}
      <FeedbackTable feedbacks={filteredFeedbacks} setEditingFeedback={setEditingFeedback} deleteFeedback={deleteFeedback} />
    </div>
  );
}

export default App;
