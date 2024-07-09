import { NextResponse, NextRequest } from 'next/server';
import { db, User } from "@/db/schema";
import jwt from "jsonwebtoken";
import {sql} from '@vercel/postgres'
import { eq } from 'drizzle-orm';
import bcryptjs from "bcryptjs"
export async function POST(req) {
  try {
    const { email, password } = await req.json();
    
  

 const user = await db.select().from(User).where(eq(User.email, email));
//   return NextResponse.json({user})
    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }
    const validPassword = await bcryptjs.compare(password, user[0].password)
        if(!validPassword)
            {
                return NextResponse.json({error: "Invalid password"}, {status: 400})
            }


    
    const tokenData = {
      userId: user.userId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });

    const response = NextResponse.json({
      message: "Login successful",
      success: true
    });
    response.cookies.set("token", token, { httpOnly: true, path: "/" });
    return response; 

  } catch (error) {
    //   console.log("Hi")
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


// import { NextResponse } from 'next/server';

// export async function GET(req)
// {
//     try 
//     {
//         const greeting = "Hello"
//         console.log("Hello");
//         return NextResponse.json(greeting);
//     }
//     catch (error) {
//         console.error('Failed to fetch data:', error);
//         return NextResponse.json({ error: 'Failed to fetch data' }, { status: 404 }); // Error handling
//       }
// }

