const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 6969;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mã cố định
const FIXED_PASSCODE = "s2taem2025";

// Xác minh mã cố định
app.post('/verify-passcode', (req, res) => {
  const { code } = req.body;
  if (code === FIXED_PASSCODE) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: 'Mã sai hoặc đã hết hạn' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server đang chạy tại http://0.0.0.0:${PORT}`);
});
