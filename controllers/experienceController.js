const { Experience } = require('../models');

const getAll = async (req, res) => {
  try {
    const data = await Experience.findAll({ order: [['createdAt', 'DESC']] });
    console.log(`💼 Experience retrieved: ${data.length} found`);
    res.json({ success: true, data });
  } catch (error) {
    console.error('❌ Database error during experience retrieval:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { role, company, duration, details, description } = req.body;
    const item = await Experience.create({ role, company, duration, details, description });
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const item = await Experience.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Experience not found' });
    await item.update(req.body);
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const item = await Experience.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Experience not found' });
    await item.destroy();
    res.json({ success: true, message: 'Experience deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAll, create, update, remove };
