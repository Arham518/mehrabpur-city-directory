import { GraduationCap, Building, Building2 } from "lucide-react";
import { Container, PageHero } from "@/components/common";
import { DirectoryList } from "@/components/DirectoryList";
import { byGroup } from "@/data/listings";
import { EDUCATION_STATS } from "@/data/places";

export default function Schools() {
  return (
    <>
      <PageHero eyebrow="Education" icon="GraduationCap" title="Schools &" accent="Colleges" urdu="اسکول اور کالجز" text="Government and private schools, degree colleges, a monotechnic institute and computer institutes across Mehrabpur." image="/images/mhr_wall.jpg">
        <div className="flex flex-wrap gap-3">
          {[[GraduationCap, EDUCATION_STATS.centers, "educational centers"], [Building, EDUCATION_STATS.government, "government institutions"], [Building2, EDUCATION_STATS.private, "private institutions"]].map(([I, n, t]) => (
            <div key={t} className="flex items-center gap-3 rounded-2xl card-surface px-4 py-3"><I size={20} className="text-accent" /><div><div className="text-lg font-extrabold leading-none">{n}</div><div className="text-[11px] text-muted">{t}</div></div></div>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-muted">Tehsil totals per the <a className="underline" href={EDUCATION_STATS.source} target="_blank" rel="noreferrer">Mehrabpur Sindh portal</a>; this page lists the {byGroup("schools").length} institutions identified by name.</p>
      </PageHero>
      <Container className="py-8"><DirectoryList items={byGroup("schools")} title="schools & colleges" /></Container>
    </>
  );
}
