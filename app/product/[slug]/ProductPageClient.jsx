"use client";

import { useState } from "react";
import ReviewModal from "./ReviewModal";
import CustomerReviews from "./CustomerReviews";
import ProductDetail from "./ProductDetail";
import FAQSection from "./FAQSection"; // 👈 Import FAQ component

export default function ProductPageClient({ product, moreProducts }) {
  const [openReview, setOpenReview] = useState(false);

  return (
    <div>
      <ProductDetail product={product} moreProducts={moreProducts} />

      {/* FAQ Section */}
      {product?.faqs?.length > 0 && (
        <FAQSection faqs={product.faqs} />
      )}

      <CustomerReviews
        reviews={product.reviews}
        openModal={() => setOpenReview(true)}
      />

      <ReviewModal
        open={openReview}
        closeModal={() => setOpenReview(false)}
      />
    </div>
  );
}