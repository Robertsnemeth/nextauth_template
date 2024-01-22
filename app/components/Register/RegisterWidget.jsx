import React from 'react'
import RegisterForm from './Register'

const RegisterWidget = () => {
  return (
    <section className="flex flex-col gap-5 items-center p-4 border border-primary rounded-[0.5rem] w-[500px] shadow-lg shadow-gray-600">
        <h1 className='font-bold text-3xl'>Register</h1>
        <RegisterForm/>
    </section>
  )
}

export default RegisterWidget