const nodemailer = require("nodemailer");
const { env } = require("~/config/environment");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.EMAIL,
        pass: env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: env.EMAIL,
      to: email,
      subject: subject,
      text: `Nhấp vào đường link sau để xác nhận reset lại mật khẩu: ${text}`,
    });
  } catch (error) {
    throw new Error(error.response)
  }
};

module.exports = sendEmail;