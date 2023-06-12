const nodemailer = require("nodemailer");

// Function to send the password reset email
async function sendPasswordResetEmail(email, token) {
  // Create a transporter using Gmail SMTP server
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "wuzhaobo888@gmail.com",
      pass: "s2050a4c8ad",
    },
  });

  // Define the email content
  const mailOptions = {
    from: "wuzhaobo888@gmail.com", // Sender address
    to: email, // Recipient address
    subject: "Password Reset", // Email subject
    html: `<p>Click the following link to reset your password:</p>
           <a href="http://localhost/reset-password?token=${token}">Reset Password</a>`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}

module.exports = sendPasswordResetEmail;