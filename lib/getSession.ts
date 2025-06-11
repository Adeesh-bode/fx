// lib/getSession.ts
"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

// ✅ This will only work in server components or server actions
export async function getSession() {
  const session = await getServerSession(authOptions);
  return session;
}
