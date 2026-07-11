import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Script from "next/script";
import PreloaderWrapper from "@/components/PreloaderWrapper";
import localFont from "next/font/local";
import CountryPopup from "@/components/CountryPopup";
import SupportChatBot from "@/components/SupportChatBot";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const gloomyFont = localFont({
  src: "./fonts/GloomyThings.otf",
  variable: "--font-gloomy",
  display: "swap",
});
// ── Verification meta tags go here, NOT in <head> ────────────────
export const metadata = {
  verification: {
    google: "-Nzqg4zKaGYSw33Qtk0AMnjC5G9iAjXDRxC1n_qQOC8",
    other: {
      "msvalidate.01": "3D8DB2D729E6AD52E55F3CC39AC38797",
      "yandex-verification": "de6e1736200df180",
      "p:domain_verify": "1e55fe6d40f8636b71b612318fdcb624",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* ❌ No manual <head> tag here */}
      <body   suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${gloomyFont.variable} antialiased`}>

        {/* ── Google Tag Manager Script ── */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5LJDV8SJ');`,
          }}
        />

        {/* ── Google Tag Manager (noscript fallback) ── */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5LJDV8SJ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
<CountryPopup/>
        <PreloaderWrapper>
          <div className="pt-[50px] bg-black">
            <Navbar />
            <main id="main-content">{children}</main>
            <SupportChatBot/>
            {/* <WhatsAppButton /> */}
            <Footer />
          </div>
        </PreloaderWrapper>

      </body>
    </html>
  );
}