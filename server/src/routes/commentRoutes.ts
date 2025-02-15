// src/routes/commentRoutes.ts
import { Router } from 'express';
import  Comment  from '../models/comment';

const router = Router();

// Create
// This route creates a new comment and returns the newly created comment
router.post('/comments', async (req, res) => {
  try {
    // Create a new comment with the data sent in the request body
    const comment = await Comment.create(req.body);
    // Return the newly created comment
    res.json(comment);
  } catch (error) {
    // If there's an error, return a 500 status code and a JSON object with an error message
    res.status(500).json({ message: 'Error creating comment' });
  }
});

// Read
// This route fetches all comments from the database and returns them
router.get('/comments', async (req, res) => {
  try {
    // Fetch all comments from the database
    const comments = await Comment.findAll();
    // Return all comments
    res.json(comments);
  } catch (error) {
    // If there's an error, return a 500 status code and a JSON object with an error message
    res.status(500).json({ message: 'Error fetching comments' });
  }
});

// Read by ID
// This route fetches a comment by its id and returns it
router.get('/comments/:id', async (req, res) => {
  try {
    // Get the id of the comment from the request params
    const id = req.params.id;
    // Fetch the comment with the given id
    const comment = await Comment.findByPk(id);
    // If the comment is not found, return a 404 status code and a JSON object with an error message
    if (!comment) {
      res.status(404).json({ message: 'Comment not found' });
    } else {
      // If the comment is found, return it
      res.json(comment);
    }
  } catch (error) {
    // If there's an error, return a 500 status code and a JSON object with an error message
    res.status(500).json({ message: 'Error fetching comment' });
  }
});

// Update
// This route updates a comment and returns the updated comment
router.put('/comments/:id', async (req, res) => {
  try {
    // Get the id of the comment from the request params
    const id = req.params.id;
    // Fetch the comment with the given id
    const comment = await Comment.findByPk(id);
    // If the comment is not found, return a 404 status code and a JSON object with an error message
    if (!comment) {
      res.status(404).json({ message: 'Comment not found' });
    } else {
      // If the comment is found, update it with the data sent in the request body
      await comment.update(req.body);
      // Return the updated comment
      res.json(comment);
    }
  } catch (error) {
    // If there's an error, return a 500 status code and a JSON object with an error message
    res.status(500).json({ message: 'Error updating comment' });
  }
});

// Delete
// This route deletes a comment and returns a success message
router.delete('/comments/:id', async (req, res) => {
  try {
    // Get the id of the comment from the request params
    const id = req.params.id;
    // Fetch the comment with the given id
    const comment = await Comment.findByPk(id);
    // If the comment is not found, return a 404 status code and a JSON object with an error message
    if (!comment) {
      res.status(404).json({ message: 'Comment not found' });
    } else {
      // If the comment is found, delete it
      await comment.destroy();
      // Return a success message
      res.json({ message: 'Comment deleted successfully' });
    }
  } catch (error) {
    // If there's an error, return a 500 status code and a JSON object with an error message
    res.status(500).json({ message: 'Error deleting comment' });
  }
});

export default router;

