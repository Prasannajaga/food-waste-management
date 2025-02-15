"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./sidebar"; 

export default function landingPage(){ 
 
    return (
        <>
            <SidebarProvider>
               <section className="flex gap-2">
                   <AppSidebar></AppSidebar>
                   <SidebarTrigger />
               </section>
            </SidebarProvider>
        </>
    )
}


