const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const NavbarLink = sequelize.define('NavbarLink', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  label: { type: DataTypes.STRING(255), allowNull: false },
  href: { type: DataTypes.STRING(255), allowNull: false },
  order_index: { type: DataTypes.INTEGER, defaultValue: 0 },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'navbar_links', timestamps: true });

module.exports = NavbarLink;
