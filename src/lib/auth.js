import { db, User, accounts, authenticators, sessions, verificationTokens  } from "@/db/schema";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
// import { hashPassword } from "@/utils/passwordUtils"; // Import a function to hash passwords if needed
import GoogleProvider from "next-auth/providers/google";
import {hash, compare} from "bcryptjs"
export const authOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "database",
  },
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      scope: 'profile email',
      profile(profile) {
        return {
          id: profile.sub,
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
        };
      },
    }),
  ],

  database: process.env.POSTGRES_URL,

  adapter: DrizzleAdapter(db, {
    usersTable: User,
    accountsTable: accounts,
    authenticatorsTable: authenticators,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,

    async createUser(profile) {
      const hashedPassword = await hash(profile.password, 10); 
      const user = {
        id: profile.id,
        email: profile.email,
        firstName: profile.firstName, // Adjust based on your profile mapping
        lastName: profile.lastName,
        password: "OAuth" // Adjust based on your profile mapping
        // Add other fields as needed
      };

      // Example: Hash password if required
      

      // Create user in database
      await db.users.create(user);

      return user;
    },

    async updateUser(user) {
      // Update user in database if necessary
      await db.users.update(user);
      return user;
    },
  }),
};

// Example function to hash passwords (replace with your own implementation)


export default authOptions;
