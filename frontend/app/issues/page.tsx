export default function IssuesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          All Issues
        </h1>
        <p className="text-gray-600">
          Browse and filter tracked issues from Indonesian news sources
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option>All Categories</option>
              <option>Politics & Government</option>
              <option>Economy & Business</option>
              <option>Social Issues</option>
              <option>Environment & Climate</option>
              <option>Education</option>
              <option>Health</option>
              <option>Infrastructure</option>
              <option>Technology</option>
              <option>Law & Justice</option>
              <option>Culture & Religion</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Severity
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option>All Severities</option>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Monitoring</option>
              <option>Resolved</option>
              <option>Archived</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Source
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option>All Sources</option>
              <option>Kompas.com</option>
              <option>Detik.com</option>
              <option>Tempo.co</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <input
            type="text"
            placeholder="Search issues by title or keywords..."
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
      </div>

      {/* Issues List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Issues (0)
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
              No issues found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              No issues match your filters. Try adjusting your search criteria or run the scraper.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
