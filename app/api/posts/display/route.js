import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const { authorId } = (await req.json());
        console.log( authorId, "authorId");
        const posts = await prisma.post.findMany({
            where: {
                authorId
            }
        });
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
