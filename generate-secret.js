const otplib = require('otplib');
const qrcode = require('qrcode');

// Tạo secret mới
const secret = otplib.authenticator.generateSecret();
const otpauth = otplib.authenticator.keyuri('your@email.com', 'OTP-Demo', secret);

// In ra secret
console.log('🔐 Secret mới của bạn:', secret);

// In mã QR ra terminal để bạn quét bằng app
qrcode.toString(otpauth, { type: 'terminal' }, (err, url) => {
  if (err) {
    console.error('Lỗi tạo QR:', err);
    return;
  }
  console.log(url);
});
