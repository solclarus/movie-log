import type { Session } from "@/lib/auth";
import { betterFetch } from "@better-fetch/fetch";
import { type NextRequest, NextResponse } from "next/server";

const authRoutes = ["/sign-in", "/sign-up"];
const passwordRoutes = ["/reset-password", "/forgot-password"];

export default async function authMiddleware(request: NextRequest) {
	const pathName = request.nextUrl.pathname;
	const isAuthRoute = authRoutes.includes(pathName);
	const isPasswordRoute = passwordRoutes.includes(pathName);

	const { data: session } = await betterFetch<Session>(
		"/api/auth/get-session",
		{
			baseURL: process.env.BETTER_AUTH_URL,
			headers: {
				cookie: request.headers.get("cookie") || "",
			},
		},
	);

	if (!session) {
		if (isAuthRoute || isPasswordRoute) {
			return NextResponse.next();
		}
		return NextResponse.redirect(new URL("/sign-in", request.url));
	}

	if (isAuthRoute || isPasswordRoute) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)", "/dashboard"],
};
