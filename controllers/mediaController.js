const { Media } = require('../models');
const path = require('path');
const fs = require('fs');

const getAll = async (req, res) => {
  try {
    const data = await Media.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getLogo = async (req, res) => {
  try {
    const logo = await Media.findOne({ where: { type: 'logo' }, order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: logo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const upload = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    const type = req.body.type || 'image';
    if (type === 'logo') {
      const old = await Media.findOne({ where: { type: 'logo' } });
      if (old) {
        const oldPath = path.join(__dirname, '..', old.path);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        await old.destroy();
      }
    }
    const media = await Media.create({
      type,
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
    });
    res.status(201).json({ success: true, data: media });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const item = await Media.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Media not found' });
    const imgPath = path.join(__dirname, '..', item.path);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    await item.destroy();
    res.json({ success: true, message: 'Media deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAll, getLogo, upload, remove };
