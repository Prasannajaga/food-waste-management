"use client";
import { baseHttp } from "@/axios/apiService";
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
import { toast } from "@/hooks/use-toast";
import { CookingPot } from "lucide-react"; 
import { useEffect, useState } from "react"; 

export default function PostModal({userData,postCallbk, initial}:any) {
  const [minDateTime, setMinDateTime] = useState("");
  const [maxDateTime, setMaxDateTime] = useState("");
  const [open, setOpen] = useState(initial);

  const [formData , setFormData] = useState({ 
    title : "",
    description : "",
    expires_in : new Date().toISOString().slice(0, 16)
  });

  useEffect(() => { 
    const now = new Date();
    const formatDate = (date: Date) => {
      return date.toISOString().slice(0, 16); // "yyyy-MM-ddTHH:mm"
    };  
    const future = new Date();
    future.setDate(now.getDate() + 1); // 1 year ahead


    setMinDateTime(formatDate(now));
    setMaxDateTime(formatDate(future)); 
  }, []);


  const onFormChange = ({target : {value , name}}:any) =>{  
        setFormData(prev=>{
            return {
                ...prev,
                [name] : value,
            }
        })
  }

  const onSubmit = async ({target : {value , name}}:any) =>{  
    const payload = {user_id : userData.user_id , ...formData}
     
    const response = await baseHttp.post("/posts" ,payload);
    if(response.data){
        toast({
            title : "post created!"
        })
        postCallbk(payload.user_id);
        setOpen(false);
    }
  }


 
  return (
    <>
    <Dialog open={open} onOpenChange={setOpen}>
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
                            name="expires_in"
                            min={minDateTime}
                            max={maxDateTime}
                            value={formData.expires_in}
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
