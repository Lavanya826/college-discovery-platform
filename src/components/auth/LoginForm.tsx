"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { login } from "@/services/authService";

export function LoginForm({ nextPath = "/colleges" }: { nextPath?: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError("");

    try {
      await login({
        email: String(formData.get("email")),
        password: String(formData.get("password"))
      });
      router.push(nextPath);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to log in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={onSubmit} className="space-y-4">
      <Input name="email" type="email" placeholder="Email" required />
      <Input name="password" type="password" placeholder="Password" required />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <Button className="w-full" disabled={loading} type="submit">
        {loading ? "Logging in..." : "Log in"}
      </Button>
    </form>
  );
}
