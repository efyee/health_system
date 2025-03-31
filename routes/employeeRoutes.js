const express = require('express');
const employeeController = require('../controllers/employeeController');
const auth = require('../utils/auth');
const router = express.Router();

// 员工登录
router.post('/login', employeeController.login);

// 获取员工信息
router.get('/info', auth.verifyToken, employeeController.getInfo);

// 获取健康日志
router.get('/health-logs', auth.verifyToken, employeeController.getHealthLogs);

// 录入健康信息
router.post('/health-logs', auth.verifyToken, employeeController.createHealthLog);

// 获取预警及建议
router.get('/warnings', auth.verifyToken, employeeController.getWarnings);

module.exports = router;