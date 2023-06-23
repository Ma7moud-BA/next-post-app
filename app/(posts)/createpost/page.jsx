"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import EmojiPicker from "emoji-picker-react";
import { useSession } from "next-auth/react";
import { BsEmojiSmile } from "react-icons/bs";
import { Popover } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
const CreatePost = () => {
	const [post, setPost] = useState({ title: "", content: "" });
	const [selectedEmoji, setSelectedEmoji] = useState("");
	const session = useSession();
	const router = useRouter();
	// useEffect(() => {
	// 	if (session.status !== "authenticated") {
	// 		signIn();
	// 	}
	// }, []);
	const handleSetPostOnChange = (e) => {
		setPost((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleEmojiClick = (emojiObject) => {
		const emoji = emojiObject.emoji;
		setSelectedEmoji(emoji);
		setPost((prev) => ({
			...prev,
			content: prev.content + emoji,
		}));
	};
	const handleSubmitPost = async () => {
		console.log(session.data.token.name);
		await fetch("/api/posts", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				title: post.title,
				content: post.content,
				name: session.data.token.name,
			}),
		});
		router.push("/");
	};
	if (session.status === "authenticated") {
		return (
			<div className="">
				<h1 className="font-bold ps-5">Create Post</h1>
				<div className="relative flex flex-col bg-gray-300 w-full min-h-[500px] rounded-md">
					<div className="flex gap-2 p-4">
						<Image
							src="/defaultUser.png"
							alt="user avatar"
							width={50}
							height={50}
							className="rounded-full"
						/>
						<div className="flex gap-2">
							<h3 className="capitalize text-black font-semibold">
								{session.data.token.name}
							</h3>
						</div>
						<button className="ms-auto btn" onClick={handleSubmitPost}>
							POST
						</button>
					</div>
					<form className="flex flex-col gap-2 p-4">
						<label className="font-bold text-black me-4"> Post Title</label>
						<input
							type="text"
							name="title"
							className="input bg-white text-black"
							onChange={(e) => {
								handleSetPostOnChange(e);
							}}
						/>
						<label className="font-bold text-black me-4"> Post Content</label>
						<Popover className="relative">
							<Popover.Button>
								<BsEmojiSmile className="  text-2xl text-yellow-800 cursor-pointer " />
							</Popover.Button>

							<Popover.Panel className="absolute z-10 ">
								<EmojiPicker onEmojiClick={handleEmojiClick} height={400} />
							</Popover.Panel>
						</Popover>
						<textarea
							name="content"
							cols="30"
							rows="10"
							className="bg-white rounded-md text-black resize-none"
							value={post.content}
							onChange={(e) => {
								handleSetPostOnChange(e);
							}}
						></textarea>
					</form>
				</div>
			</div>
		);
	} else {
		return <div>Not authenticated</div>;
	}
};

export default CreatePost;
