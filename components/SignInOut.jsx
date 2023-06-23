"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
const SignInOut = () => {
	const session = useSession();

	return (
		<>
			{session.data && session.status === "authenticated" ? (
				<>
					<li className="font-semibold ">
						<Link href="/createpost">Create Post</Link>
					</li>
					<li>
						<span className="me-2">{session.data.session.user.name}</span>

						<button
							className="text-red-500"
							onClick={() => {
								signOut();
							}}
						>
							Sign Out
						</button>
					</li>
				</>
			) : (
				<li>
					<Link href={"/signup"}> SignUp</Link>
					{/* <button
						className="text-emerald-700"
						onClick={() => {
							signIn();
						}}
					>
						Sign In
					</button> */}
				</li>
			)}
		</>
	);
};

export default SignInOut;
