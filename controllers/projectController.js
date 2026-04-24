const { Project } = require('../models');
const path = require('path');
const fs = require('fs');

const getAll = async (req, res) => {
  try {
    const projects = await Project.findAll({ order: [['createdAt', 'DESC']] });
    console.log(`📂 Projects retrieved: ${projects.length} found`);
    res.json({ success: true, data: projects });
  } catch (error) {
    console.error('❌ Database error during project retrieval:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { name, details, description, tech_stack, github_link, live_link } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const project = await Project.create({ name, details, description, tech_stack, github_link, live_link, image });
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    const { name, details, description, tech_stack, github_link, live_link } = req.body;
    let image = project.image;
    if (req.file) {
      if (image) {
        const oldPath = path.join(__dirname, '..', image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      image = `/uploads/${req.file.filename}`;
    }
    await project.update({ name, details, description, tech_stack, github_link, live_link, image });
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    if (project.image) {
      const imgPath = path.join(__dirname, '..', project.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }
    await project.destroy();
    res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
