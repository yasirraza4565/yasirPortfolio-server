const router = require('express').Router();
const c = require('../controllers/contactController');
const auth = require('../middleware/auth');

router.get('/', auth, c.getAll);
router.post('/', c.create);
router.put('/:id/read', auth, c.markRead);
router.delete('/:id', auth, c.remove);

module.exports = router;
