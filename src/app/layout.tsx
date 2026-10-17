import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { business } from "@/content/business";
import { media } from "@/content/media";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import StructuredData from "@/components/StructuredData";
import { EnquiryProvider } from "@/components/EnquiryContext";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: `${business.name} — Marble, Italian Marble, Granite, Kota Stone & Tiles`,
    template: `%s | ${business.name}`,
  },
  description: business.description,
  openGraph: {
    type: "website",
    siteName: business.name,
    title: `${business.name} — Built by Nature. Defined by Design.`,
    description: business.description,
    images: [{ url: media.blackRipple.src, alt: media.blackRipple.alt }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#1C1C1B",
  colorScheme: "light",
};

// Runs before paint: enables JS-only animation start states.
const bootScript = `document.documentElement.classList.add('js');`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <EnquiryProvider>
          <SmoothScroll />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </EnquiryProvider>
        <StructuredData />
      </body>
    </html>
  );
}
