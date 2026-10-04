import { Phone } from "lucide-react";
import { SourceLink, Photo } from "@/components/Ui";
import CategoryPage from "./CategoryPage";
import { EMERGENCY, SRC } from "@/data/city";
import { telHref } from "@/lib/maps";

const Note = ({ children }) => <p className="mb-4 rounded-lg border border-line bg-soft p-3.5 text-[13px] leading-relaxed text-muted">{children}</p>;

export function Doctors() {
  return (
    <CategoryPage
      groupId="doctors"
      title="Doctors, hospitals and labs"
      sub="Hospitals, clinics, dentists, laboratories, ultrasound, blood bank and veterinary clinics."
      before={<Note>Doctor names are not verified against registration. You can check a practitioner at the <a className="text-accent hover:underline" href="https://www.pmdc.pk/" target="_blank" rel="noreferrer noopener">Pakistan Medical and Dental Council</a> register. In an emergency call a hospital directly; opening hours are only shown where a source listed them.</Note>}
    />
  );
}

export function Schools() {
  const figs = [["40+", "educational centres in the tehsil"], ["18+", "government institutions"], ["22+", "private institutions"], ["5+", "degree colleges"]];
  return (
    <CategoryPage
      groupId="schools"
      title="Schools and colleges"
      sub="Government and private schools, degree colleges, a law college and computer institutes."
      before={
        <section className="panel mb-5 overflow-hidden" aria-label="School figures">
          <div className="grid grid-cols-2 divide-x divide-y divide-line md:grid-cols-4 md:divide-y-0">
            {figs.map(([n, t]) => (<div key={t} className="p-4"><p className="text-[24px] font-extrabold leading-none">{n}</p><p className="mt-1 text-[12.5px] text-muted">{t}</p></div>))}
          </div>
          <p className="border-t border-line px-4 py-2 text-[11.5px] text-muted">Tehsil totals from <SourceLink s={SRC.portalSchools} />. This directory lists the schools found by name so far; it is not the full register. SEMIS codes are shown only where a source gave them.</p>
        </section>
      }
    />
  );
}

export function Agriculture() {
  return (
    <CategoryPage
      groupId="agri"
      title="Agriculture and Ghalla Mandi"
      sub="Mehrabpur's grain market (Ghalla Mandi) on Station Road, fertilizer and seed dealers, traders, cotton factories and the vegetable market."
      before={
        <section className="panel mb-5 grid overflow-hidden md:grid-cols-[1fr_260px]" aria-label="About the grain market">
          <div className="p-4 text-[13.5px] leading-relaxed">
            <h2 className="h-title mb-1.5">Ghalla Mandi</h2>
            <p className="text-muted">Public directories describe the Ghalla Mandi as a grain and jaggery (gur) trading hub with references to wheat, barley, rice and jaggery, and to dealers in seed, pesticide, fertilizer and farm machinery. Prices and daily rates are not listed here because no reliable public source was found.</p>
            <p className="mt-2 text-[12px] text-muted">Source: <SourceLink s={{ label: "WorldOrgs - Grain Market, Mehrabpur", url: "https://pk.worldorgs.com/catalog/mehrabpur/software-company/grain-market" }} /></p>
          </div>
          <Photo id="grain" caption className="border-t border-line md:border-l md:border-t-0 [&>img]:h-44 [&_figcaption]:px-3 [&_figcaption]:py-2" />
        </section>
      }
    />
  );
}

export function Government() {
  return (
    <CategoryPage
      groupId="govt"
      title="Government and emergency"
      sub="Police, NADRA, post office, SEPCO, SSGC and other public offices."
      before={
        <section className="panel mb-5 overflow-hidden" aria-labelledby="em">
          <div className="panel-head"><h2 id="em" className="h-title">Public service and emergency numbers</h2></div>
          <div className="table-wrap">
            <table className="tbl">
              <thead><tr><th>Service</th><th>Number</th><th>Notes</th></tr></thead>
              <tbody>
                {EMERGENCY.map((e) => (
                  <tr key={e.name}><td className="font-semibold">{e.name}</td><td className="num"><a className="inline-flex items-center gap-1.5 text-accent hover:underline" href={telHref(e.phone)}><Phone size={13} />{e.phone}</a></td><td className="min-w-[220px] text-muted">{e.note}. <SourceLink s={SRC[e.source]} /></td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="border-t border-line px-4 py-2 text-[11.5px] text-muted">The local portal also shows placeholder numbers such as “0244-XXXXXX”; those are not used here.</p>
        </section>
      }
    />
  );
}
