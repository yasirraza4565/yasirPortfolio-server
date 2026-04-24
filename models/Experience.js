const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Experience = sequelize.define('Experience', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  role: { type: DataTypes.STRING(255), allowNull: false },
  company: { type: DataTypes.STRING(255), allowNull: false },
  duration: { type: DataTypes.STRING(255) },
  details: { type: DataTypes.STRING(255) },
  description: { type: DataTypes.TEXT },
}, { tableName: 'experience', timestamps: true });

module.exports = Experience;
