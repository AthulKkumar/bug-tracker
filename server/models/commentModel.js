const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    bugId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bug', required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    body: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
