import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createUser, getUser } from "./service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    // If user is not logged in he will be redirected to signin page
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    // Create a new user when user logged in and save it to database and if already then don,t do anything
    async signIn({ user, account, profile }) {
      try {
        const existingUser = await getUser(user.email);
        if (!existingUser)
          await createUser({ email: user.email, name: user.name });
        return true;
      } catch (err) {
        return false;
      }
    },
    // Add a new object userId to auth data to access user by its id in database using session in auth
    async session({ session }) {
      const user = await getUser(session.user.email);
      session.user.userId = user._id;
      const username = user.email.split("@")[0].toLowerCase();
      session.user.username = username;
      return session;
    },
  },
  pages: {
    signIn: "/login", // Whenever we click on signIn we will be redirected to this URL Page
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
