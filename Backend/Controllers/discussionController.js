const Discussion = require('../Model/Discussion');

// Create a new discussion
exports.createDiscussion = async (req, res) => {
    try {
        const { subject, message } = req.body;
        const discussion = new Discussion({
            subject,
            message,
            userId: req.user._id, // Assuming you have user authentication middleware
            images: req.files ? req.files.map(file => file.path) : []
        });
        
        const savedDiscussion = await discussion.save();
        res.status(201).json(savedDiscussion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all discussions
exports.getAllDiscussions = async (req, res) => {
    try {
        const discussions = await Discussion.find()
            .sort({ createdAt: -1 })
            .populate('userId', 'name email');
        res.json(discussions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user's discussions
exports.getUserDiscussions = async (req, res) => {
    try {
        const discussions = await Discussion.find({ userId: req.user._id })
            .sort({ createdAt: -1 });
        res.json(discussions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a discussion
exports.updateDiscussion = async (req, res) => {
    try {
        const { subject, message } = req.body;
        const discussion = await Discussion.findOne({ 
            _id: req.params.id,
            userId: req.user._id
        });

        if (!discussion) {
            return res.status(404).json({ message: 'Discussion not found or unauthorized' });
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
};

// Delete a discussion
exports.deleteDiscussion = async (req, res) => {
    try {
        const discussion = await Discussion.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!discussion) {
            return res.status(404).json({ message: 'Discussion not found or unauthorized' });
        }

        res.json({ message: 'Discussion deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 