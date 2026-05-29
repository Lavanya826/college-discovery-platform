import type { ReactNode } from "react";
import { Navbar } from "./Navbar";

export function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-mist">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
