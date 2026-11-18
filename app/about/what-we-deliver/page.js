// app/about/what-we-deliver/page.js
import { getSEOMetadata, getJSONLD } from "@/lib/seo";
import WhatWeDeliverClient from "./WhatWeDeliverClient";
import Messages from "@/lib/i18n/Messages";

export const metadata = getSEOMetadata("whatWeDeliver");

export default function WhatWeDeliverPage() {
  const jsonld = getJSONLD("whatWeDeliver");
  return (
    <Messages ns={["about"]}>
      <WhatWeDeliverClient jsonld={jsonld} />
    </Messages>
  );
}