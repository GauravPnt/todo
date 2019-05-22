const mongoose = require('mongoose');

// Todos Schema
const todoSchema = new mongoose.Schema({
  text: {
    type: String
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  priority: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ToDo = mongoose.model('ToDo', todoSchema);

exports.ToDo = ToDo;