import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { verifyJwt } from "@/utils/jwt";
const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
	const accessToken = req.headers.get("authorization");
	const decodedToken = verifyJwt(accessToken);
	console.log(decodedToken);
	if (!accessToken || !decodedToken) {
		return new NextResponse(JSON.stringify({ error: "unauthorized" }), {
			status: 401,
		});
	}

	const postId = +params.id;

	// Check if the publisherId of the post matches the user ID from the token
	const post = await prisma.posts.findFirst({
		where: {
			id: postId,
			publisherId: decodedToken.id,
		},
	});

	if (!post) {
		return new NextResponse(
			JSON.stringify({ error: "you are not the publisher of this post " }),
			{
				status: 404,
			}
		);
	}

	await prisma.posts.delete({ where: { id: postId } });

	return new NextResponse(JSON.stringify({ message: "post deleted" }), {
		status: 200,
	});
}
