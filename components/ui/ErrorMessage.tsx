interface ErrorMessageProps {
  message: string;
  role?: "alert";
}

export default function ErrorMessage({
  message,
  role = "alert",
}: ErrorMessageProps) {
  return (
    <div
      className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
      role={role}
    >
      {message}
    </div>
  );
}
