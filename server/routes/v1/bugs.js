const express = require('express');

const { createBug, getBugs, getBugById, updateBug, deleteBug } = require('../../controllers/bugController');
const { addComment, getComments } = require('../../controllers/commentController');

const bugRouter = express.Router();

bugRouter.route('/')
    .get(getBugs)
    .post(createBug);

bugRouter.route('/:id')
    .get(getBugById)
    .put(updateBug)
    .delete(deleteBug);

bugRouter.route('/:bugId/comments')
    .get(getComments)
    .post(addComment);

module.exports = bugRouter;
