import Logo from "@/components/Logo";

export default function OnboardingLayout({
  title,
  subtitle,
  children,
  rightContent,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  rightContent?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8 lg:flex-row lg:items-center lg:gap-12 lg:px-8">
        <div className="mb-8 flex flex-col items-center lg:mb-0 lg:w-1/2 lg:items-start">
          <Logo className="mb-6 text-teal-600" />
          <h1 className="text-center text-2xl font-bold text-gray-900 lg:text-left">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-center text-gray-500 lg:text-left">
              {subtitle}
            </p>
          )}
          {rightContent && (
            <div className="mt-8 hidden w-full max-w-sm lg:block">
              {rightContent}
            </div>
          )}
        </div>
        <div className="flex-1 lg:max-w-md">{children}</div>
      </div>
    </div>
  );
}
