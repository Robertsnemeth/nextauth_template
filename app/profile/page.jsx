import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import Profile from "../components/Profile";
import { Button } from "@/components/ui/button";
import { HomeButton } from "../components/buttons";

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);
    if(!session) {
        redirect("/");
    }

    const user = session?.user;

    return (
        <main className="flex min-h-screen flex-col gap-2 items-center w-screen p-10">
            <Profile user={user}/>
            <HomeButton/>
        </main>
    );
}