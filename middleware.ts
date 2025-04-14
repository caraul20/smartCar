import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // Logare pentru debugging
  console.log('Middleware: Request pentru URL', url.pathname);
  
  // Continuă cu requestul normal
  return NextResponse.next();
}

// Specifică pentru ce pagini să ruleze middleware-ul
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 