"use client";
import { baseHttp } from "@/axios/apiService"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useRouter } from "next/compat/router";
import { useState } from "react"

export default function TabsDemo() {

  const router = useRouter();

  const [userForm , setUser] = useState<any>({
    email : "",
    password  : "", 
  })


  function createUser(e:any){
      console.log(userForm);
      baseHttp.post("auth/signup" , userForm).then((res:any) =>{
        console.log("response -> " , res);
        if(res?.user!=null){
          if(router){
            router.push("/landingpage")
          }
        }
      });
  }


  const setUserForm = (event:any) => {
    setUser((prev : any) => ({
      ...prev,
      [event.target.name]: event.target.value,  
    }));
  };


  return (
    <div className="flex flex-col justify-center h-screen items-center">
      <Tabs defaultValue="account" className=" w-[400px] ">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Sign In">Sign In</TabsTrigger>
          <TabsTrigger value="Sign Up">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="Sign In">
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue="Pedro Duarte" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">password</Label>
                <Input id="password" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Sign In</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="Sign Up">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2"> 
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input value={userForm.email} onChange={setUserForm} name="email" id="email" type="email" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">password</Label>
                <Input value={userForm.password} onChange={setUserForm} name="password" id="password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={createUser}>Sign Up</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
