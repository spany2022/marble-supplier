import type { MetadataRoute } from "next";
import { business } from "@/content/business";
import { collections } from "@/content/collections";
import { products } from "@/content/catalogue";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = business.siteUrl;
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/collections`, changeFrequency: "weekly", priority: 0.9 },
    ...collections.map((c) => ({ url: `${base}/collections/${c.slug}`, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...products.map((p) => ({ url: `${base}/products/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: `${base}/about`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
