import nodemailer from "nodemailer"
import User from "<@>/models/userModel"
import bcryptjs from "bcryptjs"

export const sendEmail = async({email, emailType, userId})=> {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if(emailType==='VERIFY'){
            await User.findByIdAndUpdate(userId, 
                {verifyToken:hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if (emailType==='RESET'){
            await User.findByIdAndUpdate(userId,
                {forgotPasswordToken:hashedToken, forgotPasswordTokenExpiry: Date.now()+ 3600000})
        }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "0b2a34f37bb2e5",
        pass: "d4d5e23612aaa6"
        // should store those in .env
     }
    });

    const mailOptions = {
        from: 'surajitmondak4@gmail.com',
        to: email,
        subject: emailType==="VERIFY" ? 'Verify your email' : 'Reset your password',
        html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "forgotpassword"}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "forgotpassword"}?token=${hashedToken}
            </p>`
    }

    const mailResponse  = await transport.sendMail(mailOptions)
    
    return mailResponse
        
    } catch (error) {
        throw new Error(error.message)
    }
}