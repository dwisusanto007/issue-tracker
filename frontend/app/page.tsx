export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600">
          Overview of Indonesian national issues from trusted news sources
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500 mb-1">
            Total Issues
          </div>
          <div className="text-3xl font-bold text-gray-900">0</div>
          <div className="text-sm text-gray-500 mt-1">
            Last updated: Never
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500 mb-1">
            Active Issues
          </div>
          <div className="text-3xl font-bold text-blue-600">0</div>
          <div className="text-sm text-gray-500 mt-1">
            Currently monitoring
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500 mb-1">
            Critical Issues
          </div>
          <div className="text-3xl font-bold text-red-600">0</div>
          <div className="text-sm text-gray-500 mt-1">
            Requires attention
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500 mb-1">
            Articles Scraped
          </div>
          <div className="text-3xl font-bold text-green-600">0</div>
          <div className="text-sm text-gray-500 mt-1">
            From all sources
          </div>
        </div>
      </div>

      {/* Recent Issues */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Issues
          </h2>
        </div>
        <div className="p-6">
          <div className="text-center py-12 text-gray-500">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No issues yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Start by running the scraper to collect news articles.
            </p>
            <div className="mt-6">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Run Scraper
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Browse Issues
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Explore all tracked issues across different categories
          </p>
          <a
            href="/issues"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View all issues →
          </a>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            AI Chat Assistant
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Ask questions about issues using natural language
          </p>
          <a
            href="/chat"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Start chatting →
          </a>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            View Analytics
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Analyze trends and patterns across issues
          </p>
          <a
            href="/analytics"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View analytics →
          </a>
        </div>
      </div>
    </div>
  );
}
