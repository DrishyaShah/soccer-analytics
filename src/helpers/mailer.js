import nodemailer from 'nodemailer';
import User from "@/db/schema"
import bcryptjs from "bcryptjs"




export const sendEmail = async ({email, emailType}) => 
    {

        try 
        {
            bcryptjs.hash("gibberriadkhhawdbjsd3235" , 10)

            if (emailType=== "VERIFY")
                {
                    await User.find
                }
        }

        catch (error)
        {
            throw new Error(error.message);
        }
    }



























    // domain.com/verifyToken/njkasddslkcbkcbbnbs