import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-mist">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-coral">College Discovery</p>
          <h1 className="mt-4 text-5xl font-bold leading-tight text-ink md:text-6xl">
            Find colleges that fit your goals, budget, and next move.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
            Search schools, compare tuition and acceptance rates, and keep a personal saved list while you plan applications.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/colleges">Explore colleges</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/signup">Create account</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
