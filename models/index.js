const sequelize = require('../config/database');
const User = require('./User');
const Project = require('./Project');
const Experience = require('./Experience');
const Achievement = require('./Achievement');
const Course = require('./Course');
const NavbarLink = require('./NavbarLink');
const About = require('./About');
const SocialLink = require('./SocialLink');
const Media = require('./Media');
const ContactMessage = require('./ContactMessage');
const Settings = require('./Settings');

module.exports = {
  sequelize,
  User,
  Project,
  Experience,
  Achievement,
  Course,
  NavbarLink,
  About,
  SocialLink,
  Media,
  ContactMessage,
  Settings,
};
