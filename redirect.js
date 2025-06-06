const maxAccess = 3;
const accessKey = 's2code_access_count';
const otpURL = 'http://YOUR_SERVER_IP:6969/verify-otp'; // Thay YOUR_SERVER_IP bằng IP thật

function checkRedirect() {
  let count = parseInt(localStorage.getItem(accessKey)) || 0;

  if (count < maxAccess) {
    localStorage.setItem(accessKey, count + 1);
    redirectNow();
  } else {
    document.getElementById('otpForm').style.display = 'block';
  }
}

function redirectNow() {
  window.location.href = "https://voz.ee/s/TycfcCuvX"; // link đích
}

function verifyOTP() {
  const code = document.getElementById('otpCode').value;
  fetch(otpURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  })
  .then(res => {
    if (!res.ok) throw new Error("❌ Mã không đúng hoặc đã hết hạn.");
    return res.json();
  })
  .then(() => {
    localStorage.setItem(accessKey, 0); // reset đếm lại
    redirectNow();
  })
  .catch(err => {
    document.getElementById('otpMessage').innerText = err.message;
  });
}