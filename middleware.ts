import type { Session } from "@/lib/auth";
import { betterFetch } from "@better-fetch/fetch";
import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { type Locale, routing } from "./i18n/routing";

// 認証関連のルート定義
const authRoutes = ["/sign-in", "/sign-up"];
const passwordRoutes = ["/reset-password", "/forgot-password"];
const protectedRoutes = ["/dashboard"];

// next-intlミドルウェアの設定
const intlMiddleware = createMiddleware(routing);

// 認証チェック関数
async function checkAuth(request: NextRequest, pathname: string) {
  const isAuthRoute = authRoutes.some((route) => pathname.endsWith(route));
  const isPasswordRoute = passwordRoutes.some((route) =>
    pathname.endsWith(route),
  );
  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      pathname === route ||
      pathname.endsWith(`${route}`) ||
      pathname.includes(`${route}/`),
  );

  if (isProtectedRoute) {
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
      // ロケールを保持してリダイレクト
      const url = new URL("/sign-in", request.url);
      // ロケールが含まれるパスからロケール部分を取得
      const locale = pathname.split("/")[1];
      if (routing.locales.includes(locale as Locale)) {
        url.pathname = `/${locale}${url.pathname}`;
      }
      return NextResponse.redirect(url);
    }
  }

  if ((isAuthRoute || isPasswordRoute) && !isProtectedRoute) {
    const { data: session } = await betterFetch<Session>(
      "/api/auth/get-session",
      {
        baseURL: process.env.BETTER_AUTH_URL,
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      },
    );

    if (session) {
      // ロケールを保持してリダイレクト
      const url = new URL("/", request.url);
      const locale = pathname.split("/")[1];
      if (routing.locales.includes(locale as Locale)) {
        url.pathname = `/${locale}${url.pathname}`;
      }
      return NextResponse.redirect(url);
    }
  }

  return null;
}

// メインのミドルウェア関数
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 特定のパスを無視
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/trpc") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/_vercel") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // まず認証チェック
  const authResult = await checkAuth(request, pathname);
  if (authResult) return authResult;

  // 次にi18nミドルウェア
  return intlMiddleware(request);
}

// マッチャー設定を組み合わせる
export const config = {
  matcher: [
    // i18nのマッチャー
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
    // 認証のマッチャー
    "/dashboard/:path*",
    "/sign-in",
    "/sign-up",
    "/reset-password",
    "/forgot-password",
  ],
};
