const Comment = require('../models/commentModel');

exports.addComment = async (req, res) => {
    try {
        const { body } = req.body;
        const comment = await Comment.create({
            bugId: req.params.bugId,
            authorId: req.user._id,
            body,
        });
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ bugId: req.params.bugId }).populate('authorId', 'email');
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
