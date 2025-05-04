import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbClient";  
import User from "./Users"; 
import Post from "./Post";

const Claim = sequelize.define("Claim", {
  claim_id: {
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
  claimer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique : true,
    references: {
      model: User,
      key: "user_id",
    },
  },
  claimed_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: "pending",
  },
}, {
  tableName: "claims",
  timestamps: false,
});

export default Claim;
