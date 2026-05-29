import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import { Card } from "@/components/ui/Card";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-mist px-4">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-ink">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-600">Log in to continue building your college list.</p>
        <div className="mt-6">
          <LoginForm nextPath={next ?? "/colleges"} />
        </div>
        <p className="mt-5 text-center text-sm text-slate-600">
          No account?{" "}
          <Link className="font-semibold text-brand hover:underline" href="/signup">
            Sign up
          </Link>
        </p>
      </Card>
    </main>
  );
}
