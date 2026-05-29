"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";

export function SearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <label className="relative block">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <Input className="pl-9" placeholder="Search by name, city, or state" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}
