import { Skeleton } from "@/components/ui/skeleton"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card" 

export function SkeletonDemo(props:any) {
  return (
    <>
        {props.isCard && <Card  className="w-full">
        <CardHeader className="p-3">
            <CardDescription className="flex justify-between">
                <section className="flex gap-2 items-center">
                    <Skeleton className="bg-gray-400/30 h-12 w-12 rounded-full" />
                    <div className="flex flex-col gap-2 ">
                        <Skeleton className="bg-gray-400/30 h-4 w-[200px]"/>
                        <Skeleton className="bg-gray-400/30 h-4 w-[150px]" />
                    </div>
                </section>
            </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
            <Skeleton className="bg-gray-400/30 h-4 w-70"/>
            <Skeleton className="bg-gray-400/30 h-4 w-70"/>
            <Skeleton className="bg-gray-400/30 h-4 w-70"/>
            <Skeleton className="bg-gray-400/30 h-4 w-70"/>
        </CardContent>
        </Card>}

        {props.isWidget && 
         <>
           <Card  className="w-full]">
            <CardHeader className="p-3"> 
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <Skeleton className="bg-gray-400/30 h-4 w-60"/>
                <Skeleton className="bg-gray-400/30 h-4 w-60"/>
                <Skeleton className="bg-gray-400/30 h-4 w-60"/>
                <Skeleton className="bg-gray-400/30 h-4 w-60"/>
                <Skeleton className="bg-gray-400/30 h-4 w-60"/> 
                <Skeleton className="bg-gray-400/30 h-4 w-60"/>
            </CardContent>
          </Card>
         </> 
        }
    </> 
  )
}
