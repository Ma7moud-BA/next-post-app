import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
	console.log(body.postId);

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
