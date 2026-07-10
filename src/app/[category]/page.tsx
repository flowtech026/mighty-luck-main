import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import GameGrid from "@/components/sections/GameGrid";
import TabHeader from "@/components/sections/TabHeader";
import CollectionSection from "@/components/sections/CollectionSection";
import ProviderSection from "@/components/sections/ProviderSection";
import bonusBuysData from "@/data/bonusBuysData.json";
import crashGamesData from "@/data/crashGamesData.json";
import originalsData from "@/data/originalsData.json";
import slotsData from "@/data/slotsData.json";
import tableGamesData from "@/data/tableGamesData.json";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import AboutSection from "@/components/sections/AboutSection";

const categoryConfig: Record<
  string,
  { title: string; count: string; games: { id: number | string; title: string; image: string }[] } | { title: string; special: string }
> = {
  slots: { title: "Slots", count: "1,487", games: slotsData },
  originals: { title: "Originals", count: "14", games: originalsData },
  "crash-games": { title: "Crash Games", count: "723", games: crashGamesData },
  "table-games": { title: "Table Games", count: "51", games: tableGamesData },
  "bonus-buys": { title: "Bonus Buys", count: "145", games: bonusBuysData },
  providers: { title: "Providers", special: "providers" },
  collection: { title: "Collection", special: "collection" },
};

export async function generateStaticParams() {
  return Object.keys(categoryConfig).map((category) => ({ category }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  await getServerSession(authOptions);
  const { category } = await params;

  const config = categoryConfig[category];
  if (!config) notFound();

  return (
    <Container>
      <div className="flex gap-4 lg:gap-6 w-full">
        <Sidebar />
        <main className="flex-1 min-w-0 flex flex-col gap-6 md:gap-8 lg:gap-10 pb-[90px] lg:pb-0 overflow-hidden">
          {"special" in config ? (
            <div className="flex flex-col gap-6 w-full">
              <TabHeader title={config.title} />
              {config.special === "providers" && <ProviderSection hideHeader />}
              {config.special === "collection" && <CollectionSection hideHeader />}
            </div>
          ) : (
            <GameGrid
              title={config.title}
              count={config.count}
              games={config.games}
              hideFooter
            />
          )}
          <AboutSection />
          <Footer />
        </main>
      </div>
    </Container>
  );
}
