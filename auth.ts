import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GOOGLE_ID } from "./sanity/lib/query";
import { writeClient } from "./sanity/lib/writeClient";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, profile, account }) {
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GOOGLE_ID, { id: profile?.sub });
      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: profile?.sub,
          name: user.name,
          image: user.image,
          email: user.email,
          familyName: profile?.family_name,
        });
      }
      return true;
    },
    async jwt({ token, user, profile }) {
      if (user && profile) {
        const existingUser = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GOOGLE_ID, { id: profile.sub });
        token.id = existingUser._id;
      }
      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
