// app/about/faq/page.js  ← yeh file replace karo
import { getSEOMetadata, getJSONLD } from "@/lib/seo";
import FAQClient from "./FAQClient";
import Messages from "@/lib/i18n/Messages";

export const metadata = getSEOMetadata("faq");

export default function Page() {
  const jsonld = getJSONLD("faq");
  return (
    <Messages ns={["about"]}>
      <FAQClient jsonld={jsonld} />
    </Messages>
  );
}