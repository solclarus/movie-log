"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const signIn = async (formData: FormData) => {
	await auth.api.signInEmail({
		body: {
			email: formData.get("email") as string,
			password: formData.get("password") as string,
		},
	});
};

export const signUp = async (formData: FormData) => {
	await auth.api.signUpEmail({
		body: {
			name: formData.get("username") as string,
			email: formData.get("email") as string,
			password: formData.get("password") as string,
		},
	});
};

export const signOut = async () => {
	await auth.api.signOut({
		headers: await headers(),
	});
};

export const session = await auth.api.getSession({
	headers: await headers(),
});
