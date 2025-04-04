const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://naukariuser:Kasi3056@cluster0.jwmykfq.mongodb.net/naukariDB?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  postedAt: { type: Date, default: Date.now }
});

const Job = mongoose.model('Job', jobSchema);

// GET all jobs
app.get('/api/jobs', async (req, res) => {
  const jobs = await Job.find().sort({ postedAt: -1 });
  res.json(jobs);
});

// POST new job
app.post('/api/jobs', async (req, res) => {
  const newJob = new Job(req.body);
  await newJob.save();
  res.status(201).json(newJob);
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
app.get("/", (req, res) => {
    res.send("Naukari Backend is Live!");
});
