"use client";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        {/* Paw pad + circuit motif */}
        <ellipse cx="28" cy="38" rx="14" ry="10" fill="currentColor" />
        <circle cx="18" cy="22" r="5" fill="currentColor" />
        <circle cx="38" cy="22" r="5" fill="currentColor" />
        <circle cx="12" cy="32" r="4" fill="currentColor" />
        <circle cx="44" cy="32" r="4" fill="currentColor" />
        {/* Circuit / chip center */}
        <rect
          x="24"
          y="34"
          width="8"
          height="6"
          rx="1"
          fill="white"
          opacity="0.9"
        />
        <rect x="26" y="35" width="2" height="2" fill="currentColor" />
        <rect x="28" y="35" width="2" height="2" fill="currentColor" />
        <rect x="30" y="35" width="2" height="2" fill="currentColor" />
      </svg>
    </div>
  );
}
