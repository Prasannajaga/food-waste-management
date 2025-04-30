// models/index.ts
import User from "./Users";
import Post from "./Post";
import Comment from "./comment";
import Likes from "./Like";
 
Post.hasMany(Likes, { as: 'Likes', foreignKey: 'post_id' });
Post.hasMany(Comment, { as: 'Comments', foreignKey: 'post_id' });
Post.belongsTo(User, { foreignKey: 'user_id' });

// models/Likes.js
Likes.belongsTo(Post, { foreignKey: 'post_id' });

// models/Comment.js
Comment.belongsTo(Post, { foreignKey: 'post_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

// models/User.js
User.hasMany(Post, { foreignKey: 'user_id' });
User.hasMany(Comment, { foreignKey: 'user_id' });

export { User, Post , Comment , Likes};
