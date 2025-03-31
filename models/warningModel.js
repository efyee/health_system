const db = require('../utils/db');

class Warning {
  // 创建预警及建议
  static async create(employee_id, health_log_id, warnings) {
    const { warning, suggestion } = warnings;
    const [result] = await db.execute(
      'INSERT INTO warnings (employee_id, health_log_id, warning, suggestion) VALUES (?, ?, ?, ?)',
      [employee_id, health_log_id, warning, suggestion]
    );
    return result;
  }

  // 查询所有预警及建议
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM warnings');
    return rows;
  }

  // 根据员工 ID 查询预警及建议
  static async findByEmployeeId(employee_id) {
    const [rows] = await db.execute('SELECT * FROM warnings WHERE employee_id = ?', [employee_id]);
    return rows;
  }

  // 更新预警及建议
  static async update(id, warnings) {
    const { warning, suggestion } = warnings;
    const [result] = await db.execute(
      'UPDATE warnings SET warning = ?, suggestion = ? WHERE id = ?',
      [warning, suggestion, id]
    );
    return result;
  }

  // 删除预警及建议
  static async delete(id) {
    const [result] = await db.execute('DELETE FROM warnings WHERE id = ?', [id]);
    return result;
  }
}

module.exports = Warning;