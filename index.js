const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('your_mongo_url_here', { useNewUrlParser: true, useUnifiedTopology: true });

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  postedAt: { type: Date, default: Date.now }
});
const Job = mongoose.model('Job', jobSchema);

app.get('/api/jobs', async (req, res) => {
  const jobs = await Job.find().sort({ postedAt: -1 });
  res.json(jobs);
});

app.post('/api/jobs', async (req, res) => {
  const newJob = new Job(req.body);
  await newJob.save();
  res.status(201).json(newJob);
});

app.listen(3000, () => console.log('Server running'));
