import type { MediaKey } from "./media";

/**
 * SAMPLE CATALOGUE.
 *
 * These listings illustrate how the catalogue works and are built only from
 * what the reference photographs show. They are NOT the supplier's verified
 * stock. Replace them with real products before launch, and fill in finish,
 * size and thickness only where the business has confirmed them — `null`
 * renders as "On request". Prices are never shown: every product is quoted.
 */
export const CATALOGUE_IS_SAMPLE = true;

export type CategoryKey = "marble" | "italian-marble" | "granite" | "tiles" | "kota-stone";

export const categories: { key: CategoryKey; label: string; singular: string }[] = [
  { key: "marble", label: "Marble", singular: "Marble" },
  { key: "italian-marble", label: "Italian Marble", singular: "Italian marble" },
  { key: "granite", label: "Granite", singular: "Granite" },
  { key: "tiles", label: "Tiles", singular: "Tile" },
  { key: "kota-stone", label: "Kota Stone", singular: "Kota stone" },
];

export const categoryLabel = (key: CategoryKey) => categories.find((c) => c.key === key)!.label;

export const colours = ["White", "Cream & Beige", "Grey", "Black", "Pink & Red", "Brown & Gold", "Blue & Green", "Multicolour"] as const;
export type Colour = (typeof colours)[number];

export const applications = ["Flooring", "Wall cladding", "Countertops", "Bathrooms", "Outdoor", "Commercial"] as const;
export type Application = (typeof applications)[number];

export type Product = {
  slug: string;
  name: string;
  category: CategoryKey;
  image: MediaKey;
  /** Extra images for the detail page. */
  gallery?: MediaKey[];
  colour: Colour;
  /** Only where visible in / stated by the source photograph; otherwise null ("On request"). */
  finish: string | null;
  size: string | null;
  thickness: string | null;
  /** Typical uses for this kind of material — suitability is always confirmed per project. */
  applications: Application[];
  /** Tile style, used to group the Tile Showroom. */
  tileStyle?: "Porcelain" | "Ceramic" | "Patterned cement";
  summary: string;
  description: string;
};

export const products: Product[] = [
  // ── Marble ─────────────────────────────────────────────
  {
    slug: "black-ripple-marble",
    name: "Black Ripple Marble",
    category: "marble",
    image: "blackRipple",
    colour: "Black",
    finish: "Polished",
    size: null,
    thickness: null,
    applications: ["Wall cladding", "Flooring", "Bathrooms", "Commercial"],
    summary: "A near-black ground split by bold white and soft green veins.",
    description:
      "High-contrast veining that reads like brushwork across a deep black ground. Best given room to breathe — a feature wall, a reception desk front or a powder room where the stone becomes the whole design.",
  },
  {
    slug: "cream-vein-marble",
    name: "Cream Vein Marble",
    category: "marble",
    image: "creamVeined",
    colour: "Cream & Beige",
    finish: null,
    size: null,
    thickness: null,
    applications: ["Flooring", "Wall cladding", "Bathrooms"],
    summary: "Warm cream marble with long diagonal gold-beige veins.",
    description:
      "Quiet, warm and directional. The long diagonal veins lengthen a room and pair naturally with brass, oak and linen tones for calm living spaces and bathrooms.",
  },
  {
    slug: "grey-ripple-marble",
    name: "Grey Ripple Marble",
    category: "marble",
    image: "greyRipple",
    colour: "Grey",
    finish: null,
    size: null,
    thickness: null,
    applications: ["Wall cladding", "Bathrooms", "Flooring"],
    summary: "Soft grey and white ripples with a gentle, rhythmic pattern.",
    description:
      "A cool grey marble with a rippled, almost watery movement. Laid as squares it creates a soft rhythm across walls — a refined backdrop for contemporary bathrooms.",
  },
  {
    slug: "pale-cream-marble",
    name: "Pale Cream Marble",
    category: "marble",
    image: "paleCream",
    colour: "Cream & Beige",
    finish: null,
    size: null,
    thickness: null,
    applications: ["Flooring", "Wall cladding", "Commercial"],
    summary: "A light, low-contrast cream with a single soft golden vein.",
    description:
      "Calm and light-reflective, with minimal movement. A versatile choice for large floor areas where a seamless, luminous surface matters more than dramatic veining.",
  },
  {
    slug: "banded-sunset-stone",
    name: "Banded Sunset Stone",
    category: "marble",
    image: "bandedStone",
    gallery: ["bandedAmber"],
    colour: "Multicolour",
    finish: "Polished",
    size: null,
    thickness: null,
    applications: ["Wall cladding", "Commercial"],
    summary: "Book-matched bands of red, amber and lilac — pure statement.",
    description:
      "Concentric bands of colour mirrored across book-matched panels. A stone for feature walls, retail and hospitality spaces where the material is the artwork.",
  },

  // ── Italian marble ─────────────────────────────────────
  {
    slug: "statuarietto-white",
    name: "Statuarietto White",
    category: "italian-marble",
    image: "statuarietto",
    gallery: ["statuarietto2", "quarryFace"],
    colour: "White",
    finish: null,
    size: null,
    thickness: null,
    applications: ["Flooring", "Wall cladding", "Bathrooms", "Countertops"],
    summary: "Bright white ground with branching grey veins.",
    description:
      "A classic white marble from the Apuan Alps around Carrara, with a bright ground and fine grey veining. Timeless on floors, bathroom walls and vanity tops. Availability and current block details on request.",
  },
  {
    slug: "statuarietto-bold-vein",
    name: "Statuarietto Bold Vein",
    category: "italian-marble",
    image: "statuarietto2",
    gallery: ["statuarietto"],
    colour: "White",
    finish: null,
    size: null,
    thickness: null,
    applications: ["Wall cladding", "Countertops", "Bathrooms"],
    summary: "White marble with denser, darker charcoal veining.",
    description:
      "The same family as Statuarietto White, with more assertive charcoal veins. Ideal where you want the veining to lead — feature walls, kitchen islands and statement vanities.",
  },
  {
    slug: "white-marble-large-format",
    name: "White Marble Large Format",
    category: "italian-marble",
    image: "whiteMarbleTiles",
    colour: "White",
    finish: "Polished",
    size: null,
    thickness: null,
    applications: ["Flooring", "Wall cladding", "Commercial"],
    summary: "Polished white marble with fine grey veins in large squares.",
    description:
      "A polished white marble with delicate grey veining, cut into large square formats for floors and walls with minimal joints. Sizes and thicknesses on request.",
  },

  // ── Granite ────────────────────────────────────────────
  {
    slug: "black-galaxy-granite",
    name: "Black Galaxy Granite",
    category: "granite",
    image: "blackGalaxy",
    colour: "Black",
    finish: "Polished",
    size: null,
    thickness: null,
    applications: ["Countertops", "Flooring", "Commercial"],
    summary: "Deep black granite scattered with gold flecks.",
    description:
      "A dense black granite with gold mineral flecks that catch the light like stars. A long-standing favourite for kitchen countertops, staircases and commercial counters.",
  },
  {
    slug: "white-pearl-granite",
    name: "White Pearl Granite",
    category: "granite",
    image: "whitePearl",
    colour: "White",
    finish: null,
    size: null,
    thickness: null,
    applications: ["Flooring", "Countertops", "Outdoor"],
    summary: "Even white ground with crisp black and grey speckles.",
    description:
      "A bright, uniform granite with a classic salt-and-pepper grain. Consistent pattern makes it easy to match across large floors, steps and countertops.",
  },
  {
    slug: "silver-flow-granite",
    name: "Silver Flow Granite",
    category: "granite",
    image: "graniteSilver",
    colour: "Grey",
    finish: "Polished",
    size: null,
    thickness: null,
    applications: ["Countertops", "Wall cladding"],
    summary: "Flowing silver-grey movement with charcoal streaks.",
    description:
      "A granite with marble-like movement — long silver and charcoal streaks across a polished slab. Brings drama to kitchen islands without the upkeep of marble.",
  },
  {
    slug: "frost-white-granite",
    name: "Frost White Granite",
    category: "granite",
    image: "graniteFrost",
    colour: "White",
    finish: "Polished",
    size: null,
    thickness: null,
    applications: ["Countertops", "Bathrooms"],
    summary: "White granite with feathery grey crystal patterns.",
    description:
      "Soft white with feather-like grey crystal clusters. A lighter alternative for kitchens and vanities that still shows the character of natural granite.",
  },
  {
    slug: "gold-vein-granite",
    name: "Gold Vein Granite",
    category: "granite",
    image: "graniteGold",
    colour: "Brown & Gold",
    finish: "Polished",
    size: null,
    thickness: null,
    applications: ["Countertops", "Flooring"],
    summary: "Pale ground with warm gold and amber veins.",
    description:
      "Warm gold and amber veins run through a pale polished ground. Pairs beautifully with warm timber cabinetry and brass fittings.",
  },
  {
    slug: "crystal-brown-granite",
    name: "Crystal Brown Granite",
    category: "granite",
    image: "graniteBrown",
    colour: "Brown & Gold",
    finish: "Polished",
    size: null,
    thickness: null,
    applications: ["Countertops", "Flooring", "Commercial"],
    summary: "Large brown, gold and cream crystals with bold movement.",
    description:
      "An energetic granite with large brown, gold and cream crystals. Forgiving with everyday use and striking across a long countertop run.",
  },
  {
    slug: "rose-granite",
    name: "Rose Granite",
    category: "granite",
    image: "roseGranite",
    colour: "Pink & Red",
    finish: "Polished",
    size: null,
    thickness: null,
    applications: ["Flooring", "Outdoor", "Wall cladding"],
    summary: "Soft pink feldspar with fine dark speckles.",
    description:
      "A warm rose-toned granite with an even grain. Well suited to entrances, steps and façades where a warmer natural tone is wanted.",
  },
  {
    slug: "copper-red-granite",
    name: "Copper Red Granite",
    category: "granite",
    image: "capaoBonito",
    colour: "Pink & Red",
    finish: "Polished",
    size: null,
    thickness: null,
    applications: ["Flooring", "Wall cladding", "Commercial"],
    summary: "Copper-red ground with dark mineral clusters.",
    description:
      "Rich copper and terracotta tones with dark clusters of mica. A bold granite for commercial floors, cladding and feature elements.",
  },
  {
    slug: "salt-and-pepper-granite",
    name: "Salt & Pepper Granite",
    category: "granite",
    image: "greyGranite",
    colour: "Grey",
    finish: "Polished",
    size: null,
    thickness: null,
    applications: ["Flooring", "Countertops", "Outdoor", "Commercial"],
    summary: "Classic grey granite with an even mixed grain.",
    description:
      "The dependable grey granite — an even, mid-tone grain that suits high-traffic floors, steps, countertops and commercial projects alike.",
  },

  // ── Tiles ──────────────────────────────────────────────
  {
    slug: "polished-porcelain-white",
    name: "Polished Porcelain White",
    category: "tiles",
    tileStyle: "Porcelain",
    image: "porcelainFloor",
    colour: "White",
    finish: "Polished",
    size: null,
    thickness: null,
    applications: ["Flooring", "Commercial"],
    summary: "Large-format white porcelain with a mirror polish.",
    description:
      "Bright, reflective large-format porcelain that amplifies daylight and keeps joints to a minimum. A clean, practical choice for living areas and commercial floors.",
  },
  {
    slug: "heritage-patterned-cement",
    name: "Heritage Patterned Cement",
    category: "tiles",
    tileStyle: "Patterned cement",
    image: "patternedTiles",
    colour: "Multicolour",
    finish: null,
    size: null,
    thickness: null,
    applications: ["Flooring", "Wall cladding", "Bathrooms"],
    summary: "Encaustic-style pattern in teal, mustard and burgundy.",
    description:
      "Traditional patterned tiles that bring colour and craft to verandas, kitchens and bathrooms. Mix with plain tiles to frame a rug-like centrepiece.",
  },
  {
    slug: "pacific-blue-ceramic",
    name: "Pacific Blue Ceramic",
    category: "tiles",
    tileStyle: "Ceramic",
    image: "blueTiles",
    colour: "Blue & Green",
    finish: null,
    size: null,
    thickness: null,
    applications: ["Wall cladding", "Bathrooms"],
    summary: "Deep, saturated blue ceramic with fine grout lines.",
    description:
      "A confident deep blue for bathroom walls, splashbacks and accent panels. Pairs well with white stone tops and brushed brass.",
  },
  {
    slug: "cream-speckle-ceramic",
    name: "Cream Speckle Ceramic",
    category: "tiles",
    tileStyle: "Ceramic",
    image: "creamTiles",
    colour: "Cream & Beige",
    finish: null,
    size: null,
    thickness: null,
    applications: ["Flooring", "Wall cladding"],
    summary: "Soft cream ceramic with a subtle speckle.",
    description:
      "A warm, understated ceramic that hides everyday wear well. A good base tile for homes that layer natural materials and textiles.",
  },
  {
    slug: "taupe-speckle-floor",
    name: "Taupe Speckle Floor Tile",
    category: "tiles",
    tileStyle: "Ceramic",
    image: "speckledTiles",
    colour: "Grey",
    finish: null,
    size: null,
    thickness: null,
    applications: ["Flooring", "Commercial", "Outdoor"],
    summary: "Taupe ground with black speckles — granite-look floor tile.",
    description:
      "A speckled taupe tile with the look of granite, suited to busy floors in homes, offices and shops. Ask about slip-resistance ratings for outdoor or wet areas.",
  },

  // ── Kota stone ─────────────────────────────────────────
  {
    slug: "kota-stone-semi-polished",
    name: "Kota Stone — Semi-Polished",
    category: "kota-stone",
    image: "kotaSemiPolished",
    gallery: ["kotaStack"],
    colour: "Blue & Green",
    finish: "Semi-polished",
    size: null,
    thickness: null,
    applications: ["Flooring", "Commercial", "Outdoor"],
    summary: "Classic blue-grey Kota with a soft semi-polished sheen.",
    description:
      "A dense, fine-grained limestone with the familiar blue-grey tone. Semi-polished Kota is a practical, cool-underfoot choice for homes, corridors and commercial floors.",
  },
  {
    slug: "kota-stone-rough",
    name: "Kota Stone — Rough",
    category: "kota-stone",
    image: "kotaRough",
    colour: "Blue & Green",
    finish: "Rough",
    size: null,
    thickness: null,
    applications: ["Outdoor", "Flooring"],
    summary: "Natural rough surface for grip outdoors.",
    description:
      "Kota stone with a natural rough surface. Often chosen for driveways, terraces, parking areas and other outdoor spaces where grip matters.",
  },
  {
    slug: "kota-stone-diamond-cut",
    name: "Kota Stone — Diamond Cut",
    category: "kota-stone",
    image: "kotaDiamond",
    colour: "Blue & Green",
    finish: "Diamond cut",
    size: null,
    thickness: null,
    applications: ["Flooring", "Outdoor", "Commercial"],
    summary: "Machine-cut Kota with clean, precise edges.",
    description:
      "Diamond-cut Kota slabs with crisp, straight edges for tighter joints and a neater finished floor. Sizes and thickness on request.",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const productsIn = (category: CategoryKey) => products.filter((p) => p.category === category);

export function relatedProducts(p: Product, count = 3) {
  const same = products.filter((x) => x.category === p.category && x.slug !== p.slug);
  const other = products.filter((x) => x.category !== p.category && x.colour === p.colour);
  return [...same, ...other].slice(0, count);
}
