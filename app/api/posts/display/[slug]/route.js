import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(req, { params } ) {
    console.log(req, "req")
    const authorId = params.slug;
    console.log(authorId, "authorId")
    const path = req.nextUrl.searchParams.get("path") || "/"
    try {
        const posts = await prisma.post.findMany({
            where: {
                authorId
            }
        });
        console.log(posts, "posts")
        if(!posts) {
            return null
        }
        revalidatePath(path, "page");
        return NextResponse.json({
            posts
        });
    } catch (error) {
        console.log(error)
        return NextResponse(
            JSON.stringify({
                status: "error",
                message: error.message,
            }),
            { status: 500 }
        );
    }
}
