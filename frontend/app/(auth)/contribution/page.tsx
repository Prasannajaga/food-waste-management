"use client";
import { baseHttp } from "@/axios/apiService";
import PostCard from "../post/postcard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Contribution() {
    const [posts, setPosts] = useState<any[]>([]);
    const router = useRouter();
    const { data, status } = useSession<any>();
    const [userData, setUser] = useState<any>({});


    useEffect(() => {
        if (data?.user) {
            setUser({
                ...data.user,
                user_id: (data.user as any).id
            });
        }
    }, [data]);


    useEffect(() => {

        try {

            if (userData.id) {
                async function getPosts() {
                    const response = await baseHttp.get("/posts?userId=" + userData.id);
                    if (response.data) {
                        setPosts(response.data);
                    }
                }

                getPosts();
            }
        } catch (error) {
            router.push("/login");
        }

    }, [userData])


    return (
        <>
            <PostCard posts={posts} user={userData} />
        </>
    )
}