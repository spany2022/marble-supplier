import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import credits from "@/content/image-credits.json";
import { media } from "@/content/media";

export const metadata: Metadata = {
  title: "Image Credits",
  description: "Licences and attribution for the photography used on this website.",
  alternates: { canonical: "/credits" },
  robots: { index: false },
};

const unsplash = Object.values(media).filter((m) => m.src.startsWith("https://images.unsplash.com/"));

export default function CreditsPage() {
  return (
    <>
      <PageHero
        eyebrow="Attribution"
        crumbs={[{ href: "/credits", label: "Image credits" }]}
        lines={["Image", "credits."]}
        intro="Photography on this site is illustrative reference imagery. It does not show this business's stock or completed projects."
      />
      <section className="bg-ivory">
        <div className="site-x mx-auto max-w-site py-16 md:py-24">
          <h2 className="display-sm">Wikimedia Commons</h2>
          <p className="mt-3 max-w-2xl text-slate-ink">
            Used under the licence shown for each file. Images were resized for the web; no other changes were made.
          </p>
          <ul className="mt-10 grid gap-x-8 gap-y-6 md:grid-cols-2 xl:grid-cols-3">
            {credits.map((c) => (
              <li key={c.file} className="flex gap-4 border-t border-line pt-5">
                <span className="relative size-16 shrink-0 overflow-hidden bg-travertine">
                  <Image src={c.file} alt="" fill sizes="64px" className="object-cover" />
                </span>
                <span className="min-w-0 text-[0.85rem] leading-snug">
                  <a href={c.source} target="_blank" rel="noopener noreferrer" className="block break-words font-bold hover:text-brass-deep">
                    {c.title}
                  </a>
                  <span className="mt-1 block text-slate-ink">
                    {c.author || "Unknown author"} · {c.license}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <h2 className="display-sm mt-20">Unsplash</h2>
          <p className="mt-3 max-w-2xl text-slate-ink">
            {unsplash.length} interior photographs used under the{" "}
            <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-4">
              Unsplash Licence
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
