// app/api/auth/session/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // update this path if your auth config is in a different place

export async function GET(request: Request) {
  const session = await getServerSession(authOptions); // Works in App Router
  console.log("SESSION (App Router):", session);

  return Response.json({ session });
}
