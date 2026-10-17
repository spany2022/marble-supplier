import { Suspense } from "react";
import Link from "next/link";
import { Info } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import SplitHeading from "@/components/ui/SplitHeading";
import ProductBrowser, { ProductBrowserFallback } from "@/components/ProductBrowser";
import { CATALOGUE_IS_SAMPLE } from "@/content/catalogue";

/** Section 5 — product discovery and collection grid. */
export default function Discover() {
  return (
    <section id="discover" aria-labelledby="discover-title" className="bg-ivory">
      <div className="site-x section-pad mx-auto max-w-site">
        <div className="mb-12 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow>Product Discovery</Eyebrow>
            <SplitHeading
              id="discover-title"
              className="display-lg mt-6"
              lines={[
                "Find the perfect",
                <>
                  <span className="serif-accent text-brass-deep">material.</span>
                </>,
              ]}
            />
          </div>
          <div className="lg:col-span-4 lg:pb-3">
            <p data-reveal className="text-[1.05rem] leading-relaxed text-slate-ink">
              Filter by material, colour, finish and application. Every price is quoted to your project — select{" "}
              <strong className="font-extrabold text-charcoal">Request Price</strong> on any material.
            </p>
            {CATALOGUE_IS_SAMPLE && (
              <p className="mt-4 flex gap-2 text-[0.8rem] font-semibold text-slate-ink">
                <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-brass-deep" />
                <span>
                  Sample listings shown for demonstration. Sizes, thicknesses and availability are confirmed on enquiry.{" "}
                  <Link href="/collections" className="font-bold text-charcoal underline underline-offset-4 hover:text-brass-deep">
                    Open full catalogue
                  </Link>
                </span>
              </p>
            )}
          </div>
        </div>

        <Suspense fallback={<ProductBrowserFallback />}>
          <ProductBrowser pageSize={8} />
        </Suspense>
      </div>
    </section>
  );
}
