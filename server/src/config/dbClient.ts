import { Dialect, Sequelize } from "sequelize";
import { DB_CONFIG } from "./dbconfig.js";

// Database configuration
export const sequelize = new Sequelize(DB_CONFIG.database, DB_CONFIG.username, DB_CONFIG.password, {
  host: DB_CONFIG.host,
  dialect: DB_CONFIG.dialect as Dialect,
  port: DB_CONFIG.port, // Default MySQL port
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});



// Test connection function
export default async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to database:', error);
  }
}
 