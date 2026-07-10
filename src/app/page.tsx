import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import AboutSection from "@/components/sections/AboutSection";
import CollectionSection from "@/components/sections/CollectionSection";
import CryptoIconSection from "@/components/sections/CryptoIconSection";
import GameOpen from "@/components/sections/GameOpen";
import GameSlider from "@/components/sections/GameSlider";
import HeroBanner from "@/components/sections/HeroBanner";
import HeroSection1 from "@/components/sections/HeroSection1";
import PromotionSection from "@/components/sections/PromotionSection";
import ProviderSection from "@/components/sections/ProviderSection";
import RecentWinnerSection from "@/components/sections/RecentWinnerSection";
import ReferFriend from "@/components/sections/ReferFriend";
import TabSection from "@/components/sections/TabSection";
import TabHeader from "@/components/sections/TabHeader";
import GameGrid from "@/components/sections/GameGrid";
import Why from "@/components/sections/Why";
import bonusBuysData from "@/data/bonusBuysData.json";
import crashGamesData from "@/data/crashGamesData.json";
import originalsData from "@/data/originalsData.json";
import slotsData from "@/data/slotsData.json";
import tableGamesData from "@/data/tableGamesData.json";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const session = await getServerSession(authOptions);
  
  // Await the searchParams Promise in Next.js 15
  const resolvedParams = await searchParams;
  const gameId = resolvedParams?.game as string | undefined;
  const view = resolvedParams?.view as string | undefined;
  const activeTab = (resolvedParams?.tab as string | undefined) || 'lobby';

  return (
    <Container>
      <div className="flex gap-4 lg:gap-6 w-full">
        <Sidebar />
        <main className="flex-1 min-w-0 flex flex-col gap-6 md:gap-8 lg:gap-10 pb-[90px] lg:pb-0 overflow-hidden">
          {view === 'refer' ? (
            <ReferFriend />
          ) : (gameId && session) ? (
            <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
              <GameOpen gameId={gameId} />
              
              <div id="other-games">
                <GameSlider
                  title="OTHER GAMES YOU MIGHT LIKE"
                  icon={<img src="/other.svg" alt="Other" className="w-[30px] h-[30px] shrink-0" />}
                  games={slotsData.slice(0, 10)}
                />
              </div>
            </div>
          ) : (
            <>
              <HeroBanner />
              {session ? <TabSection /> : <HeroSection1 />}

              <div id="tab-content-container" className="flex flex-col gap-6 md:gap-8 lg:gap-10">
                {activeTab === 'lobby' ? (
                  <>
                    <div id="slots" className="tab-content">
                      <GameSlider
                        title="SLOTS (1,487)"
                        icon={<Image src="/slots.svg" alt="Slots" width={30} height={30} className="w-[30px] h-[30px] shrink-0 object-contain" />}
                        games={slotsData}
                        viewAllTab="slots"
                      />
                    </div>

                    <div id="originals" className="tab-content">
                      <GameSlider
                        title="ORIGINALS (14)"
                        icon={<Image src="/orignals.svg" alt="Originals" width={30} height={30} className="w-[30px] h-[30px] shrink-0 object-contain" />}
                        games={originalsData}
                        viewAllTab="originals"
                      />
                    </div>

                    {session ? <PromotionSection /> : <Why />}

                    <div id="crash-games" className="tab-content">
                      <GameSlider
                        title="CRASH GAMES (723)"
                        icon={<Image src="/crashgame.svg" alt="Crash Games" width={30} height={30} className="w-[30px] h-[30px] shrink-0 object-contain" />}
                        games={crashGamesData}
                        viewAllTab="crash-games"
                      />
                    </div>

                    <div id="providers" className="tab-content">
                      <ProviderSection />
                    </div>

                    <div id="table-games" className="tab-content">
                      <GameSlider
                        title="TABLE GAMES (51)"
                        icon={<Image src="/tg.svg" alt="Table Games" width={30} height={30} className="w-[30px] h-[30px] shrink-0 object-contain" />}
                        games={tableGamesData}
                        viewAllTab="table-games"
                      />
                    </div>

                    <div id="bonus-buys" className="tab-content">
                      <GameSlider
                        title="BONUS BUYS (145)"
                        icon={<Image src="/bb.svg" alt="Bonus Buys" width={30} height={30} className="w-[30px] h-[30px] shrink-0 object-contain" />}
                        games={bonusBuysData}
                        viewAllTab="bonus-buys"
                      />
                    </div>

                    <div id="collection" className="tab-content">
                      <CollectionSection />
                    </div>
                  </>
                ) : activeTab === 'slots' ? (
                  <GameGrid title="Slots" count="1,487" games={slotsData} />
                ) : activeTab === 'originals' ? (
                  <GameGrid title="Originals" count="14" games={originalsData} />
                ) : activeTab === 'crash-games' ? (
                  <GameGrid title="Crash Games" count="723" games={crashGamesData} />
                ) : activeTab === 'providers' ? (
                  <div className="flex flex-col gap-6 w-full">
                    <TabHeader title="Providers" />
                    <ProviderSection hideHeader />
                  </div>
                ) : activeTab === 'table-games' ? (
                  <GameGrid title="Table Games" count="51" games={tableGamesData} />
                ) : activeTab === 'bonus-buys' ? (
                  <GameGrid title="Bonus Buys" count="145" games={bonusBuysData} />
                ) : activeTab === 'collection' ? (
                  <div className="flex flex-col gap-6 w-full">
                    <TabHeader title="Collection" />
                    <CollectionSection hideHeader />
                  </div>
                ) : null}

                <div id="recent-winners" className="tab-content">
                  <RecentWinnerSection />
                </div>
              </div>
            </>
          )}
          <AboutSection />
          <CryptoIconSection />
          <Footer />
        </main>
      </div>
    </Container>
  );
}
