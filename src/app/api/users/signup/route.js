import { NextResponse } from 'next/server';

import {db, User } from "@/db/schema"
// import envConfig from '../../../drizzle/envConfig';



export async function POST(req) {
    const { firstName, lastName,  email, password } = await req.json();

try {
    const user = await db.insert(User).values({
      firstName,
      lastName,
      email,
      password,
    }).returning('*').execute();
    return NextResponse.json({success: true, user});
}
catch (error)
{
    console.error('Failed to create user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
}

}