import nodemailer from 'nodemailer';
import User from "@/db/schema"
import bcryptjs from "bcryptjs"




export const sendEmail = async ({email, emailType, userId}) => 
    {

        try 
        {
          const hashedToken = await  bcryptjs.hash(userId.toString()+"qwertyuiopasdfghjkl"  , 10)

            if (emailType=== "VERIFY")
                {
                    await User.findByIdAndUpdate(userId, 
                        {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000}
                    )
                }
                else if (emailType === "RESET_PASSWORD")
                    {
                        await User.findByIdAndUpdate(userId,
                            {
                                forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now()+360000
                            }
                        )
                    }
                        // Add these to env file
                    var transport = nodemailer.createTransport({
                        host: "sandbox.smtp.mailtrap.io",
                        port: 2525,
                        auth: {
                          user: "481f2775e36ada",
                          pass: "653ac9fe55cc6c"
                        }
                      });

                      const mailOptions = {
                        from: "noreply@myapp.com",
                        to: email,
                        subject: emailType === "VERIFY" ? "Verify  your email" : "Reset your password", 
                        html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
                        or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                        </p>`

                      }

        const mailresponse =  await transport.sendMail(mailOptions);
        return mailresponse;

        }

        catch (error)
        {
            throw new Error(error.message);
        }
    }



























   