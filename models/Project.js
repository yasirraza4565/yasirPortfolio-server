const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Project = sequelize.define('Project', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(255), allowNull: false },
  details: { type: DataTypes.STRING(255) },
  description: { type: DataTypes.TEXT },
  tech_stack: { type: DataTypes.TEXT },
  github_link: { type: DataTypes.STRING(500) },
  live_link: { type: DataTypes.STRING(500) },
  image: { type: DataTypes.STRING(500) },
}, { tableName: 'projects', timestamps: true });

module.exports = Project;
