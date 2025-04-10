// this is used for /api/auth/(sign-in|sign-up|session)

import { BACKEND_URL } from "@/utils/constants/Env";
import NextAuth, { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";

export const authOptions : NextAuthOptions = { // credentials ,googgle github etc...
    providers : [
        CredentialsProvider({ // this is used for login with email and password
            name:"Credentials",
            credentials:{ // credentials object schema from login page
                email :{
                    label:"Email",
                    type:"text",
                    placeholder:"Enter Email address"
                },
                password: { label: "Password" , type:"password", placeholder:"Enter your Password"}
            },
            async authorize(credentials) {  // after login the data by user is passed in credentials object and processed by authorize ftn
              if(!credentials?.email || !credentials?.password ) return null;
              const { email , password } = credentials;
              const url = BACKEND_URL + "/auth/login"
              const res = await fetch( url ,{
                method:"POST",
                body: JSON.stringify({
                    email,
                    password
                }),
                headers:{
                    "Content-Type" : "application/json"
                }
              })

              if(res.status==401){ //not Unauthorized
                console.log(res.statusText)
                return null // this returns are going to nextauth
              }

              const user = await res.json();
              return user; 
            },
        })
    ],

    // postlogin processing - optional customize and control the behavior of authentication — from signing in users, to modifying JWTs, to tweaking the session object.
    // 4 callbacks options: jwt , session, redirect , signIn
    // for below:
    // when login :: both jwt and session callback are called
    // when checking session :: only session callback is called
    callbacks:{ 

        // JWT runs than ---> Session runs ( session needs jwt coz of props dependency i.e token param)
        async jwt({token, user}){ 
            // for sigin it passes token and user object , if session check passes only token
            // after jwt callback, session callback work 
            console.log(token)
            console.log(user)

            if(user) return { ...token , ...user };  
            ///////////
            // Imp: user is the object returned by ur backend login api
            /////////
            return token;
        },

        async session({ token , session }){ // responsible for the session object we are able to use - triggered by useSessionHook & getServerSession ftn
            // user object is only available after login // not when checking session
            console.log(token)
            console.log(session)
            session.user = token.user; // this will add user object to session object whe user is logged in
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            return session;
        }
    }
}

const handler = NextAuth(authOptions); // it is handler for /api/auth/<anythinghere> uses auth options to process the request
// why didnt we pass auth optiions directly to NextAuth?
// why are we using using export handler?

// 1 reason: we need access to nextauth session in the session( get server session ftn), this ftn require authoptions as argument

export { handler as GET , handler as POST };

// To know is the user is authenticated or not - have to get if any session exist from next auth( basically where frontent is running in a server)
// Client side : use useSession Hook ( stores session in react context api) ( have to wrap app in context provider(credentialsProvider))
// Server side : use getServerSession ftn ( for server components & also in api routes)
