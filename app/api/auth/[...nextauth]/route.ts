// this is used for /api/auth/(sign-in|sign-up|session)

import { authOptions } from "@/lib/auth";
import NextAuth, { NextAuthOptions } from "next-auth";

const handler = NextAuth(authOptions); // it is handler for /api/auth/<anythinghere> uses auth options to process the request
// why didnt we pass auth optiions directly to NextAuth?
// why are we using using export handler?

// 1 reason: we need access to nextauth session in the session( get server session ftn), this ftn require authoptions as argument

export { handler as GET , handler as POST };

// To know is the user is authenticated or not - have to get if any session exist from next auth( basically where frontent is running in a server)
// Client side : use useSession Hook ( stores session in react context api) ( have to wrap app in context provider(credentialsProvider))
// Server side : use getServerSession ftn ( for server components & also in api routes)


// export async function getSession() {
//     return await getServerSession(authOptions);
// }