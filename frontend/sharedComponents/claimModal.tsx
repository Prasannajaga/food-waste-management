"use client";
import { baseHttp } from "@/axios/apiService";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";

export default function ClaimModal({ initial, postId }: any) {
    const [claims, setClaims] = useState<any[]>([]);

    useEffect(() => {

        async function getClaims() {
            const response = await baseHttp.get("/claims/post/" + postId);
            console.log("response", response);
            setClaims(response.data);
        }
        getClaims();

    }, [open]);


    const onClaimAccept = async (index : number , e : any) =>{
        console.log(claims[index] , e);
        const data =  { claim_id : claims[index].claim_id , status : e}
        const response = await baseHttp.put("/claims/"+data.claim_id, data)
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
                                        <span className="text-xs text-gray-500">{new Date(x.claimed_at).toLocaleTimeString()}</span>
                                    </div>
                                </div>
                                <div className="flex">
                                     <Select  onValueChange={(e) => onClaimAccept(index,e)}>
                                        <SelectTrigger  className="w-[180px]  border-1 !border-red-500 !text-green-600"> 
                                            <SelectValue placeholder={x.status} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ACCEPTED">Accepted</SelectItem>
                                            <SelectItem value="REJECTED">Rejected</SelectItem> 
                                        </SelectContent>
                                    </Select>
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
