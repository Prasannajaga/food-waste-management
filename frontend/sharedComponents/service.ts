import { baseHttp } from "@/axios/apiService";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";



function titleCase([val , ...rest] : string) {
    return val ? val[0].toUpperCase() + rest.join("") : (val + rest.join("")); 
}

function formatDate(date : string) : string {
    return new Date(date).toLocaleString("en-US" , {hour :"numeric" , minute :"numeric" })
}

async function getUserByEmail(credentials : any) {

  // Replace with your DB call (e.g., Prisma, Mongoose, raw SQL) 
  const res =  await baseHttp.post("auth/login" , credentials);
   
  if(!res.data.user){  
    return null;
  }    

  return res.data.user;
}



const authOptions : AuthOptions  = {
  providers: [
    CredentialsProvider({ 
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials : any) {
         const user = await getUserByEmail(credentials);
 
        if (!user) return null; 

        return {
          id: user.userId,         
          name: user.name,
          email: user.email,
        };
      
      },
    }),
  ],
  // session: {
  //   strategy: "database", 
  // },
  // pages: {
  //   signIn: "/login",
  // },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user } : any) {
      if (user) {
        // Add user.id to the token when the user is authenticated
        token.id = user.id;
      } 
      
      return token;
    },
    async session({ session, token }: { session: any, token: any }) { 
      if (token && session.user) {
        session.user.id = token.id; // Set userId from the user object
      }
      console.log("session here ", session, token);
      
      return session;
    },
  },
};


export {formatDate , titleCase , authOptions} 