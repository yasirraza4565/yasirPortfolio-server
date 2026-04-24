const { NavbarLink } = require('../models');

const getAll = async (req, res) => {
  try {
    const data = await NavbarLink.findAll({ order: [['order_index', 'ASC']] });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { label, href, order_index, is_active } = req.body;
    const item = await NavbarLink.create({ label, href, order_index, is_active });
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const item = await NavbarLink.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Navbar link not found' });
    await item.update(req.body);
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const item = await NavbarLink.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Navbar link not found' });
    await item.destroy();
    res.json({ success: true, message: 'Navbar link deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAll, create, update, remove };
