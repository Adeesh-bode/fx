"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { BACKEND_URL } from "@/lib/constants/Env";
import axios from "axios";
import { getSession } from "../auth";

export async function fetchUser(id: string) {
  try {
    const url = `${BACKEND_URL}/users/user-details/${id}`;
    console.log("Fetching user from:", url);
    const response = await axios.get(url, {
      headers: { "Cache-Control": "no-cache" },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return { error: "Failed to load user data."};
  }
}

export async function getUserDetails() {
  try {
    const session = await auth(); // works correctly in App Router
    console.log("Session:", session);

    if (!session?.accessToken) {
      throw new Error("No access token in session");
    }
    console.log(session);
    const url = `${BACKEND_URL}/users/user-details`;
    const response = await axios.get(url, {
      headers: { "Cache-Control": "no-cache", Authorization: `Bearer ${session.accessToken}` },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return { error: "Failed to load user data." };
  }
}
