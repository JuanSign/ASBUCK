import NextAuth from "next-auth";

declare module "next-auth" {
    interface Profile {
        id: string; // GitHub user ID
        login: string; // GitHub username
        bio: string; // GitHub bio
    }
    interface Session {
        id: string
    }
    interface JWT {
        id: string
    }
}