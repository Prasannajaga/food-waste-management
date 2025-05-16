"use client"
import { useParams } from "next/navigation"
import PostCard from "../postcard";
import { useEffect, useState } from "react";
import { baseHttp } from "@/axios/apiService";
import { useSession } from "next-auth/react";

 

export default function postDetails() {

    const {postId} = useParams();
    const [post , setPost] = useState({});
    const {data , status} = useSession();
    const [userData, setUser] = useState<any>({});
    
    useEffect(() => {
      if (data?.user) { 
      setUser({
        ...data.user,
        user_id : (data.user as any).id
      }); 
      localStorage.setItem("user" , JSON.stringify(data.user));
    }
    }, [data]); 

    useEffect(() =>{
        getPosts();
    }, []); 

    async function getPosts() {
        const response = await baseHttp.get("/posts/"+postId);
        if (response.data) {  
          setPost([response.data[0]]);  
        }
    }

    return (
      <>
        <PostCard posts={post} user={userData}></PostCard>
      </>
    )
}