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
import Messages from "@/lib/i18n/Messages";

// ✅ Yeh Next.js automatically <head> mein inject kar deta hai
export const metadata = getSEOMetadata("home");

export default function Home() {
  const jsonld = getJSONLD("home");

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


      <Messages ns={["home"]}>
      <HeroSlider />
      <WhoWeAreSection />
      <VideoHeroSection/>
      <UltraHighPerformanceSection />
      <WarningTape />
      <TrendingCategory />
      {/* Blogs are English-only on every country site */}
      <Messages ns={["home"]} locale="en">
        <Blogs />
      </Messages>
      <Testimonials />
      <PromoleculesSection/>
      </Messages>
    </>
  );
}