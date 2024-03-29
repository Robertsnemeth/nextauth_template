"use client"

import { useState } from 'react'
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const LoginForm = () => {

    const router = useRouter();

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/profile";

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setLoading(true);
            setEmail("");
            setPassword("");
        
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
                callbackUrl,
            });
        
            setLoading(false);
        
            console.log(res);
            if (!res?.error) {
                router.push(callbackUrl);
            } else {
                setError("invalid email or password");
            }
            } catch (error) {
            setLoading(false);
            setError(error);
            }
        };
    
    const handleEmail = (e) => {
        console.log(email);
        setEmail(e.target.value)
    }
    
    const handlePassword = (e) => {
        console.log(password);
        setPassword(e.target.value)
    }

  return (
    <main className='w-full'>
        <form className='w-full flex flex-col gap-4 text-black' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-2 w-full'>
                <label htmlFor='email' className='text-sm font-bold'>Email Address</label>
                {error && <p className='text-xs text-red'>{error}</p>}
                <Input onChange={handleEmail} name="email" value={email} type="email" placeholder="email@company.com" className={"rounded w-full h-12 p-3"}/>
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <label htmlFor='password' className='text-sm font-bold'>Password</label>
                <Input onChange={handlePassword} name="password" value={password} type="password" placeholder="Password" className={"rounded w-full h-12 p-3"} required/>
            </div>
            <Button>{loading ? "...loading" : "Sign In"}</Button>
        </form> 
    </main>
    )
}

export default LoginForm