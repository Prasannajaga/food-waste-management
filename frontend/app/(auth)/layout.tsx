import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"; 
import { Toaster } from "@/components/ui/toaster";
import { AppSidebar } from "./landingpage/sidebar"; 
import SessionWrapper from "./session-wrapper"; 
import { authOptions } from "@/sharedComponents/service";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log("session " , session);
    redirect("/login");
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="container mx-4">
          <article className="w-full p-4"> 
              <SidebarTrigger className="mb-4" />   
              <SessionWrapper>
              {children} 
             </SessionWrapper>
            <Toaster />
          </article>
        </main>
      </SidebarProvider> 
    </>
  );
}
