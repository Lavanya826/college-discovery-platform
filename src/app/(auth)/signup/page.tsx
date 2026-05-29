import Link from "next/link";
import { SignupForm } from "@/components/auth/SignupForm";
import { Card } from "@/components/ui/Card";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-mist px-4">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-ink">Create your account</h1>
        <p className="mt-2 text-sm text-slate-600">Save schools and keep your search organized.</p>
        <div className="mt-6">
          <SignupForm />
        </div>
        <p className="mt-5 text-center text-sm text-slate-600">
          Already registered?{" "}
          <Link className="font-semibold text-brand hover:underline" href="/login">
            Log in
          </Link>
        </p>
      </Card>
    </main>
  );
}
