"use server";

import { BACKEND_URL } from "@/utils/constants/Env";
import axios from "axios";

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
    return { error: "Failed to load user data." }; 
  }
}
