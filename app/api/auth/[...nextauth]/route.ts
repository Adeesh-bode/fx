// this is used for /api/auth/(sign-in|sign-up|session)

import { BACKEND_URL } from "@/utils/constants/Env";
import NextAuth, { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";

export const authOptions : NextAuthOptions = {
    providers : [
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email :{
                    label:"Email",
                    type:"text",
                    placeholder:"Rahul"
                },
                password: { label: "Password" , type:"password"}
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

              if(res.status==401){
                console.log(res.statusText)
                return null  // this return is going to nextauth
              }

              const user = await res.json();
              return user;
            },
        })
    ],

    callbacks:{
        async jwt({token, user}){
            console.log(token)
            console.log(user)

            if(user) return { ...token , user }; 
            return token;
        },

        async session({ token , session }){
            console.log(token)
            return token;
        }
    }
}

const handler = NextAuth(authOptions); // it is handler for /api/auth/<anythinghere> uses auth options to process the request

export { handler as GET , handler as POST };