import { prisma } from "../../../lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req) {
    console.log("post route")
    try {
        const { title, content, authorId } = (await req.json());
        console.log(title, "title", content, "content", authorId, "authorId")
        const userPost = await prisma.post.create({
            data: {
                title,
                content,
                authorId
            }
        });
        return NextResponse.json({
            post: {
                title: userPost.title,
                content: userPost.content,
                authorId: userPost.authorId,
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
