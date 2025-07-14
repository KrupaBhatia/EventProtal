const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

console.log("Loaded DB credentials:", {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME
});

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

// Define User model
const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  lastSessionToken: { type: DataTypes.STRING },
});

// Define Event model
const Event = sequelize.define('Event', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  categoryId: { type: DataTypes.INTEGER },
  photos: { type: DataTypes.JSON }, 
  publishAt: { type: DataTypes.DATE, allowNull: false },
  isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
});

const Category = sequelize.define('Category', {
  name: { type: DataTypes.STRING, allowNull: false },
  parentId: { type: DataTypes.INTEGER, allowNull: true }, // self-referencing
});


module.exports = {
  sequelize,
  Sequelize,
  User,
  Event,
  Category
};
