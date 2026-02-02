import Spinner from "./Spinner";

interface ProcessingStateProps {
  message?: string;
}

export default function ProcessingState({
  message = "Procesando...",
}: ProcessingStateProps) {
  return (
    <div
      className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-600"
      role="status"
      aria-live="polite"
    >
      <Spinner />
      <span>{message}</span>
    </div>
  );
}
