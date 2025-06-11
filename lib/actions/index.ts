"use server";

import { BACKEND_URL } from "@/lib/constants/Env";
import axios from "axios";
import { getSession } from "../auth";



export async function getUserDetails() {
  try {
    const session = await getSession();
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
