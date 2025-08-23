### Auth with Kinde
[Kinde](https://kinde.com/)
- Authentication Methods
- token expire(time zone)
- Manage User
	- Permissons
- configure middleware to protect routes and set white list:
```ts
import { withAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  return withAuth(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - auth
     * - favicon.ico (favicon file)
     * - robots.txt
     * - images
     * - login
     * - homepage (represented with $ after beginning /)
     */
    '/((?!api|_next/static|_next/image|auth|favicon.ico|robots.txt|images|login|$).*)',
  ]
}

```



