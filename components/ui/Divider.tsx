interface DividerProps {
  label?: string;
}

export default function Divider({ label = "o" }: DividerProps) {
  return (
    <div className="my-6 flex items-center gap-3">
      <span className="h-px flex-1 bg-gray-200" />
      <span className="text-xs text-gray-400">{label}</span>
      <span className="h-px flex-1 bg-gray-200" />
    </div>
  );
}
