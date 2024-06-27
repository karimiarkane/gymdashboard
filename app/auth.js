import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";


export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    session: {
      strategy: 'jwt',
      maxAge: 24*60*60
    },
    providers: [
        CredentialsProvider({
            credentials: {
                username: {},
                password: {},
            },
            async authorize(credentials) { 
                if(credentials.username == process.env.NOM_PRENOM && credentials.password == process.env.PASSWORD)         
                  return credentials 
                else throw new Error('Invalid credentialsSS')
                },
        }),

    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user)
            return token
        },
        session: async ({ session, token }) => {
            session.user = token.user
            // console.log("session",session)
            // console.log("new date()",new Date())
         

            return session
        }
    },


});
