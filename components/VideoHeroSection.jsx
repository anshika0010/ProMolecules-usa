"use client";
import { useT } from "@/lib/i18n/client";

export default function VideoHeroSection() {
  const t = useT("home");
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        h-[40dvh]
        sm:h-[600px]
        sm:px-6
        lg:h-[800px]
        lg:px-8
        xl:h-[1000px]
        min-h-[300px]
      "
    >
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/video.mp4" type="video/mp4" />
        {t.video_hero_alt}
      </video>

      {/* Optional Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />
    </section>
  );
}