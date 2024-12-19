export const generateEmailContent = (otp, verificationLink) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h1 style="color: #4caf50;">Verify Your Account</h1>
    <p>Hi,</p>
    <p>Thank you for signing up! Please verify your account using the OTP below:</p>
    <div style="font-size: 24px; font-weight: bold; margin: 10px 0; color: #4caf50;">
      ${otp}
    </div>
    <p>Or you can click the link below to verify your account:</p>
    <a href="${verificationLink}" style="display: inline-block; margin: 10px 0; padding: 10px 15px; color: white; background-color: #4caf50; border-radius: 5px; text-decoration: none;">Verify Account</a>
    <p style="font-size: 14px; color: #999;">
      If you didn't sign up for this account, please ignore this email.
    </p>
  </div>
`;
