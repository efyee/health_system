const CommunityPost = require('../models/communityPostModel');

// 获取社区帖子
exports.getPosts = async (req, res) => {
  // console.log('收到请求：', req.method, req.url);
  try {
    const posts = await CommunityPost.findAll();
    res.json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: '服务器错误' });
  }
};

// 发布帖子
exports.createPost = async (req, res) => {
  const { content } = req.body;
  const employee_id = req.userId; // 从 token 中获取员工 ID
  try {
    const result = await CommunityPost.create({ content, employee_id });
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: '服务器错误' });
  }
};