import { authOptions } from "@/sharedComponents/service";
import { Metadata } from "next"; 
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Food Share",
    description: "Help people in need! feed hunger",
}; 

export default async function PublicLayout({ children }: { children: React.ReactNode }) {

    const session = await getServerSession(authOptions);

    if(session){
        redirect("/landingpage");
    }
    
    return <>{children}</>;
}