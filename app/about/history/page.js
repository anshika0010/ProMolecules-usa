// app/about/history/page.js
import { getSEOMetadata, getJSONLD } from "@/lib/seo";
import HistoryClient from "./HistoryClient";
import Messages from "@/lib/i18n/Messages";

export const metadata = getSEOMetadata("history");

export default function HistoryPage() {
  const jsonld = getJSONLD("history");
  return (
    <Messages ns={["about", "home"]}>
      <HistoryClient jsonld={jsonld} />
    </Messages>
  );
}