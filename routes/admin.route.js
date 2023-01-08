const express = require('express');
const adminController = require('../controllers/admin.cont');
const { verify_admin } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/batch', adminController.addBatch);
router.post('/course', adminController.addCourses);

module.exports = router;