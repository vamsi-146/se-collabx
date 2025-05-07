const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Update this to your frontend port
  credentials: true
}));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Import routes
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes'); // Add this line

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes); // Add this line

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected');
  app.listen(5000, () => console.log('🚀 Server started on http://localhost:5000'));
}).catch(err => console.log('❌ MongoDB connection error:', err));