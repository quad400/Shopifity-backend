const nodemailer = require("nodemailer")

const sendEmail = async({subject, email, emailHtml})=>{

    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "adedijiabdulquadri@gmail.com",
            pass: "bkdqliicrykfrmof"
        }
    })

    const mailOptions= {
        from: "Shopifity <adedijiabdulquadr@gmail.com>",
        to: email,
        subject: subject,
        html: emailHtml
    };

    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail