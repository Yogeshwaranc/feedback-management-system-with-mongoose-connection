const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());

let db;
let feedbacksCollection;

const MONGO_URL = 'mongodb+srv://yogeshwaranc418:yogesh21@mern.wahbaff.mongodb.net/mern?retryWrites=true&w=majority&appName=mern';

MongoClient.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    console.log('Connected to MongoDB');
    db = client.db('mern');
    feedbacksCollection = db.collection('feedbacks');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

app.get('/api/feedbacks', async (req, res) => {
  try {
    const feedbacks = await feedbacksCollection.find().toArray();
    res.json(feedbacks);
  } catch (err) {
    console.error('Error fetching feedbacks:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/feedbacks', async (req, res) => {
  const feedback = req.body;
  try {
    const result = await feedbacksCollection.insertOne(feedback);
    res.json(result.ops[0]);
  } catch (err) {
    console.error('Error inserting feedback:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/api/feedbacks/:id', async (req, res) => {
  const feedbackId = req.params.id;
  const updatedFeedback = req.body;
  try {
    const result = await feedbacksCollection.findOneAndUpdate(
      { _id: ObjectId(feedbackId) },
      { $set: updatedFeedback },
      { returnOriginal: false }
    );
    if (result.value) {
      res.json(result.value);
    } else {
      res.status(404).send('Feedback not found');
    }
  } catch (err) {
    console.error('Error updating feedback:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/api/feedbacks/:id', async (req, res) => {
  const feedbackId = req.params.id;
  try {
    const result = await feedbacksCollection.deleteOne({ _id: ObjectId(feedbackId) });
    if (result.deletedCount === 1) {
      res.status(204).send();
    } else {
      res.status(404).send('Feedback not found');
    }
  } catch (err) {
    console.error('Error deleting feedback:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
