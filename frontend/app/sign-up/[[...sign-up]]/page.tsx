import { SignUp } from "@clerk/nextjs";  

export default function Page() {
        
    return (
        <div className="flex justify-center p-5">
            <SignUp afterSignOutUrl="/landingpage"  appearance={{
                elements : {
                    formButtonPrimary : "bg-primary shadow-none",
                }
            }} />
        </div>
    )
}