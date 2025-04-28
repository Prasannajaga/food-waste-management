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
import { CookingPot } from "lucide-react";
import { NEXT_META_SUFFIX } from "next/dist/lib/constants";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export default function PostModal() {
  const [minDateTime, setMinDateTime] = useState("");
  const [maxDateTime, setMaxDateTime] = useState("");

  const [formData , setFormData] = useState({
    title : "",
    description : "",
    expiresIn : ""
  });

  useEffect(() => {
    const now = new Date();
    const future = new Date();
    future.setDate(now.getDate() + 1); // 1 year ahead

    const formatDate = (date: Date) => {
      return date.toISOString().slice(0, 16); // "yyyy-MM-ddTHH:mm"
    };

    console.log(formatDate(now));
    console.log(formatDate(future));
    

    setMinDateTime(formatDate(now));
    setMaxDateTime(formatDate(future));
  }, []);


  const onFormChange = ({target : {value , name}}:any) =>{ 
        // console.log(e); 
        setFormData(prev=>{
            return {
                ...prev,
                [name] : value,
            }
        })
  }

  const onSubmit = ({target : {value , name}}:any) =>{ 
        console.log(formData);
        
  }


 
  return (
    <>
    <Dialog>
          <DialogTrigger asChild>
              <Button variant="outline"><CookingPot /> Share Food</Button>
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
                  <div className="flex gap-2 items-center">
                      <Label htmlFor="expiredIn" className="whitespace-nowrap">
                          Expires In
                      </Label> 
                      <Input
                            type="datetime-local"
                            id="datetime"
                            name="expiresIn"
                            min={minDateTime}
                            max={maxDateTime}
                            value={formData.expiresIn}
                            onChange={onFormChange}
                            step="900"  // 15 minutes 
                            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                  </div>
                  <div className="flex flex-col gap-2 justify-start">
                      <Label htmlFor="name">
                          Title
                      </Label>
                      <Input value={formData.title} onChange={onFormChange} id="name" name="title" placeholder="title" className="col-span-3" />
                  </div>
                  <div className="flex flex-col gap-2 justify-start">
                      <Label htmlFor="username">
                          Description
                      </Label>
                      <Textarea value={formData.description} onChange={onFormChange} name="description" id="username" placeholder="Type your message here." className="col-span-3" />
                  </div> 

              </div>
              <DialogFooter>
                  <Button onClick={onSubmit} type="submit">Share Food</Button>
              </DialogFooter>
          </DialogContent>
    </Dialog>
    </>
 )
}
