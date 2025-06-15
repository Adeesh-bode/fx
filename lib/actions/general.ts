"use server";

import { BACKEND_URL } from "@/lib/constants/Env";
import axios from "axios";
import { getSession } from "../getSession";



export async function getV1(url: string) {
  try {
    const session = await getSession();
    console.log("Session:", session);

    if (!session?.accessToken) {
      throw new Error("No access token in session");
    }
    console.log(session);
    const URL = `${BACKEND_URL}`+ url;
    const response = await axios.get(URL, {
      headers: { "Cache-Control": "no-cache", Authorization: `Bearer ${session.accessToken}` },
    });
    console.log(response);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return { error: "Failed to load user data." };
  }
}


export async function putV1(url: string, data: any) {
  try {
    const session = await getSession();
    console.log("Session:", session);

    if (!session?.accessToken) {
      throw new Error("No access token in session");
    }
    console.log(session);
    const URL = `${BACKEND_URL}` + url;
    const response = await axios.put(URL, data, {
      headers: { "Cache-Control": "no-cache", Authorization: `Bearer ${session.accessToken}` },
    });
    console.log(response);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return { error: "Failed to load user data." };
  }
}

export async function postV1(url: string, data: any) {
  try {
    const session = await getSession();
    console.log("Session:", session);

    if (!session?.accessToken) {
      throw new Error("No access token in session");
    }
    console.log(session);
    const URL = `${BACKEND_URL}` + url;
    const response = await axios.post(URL, data, {
      headers: { "Cache-Control": "no-cache", Authorization: `Bearer ${session.accessToken}` },
    });
    console.log(response);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return { error: "Failed to load user data." };
  }
}