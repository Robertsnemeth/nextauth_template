import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import PostForm from "../components/PostForm";

export default async function Profile() {
    const session = await getServerSession(authOptions);
    if(!session) {
        redirect("/");
    }

    const user = session?.user;
    const posts = user.posts;

    console.log(posts, "posts")

    return (
        <main className="flex min-h-screen flex-col items-center justify-between w-screen p-10">
            <div className="flex flex-col gap-2">
                <h2>{user.name}</h2>
                <h2>{user.email}</h2>
                <h2>{user.id}</h2>
            </div>
            <PostForm authorId={user.id}/>
            <Link href="/" className="border p-2 text-center rounded">Home</Link>
        </main>
    );
}