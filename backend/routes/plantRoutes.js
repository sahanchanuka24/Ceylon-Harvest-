const express = require('express');
const router = express.Router();
const Plant = require('../models/Plant');
const upload = require('../middleware/upload');

// Create new plant diagnosis
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { plantName, diseaseName, solutions } = req.body;
    
    const plant = new Plant({
      imageUrl: req.file.path,
      plantName,
      diseaseName,
      solutions: JSON.parse(solutions)
    });

    await plant.save();
    res.status(201).json(plant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all diagnoses
router.get('/', async (req, res) => {
  try {
    const plants = await Plant.find().sort({ createdAt: -1 });
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;