import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

// create comment
export async function POST(req) {
	/*the body should be like this provide the name from the session
	{
	
	"content":"post number 4",
	"authorId":,
	"postId":
}
*/
	const body = await req.json();
	// to attach the authorId to the comment
	const author = await prisma.users.findFirst({
		where: {
			name: body.name,
		},
	});

	const comment = await prisma.comments.create({
		data: {
			content: body.content,
			username: body.name,
			postId: +body.postId,
			authorId: author.id,
		},
	});
	return NextResponse.json(comment);
}
