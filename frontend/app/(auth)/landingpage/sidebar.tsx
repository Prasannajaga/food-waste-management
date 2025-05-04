"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent, 
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar";
import { Calendar, Inbox, Search, Settings , Home, Bell , } from "lucide-react"; 
import { useEffect, useState } from "react";
import Link from 'next/link';
import { signOut } from "next-auth/react";
import { useParams, usePathname } from "next/navigation";


  
  
export function AppSidebar() {

  const pathname = usePathname();
   
  useEffect(() =>{
    console.log("--->>>" , pathname);
    const data : any = items.map(x => { 
      x.active = x.url === pathname ? true : false; 
      return x;
    });

    setItems([...data])
    
  } , [pathname])

    const [items, setItems] = useState([
        {
          title: "Home",
          url: "/landingpage",
          icon: Home,
          active : true
        },
        {
          title: "My Contribution",
          url: "/contribution",
          icon: Inbox,
          active : false
        },
        {
          title: "Rewards",
          url: "/rewards",
          icon: Calendar,
          active : false
        },
        // {
        //   title: "Message",
        //   url: "/message",
        //   icon: Search,
        //   active : false
        // },
        {
          title: "Notification",
          url: "/notification",
          icon: Bell,
          active : false
        },
        {
          title: "Settings",
          url: "/settings",
          icon: Settings,
          active : false
        },
      ])

    function onToggle(e:string){ 
        setItems(items.map(x =>{
            x.active = x.title === e ? true : false;
            return x;
        }));
    }
    
    return (
      <Sidebar>
        <SidebarHeader > FoodShare</SidebarHeader>
        <SidebarContent>
          <SidebarGroup > 
            {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
            <SidebarGroupContent>
                <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title} onClick={() => onToggle(item.title)}>
                    <SidebarMenuButton  asChild isActive={item.active} className="data-[active=true]:bg-primary/80 data-[active=true]:text-white">
                        <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                </SidebarMenu>
            </SidebarGroupContent> 
          </SidebarGroup>
        </SidebarContent>
        <div className="text-center">
          <button className=" border border-red-500 text-red-500 hover:text-white hover:bg-red-500 w-fit p-2 rounded-md shadow-md duration-200" onClick={() => signOut({callbackUrl : "/login"})}>Sign Out</button>
        </div>
        <SidebarFooter />
      </Sidebar>
    )
  }
  