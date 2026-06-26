export type VibeAgentVariant = "hero" | "search" | "compact";

export type VibeAgentChip = {
  label: string;
  query?: string;
  href?: string;
  iconKey?: string;
};

export type VibePopularQuery = {
  label: string;
  query: string;
};

export type VibeAgentComposerProps = {
  variant?: VibeAgentVariant;
  eyebrow?: string;
  title?: string;
  description?: string;
  placeholder?: string;
  defaultQuery?: string;
  chips?: readonly VibeAgentChip[];
  popularQueries?: readonly VibePopularQuery[];
  action?: string;
  inputName?: string;
  showTools?: boolean;
  showVoiceWhenSupported?: boolean;
  className?: string;
};

export type VibeIslandCard = {
  slug: "st-thomas" | "st-john" | "st-croix" | "water-island";
  title: string;
  subtitle: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

export type VibeRecommendationCard = {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  badge?: "Popular" | "Local pick" | "Experience" | "Guide" | "Nightlife";
  trustLabel?: string;
};
