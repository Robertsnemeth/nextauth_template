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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session ? 
      <>
      <LogoutButton/>
      <ProfileButton/>
      </>
      :
      <>
      <LoginButton/>
      <RegisterButton/>
      </>
      }
    </main>
  )
}
