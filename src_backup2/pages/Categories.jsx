import { Link } from "react-router-dom";
import { Container, PageHero, SectionTitle, CategoryCard } from "@/components/common";
import { CATEGORY_GROUPS, MASTER_CATEGORY_LIST } from "@/data/categories";
import { countByGroup } from "@/data/listings";

export default function Categories() {
  return (
    <>
      <PageHero eyebrow="Categories" icon="LayoutGrid" title="All" accent="Categories" text="Every category in the Mehrabpur master dataset. Tap a card to open the filtered directory." image="/images/mhr_station_platform.jpg" />
      <Container className="py-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {CATEGORY_GROUPS.map((g, i) => <CategoryCard key={g.id} group={g} count={countByGroup(g.id)} to={g.route} i={i} />)}
        </div>
        <SectionTitle className="mt-14" title="Recommended database" accent="categories" sub="The full category list planned for the production database (Businesses, Doctors, Banks, Canals, Bridges, Jobs, Emergency Contacts …)." />
        <div className="flex flex-wrap gap-2">
          {MASTER_CATEGORY_LIST.map((c) => (
            <Link key={c} to={`/businesses?q=${encodeURIComponent(c)}`} className="rounded-full border border-line bg-card px-3 py-1.5 text-xs font-semibold transition hover:border-accent hover:text-accent">{c}</Link>
          ))}
        </div>
      </Container>
    </>
  );
}
