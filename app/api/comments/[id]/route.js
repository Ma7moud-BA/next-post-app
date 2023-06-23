import { NextResponse } from "next/server";
import { verifyJwt } from "@/utils/jwt";

import prisma from "@/utils/prismaClient";
export async function DELETE(req, { params }) {
	const accessToken = req.headers.get("authorization");
	const decodedToken = verifyJwt(accessToken);
	if (!accessToken || !decodedToken) {
		return new NextResponse(JSON.stringify({ error: "unauthorized" }), {
			status: 401,
		});
	}

	const commentId = +params.id;

	// Check if the publisherId of the post matches the user ID from the token
	const comment = await prisma.comments.findFirst({
		where: {
			id: commentId,
		},
	});

	if (!comment) {
		return new NextResponse(
			JSON.stringify({ error: "you are not the publisher of this comment " }),
			{
				status: 404,
			}
		);
	}

	await prisma.comments.delete({ where: { id: commentId } });

	return new NextResponse(JSON.stringify({ message: "comment deleted" }), {
		status: 200,
	});
}

export async function GET(req, { params }) {
	const postId = +params.id;

	const comments = await prisma.comments.findMany({
		where: {
			postId: postId,
		},
	});

	return NextResponse.json(comments);
}
