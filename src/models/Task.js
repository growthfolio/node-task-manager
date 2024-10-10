const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  status: {
    type: String,
    enum: ['pending', 'complete'],
    default: 'pending',
  },
});

module.exports = mongoose.model('Task', TaskSchema);
