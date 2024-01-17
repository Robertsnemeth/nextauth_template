"use client" 

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";
const REGISTER_URL = "/api/user/register";

const Register = () => {

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ error, setError ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const userData = {
            name,
            email,
            password,
        }
        try {
            const res = await fetch(`${REGISTER_URL}`, {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/json",
                },
                });
        
                setLoading(false);
                if (!res.ok) {
                alert((await res.json()).message);
                return;
                }
        
                signIn(undefined, { callbackUrl: "/profile" });
            } catch (error) {
                setLoading(false);
                console.error(error);
                alert(error.message);
            }
        }

    const handleName = (e) => {
        console.log(name);
        setName(e.target.value)
    }
    
    const handleEmail = (e) => {
        console.log(email);
        setEmail(e.target.value)
    }
    
    const handlePassword = (e) => {
        console.log(password);
        setPassword(e.target.value)
    }
    
    const handleConfirmPassword = (e) => {
        console.log(confirmPassword);
        setConfirmPassword(e.target.value)
    }

  return (
    <form className='w-full flex flex-col gap-4 text-black' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2 w-full'>
            <label htmlFor='name' className='text-sm font-bold'>Name</label>
            <input onChange={handleName} name="name" value={name} type="text" placeholder="Name" className={"rounded w-full h-12 p-3"} required/>
        </div>
        <div className='flex flex-col gap-2 w-full'>
            <label htmlFor='email' className='text-sm font-bold'>Email Address</label>
            {/* {error && <p className='text-xs text-primary-tomato'>Please enter a valid email address</p>} */}
            <input onChange={handleEmail} name="email" value={email} type="email" placeholder="email@company.com" className={"rounded w-full h-12 p-3"}/>
        </div>
        <div className='flex flex-col gap-2 w-full'>
            <label htmlFor='password' className='text-sm font-bold'>Password</label>
            <input onChange={handlePassword} name="password" value={password} type="password" placeholder="Password" className={"rounded w-full h-12 p-3"} required/>
        </div>
        <div className='flex flex-col gap-2 w-full'>
            <label htmlFor='confirmPassword' className='text-sm font-bold'>Confirm Password</label>
            {/* {passError && <p className='text-xs text-primary-tomato'>Passwords do not match</p>} */}
            <input onChange={handleConfirmPassword} name="confirmPassword" value={confirmPassword} type="password" placeholder="Confirm Password" className={"rounded w-full h-12 p-3"} required/>
        </div>
        <Button>{loading ? "...loading" : "Sign Up"}</Button>
    </form>   
    )
}

export default Register