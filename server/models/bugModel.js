const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    severity: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
    status: { type: String, enum: ['New', 'In Progress', 'Fixed', 'Verified'], default: 'New' },
    assigneeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Bug', bugSchema);
