const { About } = require('../models');
const path = require('path');
const fs = require('fs');

const get = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create({
        name: 'Muhammad Yasir',
        title: 'Full Stack Developer',
        bio: 'Passionate developer crafting innovative web solutions.',
        profile_image: null,
        resume_link: null,
        frontend_skills: 'React, HTML5, CSS3, JavaScript',
        backend_skills: 'Node.js, Express, REST API',
        database_skills: 'MySQL, MongoDB, Sequelize',
        tools_skills: 'Git, Docker, VS Code, Figma',
      });
    }
    res.json({ success: true, data: about });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) about = await About.create({});
    const { name, title, bio, frontend_skills, backend_skills, database_skills, tools_skills } = req.body;
    let resume_link = req.body.resume_link !== undefined ? req.body.resume_link : about.resume_link;
    let profile_image = about.profile_image;
    
    if (req.files) {
      if (req.files['profile_image']) {
        if (profile_image) {
          const oldPath = path.join(__dirname, '..', profile_image);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        profile_image = `/uploads/${req.files['profile_image'][0].filename}`;
      }
      if (req.files['resume']) {
        if (about.resume_link && about.resume_link.startsWith('/uploads/')) {
          const oldPath = path.join(__dirname, '..', about.resume_link);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        resume_link = `/uploads/${req.files['resume'][0].filename}`;
      }
    } else if (req.file) {
      // fallback just in case
      if (req.file.fieldname === 'profile_image') {
        if (profile_image) {
          const oldPath = path.join(__dirname, '..', profile_image);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        profile_image = `/uploads/${req.file.filename}`;
      }
    }
    await about.update({ 
      name, title, bio, resume_link, profile_image,
      frontend_skills, backend_skills, database_skills, tools_skills
    });
    res.json({ success: true, data: about });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { get, update };
