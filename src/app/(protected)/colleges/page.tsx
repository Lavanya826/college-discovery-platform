"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CollegeGrid } from "@/components/colleges/CollegeGrid";
import { Filters } from "@/components/colleges/Filters";
import { SearchBar } from "@/components/colleges/SearchBar";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/Button";
import { useColleges } from "@/hooks/useColleges";
import { removeSavedCollege, saveCollege } from "@/services/collegeService";
import type { College } from "@/types";

export default function CollegesPage() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [savedOverrides, setSavedOverrides] = useState<Record<string, boolean>>({});
  const { data, loading, error } = useColleges({ q, type, page });

  async function toggleSaved(college: College) {
    if (college.isSaved) {
      await removeSavedCollege(college.id);
      setSavedOverrides((current) => ({ ...current, [college.id]: false }));
    } else {
      await saveCollege(college.id);
      setSavedOverrides((current) => ({ ...current, [college.id]: true }));
    }
  }

  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;
  const colleges =
    data?.colleges.map((college) => ({
      ...college,
      isSaved: savedOverrides[college.id] ?? college.isSaved
    })) ?? [];

  return (
    <PageWrapper>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ink">Colleges</h1>
          <p className="mt-2 text-slate-600">Search schools and compare admissions basics.</p>
        </div>
        <div className="flex w-full gap-3 md:w-auto">
          <div className="min-w-0 flex-1 md:w-80">
            <SearchBar
              value={q}
              onChange={(value) => {
                setQ(value);
                setPage(1);
              }}
            />
          </div>
          <Filters
            value={type}
            onChange={(value) => {
              setType(value);
              setPage(1);
            }}
          />
        </div>
      </div>
      {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}
      {loading ? <p className="text-slate-600">Loading colleges...</p> : <CollegeGrid colleges={colleges} onToggleSaved={toggleSaved} />}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-slate-600">{data ? `${data.total} schools found` : ""}</p>
        <div className="flex gap-2">
          <Button disabled={page <= 1} variant="secondary" onClick={() => setPage((current) => current - 1)}>
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>
          <Button disabled={page >= totalPages} variant="secondary" onClick={() => setPage((current) => current + 1)}>
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}
