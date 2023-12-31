import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { signJwtAccessToken } from "@/utils/jwt";

export const handler = NextAuth({
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text", placeholder: "jsmith" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				// Add logic here to look up the user from the credentials supplied
				const response = await fetch(
					"https://next-post-app.vercel.app/api/user/login",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							name: credentials.username,
							password: credentials.password,
						}),
					}
				);
				const user = await response.json();
				if (user) {
					return user;
				} else {
					return user;
				}
			},
		}),
		Github({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
	// These callbacks are used to modify the JWT token and session object during the authentication process. Here's a detailed explanation of each callback
	/**
	 * This callback takes two parameters: token and user. The token parameter represents the default token generated by NextAuth, and the user parameter contains the user information retrieved during authentication.
	 */
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				//  generate and append a JWT for the user for every provider method
				const accessToken = signJwtAccessToken(user);
				token.accessToken = accessToken;
			}
			return token;
		},
		async session(session, token) {
			session.user = token;
			return session;
		},
	},
	session: {
		jwt: true,
	},
});
export { handler as GET, handler as POST };
