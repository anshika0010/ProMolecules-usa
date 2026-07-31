import Blogs from "@/components/Blogs";
import HeroSlider from "@/components/HeroSlider";
import PromoleculesSection from "@/components/PromoleculesSection";
import Testimonials from "@/components/TestimonialsSection";
import TrendingCategory from "@/components/TrendingCategory";
import UltraHighPerformanceSection from "@/components/UltraHighPerformanceSection";
import VideoHeroSection from "@/components/VideoHeroSection";
import WarningTape from "@/components/WarningTape";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import { getSEOMetadata, getJSONLD } from "@/lib/seo";

// ✅ Yeh Next.js automatically <head> mein inject kar deta hai
export const metadata = getSEOMetadata("home");

export default function Home() {
  const jsonld = getJSONLD("home");
  console.log(getJSONLD("home"));

  return (
    <>
      {/* ✅ JSON-LD Structured Data (Google ke liye) */}
     
           {jsonld && (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonld),
        }}
      />
    )}


      <HeroSlider />
      <WhoWeAreSection />
      <VideoHeroSection/>
      <UltraHighPerformanceSection />
      <WarningTape />
      <TrendingCategory />
      <Blogs/>
      <Testimonials />
      <PromoleculesSection/>
    </>
  );
}