"use client"
import { getProviders, signIn } from "next-auth/react"

export default async function SignIn() {

    const providers = await getProviders();

    const handleSignIn = (id) =>{
        signIn(id,  { callbackUrl: "/profile" });
    }

    return (
        <div className="flex gap-4">
        {Object.values(providers).map((provider) => ( provider.name !== "Sign in" &&
            <button onClick={() => handleSignIn(provider.id)} className="border border-white p-2 rounded hover:bg-white hover:text-black" key={provider.name}>{provider.name}</button>
        ))}
        </div>
    )
}

