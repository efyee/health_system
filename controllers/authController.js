require('dotenv').config(); // 引入 dotenv 模块

const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

// 验证 Token 是否有效
exports.verifyToken = (req, res) => {
  const token = req.headers.authorization; // 从请求头中获取 Token
  if (!token) {
    return res.status(401).json({ success: false, message: '未提供 Token' });
  }

  try {
    // 验证 Token
    const decoded = jwt.verify(token, secretKey);
    res.status(200).json({ success: true, userId: decoded.userId });
  } catch (err) {
    console.error(err);
    res.status(401).json({ success: false, message: 'Token 无效或已过期' });
  }
};