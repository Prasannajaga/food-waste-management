import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { BellDot, Clock2, CookingPot, Heart, MapPin, MessageCircleMore, MessageCircleReply, RefreshCw, Reply, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {  useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { baseHttp } from "@/axios/apiService";
import ClaimModal from "@/sharedComponents/claimModal";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast";  

export default function PostCard({ posts : postData, user}: any) {

    const divRefs = useRef<any[]>([]);
    const {toast} = useToast(); 
    const [userData , setUser] = useState(user); 
    const [posts , setPost] = useState(postData); 

    useEffect(() =>{
        setUser(user);
    }, [user]);

    useEffect(() =>{
        setPost(postData);
    }, [postData]);
 

    const handleToggleAll = (index: number) => {
        console.log("handleToogle");
        const current = divRefs.current[index];
        if (current) {
            current.style.display = current.style.display === "none" ? "block" : "none";
        }
    };

    const handleKeyDown = (index: number, e: any) => {
        console.log("key down");
        if (e.key === "Enter") {
            onComment(index, e);
        }
    };

    const onCommentRefresh = async (index: number) =>{
        const response = await baseHttp.get("/post/comments/byPost/"+posts[index].post_id);
        posts[index].Comments = response.data;
        console.log(posts);
        
        setPost((prev:any) => {
            return [...posts]
        }); 
    };

    const onComment = async (index: number, e: any) => {
        console.log("User pressed Enter:", e.target.value, posts[index], userData);
        const postData  = posts[index];
        const data = {
            user_id: userData.user_id,
            post_id: postData.post_id,
            comment: e.target.value,
            recipient_id : postData.User.user_id
        };
        const response = await baseHttp.post("/post/comments", data);
        e.target.value = "";
        onCommentRefresh(index);
    }

    const onLikes = async (index: number) => {
        console.log("on like");
        const postData  = posts[index];
        const data = {
            user_id: userData.user_id,
            post_id: postData.post_id,
            recipient_id : postData.User.user_id
        };
        const response = await baseHttp.post("/post/likes", data);
        const likes = postData.Likes ?? [];

        if(response.data && response.data.length === 0){
            postData.Likes = likes. filter((x:any) => (x.user_id != data.user_id));
        } 
        else if(response.data){
            postData.Likes = [{user_id : response.data.user_id}]; 
        } 
        setPost((prev:any) => {
            return [...posts]
        }); 
    }


    const onClaim = async (index: number) => {
        console.log("on Claim");
       try {
        const data = {
            claimer_id: userData.user_id,
            post_id: posts[index].post_id,
            recipient_id : posts[index].User.user_id
        };
        const response = await baseHttp.post("/claims/", data);
        if(response.data){
            toast({
                variant : "default" ,
                title : `Claimed ${posts[index].title}`
            })
        }
        console.log("response ", response);
       } catch (error) {
            toast({variant : "destructive" , title : "Already claimed" , description : "wait for the approval"})
       }
    };

    return (
        <>
            {posts?.length > 0 ?
                <div className="flex flex-col gap-4 ">
                    {posts.map((item: any, index: number) => (
                        <Card id={item} key={index} className="w-full" >
                            <CardHeader className="p-3"  >
                                <CardDescription className="flex justify-between">
                                    <section className="flex gap-2 items-center">
                                        <Avatar className="w-[40px] h-[40px]">
                                            <AvatarImage className="rounded-full" src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div className="">
                                            <h2 className="font-bold">{item?.User?.name}</h2>
                                            <small>{new Date(item.created_at).toLocaleString()}</small>
                                        </div>
                                    </section>
                                    <TooltipProvider>
                                        <Tooltip>
                                            {item.User.user_id === userData?.user_id ?
                                                <>
                                                    <Dialog >
                                                        <DialogTrigger asChild>
                                                            <Button   variant="outline">View Claims </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-xl">
                                                            <DialogHeader>
                                                                <DialogTitle>ClaimedBy</DialogTitle>
                                                            </DialogHeader>
                                                            <ClaimModal user={userData} postId={item.post_id} initial={false} />
                                                        </DialogContent>
                                                    </Dialog>
                                                </>
                                                :
                                                <>
                                                    <TooltipTrigger asChild>
                                                        <Button onClick={(e) => {
                                                            onClaim(index)
                                                            e.stopPropagation();
                                                            }} variant="outline"> <BellDot /></Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent className="bg-black border p-2">
                                                        <p>Claim this food</p>
                                                    </TooltipContent>
                                                </>
                                            }
                                        </Tooltip>
                                    </TooltipProvider>
                                </CardDescription>
                            </CardHeader>
                            <CardContent   className="flex flex-col gap-4">
                                <div className="flex-primary">
                                    <CookingPot className="stroke-primary" />
                                    <Label>{item.title}</Label>
                                </div>
                                <div className="flex-primary">
                                    <Clock2 className="stroke-primary" />
                                    <Label>Expires before 9:00 AM</Label>
                                </div>
                                <div className="flex-primary">
                                    <MapPin className="stroke-primary" />
                                    <Label>Chennai, IN</Label>
                                </div>
                                <div className="flex-primary">
                                    <Label>{item.description}</Label>
                                </div>
                            </CardContent>
                            <Separator className="my-2"></Separator>
                            <CardFooter className="justify-evenly pb-4" >
                                <Label className="flex-primary hover:scale-105 transition-all" onClick={() => onLikes(index)}>
                                    <Heart fill={(item.Likes ?? [])?.find((x: any) => x.user_id === userData.user_id) ? "red" : "white"} size={16} /> {item.Likes?.length} Like
                                </Label>
                                <Separator orientation="vertical" className="h-5"></Separator>
                                <Label onClick={() => handleToggleAll(index)} className="flex-primary hover:scale-105 transition-all">
                                    <MessageCircleMore size={16} /> Comment
                                </Label>
                                <Separator orientation="vertical" className="h-5"></Separator>
                                <Label className="flex-primary hover:scale-105 transition-all">
                                    <Share2 size={16} /> Share
                                </Label>
                            </CardFooter>

                            <div className="transition-all duration-1000 hidden p-4" key={index} ref={(el: any) => (divRefs.current[index] = el)}>

                                <section className="flex gap-2 my-4 items-center">
                                    <Input onKeyDown={(e) => handleKeyDown(index, e)} placeholder="comment here..."></Input>
                                    <Button onClick={(e) => onComment(index, e)}>comment</Button>
                                    <RefreshCw onClick={() => onCommentRefresh(index)}/>
                                </section>

                                <section className="flex flex-col gap-2 h-72 overflow-auto">
                                    {item.Comments.length > 0 ?
                                        <>
                                            {item.Comments.map((x: any) => (
                                                (
                                                    <div key={x.comment_id} className="max-w-full p-2 bg-white rounded-xl">
                                                        <div className="flex items-start space-x-4">
                                                            <img
                                                                src="https://i.pravatar.cc/40"
                                                                alt="User Avatar"
                                                                className="w-8 h-8 rounded-full"
                                                            />
                                                            <div className="flex-1">
                                                                <div className="flex gap-2 items-center">
                                                                    <h4 className="font-semibold text-gray-800">{x.User?.name}</h4>
                                                                    <span className="text-xs text-gray-500">{new Date(x.created_at).toLocaleTimeString()}</span>
                                                                </div>
                                                                <p className="text-gray-700 mt-1">
                                                                    {x.comment}
                                                                </p>
                                                                <div className="mt-2 flex items-center space-x-4 text-sm">
                                                                    <div className="group  hover:scale-105 transition-all duration-300">
                                                                        <Heart className="group-hover:fill-red-500 " size={16} />
                                                                    </div>
                                                                    <div className="group hover:scale-105 transition-all duration-300" >
                                                                        <MessageCircleReply className="group-hover:fill-red-500 " size={16} />

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            ))}
                                        </>
                                        :
                                        <div className="p-4 text-center">no comments found ...</div>
                                    }
                                </section>

                            </div>

                        </Card>
                    ))}
                </div>
                : (
                    <p className="text-center">No posts found.</p>
                )}
        </>
    );
}