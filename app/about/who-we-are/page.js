// app/about/page.js
import HeroSection from "@/components/about/HeroSection";
import MoreInformationSection from "@/components/about/MoreInformationSection";
import PerformanceShowcase from "@/components/about/PerformanceShowcase";
import { getSEOMetadata, getJSONLD } from "@/lib/seo";
import Messages from "@/lib/i18n/Messages";

export const metadata = getSEOMetadata("whoWeAre");

export default function Page() {
  const jsonld = getJSONLD("whoWeAre");

  return (
    <>
      {jsonld && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonld }}
        />
      )}
      <Messages ns={["about"]}>
        <HeroSection />
        <PerformanceShowcase />
        <MoreInformationSection />
      </Messages>
    </>
  );
}