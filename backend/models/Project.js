const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  longDescription: {
    type: String,
    required: true
  },
  owner: {
    name: String,
    id: String,
    title: String,
    avatar: String,
    location: String,
    joinedDate: String
  },
  category: String,
  skills: [String],
  collaborators: [{
    id: String,
    name: String,
    title: String,
    avatar: String,
    role: String
  }],
  openRoles: [{
    id: Number,
    title: String,
    description: String,
    skills: [String],
    commitment: String
  }],
  location: String,
  startDate: String,
  timeline: String,
  updates: [{
    id: Number,
    author: String,
    date: String,
    content: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', projectSchema);