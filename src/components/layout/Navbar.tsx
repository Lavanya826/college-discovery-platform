"use client";

import Link from "next/link";
import { Bookmark, GraduationCap, LogIn } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const { user, loading } = useAuth();

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/colleges" className="flex items-center gap-2 font-bold text-ink">
          <GraduationCap className="h-5 w-5 text-brand" />
          College Discovery
        </Link>
        <div className="flex items-center gap-2">
          <Link className="text-sm font-medium text-slate-700 hover:text-ink" href="/colleges">
            Colleges
          </Link>
          {user ? (
            <Link className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-ink" href="/saved">
              <Bookmark className="h-4 w-4" />
              Saved
            </Link>
          ) : null}
          {!loading && !user ? (
            <Button asChild className="ml-2" variant="secondary">
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Log in
              </Link>
            </Button>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
