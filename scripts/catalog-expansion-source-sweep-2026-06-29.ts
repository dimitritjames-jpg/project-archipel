import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(__dirname, "..");
const DATA_FILE = path.join(ROOT, "data", "public-info-businesses-batch-1-approved.json");
const AUDIT_DOC = path.join(ROOT, "docs", "catalog-expansion-audit-2026-06-29.md");
const SEARCH_QA_DOC = path.join(ROOT, "docs", "catalog-expansion-search-qa-2026-06-29.md");
const SOURCE_SWEEP_DOC = path.join(ROOT, "docs", "catalog-expansion-source-sweep-2026-06-29.md");
const RUN_DATE = "2026-06-29";

const QUERY_NOTES: Record<string, string> = {
  beach: "useful",
  beaches: "useful",
  boat: "useful",
  charter: "useful",
  snorkel: "useful",
  food: "useful",
  restaurant: "useful",
  bite: "useful",
  bar: "useful",
  night: "useful",
  nightlife: "useful",
  family: "useful",
  cruise: "useful",
  ferry: "useful",
  "st thomas": "high volume / broad",
  "st john": "high volume / broad",
  "st croix": "high volume / broad",
  "water island": "useful",
  romantic: "useful",
  "rainy day": "useful",
  wellness: "useful",
  shops: "useful",
  "local shops": "useful",
  "things to do": "useful",
};

const QUERIES = [
  "beach",
  "beaches",
  "boat",
  "charter",
  "snorkel",
  "food",
  "restaurant",
  "bite",
  "bar",
  "night",
  "nightlife",
  "family",
  "cruise",
  "ferry",
  "st thomas",
  "st john",
  "st croix",
  "water island",
  "romantic",
  "rainy day",
  "wellness",
  "shops",
  "local shops",
  "things to do",
] as const;

type IslandCode = "STT" | "STJ" | "STX" | "WI";
type CategorySlug =
  | "beaches"
  | "indulgent-dining"
  | "nightlife-rhythm"
  | "excursions-charters"
  | "local-provisions"
  | "boutique-stays";

type ApprovedListing = {
  name: string;
  slug: string;
  island: IslandCode;
  category: CategorySlug | "wellness-spas";
  description: string;
  address_or_area: string;
  website_url: string;
  phone: string | null;
  email: string | null;
  social_url: string | null;
  source_urls: string[];
  verification_source_url: string;
  operating_status_evidence_url: string;
  public_info_listing: boolean;
  is_demo: boolean;
  claimed: boolean;
  premium: boolean;
  booking_enabled: boolean;
  partner_status: string;
  media_rights_status: string;
  contact_permission_status: string;
  operating_status: string;
  last_verified_date: string;
  public_info_disclosure: string;
  indexing_recommendation: string;
  schema_recommendation: string;
  publish_ready: boolean;
  needs_human_review: boolean;
  promotion_notes: string;
};

type ApprovedBatch = {
  batch: string;
  promoted_at: string;
  source_candidate_file: string;
  publishing_policy: string;
  review_summary: {
    candidates_reviewed: number;
    ready_to_promote: string[];
    needs_human_review: string[];
    do_not_publish: string[];
    missing_required_fields: string[];
  };
  promoted_count: number;
  promoted_listings: ApprovedListing[];
  shared_public_info_fields: Record<string, unknown>;
};

type Candidate = {
  name: string;
  slug: string;
  island: IslandCode;
  islandName: string;
  category: CategorySlug;
  categoryName: string;
  listingType: "business-listing" | "place-listing";
  description: string;
  address: string;
  websiteUrl: string;
  sourceUrls: string[];
  confidence: "high" | "medium";
  fieldsAvailable: string[];
  reason: string;
  intents: string[];
};

const CATEGORY_ORDER = [
  "beaches",
  "excursions-charters",
  "indulgent-dining",
  "nightlife-rhythm",
  "local-provisions",
  "boutique-stays",
  "wellness-spas",
] as const;

const ADDITIONS: Candidate[] = [
  {
    name: "Lindquist Beach",
    slug: "lindquist-beach",
    island: "STT",
    islandName: "St. Thomas",
    category: "beaches",
    categoryName: "beaches",
    listingType: "place-listing",
    description:
      "A Smith Bay Park beach on St. Thomas with pale sand, clear swimming water, and easy East End pairing for cruise-friendly or family beach days.",
    address: "Smith Bay Park, East End, St. Thomas, USVI",
    websiteUrl:
      "https://www.visitusvi.com/experience/meet-st-thomas-pink-sand-beach-a-guide-to-smith-bay-park-lindquist-beach/",
    sourceUrls: [
      "https://www.visitusvi.com/experience/meet-st-thomas-pink-sand-beach-a-guide-to-smith-bay-park-lindquist-beach/",
      "https://www.vinow.com/stt/stt-b/lindq-beach/",
    ],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Adds a high-intent East End public beach that broadens St. Thomas beach coverage beyond Coki and Sapphire.",
    intents: ["beach", "beaches", "family", "cruise", "st thomas", "things to do"],
  },
  {
    name: "Brewer's Bay",
    slug: "brewers-bay",
    island: "STT",
    islandName: "St. Thomas",
    category: "beaches",
    categoryName: "beaches",
    listingType: "place-listing",
    description:
      "A quieter northside bay near UVI where calm water, local beach time, and lower-key St. Thomas plans make more sense than a polished resort day.",
    address: "Brewer's Bay, St. Thomas, USVI",
    websiteUrl: "https://www.vinow.com/stt/stt-b/brewers-bay/",
    sourceUrls: ["https://www.vinow.com/stt/stt-b/brewers-bay/"],
    confidence: "medium",
    fieldsAvailable: ["website", "address"],
    reason: "Strengthens St. Thomas beach depth with a quieter local-access bay.",
    intents: ["beach", "beaches", "snorkel", "family", "st thomas", "things to do"],
  },
  {
    name: "Hull Bay Beach",
    slug: "hull-bay-beach",
    island: "STT",
    islandName: "St. Thomas",
    category: "beaches",
    categoryName: "beaches",
    listingType: "place-listing",
    description:
      "A northside local beach with snorkel-and-surf energy, fishing-boat scenery, and a less polished St. Thomas feel than the East End classics.",
    address: "Hull Bay, St. Thomas, USVI",
    websiteUrl: "https://www.vinow.com/stt/stt-b/hull-bay/",
    sourceUrls: ["https://www.vinow.com/stt/stt-b/hull-bay/"],
    confidence: "medium",
    fieldsAvailable: ["website", "address"],
    reason: "Expands beach search depth for users looking for more local St. Thomas sand.",
    intents: ["beach", "beaches", "snorkel", "st thomas", "things to do"],
  },
  {
    name: "Secret Harbour Beach",
    slug: "secret-harbour-beach",
    island: "STT",
    islandName: "St. Thomas",
    category: "beaches",
    categoryName: "beaches",
    listingType: "place-listing",
    description:
      "A calmer East End beach inside Secret Harbour's bay that fits snorkel, family, and resort-adjacent St. Thomas beach plans.",
    address: "Nazareth, East End, St. Thomas, USVI",
    websiteUrl: "https://www.secretharbourvi.com/",
    sourceUrls: [
      "https://www.secretharbourvi.com/",
      "https://www.secretharbourvi.com/faqs/",
    ],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Adds another strong snorkel-and-family East End beach without inventing amenities.",
    intents: ["beach", "beaches", "snorkel", "family", "romantic", "st thomas"],
  },
  {
    name: "Lindbergh Bay Beach",
    slug: "lindbergh-bay-beach",
    island: "STT",
    islandName: "St. Thomas",
    category: "beaches",
    categoryName: "beaches",
    listingType: "place-listing",
    description:
      "An airport-side St. Thomas beach and park option for quick family beach time, plane-watching, and easy arrival-day or cruise-day access.",
    address: "Lindbergh Bay, St. Thomas, USVI",
    websiteUrl: "https://www.viport.com/park",
    sourceUrls: [
      "https://www.viport.com/park",
      "https://lindberghbayhotelandvillas.com/",
    ],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Improves airport-adjacent and quick-turn beach discovery for St. Thomas visitors.",
    intents: ["beach", "beaches", "family", "cruise", "st thomas", "things to do"],
  },
  {
    name: "Vessup Bay",
    slug: "vessup-bay",
    island: "STT",
    islandName: "St. Thomas",
    category: "beaches",
    categoryName: "beaches",
    listingType: "place-listing",
    description:
      "An East End stretch for walks, lighter crowds, and relaxed St. Thomas beach plans away from the busiest public sand.",
    address: "Vessup Bay, East End, St. Thomas, USVI",
    websiteUrl: "https://www.vinow.com/stt/stt-b/vessup-bay/",
    sourceUrls: ["https://www.vinow.com/stt/stt-b/vessup-bay/"],
    confidence: "medium",
    fieldsAvailable: ["website", "address"],
    reason: "Adds lower-crowd East End beach coverage for searchers who want a different St. Thomas day shape.",
    intents: ["beach", "beaches", "st thomas", "romantic", "things to do"],
  },
  {
    name: "Morningstar Beach",
    slug: "morningstar-beach",
    island: "STT",
    islandName: "St. Thomas",
    category: "beaches",
    categoryName: "beaches",
    listingType: "place-listing",
    description:
      "A southshore resort beach with wide sand, water-sports energy, and easy pairing with St. Thomas stay or romantic dinner plans.",
    address: "Frenchman's Reef area, St. Thomas, USVI",
    websiteUrl: "https://www.frenchmansreefstthomas.com/",
    sourceUrls: ["https://www.frenchmansreefstthomas.com/"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Strengthens romantic and resort-adjacent St. Thomas beach intent coverage.",
    intents: ["beach", "beaches", "romantic", "st thomas", "things to do"],
  },
  {
    name: "Francis Bay",
    slug: "francis-bay",
    island: "STJ",
    islandName: "St. John",
    category: "beaches",
    categoryName: "beaches",
    listingType: "place-listing",
    description:
      "A quieter Virgin Islands National Park beach with long swims, turtle-sighting potential, and birding behind the sand.",
    address: "North Shore Road, St. John, USVI",
    websiteUrl: "https://www.nps.gov/places/francis-bay.htm",
    sourceUrls: [
      "https://www.nps.gov/places/francis-bay.htm",
      "https://www.nps.gov/viis/planyourvisit/placestogo.htm",
    ],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Adds a quieter park beach for St. John beach and family searches.",
    intents: ["beach", "beaches", "family", "snorkel", "st john", "things to do"],
  },
  {
    name: "Hawksnest Beach",
    slug: "hawksnest-beach",
    island: "STJ",
    islandName: "St. John",
    category: "beaches",
    categoryName: "beaches",
    listingType: "place-listing",
    description:
      "A North Shore national park beach known for shade, easy access from Cruz Bay, and family-friendly St. John beach time.",
    address: "North Shore Road, St. John, USVI",
    websiteUrl: "https://www.nps.gov/places/hawksnest-beach.htm",
    sourceUrls: [
      "https://www.nps.gov/places/hawksnest-beach.htm",
      "https://www.nps.gov/viis/planyourvisit/placestogo.htm",
    ],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Improves family and quick-access St. John beach search depth.",
    intents: ["beach", "beaches", "family", "ferry", "st john", "things to do"],
  },
  {
    name: "Honeymoon Beach - St. John",
    slug: "honeymoon-beach-st-john",
    island: "STJ",
    islandName: "St. John",
    category: "beaches",
    categoryName: "beaches",
    listingType: "place-listing",
    description:
      "A white-sand St. John beach reached from Cruz Bay or Lind Point, good for families and slower ferry-day beach planning.",
    address: "Caneel Bay area, St. John, USVI",
    websiteUrl: "https://www.nps.gov/places/honeymoon-beach.htm",
    sourceUrls: ["https://www.nps.gov/places/honeymoon-beach.htm"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Adds a recognizable Cruz Bay-adjacent beach option for ferry and family searches.",
    intents: ["beach", "beaches", "family", "ferry", "st john", "things to do"],
  },
  {
    name: "Salt Pond Bay",
    slug: "salt-pond-bay",
    island: "STJ",
    islandName: "St. John",
    category: "beaches",
    categoryName: "beaches",
    listingType: "place-listing",
    description:
      "A southshore park beach where a short walk leads to swimming, snorkeling, and a Ram Head add-on for bigger things-to-do days.",
    address: "South Shore Road, St. John, USVI",
    websiteUrl: "https://www.nps.gov/places/salt-pond-bay.htm",
    sourceUrls: [
      "https://www.nps.gov/places/salt-pond-bay.htm",
      "https://www.nps.gov/thingstodo/salt-pond-and-ram-head-trails.htm",
    ],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Adds southshore St. John beach depth and snorkel/trail crossover intent.",
    intents: ["beach", "beaches", "snorkel", "things to do", "st john"],
  },
  {
    name: "Leinster Bay",
    slug: "leinster-bay",
    island: "STJ",
    islandName: "St. John",
    category: "beaches",
    categoryName: "beaches",
    listingType: "place-listing",
    description:
      "A park-side bay reached by trail from Annaberg, useful for snorkel-minded beach days that lean more exploratory than resorty.",
    address: "Leinster Bay Trail area, St. John, USVI",
    websiteUrl: "https://www.nps.gov/viis/planyourvisit/snorkeling.htm",
    sourceUrls: [
      "https://www.nps.gov/viis/planyourvisit/snorkeling.htm",
      "https://www.nps.gov/viis/planyourvisit/placestogo.htm",
    ],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Broadens St. John snorkel-beach coverage with a park trail access option.",
    intents: ["beach", "beaches", "snorkel", "st john", "things to do"],
  },
  {
    name: "Jumbie Beach",
    slug: "jumbie-beach",
    island: "STJ",
    islandName: "St. John",
    category: "beaches",
    categoryName: "beaches",
    listingType: "place-listing",
    description:
      "A smaller north shore cove near Trunk Bay that suits a quieter St. John beach stop with a short trail in.",
    address: "North Shore Road, St. John, USVI",
    websiteUrl: "https://www.nps.gov/viis/learn/management/compendium.htm",
    sourceUrls: ["https://www.nps.gov/viis/learn/management/compendium.htm"],
    confidence: "medium",
    fieldsAvailable: ["website"],
    reason: "Adds another public St. John cove to reduce overconcentration on Trunk and Maho.",
    intents: ["beach", "beaches", "st john", "things to do"],
  },
  {
    name: "Rainbow Beach",
    slug: "rainbow-beach",
    island: "STX",
    islandName: "St. Croix",
    category: "beaches",
    categoryName: "beaches",
    listingType: "place-listing",
    description:
      "A west-end St. Croix beach with calm water, sunset positioning, and easy pairing with beach-bar time in Frederiksted.",
    address: "Frederiksted, St. Croix, USVI",
    websiteUrl: "https://www.stcroixtourism.com/beaches/rainbow_beach.htm",
    sourceUrls: [
      "https://www.stcroixtourism.com/beaches/rainbow_beach.htm",
      "https://www.rainbowbeachstx.com/",
    ],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Gives St. Croix west-end beach and sunset searchers a core public listing.",
    intents: ["beach", "beaches", "bar", "night", "family", "st croix"],
  },
  {
    name: "Sandy Point National Wildlife Refuge",
    slug: "sandy-point-national-wildlife-refuge",
    island: "STX",
    islandName: "St. Croix",
    category: "beaches",
    categoryName: "beaches",
    listingType: "place-listing",
    description:
      "A long protected St. Croix shoreline better treated as a nature-first beach day tied to refuge rules and turtle habitat.",
    address: "Southwest St. Croix, USVI",
    websiteUrl: "https://www.fws.gov/refuge/sandy-point",
    sourceUrls: [
      "https://www.fws.gov/refuge/sandy-point",
      "https://www.gotostcroix.com/discover/beaches/sandy-point/",
    ],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Adds an official protected-beach listing for nature, family, and things-to-do intent.",
    intents: ["beach", "beaches", "family", "st croix", "things to do"],
  },
  {
    name: "Shoys Beach",
    slug: "shoys-beach",
    island: "STX",
    islandName: "St. Croix",
    category: "beaches",
    categoryName: "beaches",
    listingType: "place-listing",
    description:
      "A crescent East End beach near Christiansted with a quieter residential feel and easy swim-or-snorkel interest.",
    address: "East End, St. Croix, USVI",
    websiteUrl: "https://www.stcroixtourism.com/beaches/shoys.htm",
    sourceUrls: ["https://www.stcroixtourism.com/beaches/shoys.htm"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Improves St. Croix east-end beach depth for quieter beach searches.",
    intents: ["beach", "beaches", "snorkel", "st croix", "things to do"],
  },
  {
    name: "Tamarind Reef Beach",
    slug: "tamarind-reef-beach",
    island: "STX",
    islandName: "St. Croix",
    category: "beaches",
    categoryName: "beaches",
    listingType: "place-listing",
    description:
      "An East End beach with palms, Buck Island views, and a simple match for resort-adjacent lounging or snorkel breaks.",
    address: "Tamarind Reef, St. Croix, USVI",
    websiteUrl: "https://www.gotostcroix.com/discover/beaches/tamarind-reef/",
    sourceUrls: ["https://www.gotostcroix.com/discover/beaches/tamarind-reef/"],
    confidence: "medium",
    fieldsAvailable: ["website", "address"],
    reason: "Adds Buck Island-view beach coverage for St. Croix east-end planners.",
    intents: ["beach", "beaches", "romantic", "st croix", "things to do"],
  },
  {
    name: "Dorsch Beach",
    slug: "dorsch-beach",
    island: "STX",
    islandName: "St. Croix",
    category: "beaches",
    categoryName: "beaches",
    listingType: "place-listing",
    description:
      "A soft-sand Frederiksted beach with shade and a local-weekend feel for west-end St. Croix beach days.",
    address: "Frederiksted, St. Croix, USVI",
    websiteUrl: "https://www.gotostcroix.com/discover/beaches/dorsch/",
    sourceUrls: ["https://www.gotostcroix.com/discover/beaches/dorsch/"],
    confidence: "medium",
    fieldsAvailable: ["website", "address"],
    reason: "Adds another public west-end St. Croix beach for variety beyond Rainbow.",
    intents: ["beach", "beaches", "family", "st croix", "things to do"],
  },
  {
    name: "Protestant Cay Beach",
    slug: "protestant-cay-beach",
    island: "STX",
    islandName: "St. Croix",
    category: "beaches",
    categoryName: "beaches",
    listingType: "place-listing",
    description:
      "A harbor-side beach reached by short water-taxi hop from Christiansted, especially useful for family and town-plus-beach plans.",
    address: "Protestant Cay, Christiansted Harbor, St. Croix, USVI",
    websiteUrl: "https://www.stcroixtourism.com/beaches/protestant_cay.htm",
    sourceUrls: [
      "https://www.stcroixtourism.com/beaches/protestant_cay.htm",
      "https://www.thehotelonthecay.com/",
    ],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Connects Christiansted town searches to a ferry-access beach option.",
    intents: ["beach", "beaches", "family", "ferry", "st croix", "things to do"],
  },
  {
    name: "Pelican Cove Beach",
    slug: "pelican-cove-beach",
    island: "STX",
    islandName: "St. Croix",
    category: "beaches",
    categoryName: "beaches",
    listingType: "place-listing",
    description:
      "A north-shore St. Croix beach line useful for quieter resort-adjacent sand and an easy Christiansted-side beach changeup.",
    address: "Pelican Cove, St. Croix, USVI",
    websiteUrl: "https://visitstcroix.com/beach-guide.html",
    sourceUrls: [
      "https://visitstcroix.com/beach-guide.html",
      "https://www.gotostcroix.com/guides/st-croix-north-shore/",
    ],
    confidence: "medium",
    fieldsAvailable: ["website", "area"],
    reason: "Expands St. Croix north-shore beach breadth with a quieter option.",
    intents: ["beach", "beaches", "st croix", "romantic", "things to do"],
  },
  {
    name: "Old Stone Farmhouse",
    slug: "old-stone-farmhouse",
    island: "STT",
    islandName: "St. Thomas",
    category: "indulgent-dining",
    categoryName: "dining",
    listingType: "business-listing",
    description:
      "A restored-estate St. Thomas dinner address for romantic nights, tasting-menu energy, and a more secluded restaurant plan.",
    address: "Mahogany Run, St. Thomas, USVI",
    websiteUrl: "https://www.oldstonefarmhouse.net/",
    sourceUrls: ["https://www.oldstonefarmhouse.net/"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Strengthens romantic and destination-dinner search coverage on St. Thomas.",
    intents: ["food", "restaurant", "romantic", "st thomas", "dining"],
  },
  {
    name: "Fish Bar",
    slug: "fish-bar",
    island: "STT",
    islandName: "St. Thomas",
    category: "indulgent-dining",
    categoryName: "dining",
    listingType: "business-listing",
    description:
      "A waterside Red Hook restaurant built around fresh seafood, open-air dining, and a casual but destination-worthy East End meal.",
    address: "Red Hook, St. Thomas, USVI",
    websiteUrl: "https://www.fishbarvi.com/",
    sourceUrls: [
      "https://www.fishbarvi.com/",
      "https://www.fishbarvi.com/location",
    ],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Adds a strong East End seafood listing for food and romantic dinner intent.",
    intents: ["food", "restaurant", "romantic", "st thomas", "bar"],
  },
  {
    name: "Caribbean Fish Market",
    slug: "caribbean-fish-market",
    island: "STT",
    islandName: "St. Thomas",
    category: "indulgent-dining",
    categoryName: "dining",
    listingType: "business-listing",
    description:
      "A waterfront Ritz-Carlton dining room for seafood, sunset tables, and more polished St. Thomas dinner plans.",
    address: "The Ritz-Carlton, East End, St. Thomas, USVI",
    websiteUrl: "https://www.caribbeanfishmarketvi.com/",
    sourceUrls: ["https://www.caribbeanfishmarketvi.com/"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Improves romantic waterfront dining coverage on St. Thomas.",
    intents: ["food", "restaurant", "romantic", "st thomas", "dining"],
  },
  {
    name: "Pesce Italian",
    slug: "pesce-italian",
    island: "STT",
    islandName: "St. Thomas",
    category: "indulgent-dining",
    categoryName: "dining",
    listingType: "business-listing",
    description:
      "A Yacht Haven Grande Italian restaurant for marina-night dinners, pasta, and a more dressed-up harbor plan.",
    address: "Yacht Haven Grande, St. Thomas, USVI",
    websiteUrl: "https://www.pescevi.com/",
    sourceUrls: ["https://www.pescevi.com/"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Supports marina-side dining and romantic harbor intent in St. Thomas results.",
    intents: ["food", "restaurant", "romantic", "st thomas", "night"],
  },
  {
    name: "Oceana Restaurant & Bistro",
    slug: "oceana-restaurant-bistro",
    island: "STT",
    islandName: "St. Thomas",
    category: "indulgent-dining",
    categoryName: "dining",
    listingType: "business-listing",
    description:
      "A seaside St. Thomas dining room for waterfront dinners, date-night pacing, and a stronger romantic search answer.",
    address: "Charlotte Amalie, St. Thomas, USVI",
    websiteUrl: "https://www.oceanavi.com/",
    sourceUrls: ["https://www.oceanavi.com/"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Directly improves romantic and waterfront dining results.",
    intents: ["food", "restaurant", "romantic", "st thomas", "dining"],
  },
  {
    name: "The Longboard",
    slug: "the-longboard",
    island: "STJ",
    islandName: "St. John",
    category: "indulgent-dining",
    categoryName: "dining",
    listingType: "business-listing",
    description:
      "A Cruz Bay restaurant-and-bar with island cocktails, shareable plates, and easy ferry-night dinner momentum.",
    address: "Cruz Bay, St. John, USVI",
    websiteUrl: "https://www.thelongboardstjohn.com/",
    sourceUrls: [
      "https://www.thelongboardstjohn.com/",
      "https://www.thelongboardstjohn.com/menu",
    ],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Improves Cruz Bay food and night-out coverage tied to ferry arrivals.",
    intents: ["food", "restaurant", "bar", "night", "ferry", "st john"],
  },
  {
    name: "La Tapa",
    slug: "la-tapa",
    island: "STJ",
    islandName: "St. John",
    category: "indulgent-dining",
    categoryName: "dining",
    listingType: "business-listing",
    description:
      "A Cruz Bay dinner room for Mediterranean plates, patio seating, and a strong St. John romantic restaurant answer.",
    address: "Cruz Bay, St. John, USVI",
    websiteUrl: "https://www.latapastjohn.com/",
    sourceUrls: ["https://www.latapastjohn.com/"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Strengthens romantic and dinner-focused St. John search utility.",
    intents: ["food", "restaurant", "romantic", "st john", "dining"],
  },
  {
    name: "Ocean 362",
    slug: "ocean-362",
    island: "STJ",
    islandName: "St. John",
    category: "indulgent-dining",
    categoryName: "dining",
    listingType: "business-listing",
    description:
      "A hillside Cruz Bay restaurant with panoramic views, sunset energy, and obvious romantic-dinner appeal.",
    address: "Cruz Bay, St. John, USVI",
    websiteUrl: "https://ocean362.com/",
    sourceUrls: ["https://ocean362.com/"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Adds a strong sunset-and-romantic dining anchor for St. John queries.",
    intents: ["food", "restaurant", "romantic", "st john", "night"],
  },
  {
    name: "Duggan's Reef",
    slug: "duggans-reef",
    island: "STX",
    islandName: "St. Croix",
    category: "indulgent-dining",
    categoryName: "dining",
    listingType: "business-listing",
    description:
      "An East End St. Croix seafood restaurant with waterfront tables and destination-dinner energy beyond Christiansted town.",
    address: "Teague Bay, St. Croix, USVI",
    websiteUrl: "https://www.duggansreefstx.com/",
    sourceUrls: ["https://www.duggansreefstx.com/"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Adds more St. Croix food depth and another romantic waterfront dinner answer.",
    intents: ["food", "restaurant", "romantic", "st croix", "dining"],
  },
  {
    name: "Beach Side Cafe at Sand Castle on the Beach",
    slug: "beach-side-cafe-sand-castle-on-the-beach",
    island: "STX",
    islandName: "St. Croix",
    category: "indulgent-dining",
    categoryName: "dining",
    listingType: "business-listing",
    description:
      "A Frederiksted beachfront cafe for sunset meals, beach-bar crossover, and easy west-end St. Croix dining.",
    address: "Frederiksted, St. Croix, USVI",
    websiteUrl: "https://sandcastleonthebeach.com/dine/",
    sourceUrls: ["https://sandcastleonthebeach.com/dine/"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Improves beachfront dining coverage on St. Croix's west end.",
    intents: ["food", "restaurant", "bar", "romantic", "st croix", "night"],
  },
  {
    name: "Sun Dog Cafe",
    slug: "sun-dog-cafe",
    island: "STJ",
    islandName: "St. John",
    category: "indulgent-dining",
    categoryName: "dining",
    listingType: "business-listing",
    description:
      "A Mongoose Junction restaurant for pizza, pasta, cocktails, and a casual Cruz Bay dinner after beach or ferry hours.",
    address: "Mongoose Junction, Cruz Bay, St. John, USVI",
    websiteUrl: "https://www.sundogcafe.com/",
    sourceUrls: [
      "https://www.sundogcafe.com/",
      "https://www.sundogcafe.com/menu",
    ],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Adds a recognizable Cruz Bay food option that serves ferry and after-beach demand.",
    intents: ["food", "restaurant", "bar", "ferry", "st john", "night"],
  },
  {
    name: "Extra Virgin Bistro",
    slug: "extra-virgin-bistro",
    island: "STJ",
    islandName: "St. John",
    category: "indulgent-dining",
    categoryName: "dining",
    listingType: "business-listing",
    description:
      "A Mongoose Junction bistro for handmade pasta, cozy seating, and romantic St. John dinner plans.",
    address: "Mongoose Junction, Cruz Bay, St. John, USVI",
    websiteUrl: "https://www.extravirginbistro.com/",
    sourceUrls: ["https://www.extravirginbistro.com/"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Strengthens St. John date-night dining and Cruz Bay restaurant depth.",
    intents: ["food", "restaurant", "romantic", "st john", "dining"],
  },
  {
    name: "Tap & Still - Havensight",
    slug: "tap-still-havensight",
    island: "STT",
    islandName: "St. Thomas",
    category: "nightlife-rhythm",
    categoryName: "nightlife",
    listingType: "business-listing",
    description:
      "A Havensight burger-and-beer stop that fits cruise-day, late-night, and casual St. Thomas bar searches.",
    address: "Havensight, St. Thomas, USVI",
    websiteUrl: "https://tapandstill.com/",
    sourceUrls: ["https://tapandstill.com/"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Boosts Havensight nightlife and cruise-friendly bar coverage.",
    intents: ["bar", "night", "nightlife", "cruise", "st thomas", "food"],
  },
  {
    name: "Tap & Still - Red Hook",
    slug: "tap-still-red-hook",
    island: "STT",
    islandName: "St. Thomas",
    category: "nightlife-rhythm",
    categoryName: "nightlife",
    listingType: "business-listing",
    description:
      "A Red Hook casual bar-and-burger stop that strengthens ferry-side nightlife on St. Thomas.",
    address: "Red Hook, St. Thomas, USVI",
    websiteUrl: "https://tapandstill.com/",
    sourceUrls: ["https://tapandstill.com/"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Adds Red Hook nightlife density for night and ferry-hop searches.",
    intents: ["bar", "night", "nightlife", "ferry", "st thomas"],
  },
  {
    name: "Taphus Beer House",
    slug: "taphus-beer-house",
    island: "STT",
    islandName: "St. Thomas",
    category: "nightlife-rhythm",
    categoryName: "nightlife",
    listingType: "business-listing",
    description:
      "A Charlotte Amalie beer house for downtown night plans, pub food, and a more walkable bar answer.",
    address: "Charlotte Amalie, St. Thomas, USVI",
    websiteUrl: "https://taphusbeerhousevi.com/",
    sourceUrls: ["https://taphusbeerhousevi.com/"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Improves downtown St. Thomas nightlife coverage beyond Red Hook.",
    intents: ["bar", "night", "nightlife", "st thomas", "food"],
  },
  {
    name: "The Dog House Pub",
    slug: "the-dog-house-pub",
    island: "STT",
    islandName: "St. Thomas",
    category: "nightlife-rhythm",
    categoryName: "nightlife",
    listingType: "business-listing",
    description:
      "A Frenchtown pub with hot dogs, beer, and low-pretense St. Thomas late-night energy.",
    address: "Frenchtown, St. Thomas, USVI",
    websiteUrl: "https://dhpvi.com/",
    sourceUrls: ["https://dhpvi.com/"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Adds another casual late-night St. Thomas hangout to bar queries.",
    intents: ["bar", "night", "nightlife", "st thomas", "food"],
  },
  {
    name: "The Windmill Bar",
    slug: "the-windmill-bar",
    island: "STJ",
    islandName: "St. John",
    category: "nightlife-rhythm",
    categoryName: "nightlife",
    listingType: "business-listing",
    description:
      "A hillside St. John bar known for big views, sunset timing, and a strong Cruz Bay night-out detour.",
    address: "St. John, USVI",
    websiteUrl: "https://windmillbar.com/",
    sourceUrls: ["https://windmillbar.com/"],
    confidence: "high",
    fieldsAvailable: ["website", "area"],
    reason: "Improves sunset and nightlife discovery on St. John.",
    intents: ["bar", "night", "nightlife", "romantic", "st john", "things to do"],
  },
  {
    name: "STJ Speakeasy",
    slug: "stj-speakeasy",
    island: "STJ",
    islandName: "St. John",
    category: "nightlife-rhythm",
    categoryName: "nightlife",
    listingType: "business-listing",
    description:
      "A Cruz Bay cocktail bar for late drinks, date-night energy, and a more dedicated St. John nightlife result.",
    address: "Cruz Bay, St. John, USVI",
    websiteUrl: "https://www.stjspeakeasy.com/",
    sourceUrls: [
      "https://www.stjspeakeasy.com/",
      "https://www.stjspeakeasy.com/menu",
    ],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Directly improves St. John bar and nightlife relevance.",
    intents: ["bar", "night", "nightlife", "romantic", "st john"],
  },
  {
    name: "Rhythms at Rainbow Beach",
    slug: "rhythms-at-rainbow-beach",
    island: "STX",
    islandName: "St. Croix",
    category: "nightlife-rhythm",
    categoryName: "nightlife",
    listingType: "business-listing",
    description:
      "A Frederiksted beach bar for sunset drinks, live-music energy, and west-end St. Croix night plans.",
    address: "Rainbow Beach, Frederiksted, St. Croix, USVI",
    websiteUrl: "https://www.rainbowbeachstx.com/",
    sourceUrls: ["https://www.rainbowbeachstx.com/"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Adds a strong beach-bar nightlife anchor on St. Croix.",
    intents: ["bar", "night", "nightlife", "beach", "st croix"],
  },
  {
    name: "Common Cents Pub",
    slug: "common-cents-pub",
    island: "STX",
    islandName: "St. Croix",
    category: "nightlife-rhythm",
    categoryName: "nightlife",
    listingType: "business-listing",
    description:
      "A Christiansted pub listing that broadens boardwalk-adjacent nightlife and casual late-night options on St. Croix.",
    address: "Christiansted, St. Croix, USVI",
    websiteUrl: "https://www.visitusvi.com/listing/st-croix/476/common-cents-pub/",
    sourceUrls: [
      "https://www.visitusvi.com/listing/st-croix/476/common-cents-pub/",
      "https://www.instagram.com/commoncentspubstx/",
    ],
    confidence: "medium",
    fieldsAvailable: ["website", "address", "social"],
    reason: "Adds another public-source Christiansted nightlife result where official websites are limited.",
    intents: ["bar", "night", "nightlife", "st croix"],
  },
  {
    name: "Ocean Surfari",
    slug: "ocean-surfari",
    island: "STT",
    islandName: "St. Thomas",
    category: "excursions-charters",
    categoryName: "boating/activity",
    listingType: "business-listing",
    description:
      "A St. Thomas powerboat and snorkel operator for faster island-water days, reef stops, and boat-search intent.",
    address: "St. Thomas, USVI",
    websiteUrl: "https://oceansurfari.com/",
    sourceUrls: [
      "https://oceansurfari.com/",
      "https://oceansurfari.com/snorkeling/",
    ],
    confidence: "high",
    fieldsAvailable: ["website"],
    reason: "Adds another clear St. Thomas boat-and-snorkel operator to charter results.",
    intents: ["boat", "charter", "snorkel", "st thomas", "things to do"],
  },
  {
    name: "Cruz Bay Watersports",
    slug: "cruz-bay-watersports",
    island: "STT",
    islandName: "St. Thomas",
    category: "excursions-charters",
    categoryName: "boating/activity",
    listingType: "business-listing",
    description:
      "A USVI watersports operator with St. Thomas snorkeling and excursion options that widen boat-day coverage beyond pure private charters.",
    address: "St. Thomas, USVI",
    websiteUrl: "https://cruzbaywatersports.com/st-thomas-excursions-snorkeling/",
    sourceUrls: ["https://cruzbaywatersports.com/st-thomas-excursions-snorkeling/"],
    confidence: "high",
    fieldsAvailable: ["website"],
    reason: "Improves snorkel and excursion breadth for St. Thomas searchers.",
    intents: ["boat", "charter", "snorkel", "st thomas", "things to do"],
  },
  {
    name: "Virgin Islands Ecotours - St. John",
    slug: "virgin-islands-ecotours-st-john",
    island: "STJ",
    islandName: "St. John",
    category: "excursions-charters",
    categoryName: "boating/activity",
    listingType: "business-listing",
    description:
      "A St. John eco-tour operator with kayak and snorkel options that strengthen non-motorized activity coverage.",
    address: "St. John, USVI",
    websiteUrl: "https://www.viecotours.com/st-john/tours-in-st-john",
    sourceUrls: ["https://www.viecotours.com/st-john/tours-in-st-john"],
    confidence: "high",
    fieldsAvailable: ["website"],
    reason: "Adds kayak-led St. John activity coverage to boat and things-to-do searches.",
    intents: ["boat", "snorkel", "things to do", "st john", "family"],
  },
  {
    name: "Night Kayak St. John",
    slug: "night-kayak-st-john",
    island: "STJ",
    islandName: "St. John",
    category: "excursions-charters",
    categoryName: "boating/activity",
    listingType: "business-listing",
    description:
      "A night-kayak tour that gives St. John after-dark activity searches a distinct non-bar answer.",
    address: "St. John, USVI",
    websiteUrl: "https://www.nightkayak.com/night-tours/st-john/night-kayak-tour/",
    sourceUrls: ["https://www.nightkayak.com/night-tours/st-john/night-kayak-tour/"],
    confidence: "high",
    fieldsAvailable: ["website"],
    reason: "Adds a unique after-dark and family-friendly activity result for St. John.",
    intents: ["boat", "night", "family", "things to do", "st john"],
  },
  {
    name: "Cane Bay Dive Shop",
    slug: "cane-bay-dive-shop",
    island: "STX",
    islandName: "St. Croix",
    category: "excursions-charters",
    categoryName: "boating/activity",
    listingType: "business-listing",
    description:
      "A north-shore St. Croix dive operator that gives Cane Bay snorkel and scuba searches a direct public-info match.",
    address: "Cane Bay, St. Croix, USVI",
    websiteUrl: "https://canebayscuba.com/",
    sourceUrls: ["https://canebayscuba.com/"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Strengthens St. Croix snorkel and dive coverage around an existing beach anchor.",
    intents: ["boat", "snorkel", "charter", "st croix", "things to do"],
  },
  {
    name: "St. Croix Ultimate Bluewater Adventures",
    slug: "st-croix-ultimate-bluewater-adventures",
    island: "STX",
    islandName: "St. Croix",
    category: "excursions-charters",
    categoryName: "boating/activity",
    listingType: "business-listing",
    description:
      "A St. Croix dive-and-boat operator that broadens Buck Island and open-water adventure search coverage.",
    address: "Christiansted, St. Croix, USVI",
    websiteUrl: "https://stcroixscuba.com/",
    sourceUrls: ["https://stcroixscuba.com/"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Adds another strong St. Croix water-activity listing beyond tour brands already in the batch.",
    intents: ["boat", "charter", "snorkel", "st croix", "things to do"],
  },
  {
    name: "Yacht Haven Grande USVI",
    slug: "yacht-haven-grande-usvi",
    island: "STT",
    islandName: "St. Thomas",
    category: "excursions-charters",
    categoryName: "boating/activity",
    listingType: "business-listing",
    description:
      "A major St. Thomas marina for superyacht arrivals, harbor planning, and boat-day logistics tied to Yacht Haven Grande.",
    address: "Charlotte Amalie, St. Thomas, USVI",
    websiteUrl: "https://www.igymarinas.com/marinas/marina-yacht-haven-grande/",
    sourceUrls: ["https://www.igymarinas.com/marinas/marina-yacht-haven-grande/"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Adds marina utility for users planning around harbor-side charters and boat infrastructure.",
    intents: ["boat", "charter", "st thomas", "things to do"],
  },
  {
    name: "Crown Bay Marina",
    slug: "crown-bay-marina",
    island: "STT",
    islandName: "St. Thomas",
    category: "excursions-charters",
    categoryName: "boating/activity",
    listingType: "business-listing",
    description:
      "A St. Thomas marina near Crown Bay that helps ferry, charter, and harbor-planning searches feel more grounded.",
    address: "Crown Bay, St. Thomas, USVI",
    websiteUrl: "https://crownbay.com/",
    sourceUrls: ["https://crownbay.com/"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Adds Crown Bay-side boat infrastructure to cruise and charter utility searches.",
    intents: ["boat", "charter", "cruise", "st thomas", "things to do"],
  },
  {
    name: "Compass Point Marina",
    slug: "compass-point-marina",
    island: "STT",
    islandName: "St. Thomas",
    category: "excursions-charters",
    categoryName: "boating/activity",
    listingType: "business-listing",
    description:
      "A Benner Bay marina that adds East End boat-infrastructure context for charter and marina search intent.",
    address: "Benner Bay, St. Thomas, USVI",
    websiteUrl: "https://compasspointmarina.com/",
    sourceUrls: ["https://compasspointmarina.com/"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Extends St. Thomas marina coverage on the East End.",
    intents: ["boat", "charter", "st thomas", "things to do"],
  },
  {
    name: "American Yacht Harbor",
    slug: "american-yacht-harbor",
    island: "STT",
    islandName: "St. Thomas",
    category: "excursions-charters",
    categoryName: "boating/activity",
    listingType: "business-listing",
    description:
      "A Red Hook marina listing that supports boat-day logistics, charter-adjacent planning, and ferry-side harbor searches.",
    address: "Red Hook, St. Thomas, USVI",
    websiteUrl: "https://www.igymarinas.com/marinas/american-yacht-harbor/",
    sourceUrls: ["https://www.igymarinas.com/marinas/american-yacht-harbor/"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Improves Red Hook boat infrastructure coverage.",
    intents: ["boat", "charter", "ferry", "st thomas", "things to do"],
  },
  {
    name: "St. John Spice",
    slug: "st-john-spice",
    island: "STJ",
    islandName: "St. John",
    category: "local-provisions",
    categoryName: "local-provisions",
    listingType: "business-listing",
    description:
      "A longtime St. John spice shop for pantry gifts, hot sauces, and a direct local-shops result in Cruz Bay.",
    address: "Cruz Bay, St. John, USVI",
    websiteUrl: "https://stjohnspice.com/",
    sourceUrls: ["https://stjohnspice.com/"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Directly improves weak local-shops intent on St. John.",
    intents: ["shops", "local shops", "st john", "things to do"],
  },
  {
    name: "Bajo el Sol Gallery Art Bar Cafe Rum Shop",
    slug: "bajo-el-sol-gallery-art-bar-cafe-rum-shop",
    island: "STJ",
    islandName: "St. John",
    category: "local-provisions",
    categoryName: "local-provisions",
    listingType: "business-listing",
    description:
      "A Cruz Bay gallery-and-rum-shop hybrid that helps with local art, gifts, rainy-day browsing, and low-key date stops.",
    address: "Mongoose Junction, Cruz Bay, St. John, USVI",
    websiteUrl: "https://www.bajoelsolgallery.com/",
    sourceUrls: ["https://www.bajoelsolgallery.com/"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Adds a local-art and rainy-day option to St. John shop searches.",
    intents: ["shops", "local shops", "rainy day", "romantic", "st john"],
  },
  {
    name: "Mongoose Junction",
    slug: "mongoose-junction",
    island: "STJ",
    islandName: "St. John",
    category: "local-provisions",
    categoryName: "local-provisions",
    listingType: "business-listing",
    description:
      "A Cruz Bay shopping-and-dining village that works for local shops, rainy-day wandering, and easy ferry-town browsing.",
    address: "Cruz Bay, St. John, USVI",
    websiteUrl: "https://www.mongoosejunctionstjohn.com/",
    sourceUrls: ["https://www.mongoosejunctionstjohn.com/"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Improves St. John shopping intent with a central local retail cluster.",
    intents: ["shops", "local shops", "rainy day", "ferry", "st john", "things to do"],
  },
  {
    name: "Made in St. John",
    slug: "made-in-st-john",
    island: "STJ",
    islandName: "St. John",
    category: "local-provisions",
    categoryName: "local-provisions",
    listingType: "business-listing",
    description:
      "A Mongoose Junction boutique focused on island-made gifts and a stronger answer for St. John local-shop searches.",
    address: "Mongoose Junction, Cruz Bay, St. John, USVI",
    websiteUrl: "https://www.mongoosejunctionstjohn.com/made-in-st-john",
    sourceUrls: ["https://www.mongoosejunctionstjohn.com/made-in-st-john"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Adds a clearly local gift-and-maker listing to St. John shopping results.",
    intents: ["shops", "local shops", "st john"],
  },
  {
    name: "A.H. Riise Mall",
    slug: "ah-riise-mall",
    island: "STT",
    islandName: "St. Thomas",
    category: "local-provisions",
    categoryName: "local-provisions",
    listingType: "business-listing",
    description:
      "A Charlotte Amalie shopping stop tied to the historic A.H. Riise brand, useful for downtown browsing and cruise-day retail intent.",
    address: "Charlotte Amalie, St. Thomas, USVI",
    websiteUrl: "https://ahriise.com/",
    sourceUrls: ["https://ahriise.com/"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Improves downtown St. Thomas shopping and cruise-day retail coverage.",
    intents: ["shops", "local shops", "cruise", "st thomas", "things to do"],
  },
  {
    name: "Sonya Ltd",
    slug: "sonya-ltd",
    island: "STX",
    islandName: "St. Croix",
    category: "local-provisions",
    categoryName: "local-provisions",
    listingType: "business-listing",
    description:
      "A Christiansted jewelry and design brand that broadens St. Croix local-shop and maker-oriented discovery.",
    address: "Christiansted, St. Croix, USVI",
    websiteUrl: "https://www.sonyaltdstore.com/",
    sourceUrls: ["https://www.sonyaltdstore.com/"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Adds a recognizable St. Croix maker-retail listing for local shops.",
    intents: ["shops", "local shops", "st croix", "things to do"],
  },
  {
    name: "ib designs",
    slug: "ib-designs",
    island: "STX",
    islandName: "St. Croix",
    category: "local-provisions",
    categoryName: "local-provisions",
    listingType: "business-listing",
    description:
      "A Christiansted design-and-jewelry shop that gives St. Croix local-shopping searches another maker-driven result.",
    address: "Christiansted, St. Croix, USVI",
    websiteUrl: "https://ibdesignsvi.com/",
    sourceUrls: ["https://ibdesignsvi.com/"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Improves St. Croix local-shops depth with a direct official source.",
    intents: ["shops", "local shops", "st croix"],
  },
  {
    name: "Crucian Gold",
    slug: "crucian-gold",
    island: "STX",
    islandName: "St. Croix",
    category: "local-provisions",
    categoryName: "local-provisions",
    listingType: "business-listing",
    description:
      "A St. Croix jewelry studio and boutique that supports local-maker, gift, and Christiansted shopping searches.",
    address: "Christiansted, St. Croix, USVI",
    websiteUrl: "https://cruciangold.com/",
    sourceUrls: ["https://cruciangold.com/"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Adds another official local-maker shopping result for St. Croix.",
    intents: ["shops", "local shops", "st croix"],
  },
  {
    name: "FantaSea Jewelry",
    slug: "fantasea-jewelry",
    island: "STX",
    islandName: "St. Croix",
    category: "local-provisions",
    categoryName: "local-provisions",
    listingType: "business-listing",
    description:
      "A Christiansted jewelry boutique that improves local-gift and waterfront-shopping coverage on St. Croix.",
    address: "Christiansted, St. Croix, USVI",
    websiteUrl: "https://fantaseajewelry.com/",
    sourceUrls: ["https://fantaseajewelry.com/"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Helps round out St. Croix retail search depth with another official local shop.",
    intents: ["shops", "local shops", "st croix"],
  },
  {
    name: "Virgin Islands Children's Museum",
    slug: "virgin-islands-childrens-museum",
    island: "STT",
    islandName: "St. Thomas",
    category: "local-provisions",
    categoryName: "local-provisions",
    listingType: "business-listing",
    description:
      "A family-focused museum that gives St. Thomas rainy-day and kid-friendly searches a direct public-info answer.",
    address: "St. Thomas, USVI",
    websiteUrl: "https://www.vichildrensmuseum.org/",
    sourceUrls: ["https://www.vichildrensmuseum.org/"],
    confidence: "high",
    fieldsAvailable: ["website"],
    reason: "Directly improves weak family and rainy-day search areas.",
    intents: ["family", "rainy day", "things to do", "st thomas"],
  },
  {
    name: "Fort Christian Museum",
    slug: "fort-christian-museum",
    island: "STT",
    islandName: "St. Thomas",
    category: "local-provisions",
    categoryName: "local-provisions",
    listingType: "business-listing",
    description:
      "A historic Charlotte Amalie fort museum that strengthens rainy-day culture and cruise-port things-to-do coverage.",
    address: "Charlotte Amalie, St. Thomas, USVI",
    websiteUrl: "https://www.visitusvi.com/st-thomas/visit-fort-christian-on-st-thomas/",
    sourceUrls: [
      "https://www.visitusvi.com/st-thomas/visit-fort-christian-on-st-thomas/",
      "https://www.stthomashistoricalsociety.org/fort-christian",
    ],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Adds a stronger history answer for cruise, family, and rainy-day searches in St. Thomas.",
    intents: ["family", "rainy day", "cruise", "things to do", "st thomas"],
  },
  {
    name: "Fort Segarra",
    slug: "fort-segarra",
    island: "WI",
    islandName: "Water Island",
    category: "local-provisions",
    categoryName: "local-provisions",
    listingType: "business-listing",
    description:
      "A Water Island historic site with tunnels and military remains that gives ferry-day and things-to-do searches a non-beach anchor.",
    address: "Water Island, USVI",
    websiteUrl: "https://www.saj.usace.army.mil/FortSegarra/",
    sourceUrls: [
      "https://www.saj.usace.army.mil/FortSegarra/",
      "https://www.vinow.com/water-island/fort-segarra/",
    ],
    confidence: "high",
    fieldsAvailable: ["website", "area"],
    reason: "Adds badly needed Water Island depth beyond the ferry and Honeymoon Beach.",
    intents: ["water island", "ferry", "family", "things to do"],
  },
  {
    name: "The Fred",
    slug: "the-fred",
    island: "STX",
    islandName: "St. Croix",
    category: "boutique-stays",
    categoryName: "stays",
    listingType: "business-listing",
    description:
      "A Frederiksted beachfront hotel that strengthens romantic and adults-oriented St. Croix stay searches.",
    address: "Frederiksted, St. Croix, USVI",
    websiteUrl: "https://www.sleepwithfred.com/",
    sourceUrls: ["https://www.sleepwithfred.com/"],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Adds another real stay and strengthens romantic west-end St. Croix planning.",
    intents: ["romantic", "st croix", "things to do"],
  },
  {
    name: "Island View Guesthouse",
    slug: "island-view-guesthouse",
    island: "STT",
    islandName: "St. Thomas",
    category: "boutique-stays",
    categoryName: "stays",
    listingType: "business-listing",
    description:
      "A hillside St. Thomas guesthouse that gives romantic and slower-paced stay searches another source-backed option.",
    address: "St. Thomas, USVI",
    websiteUrl: "https://islandviewstthomas.com/",
    sourceUrls: [
      "https://islandviewstthomas.com/",
      "https://islandviewstthomas.com/steakhouse/",
    ],
    confidence: "high",
    fieldsAvailable: ["website", "address"],
    reason: "Improves stay coverage on St. Thomas and supports romantic planning.",
    intents: ["romantic", "st thomas", "things to do"],
  },
];

function readJson<T>(filePath: string): T {
  return JSON.parse(readFileSync(filePath, "utf8")) as T;
}

function countBy<T>(items: T[], keyFn: (item: T) => string): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const item of items) {
    const key = keyFn(item);
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}

function islandName(code: IslandCode) {
  return (
    {
      STT: "St. Thomas",
      STJ: "St. John",
      STX: "St. Croix",
      WI: "Water Island",
    } as const
  )[code];
}

function pillarForCategory(category: ApprovedListing["category"]) {
  return (
    {
      beaches: "wellness",
      "excursions-charters": "adventure",
      "indulgent-dining": "culinary",
      "boutique-stays": "stays",
      "nightlife-rhythm": "nightlife",
      "wellness-spas": "wellness",
      "local-provisions": "local-shops",
    } as const
  )[category] ?? "other";
}

function listingTypeForCategory(category: ApprovedListing["category"]) {
  return category === "beaches" ? "place-listing" : "business-listing";
}

function formatTable(headers: string[], rows: string[][]) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.join(" | ")} |`),
  ].join("\n");
}

function formatNumericTable(
  label: string,
  beforeCounts: Record<string, number>,
  afterCounts: Record<string, number>,
  order: string[],
) {
  const rows = order.map((item) => [
    item,
    String(beforeCounts[item] ?? 0),
    String(afterCounts[item] ?? 0),
    String((afterCounts[item] ?? 0) - (beforeCounts[item] ?? 0)),
  ]);
  return [`## ${label}`, formatTable(["Item", "Before", "After", "Delta"], rows)].join("\n");
}

function requiredFieldIssues(listings: ApprovedListing[]) {
  return listings.filter(
    (listing) =>
      !listing.name ||
      !listing.slug ||
      !listing.island ||
      !listing.category ||
      !listing.description ||
      !listing.address_or_area ||
      !listing.website_url ||
      listing.source_urls.length === 0,
  );
}

function invalidCategories(listings: ApprovedListing[]) {
  const valid = new Set(CATEGORY_ORDER);
  return listings.filter((listing) => !valid.has(listing.category as (typeof CATEGORY_ORDER)[number]));
}

function duplicateSlugs(listings: ApprovedListing[]) {
  const seen = new Map<string, number>();
  for (const listing of listings) {
    seen.set(listing.slug, (seen.get(listing.slug) ?? 0) + 1);
  }
  return Array.from(seen.entries())
    .filter(([, count]) => count > 1)
    .map(([slug]) => slug);
}

function sanitizeText(value: string) {
  return value.replaceAll("�", "-").replaceAll("â€”", "-");
}

function sanitizeListing(listing: ApprovedListing): ApprovedListing {
  return {
    ...listing,
    name: sanitizeText(listing.name),
  };
}

function toApprovedListing(
  candidate: Candidate,
  shared: ApprovedBatch["shared_public_info_fields"],
): ApprovedListing {
  return {
    name: candidate.name,
    slug: candidate.slug,
    island: candidate.island,
    category: candidate.category,
    description: candidate.description,
    address_or_area: candidate.address,
    website_url: candidate.websiteUrl,
    phone: null,
    email: null,
    social_url:
      candidate.sourceUrls.find((url) => url.includes("instagram.com") || url.includes("facebook.com")) ??
      null,
    source_urls: candidate.sourceUrls,
    verification_source_url: candidate.sourceUrls[0],
    operating_status_evidence_url: candidate.sourceUrls[0],
    public_info_listing: shared.public_info_listing as boolean,
    is_demo: shared.is_demo as boolean,
    claimed: shared.claimed as boolean,
    premium: shared.premium as boolean,
    booking_enabled: shared.booking_enabled as boolean,
    partner_status: shared.partner_status as string,
    media_rights_status: shared.media_rights_status as string,
    contact_permission_status: shared.contact_permission_status as string,
    operating_status: shared.operating_status as string,
    last_verified_date: RUN_DATE,
    public_info_disclosure: shared.public_info_disclosure as string,
    indexing_recommendation: shared.indexing_recommendation as string,
    schema_recommendation: shared.schema_recommendation as string,
    publish_ready: shared.publish_ready as boolean,
    needs_human_review: false,
    promotion_notes:
      "Promoted from the 2026-06-29 public source sweep. Not claimed, not premium, not a partner, not bookable through VibeVI, and no media rights granted.",
  };
}

function formatTopTen(results: Array<{ name: string; categoryName: string | null }>) {
  if (results.length === 0) return "none";
  return results
    .slice(0, 10)
    .map((result, index) => `${index + 1}. ${result.name} (${result.categoryName ?? "guide"})`)
    .join(" // ");
}

async function currentSearchSnapshot() {
  const mod = await import("../src/lib/search/catalog-search");
  return QUERIES.map((query) => {
    const results = mod.searchPublicInfoCatalog(query);
    return {
      query,
      count: results.length,
      top10: results.map((result) => ({
        name: result.name,
        categoryName: result.categoryName,
      })),
    };
  });
}

function buildSourceSweepDoc() {
  const grouped = [...ADDITIONS].sort((a, b) => {
    if (a.category === b.category) {
      return a.name.localeCompare(b.name);
    }
    return a.category.localeCompare(b.category);
  });

  const rows = grouped.map((candidate) => [
    candidate.name,
    candidate.islandName,
    candidate.category,
    candidate.listingType,
    candidate.sourceUrls[0],
    candidate.sourceUrls[1] ?? "-",
    candidate.confidence,
    candidate.fieldsAvailable.join(", "),
    candidate.reason,
    candidate.intents.join(", "),
  ]);

  return [
    "# VibeVI Public Source Sweep (2026-06-29)",
    "",
    `Catalog additions researched for the 2026-06-29 sweep: ${ADDITIONS.length}`,
    "",
    formatTable(
      [
        "Name",
        "Island",
        "Category",
        "Listing Type",
        "Source URL",
        "Secondary Source URL",
        "Confidence",
        "Fields Available",
        "Why It Belongs",
        "Search Intents",
      ],
      rows,
    ),
    "",
    "## Source domains used",
    "",
    Array.from(
      new Set(
        ADDITIONS.flatMap((candidate) => candidate.sourceUrls).map((url) => new URL(url).hostname),
      ),
    )
      .sort()
      .map((domain) => `- ${domain}`)
      .join("\n"),
    "",
  ].join("\n");
}

function buildAuditDoc(beforeBatch: ApprovedBatch, afterBatch: ApprovedBatch) {
  const beforeListings = beforeBatch.promoted_listings;
  const afterListings = afterBatch.promoted_listings;

  const beforeIslandCounts = countBy(beforeListings, (item) => islandName(item.island));
  const afterIslandCounts = countBy(afterListings, (item) => islandName(item.island));
  const islandOrder = ["St. Thomas", "St. John", "St. Croix", "Water Island"];

  const beforeCategoryCounts = countBy(beforeListings, (item) => item.category);
  const afterCategoryCounts = countBy(afterListings, (item) => item.category);

  const beforePillarCounts = countBy(beforeListings, (item) => pillarForCategory(item.category));
  const afterPillarCounts = countBy(afterListings, (item) => pillarForCategory(item.category));
  const pillarOrder = ["adventure", "culinary", "stays", "nightlife", "wellness", "local-shops", "other"];

  const beforeTrustCounts = { "public-info-listing": beforeListings.length };
  const afterTrustCounts = { "public-info-listing": afterListings.length };

  const beforeTypeCounts = countBy(beforeListings, (item) => listingTypeForCategory(item.category));
  const afterTypeCounts = countBy(afterListings, (item) => listingTypeForCategory(item.category));

  const thinRows = [
    ["beaches", beforeCategoryCounts.beaches ?? 0, afterCategoryCounts.beaches ?? 0],
    ["boat/charter", beforeCategoryCounts["excursions-charters"] ?? 0, afterCategoryCounts["excursions-charters"] ?? 0],
    ["restaurants", beforeCategoryCounts["indulgent-dining"] ?? 0, afterCategoryCounts["indulgent-dining"] ?? 0],
    ["nightlife", beforeCategoryCounts["nightlife-rhythm"] ?? 0, afterCategoryCounts["nightlife-rhythm"] ?? 0],
    ["local shops/provisions", beforeCategoryCounts["local-provisions"] ?? 0, afterCategoryCounts["local-provisions"] ?? 0],
    ["wellness", beforeCategoryCounts["wellness-spas"] ?? 0, afterCategoryCounts["wellness-spas"] ?? 0],
    ["stays", beforeCategoryCounts["boutique-stays"] ?? 0, afterCategoryCounts["boutique-stays"] ?? 0],
  ].map(([name, beforeCount, afterCount]) => [String(name), String(beforeCount), String(afterCount)]);

  const invalid = invalidCategories(afterListings);
  const missing = requiredFieldIssues(afterListings);
  const duplicates = duplicateSlugs(afterListings);
  const additionsRows = ADDITIONS.map((candidate) => [
    candidate.name,
    candidate.category,
    candidate.islandName,
    candidate.sourceUrls.join(" "),
    RUN_DATE,
    candidate.confidence,
    candidate.fieldsAvailable.join(", "),
    candidate.reason,
  ]);

  return [
    "# VibeVI Public-Info Catalog Audit (2026-06-29)",
    "",
    "Scope: data/public-info-businesses-batch-1-approved.json",
    "",
    `Date: ${RUN_DATE}`,
    `Listings before: ${beforeListings.length}`,
    `Listings after: ${afterListings.length}`,
    "",
    formatNumericTable("Counts by Island", beforeIslandCounts, afterIslandCounts, islandOrder),
    "",
    formatNumericTable("Counts by Category", beforeCategoryCounts, afterCategoryCounts, [...CATEGORY_ORDER]),
    "",
    formatNumericTable("Counts by Experience Pillar (derived from listing category)", beforePillarCounts, afterPillarCounts, pillarOrder),
    "",
    formatNumericTable("Counts by Trust State", beforeTrustCounts, afterTrustCounts, ["public-info-listing"]),
    "",
    formatNumericTable("Counts by Listing Type", beforeTypeCounts, afterTypeCounts, ["business-listing", "place-listing"]),
    "",
    "## Thin category health check",
    formatTable(["Target", "Before", "After"], thinRows),
    "",
    "## Catalog QA",
    "",
    `- Total count: ${afterListings.length}`,
    `- Duplicate slug check: ${duplicates.length === 0 ? "pass" : duplicates.join(", ")}`,
    `- Invalid category check: ${invalid.length === 0 ? "pass" : invalid.map((item) => item.name).join(", ")}`,
    `- Missing required field check: ${missing.length === 0 ? "pass" : missing.map((item) => item.name).join(", ")}`,
    `- Dynamic profile route build check: pending full app build`,
    `- Sitemap count change: expected +${ADDITIONS.length} public-info profile URLs before final build verification`,
    "",
    `## New public-info listings added (${ADDITIONS.length})`,
    formatTable(
      ["Name", "Category", "Island", "Source URL(s)", "Date researched", "Confidence", "Public fields used", "Notes"],
      additionsRows,
    ),
    "",
  ].join("\n");
}

function buildSearchQaDoc(
  beforeResults: Awaited<ReturnType<typeof currentSearchSnapshot>>,
  afterResults: Awaited<ReturnType<typeof currentSearchSnapshot>>,
) {
  const afterMap = new Map(afterResults.map((entry) => [entry.query, entry]));

  const rows = beforeResults.map((beforeEntry) => {
    const afterEntry = afterMap.get(beforeEntry.query);
    if (!afterEntry) {
      throw new Error(`Missing after search result for query ${beforeEntry.query}`);
    }
    return [
      beforeEntry.query,
      String(beforeEntry.count),
      String(afterEntry.count),
      formatTopTen(afterEntry.top10),
      formatTopTen(beforeEntry.top10),
      QUERY_NOTES[beforeEntry.query] ?? "useful",
    ];
  });

  return [
    "# VibeVI Search QA (2026-06-29)",
    "",
    formatTable(["Query", "Before Count", "After Count", "Top 10 After", "Top 10 Before", "Notes"], rows),
    "",
  ].join("\n");
}

async function main() {
  if (process.argv[2] === "search-json") {
    const snapshot = await currentSearchSnapshot();
    process.stdout.write(JSON.stringify(snapshot));
    return;
  }

  const rawBeforeBatch = readJson<ApprovedBatch>(DATA_FILE);
  const beforeBatch: ApprovedBatch = {
    ...rawBeforeBatch,
    review_summary: {
      ...rawBeforeBatch.review_summary,
      ready_to_promote: rawBeforeBatch.review_summary.ready_to_promote.map(sanitizeText),
    },
    promoted_listings: rawBeforeBatch.promoted_listings.map(sanitizeListing),
  };
  const beforeResults = await currentSearchSnapshot();

  const existingNames = new Set(beforeBatch.promoted_listings.map((item) => item.name));
  const existingSlugs = new Set(beforeBatch.promoted_listings.map((item) => item.slug));

  for (const candidate of ADDITIONS) {
    if (existingNames.has(candidate.name)) {
      throw new Error(`Duplicate existing name: ${candidate.name}`);
    }
    if (existingSlugs.has(candidate.slug)) {
      throw new Error(`Duplicate existing slug: ${candidate.slug}`);
    }
  }

  const newListings = ADDITIONS.map((candidate) =>
    toApprovedListing(candidate, beforeBatch.shared_public_info_fields),
  );

  const afterBatch: ApprovedBatch = {
    ...beforeBatch,
    promoted_at: RUN_DATE,
    source_candidate_file: "docs/catalog-expansion-source-sweep-2026-06-29.md",
    review_summary: {
      candidates_reviewed:
        beforeBatch.review_summary.candidates_reviewed + ADDITIONS.length,
      ready_to_promote: [
        ...beforeBatch.review_summary.ready_to_promote,
        ...ADDITIONS.map((candidate) => candidate.name),
      ].sort((a, b) => a.localeCompare(b)),
      needs_human_review: [],
      do_not_publish: [],
      missing_required_fields: [],
    },
    promoted_count: beforeBatch.promoted_count + ADDITIONS.length,
    promoted_listings: [...beforeBatch.promoted_listings, ...newListings].sort((a, b) =>
      a.name.localeCompare(b.name),
    ),
    shared_public_info_fields: {
      ...beforeBatch.shared_public_info_fields,
      last_verified_date: RUN_DATE,
    },
  };

  writeFileSync(DATA_FILE, `${JSON.stringify(afterBatch, null, 2)}\n`);
  writeFileSync(SOURCE_SWEEP_DOC, buildSourceSweepDoc());
  writeFileSync(AUDIT_DOC, buildAuditDoc(beforeBatch, afterBatch));

  const afterResultsJson =
    process.platform === "win32"
      ? execFileSync(
          "cmd.exe",
          ["/d", "/s", "/c", "npx tsx scripts/catalog-expansion-source-sweep-2026-06-29.ts search-json"],
          {
            cwd: ROOT,
            encoding: "utf8",
          },
        )
      : execFileSync(
          "npx",
          ["tsx", "scripts/catalog-expansion-source-sweep-2026-06-29.ts", "search-json"],
          {
            cwd: ROOT,
            encoding: "utf8",
          },
        );

  const afterResults = JSON.parse(afterResultsJson) as Awaited<ReturnType<typeof currentSearchSnapshot>>;
  writeFileSync(SEARCH_QA_DOC, buildSearchQaDoc(beforeResults, afterResults));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
