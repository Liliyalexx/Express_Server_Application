const express = require('express');
const router = express.Router();
const comments = require('../data/comments');

let commentId = comments.length + 1; // Start generating IDs after existing comments

// GET all comments
router.get('/', (req, res) => {
  res.json(comments);
});

// GET a comment by ID
router.get('/:id', (req, res) => {
  const comment = comments.find((c) => c.id === parseInt(req.params.id));
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).send('Comment not found');
  }
});

// POST a new comment
router.post('/', (req, res) => {
  const { userId, bookId, body } = req.body;
  if (userId && bookId && body) {
    const newComment = { id: commentId++, userId, bookId, body };
    comments.push(newComment);
    res.status(201).json(newComment);
  } else {
    res
      .status(400)
      .json({ error: 'Invalid data. Required fields: userId, bookId, body.' });
  }
});

// PATCH update a comment
router.patch('/:id', (req, res) => {
  const comment = comments.find((c) => c.id === parseInt(req.params.id));
  if (comment) {
    comment.body = req.body.body || comment.body;
    res.json(comment);
  } else {
    res.status(404).send('Comment not found');
  }
});

// DELETE a comment
router.delete('/:id', (req, res) => {
  const commentIndex = comments.findIndex(
    (c) => c.id === parseInt(req.params.id)
  );
  if (commentIndex !== -1) {
    comments.splice(commentIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Comment not found');
  }
});

module.exports = router;
