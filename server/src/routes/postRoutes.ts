// src/routes/postRoutes.ts
import { Router } from 'express';
import  Post  from '../models/Post';

const router = Router();

// Create
// This route creates a new post and returns the newly created post
router.post('/', async (req, res) => {
  try { 
    const payload = req.body;

    if(!payload.user_id){
      res.status(404).json({message : "userId is required"});
    }


    // Create a new post with the data sent in the request body
    const post = await Post.create(payload);
    // Return the newly created post
    res.status(200).json(post);
  } catch (error) {
    // If there's an error, return a 500 status code and a JSON object with an error message
    res.status(500).json({ message: 'Error creating post' });
  }
});

// Read
// This route fetches all posts from the database and returns them
router.get('/', async (req, res) => {
  try {
    // Fetch all posts from the database
    const posts = await Post.findAll();
    // Return all posts
    res.json(posts);
  } catch (error) {
    // If there's an error, return a 500 status code and a JSON object with an error message
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// Read by ID
// This route fetches a post by its id and returns it
router.get('/:id', async (req, res) => {
  try {
    // Get the id of the post from the request params
    const id = req.params.id;
    // Fetch the post with the given id
    const post = await Post.findByPk(id);
    // If the post is not found, return a 404 status code and a JSON object with an error message
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
    } else {
      // If the post is found, return it
      res.json(post);
    }
  } catch (error) {
    // If there's an error, return a 500 status code and a JSON object with an error message
    res.status(500).json({ message: 'Error fetching post' });
  }
});

// Update
// This route updates a post and returns the updated post
router.put('/:id', async (req, res) => {
  try {
    // Get the id of the post from the request params
    const id = req.params.id;
    // Fetch the post with the given id
    const post = await Post.findByPk(id);
    // If the post is not found, return a 404 status code and a JSON object with an error message
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
    } else {
      // If the post is found, update it with the data sent in the request body
      await post.update(req.body);
      // Return the updated post
      res.json(post);
    }
  } catch (error) {
    // If there's an error, return a 500 status code and a JSON object with an error message
    res.status(500).json({ message: 'Error updating post' });
  }
});

// Delete
// This route deletes a post and returns a success message
router.delete('/:id', async (req, res) => {
  try {
    // Get the id of the post from the request params
    const id = req.params.id;
    // Fetch the post with the given id
    const post = await Post.findByPk(id);
    // If the post is not found, return a 404 status code and a JSON object with an error message
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
    } else {
      // If the post is found, delete it
      await post.destroy();
      // Return a success message
      res.json({ message: 'Post deleted successfully' });
    }
  } catch (error) {
    // If there's an error, return a 500 status code and a JSON object with an error message
    res.status(500).json({ message: 'Error deleting post' });
  }
});

export default router;

