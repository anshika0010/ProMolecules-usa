// app/shop/page.js
import { Suspense } from "react";
import ProductListClient from "./ProductListClient";
import Preloader from "@/components/Preloader";
import { getSEOMetadata, getJSONLD } from "@/lib/seo";
import Messages from "@/lib/i18n/Messages";
import { getProductSummaries } from "@/lib/i18n/server";

export const metadata = getSEOMetadata("product");

export default async function Page() {
  const jsonld = getJSONLD("product");
  const products = await getProductSummaries();

  return (
    <>
      {jsonld && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonld }}
        />
      )}
      <Suspense fallback={<div className="text-white p-10"><Preloader /></div>}>
        <Messages ns={["product"]}>
          <ProductListClient products={products} />
        </Messages>
      </Suspense>
    </>
  );
}