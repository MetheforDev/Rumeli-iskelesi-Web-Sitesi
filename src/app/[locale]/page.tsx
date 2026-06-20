import { setRequestLocale } from "next-intl/server";
import { AnnouncementBar } from "@/components/ui/announcement-bar";
import { StickyActions } from "@/components/ui/sticky-actions";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { InfoBar } from "@/components/sections/info-bar";
import { Featured } from "@/components/sections/featured";
import { Menu } from "@/components/sections/menu";
import { Reviews } from "@/components/sections/reviews";
import { Gallery } from "@/components/sections/gallery";
import { Footer } from "@/components/sections/footer";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ScrollProgress />
      <AnnouncementBar />
      <Navbar />
      {/* pb-20 = mobile sticky bar için alan */}
      <main className="pb-20 md:pb-0">
        <Hero />
        <InfoBar />
        <Featured />
        <Menu />
        <Reviews />
        <Gallery />
        <Footer />
      </main>
      <StickyActions />
    </>
  );
}
