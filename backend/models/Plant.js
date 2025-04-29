const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  plantName: {
    type: String,
    required: true
  },
  diseaseName: {
    type: String,
    required: true
  },
  solutions: [{
    type: String,
    required: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Plant', plantSchema);