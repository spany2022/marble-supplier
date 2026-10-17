import { Compass, Gem, Layers, MessagesSquare } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import SplitHeading from "@/components/ui/SplitHeading";

/**
 * Section 8 — why choose us.
 * Add delivery, installation, bulk-order, warranty or years-of-experience claims
 * here ONLY once the business has confirmed them.
 */
const features = [
  {
    icon: Gem,
    title: "Carefully Selected Materials",
    text: "Each material is chosen for its colour, pattern, finish and suitability — and you can see it in person before you commit.",
  },
  {
    icon: Layers,
    title: "A Wide Range of Options",
    text: "Marble, Italian marble, granite, Kota stone and designer tiles in one place, so you can compare stones, colours, patterns and finishes side by side.",
  },
  {
    icon: Compass,
    title: "Guidance for Your Project",
    text: "Tell us where the material is going and we'll help you narrow the choice to options that suit the space, the traffic and the upkeep you want.",
  },
  {
    icon: MessagesSquare,
    title: "A Customer-Focused Experience",
    text: "A clear path from browsing to enquiry to showroom visit — with quotations tailored to your quantities and requirements.",
  },
];

export default function WhyUs() {
  return (
    <section aria-labelledby="why-title" className="bg-ivory">
      <div className="site-x section-pad mx-auto max-w-site">
        <Eyebrow>Why Choose Our Collections</Eyebrow>
        <SplitHeading
          id="why-title"
          className="display-lg mt-6 max-w-6xl"
          lines={[
            "Quality in every detail.",
            <>
              Confidence in every <span className="serif-accent text-brass-deep">choice.</span>
            </>,
          ]}
        />

        <ul className="mt-16 grid border-l border-t border-line sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {features.map((f, i) => (
            <li key={f.title} data-reveal className="draw-border group border-b border-r border-line bg-ivory p-7 transition-colors duration-500 hover:bg-marble md:p-9">
              <div className="flex items-start justify-between">
                <span className="grid size-14 place-items-center border-2 border-charcoal transition-colors duration-500 group-hover:border-brass-deep group-hover:bg-brass-deep group-hover:text-ivory">
                  <f.icon aria-hidden className="size-6" strokeWidth={1.75} />
                </span>
                <span className="font-display text-sm font-extrabold text-slate-ink">0{i + 1}</span>
              </div>
              <h3 className="mt-10 font-display text-[1.45rem] font-extrabold uppercase leading-[1.02] tracking-[-0.02em] lg:min-h-[3em]">{f.title}</h3>
              <p className="mt-4 text-[0.98rem] leading-relaxed text-slate-ink">{f.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
