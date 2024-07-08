import { db, User } from "@/db/schema";
import { NextResponse } from "next/server";
import {sql, eq} from 'drizzle-orm'
import bcryptjs from "bcryptjs";


export async function POST(req) {
    try 
    {
        const {token, password} = await req.json()
        const users = await db.select().from(User).where(
            // sql`${User.verifyToken} = ${token} AND ${User.verifyTokenExpiry} > ${new Date().toISOString()}`
            sql`${User.forgotPasswordToken} = ${token}`
          );
          if (users.length === 0)
            {
              return NextResponse.json({ message: "Invalid token" }, { status: 400 });
            }
            const user = users[0]
            console.log(user);

            const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

            await db.update(User).set({
                password: hashedPassword
              }).where(eq(User.email, user.email)).execute();
          
    
    return NextResponse.json({
        message: "Password reset successfully",
        success: true
      })

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}