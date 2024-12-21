const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const adminRouter = require('./routes/adminRouter');  // Import adminRouter
const customerRouter = require('./routes/customerRouter'); // Import customerRouter

dotenv.config();

// Kết nối cơ sở dữ liệu
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/admin', adminRouter);   // Đường dẫn cho admin
app.use('/api/customer', customerRouter); // Đường dẫn cho khách hàng

// Xử lý lỗi (middleware cuối)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
