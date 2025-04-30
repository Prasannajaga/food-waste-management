"use client";
import { baseHttp } from "@/axios/apiService";
import PostCard from "../post/postcard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Contribution() {
    const [posts, setPosts] = useState<any[]>([]);
    const router =  useRouter();

    useEffect(()=>{
        console.log("calling once");
        
        try {
            const user = JSON.parse(localStorage.getItem("user") ?? "");
            if(user){
                async function getPosts() {
                    const response = await baseHttp.get("/posts?userId="+user.userId);
                    if (response.data) { 
                        setPosts(response.data); 
                    }
                }
    
                getPosts(); 
            }
        } catch (error) { 
            router.push("/login");
        } 

    },[])


    return (
        <> 
            <PostCard posts={posts}/> 
        </>
    )
}