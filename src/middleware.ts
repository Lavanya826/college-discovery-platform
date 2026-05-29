import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = ["/colleges", "/saved"];
const authRoutes = ["/login", "/signup"];
const authCookieName = "college_token";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthed = Boolean(request.cookies.get(authCookieName)?.value);
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !isAuthed) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthed && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/colleges", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/colleges/:path*", "/saved/:path*", "/login", "/signup"]
};
