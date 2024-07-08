import nodemailer from 'nodemailer';
import {db, User} from "@/db/schema"
import bcryptjs from "bcryptjs"
import { eq } from 'drizzle-orm';



export const sendEmail = async ({email, emailType}) => 
    {

        try 
        {
        const hashedToken = await  bcryptjs.hash("qwertyuiopasnvvjhvjdfghjkl"  , 10)
          console.log(hashedToken);

            if (emailType=== "VERIFY")
                {
                    await db.update(User).set({
                        verifyToken: hashedToken,
                        verifyTokenExpiry: new Date(Date.now() + 3600000)
                    }).where(eq(User.email, email)).execute();
                    }

                
                else if (emailType === "RESET_PASSWORD")
                    {
                        await db.update(User).set({
                            forgotPasswordToken: hashedToken,
                            forgotPasswordTokenExpiry: new Date(Date.now() + 3600000)
                        }).where(eq(User.email, email)).execute();
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
                        from: "drishya@gmail.com",
                        to: email,
                        subject: emailType === "VERIFY" ? "Verify  your email" : "Reset your password", 
                        html: emailType=== "VERIFY" ?  `<p>Click <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}">here</a> to verify your email"
                        or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyEmail?token=${hashedToken} </p>`  : `<p> 
                        
                        Click <a href="${process.env.DOMAIN}/setPassword?token=${hashedToken}">here</a> to change your password"
                        or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/setPassword?token=${hashedToken}
                        
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



























   