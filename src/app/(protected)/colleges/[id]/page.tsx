import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, MapPin } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { prisma } from "@/lib/prisma";

export default async function CollegeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const college = await prisma.college.findUnique({
    where: { id },
    include: { programs: true }
  });

  if (!college) {
    notFound();
  }

  return (
    <PageWrapper>
      <Button asChild variant="ghost" className="mb-5">
        <Link href="/colleges">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </Button>
      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="relative h-72 bg-slate-200">
          {college.imageUrl ? <Image alt="" className="object-cover" fill priority sizes="100vw" src={college.imageUrl} /> : null}
        </div>
        <div className="p-6">
          <Badge>{college.type.toLowerCase()}</Badge>
          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-ink">{college.name}</h1>
              <p className="mt-2 flex items-center gap-1 text-slate-600">
                <MapPin className="h-4 w-4" />
                {college.city}, {college.state}
              </p>
            </div>
            {college.website ? (
              <Button asChild variant="secondary">
                <a href={college.website} rel="noreferrer" target="_blank">
                  Website
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            ) : null}
          </div>
          <p className="mt-6 max-w-3xl leading-7 text-slate-700">{college.description}</p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-md bg-mist p-4">
              <dt className="text-sm text-slate-500">Tuition</dt>
              <dd className="mt-1 text-xl font-bold text-ink">${college.tuition.toLocaleString()}</dd>
            </div>
            <div className="rounded-md bg-mist p-4">
              <dt className="text-sm text-slate-500">Acceptance rate</dt>
              <dd className="mt-1 text-xl font-bold text-ink">{Math.round(college.acceptanceRate * 100)}%</dd>
            </div>
            <div className="rounded-md bg-mist p-4">
              <dt className="text-sm text-slate-500">Ranking</dt>
              <dd className="mt-1 text-xl font-bold text-ink">{college.ranking ?? "N/A"}</dd>
            </div>
          </dl>
          <section className="mt-8">
            <h2 className="text-xl font-bold text-ink">Programs</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {college.programs.map((program) => (
                <Badge className="bg-coral/10 text-coral" key={program.id}>
                  {program.degree} {program.name}
                </Badge>
              ))}
            </div>
          </section>
        </div>
      </section>
    </PageWrapper>
  );
}
