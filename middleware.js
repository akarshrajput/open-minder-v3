/*import { NextResponse } from "next/server";

export function middleware(request) {
  console.log(request);

  return NextResponse.redirect(new URL("/write", request.url));
}*/

import { auth } from "@lib/auth";

export const middleware = auth;

export const config = {
  matcher: ["/subscription"], // If we go to these routes, then we will be redirected to above Redirect or signin page route automatically
};
