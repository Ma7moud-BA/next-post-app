import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
const prisma = new PrismaClient();

export async function POST(req) {
	const body = await req.json();
	const alreadyTaken = await prisma.users.findFirst({
		where: {
			name: body.name,
		},
	});
	// because i want to send the name from the session as identifer when creating a post.
	if (alreadyTaken) {
		return new NextResponse(JSON.stringify({ error: "Name already taken" }), {
			status: 401,
		});
	}
	const hashedPassword = await bcrypt.hash(body.password, 10);
	const user = await prisma.users.create({
		data: {
			name: body.name,
			email: body.email,
			password: hashedPassword,
		},
	});
	const { password, ...userWithoutPassword } = user;
	return NextResponse.json(userWithoutPassword);
}
