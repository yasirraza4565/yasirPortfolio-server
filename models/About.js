const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const About = sequelize.define('About', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(255) },
  title: { type: DataTypes.STRING(255) },
  bio: { type: DataTypes.TEXT },
  profile_image: { type: DataTypes.STRING(500) },
  resume_link: { type: DataTypes.STRING(500) },
  frontend_skills: { type: DataTypes.STRING(500) },
  backend_skills: { type: DataTypes.STRING(500) },
  database_skills: { type: DataTypes.STRING(500) },
  tools_skills: { type: DataTypes.STRING(500) },
}, { tableName: 'about', timestamps: true });

module.exports = About;
