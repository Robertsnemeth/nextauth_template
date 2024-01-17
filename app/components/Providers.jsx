"use client"
import { Button } from "@/components/ui/button";
import { getProviders, signIn } from "next-auth/react"

export default async function SignIn() {

    const providers = await getProviders();

    const handleSignIn = (id) =>{
        signIn(id,  { callbackUrl: "/profile" });
    }

    return (
        <div className="flex gap-4">
        {Object.values(providers).map((provider) => ( provider.name !== "Sign in" &&
            <Button onClick={() => handleSignIn(provider.id)} key={provider.name}>{provider.name}</Button>
        ))}
        </div>
    )
}

