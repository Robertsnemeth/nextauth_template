import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
    console.log("post route")
    const postId = params.slug;
    try {
        const { title, content } = (await req.json());
        console.log(title, "title", content, "content")
        const userPost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                title,
                content
            }
        });
        return NextResponse.json({
            post: {
                title: userPost.title,
                content: userPost.content,
            }
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