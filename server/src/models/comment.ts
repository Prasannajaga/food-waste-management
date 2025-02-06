import { DataTypes } from "sequelize"; 
import { sequelize } from "../config/dbClient"; 
import User from "./Users"; 
import Post from "./Post";

const Comment = sequelize.define("Comment", {
  comment_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Post,
      key: "post_id",
    },
    onDelete: "CASCADE",
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "user_id",
    },
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "comments",
  timestamps: false,
});

export default Comment;
