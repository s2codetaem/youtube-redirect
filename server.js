// server.js (Node.js backend)
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 6969;

app.use(cors());
app.use(bodyParser.json());

// Mã xác minh cố định
const FIXED_PASSCODE = "s2taem2025";

app.post('/verify-passcode', (req, res) => {
  const { code } = req.body;
  if (code === FIXED_PASSCODE) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: 'Mã sai, vui lòng liên hệ admin!' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server đang chạy tại http://0.0.0.0:${PORT}`);
});
