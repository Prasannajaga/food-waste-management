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
import { Calendar, Inbox, Search, Settings , Home} from "lucide-react"; 
import { useState } from "react";
import Link from 'next/link';


  
  
export function AppSidebar() {

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
        {
          title: "Message",
          url: "/message",
          icon: Search,
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
        <SidebarFooter />
      </Sidebar>
    )
  }
  