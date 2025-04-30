const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Discussion = require('../Model/Discussion');

// Get all discussions
router.get('/', async (req, res) => {
    try {
        const discussions = await Discussion.find()
            .sort({ createdAt: -1 });
        res.json(discussions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single discussion gff
router.get('/:id', async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id);
        if (!discussion) {
            return res.status(404).json({ message: 'Discussion not found' });
        }
        res.json(discussion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new discussion
router.post('/', upload.array('images', 5), async (req, res) => {
    try {
        const { subject, message } = req.body;
        const discussion = new Discussion({
            subject,
            message,
            images: req.files ? req.files.map(file => file.path) : []
        });
        
        const savedDiscussion = await discussion.save();
        res.status(201).json(savedDiscussion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a discussion
router.put('/:id', upload.array('images', 5), async (req, res) => {
    try {
        const { subject, message } = req.body;
        const discussion = await Discussion.findById(req.params.id);

        if (!discussion) {
            return res.status(404).json({ message: 'Discussion not found' });
        }

        discussion.subject = subject || discussion.subject;
        discussion.message = message || discussion.message;
        discussion.updatedAt = Date.now();
        
        if (req.files && req.files.length > 0) {
            discussion.images = req.files.map(file => file.path);
        }

        const updatedDiscussion = await discussion.save();
        res.json(updatedDiscussion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a discussion
router.delete('/:id', async (req, res) => {
    try {
        const discussion = await Discussion.findByIdAndDelete(req.params.id);

        if (!discussion) {
            return res.status(404).json({ message: 'Discussion not found' });
        }

        res.json({ message: 'Discussion deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 