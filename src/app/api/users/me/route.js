import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse } from "next/server";
import {db, User } from "@/db/schema";
import { eq } from "drizzle-orm";


export async function GET(req)
{
    try 
    {
        const userId = await getDataFromToken(req);
         const user = await db.select(User.firstName, user.lastName, user.email).from(User).where(eq(User.id, userId))
         return NextResponse.json({message: "User found" , data: user})

    }
    catch (error)
    {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}