import React from "react";

/**
 * Renders `text`, wrapping every phrase listed in `phrases` with `className`.
 * Lets translated strings keep their red highlights without HTML in the JSON.
 */
export default function Highlight({ text = "", phrases = [], className = "text-red-600" }) {
  const list = phrases.filter(Boolean);
  if (!list.length) return text;
  const escaped = list.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "g"));
  return parts.map((part, i) =>
    list.includes(part) ? (
      <span key={i} className={className}>
        {part}
      </span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}
