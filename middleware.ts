// middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/login', // Redirect here if not authenticated
  },
  callbacks: {
    authorized: ({ token, req }) => {
      const path = req.nextUrl.pathname;
      console.log(path);

      // Protect only specific routes
      const protectedRoutes = ['/find-your-fashion-mate', '/my-profile' , '/enjoy-thrifting'];
      const isProtected = protectedRoutes.some(route => path.startsWith(route));

      // Allow if not protected
      if (!isProtected) return true;

      // Allow only if token exists
      return !!token;
    },
  },
});

export const config = { // specific routes where these middleware will work
  // matcher: ['/find-your-fashion-mate/:path*', '/enjoy-thrifting/:path*', '/my-profile/:path*'], // optimizing middleware to check only necessary routes
  matcher: ['/(.*)'], // Apply middleware to all routes

};
