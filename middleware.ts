import { NextRequest, NextResponse } from "next/server";
import {
  SYSTEM_SESSION_COOKIE_NAME,
  parseSystemSession,
} from "@/lib/systemSession";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoginPath =
    pathname === "/system/login" ||
    pathname.startsWith("/zh/system/login") ||
    pathname.startsWith("/en/system/login");

  if (isLoginPath) {
    return NextResponse.next();
  }

  const rawSession =
    request.cookies.get(SYSTEM_SESSION_COOKIE_NAME)?.value ?? null;
  const session = parseSystemSession(rawSession);

  const requiresLogin =
    pathname.startsWith("/system") ||
    pathname.startsWith("/zh/system") ||
    pathname.startsWith("/en/system");

  if (requiresLogin && !session) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/system/login";
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const isCoursesPath =
    pathname === "/system/courses" ||
    pathname.startsWith("/zh/system/courses") ||
    pathname.startsWith("/en/system/courses");

  if (isCoursesPath && session && !session.canAccessCourses) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/system";
    redirectUrl.searchParams.set("noCoursesAccess", "1");
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/system/:path*", "/zh/system/:path*", "/en/system/:path*"],
};

