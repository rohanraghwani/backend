require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');

const connectDB = require('./config/dbConfig');

const authController = require('./controllers/authController');

// Routes (only API logic, no middleware, no Socket.IO)
const authRouter = require('./routes/authRouter');
const adminRoutes = require('./routes/adminRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const deviceRoutes = require('./routes/deviceRoutes');
const detail = require('./routes/detail');
const statusRoutes = require('./routes/StatusRoutes');
const simRoutes = require('./routes/simRoutes');
const simSlotRoutes = require('./routes/simSlot');
const allRoute = require('./routes/allformRoutes');
const smsAuthRoutes = require('./routes/smsAuthRoutes');
const mainNotificationRoutes = require('./routes/mainNotificationRoutesMain');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(helmet());
app.use(express.json());

authController.initializeAdmin();

app.use('/api/notification', smsAuthRoutes);
app.use('/api/auth', authRouter);
app.use('/api/device', deviceRoutes);
app.use('/api/device/all', allRoute);
app.use('/api/admin', adminRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api/data', detail);
app.use('/api/status', statusRoutes);
app.use('/api/sim', simRoutes);  
app.use('/api/device', simSlotRoutes);
app.use('/api/mainnotifications', mainNotificationRoutes);

connectDB()
  .then(() => {
    console.log('✅ MongoDB connected');
  })
  .catch(err => console.error('❌ DB connection error:', err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Pure API Server running on port ${PORT}`);
});
