"use client";
import { useSession } from "next-auth/react";
import { Posts } from "@/components";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);
	const session = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session.status === "loading") {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	}, [session.status]);

	if (isLoading) {
		return (
			<h2 className="border bg-red-700 h-16 rounded-full capitalize w-[90%] mt-10 mx-auto font-bold text-white flex items-center justify-center">
				Loading...
			</h2>
		);
	}

	if (session.status === "authenticated") {
		router.push("/posts");
	} else {
		return (
			<h2 className="border bg-red-700 h-16 rounded-full capitalize w-[90%] mt-10 mx-auto font-bold text-white flex items-center justify-center">
				You are not signed in
			</h2>
		);
	}
}
