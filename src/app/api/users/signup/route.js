import { NextResponse, NextRequest} from 'next/server';
import bcryptjs from "bcryptjs";
import {db, User } from "@/db/schema"
import { eq } from 'drizzle-orm';

// import envConfig from '../../../drizzle/envConfig';



export async function POST(req) {
    try {
    const { firstName, lastName,  email, password } = await req.json();
    
//check if user already exists
        const checkUser = await db.select().from(User).where(eq(User.email, email)).execute();;
        if(checkUser.length > 0) {
            return NextResponse.json({error: "User already exists"} , {status: 400})
        }
        
        // hash password 

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        
    const user = await db.insert(User).values({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).returning().execute();
    return NextResponse.json({success: true, user});
}
catch (error)
{
    console.error('Failed to create user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
}

}

