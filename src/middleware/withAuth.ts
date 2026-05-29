import { NextResponse, type NextRequest } from "next/server";
import { verifyToken, authCookieName } from "@/lib/auth";

type AuthedHandler = (request: NextRequest, userId: string) => Promise<Response>;
type AuthedHandlerWithContext<TContext> = (request: NextRequest, userId: string, context: TContext) => Promise<Response>;

export function withAuth(handler: AuthedHandler): (request: NextRequest) => Promise<Response>;
export function withAuth<TContext>(
  handler: AuthedHandlerWithContext<TContext>
): (request: NextRequest, context: TContext) => Promise<Response>;
export function withAuth<TContext>(handler: AuthedHandler | AuthedHandlerWithContext<TContext>) {
  return async (request: NextRequest, context?: TContext) => {
    const token = request.cookies.get(authCookieName)?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
      const user = await verifyToken(token);
      return handler(request, user.id, context as TContext);
    } catch {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  };
}
