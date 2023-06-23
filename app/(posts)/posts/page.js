import React from "react";
import { PostCard } from "@/components";
const Posts = async () => {
	const response = await fetch("http://localhost:3000/api/posts", {
		cache: "no-store",
	});
	const listOfPosts = await response.json();

	return (
		<div className="flex flex-col flex-1 justify-center items-center gap-2 mx-2  ">
			{listOfPosts.map((post) => {
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
