"use client";

export function Filters({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <select
      className="h-11 rounded-md border border-slate-300 bg-white px-3 text-sm font-medium text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="">All types</option>
      <option value="PUBLIC">Public</option>
      <option value="PRIVATE">Private</option>
      <option value="COMMUNITY">Community</option>
    </select>
  );
}
