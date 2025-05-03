import { baseHttp } from "@/axios/apiService";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
 
// 👇 Replace with your actual DB query logic
async function getUserByEmail(credentials : any) {

  // Replace with your DB call (e.g., Prisma, Mongoose, raw SQL) 
  const res =  await baseHttp.post("auth/login" , credentials);
  if(!res.data.user){  
    return null;
  }    

  return res.data.user;
}

export const authOptions = {
  providers: [
    CredentialsProvider({ 
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials : any) {
         const user = await getUserByEmail(credentials);
         console.log("login response -> " , user.userId , user.email);

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
    async session({ session, token } : any) { 
      if (token) {
        session.user.id = token.id; // Set userId from the user object
      }
      console.log("session here " , session , token);
      
      return session;
    },
  },
};

const handler = NextAuth(authOptions as any);
export { handler as GET, handler as POST };
