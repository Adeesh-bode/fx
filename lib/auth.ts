import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { BACKEND_URL } from "@/lib/constants/Env";
import { getServerSession } from "next-auth";
import axios from "axios";
import { JWT } from "next-auth/jwt";

export async function getUser(token: string) {
  try {
    const url = `${BACKEND_URL}/auth/me`;
    console.log("Fetching user from:", url);
    const response = await axios.get(url, {
      headers: {
        "Cache-Control": "no-cache",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return { error: "Failed to load user data." };
  }
}

async function refreshToken(token: JWT): Promise<JWT> {
  console.log("refreshing token: ", token);
  console.log("refreshing token: ", token);
  try {
    const res = await fetch(BACKEND_URL + "/auth/refresh", {
      method: "POST",
      headers: {
        authorization: `Refresh ${token}`,
      },
    });
    console.log("refreshed");

    const response = await res.json();

    console.log("refreshed", response);
    return {
      ...token,
      expiresIn: new Date().getTime() + 15 * 60 * 1000,
      refreshToken: response.refreshToken,
      accessToken: response.accessToken,
    };
  } catch (e) {
    console.log(e);
    return token;
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // credentials ,googgle github etc...

  providers: [
    CredentialsProvider({
      name: "Login",
      id: "login",
      credentials: {
        // credentials object schema from login page
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        // after login the data by user is passed in credentials object and processed by authorize ftn
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;
        const url = BACKEND_URL + "/auth/login";
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.status !== 200 && res.status !== 201) {
          console.log(res.statusText);
          throw new Error("Invalid credentials");
        }

        const user = await res.json();
        console.log(user);
        const expiryAt = new Date().getTime() + 24 * 60 * 60 * 1000;
        return { ...user, expiryAt };
      },
    }),
    CredentialsProvider({
      name: "Register",
      id: "register",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials);
        if (!credentials?.email || !credentials?.password || !credentials?.name)
          return null;

        const { email, password, name } = credentials;
        const url = BACKEND_URL + "/auth/signup";
        console.log("API URL:", url);
        const data = JSON.stringify({
          email,
          password,
          name,
        });
        console.log("Data to be sent:", data);
        const res = await fetch(url, {
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.status !== 201 && res.status !== 200) {
          console.log(res.statusText);
          throw new Error("error:" + res.statusText);
        }
        const user = await res.json();
        console.log(user);
        // const expiryAt = new Date().getTime() + 24 * 60 * 60 * 1000;
        // return { ...user, expiryAt }; // no need of custom expiry -- use default exp property by jwt
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  //   cookies: {
  //     sessionToken: {
  //       name: "fx",
  //       options: {
  //         httpOnly: true,
  //         sameSite: "lax",
  //         path: "/",
  //       },
  //     },
  //   },

  // postlogin processing - optional customize and control the behavior of authentication — from signing in users, to modifying JWTs, to tweaking the session object.
  // 4 callbacks options: jwt , session, redirect , signIn
  // for below:
  // when login :: both jwt and session callback are called
  // when checking session :: only session callback is called
  callbacks: {
    // JWT runs than ---> Session runs ( session needs jwt coz of props dependency i.e token param)
    async jwt({ token, user }) {
      // for sigin it passes token and user object , if session check passes only token
      // after jwt callback, session callback work
      console.log(token);
      console.log(user);

      if (user) return { ...token, ...user }; // we have user object i.e immediately after login/signup
      
      console.log(token);
      if (new Date().getTime() > token.exp) {
        token = await refreshToken(token.refreshToken);
        console.log(token);
      }
      token.user = await getUser(token.accessToken); 
      console.log(token);
        // return token;
      console.log("refreshing token- cause access token expired");

      return token;
    },

    async session({ token, session }) {
      // responsible for the session object we are able to use - triggered by useSessionHook & getServerSession ftn
      // console.log(token);
      // user object is only available after login // not when checking session
      console.log("Session Callback received token:", token);
      console.log("Session Callback received session:", session);
      // console.log(session) // observe it didnt have access & refresh token we will inject now
      session.user = token.user; // this will add user object to session object whe user is logged in
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      console.log(session);
      return session;
    },
  },
};
