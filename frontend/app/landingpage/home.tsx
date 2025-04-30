"use client"; 
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card" 
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"; 
import { useCallback, useEffect, useRef, useState } from "react"
import { CommandDialogDemo } from "./command"; 
import { SkeletonDemo } from "./customSkeleton";
import PostModal from "../post/postModal";
import { baseHttp } from "@/axios/apiService";
import PostCard from "../post/postcard";
import { useRouter } from "next/navigation";



export default function LandingPage() {

    const [posts, setPosts] = useState<any[]>([]);
    const [searchData, setSearchData] = useState<any>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [userData, setUser] = useState<any>({});
    const divRef = useRef<any>(null);
    const router = useRouter();


    useEffect(() => {
        try {
            const user = JSON.parse(localStorage.getItem("user") ?? "");
            setUser(user ?? {});
            getPosts();
            if (divRef.current) {
                const childArray = Array.from(divRef.current.children).map((el: any) => {
                    return el.getAttribute('id');
                });
                setSearchData(childArray)
            } 
        } catch (error) {
            console.log("Err" , error);
            
            router.push("/login")
            setLoading(false);
        } 

    }, []);


    const reloadPost = useCallback((userId: string) => { 
        getPosts();
    }, []);

    async function getPosts() {
        const response = await baseHttp.get("/posts/all");
        if (response.data) {
            console.log("response ", response);
            setPosts(response.data);
            setLoading(false);
        }
    }

    return (
        <>
            <div className="grid  md:grid-cols-1 xl:grid-cols-[70%_30%] gap-4">

                <section>
                    {isLoading ? (
                        <>
                            <div className="flex flex-col gap-4">
                                {["", "", ""].map((x: any, index) => (
                                    <SkeletonDemo isCard={true} key={index} />
                                ))}
                            </div>
                        </>) :
                        (<>
                            <Card className="w-full mb-4">
                                <CardHeader className="p-3">
                                    <CardDescription>
                                        <section className="flex gap-2 items-center">
                                            <Avatar className="w-[60px] h-[60px]">
                                                <AvatarImage className="rounded-full" src="https://github.com/shadcn.png" alt="@shadcn" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            <div className="border w-full h-auto p-4 rounded-lg hover:bg-gray-200 transition-all">
                                                Start making difference
                                            </div>
                                        </section>
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter className="flex gap-2 justify-end">
                                    {/* <Button className="btn-default border hover:text-white"><Mail /> Post</Button> */}
                                    {/* <Button>Donate Food</Button> */}
                                    <PostModal userData={userData} postCallbk={reloadPost} initial={false}></PostModal>
                                </CardFooter>
                            </Card>

                            <PostCard posts={posts} />
                        </>)
                    }  

                </section>

                <section className="hidden sm:hidden md:hidden lg:block xl:block">

                    {isLoading ?
                        <>
                            <div className="flex flex-col gap-4">
                                <SkeletonDemo isWidget={true} />
                                <SkeletonDemo isWidget={true} />
                            </div>
                        </>
                        :
                        <>
                            <aside className="min-h-[250px]">
                                <Card className="w-full h-full">
                                    <CardHeader>
                                        <CardTitle>Just now</CardTitle>
                                        <CardDescription>Checkout Live food tracking here</CardDescription>
                                    </CardHeader>
                                    <CardContent>

                                    </CardContent>
                                    <CardFooter className="flex justify-between">

                                    </CardFooter>
                                </Card>
                            </aside>

                            <aside className="min-h-[250px]">
                                <Card className="w-full h-full">
                                    <CardHeader>
                                        <CardTitle>Just now</CardTitle>
                                        <CardDescription>Checkout Live food tracking here</CardDescription>
                                    </CardHeader>
                                    <CardContent>

                                    </CardContent>
                                    <CardFooter className="flex justify-between">

                                    </CardFooter>
                                </Card>
                            </aside>
                        </>
                    }


                </section>

                <CommandDialogDemo data={searchData}></CommandDialogDemo>


            </div>

        </>
    )
}