const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


const cors = require('cors');

app.use(cors({
  origin: 'http://127.0.0.1:5500',
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
}));
app.options('*', cors());  

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/tasks', taskRoutes);

app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
