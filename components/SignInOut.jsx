"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
const SignInOut = () => {
	const session = useSession();
	console.log(session);

	return (
		<>
			{session.data && session.status === "authenticated" ? (
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
			) : (
				<li>
					<button
						className="text-emerald-700"
						onClick={() => {
							signIn();
						}}
					>
						Sign In
					</button>
				</li>
			)}
		</>
	);
};

export default SignInOut;
