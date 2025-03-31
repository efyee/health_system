require('dotenv').config(); // 引入 dotenv 模块

const e = require('cors');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET // 密钥
const expiresIn = process.env.JWT_EXPIRES_IN // 过期时间

// 生成 JWT
function generateToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn }); // 毫秒（ms）  秒（s）  分钟（m） 小时（h） 天（d）
}

// 验证 JWT
// 验证 JWT 的中间件函数
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization // 从请求头中获取 token
  if (!token) {
    console.log('未提供 token');
    return res.status(401).json({ success: false, message: '未提供 token' });
  }

  try {
    const decoded = jwt.verify(token, secretKey); // 验证 token
    req.userId = decoded.id; // 将解码后的用户 ID 添加到请求对象中
    
    next(); // 继续执行下一个中间件或路由处理函数
  } catch (err) {
    console.log('无效的 token');
    return res.status(401).json({ success: false, message: '无效的 token' });
  }
};

module.exports = {
  generateToken,
  verifyToken,
};