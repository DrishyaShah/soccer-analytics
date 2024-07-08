import { NextResponse, NextRequest } from 'next/server';
import { db, User } from "@/db/schema";
import { eq } from 'drizzle-orm';
import { sendEmail } from '@/helpers/mailer';

export async function POST(req) {
    try {
        // Parse the request body
        const { email } = await req.json();

        // Log the received email
        console.log('Received email for password reset:', email);

        // Check if the user exists in the database
        const checkUser = await db.select().from(User).where(eq(User.email, email)).execute();

        // Log the user check result
        console.log('User check result:', checkUser);

        if (checkUser.length === 0) {
            console.log('User not found');
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }

        // Send reset password email
        await sendEmail({ email, emailType: "RESET_PASSWORD" });

        // Log the email sending success
        console.log('Password reset email sent successfully');

        return NextResponse.json({ success: true });
    } catch (error) {
        // Log the error for debugging
        console.error('Failed to send email:', error);

        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
