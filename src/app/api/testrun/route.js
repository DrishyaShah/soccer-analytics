import { NextResponse } from 'next/server';

export async function GET(req)
{
    try 
    {
        const greeting = "Hello"
        console.log("Hello");
        return NextResponse.json(greeting);
    }
    catch (error) {
        console.error('Failed to fetch data:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 404 }); // Error handling
      }
}

