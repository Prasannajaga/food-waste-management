import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import LandingPage from "./home";
import { AppSidebar } from "./sidebar";

  

export default function landingPage(){ 
 
    return (
        <>      
         <SidebarProvider>
              <AppSidebar></AppSidebar>
              <main className="container mx-4">
                  <article className="w-full p-4">
                      <SidebarTrigger className="mb-4"/>
                        <LandingPage></LandingPage>  
                  </article>
              </main>
            </SidebarProvider>   
        </>
    )
}


