const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Media = sequelize.define('Media', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  type: { type: DataTypes.ENUM('logo', 'image', 'profile'), allowNull: false },
  filename: { type: DataTypes.STRING(500) },
  path: { type: DataTypes.STRING(500) },
}, { tableName: 'media', timestamps: true });

module.exports = Media;
