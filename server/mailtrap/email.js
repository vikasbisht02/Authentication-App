const {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} = require("./emailTemplate.js");

const { transporter } = require("./nodemailerConfig.js");

module.exports.sendVerificationEmail = async (email, verificationToken) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_MAIL,
      to: email,
      subject: "Email Verification",
      text: "This message for OTP Verification please don't share it.",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
    });

    console.log("Verification Mail Send Successfully");
  } catch (error) {
    console.error(error);
  }
};

module.exports.sendWelcomeEmail = async (email, userName) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_MAIL,
      to: email,
      subject: "Welcome to Signpup",
      
      html: WELCOME_EMAIL_TEMPLATE.replace("{userName}", userName),
    });

    console.log("Welcome Message Send  Successfully");
  } catch (error) {
    console.error(error);
  }
};

module.exports.sendPasswordResetEmail = async (email, resetURL) => {

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_MAIL,
      to: email,
      subject: "Reset Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    });

    console.log("Reset Password Mail Send Successfully");
  } catch (error) {
    console.error(error);
  }

};

module.exports.sendResetSuccessEmail = async (email) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_MAIL,
      to: email,
      subject: "Password Reset Successfully",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });

    console.log("Password reset email sent successfully");
  } catch (error) {
    console.error(error);
  }
};
