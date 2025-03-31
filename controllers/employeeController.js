const db = require('../utils/db');
const jwt = require('jsonwebtoken');
const HealthLog = require('../models/healthLogModel');
const Warning = require('../models/warningModel');
const auth = require('../utils/auth');

// 员工登录
exports.login = async (req, res) => {
  const { phone, password } = req.body;
  console.log('employeePhone:', phone);
  try {
    const [rows] = await db.execute('SELECT * FROM employees WHERE phone = ? AND password = ?', [phone, password]);
    if (rows.length > 0) {
      const token = auth.generateToken({ id: rows[0].id, role: 'employee' });
      // console.log(token)
      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: '手机号或密码错误' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: '服务器错误' });
  }
};

// 获取员工信息
exports.getInfo = async (req, res) => {
  const employee_id = req.userId; // 从 token 中获取员工 ID
  try {
    const [rows] = await db.execute('SELECT * FROM employees WHERE id = ?', [employee_id]);
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: '服务器错误' });
  }
};

// 获取健康日志
exports.getHealthLogs = async (req, res) => {
  // console.log('employeeId:', req.userId);
  const employee_id = req.userId; // 从 token 中获取员工 ID
  try {
    const healthLogs = await HealthLog.findByEmployeeId(employee_id);
    res.json({ success: true, data: healthLogs });  
  } catch (err) {
    res.status(500).json({ success: false, message: '服务器错误' });
  }
};

// 录入健康信息
exports.createHealthLog = async (req, res) => {
  const { heartRate, sleepTime, steps, temperature, bloodPressure } = req.body;
  const employee_id = req.userId; // 从 token 中获取员工 ID
  try {
    const result = await HealthLog.create({
      employee_id,
      heartRate,
      sleepTime,
      steps,
      temperature,
      bloodPressure,
    });
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: '服务器错误' });
  }
};

// 获取预警及建议
exports.getWarnings = async (req, res) => {
  const employee_id = req.userId; // 从 token 中获取员工 ID
  try {
    const warnings = await Warning.findByEmployeeId(employee_id);
    res.json({ success: true, data: warnings });
  } catch (err) {
    res.status(500).json({ success: false, message: '服务器错误' });
  }
};