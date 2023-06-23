"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BsTrash } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Comments = ({ postId }) => {
	const [comments, setComments] = useState([]);
	const session = useSession();
	const router = useRouter();
	useEffect(() => {
		const handleFetchComments = async () => {
			const res = await fetch(`/api/comments/${postId}`);
			const data = await res.json();
			setComments(data);
		};
		handleFetchComments();
	}, []);
	const handleDeleteComment = async (id) => {
		await fetch(`/api/comments/${id}`, {
			method: "DELETE",
			headers: { authorization: session.data.token.accessToken },
		});
		router.refresh();
	};

	return (
		<div>
			{comments.map((comment) => {
				return (
					<div
						key={comment.id}
						className="relative bg-gray-500 m-2 rounded-md "
					>
						{session.status === "authenticated" &&
							comment.username === session.data.token.name && (
								<BsTrash
									className=" absolute top-4 right-4 text-2xl hover:text-red-950 cursor-pointer"
									onClick={() => {
										handleDeleteComment(comment.id);
									}}
								/>
							)}
						<div className="flex  gap-2 p-4">
							<Image
								src="/defaultUser.png"
								alt="user avatar"
								width={50}
								height={50}
								className="rounded-full"
							/>
							<div className="flex gap-2">
								<h3 className="capitalize text-black font-semibold">
									{comment.username}
								</h3>
							</div>
						</div>
						<div className="p-4">{comment.content}</div>
					</div>
				);
			})}
		</div>
	);
};

export default Comments;
