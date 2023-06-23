"use client";
import React, { useEffect, useState } from "react";
import { PostCard } from "@/components";
const Posts = () => {
	const [listOfPosts, setListOfPosts] = useState([]);
	useEffect(() => {
		const handleFetchPosts = async () => {
			const response = await fetch("http://localhost:3000/api/posts", {
				cache: "no-store",
			});
			const data = await response.json();
			setListOfPosts(data);
		};
		handleFetchPosts();
	}, []);

	return (
		<div className="flex flex-col flex-1 justify-center items-center gap-2 mx-2  ">
			{listOfPosts.map((post) => {
				console.log(listOfPosts);

				return (
					<PostCard
						key={post.id}
						id={post.id}
						title={post.title}
						content={post.content}
						publisher={post.publisherName}
						createdAt={post.createdAt}
					/>
				);
			})}
		</div>
	);
};

export default Posts;
