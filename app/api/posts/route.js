import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

//get all posts
export async function GET(req) {
	const posts = await prisma.posts.findMany();
	return NextResponse.json(posts);
}
// create post
export async function POST(req) {
	/*the body should be like this provide the name from the session
	{
	"title":"post number 3",
	"content":"post number 3",
	"name":"abood"
}*/

	const body = await req.json();
	const publisher = await prisma.users.findFirst({
		where: {
			name: body.name,
		},
	});
	if (publisher) {
		const post = await prisma.posts.create({
			data: {
				title: body.title,
				content: body.content,
				publisherId: +publisher.id,
				publisherName: publisher.name,
			},
		});
		return NextResponse.json(post);
	} else {
		return NextResponse.json("something went wrong");
	}
}
