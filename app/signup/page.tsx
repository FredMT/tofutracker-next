// import Image from 'next/image'
// import SignUpCard from './SignUpCard'

// export default async function SignUp({
//   searchParams,
// }: {
//   searchParams: { message: string; from: string }
// }) {
//   let bg_img
//   let interspersedBackdropPaths
//   if (searchParams.from) {
//     const item_type = searchParams.from.split('/')[0]
//     const item_id = searchParams.from.split('/')[1]
//     bg_img = await fetch(
//       `http://localhost:8080/api/getbackdropimage/${item_type}/${item_id}`
//     ).then((res) => res.json())
//   } else {
//     const trending = await fetch('http://localhost:8080/api/trending', {
//       next: { revalidate: 86400 },
//     }).then((res) => res.json())

//     interspersedBackdropPaths = trending.movies
//       .map((movie: any, index: number) => [
//         movie.backdrop_path,
//         trending.tvShows?.[index]?.backdrop_path,
//       ])
//       .flat()
//       .filter(Boolean)
//   }

//   return (
//     <>
//       {searchParams.from ? (
//         <Image
//           src={`https://image.tmdb.org/t/p/original${bg_img}`}
//           alt="SignUp Background"
//           fill
//           className="animate-fade-in-50 absolute z-0 object-cover object-center opacity-70 duration-500 animate-in dark:opacity-30"
//         />
//       ) : (
//         <Image
//           src={`https://image.tmdb.org/t/p/original${interspersedBackdropPaths[Math.floor(Math.random() * interspersedBackdropPaths.length)]}`}
//           alt="SignUp Background"
//           fill
//           className="animate-fade-in-50 absolute z-0 object-cover object-center opacity-70 duration-500 animate-in dark:opacity-30"
//         />
//       )}
//       <div className="my-20 flex justify-center">
//         <div className="z-10 mt-20 flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
//           <SignUpCard />
//         </div>
//       </div>
//     </>
//   )
// }

import { lucia } from "@/lib/auth";
import { db } from "@/lib/db";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignUp() {
	return (
		<>
			<h1 className="mt-24">Create an account</h1>
			<form action={signup}>
				<label htmlFor="username">Username</label>
				<input name="username" id="username" />
				<br />
				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="password" />
				<br />
				<button>Continue</button>
			</form>
		</>
	);
}

async function signup(formData: FormData): Promise<ActionResult> {
	"use server";
	const username = formData.get("username");
	// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
	// keep in mind some database (e.g. mysql) are case insensitive
	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		!/^[a-z0-9_-]+$/.test(username)
	) {
		return {
			error: "Invalid username"
		};
	}
	const password = formData.get("password");
	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
		return {
			error: "Invalid password"
		};
	}

	const passwordHash = await hash(password, {
		// recommended minimum parameters
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});
	const userId = generateIdFromEntropySize(10); // 16 characters long

	// TODO: check if username is already used
	await db.user.create({
  data: {
    id: userId,
    username: username,
    password_hash: passwordHash
  }
});

	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/");
}

interface ActionResult {
	error: string;
}