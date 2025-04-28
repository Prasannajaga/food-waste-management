"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card" 
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { BellDot, Clock2, Heart, MapPin, MessageCircleMore, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react"
import { CommandDialogDemo } from "./command";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; 
import { SkeletonDemo } from "./customSkeleton";
import PostModal from "../post/postModal";



export default function LandingPage() {

    const [posts, setPosts] = useState<any[]>(["Dosa", "Food", "Data", "Prasa", "Idly", "Demo", "Start"]);
    const [searchData, setSearchData] = useState<any>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [userData, setUser] = useState<any>({}); 
    const divRef = useRef<any>(null);

    useEffect(() => { 
        
        if (divRef.current) {
            const childArray = Array.from(divRef.current.children).map((el: any) => {
                return el.getAttribute('id');
            });
            setSearchData(childArray)
        }

        setTimeout(() => {
            setLoading(false);  
        }, 1000);

        
    }, []);

    function updateUser(){
      
    }   


    return (
        <> 
            <div className="grid  md:grid-cols-1 xl:grid-cols-[70%_30%] gap-4">

                <section>   
                    {isLoading ? (
                    <>
                        <div className="flex flex-col gap-4">
                            {["" , "" , ""].map((x:any , index) =>(
                                <SkeletonDemo isCard={true} key={index}/>
                            ))}
                        </div>
                    </>) : 
                    ( <> 
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
                                <PostModal></PostModal>
                            </CardFooter>
                        </Card>

                        {posts?.length > 0 ?
                        <div ref={divRef} className="flex flex-col gap-4 ">
                            {posts.map((item, index) => (
                                <Card id={item} key={index} className="w-full">
                                    <CardHeader className="p-3">
                                        <CardDescription className="flex justify-between">
                                            <section className="flex gap-2 items-center">
                                                <Avatar className="w-[40px] h-[40px]">
                                                    <AvatarImage className="rounded-full" src="https://github.com/shadcn.png" alt="@shadcn" />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                                <div className="">
                                                    <h2 className="font-bold">Prasanna</h2>
                                                    <small  >Feb 20 9:00 AM</small>
                                                </div>
                                            </section>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button variant="outline"> <BellDot/></Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent className="bg-black border p-2">
                                                        <p   >Claim this food</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex flex-col gap-4">
                                        <div className="flex-primary">
                                            <Clock2 className="stroke-primary" />
                                            <Label>Expires before 9:00 AM</Label>
                                        </div>
                                        <div className="flex-primary">
                                            <MapPin className="stroke-primary" />
                                            <Label>Chennai, IN</Label>
                                        </div>
                                    </CardContent>
                                    <Separator className="my-2"></Separator>
                                    <CardFooter className="justify-evenly pb-4" >
                                        <Label className="flex-primary hover:scale-105 transition-all">
                                            <Heart fill="red" stroke="white" size={16} /> Like
                                        </Label>
                                        <Separator orientation="vertical" className="h-5"></Separator>
                                        <Label className="flex-primary hover:scale-105 transition-all">
                                            <MessageCircleMore size={16} /> Comment
                                        </Label>
                                        <Separator orientation="vertical" className="h-5"></Separator>
                                        <Label className="flex-primary hover:scale-105 transition-all">
                                            <Share2 size={16} /> Share
                                        </Label>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                        : (
                            <p className="text-red-500">No items found.</p>
                        )}
                        </>)
                    }




                </section>

                <section className="hidden sm:hidden md:hidden lg:block xl:block">

                    {isLoading ? 
                    <>
                        <div className="flex flex-col gap-4">
                            <SkeletonDemo isWidget={true}/>
                            <SkeletonDemo isWidget={true}/>
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