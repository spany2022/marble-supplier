import type { CategoryKey } from "./catalogue";
import type { MediaKey } from "./media";

export type Collection = {
  slug: string;
  number: string;
  title: string;
  /** Title split for editorial line breaks. */
  lines: string[];
  blurb: string;
  intro: string;
  image: MediaKey;
  category: CategoryKey;
  /** The tile showroom groups tiles by style instead of listing them flat. */
  showroom?: boolean;
};

export const collections: Collection[] = [
  {
    slug: "marble",
    number: "01",
    title: "Marble",
    lines: ["Marble"],
    blurb: "Natural elegance, distinctive veining, and timeless character for refined interiors.",
    intro:
      "From quiet creams to black grounds split by white veins, marble brings natural movement to floors, walls and bathrooms. Every slab is unique — view them in person before you choose.",
    image: "blackRipple",
    category: "marble",
  },
  {
    slug: "italian-marble",
    number: "02",
    title: "Italian Marble",
    lines: ["Italian", "Marble"],
    blurb: "Premium marble selections for sophisticated interiors and statement architectural spaces.",
    intro:
      "Bright white grounds and fine grey veining in the tradition of the Apuan Alps. Italian marble suits statement floors, feature walls and vanity tops where only the classic will do.",
    image: "statuarietto",
    category: "italian-marble",
  },
  {
    slug: "granite",
    number: "03",
    title: "Granite",
    lines: ["Granite"],
    blurb: "Durable, striking natural stone for countertops, kitchens, flooring, and other suitable applications.",
    intro:
      "Hard-wearing and full of crystal character, granite is a natural fit for kitchen countertops, steps, high-traffic floors and commercial counters.",
    image: "graniteSilver",
    category: "granite",
  },
  {
    slug: "designer-tiles",
    number: "04",
    title: "Designer Tiles",
    lines: ["Designer", "Tiles"],
    blurb: "Contemporary and classic tiles for floors, walls, bathrooms, kitchens, and commercial spaces.",
    intro:
      "Porcelain, ceramic and patterned cement tiles for every room — from mirror-polished large formats to saturated colour and heritage pattern.",
    image: "patternedTiles",
    category: "tiles",
  },
  {
    slug: "kota-stone",
    number: "05",
    title: "Kota Stone",
    lines: ["Kota", "Stone"],
    blurb: "A versatile natural stone option for suitable residential, commercial, and outdoor applications.",
    intro:
      "Dense, practical and naturally blue-grey. Kota stone is available in different finishes — from semi-polished interiors to rough surfaces for outdoor grip.",
    image: "kotaSemiPolished",
    category: "kota-stone",
  },
  {
    slug: "tile-showroom",
    number: "06",
    title: "Tile Showroom",
    lines: ["Tile", "Showroom"],
    blurb: "Explore tile styles, patterns, finishes, colors, and designs in one convenient collection experience.",
    intro:
      "Browse tiles by style, colour and application in one place — then visit the showroom to see finishes under real light.",
    image: "porcelainFloor",
    category: "tiles",
    showroom: true,
  },
];

export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);
