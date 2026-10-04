import { ExternalLink, ShieldCheck } from "lucide-react";
import { Container, PageHero } from "@/components/common";
import { DirectoryList } from "@/components/DirectoryList";
import { byGroup } from "@/data/listings";
import { MEDICAL_SPECIALTIES } from "@/data/categories";

const GENERAL = ["Clinic", "General Clinic", "Medical clinic", "Medical Center"];
const SPEC = {
  "General Physician": (l) => l.category === "doctors" && GENERAL.includes(l.sub),
  Dentist: (l) => l.sub === "Dentist",
  "Skin Specialist": (l) => l.sub === "Skin Specialist",
  Homeopathic: (l) => l.sub === "Homeopathic",
  Veterinary: (l) => l.sub === "Veterinary",
  Ultrasound: (l) => l.sub === "Ultrasound",
  Laboratory: (l) => l.sub === "Laboratory",
  "Blood Bank": (l) => l.sub === "Blood Bank",
  Pharmacy: (l) => l.category === "pharmacies",
};
const hospitals = (l) => l.sub === "Hospital";

export default function Doctors() {
  const items = [...byGroup("doctors"), ...byGroup("pharmacies")];
  const chips = [
    { name: "Hospitals", match: hospitals },
    ...MEDICAL_SPECIALTIES.map((n) => ({ name: n, match: SPEC[n] || (() => false) })),
  ].map((c) => ({ ...c, count: items.filter(c.match).length }));

  return (
    <>
      <PageHero eyebrow="Medical Directory" icon="Stethoscope" title="Doctors, Hospitals &" accent="Clinics" urdu="ڈاکٹرز اور ہسپتال" text="Hospitals, clinics, dental, skin, homeopathic, veterinary, ultrasound, laboratories, blood bank and pharmacies in Mehrabpur." image="/images/mhr_station_sign.jpg">
        <a href="https://www.pmdc.pk/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-accent/40 bg-card px-4 py-2.5 text-sm font-bold text-accent hover:bg-accent hover:text-white"><ShieldCheck size={16} /> Verify a doctor on PMDC <ExternalLink size={13} /></a>
      </PageHero>
      <Container className="py-8">
        <p className="mb-5 rounded-2xl bg-accent-soft p-4 text-sm text-muted">Doctor names should be verified against the PMDC practitioner register. Specialties with <b>0</b> listings (Gynecologist, Pediatrician, ENT, Orthopedic) have no public record in the dataset yet — they are kept as categories for future additions.</p>
        <DirectoryList items={items} chips={chips} title="medical listings" />
      </Container>
    </>
  );
}
