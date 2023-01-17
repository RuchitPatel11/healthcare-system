const nodemailer = require("nodemailer");
const { HOST, SMTP_PORT, USER, PASS } = process.env;
const sendEmail = async () => {
  let transporter = nodemailer.createTransport({
    host: HOST,
    port: SMTP_PORT,
    secure: false,
    auth: {
      user: USER,
      pass: PASS,
    },
  });

  let info = await transporter.sendMail({
    from: `Hospital <${USER}>`,
    to: "ruchit.m.patel.302@gmail.com",
    subject: "Email Verification",
    text: "Hello world?",
    html: "<b>Hello world</b>",
  });

  console.log("Message sent: %s", info);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

sendEmail().catch(console.error);

module.exports = { sendEmail };
