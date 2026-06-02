export default function PengaturanSkeleton() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* Header */}
      <div>
        <div className="h-8 w-64 bg-gray-200 rounded" />
        <div className="h-4 w-96 bg-gray-100 rounded mt-2" />
      </div>

      {/* Card Profil */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex gap-6">
          <div className="w-24 h-24 rounded-xl bg-gray-200" />

          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="h-12 bg-gray-100 rounded-lg" />
            <div className="h-12 bg-gray-100 rounded-lg" />
            <div className="h-12 bg-gray-100 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-xl border p-6">
        <div className="h-12 bg-gray-100 rounded-lg" />
      </div>
    </div>
  );
}