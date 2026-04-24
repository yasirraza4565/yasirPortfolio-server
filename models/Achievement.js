const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Achievement = sequelize.define('Achievement', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(255), allowNull: false },
  details: { type: DataTypes.TEXT },
  description: { type: DataTypes.TEXT },
  image: { type: DataTypes.STRING(500) },
}, { tableName: 'achievements', timestamps: true });

module.exports = Achievement;
