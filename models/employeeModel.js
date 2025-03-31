const db = require('../utils/db');

class Employee {
  // 创建员工
  static async create(employee) {
    const { name, phone, password } = employee;
    const [result] = await db.execute(
      'INSERT INTO employees (name, phone, password) VALUES (?, ?, ?)',
      [name, phone, password]
    );
    return result;
  }

  // 查询所有员工
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM employees');
    return rows;
  }

  // 根据 ID 查询员工
  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM employees WHERE id = ?', [id]);
    return rows[0];
  }

  // 更新员工信息
  static async update(id, employee) {
    const { name, phone, password } = employee;
    const [result] = await db.execute(
      'UPDATE employees SET name = ?, phone = ?, password = ? WHERE id = ?',
      [name, phone, password, id]
    );
    return result;
  }

  // 删除员工
  static async delete(id) {
    const [result] = await db.execute('DELETE FROM employees WHERE id = ?', [id]);
    return result;
  }
}

module.exports = Employee;