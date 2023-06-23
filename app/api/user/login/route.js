import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import { signJwtAccessToken } from "@/utils/jwt";
import prisma from "@/utils/prismaClient";

export async function POST(req) {
	const body = await req.json();

	const user = await prisma.users.findFirst({
		where: {
			name: body.name,
		},
	});
	if (!user) return NextResponse.json("User Not Found!");
	const samePassword = await bcrypt.compare(body.password, user.password);
	if (samePassword) {
		const { password, ...userWithoutPass } = user;
		// const accessToken = signJwtAccessToken(userWithoutPass);
		// const userWithAccessToken = {
		// 	...userWithoutPass,
		// 	accessToken,
		// };
		return NextResponse.json(userWithoutPass);
	} else {
		return NextResponse.json("Password mismatch");
	}
}
