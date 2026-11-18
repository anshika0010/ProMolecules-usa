import BlogServer from "./BlogServer";
import { getSEOMetadata, getJSONLD } from "@/lib/seo";
import Messages from "@/lib/i18n/Messages";
export const metadata = getSEOMetadata("blog");
export default function BlogPage() {
     const jsonld = getJSONLD("blog");
    
  return <>
  
     {jsonld && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonld }}
        />
      )}
  <Messages ns={["blog"]} locale="en"><BlogServer /></Messages> </>;
}