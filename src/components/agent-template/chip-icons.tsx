const base = "h-4 w-4 shrink-0";

export function ChipIcon({ iconKey }: { iconKey?: string }) {
  switch (iconKey) {
    case "beach":
      return (
        <svg aria-hidden className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" d="M3 18c3-2 6-2 9 0s6 2 9 0" />
          <circle cx="17" cy="7" r="2.5" />
        </svg>
      );
    case "boat":
      return (
        <svg aria-hidden className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 18h16M6 14l2-8h8l2 8M8 10h8" />
        </svg>
      );
    case "bite":
      return (
        <svg aria-hidden className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" d="M4 11h16M6 15h12M8 7h8" />
        </svg>
      );
    case "night":
      return (
        <svg aria-hidden className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" d="M12 3a7 7 0 1 0 7 7 5 5 0 0 1-5-5Z" />
        </svg>
      );
    case "family":
      return (
        <svg aria-hidden className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <circle cx="9" cy="8" r="2.5" />
          <circle cx="16" cy="9" r="2" />
          <path strokeLinecap="round" d="M4 20c0-3 2.5-5 5-5s5 2 5 5M13 20c0-2.5 1.8-4.5 4-4.5" />
        </svg>
      );
    case "romantic":
      return (
        <svg aria-hidden className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10Z" />
        </svg>
      );
    case "rainy":
      return (
        <svg aria-hidden className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" d="M7 14a5 5 0 0 1 9-2.5M6 18l1 2M10 18l1 2M14 18l1 2" />
        </svg>
      );
    case "cruise":
      return (
        <svg aria-hidden className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 18h16M6 14l1-6h10l1 6M8 8V6h8v2" />
        </svg>
      );
    case "ferry":
      return (
        <svg aria-hidden className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" d="M3 18h18M5 14l2-6h10l2 6" />
        </svg>
      );
    case "shops":
      return (
        <svg aria-hidden className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" d="M4 9h16l-1 11H5L4 9Z" />
          <path strokeLinecap="round" d="M9 9V6h6v3" />
        </svg>
      );
    default:
      return (
        <svg aria-hidden className={base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
  }
}
