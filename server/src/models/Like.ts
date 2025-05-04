import { DataTypes } from "sequelize"; 
import { sequelize } from "../config/dbClient"; 
import User from "./Users"; 
import Post from "./Post";

const Likes = sequelize.define("Comment", {
  like_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique : true,
    references: {
      model: Post,
      key: "post_id",
    },
    onDelete: "CASCADE",
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique : true,
    references: {
      model: User,
      key: "user_id",
    },
  }, 
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "likes",
  timestamps: false,
});

export default Likes;
