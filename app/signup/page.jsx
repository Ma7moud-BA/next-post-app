"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
const SignUp = () => {
	const nameRegex = /^[A-Za-z\s]{2,50}$/;
	const emailRegex =
		/^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,})$/;
	const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

	const [userInfo, setUserInfo] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const router = useRouter();
	const handleChangeUserInfoOnChange = (e) => {
		setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
	const handleSignUp = async () => {
		const isNameValid = nameRegex.test(userInfo.name);
		// Test email input
		const isEmailValid = emailRegex.test(userInfo.email);
		// Test password input
		const isPasswordValid = passwordRegex.test(userInfo.password);
		if (!isNameValid) {
			return setError("Name must be at least lenght 2 maximun 50");
		}
		if (!isEmailValid) {
			return setError("Invalide email syntax");
		}
		if (!isPasswordValid) {
			return setError(
				"Password must be minimum of 8 characters, one UpperCase letter, one lowercase, one digit, and one special character"
			);
		}
		if (isNameValid && isEmailValid && isPasswordValid) {
			const res = await fetch("http://localhost:3000/api/user/signup", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					name: userInfo.name,
					email: userInfo.email,
					password: userInfo.password,
				}),
			});
			const data = await res.json();

			if (res.ok) {
				//sign in the user automatically if the res is done
				await signIn("credentials", {
					username: userInfo.name,
					password: userInfo.password,
					redirect: false,
				});
				router.push("/");
			} else {
				setError(data.error);
			}
		}
	};
	return (
		<div className="w-full max-w-xs mx-auto mt-10">
			<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Name
					</label>
					<input
						name="name"
						value={userInfo.name}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
						type="text"
						placeholder="Username"
						onChange={(e) => {
							handleChangeUserInfoOnChange(e);
						}}
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Email
					</label>
					<input
						name="email"
						value={userInfo.email}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
						type="text"
						placeholder="Username"
						onChange={(e) => {
							handleChangeUserInfoOnChange(e);
						}}
					/>
				</div>
				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Password
					</label>
					<input
						name="password"
						value={userInfo.password}
						className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
						type="password"
						placeholder="******************"
						onChange={(e) => {
							handleChangeUserInfoOnChange(e);
						}}
					/>
				</div>
				<div className="flex items-center justify-between">
					<button
						onClick={handleSignUp}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="button"
					>
						Sign Up
					</button>
				</div>
				{error && <p>{error}</p>}
				<p className=" mt-2">
					Already have an account?{" "}
					<span
						className="text-primary underline cursor-pointer"
						onClick={signIn}
					>
						{" "}
						Sign In
					</span>
				</p>
			</form>
		</div>
	);
};

export default SignUp;
