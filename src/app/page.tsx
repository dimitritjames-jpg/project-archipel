import Image from "next/image";
import { IslandDiscoveryRail } from "@/components/agent-template/island-discovery-rail";
import { RecommendationRail } from "@/components/agent-template/recommendation-rail";
import { VibeAgentComposer } from "@/components/agent-template/vibe-agent-composer";
import {
  getAgentIslandCards,
  getAgentRecommendations,
} from "@/lib/agent-template/content";
import { GENERATED_MEDIA_PATHS } from "@/lib/media";

export default function HomePage() {
  const islands = getAgentIslandCards();
  const recommendations = getAgentRecommendations();

  return (
    <div className="agent-template min-h-screen">
      <section className="relative overflow-hidden border-b border-[var(--vv-agent-line)]">
        <div className="absolute inset-0">
          <Image
            src={GENERATED_MEDIA_PATHS.beachDay}
            alt="Generated atmospheric beach-day scene with cream sand, turquoise water, palm shade, and a quiet island cove"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-[rgba(250,249,246,0.12)] via-[rgba(250,249,246,0.58)] to-[var(--vv-agent-canvas)]"
            aria-hidden
          />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[min(72vh,560px)] max-w-[var(--vv-agent-content-max)] flex-col items-center justify-center px-[var(--vv-agent-mobile-gutter)] py-14 text-center sm:min-h-[520px] sm:px-[var(--vv-agent-desktop-gutter)] sm:py-16">
          <VibeAgentComposer
            variant="hero"
            eyebrow="VibeVI Agent"
            title="What's your island move?"
            description="Tell VibeVI what you're looking for. Get real recommendations from the USVI."
          />
        </div>
      </section>

      <IslandDiscoveryRail islands={islands} />
      <RecommendationRail items={recommendations} />
    </div>
  );
}
