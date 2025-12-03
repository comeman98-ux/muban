import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE_NAME = "fx_system_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 允许访问登录页本身
  const isLoginPath =
    pathname === "/system/login" ||
    pathname.startsWith("/zh/system/login") ||
    pathname.startsWith("/en/system/login");

  if (isLoginPath) {
    return NextResponse.next();
  }

  const isProtectedCoursesPath =
    pathname === "/system/courses" ||
    pathname.startsWith("/zh/system/courses") ||
    pathname.startsWith("/en/system/courses");

  if (isProtectedCoursesPath) {
    const hasSession = request.cookies.get(SESSION_COOKIE_NAME)?.value === "active";

    if (!hasSession) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/system/login";
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/system/:path*", "/zh/system/:path*", "/en/system/:path*"],
};

