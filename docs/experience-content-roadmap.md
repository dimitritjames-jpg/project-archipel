# VibeVI Experience Engine Content Roadmap

VibeVI’s experience layer should answer one practical question: “What is the move?” The goal is booking-intent discovery without pretending VibeVI has live availability, instant reservations, payments, or a full partner dashboard.

## Launch pillars

- Adventure
- Culture
- Culinary
- Cruise Day
- Nightlife
- Wellness
- Stays
- Local Shops

The current public experience routes prioritize Adventure, Culture, Culinary, and Cruise Day. The remaining pillars are modeled in code but should stay preview/discovery-first until verified inventory and stronger content clusters exist.

## Adventure clusters

- Boat charters
- Snorkeling
- Diving
- Jet ski
- Kayak and paddleboard
- Hiking
- Buck Island
- Virgin Islands National Park
- Family adventure
- Luxury adventure
- Cruise-day adventure

Editorial rule: every adventure page must explain what needs direct verification, including weather, water conditions, pickup point, inclusions, cancellation terms, return timing, and operator credentials where relevant.

## Culture clusters

- Carnival
- Local music
- Art
- Food fairs
- Historic forts
- Moko jumbies
- Markets
- Festivals
- Community events
- Cultural etiquette

Editorial rule: avoid flattening culture into a tourist checklist. Use direct-source event dates, official venue references, and clear “preview” labels until the event pipeline is built.

## Culinary clusters

- Local plates
- Seafood
- Beach bars
- Waterfront dining
- Brunch
- Rum bars
- Chef and private dining
- Food trucks
- Late-night food
- Date-night dining

Editorial rule: menus, hours, prices, reservations, and availability are never guaranteed by VibeVI. Show verified profile data only when the listing passes inventory gates.

## Booking roadmap

1. Phase 1: Inquiry CTAs
   - Mailto or preview-only calls to action.
   - Provider-neutral analytics events only.
   - No personal-data storage.

2. Phase 2: Lead routing
   - Backend intake with RLS, rate limiting, consent copy, and spam protection.
   - Intent types: `get_listed`, `sponsor_interest`, `experience_planning`, `request_availability`, `business_contact`.

3. Phase 3: Partner dashboard
   - Claimed businesses can review incoming leads.
   - Verification/indexing/schema fields remain admin-controlled.

4. Phase 4: Availability/calendar
   - Direct partner availability integrations or verified manual calendar windows.
   - No “live” claims unless the data source is actually live and monitored.

5. Phase 5: Payments/booking marketplace
   - Deposits, confirmations, refunds, terms, and merchant-of-record decisions must be designed before any payment UI ships.

## Trust copy defaults

Allowed:

- Plan this experience
- Request availability
- Contact this business
- Start with an inquiry
- Booking tools coming soon
- Featured partners will be able to receive leads as VibeVI grows

Forbidden until implemented:

- Book instantly
- Reserve now
- Live availability
- Pay deposit
- Confirm booking
- Guaranteed availability

## Internal linking rules

Each experience page should connect to island hubs, at least one useful guide, related category pages, map/search, Get Listed when business-relevant, and honest booking-coming-soon or inquiry language.

Do not publish thin SEO pages. If a cluster lacks substance or verified inventory, keep it as a roadmap item or a clearly labeled guide preview.
