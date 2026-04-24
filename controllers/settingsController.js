const { Settings } = require('../models');

const getAll = async (req, res) => {
  try {
    const data = await Settings.findAll({ order: [['id', 'ASC']] });
    // Convert to key-value map for easy frontend use
    const map = {};
    data.forEach(s => { map[s.key] = s.value; });
    res.json({ success: true, data, map });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { key, value } = req.body;
    const [item, created] = await Settings.findOrCreate({
      where: { key },
      defaults: { key, value },
    });
    if (!created) await item.update({ value });
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const bulkUpdate = async (req, res) => {
  try {
    const { settings } = req.body; // Array of { key, value }
    for (const s of settings) {
      await Settings.upsert({ key: s.key, value: s.value });
    }
    res.json({ success: true, message: 'Settings saved' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAll, update, bulkUpdate };
