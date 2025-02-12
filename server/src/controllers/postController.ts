// src/controllers/postController.ts
import { Request, Response } from 'express';
import Post  from '../models/Post';

class PostController {
  async createPost(req: Request, res: Response) {
    try {
      const post = await Post.create(req.body);
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ message: 'Error creating post' });
    }
  }

  async getAllPosts(req: Request, res: Response) {
    try {
      const posts = await Post.findAll();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Error getting all posts' });
    }
  }

  async getPostById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const post = await Post.findByPk(id);
      if (!post) {
        res.status(404).json({ message: 'Post not found' });
      } else {
        res.json(post);
      }
    } catch (error) {
      res.status(500).json({ message: 'Error getting post by id' });
    }
  }

  async updatePost(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const post = await Post.findByPk(id);
      if (!post) {
        res.status(404).json({ message: 'Post not found' });
      } else {
        await post.update(req.body);
        res.json(post);
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating post' });
    }
  }

  async deletePost(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const post = await Post.findByPk(id);
      if (!post) {
        res.status(404).json({ message: 'Post not found' });
      } else {
        await post.destroy();
        res.json({ message: 'Post deleted successfully' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting post' });
    }
  }
}

export default PostController;