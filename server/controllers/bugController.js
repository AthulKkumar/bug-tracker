const Bug = require('../models/bugModel');

exports.createBug = async (req, res) => {
    try {
        const { title, description, severity, assigneeId } = req.body;
        const bug = await Bug.create({ title, description, severity, assigneeId });
        res.status(201).json(bug);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBugs = async (req, res) => {
    try {
        const { severity, status } = req.query;
        const filter = {};
        if (severity) filter.severity = severity;
        if (status) filter.status = status;
        const bugs = await Bug.find(filter).populate('assigneeId', 'email');
        res.json(bugs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBugById = async (req, res) => {
    try {
        const bug = await Bug.findById(req.params.id).populate('assigneeId', 'email');
        if (!bug) return res.status(404).json({ message: 'Bug not found' });
        res.json(bug);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateBug = async (req, res) => {
    try {
        const bug = await Bug.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!bug) return res.status(404).json({ message: 'Bug not found' });
        res.json(bug);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteBug = async (req, res) => {
    try {
        const bug = await Bug.findByIdAndDelete(req.params.id);
        if (!bug) return res.status(404).json({ message: 'Bug not found' });
        res.json({ message: 'Bug removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
