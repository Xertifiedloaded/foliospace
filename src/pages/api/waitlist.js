import { PrismaClient } from "@prisma/client";
import { transporter } from "../../../lib/nodemailer";

const prisma = new PrismaClient();
const submitEmailToMail = async (email) => {
  try {
    const mailOptions = {
      to: email,
      subject: "Thanks for Joining Our Waitlist!",
      html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f9; color: #333; max-width: 600px; margin: 0 auto; border-radius: 10px;">
            <div style="text-align: center; padding: 20px 0;">
              <h1 style="color: #6c63ff;">Welcome to Foliospace</h1>
              <p style="font-size: 16px; color: #555;">Thanks for joining our waitlist! We're excited to have you on board.</p>
            </div>
            <div style="padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <p style="font-size: 16px; line-height: 1.5;">Your email has been successfully added to our waitlist. We’ll notify you as soon as we go live. We can’t wait to show you all the amazing features we’ve been working on!</p>
            </div>
            <div style="text-align: center; margin-top: 30px;">
              <p style="font-size: 14px; color: #777;">If you have any questions or need assistance, feel free to reach out to us at <a href="mailto:support@foliospace.com" style="color: #6c63ff; text-decoration: none;">support@foliospace.com</a>.</p>
            </div>
            <div style="margin-top: 40px; text-align: center; font-size: 12px; color: #777;">
              <p>&copy; 2025 Foliospace. All rights reserved.</p>
            </div>
          </div>
        `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    try {
      const existingEmail = await prisma.waitlist.findUnique({
        where: {
          email,
        },
      });

      if (existingEmail) {
        return res
          .status(400)
          .json({ error: "This email is already in the waitlist." });
      }
      const newWaitlistEntry = await prisma.waitlist.create({
        data: {
          email,
        },
      });

      const emailSent = await submitEmailToMail(email);
      if (emailSent) {
        return res
          .status(200)
          .json({ message: "Successfully joined the waitlist." });
      } else {
        await prisma.waitlist.delete({
          where: {
            email,
          },
        });
        return res
          .status(500)
          .json({
            error: "Failed to send confirmation email. Please try again.",
          });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error." });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
