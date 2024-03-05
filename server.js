const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./src/routes/userRoutes');

const app = express();
const port = process.env.PORT || 5590;
dotenv.config({ path: './.env' });

const limiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 500, 
  message: 'Too many requests, please try again later',
});

app.use(cors());
app.use(express.json());
app.use(limiter);
app.use('/', authRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
