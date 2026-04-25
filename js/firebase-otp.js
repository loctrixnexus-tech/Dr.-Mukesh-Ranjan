import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBdfHvmQJNOi5CnT8RXR7ttjHR6UkZaEYc",
  authDomain: "clinicotp-b5a08.firebaseapp.com",
  projectId: "clinicotp-b5a08",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Recaptcha
window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
  size: 'normal'
});

// Send OTP
window.sendOTP = function () {
  let phone = document.getElementById("phone").value.trim();

  // Auto add +91 if user enters 10 digit number
  if (phone.length === 10) {
    phone = "+91" + phone;
  }

  if (!phone.startsWith("+91")) {
    alert("Enter valid number like +91XXXXXXXXXX");
    return;
  }

  signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)
    .then((result) => {
      window.confirmationResult = result;
      alert("OTP Sent ✅");
    })
    .catch((error) => {
      console.log(error);
      alert(error.message);
    });
};
// Verify OTP
window.verifyOTP = function () {
  const code = document.getElementById("otp").value;

  window.confirmationResult.confirm(code)
    .then(() => {
      alert("Verified ✅");
    })
    .catch(() => {
      alert("Wrong OTP ❌");
    });
};