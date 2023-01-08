const express = require('express');
const publicController = require('../controllers/public.cont');
const { verify_user } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/batch', verify_user, publicController.getAllBatches);
router.get('/course', verify_user, publicController.getAllCourses);

module.exports = router;