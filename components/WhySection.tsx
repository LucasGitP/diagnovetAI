interface WhySectionProps {
  title: string;
  bullets: string[];
}

export default function WhySection({ title, bullets }: WhySectionProps) {
  return (
    <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-gray-600">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}
