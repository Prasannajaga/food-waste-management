"use client";
import { baseHttp } from "@/axios/apiService"; 
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { formatDate } from "./service";

export default function ClaimModal({ initial, postId , user }: any) {
    const [claims, setClaims] = useState<any[]>([]);
    const [post_id, setPostId] = useState<string>(postId);

    useEffect(() => {

        async function getClaims() {
            const response = await baseHttp.get("/claims/post/" + postId);
            console.log("response", response);
            setClaims(response.data);
        }
        getClaims();
        setPostId(postId);

    }, [postId]);


    const onClaimAccept = async (index : number) =>{
        const data =  { 
            claim_id : claims[index].claim_id ,
            status : "ACCEPTED",
            sender_id : user.user_id,
            recipient_id : claims[index].claimer.user_id,
            post_id : post_id
        };
        const response = await baseHttp.put("/claims/"+data.claim_id, data); 
        console.log("response ", response); 
    };



    return (
        <>

            {claims.length > 0 ?
                <>
                    {claims.map((x: any, index: number) => (
                        <div key={index} className="max-w-full p-2 bg-white rounded-xl">
                            <div className="flex items-start space-x-4">
                                <img
                                    src="https://i.pravatar.cc/40"
                                    alt="User Avatar"
                                    className="w-8 h-8 rounded-full"
                                />
                                <div className="flex-1 justify-between">
                                    <div className="flex gap-2 items-center">
                                        <h4 className="font-semibold text-gray-800">{x.claimer.name}</h4>
                                        <span className="text-xs text-gray-500">{formatDate(x.claimed_at)}</span>
                                    </div>
                                </div>
                                <div className="flex">
                                    {x.status === "ACCEPTED" ?
                                        <Button>{x.status}</Button>
                                        :
                                         <Button onClick={() => onClaimAccept(index)} className="btn-default">Accept</Button>
                                     }
                                     

                                </div>
                            </div>
                        </div>
                    ))}
                </>
                :

                <div className="text-center">
                    No Claims Found...
                </div>
            }
        </>
    )
}
