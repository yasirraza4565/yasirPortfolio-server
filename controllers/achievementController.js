const { Achievement } = require('../models');
const path = require('path');
const fs = require('fs');

const getAll = async (req, res) => {
  try {
    const data = await Achievement.findAll({ order: [['createdAt', 'DESC']] });
    console.log(`🏆 Achievements retrieved: ${data.length} found`);
    res.json({ success: true, data });
  } catch (error) {
    console.error('❌ Database error during achievement retrieval:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { title, details, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const item = await Achievement.create({ title, details, description, image });
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const item = await Achievement.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Achievement not found' });
    const { title, details, description } = req.body;
    let image = item.image;
    if (req.file) {
      if (image) {
        const oldPath = path.join(__dirname, '..', image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      image = `/uploads/${req.file.filename}`;
    }
    await item.update({ title, details, description, image });
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const item = await Achievement.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Achievement not found' });
    if (item.image) {
      const imgPath = path.join(__dirname, '..', item.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }
    await item.destroy();
    res.json({ success: true, message: 'Achievement deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAll, create, update, remove };
