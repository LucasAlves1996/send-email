const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const SMTP_CONFIG = require("./config/smtp");

const app = express();
app.use(cors({origin: "*"}));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("The server started on port 3000!");
});

app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome!</h1>"
  );
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let form = req.body;
  enviarEmail(form, info => {
    console.log("Email sent!");
    res.send(info);
  });
});

async function enviarEmail(mail, callback) {
  let transporter = nodemailer.createTransport({
    host: mail.host,
    port: mail.port,
    secure: false,
    requireTLS: true,
    auth: {
      user: mail.user,
      pass: mail.pass,
    },
  });

  let info = await transporter.sendMail({
    from:      mail.from,
    to:        mail.to,
    subject:   mail.subject,
    html:      mail.html,
  });

  console.log(info);
  callback(info);
}
