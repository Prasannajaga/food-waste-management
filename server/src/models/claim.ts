import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/dbClient"; 
import Post from "./post";
import User from "./Users";

class Claim extends Model {}

Claim.init(
  {
    claim_id: {
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
    claimer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
  },
  {
    sequelize,
    modelName: "Claim",
    timestamps: false,
  }
);

export default Claim;
