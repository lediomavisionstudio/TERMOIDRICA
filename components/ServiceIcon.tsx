import type { Service } from "@/lib/data";

/**
 * Line-style SVG icons for services. Stroke uses currentColor so the
 * parent controls the accent; a subtle draw animation runs on hover
 * via the group-hover class defined by the card.
 */
export default function ServiceIcon({
  name,
  className = "h-7 w-7",
}: {
  name: Service["icon"];
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "drop":
      return (
        <svg {...common}>
          <path d="M12 3s6 6.5 6 10.5A6 6 0 0 1 6 13.5C6 9.5 12 3 12 3Z" />
          <path d="M10 14a2 2 0 0 0 2 2" />
        </svg>
      );
    case "flame":
      return (
        <svg {...common}>
          <path d="M12 3c1 3-2 4-2 7a2 2 0 0 0 4 0c2 1.5 3 3.5 3 5.5a5 5 0 0 1-10 0C7 11 12 9 12 3Z" />
        </svg>
      );
    case "snow":
      return (
        <svg {...common}>
          <path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19" />
        </svg>
      );
    case "wrench":
      return (
        <svg {...common}>
          <path d="M14.5 6.5a3.5 3.5 0 0 0-4.6 4.2l-6 6a2 2 0 1 0 2.8 2.8l6-6a3.5 3.5 0 0 0 4.2-4.6l-2.1 2.1-2.1-.5-.5-2.1 2.3-1.9Z" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...common}>
          <path d="M5 19c0-8 6-13 14-13 0 8-5 14-14 13Z" />
          <path d="M5 19c3-5 6-7 10-8" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 5 6v5c0 4 3 7 7 9 4-2 7-5 7-9V6l-7-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
  }
}
