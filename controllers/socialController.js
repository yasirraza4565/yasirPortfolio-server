const { SocialLink } = require('../models');

const getAll = async (req, res) => {
  try {
    const data = await SocialLink.findAll();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const upsert = async (req, res) => {
  try {
    const { platform, url, icon, is_active } = req.body;
    let item = await SocialLink.findOne({ where: { platform } });
    if (item) {
      await item.update({ url, icon, is_active });
    } else {
      item = await SocialLink.create({ platform, url, icon, is_active });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const item = await SocialLink.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Social link not found' });
    await item.update(req.body);
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAll, upsert, update };
