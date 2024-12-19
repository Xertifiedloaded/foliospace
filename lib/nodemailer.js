
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "makindeolaitan01@gmail.com",
    pass: "gvrbjidjrdfstykh",
  },
});
export { transporter };