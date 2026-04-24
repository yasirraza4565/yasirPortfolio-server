const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Settings = sequelize.define('Settings', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  key: { type: DataTypes.STRING(255), unique: true, allowNull: false },
  value: { type: DataTypes.TEXT },
  label: { type: DataTypes.STRING(255) },
  type: {
    type: DataTypes.ENUM('text', 'textarea', 'number', 'json'),
    defaultValue: 'text',
  },
}, { tableName: 'settings', timestamps: true });

module.exports = Settings;
