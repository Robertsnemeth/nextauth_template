import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import PostForm from "../components/PostForm";
import UserPosts from "../components/UserPosts";

export default async function Profile() {
    const session = await getServerSession(authOptions);
    if(!session) {
        redirect("/");
    }

    const user = session?.user;
    const userId = user.id;

    return (
        <main className="flex min-h-screen flex-col items-center justify-between w-screen p-10">
            <div className="flex flex-col gap-2">
                <h2>{user.name}</h2>
                <h2>{user.email}</h2>
                <h2>{userId}</h2>
                <UserPosts authorId={userId}/>
            </div>
            <PostForm/>
            <Link href="/" className="border p-2 text-center rounded">Home</Link>
        </main>
    );
}