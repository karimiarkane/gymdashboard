import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


const options = {
    providers : [
        CredentialsProvider(
        {
            id:"credentials",
            name:"Credentials",

            credentials:{
                username: {label:"Nom et prenom",type:"text"},
                password: {label:"Mot de passe",type:"password"}
            },
            async authorize(credentials){

                if(credentials.username == process.env.NOM_PRENOM && credentials.password == process.env.PASSWORD){

                    return credentials
                    
                }else{
                    return false
                }
            }
        }
    )
    ],
    callbacks: {
        async jwt(token, account ) {
console.log('this is the token', token)
console.log("this is the account", account)
        },
        async session( session, token ) {
            console.log('this is the token', token)
            console.log("this is the sessioin", session)
        }
    }

    
   
    };

    const hundler = NextAuth(options)


    // export default async function auth(req, res) {
    //     console.log('this is the request' , req)
    //     // Do whatever you want here, before the request is passed down to `NextAuth`
    //     return await NextAuth(req, res, options)
    //   }



export { hundler as GET ,hundler as POST  }