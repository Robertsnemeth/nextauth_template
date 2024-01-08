import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import Profile from "../components/Profile";

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);
    if(!session) {
        redirect("/");
    }

    const user = session?.user;

    return (
        <main className="flex min-h-screen flex-col gap-2 items-center w-screen p-10">
            <Profile user={user}/>
            <Link href="/" className="border p-2 text-center rounded hover:bg-white hover:text-black transition-colors delay-50">Home</Link>
        </main>
    );
}