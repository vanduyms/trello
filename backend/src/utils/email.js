const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      port: 587,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: subject,
      text: `Nhấp vào đường link sau để xác nhận reset lại mật khẩu: ${text}`,
    });
  } catch (error) {
    throw new Error({ msg: error.message })
  }
};

module.exports = sendEmail;