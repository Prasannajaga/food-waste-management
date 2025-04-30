import { Comment, Likes, Post, User } from "../models";



const findPosts = async (user_id ?: string) => {
    const query : any = { 
        include: [
          {
            model: User,
            attributes: ['user_id', 'name', 'email'],
          },
          {
            model: Likes,
            as: 'Likes', // Alias to match hasMany association
            attributes: ["user_id"], // No attributes needed, only for counting
          },
          {
            model: Comment,
            as: 'Comments', // Alias to match hasMany association
            attributes: ['comment_id', 'comment', 'created_at'],
            required: false, // LEFT JOIN to include posts without comments
            include: [
              {
                model: User,
                attributes: ['name'],
              },
            ],
          },
        ],
        attributes: [
          'post_id',
          'title',
          'description',
          'lat',
          'lng',
          'status',
          'created_at',
          'updated_at',  
        ],
        group: [
          'Likes.like_id',
          'Post.post_id',
          'Post.title',
          'Post.description',
          'Post.lat',
          'Post.lng',
          'Post.status',
          'Post.created_at',
          'Post.updated_at',
          'User.user_id',
          'User.name',
          'User.email',
          'Comments.comment_id',
          'Comments.comment',
          'Comments.created_at',
          'Comments->User.user_id',
          'Comments->User.name',
        ],
    };

    if(user_id){
        query.where = {user_id};
    }
    return await Post.findAll(query);
}


export {findPosts};