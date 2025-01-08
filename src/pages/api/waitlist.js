import { PrismaClient } from "@prisma/client";
import { transporter } from "../../../lib/nodemailer"; 
import dns from "dns";
import { promisify } from "util";

const prisma = new PrismaClient();
const resolveMx = promisify(dns.resolveMx);
// List of specific scam domains and emails
const scamDomains = ["ourtimesupport.com", "slclogin.com"];
const specificScamEmails = ["nick10@ourtimesupport.com", "emmie72@ourtimesupport.com","carlos67@slclogin.com","nick67@slclogin.com","casey.swiftt@aol.com","brandonfarmer75@outlook.com","evans58@slclogin.com"];

// flagged scammy emails
const scammyPatterns = [
  /.*\d{3,}.*@outlook\.com$/,
  /.*[!#$%^&*]+.*@aol\.com$/, 
];

const isValidEmailFormat = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
};

const isValidEmailDomain = async (email) => {
  try {
    const domain = email.split("@")[1];
    const mxRecords = await resolveMx(domain);
    return mxRecords.length > 0;
  } catch (error) {
    return false;
  }
};

const isScamEmail = (email) => {
  const domain = email.split("@")[1];
  if (scamDomains.includes(domain) || specificScamEmails.includes(email)) {
    return true;
  }
  return scammyPatterns.some((pattern) => pattern.test(email)); 
};

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
  if (req.method === "GET") {
    try {
      const waitlistEntries = await prisma.waitlist.findMany({
        orderBy: { createdAt: "desc" },
        select: { id: true, email: true, createdAt: true },
      });

      return res.status(200).json({
        success: true,
        data: waitlistEntries,
      });
    } catch (error) {
      console.error("Error fetching waitlist:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to fetch waitlist entries",
      });
    }
  }

  if (req.method === "POST") {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Email is required.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (!isValidEmailFormat(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email format.",
      });
    }

    if (isScamEmail(normalizedEmail)) {
      console.warn(`Scam email detected: ${normalizedEmail}`);
      await prisma.scamEmail.create({
        data: { email: normalizedEmail },
      });
      return res.status(400).json({
        success: false,
        error: "This email is flagged as a potential scam.",
      });
    }

    const isDomainValid = await isValidEmailDomain(normalizedEmail);
    if (!isDomainValid) {
      return res.status(400).json({
        success: false,
        error: "Invalid email domain.",
      });
    }

    try {
      const existingEmail = await prisma.waitlist.findUnique({
        where: { email: normalizedEmail },
      });

      if (existingEmail) {
        return res.status(400).json({
          success: false,
          error: "This email is already in the waitlist.",
        });
      }

      const newWaitlistEntry = await prisma.waitlist.create({
        data: { email: normalizedEmail },
      });

      const emailSent = await submitEmailToMail(normalizedEmail);

      if (emailSent) {
        return res.status(200).json({
          success: true,
          message: "Successfully joined the waitlist.",
          data: newWaitlistEntry,
        });
      } else {
        await prisma.waitlist.delete({ where: { email: normalizedEmail } });
        return res.status(500).json({
          success: false,
          error: "Failed to send confirmation email. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error processing waitlist entry:", error);
      return res.status(500).json({
        success: false,
        error: "Internal server error.",
      });
    }
  }

  return res.status(405).json({
    success: false,
    error: "Method Not Allowed.",
  });
}
