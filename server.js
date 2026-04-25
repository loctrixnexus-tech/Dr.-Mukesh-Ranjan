const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const AUTH_KEY = "YOUR_AUTH_KEY"; // paste here
const TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // from MSG91

app.post("/send-otp", async (req, res) => {
  const { phone } = req.body;

  try {
    const response = await axios.post(
      "https://control.msg91.com/api/v5/otp",
      {
        mobile: "91" + phone,
        template_id: TEMPLATE_ID
      },
      {
        headers: {
          authkey: AUTH_KEY
        }
      }
    );

    res.send(response.data);
  } catch (err) {
    res.status(500).send(err.response.data);
  }
});

app.post("/verify-otp", async (req, res) => {
  const { phone, otp } = req.body;

  try {
    const response = await axios.post(
      "https://control.msg91.com/api/v5/otp/verify",
      {
        mobile: "91" + phone,
        otp: otp
      },
      {
        headers: {
          authkey: AUTH_KEY
        }
      }
    );

    res.send(response.data);
  } catch (err) {
    res.status(500).send(err.response.data);
  }
});

app.listen(3000, () => console.log("Server running"));