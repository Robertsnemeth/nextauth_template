import React from 'react'
import Providers from "../components/Providers";
import Login from "../components/LoginForm";

const LoginWidget = () => {
  return (
    <section className="flex flex-col gap-5 items-center p-4 border border-primary rounded-[0.5rem] w-[500px] shadow-lg shadow-gray-600">
        <h1 className='font-bold text-3xl'>Login</h1>
        <Login/>
        <Providers/>
    </section>
  )
}

export default LoginWidget