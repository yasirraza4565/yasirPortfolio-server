const router = require('express').Router();
const c = require('../controllers/settingsController');
const auth = require('../middleware/auth');

router.get('/', c.getAll);                    // public — frontend reads settings
router.post('/', auth, c.update);             // admin update single key
router.put('/bulk', auth, c.bulkUpdate);      // admin update multiple keys

module.exports = router;
