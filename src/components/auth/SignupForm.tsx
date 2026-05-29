"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { signup } from "@/services/authService";

export function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError("");

    try {
      await signup({
        name: String(formData.get("name")),
        email: String(formData.get("email")),
        password: String(formData.get("password"))
      });
      router.push("/colleges");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={onSubmit} className="space-y-4">
      <Input name="name" placeholder="Full name" required />
      <Input name="email" type="email" placeholder="Email" required />
      <Input name="password" type="password" placeholder="Password" required minLength={8} />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <Button className="w-full" disabled={loading} type="submit">
        {loading ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
