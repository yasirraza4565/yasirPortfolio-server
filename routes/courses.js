const router = require('express').Router();
const c = require('../controllers/courseController');
const auth = require('../middleware/auth');
const upload = require('../config/multer');

router.get('/', c.getAll);
router.post('/', auth, upload.single('certificate_link'), c.create);
router.put('/:id', auth, upload.single('certificate_link'), c.update);
router.delete('/:id', auth, c.remove);

module.exports = router;
