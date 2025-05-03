"use client";
import React from 'react';
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
} from "@/components/ui/tabs";  
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from 'next/navigation'; 
import { useState } from "react"
import { signIn } from "next-auth/react";


export default function Login() {

  const router = useRouter();
  const {toast} = useToast();

  const [title , setTitle] = useState("Sign In");

  const [userForm , setUser] = useState<any>({
    email : "",
    password  : "", 
  })
  const [loginForm , setLogin] = useState<any>({
    email : "",
    password  : "", 
  });


  async function createUser(e:any){ 
      try {
        const res =  await baseHttp.post("auth/signup" , userForm);
          console.log("response -> " , res);
          if(res?.data.user!=null){ 
              localStorage.setItem("loggedIn" , "true");
              document.cookie = JSON.stringify(res.data.user);
              router.push("/landingpage"); 
          }  
      }  
      catch (error) {
            
        if(axios.isAxiosError(error)){
            if(error.status === 409){ 
                toast({
                  variant : "destructive",
                  title : "user already exists",
                })
            }
         } 
        else{
          console.log("Error " , error);
          
        }

      }
  }

  async function loginUser(e:any){
    try {

      signIn("credentials" , {
        ...loginForm,
        redirect : true,
        callbackUrl: "/landingpage",
      })

      // const res =  await baseHttp.post("auth/login" , loginForm);
      //   console.log("response -> " , res);
      //   if(res?.data.user!=null){ 
      //       localStorage.setItem("loggedIn" , "true");
      //       localStorage.setItem("user" , JSON.stringify(res.data.user));
      //       document.cookie = JSON.stringify(res.data.user);
      //       // router.push("/landingpage"); 
      //   }  
    }  
    catch (error) {
          
      if(axios.isAxiosError(error)){
          if(error.status === 409){ 
              toast({
                variant : "destructive",
                title : "user already exists",
              })
          }
       } 
      else{
        console.log("Error " , error);
        
      }

    }
  } 

  const setUserForm = (event:any) => {
    setUser((prev : any) => ({
      ...prev,
      [event.target.name]: event.target.value,  
    }));
  };
  const setLoginForm = (event:any) => {
    setLogin((prev : any) => ({
      ...prev,
      [event.target.name]: event.target.value,  
    }));
  };


  return (
    <div className="flex flex-col justify-center h-screen items-center">
      <Tabs defaultValue="account" className=" w-[400px]" onValueChange={setTitle} value={title}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger   value="Sign In">Sign In</TabsTrigger>
          <TabsTrigger   value="Sign Up">Sign Up</TabsTrigger>
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
                <Input value={loginForm.email} onChange={setLoginForm} id="email" name="email" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">password</Label>
                <Input value={loginForm.password} onChange={setLoginForm} id="password"  name="password" type="password"/>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={loginUser}>Sign In</Button>
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



