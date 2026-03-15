import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">
                Indonesian Issue Tracker
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/issues"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Issues
            </Link>
            <Link
              href="/chat"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              AI Chat
            </Link>
            <Link
              href="/analytics"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Analytics
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
