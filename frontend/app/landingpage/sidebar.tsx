"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar";
import { Calendar, Inbox, Search, Settings , Home} from "lucide-react"; 
import { useState } from "react";


  
  
export function AppSidebar() {

    const [items, setItems] = useState([
        {
          title: "Home",
          url: "#",
          icon: Home,
          active : true
        },
        {
          title: "Inbox",
          url: "#",
          icon: Inbox,
          active : false
        },
        {
          title: "Calendar",
          url: "#",
          icon: Calendar,
          active : false
        },
        {
          title: "Search",
          url: "#",
          icon: Search,
          active : false
        },
        {
          title: "Settings",
          url: "#",
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
                    <SidebarMenuButton asChild isActive={item.active}>
                        <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                        </a>
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
  