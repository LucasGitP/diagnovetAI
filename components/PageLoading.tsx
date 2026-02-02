import Spinner from "@/components/ui/Spinner";

export default function PageLoading() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4">
      <Spinner className="h-10 w-10 text-teal-600" />
      <p className="text-sm text-gray-500">Cargando...</p>
    </div>
  );
}
