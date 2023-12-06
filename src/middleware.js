import { withAuth } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard"],
};

export const middleware = withAuth({
  pages: {
    signIn: "/login",
  },
});