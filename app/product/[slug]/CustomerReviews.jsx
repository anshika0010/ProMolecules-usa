"use client";

import { useState } from "react";
import { Star, ChevronRight } from "lucide-react";

export default function CustomerReviews({ reviews = [] }) {
  const [visibleCount, setVisibleCount] = useState(5);

  const reviewsWithRatings = reviews.map((review) => ({
    ...review,
    rating: Math.random() < 0.5 ? 4 : 5,
  }));

  const totalReviews = reviewsWithRatings.length;

  const averageRating =
    totalReviews > 0
      ? reviewsWithRatings.reduce(
          (total, review) => total + review.rating,
          0
        ) / totalReviews
      : 0;

  const ratingBars = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviewsWithRatings.filter(
      (review) => review.rating === rating
    ).length;

    return {
      label: `${rating} STAR${rating > 1 ? "S" : ""}`,
      value: count,
      percent: totalReviews > 0 ? (count / totalReviews) * 100 : 0,
    };
  });

  const renderStars = (rating, size = 20) => (
    <div className="flex items-center gap-1 text-red-600">
      {[1, 2, 3, 4, 5].map((star) => {
        const fillPercent = Math.min(
          100,
          Math.max(0, (rating - star + 1) * 100)
        );

        return (
          <span
            key={star}
            className="relative inline-block shrink-0"
            style={{ width: size, height: size }}
          >
            <Star
              size={size}
              className="absolute inset-0 text-gray-600"
              fill="currentColor"
            />

            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillPercent}%` }}
            >
              <Star
                size={size}
                className="text-red-600"
                fill="currentColor"
              />
            </span>
          </span>
        );
      })}
    </div>
  );

  const handleLoadMore = () => {
    setVisibleCount(totalReviews);
  };

  if (totalReviews === 0) {
    return (
      <p className="text-white p-10">
        No reviews found for this product.
      </p>
    );
  }

  return (
    <section className="bg-black text-white py-16 px-3 lg:px-2 max-w-7xl mx-auto">
      <h2 className="text-red-600 text-4xl md:text-6xl font-extrabold creepster-regular tracking-wide mb-10">
        CUSTOMER REVIEWS
      </h2>

      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-4 mb-1">
            <span className="text-5xl font-bold">
              {averageRating.toFixed(1)}
            </span>

            {renderStars(averageRating)}

            <span className="text-gray-400 uppercase text-sm">
              Based on {totalReviews}{" "}
              {totalReviews === 1 ? "Review" : "Reviews"}
            </span>
          </div>

          <p className="text-gray-500 text-sm mb-8">
            Average customer rating
          </p>
        </div>

        <div className="space-y-4">
          {ratingBars.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-4"
            >
              <span className="w-20 text-sm text-gray-300">
                {item.label}
              </span>

              <div className="flex-1 bg-gray-700 h-3 rounded overflow-hidden">
                <div
                  className="bg-red-600 h-3 rounded transition-all duration-300"
                  style={{ width: `${item.percent}%` }}
                />
              </div>

              <span className="text-sm text-gray-400 w-6 text-right">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 border-t border-gray-800">
        {reviewsWithRatings.slice(0, visibleCount).map((review, index) => (
          <div
            key={review._id || review.id || index}
            className="py-3 border-b border-gray-800"
          >
            <p className="font-bold">{review.name}</p>

            <p className="text-gray-400 text-sm mb-1">
              {review.date}
            </p>

            {renderStars(review.rating, 16)}

            <p className="font-bold mb-1 text-gray-200">
              {review.country}
            </p>

            <p className="text-gray-400 text-sm max-w-4xl leading-relaxed">
              {review.des}
            </p>
          </div>
        ))}
      </div>

      {visibleCount < totalReviews && (
        <div className="flex justify-center mt-12">
          <button
            type="button"
            onClick={handleLoadMore}
            className="flex items-center cursor-pointer gap-3 bg-transparent border-2 border-red-600 hover:bg-red-600 text-white font-bold px-7 py-2 rounded-full transition-all duration-300 text-sm tracking-widest group"
          >
            <span>VIEW MORE...</span>

            <div className="bg-red-600 group-hover:bg-white p-1 rounded-full transition-colors">
              <ChevronRight
                size={18}
                className="text-white group-hover:text-red-600"
              />
            </div>
          </button>
        </div>
      )}
    </section>
  );
}