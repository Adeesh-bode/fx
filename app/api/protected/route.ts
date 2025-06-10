// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";

// export async function GET(req: Request) {
//   const session = await getServerSession(authOptions); 

//   if (!session) {
//     return new Response(JSON.stringify({ error: "Unauthorized" }), {
//       status: 401,
//     });
//   }

//   return new Response(JSON.stringify({ message: "Protected data", session }), {
//     status: 200,
//   });
// }
