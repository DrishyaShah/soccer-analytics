import { db, User } from "@/db/schema";
import { NextResponse } from "next/server";
import {sql, eq} from 'drizzle-orm'

export async function POST(req) {
  try {
    const {token} = await req.json();
    // const { token } = reqBody;
    console.log(token);

    const users = await db.select().from(User).where(
      // sql`${User.verifyToken} = ${token} AND ${User.verifyTokenExpiry} > ${new Date().toISOString()}`
      sql`${User.verifyToken} = ${token}`
    );

    if (users.length === 0)
      {
        return NextResponse.json({ message: "Invalid token" }, { status: 400 });
      }
      const user = users[0]
      console.log(user);

      await db.update(User).set({
        isVerified: true,
        // verifyToken: null,
        verifyTokenExpiry: null
      }).where(eq(User.email, user.email)).execute();
  

      return NextResponse.json({
        message: "User verified successfully",
        success: true
      })

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


