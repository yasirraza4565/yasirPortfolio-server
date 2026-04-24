const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Course = sequelize.define('Course', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  course_name: { type: DataTypes.STRING(255), allowNull: false },
  platform: { type: DataTypes.STRING(255) },
  details: { type: DataTypes.STRING(500) },
  description: { type: DataTypes.TEXT },
  certificate_link: { type: DataTypes.STRING(500) },
}, { tableName: 'courses', timestamps: true });

module.exports = Course;
