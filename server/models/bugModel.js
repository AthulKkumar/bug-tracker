const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    severity: { type: String, enum: ['low', 'medium', 'high'], required: true },
    status: { type: String, enum: ['new', 'in_progress', 'fixed', 'verified'], default: 'new' },
    assigneeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Bug', bugSchema);
