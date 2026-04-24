const router = require('express').Router();
const c = require('../controllers/socialController');
const auth = require('../middleware/auth');

router.get('/', c.getAll);
router.post('/', auth, c.upsert);
router.put('/:id', auth, c.update);

module.exports = router;
