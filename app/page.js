import Image from "next/image";
import { Posts, SideBar } from "@/components";
export default function Home() {
	return (
		<main className=" min-h-scree flex">
			<Posts></Posts>
			<SideBar></SideBar>
		</main>
	);
}
