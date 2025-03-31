const express = require('express');
const communityController = require('../controllers/communityController');
const auth = require('../utils/auth');
const router = express.Router();

// 获取社区帖子
router.get('/posts', communityController.getPosts);

// 发布帖子
router.post('/posts', auth.verifyToken, communityController.createPost);

module.exports = router;