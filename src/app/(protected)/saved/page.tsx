"use client";

import { CollegeGrid } from "@/components/colleges/CollegeGrid";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { useSavedColleges } from "@/hooks/useSavedColleges";

export default function SavedPage() {
  const { colleges, loading, toggleSaved } = useSavedColleges();

  return (
    <PageWrapper>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-ink">Saved colleges</h1>
        <p className="mt-2 text-slate-600">Keep your shortlist close while you compare options.</p>
      </div>
      {loading ? <p className="text-slate-600">Loading saved colleges...</p> : <CollegeGrid colleges={colleges} onToggleSaved={toggleSaved} />}
    </PageWrapper>
  );
}
