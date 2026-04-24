const router = require('express').Router();
const c = require('../controllers/achievementController');
const auth = require('../middleware/auth');
const upload = require('../config/multer');

router.get('/', c.getAll);
router.post('/', auth, upload.single('image'), c.create);
router.put('/:id', auth, upload.single('image'), c.update);
router.delete('/:id', auth, c.remove);

module.exports = router;
