const db = require('../utils/db');

class Announcement {
  // 创建公告
  static async create(announcement) {
    const { title, content } = announcement;
    const [result] = await db.execute(
      'INSERT INTO announcements (title, content) VALUES (?, ?)',
      [title, content]
    );
    return result;
  }

  // 查询所有公告
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM announcements');
    return rows;
  }

  // 根据 ID 查询公告
  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM announcements WHERE id = ?', [id]);
    return rows[0];
  }

  // 更新公告
  static async update(id, announcement) {
    const { title, content } = announcement;
    const [result] = await db.execute(
      'UPDATE announcements SET title = ?, content = ? WHERE id = ?',
      [title, content, id]
    );
    return result;
  }

  // 删除公告
  static async delete(id) {
    const [result] = await db.execute('DELETE FROM announcements WHERE id = ?', [id]);
    return result;
  }
}

module.exports = Announcement;