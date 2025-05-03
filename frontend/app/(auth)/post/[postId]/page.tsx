 
export async function generateMetadata({params} : any,parent :any){
    let metadata : any = {};
    const d : any = await fetch("http://localhost:3000/api").then((c) => c.json());
    if(d){
        d.data.forEach((x:any) => {
            console.log(x.postId , params.postId);
            if(x.postId === +params.postId){
                metadata.title = x.postTitle;
                metadata.description = `post from ${x.postId}`
             }
                
        });
    }

    return metadata;    
}


export default function postDetails({params} : any) {
    return (
        <>Hello {params?.postId}</>
    )
}