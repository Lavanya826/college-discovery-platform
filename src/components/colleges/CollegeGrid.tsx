"use client";

import type { College } from "@/types";
import { CollegeCard } from "./CollegeCard";

export function CollegeGrid({ colleges, onToggleSaved }: { colleges: College[]; onToggleSaved?: (college: College) => void }) {
  if (colleges.length === 0) {
    return <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">No colleges found.</div>;
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {colleges.map((college) => (
        <CollegeCard college={college} key={college.id} onToggleSaved={onToggleSaved} />
      ))}
    </div>
  );
}
