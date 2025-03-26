import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { v4 as uuidv4 } from "uuid";
import { transporter } from "../../../../lib/nodemailer";
import databaseConnection from '../../../../lib/database';

export default async function handler(req, res) {
  await databaseConnection();

  if (req.method === "POST") {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const resetToken = uuidv4();
      const resetTokenExpiry = new Date();
      resetTokenExpiry.setMinutes(resetTokenExpiry.getMinutes() + 10);

      await prisma.user.update({
        where: { email },
        data: {
          verificationToken: resetToken,
          verificationTokenExpiry: resetTokenExpiry,
        },
      });

      const resetLink = `https://www.foliospace.org.ng/auth/${resetToken}`;
      const emailContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset Request</title>
          <style>
              body {
                  font-family: 'Arial', sans-serif;
                  line-height: 1.6;
                  color: #333;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .email-container {
                  max-width: 600px;
                  margin: 20px auto;
                  background-color: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                  overflow: hidden;
              }
              .email-header {
                  background-color: #007bff;
                  color: white;
                  padding: 20px;
                  text-align: center;
              }
              .email-body {
                  padding: 30px;
                  text-align: center;
              }
              .reset-button {
                  display: inline-block;
                  margin: 20px 0;
                  padding: 12px 24px;
                  background-color: #007bff;
                  color: white;
                  text-decoration: none;
                  border-radius: 6px;
                  font-weight: bold;
                  transition: background-color 0.3s ease;
              }
              .reset-button:hover {
                  background-color: #0056b3;
              }
              .warning {
                  font-size: 12px;
                  color: #6c757d;
                  margin-top: 20px;
              }
              .footer {
                  background-color: #f4f4f4;
                  color: #6c757d;
                  text-align: center;
                  padding: 15px;
                  font-size: 12px;
              }
          </style>
      </head>
      <body>
          <div class="email-container">
              <div class="email-header">
                  <h1>Password Reset Request</h1>
              </div>
              <div class="email-body">
                  <p>Hi ${user.name},</p>
                  <p>You requested to reset your password. Click the button below to proceed:</p>
                  
                  <a href="${resetLink}" class="reset-button">Reset Password</a>
                  
                  <p class="warning">
                      This link is valid for 10 minutes. If you did not request this password reset, 
                      please ignore this email or contact our support team immediately.
                  </p>
              </div>
              <div class="footer">
                  © ${new Date().getFullYear()} Foliospace. All rights reserved.
              </div>
          </div>
      </body>
      </html>
      `;

      await transporter.sendMail({
        from: "noreply@foliospace.com",
        to: email,
        subject: "Verify Your Account - foliospace",
        html: emailContent,
      });

      res.status(200).json({ message: "Reset link sent successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error sending reset link", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


