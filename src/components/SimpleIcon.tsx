import type { SimpleIcon } from "simple-icons";

interface SimpleIconProps {
  icon: SimpleIcon;
  className?: string;
}

export function SimpleIcon({ icon, className }: SimpleIconProps) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
}
