const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SocialLink = sequelize.define('SocialLink', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  platform: { type: DataTypes.STRING(100), allowNull: false },
  url: { type: DataTypes.STRING(500) },
  icon: { type: DataTypes.STRING(100) },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'social_links', timestamps: true });

module.exports = SocialLink;
