import type { User } from "@/types";

async function request<T>(url: string, body?: unknown): Promise<T> {
  const response = await fetch(url, {
    method: body ? "POST" : "GET",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Request failed");
  }

  return data;
}

export function signup(input: { name: string; email: string; password: string }) {
  return request<{ user: User }>("/api/auth/signup", input);
}

export function login(input: { email: string; password: string }) {
  return request<{ user: User }>("/api/auth/login", input);
}

export function getMe() {
  return request<{ user: User | null }>("/api/auth/me");
}
