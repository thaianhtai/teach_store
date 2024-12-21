const crypto = require('crypto');
const axios = require('axios');

exports.createMoMoPayment = async (req, res) => {
  try {
    const { totalAmount } = req.body;

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ message: 'Số tiền không hợp lệ.' });
    }

    const partnerCode = process.env.MOMO_PARTNER_CODE;
    const accessKey = process.env.MOMO_ACCESS_KEY;
    const secretKey = process.env.MOMO_SECRET_KEY;
    const redirectUrl = process.env.MOMO_REDIRECT_URL;
    const ipnUrl = process.env.MOMO_IPN_URL;

    const orderId = `ORDER_${Date.now()}`;
    const requestId = `REQ_${Date.now()}`;
    const orderInfo = 'Thanh toán đơn hàng tại TechStore';
    const requestType = 'captureWallet';

    // Tạo chữ ký
    const rawSignature = `accessKey=${accessKey}&amount=${totalAmount}&extraData=&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

    // Payload gửi đến MoMo
    const payload = {
      partnerCode,
      accessKey,
      requestId,
      amount: totalAmount.toString(),
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      extraData: '',
      requestType,
      signature,
    };

    const endpoint = 'https://test-payment.momo.vn/v2/gateway/api/create';
    const momoResponse = await axios.post(endpoint, payload);

    if (momoResponse.data.errorCode === 0) {
      return res.status(200).json({ payUrl: momoResponse.data.payUrl });
    } else {
      console.error('MoMo Error:', momoResponse.data);
      return res.status(400).json({
        message: 'Không thể tạo thanh toán MoMo.',
        data: momoResponse.data,
      });
    }
  } catch (error) {
    console.error('Lỗi tạo thanh toán MoMo:', error.message);
    res.status(500).json({ message: 'Không thể thực hiện thanh toán. Vui lòng thử lại sau.' });
  }
};


exports.handleMoMoIPN = async (req, res) => {
    try {
      const { orderId, resultCode } = req.body;
  
      if (resultCode === 0) {
        console.log(`Đơn hàng ${orderId} thanh toán thành công.`);
      } else {
        console.log(`Đơn hàng ${orderId} không thành công.`);
      }
  
      res.status(200).json({ message: 'IPN received' });
    } catch (error) {
      console.error('Error handling IPN:', error.message);
      res.status(500).json({ message: 'Lỗi xử lý IPN.' });
    }
  };
  