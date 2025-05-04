"use client"
import { notificationHttp } from "@/axios/apiService";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export function formatDate(date : string){
    return new Date(date).toLocaleString("en-US" , {hour :"numeric" , minute :"numeric" })
}

export default function Notification(){
    
    const {data} = useSession();
    const [notifications , setNotifications] = useState([]);
    const [selectedFilter , setFilter] = useState<string>("All");
    const filters = ["All" , "Likes" , "Comments" , "Claims"];

    useEffect(() =>{
        if (data?.user) {  
            getNotifications((data.user as any).id) 
        }
    } , [data])
   

    async function getNotifications(userId :string, type: string = ""){
        const response = await notificationHttp.get("/user/"+userId+"?types=" +type);
        setNotifications(response.data);
        console.log("notification response ", response);
    }


    async function onSelect(x: any) {
        setFilter(x);
        const d : any = data?.user;
        if(d){
            getNotifications(d.id , x === "All" ? "" : x);
        }
    }



    return (
        <>  
            <section className="flex gap-2">
                {filters.map((x , index) =>(
                    <label key={x} onClick={() => onSelect(x)} className={`p-2 border border-primary/30 bg-white rounded-lg shadow-md pace-x-3 hover:bg-gray-50 transition ${selectedFilter === x && "!bg-primary text-white"}`}>{x}</label>
                ))}    
            </section>
            { notifications.length > 0 ?
                 <section className="flex flex-col gap-2 mt-4">
                    {notifications.map((x:any,index) => (
                        <div className="cursor-pointer"  key={index}>

                            {x.type === "LIKES" && 
                                <div className="bg-white p-4 rounded-lg shadow-md flex items-start space-x-3 hover:bg-gray-50 transition">
                                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path style={{
                                        strokeLinecap : "round",
                                        strokeLinejoin : "round" ,
                                        strokeWidth : 2
                                    }}  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                                <div className="flex-1">
                                    <p className="text-gray-800"><span className="font-semibold">{x.sender_name}</span> liked your post.</p>
                                </div>
                                    <p className="text-sm text-gray-500">{formatDate(x.created_at)} </p>
                                </div>
                            }

                            {x.type === "COMMENTS" && 
                                <div className="bg-white p-4 rounded-lg shadow-md flex items-start space-x-3 hover:bg-gray-50 transition">
                                <svg className="w-6 h-6 text-primary2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path style={{
                                        strokeLinecap : "round",
                                        strokeLinejoin : "round" ,
                                        strokeWidth : 2
                                    }} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                                </svg>
                                <div className="flex-1">
                                    <p className="text-gray-800"><span className="font-semibold">{x.sender_name}</span> commented on your post.</p>
                                    <p className="text-gray-900 text-sm">{x.message}</p>
                                </div>
                                <p className="text-sm text-gray-500">{formatDate(x.created_at)}</p>
                            </div> 
                            } 

                            {x.type === "CLAIMS" &&
                                 <div className="bg-white p-4 rounded-lg shadow-md flex items-start space-x-3 hover:bg-gray-50 transition">
                                 <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                     <path style={{
                                        strokeLinecap : "round",
                                        strokeLinejoin : "round" ,
                                        strokeWidth : 2
                                    }} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                 </svg>
                                 <div className="flex-1">
                                     <p className="text-gray-800"><span className="font-semibold">{x.sender_name}</span> {x.message}</p>
                                     <p className="text-sm text-gray-500">{formatDate(x.created_at)} </p>
                                 </div>
                             </div>

                            }




                        </div>
                    ) )}
                 </section>
                :
                <div className="text-center">No notifications found ...</div> 
            }
           

        </>
    )
}