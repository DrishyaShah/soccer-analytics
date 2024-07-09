// import { getSession } from "next-auth/react";
// import { User } from "@/db/schema";

// export default async function handler(req, res)
// {
//     const session = await getSession({ req });

//     if (session) {
//         const { user: { email, firstName, lastName } } = session;

//         try {
//             await User.createUser(email, firstName, lastName);
//             res.status(201).json({ message: 'User created successfully' });
//           } catch (error) {
//             console.error('Error creating user:', error);
//             res.status(500).json({ error: 'Could not create user' });
//           }
//         } else {
//           res.status(401).json({ error: 'Not authenticated' });
//         }
//       }
