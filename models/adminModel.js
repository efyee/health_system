const db = require('../utils/db');

class Admin {
  // 创建管理员
  static async create(admin) {
    const { username, password } = admin;
    const [result] = await db.execute(
      'INSERT INTO admins (username, password) VALUES (?, ?)',
      [username, password]
    );
    return result;
  }

  // 查询所有管理员
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM admins');
    return rows;
  }

  // 根据 ID 查询管理员
  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM admins WHERE id = ?', [id]);
    return rows[0];
  }

  // 更新管理员信息
  static async update(id, admin) {
    const { username, password } = admin;
    const [result] = await db.execute(
      'UPDATE admins SET username = ?, password = ? WHERE id = ?',
      [username, password, id]
    );
    return result;
  }

  // 删除管理员
  static async delete(id) {
    const [result] = await db.execute('DELETE FROM admins WHERE id = ?', [id]);
    return result;
  }
}

module.exports = Admin;