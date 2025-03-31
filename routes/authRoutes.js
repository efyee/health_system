const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 验证 Token 是否有效
router.get('/', authController.verifyToken);

module.exports = router;