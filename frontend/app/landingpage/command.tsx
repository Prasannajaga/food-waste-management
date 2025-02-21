"use client"
 
import {  
  CookingPot, 
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList, 
} from "@/components/ui/command"
import {  useEffect, useState } from "react"
import { DialogTitle } from "@/components/ui/dialog"

export function CommandDialogDemo(props : any) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  useEffect(() => {
    console.log("props updated" , props , props.data?.length);
    
  }, [props])

 


  function routeTo(e:any){
    console.log(e);
    const d = e.target.getAttribute('data-value');
    const ele =  document.getElementById(d)
    if(ele){
        ele.scrollIntoView({behavior : "smooth"});
        ele.focus();
        setOpen((open) => !open)
    }
  }

  return (
    <> 
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="hidden">Food Share</DialogTitle>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
             {(props?.data && props?.data.length > 0) && 
                (props?.data.map((e:any) =>
                    (
                        <CommandItem data-value={e} onDoubleClick={routeTo} key={e}>
                        <CookingPot />
                         <span data-value={e}>{e}</span>
                        </CommandItem>
                    )
                ))
             } 
          </CommandGroup> 
        </CommandList>
      </CommandDialog>
    </>
  )
}
