"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { headers } from "next/dist/client/components/headers";
import { AiOutlineSend } from "react-icons/ai";
import { useRouter } from "next/navigation";
const CreateComment = ({ postId }) => {
	const session = useSession();
	const router = useRouter();
	// console.log(session);
	const [commentContent, setCommentContent] = useState("");
	const handleCreateComment = async (e) => {
		e.preventDefault();
		console.log(commentContent, postId, session.data.token.name);
		await fetch("http://localhost:3000/api/comments", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				content: commentContent,
				postId: +postId,
				name: session.data.token.name,
			}),
		});
		router.push("/");
	};
	return (
		<form className=" flex justify-center py-5 border-t-2  border-black">
			{session.status === "authenticated" && (
				<div className=" flex items-center w-full justify-center">
					<input
						type="text"
						value={commentContent}
						onChange={(e) => {
							setCommentContent(e.target.value);
						}}
						className=" w-[90%] rounded-full h-12  p-2"
						placeholder={`comment as ${session.data.token.name}`}
					/>
					<AiOutlineSend
						size={25}
						cursor="pointer"
						onClick={(e) => {
							handleCreateComment(e);
						}}
					/>
				</div>
			)}
		</form>
	);
};

export default CreateComment;
