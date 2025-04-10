// this will tell next-auth the structure of object that our backend api returns

// import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            // image: string;
        };
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
        tokenType: string;
    }
}

// import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
    interface JWT {
        user: {
            id: string;
            name: string;
            email: string;
            // image: string;
        };
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
        tokenType: string;
    }
}
