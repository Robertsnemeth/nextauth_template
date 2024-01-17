import {
    LoginButton,
    LogoutButton,
    ProfileButton,
    RegisterButton,
    HomeButton
  } from "../components/buttons";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Header = async () => {

    const session = await getServerSession(authOptions);
    console.log(session);

  return (
    <nav className="p-5 border-b border-b-primary border-opacity-80 flex justify-between">
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
            <HomeButton/>
    </nav>
  )
}

export default Header