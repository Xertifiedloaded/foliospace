export const generateEmailContent = (otp) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
        }
        .header {
            background-color: #007bff;
            color: white;
            text-align: center;
            padding: 20px;
        }
        .content {
            padding: 30px;
            text-align: center;
        }
        .otp-code {
            background-color: #f8f9fa;
            border: 2px dashed #007bff;
            display: inline-block;
            padding: 15px 25px;
            margin: 20px 0;
            font-size: 28px;
            letter-spacing: 5px;
            color: #007bff;
            border-radius: 6px;
            font-weight: bold;
        }
        .footer {
            background-color: #f4f4f4;
            color: #6c757d;
            text-align: center;
            padding: 15px;
            font-size: 12px;
        }
        .warning {
            color: #6c757d;
            font-size: 12px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Account Verification</h1>
        </div>
        <div class="content">
            <h2>One-Time Password (OTP)</h2>
            <p>To complete your account verification, please use the following OTP:</p>
            
            <div class="otp-code">
                ${otp}
            </div>
            
            <p>This OTP is valid for 10 minutes. Do not share this code with anyone.</p>
            
            <div class="warning">
                <p>If you did not request this OTP, please ignore this email or contact our support team.</p>
            </div>
        </div>
        <div class="footer">
            © ${new Date().getFullYear()} Foliospace. All rights reserved.
        </div>
    </div>
</body>
</html>
`;