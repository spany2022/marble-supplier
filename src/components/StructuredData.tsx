import { business } from "@/content/business";
import { collections } from "@/content/collections";

/**
 * LocalBusiness JSON-LD. Deliberately emitted ONLY when the owner has verified
 * the business details, so search engines never receive invented data.
 */
export default function StructuredData() {
  const { verified, address, phone } = business;
  if (!verified || !address || !phone) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: business.name,
    description: business.description,
    url: business.siteUrl,
    telephone: phone,
    ...(business.email && { email: business.email }),
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.locality,
      ...(address.region && { addressRegion: address.region }),
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    ...(business.hours && {
      openingHoursSpecification: business.hours
        .filter((h) => h.opens && h.closes)
        .map((h) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: h.days.map((d) => `https://schema.org/${dayName[d]}`),
          opens: h.opens,
          closes: h.closes,
        })),
    }),
    ...(business.social.length && { sameAs: business.social.map((s) => s.href) }),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Natural stone and tile collections",
      itemListElement: collections.map((c) => ({
        "@type": "OfferCatalog",
        name: c.title,
        url: `${business.siteUrl}/collections/${c.slug}`,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const dayName = {
  Mo: "Monday",
  Tu: "Tuesday",
  We: "Wednesday",
  Th: "Thursday",
  Fr: "Friday",
  Sa: "Saturday",
  Su: "Sunday",
} as const;
