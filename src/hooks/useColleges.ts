"use client";

import { useEffect, useMemo, useState } from "react";
import type { PaginatedColleges } from "@/types";
import { getColleges } from "@/services/collegeService";

type Filters = {
  q: string;
  type: string;
  page: number;
};

export function useColleges(filters: Filters) {
  const [data, setData] = useState<PaginatedColleges | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const params = useMemo(() => {
    const next = new URLSearchParams();
    if (filters.q) next.set("q", filters.q);
    if (filters.type) next.set("type", filters.type);
    next.set("page", String(filters.page));
    return next;
  }, [filters.page, filters.q, filters.type]);

  useEffect(() => {
    setLoading(true);
    setError("");

    getColleges(params)
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err.message : "Unable to load colleges"))
      .finally(() => setLoading(false));
  }, [params]);

  return { data, loading, error };
}
