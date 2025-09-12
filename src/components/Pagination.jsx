export default function Pagination({ page = 1, pages = 1, onChange = () => {} }) {
  const goFirst = () => onChange(1)
  const goPrev = () => onChange(Math.max(1, page - 1))
  const goNext = () => onChange(Math.min(pages, page + 1))

  // Keep it simple: render 1..pages (small counts per design)
  const items = Array.from({ length: pages }, (_, i) => i + 1)

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
