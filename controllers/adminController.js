const db = require('../utils/db');
const Admin = require('../models/adminModel');
const Employee = require('../models/employeeModel');
const Announcement = require('../models/announcementModel');
const CommunityPost = require('../models/communityPostModel');
const HealthLog = require('../models/healthLogModel');
const Warning = require('../models/warningModel');
const auth = require('../utils/auth');

// 管理员登录
exports.login = async (req, res) => {
  const { phone:username, password } = req.body;
    console.log('admin:', username);
    try {
      const [rows] = await db.execute('SELECT * FROM admins WHERE username = ? AND password = ?', [username, password]);
      if (rows.length > 0) {
        const token = auth.generateToken({ id: rows[0].id, role: 'admin' });
        res.json({ success: true, token });
      } else {
        res.status(401).json({ success: false, message: '用户名或密码错误' });
      }
    } catch (err) {
      res.status(500).json({ success: false, message: '服务器错误' });
    }
};

// 获取员工信息
exports.getEmployeeInfo = async (req, res) => {
  const employee_id = req.params.id; // 从 token 中获取员工 ID
  try {
    const employee = await Employee.findById(employee_id);
    res.json({ success: true, data: employee });
  } catch (err) {
    res.status(500).json({ success: false, message: '获取员工信息失败' });
  }
};

// 获取员工列表
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll()
    if (employees.length > 0) {
      // console.log(employees)
      res.status(200).json({ success: true, data: employees });
    } else {
      res.status(401).json({ success: false, message: '获取员工列表失败' });
    }
  } catch (err) {
    console.error('获取员工列表失败：', err);
    res.status(500).json({ success: false, message: '获取员工列表失败' });
  }
};

// 添加员工
exports.addEmployee = async (req, res) => {
  const { name, phone, password } = req.body;
  try {
    const result = await Employee.create({ name, phone, password });
    res.status(201).json({ success: true, data: { id: result.insertId } }); 
  } catch (err) {
    console.error('添加员工失败：', err);
    res.status(500).json({ success: false, message: '添加员工失败' });
  }
};

// 更新员工信息
exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, phone } = req.body;
  try {
    const query = 'UPDATE employees SET name = ?, phone = ? WHERE id = ?';
    await db.query(query, [name, phone, id]);
    res.status(200).json({ success: true, message: '员工信息更新成功' });
  } catch (err) {
    console.error('更新员工信息失败：', err);
    res.status(500).json({ success: false, message: '更新员工信息失败' });
  }
};

// 删除员工
exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM employees WHERE id = ?';
    await db.query(query, [id]);
    res.status(200).json({ success: true, message: '员工删除成功' });
  } catch (err) {
    console.error('删除员工失败：', err);
    res.status(500).json({ success: false, message: '删除员工失败' });
  }
};

// 获取健康日志
exports.getHealthLogs = async (req, res) => {
  const { id:employeeId } = req.params;
  try {
    const logs = await HealthLog.findByEmployeeId(employeeId);
    const warnings = await Warning.findByEmployeeId(employeeId);
    res.status(200).json({ success: true, data: {logs , warnings }});
  } catch (err) {
    console.error('获取健康日志失败：', err);
    res.status(500).json({ success: false, message: '获取健康日志失败' });
  }
};

// 添加警告和建议
exports.addWarningAndSuggestion = async (req, res) => {
  const { id } = req.params;
  const { warning, suggestion } = req.body;
  try {
    const warningList = await Warning.findByEmployeeId(id);
      const logs = await HealthLog.findByEmployeeId(id);
      const lastLog = logs[logs.length - 1];
    if(warningList.length === 0 || !(lastLog.id === warningList[warningList.length - 1].health_log_id)) {
      const health_log_id = lastLog.id;
      await Warning.create(id, health_log_id, { warning, suggestion });
      res.status(201).json({ success: true, message: '预警和建议添加成功' });
    } else {
      const id = warningList[warningList.length - 1].id;
      await Warning.update(id, { warning, suggestion });
      res.status(200).json({ success: true, message: '预警和建议添加成功' });
    }
  } catch (err) {
    console.error('添加预警和建议失败：', err);
    res.status(500).json({ success: false, message: '添加预警和建议失败' });
  }
};

// 获取公告列表
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.findAll();
    res.status(200).json({ success: true, data: announcements });
  } catch (err) {
    console.error('获取公告列表失败：', err);
    res.status(500).json({ success: false, message: '获取公告列表失败' });
  }
};

// 获取公告详情
exports.getAnnouncementInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const announcement = await Announcement.findById(id);
    res.status(200).json({ success: true, data: announcement });
  } catch (err) {
    console.error('获取公告详情失败：', err);
    res.status(500).json({ success: false, message: '获取公告详情失败' });
  }
};

// 添加公告
exports.addAnnouncement = async (req, res) => {
  const { title, content } = req.body;
  try {
    const query = 'INSERT INTO announcements (title, content) VALUES (?, ?)';
    const result = await db.query(query, [title, content]);
    res.status(201).json({ success: true, data: { id: result.insertId } });
  } catch (err) {
    console.error('添加公告失败：', err);
    res.status(500).json({ success: false, message: '添加公告失败' });
  }
};

// 更新公告
exports.updateAnnouncement = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const query = 'UPDATE announcements SET title = ?, content = ? WHERE id = ?';
    await db.query(query, [title, content, id]);
    res.status(200).json({ success: true, message: '公告更新成功' });
  } catch (err) {
    console.error('更新公告失败：', err);
    res.status(500).json({ success: false, message: '更新公告失败' });
  }
};

// 删除公告
exports.deleteAnnouncement = async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM announcements WHERE id = ?';
    await db.query(query, [id]);
    res.status(200).json({ success: true, message: '公告删除成功' });
  } catch (err) {
    console.error('删除公告失败：', err);
    res.status(500).json({ success: false, message: '删除公告失败' });
  }
};

// 获取社区帖子
exports.getCommunityPosts = async (req, res) => {
  try {
    const posts = await CommunityPost.findAll();
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    console.error('获取社区帖子失败：', err);
    res.status(500).json({ success: false, message: '获取社区帖子失败' });
  }
};

// 删除社区帖子
exports.deleteCommunityPost = async (req, res) => {
  const { id } = req.params;
  try {
    await CommunityPost.delete(id);
    res.status(200).json({ success: true, message: '帖子删除成功' });
  } catch (err) {
    console.error('删除帖子失败：', err);
    res.status(500).json({ success: false, message: '删除帖子失败' });
  }
};

/* // 查询管理员
exports.getAdmins = async (req, res) => {
  try {
    const rows = await Admin.findAll();
    console.log(req.userId);
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: '服务器错误' });
  }
};

// 添加管理员
exports.addAdmin = async (req, res) => {
  const { phone, password } = req.body;
  try {
    const [result] = await db.execute('INSERT INTO admins (phone, password) VALUES (?, ?)', [phone, password]);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: '服务器错误' });
  }
};

// 删除管理员
exports.deleteAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute('DELETE FROM admins WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: '服务器错误' });
  }
}; */