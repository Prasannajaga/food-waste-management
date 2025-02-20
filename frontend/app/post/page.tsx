"use client";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input" 
import { Label } from "@/components/ui/label" 
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";  
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";  

export default function Post() {

 const [location , setLocation] = useState<any>(); 
 const { toast } = useToast()

 useEffect(()=>{ 
 },[])


 function updateLocation(){
    toast({
        title: "Location Fetched", 
        description : "Hello"
    })
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
        (position) => { 
            console.log("position" , position);
            
            setLocation({
                lat: position.coords.latitude,
                long: position.coords.longitude,
            }); 
        },
        (err) => {
            // setError(err.message);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }  
        );
    }  
 }
 

  return (
    <>
    <Dialog>
          <DialogTrigger asChild>
              <Button variant="outline">Share Food</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
                <DialogTitle>Share Food</DialogTitle>
                <DialogDescription>
                    Share Food be the guy to solve someone hunger
                </DialogDescription> 
            </DialogHeader>

            <div className="flex items-center gap-2 justify-end">
                <Switch  id="airplane-mode"/>
                <Label htmlFor="airplane-mode">Share Location</Label>
            </div> 

              <div className="grid gap-4 py-4">
                  <div className="flex flex-col gap-2 justify-start">
                      <Label htmlFor="name">
                          Title
                      </Label>
                      <Input id="name" placeholder="title" className="col-span-3" />
                  </div>
                  <div className="flex flex-col gap-2 justify-start">
                      <Label htmlFor="username">
                          Description
                      </Label>
                      <Textarea id="username" defaultValue="test" placeholder="Type your message here." className="col-span-3" />
                  </div> 

              </div>
              <DialogFooter>
                  <Button type="submit">Share Food</Button>
              </DialogFooter>
          </DialogContent>
    </Dialog>
    </>
 )
}
