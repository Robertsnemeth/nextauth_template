
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { TbCircleLetterB } from "react-icons/tb";
import Link from "next/link";
import HeaderButtons from "./HeaderButtons";

const Header = async () => {

    const session = await getServerSession(authOptions);
    console.log(session);

  return (
    <nav className="p-3 border-b border-b-primary border-opacity-80 flex justify-between">
        <Link href="/">
          <TbCircleLetterB size="40" className="text-primary hover:text-background transition-colors delay-15 cursor-pointer"/>
        </Link>
        <HeaderButtons session={session}/>
    </nav>
  )
}

export default Header