// // utils/getSession.ts
// "use server";

// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
// import { cookies, headers } from "next/headers";

// export async function getSession() {
//   const cookieStore = cookies();
//   const headerStore = headers();

//   return await getServerSession({ req: { headers: headerStore }, options: authOptions });
// }
