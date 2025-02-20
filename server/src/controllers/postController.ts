import { Request, Response } from 'express';
import  Post  from '../models/Post';

// Create a new post
export const createPost = async (req: Request, res: Response) => {
    try {
        const post = await Post.create(req.body);
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error });
    }
};

// Get all posts
export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.findAll();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
    }
};

// Get a post by ID
export const getPostById = async (req: Request, res: Response) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post', error });
    }
};

// Update a post by ID
export const updatePost = async (req: Request, res: Response) => {
    try {
        const [updated] = await Post.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedPost = await Post.findByPk(req.params.id);
            res.status(200).json(updatedPost);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating post', error });
    }
};

// Delete a post by ID
export const deletePost = async (req: Request, res: Response) => {
    try {
        const deleted = await Post.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(204).json({ message: 'Post deleted' });
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error });
    }
};