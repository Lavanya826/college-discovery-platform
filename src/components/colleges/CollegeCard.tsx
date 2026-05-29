"use client";

import Image from "next/image";
import Link from "next/link";
import { Bookmark, BookmarkCheck, MapPin } from "lucide-react";
import type { College } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function CollegeCard({ college, onToggleSaved }: { college: College; onToggleSaved?: (college: College) => void }) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="relative h-44 bg-slate-200">
        {college.imageUrl ? (
          <Image alt="" className="object-cover" fill sizes="(min-width: 1024px) 33vw, 100vw" src={college.imageUrl} />
        ) : null}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Badge>{college.type.toLowerCase()}</Badge>
            <h2 className="mt-3 text-lg font-bold text-ink">
              <Link className="hover:text-brand" href={`/colleges/${college.id}`}>
                {college.name}
              </Link>
            </h2>
          </div>
          {onToggleSaved ? (
            <Button aria-label="Toggle saved college" className="h-10 w-10 px-0" type="button" variant="ghost" onClick={() => onToggleSaved(college)}>
              {college.isSaved ? <BookmarkCheck className="h-5 w-5 text-brand" /> : <Bookmark className="h-5 w-5" />}
            </Button>
          ) : null}
        </div>
        <p className="mt-2 flex items-center gap-1 text-sm text-slate-600">
          <MapPin className="h-4 w-4" />
          {college.city}, {college.state}
        </p>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{college.description}</p>
        <dl className="mt-4 grid grid-cols-3 gap-3 text-sm">
          <div>
            <dt className="text-slate-500">Tuition</dt>
            <dd className="font-semibold text-ink">${college.tuition.toLocaleString()}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Accept</dt>
            <dd className="font-semibold text-ink">{Math.round(college.acceptanceRate * 100)}%</dd>
          </div>
          <div>
            <dt className="text-slate-500">Rank</dt>
            <dd className="font-semibold text-ink">{college.ranking ?? "N/A"}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
