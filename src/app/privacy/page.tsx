import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Missing from "@/components/ui/Missing";
import { business } from "@/content/business";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${business.name} handles the information you share through this website.`,
  alternates: { canonical: "/privacy" },
};

/**
 * Template privacy notice. Have it reviewed against the laws that apply to the
 * business (e.g. India's DPDP Act 2023) before launch.
 */
export default function PrivacyPage() {
  const sections: [string, React.ReactNode][] = [
    [
      "What we collect",
      "When you send an enquiry we receive the details you enter: your name, phone number, optional email address, the material and project type you're interested in, optional quantity and location, and your project requirements.",
    ],
    [
      "Why we use it",
      "Only to respond to your enquiry — to discuss materials, prepare a quotation and arrange a showroom visit if you ask for one. We do not sell your details or use them for unrelated marketing.",
    ],
    [
      "How it's handled",
      "Enquiries are sent over an encrypted connection and delivered to the business's enquiry inbox. Submitted details are not written to website logs. We keep enquiries only as long as needed to deal with your request and any resulting order.",
    ],
    [
      "WhatsApp and phone",
      "If you contact us on WhatsApp or by phone, that conversation is also subject to the provider's own privacy terms.",
    ],
    [
      "Cookies",
      "This website does not use advertising or tracking cookies. Your browser may store small preferences needed for the site to work.",
    ],
    [
      "Your choices",
      <>
        You can ask us to access, correct or delete the information you have shared. Contact:{" "}
        {business.email ? (
          <a href={`mailto:${business.email}`} className="font-bold underline underline-offset-4">
            {business.email}
          </a>
        ) : (
          <Missing>Privacy contact email</Missing>
        )}
      </>,
    ],
  ];

  return (
    <>
      <PageHero eyebrow="Legal" crumbs={[{ href: "/privacy", label: "Privacy" }]} lines={["Privacy", "policy."]} />
      <section className="bg-ivory">
        <div className="site-x mx-auto max-w-3xl py-16 md:py-24">
          <div className="space-y-10">
            {sections.map(([title, body]) => (
              <div key={title} className="border-t border-line pt-8">
                <h2 className="display-sm">{title}</h2>
                <div className="mt-4 text-[1.02rem] leading-relaxed text-slate-ink">{body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
