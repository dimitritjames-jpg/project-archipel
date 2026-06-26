export type IslandAskPrompt = {
  label: string;
  query?: string;
  href?: string;
};

export const ISLAND_ASK_PROMPTS: readonly IslandAskPrompt[] = [
  { label: "Beach day", query: "beach day" },
  { label: "Boat charter", query: "boat charter" },
  { label: "Local plate", query: "local plate" },
  { label: "Sunset dinner", query: "sunset dinner" },
  { label: "Boardwalk night", href: "/st-thomas/nightlife-rhythm" },
  { label: "Culture walk", href: "/experiences/culture" },
  { label: "Cruise day", href: "/cruise-day" },
  { label: "Family day", query: "family day" },
  { label: "Rainy day", query: "rainy day" },
] as const;

export function promptTarget(prompt: IslandAskPrompt): string {
  if (prompt.href) return prompt.href;
  const query = prompt.query ?? prompt.label.toLowerCase();
  return `/search?q=${encodeURIComponent(query)}`;
}
