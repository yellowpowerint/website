export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Yellow Power International
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          Mining Support Services Excellence
        </p>
        <p className="text-lg text-gray-500 mb-8">
          Established 2017 | Madina, Greater Accra, Ghana
        </p>
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Technology Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-4 bg-gray-50 rounded">
              <p className="font-semibold text-gray-900">Frontend</p>
              <p className="text-sm text-gray-600">Next.js 14+ (App Router)</p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <p className="font-semibold text-gray-900">Language</p>
              <p className="text-sm text-gray-600">TypeScript 5.3+</p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <p className="font-semibold text-gray-900">Styling</p>
              <p className="text-sm text-gray-600">Tailwind CSS 3.4+</p>
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          <p>Phase 0: Repository Setup & Infrastructure Complete</p>
          <p className="mt-2">Ready for Phase 1: Design System & Foundation</p>
        </div>
      </div>
    </main>
  );
}
