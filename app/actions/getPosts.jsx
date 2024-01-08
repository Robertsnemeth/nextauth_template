import { revalidatePath } from "next/cache";

export const getPosts = async (url, authorId) => {
    const res = await fetch(`${url}${authorId}`, {
        method: "GET",
    });
    if (!res.ok) {
        console.log("res not ok");
        alert((await res.json()).message);
        return;
    }
    const resPosts = await res.json();
    const posts = resPosts.posts;
    console.log(posts, "userPosts");
    return posts;
}