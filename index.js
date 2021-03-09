const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(5000, () => console.log("server runing"));

const contactEmail = nodemailer.createTransport({
  host: "smtp.outlook.com",
  port: 587,
  auth: {
    user: "kobriashvili@outlook.com",
    pass: "xmsjgmeijsgpyewd",
  },
});
contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});
router.post("/contact", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  const number = req.body.number;
  const mail = {
    from: "name",
    to: "kobriashvili@hotmail.com",
    subject: "Contact Form Message",
    html: `<p>Name:${name}</p><p>Email:${email}</p><p>Number:${number}</p><p>Message:${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "failed" });
    } else {
      res.json({ status: "sent" });
    }
  });
});
