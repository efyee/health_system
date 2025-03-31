const db = require('../utils/db');

class HealthLog {
  // 创建健康日志
  static async create(log) {
    const { employee_id, heartRate, sleepTime, steps, temperature, bloodPressure } = log;
    const [result] = await db.execute(
      'INSERT INTO health_logs (employee_id, heartRate, sleepTime, steps, temperature, bloodPressure) VALUES (?, ?, ?, ?, ?, ?)',
      [employee_id, heartRate, sleepTime, steps, temperature, bloodPressure]
    );
    return result;
  }

  // 查询所有健康日志
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM health_logs');
    return rows;
  }

  // 根据员工 ID 查询健康日志
  static async findByEmployeeId(employee_id) {
    const [rows] = await db.execute('SELECT * FROM health_logs WHERE employee_id = ?', [employee_id]);
    return rows;
  }

  // 更新健康日志
  static async update(id, log) {
    const { heartRate, sleepTime, steps, temperature, bloodPressure } = log;
    const [result] = await db.execute(
      'UPDATE health_logs SET heartRate = ?, sleepTime = ?, steps = ?, temperature = ?, bloodPressure = ? WHERE id = ?',
      [heartRate, sleepTime, steps, temperature, bloodPressure, id]
    );
    return result;
  }

  // 删除健康日志
  static async delete(id) {
    const [result] = await db.execute('DELETE FROM health_logs WHERE id = ?', [id]);
    return result;
  }
}

module.exports = HealthLog;