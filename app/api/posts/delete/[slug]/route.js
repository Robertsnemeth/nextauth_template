import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function DELETE(req, { params }) {
    const postId = params.slug;
    try {
        const post = await prisma.post.delete({
        where: {
            id: postId
        }
        });
        console.log(post, "post")
        if(!post) {
        return null
        }
        return NextResponse.json({
        post
        })
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