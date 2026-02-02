interface PageTitleProps {
  title: string;
  icon?: React.ReactNode;
}

export default function PageTitle({ title, icon }: PageTitleProps) {
  return (
    <div className="mb-6 flex items-center gap-2">
      {icon && (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
          {icon}
        </span>
      )}
      <h1 className="text-xl font-bold text-gray-900">{title}</h1>
    </div>
  );
}
