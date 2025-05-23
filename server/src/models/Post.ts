import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbClient";  
import User from "./Users";

const Post = sequelize.define("Post", {
  post_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "user_id",
    },
  },
  title: {
    type: DataTypes.STRING(255),
  },
  description: {
    type: DataTypes.TEXT,
  },
  lat: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    defaultValue : 0
  },
  lng: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    defaultValue : 0
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: "available",
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  expires_in: {
    type: DataTypes.DATE, 
    allowNull : false
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "posts",
  timestamps: false,
});
 

export default Post;
