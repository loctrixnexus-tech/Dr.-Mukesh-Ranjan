// SCROLL REVEAL
window.addEventListener("scroll", () => {
  document.querySelectorAll(".reveal").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});

// POPUP
function openPopup(){
  document.getElementById("popup").style.display="block";
}

function closePopup(){
  document.getElementById("popup").style.display="none";
}


const appointmentForm = document.getElementById("appointmentForm");

if (appointmentForm) {
  appointmentForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const service = document.getElementById("service").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    // ✅ PHONE VALIDATION
    if (!/^[0-9]{10}$/.test(phone)) {
      alert("Please enter valid 10-digit phone number ❌");
      return;
    }

    const message = `New Appointment Booking:
Name: ${name}
Phone: ${phone}
Service: ${service}
Date: ${date}
Time: ${time}`;

    const doctorNumber = "916202343319";

    const url = `https://wa.me/${doctorNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  });
}














// CONTACT FORM (WhatsApp)
document.addEventListener("DOMContentLoaded", function(){

  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    const message = `New Contact Message:
Name: ${name}
Phone: ${phone}`;

    const url = `https://wa.me/916202343319?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  });

});



async function sendOTP() {
  const phone = document.getElementById("phone").value;

  const res = await fetch("http://localhost:3000/send-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ phone })
  });

  const data = await res.json();

  if (data.type === "success") {
    alert("OTP Sent ✅");
  } else {
    alert("Error sending OTP ❌");
  }
}


async function verifyOTP() {
  const phone = document.getElementById("phone").value;
  const otp = document.getElementById("otp").value;

  const res = await fetch("http://localhost:3000/verify-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ phone, otp })
  });

  const data = await res.json();

  if (data.type === "success") {
    alert("OTP Verified ✅");
  } else {
    alert("Invalid OTP ❌");
  }
}

