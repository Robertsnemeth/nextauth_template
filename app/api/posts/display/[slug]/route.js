import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params } ) {
    const authorId = params.slug;
    console.log(authorId, "authorId")
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
