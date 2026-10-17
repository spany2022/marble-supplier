import type { MediaKey } from "./media";

/**
 * Architectural inspiration gallery.
 *
 * `kind: "inspiration"` = reference imagery (stock / Commons), NOT work by this business.
 * Add the supplier's genuine completed projects with `kind: "project"` — they are
 * badged differently so visitors can always tell the two apart.
 */
export type GalleryItem = {
  image: MediaKey;
  space: string;
  material?: string;
  kind: "inspiration" | "project";
  /** Masonry shape hint. */
  shape: "tall" | "wide" | "square";
};

export const gallery: GalleryItem[] = [
  { image: "marbleKitchen", space: "Contemporary kitchen", material: "Veined marble", kind: "inspiration", shape: "tall" },
  { image: "livingArches", space: "Luxury living room", kind: "inspiration", shape: "wide" },
  { image: "bathDark", space: "Elegant bathroom", material: "Stone surfaces", kind: "inspiration", shape: "square" },
  { image: "travertineWall", space: "Designer wall", material: "Travertine cladding", kind: "inspiration", shape: "tall" },
  { image: "commercial", space: "Commercial interior", material: "Polished flooring", kind: "inspiration", shape: "wide" },
  { image: "kitchenWaterfall", space: "Kitchen", material: "Marble waterfall edge", kind: "inspiration", shape: "square" },
  { image: "bathWhite", space: "Bathroom", kind: "inspiration", shape: "tall" },
  { image: "porcelainFloor", space: "Flooring", material: "Polished porcelain", kind: "inspiration", shape: "wide" },
  { image: "kitchenMarble", space: "Kitchen", material: "Marble backsplash", kind: "inspiration", shape: "square" },
  { image: "stair", space: "Architectural staircase", kind: "inspiration", shape: "tall" },
];
