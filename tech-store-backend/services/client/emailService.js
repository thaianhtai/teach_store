const nodemailer = require('nodemailer');

// Cấu hình email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Email gửi
    pass: process.env.EMAIL_PASS, // Mật khẩu ứng dụng hoặc App Password
  },
});

// Hàm gửi email
const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email đã được gửi tới: ${to}`);
  } catch (err) {
    console.error('Lỗi khi gửi email:', err.message);
    throw new Error('Không thể gửi email');
  }
};

module.exports = sendEmail;
