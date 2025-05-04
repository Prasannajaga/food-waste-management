import { Metadata } from "next"; 
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route"; 
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Food Share",
    description: "Help people in need! feed hunger",
}; 

export default async function PublicLayout({ children }: { children: React.ReactNode }) {

    const session = await getServerSession(authOptions as any);

    if(session){
        redirect("/landingpage");
    }
    
    return <>{children}</>;
}