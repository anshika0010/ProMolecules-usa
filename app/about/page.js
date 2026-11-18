import AboutPage from "@/components/AboutPage";
import { getSEOMetadata, getJSONLD } from "@/lib/seo";
import Messages from "@/lib/i18n/Messages";
export const metadata = getSEOMetadata("about");


export default function Page() {
   const jsonld = getJSONLD("about");
  return (
    <>


    {jsonld && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonld }}
        />
      )}
      
        <Messages ns={["about"]}><AboutPage/></Messages>
    </>
  );
}