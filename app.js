require('dotenv').config();

const express = require('express');
const employeeRoutes = require('./routes/employeeRoutes');
const adminRoutes = require('./routes/adminRoutes');
const communityRoutes = require('./routes/communityRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const authRoutes = require('./routes/authRoutes');

const auth = require('./utils/auth');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

// 路由
app.use('/api/employee', employeeRoutes);
app.use('/api/verifyToken', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/announcements', announcementRoutes)

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://${process.env.DB_HOST}:${PORT}`);
});