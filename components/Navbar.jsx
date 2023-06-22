import Link from "next/link";
import React from "react";
import { SignInOut } from ".";
import { signIn } from "next-auth/react";
const Navbar = () => {
	return (
		<nav className=" flex justify-between px-4 py-2 bg-[#F7FFE5]">
			<h3 className="font-bold text-[#A0C49D]">PostVerse</h3>
			<ul className="flex gap-2">
				<li className="font-semibold ">
					<Link href="/">Posts</Link>
				</li>

				<SignInOut></SignInOut>
			</ul>
		</nav>
	);
};

export default Navbar;
