import Logo from "@/components/Logo";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="w-full max-w-[420px] rounded-2xl border border-gray-200/80 bg-white p-8 shadow-lg shadow-gray-200/50">
      <div className="flex flex-col items-center text-center">
        <Logo className="mb-4 text-teal-600" />
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-gray-500">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
