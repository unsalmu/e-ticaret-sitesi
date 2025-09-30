export default function Pagination({ page = 1, pages = 1, onChange = () => {} }) {
  const goFirst = () => onChange(1)
  const goPrev = () => onChange(Math.max(1, page - 1))
  const goNext = () => onChange(Math.min(pages, page + 1))

  // For large page counts, show only nearby pages
  const getVisiblePages = () => {
    if (pages <= 7) {
      return Array.from({ length: pages }, (_, i) => i + 1)
    }

    const start = Math.max(1, page - 2)
    const end = Math.min(pages, start + 4)
    const adjustedStart = Math.max(1, end - 4)

    return Array.from({ length: end - adjustedStart + 1 }, (_, i) => adjustedStart + i)
  }

  const items = getVisiblePages()

  return (
    <section className="px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center py-10 font-bold">
          <nav className="inline-flex rounded-none overflow-hidden border border-gray-300" style={{ borderRadius: 0 }}>
            {/* First */}
            <button
              onClick={goFirst}
              disabled={page === 1}
              className={`px-5 h-10 text-sm border-r border-gray-300 !rounded-none ${
                page === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              style={{ borderRadius: 0 }}
            >
              First
            </button>

            {/* Show "1..." if current page range doesn't include page 1 */}
            {pages > 7 && items[0] > 1 && (
              <>
                <button
                  onClick={() => onChange(1)}
                  className="w-12 h-10 text-sm font-bold border-r border-gray-300 !rounded-none bg-white text-[#23A6F0] hover:bg-blue-50"
                  style={{ borderRadius: 0 }}
                >
                  1
                </button>
                {items[0] > 2 && (
                  <span className="w-12 h-10 text-sm font-bold border-r border-gray-300 !rounded-none bg-white text-gray-400 flex items-center justify-center">
                    ...
                  </span>
                )}
              </>
            )}

            {/* Page numbers */}
            {items.map((n) => (
              <button
                key={n}
                onClick={() => onChange(n)}
                className={`w-12 h-10 text-sm font-bold border-r border-gray-300 !rounded-none ${
                  n === page
                    ? "bg-[#23A6F0] text-white"
                    : "bg-white text-[#23A6F0] hover:bg-blue-50"
                }`}
                style={{ borderRadius: 0 }}
              >
                {n}
              </button>
            ))}

            {/* Show "...last" if current page range doesn't include last page */}
            {pages > 7 && items[items.length - 1] < pages && (
              <>
                {items[items.length - 1] < pages - 1 && (
                  <span className="w-12 h-10 text-sm font-bold border-r border-gray-300 !rounded-none bg-white text-gray-400 flex items-center justify-center">
                    ...
                  </span>
                )}
                <button
                  onClick={() => onChange(pages)}
                  className="w-12 h-10 text-sm font-bold border-r border-gray-300 !rounded-none bg-white text-[#23A6F0] hover:bg-blue-50"
                  style={{ borderRadius: 0 }}
                >
                  {pages}
                </button>
              </>
            )}

            {/* Next */}
            <button
              onClick={goNext}
              disabled={page === pages}
              className={`px-5 h-10 text-sm !rounded-none ${
                page === pages
                  ? "bg-white text-gray-400 cursor-not-allowed"
                  : "bg-white text-[#23A6F0] hover:bg-blue-50"
              }`}
              style={{ borderRadius: 0 }}
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </section>
  )
}
