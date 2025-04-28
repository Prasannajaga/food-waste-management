// import { NextResponse } from 'next/server';
// import { NextRequest } from 'next/server';

// export const config = {
//   matcher: [
//     // Match all routes except:
//     // - _next/static (static files)
//     // - _next/image (image optimization)
//     // - favicon.ico
//     // - login, register (no auth needed)
//     // - api (API routes)
//     '/((?!_next/static|_next/image|favicon.ico|login|register|api).*)',
//   ],
// };



// export function middleware(request: NextRequest) {
//   const isLoggedIn = false;


//   const { pathname } = request.nextUrl;

//   // Allow the following routes without authentication
//   if (pathname.startsWith('/login')) {
//     return NextResponse.next();
//   }

//   // If not logged in, redirect to login
//   if (!isLoggedIn) { 
//     const loginUrl = new URL('/login', request.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   // Otherwise continue
//   return NextResponse.next();
// }
