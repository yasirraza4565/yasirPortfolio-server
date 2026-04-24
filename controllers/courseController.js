const { Course } = require('../models');

const getAll = async (req, res) => {
  try {
    const data = await Course.findAll({ order: [['createdAt', 'DESC']] });
    console.log(`📚 Courses retrieved: ${data.length} found`);
    res.json({ success: true, data });
  } catch (error) {
    console.error('❌ Database error during course retrieval:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { course_name, platform, details, description } = req.body;
    const certificate_link = req.file ? `/uploads/${req.file.filename}` : req.body.certificate_link;
    const item = await Course.create({ course_name, platform, details, description, certificate_link });
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const item = await Course.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Course not found' });
    const { course_name, platform, details, description } = req.body;
    let certificate_link = item.certificate_link;
    if (req.file) {
      if (certificate_link && certificate_link.startsWith('/uploads/')) {
        const path = require('path');
        const fs = require('fs');
        const oldPath = path.join(__dirname, '..', certificate_link);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      certificate_link = `/uploads/${req.file.filename}`;
    } else if (req.body.certificate_link !== undefined) {
      certificate_link = req.body.certificate_link;
    }
    await item.update({ course_name, platform, details, description, certificate_link });
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const item = await Course.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Course not found' });
    if (item.certificate_link && item.certificate_link.startsWith('/uploads/')) {
      const path = require('path');
      const fs = require('fs');
      const imgPath = path.join(__dirname, '..', item.certificate_link);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }
    await item.destroy();
    res.json({ success: true, message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAll, create, update, remove };
