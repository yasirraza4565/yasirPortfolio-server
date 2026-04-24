const router = require('express').Router();
const c = require('../controllers/navbarController');
const auth = require('../middleware/auth');

router.get('/', c.getAll);
router.post('/', auth, c.create);
router.put('/:id', auth, c.update);
router.delete('/:id', auth, c.remove);

module.exports = router;
