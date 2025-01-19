import { BACKEND_URL } from "@/utils/constants/Env";
import NextAuth, { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";

export const authOptions : NextAuthOptions = {
    providers : [
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                username :{
                    label:"Username",
                    type:"text",
                    placeholder:"Rahul"
                },
                password: { label: "Password" , type:"password"}
            },
            async authorize(credentials) {
              if(!credentials?.username || !credentials?.password ) return null;
              const { username , password } = credentials;
              const url = BACKEND_URL + "/auth/login"
              const res = await fetch( url ,{
                method:"POST",
                body: JSON.stringify({
                    username,
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
    ]
}

const handler = NextAuth(authOptions);

export { handler as GET , handler as POST };