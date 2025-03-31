const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');
const auth = require('../utils/auth');

// 获取公告列表（员工和管理员都可以访问）
router.get('/', announcementController.getAnnouncements);

// 获取公告详情（员工和管理员都可以访问）
router.get('/:id', announcementController.getAnnouncementById);

// 发布公告（仅管理员可以访问）
router.post('/', auth.verifyToken, announcementController.createAnnouncement);

// 更新公告（仅管理员可以访问）
router.put('/:id', auth.verifyToken, announcementController.updateAnnouncement);

// 删除公告（仅管理员可以访问）
router.delete('/:id', auth.verifyToken, announcementController.deleteAnnouncement);

module.exports = router;