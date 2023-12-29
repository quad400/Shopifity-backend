const fs = require("fs");

const emailTemplateSourceRegisteration = fs.readFileSync(
  "./src/email/registeration.hbs",
  "utf8"
);

const emailTemplateSourceResendOTP = fs.readFileSync(
  "./src/email/resendotp.hbs",
  "utf8"
);

const emailTemplateSourceForgotPassword = fs.readFileSync(
  "./src/email/forgotpassword.hbs",
  "utf8"
);

module.exports = {
  emailTemplateSourceRegisteration,
  emailTemplateSourceResendOTP,
  emailTemplateSourceForgotPassword
};
