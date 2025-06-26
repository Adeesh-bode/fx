// this will tell next-auth the structure of object that our backend api returns

// import NextAuth from "next-auth";

export declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            profileImage: string;
        };
        accessToken: string;
        refreshToken: string;
        expiryAt: number;
        tokenType: string;
    }
}

// import { JWT } from "next-auth/jwt";

export declare module "next-auth/jwt" {
    interface JWT {
        user: {
            id: string;
            name: string;
            email: string;
            profileImage: string;
        };
        accessToken: string;
        refreshToken: string;
        expiryAt: number;
        tokenType: string;
    }
}
