require('dotenv').config();

const db = require('./utils/db');
const Employee = require('./models/employeeModel');
const HealthLog = require('./models/healthLogModel');
const Admin = require('./models/adminModel');
const Announcement = require('./models/announcementModel');
const Warning = require('./models/warningModel');
const CommunityPost = require('./models/communityPostModel');

async function testDatabase() {
  try {
    // 测试员工模块
    const employee = await Employee.create({
      name: '测试员工2',
      phone: '13800138002',
      password: '123456',
    });
    console.log('员工数据插入成功:', employee);

    const employees = await Employee.findAll();
    console.log('查询员工数据:', employees);

    const updatedEmployee = await Employee.update(employee.insertId, {
      name: '更新员工',
      phone: '13800138002',
      password: '654321',
    });
    console.log('更新员工数据:', updatedEmployee);

    const deletedEmployee = await Employee.delete(employee.insertId);
    console.log('删除员工数据:', deletedEmployee);

    // 测试健康日志模块
    // const healthLog = await HealthLog.create({
    //   employee_id: employee.insertId,
    //   heartRate: 72,
    //   sleepTime: 7,
    //   steps: 5000,
    //   temperature: 36.5,
    //   bloodPressure: '120/80',
    // });
    // console.log('健康日志数据插入成功:', healthLog);

    // const healthLogs = await HealthLog.findAll();
    // console.log('查询健康日志数据:', healthLogs);

    // const updatedHealthLog = await HealthLog.update(healthLog.insertId, {
    //   heartRate: 75,
    //   sleepTime: 8,
    //   steps: 6000,
    //   temperature: 36.6,
    //   bloodPressure: '130/85',
    // });
    // console.log('更新健康日志数据:', updatedHealthLog);

    // const deletedHealthLog = await HealthLog.delete(healthLog.insertId);
    // console.log('删除健康日志数据:', deletedHealthLog);

    // 测试管理员模块
    // const admin = await Admin.create({
    //   username: 'admin',
    //   password: 'admin',
    // });
    // console.log('管理员数据插入成功:', admin);

    // const admins = await Admin.findAll();
    // console.log('查询管理员数据:', admins);

    // const updatedAdmin = await Admin.update(admin.insertId, {
    //   username: 'updatedadmin',
    //   password: 'admin456',
    // });
    // console.log('更新管理员数据:', updatedAdmin);

    // const deletedAdmin = await Admin.delete(admin.insertId);
    // console.log('删除管理员数据:', deletedAdmin);

    // 测试公告模块
    // const announcement = await Announcement.create({
    //   title: '测试公告',
    //   content: '这是一个测试公告。',
    // });
    // console.log('公告数据插入成功:', announcement);

    // const announcements = await Announcement.findAll();
    // console.log('查询公告数据:', announcements);

    // const updatedAnnouncement = await Announcement.update(announcement.insertId, {
    //   title: '更新公告',
    //   content: '这是一个更新后的公告。',
    // });
    // console.log('更新公告数据:', updatedAnnouncement);

    // const deletedAnnouncement = await Announcement.delete(announcement.insertId);
    // console.log('删除公告数据:', deletedAnnouncement);



    

    // 测试预警及建议模块
    // 有问题，需要修改
    // const warning = await Warning.create(16, {
    //   warning: '您的心率偏高，请注意休息。',
    //   suggestion: '请注意休息。',
    // });
    // console.log('预警及建议数据插入成功:', warning);

    // const warnings = await Warning.findAll();
    // console.log('查询预警及建议数据:', warnings);

    // const updatedWarning = await Warning.update(warning.insertId, {
    //   content: '您的心率正常，请继续保持。',
    // });
    // console.log('更新预警及建议数据:', updatedWarning);

    // const deletedWarning = await Warning.delete(warning.insertId);
    // console.log('删除预警及建议数据:', deletedWarning);







    // 测试社区帖子模块
    // const communityPost = await CommunityPost.create({
    //   content: '这是一个测试帖子。',
    //   employee_id: employee.insertId,
    // });
    // console.log('社区帖子数据插入成功:', communityPost);

    // const communityPosts = await CommunityPost.findAll();
    // console.log('查询社区帖子数据:', communityPosts);

    // const updatedCommunityPost = await CommunityPost.update(communityPost.insertId, {
    //   content: '这是一个更新后的帖子。',
    // });
    // console.log('更新社区帖子数据:', updatedCommunityPost);

    // const deletedCommunityPost = await CommunityPost.delete(communityPost.insertId);
    // console.log('删除社区帖子数据:', deletedCommunityPost);

    console.log('所有数据增删改查测试成功！');
  } catch (err) {
    console.error('数据增删改查测试失败:', err);
  }
}

testDatabase();