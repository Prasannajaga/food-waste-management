// src/routes/postRoutes.ts
import { Router } from 'express';
import  Post  from '../models/Post';    
import { findPosts } from '../service/postService';

const router = Router();



 
router.post('/', async (req, res) => {
try { 
  const payload = req.body;

  if(!payload.user_id){
    res.status(404).json({message : "userId is required"});
  } 

  if(!payload.expires_in){
    res.status(404).json({message : "userId is required"});
  }
  
  payload.created_at = new Date();
  payload.updated_at = new Date();

  const post = await Post.create(payload); 
  res.status(200).json(post);
} catch (error) { 
  res.status(500).json({ message: 'Error creating post' , error : error });
}
});
 

router.get('/', async (req, res) => {
  try {
     
    const user_id = req.query.userId ?? null; 

    if(!user_id){
      res.status(409).json({message : "userId is required"})
    } 

    const postsWithUser = await findPosts(user_id as string);
 
    res.json(postsWithUser);
  } catch (error) { 
     res.status(500).json({ message: 'Error fetching posts' });
  }
});

router.get('/all', async (req, res) => {
  try { 
    const postsWithUser = await findPosts();
    // const postsWithUser = await Post.findAll({
    //   include: [
    //     {
    //       model: User,
    //       attributes: ["user_id", "name", "email"], 
    //     },
    //     {
    //       model: Likes,
    //       as : "Likes",
    //       attributes: [], 
    //     },
    //     {
    //       model: Comment,
    //       attributes: ["comment_id", "comment" , "created_at"], 
    //       include : [
    //         {
    //           model : User,
    //           attributes : ["name"]
    //         }
    //       ]
    //     },
    //   ],
    //   attributes: {
    //     include: [
    //       [Sequelize.fn("COUNT", Sequelize.col("Likes.like_id")), "likeCount"]
    //     ]
    //   },
    //   group: [
    //   "Post.post_id",
    //   "Post.title",
    //   "Post.content",
    //   "Post.created_at",
    //   "User.user_id",
    //   "User.name",
    //   "User.email",
    //   "Comment.comment_id",
    //   "Comment.comment",
    //   "Comment.created_at",
    //   "Comment->User.user_id",
    //   "Comment->User.name", // must include nested associations
    //   ],
    // }); 
    res.json(postsWithUser);
  } catch (error) {
    console.log(error); 
    res.status(500).json({ message: 'Error fetching posts' });
  }
});
 

router.get('/:id', async (req, res) => {
  try { 
    const id = req.params.id; 
     
    const post = await Post.findByPk(id);
     if (!post) {
      res.status(404).json({ message: 'Post not found' });
    } else {
       res.json(post);
    }
  } catch (error) {
     res.status(500).json({ message: 'Error fetching post' });
  }
});
 
router.put('/:id', async (req, res) => {
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
});
 
router.delete('/:id', async (req, res) => {
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
});

export default router;

