const maxAccess = 3;
const accessKey = 's2code_access_count';
const otpURL = 'http://13.211.57.234:6969/verify-otp'; // Thay bằng IP thật

function handleFlow() {
  let count = parseInt(localStorage.getItem(accessKey)) || 0;

  if (count >= maxAccess) {
    document.getElementById('otpForm').style.display = 'block';
    return false; // ngăn chuyển hướng
  }

  // Nếu chưa vượt quá 3 lần thì tăng count và tiếp tục chuyển
  localStorage.setItem(accessKey, count + 1);
  return true; // cho phép chuyển tới link flow
}

function handleReturnFromFlow() {
  const urlParams = new URLSearchParams(window.location.search);
  const fromFlow = urlParams.get('return') === '1';

  if (fromFlow) {
    startCountdown();
  }
}

function startCountdown() {
  let counter = 10;
  const followButton = document.getElementById('followButton');
  followButton.disabled = true;
  followButton.innerText = "⏳ Đợi " + counter + " giây...";

  const interval = setInterval(() => {
    counter--;
    if (counter <= 0) {
      clearInterval(interval);
      window.location.href = "https://voz.ee/s/TycfcCuvX"; // link đích
    } else {
      followButton.innerText = "⏳ Đợi " + counter + " giây...";
    }
  }, 1000);
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
    localStorage.setItem(accessKey, 0); // reset lại
    window.location.href = window.location.pathname + "?return=1"; // quay lại và đếm ngược
  })
  .catch(err => {
    document.getElementById('otpMessage').innerText = err.message;
  });
}

// Gọi tự động khi load lại trang (sau khi flow)
handleReturnFromFlow();
