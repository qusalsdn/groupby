import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken && request.nextUrl.pathname !== "/signIn" && request.nextUrl.pathname !== "/signUp")
    return NextResponse.redirect(new URL("/signIn", request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
