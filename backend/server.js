const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


require('dotenv').config();
const cookieParser = require('cookie-parser')

const authRoutes = require('./routes/auth');
const storeRoutes = require('./routes/stores');

const userRoutes = require('./routes/users');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cookieParser());


// app.use(helmet());


// const CLIENT_URL = "http://localhost:5173/";
// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma"
    ],
    credentials: true
  })
);

// Body parsing middleware
app.use(express.json());




// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://arizwan9002:Riz7878wan@cluster0.hrxq9wt.mongodb.net/")
  .then(() => {
    console.log('✅ Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stores', storeRoutes);

app.use('/api/users', userRoutes);



// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API URL: http://localhost:${PORT}`);
});



