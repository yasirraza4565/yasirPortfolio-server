const router = require('express').Router();
const c = require('../controllers/aboutController');
const auth = require('../middleware/auth');
const upload = require('../config/multer');

router.get('/', c.get);
router.put('/', auth, upload.fields([{ name: 'profile_image', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), c.update);

module.exports = router;
