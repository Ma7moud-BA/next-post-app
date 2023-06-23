"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import { AiFillLike, AiOutlineComment } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { Comments, CreateComment } from ".";
const PostCard = ({ title, content, publisher, createdAt, id }) => {
	const [showComments, setShowComments] = useState(false);
	const session = useSession();
	const router = useRouter();
	useEffect(() => {
		// i put this here because the main posts/page.js is server side and i want to keep it as its s
		if (session.status === "unauthenticated") {
			router.push("/signup");
		}
	}, [session.status]);
	const getTimeSinceCreation = (createdAt) => {
		const creationDate = new Date(createdAt);
		return formatDistanceToNow(creationDate, { addSuffix: true });
	};
	const timeSinceCreation = getTimeSinceCreation(createdAt);

	const handleDeletePost = async (id) => {
		await fetch(`/api/posts/${id}`, {
			method: "DELETE",
			headers: { authorization: session.data.token.accessToken },
		});
		router.refresh();
	};

	return (
		<div className=" relative flex flex-col bg-gray-300  min-w-full min-h-[500px] rounded-md">
			{/* only show the delete button to the post publisher */}

			{session.status === "authenticated" &&
				session.data &&
				session.data.token.name === publisher && (
					<BsTrash
						className=" absolute top-4 right-4 text-2xl hover:text-red-950 cursor-pointer"
						onClick={() => {
							handleDeletePost(id);
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
					<h3 className="capitalize text-black font-semibold">{publisher}</h3>.
					<p>{timeSinceCreation}</p>
				</div>
			</div>
			<div className="p-4">
				<div className="">
					<h2 className=" capitalize font-extrabold text-black">{title}</h2>
					<p className="text-white min-h-[300px]">{content}</p>
				</div>
			</div>
			<div className=" mt-auto bg-black p-4 flex justify-between">
				<AiFillLike className="text-3xl cursor-pointer hover:text-primary" />
				<AiOutlineComment
					onClick={() => {
						setShowComments((prev) => !prev);
					}}
					className="text-3xl cursor-pointer hover:text-primary"
				/>
			</div>
			{showComments && (
				<>
					<Comments postId={id}></Comments>
					<CreateComment postId={id}></CreateComment>
				</>
			)}
		</div>
	);
};

export default PostCard;
