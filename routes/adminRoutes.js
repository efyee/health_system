const express = require('express');
const adminController = require('../controllers/adminController');
const auth = require('../utils/auth');
const router = express.Router();

// 管理员登录
router.post('/login', adminController.login);


// 员工管理
router.get('/employees', auth.verifyToken, adminController.getEmployees);
router.get('/employee/:id', auth.verifyToken, adminController.getEmployeeInfo);
router.post('/employee', auth.verifyToken, adminController.addEmployee);
router.put('/employee/:id', auth.verifyToken, adminController.updateEmployee);
router.delete('/employee/:id', auth.verifyToken, adminController.deleteEmployee);

// 健康日志管理
router.get('/health-logs/:id', auth.verifyToken, adminController.getHealthLogs);
router.put('/health-logs/:id', auth.verifyToken, adminController.addWarningAndSuggestion);

// 公告管理
router.get('/announcements', auth.verifyToken, adminController.getAnnouncements);
router.get('/announcement/:id', auth.verifyToken, adminController.getAnnouncementInfo);
router.post('/announcement', auth.verifyToken, adminController.addAnnouncement);
router.put('/announcement/:id', auth.verifyToken, adminController.updateAnnouncement);
router.delete('/announcement/:id', auth.verifyToken, adminController.deleteAnnouncement);

// 社区管理
router.get('/communities', auth.verifyToken, adminController.getCommunityPosts);
router.delete('/community/:id', auth.verifyToken, adminController.deleteCommunityPost);

/* // 查询管理员
router.get('/admins', auth.verifyToken, adminController.getAdmins);

// 添加管理员
router.post('/admins', auth.verifyToken, adminController.addAdmin);

// 删除管理员
router.delete('/admins/:id', auth.verifyToken, adminController.deleteAdmin); */

module.exports = router;