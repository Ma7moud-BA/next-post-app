import "./globals.css";
import { Footer, Navbar, Provider } from "@/components";

export const metadata = {
	title: "PostVerse",
	description: "PostVerse: Where Ideas Collide and Conversations Thrive!",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="min-h-screen bg-white">
				<Provider>
					<Navbar />
					{children}
				</Provider>
			</body>
		</html>
	);
}
