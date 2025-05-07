"use client"
import { useParams } from "next/navigation"
import PostCard from "../postcard";
import { useEffect } from "react";
import { baseHttp } from "@/axios/apiService";

 

export default function postDetails() {

    const {postId} = useParams();

    useEffect(() =>{
        getPosts();
    }, []); 

    async function getPosts() {
        const response = await baseHttp.get("/posts/"+postId);
        if (response.data) {  
        }
    }

    return (
      <>
        {/* <PostCard posts={[]} ></PostCard> */}
      </>
    )
}