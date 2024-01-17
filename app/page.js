import Image from 'next/image'
import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "./components/buttons";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {

  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <main className="flex min-h-screen items-start justify-center p-5">
      {session ? 
      <div className='flex gap-2'>
      <LogoutButton/>
      <ProfileButton/>
      </div>
      :
      <div className='flex gap-2'>
      <LoginButton/>
      <RegisterButton/>
      </div>
      }
    </main>
  )
}
