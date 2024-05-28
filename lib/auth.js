import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { createUser, getUser } from "./services";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const existingUser = await getUser(user.email);
        if (!existingUser)
          await createUser({
            email: user.email,
            name: user.name,
            photo: user.image,
          });
        return true;
      } catch (err) {
        return false;
      }
    },
    async session({ session }) {
      const user = await getUser(session.user.email);
      session.user.userId = user?._id;
      const username = user.email.split("@")[0].toLowerCase();
      session.user.username = username;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
