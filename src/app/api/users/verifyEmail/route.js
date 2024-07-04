import { db, User } from "@/db/schema";
import { NextResponse } from "next/server";
import {sql} from 'drizzle-orm'

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { token } = reqBody;
    console.log(token);

    const user = await db.select().from(User).where(
      sql`${User.verifyToken} = ${token} AND ${User.verifyTokenExpiry} > ${new Date().toISOString()}`
    );

    if (!user)
      {
        return NextResponse.json({ message: "Invalid token" }, { status: 400 });
      }
      console.log(user);

      user.isVerified = true;
      user.verifyToken = undefined;
      user.verifyTokenExpiry = undefined;
      await db.update(User).set(user).where(sql`${User.id} = ${user.id}`)

      return NextResponse.json({
        message: "User verified successfully",
        success: true
      })

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


