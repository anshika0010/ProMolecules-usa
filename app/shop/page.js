// app/product/page.js
import { getSEOMetadata, getJSONLD } from "@/lib/seo";
import ProductClient from "./ProductClient";
import Messages from "@/lib/i18n/Messages";

export const metadata = getSEOMetadata("shop");

export default function ProductPage() {
  const jsonld = getJSONLD("shop");
  return (
    <Messages ns={["shop", "home"]}>
      <ProductClient jsonld={jsonld} />
    </Messages>
  );
}