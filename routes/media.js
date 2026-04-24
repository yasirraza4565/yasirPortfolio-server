const router = require('express').Router();
const c = require('../controllers/mediaController');
const auth = require('../middleware/auth');
const upload = require('../config/multer');

router.get('/', auth, c.getAll);
router.get('/logo', c.getLogo);
router.post('/', auth, upload.single('file'), c.upload);
router.delete('/:id', auth, c.remove);

module.exports = router;
