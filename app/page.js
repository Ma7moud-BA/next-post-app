"use client";
import Image from "next/image";

import { useSession } from "next-auth/react";
import { Posts, SideBar } from "@/components";
export default function Home() {
	const session = useSession();
	if (session.status === "authenticated") {
		return (
			<main className=" min-h-scree flex">
				<Posts></Posts>
			</main>
		);
	} else {
		return (
			<h2 className="border bg-red-700 h-16 rounded-full  capitalize w-[90%] mt-10 mx-auto font-bold text-white flex  items-center justify-center">
				you are not signed In
			</h2>
		);
	}
}
