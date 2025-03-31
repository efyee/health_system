const db = require('../utils/db'); // 假设你使用 MySQL 数据库

// 获取公告列表
exports.getAnnouncements = async (req, res) => {
  try {
    const query = 'SELECT * FROM announcements ORDER BY created_at DESC';
    const announcements = await db.query(query);
    // console.log(announcements);
    res.status(200).json({ success: true, data: announcements });
  } catch (err) {
    console.error('获取公告列表失败：', err);
    res.status(500).json({ success: false, message: '获取公告列表失败' });
  }
};

// 获取公告详情
exports.getAnnouncementById = async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'SELECT * FROM announcements WHERE id = ?';
    const announcement = await db.query(query, [id]);
    if (announcement.length > 0) {
      res.status(200).json({ success: true, data: announcement[0] });
    } else {
      res.status(404).json({ success: false, message: '公告不存在' });
    }
  } catch (err) {
    console.error('获取公告详情失败：', err);
    res.status(500).json({ success: false, message: '获取公告详情失败' });
  }
};

// 发布公告
exports.createAnnouncement = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.userId; // 从 token 中获取用户 ID
  try {
    const query = 'INSERT INTO announcements (title, content, user_id) VALUES (?, ?, ?)';
    const result = await db.query(query, [title, content, userId]);
    res.status(201).json({ success: true, data: { id: result.insertId } });
  } catch (err) {
    console.error('发布公告失败：', err);
    res.status(500).json({ success: false, message: '发布公告失败' });
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