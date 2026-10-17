/**
 * Image registry.
 *
 * - Stone textures (/images/stone) are Wikimedia Commons photographs used under
 *   their stated licences — see src/content/image-credits.json and /credits.
 * - Interior photography is ILLUSTRATIVE stock imagery from Unsplash.
 *
 * None of these show the supplier's own stock or completed projects. Replace
 * each `src` with the business's own photography before launch.
 */

const stone = (name: string) => `/images/stone/${name}.jpg`;
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export type Media = {
  src: string;
  alt: string;
  /** CSS object-position for art direction. */
  position?: string;
};

export const media = {
  // Marble
  blackRipple: {
    src: stone("marble-black-ripple"),
    alt: "Polished black marble crossed by bold white and pale green veins",
  },
  statuarietto: {
    src: stone("statuarietto-white"),
    alt: "White Statuarietto marble with grey branching veins",
  },
  statuarietto2: {
    src: stone("statuarietto-white-2"),
    alt: "Close-up of white marble with dense charcoal veining",
  },
  whiteMarbleTiles: {
    src: stone("white-marble-tiles"),
    alt: "Polished white marble with fine grey veins, laid in large square formats",
  },
  creamVeined: {
    src: stone("cream-veined-marble"),
    alt: "Cream marble surface with diagonal gold-beige veining",
    position: "50% 40%",
  },
  greyRipple: {
    src: stone("grey-rippled-marble"),
    alt: "Grey and white rippled marble laid as square wall tiles",
  },
  paleCream: {
    src: stone("pale-cream-marble"),
    alt: "Pale cream marble with a soft golden vein and fine sparkle",
  },
  bandedStone: {
    src: stone("banded-stone"),
    alt: "Book-matched stone wall with dramatic banded red, amber and lilac layers",
  },
  bandedAmber: {
    src: stone("banded-stone-amber"),
    alt: "Book-matched stone panel with banded amber and honey tones",
  },

  // Granite
  blackGalaxy: {
    src: stone("black-galaxy-slab"),
    alt: "Full slab of polished black granite with gold flecks standing in a stone warehouse",
  },
  whitePearl: {
    src: stone("white-pearl-granite"),
    alt: "White granite with an even black and grey speckled grain",
  },
  granitePolished: {
    src: stone("granite-polished"),
    alt: "Cut and polished granite showing black mica flecks in a pale ground",
  },
  greyGranite: {
    src: stone("grey-granite"),
    alt: "Polished grey granite with salt-and-pepper grain",
  },
  roseGranite: {
    src: stone("rose-granite"),
    alt: "Polished rose granite with pink feldspar and dark speckles",
  },
  capaoBonito: {
    src: stone("capao-bonito-granite"),
    alt: "Polished copper-red granite with dark mineral clusters",
  },
  graniteSilver: {
    src: stone("granite-slab-silver"),
    alt: "Polished granite slab with flowing silver-grey and charcoal movement",
  },
  graniteCream: {
    src: stone("granite-slab-cream"),
    alt: "Polished cream granite slab with rust and grey crystal clusters",
  },
  graniteFrost: {
    src: stone("granite-slab-frost"),
    alt: "Polished white granite slab with feathery grey crystal patterns",
  },
  graniteGold: {
    src: stone("granite-slab-gold"),
    alt: "Polished pale granite slab with gold and amber veins",
  },
  graniteBrown: {
    src: stone("granite-slab-brown"),
    alt: "Polished granite slab with large brown, gold and cream crystals",
  },

  // Kota stone
  kotaSemiPolished: {
    src: stone("kota-semi-polished"),
    alt: "Semi-polished blue-grey Kota stone slabs stacked in a stone yard",
  },
  kotaStack: {
    src: stone("kota-stack"),
    alt: "Stacks of square blue-grey Kota stone slabs",
  },
  kotaRough: {
    src: stone("kota-rough"),
    alt: "Rough-finish Kota stone tiles laid flat, showing their natural blue-green tone",
  },
  kotaDiamond: {
    src: stone("kota-diamond-cut"),
    alt: "Diamond-cut Kota stone slabs stacked upright outdoors",
  },

  // Tiles
  porcelainFloor: {
    src: stone("porcelain-floor"),
    alt: "Large-format polished white porcelain tiles reflecting daylight",
  },
  patternedTiles: {
    src: stone("patterned-cement-tiles"),
    alt: "Patterned cement tiles in teal, mustard, burgundy and cream",
  },
  blueTiles: {
    src: stone("blue-ceramic-tiles"),
    alt: "Deep Pacific blue ceramic tiles with fine grout lines",
  },
  creamTiles: {
    src: stone("cream-ceramic-tiles"),
    alt: "Cream speckled ceramic floor tiles",
  },
  speckledTiles: {
    src: stone("speckled-tiles"),
    alt: "Taupe and black speckled square floor tiles",
  },

  // Origins & architecture
  quarryFace: {
    src: stone("carrara-quarry-face"),
    alt: "Terraced white marble quarry face under a deep blue sky in Carrara, Italy",
  },
  quarryMountains: {
    src: stone("carrara-mountains"),
    alt: "Marble quarries cut into the Apuan mountains near Carrara",
  },
  quarryBlocks: {
    src: stone("quarry-blocks"),
    alt: "Cut marble blocks and machinery on the benches of a Carrara quarry",
  },
  quarryInterior: {
    src: stone("quarry-interior"),
    alt: "Inside an underground marble quarry with smooth-cut white walls",
  },
  travertineWall: {
    src: stone("travertine-wall"),
    alt: "A building wall clad in warm red travertine panels lining a narrow street",
  },
  marbleKitchen: {
    src: stone("marble-kitchen-island"),
    alt: "Kitchen with a bold black-and-white veined marble waterfall island and backsplash",
  },

  // Interiors — Unsplash inspiration imagery
  bathDark: {
    src: unsplash("1600566752355-35792bedcfea"),
    alt: "Contemporary bathroom with a freestanding tub, grey stone surfaces and dark vanity",
  },
  bathWhite: {
    src: unsplash("1620626011761-996317b8d101"),
    alt: "Bright bathroom with a freestanding white tub and stone vessel basin",
  },
  bathVanity: {
    src: unsplash("1584622650111-993a426fbf0a"),
    alt: "Bathroom with a glass shower, light stone countertop and charcoal vanity",
  },
  kitchenIsland: {
    src: unsplash("1600585152220-90363fe7e115"),
    alt: "Open kitchen with a white stone island, timber stools and pendant lights",
  },
  kitchenMarble: {
    src: unsplash("1507089947368-19c1da9775ae"),
    alt: "White kitchen with a marble backsplash and stone-topped island",
  },
  kitchenWaterfall: {
    src: unsplash("1556912173-3bb406ef7e77"),
    alt: "Kitchen with a veined marble waterfall counter edge and hexagonal wall tiles",
  },
  livingArches: {
    src: unsplash("1600210491892-03d54c0aaf87"),
    alt: "Light living room with tall arched windows and a white fireplace wall",
  },
  commercial: {
    src: unsplash("1497366216548-37526070297c"),
    alt: "Commercial interior with a long polished floor running down a glass corridor",
  },
  stair: {
    src: unsplash("1600573472550-8090b5e0745e"),
    alt: "Open staircase and glass balustrade overlooking a pool terrace",
  },
} satisfies Record<string, Media>;

export type MediaKey = keyof typeof media;
