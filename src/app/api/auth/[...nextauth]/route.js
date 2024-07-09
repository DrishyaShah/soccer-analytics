import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { Providers } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// export const {handler as GET,  auth, signIn, signOut} = NextAuth(authOptions)

// export default (req, res) => NextAuth(req, res, authOptions);

// export async function GET(request) {
//     const session = await getServerSession(authOptions);
//     console.log(session);
//     return NextResponse.json({
//       temp_id: 1,
//     });
//   }

// GoogleProvider({
//     clientId: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     scope: "profile email",
//     profile(profile) {
//       return {
//         // Return all the profile information you need.
//         // The only truly required field is id
//         // to be able identify the account when added to a database
//         id:profile.id,
//         firstName: profile.name,
//         lastName: profile.name,
//         email: profile.email
//       }
//     },
//   }) 