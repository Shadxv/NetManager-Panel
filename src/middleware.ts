import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_PREFIXES = ['/dashboard'];
const AUTH_ROUTES = ['/login'];
const SETUP_ROUTES = ['/login/setup', '/login/reset'];

export function middleware(request: NextRequest) {
    const token = request.cookies.get('nm_auth_token')?.value;
    const { pathname } = request.nextUrl;

    if (pathname === '/') {
        return NextResponse.next();
    }

    const isProtectedRoute = PROTECTED_PREFIXES.some(prefix => pathname.startsWith(prefix));
    const isSetupRoute = SETUP_ROUTES.some(route => pathname.startsWith(route));
    const isAuthRoute = AUTH_ROUTES.some(route => pathname === route || pathname === `${route}/`);

    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if ((isProtectedRoute || isSetupRoute) && !token) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};