const db = require('../utils/db');

class CommunityPost {
  // 创建社区帖子
  static async create(post) {
    const { content, employee_id } = post;
    const [result] = await db.execute(
      'INSERT INTO community_posts (content, employee_id) VALUES (?, ?)',
      [content, employee_id]
    );
    return result;
  }

  // 查询所有社区帖子
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM community_posts');  
    return rows;
  }

  // 根据 ID 查询社区帖子
  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM community_posts WHERE id = ?', [id]);
    return rows[0];
  }

  // 更新社区帖子
  static async update(id, post) {
    const { content } = post;
    const [result] = await db.execute(
      'UPDATE community_posts SET content = ? WHERE id = ?',
      [content, id]
    );
    return result;
  }

  // 删除社区帖子
  static async delete(id) {
    const [result] = await db.execute('DELETE FROM community_posts WHERE id = ?', [id]);
    return result;
  }
}

module.exports = CommunityPost;