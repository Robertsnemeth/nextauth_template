import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Profile() {
    const session = await getServerSession(authOptions);
    if(!session) {
        redirect("/");
    }

    const user = session?.user;

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h2>{JSON.stringify(user.name)}</h2>
            <h2>{user.email}</h2>
            <Link href="/" className="border p-2 text-center rounded">Home</Link>
        </main>
    );
}