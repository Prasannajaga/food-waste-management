import { authOptions } from "@/sharedComponents/service";
import NextAuth from "next-auth";

// 👇 Replace with your actual DB query logic


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
