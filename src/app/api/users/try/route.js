import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Create table if it doesn't exist
    await sql`CREATE TABLE IF NOT EXISTS Pets (Name varchar(255), Owner varchar(255));`;

    // Insert data into the Pets table
    const names = ['Fiona', 'Lucy'];
    await sql`INSERT INTO Pets (Name, Owner) VALUES (${names[0]}, ${names[1]});`;

    // Select data from the Pets table
    const pets = await sql`SELECT * FROM Pets;`;

    return NextResponse.json({ pets }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
