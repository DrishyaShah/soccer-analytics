
import GoogleProvider from "next-auth/providers/google";
// import { NextAuthOptions, User, getServerSession } from "next-auth";
// import { useSession } from "next-auth/react";
// import { redirect, useRouter } from "next/navigation";


export const authOptions = {
pages: 
{
    signIn: "/login"
},
session: 
{
    strategy: "jwt",
},
secret: process.env.NEXTAUTH_SECRET,

providers: 
[
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
], 
    // callbacks: 
    // {
    //     async jwt({token, User})
    //     {
    //         if (User)
    //         {
    //             token.id = User.id?.toString()
    //         }
    //         return token
    //     },
    //     async session({session, token})
    //     {
    //         return session
    //     },
    // }
}