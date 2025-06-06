const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const otplib = require('otplib');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET = 'JBSWY3DPEHPK3PXP';

app.post('/verify-otp', (req, res) => {
  const { code } = req.body;
  const isValid = otplib.authenticator.check(code, SECRET);
  if (isValid) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Mã không đúng hoặc đã hết hạn.' });
  }
});

const PORT = 6969;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server OTP đang chạy tại http://0.0.0.0:${PORT}`);
});