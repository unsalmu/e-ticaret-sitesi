import { List, ChevronDown } from "lucide-react"

function GridIcon() {
  return (
    <span className="inline-grid w-4 h-4 grid-cols-2 gap-[2px]">
      <span className="w-full h-full bg-current" />
      <span className="w-full h-full bg-current" />
      <span className="w-full h-full bg-current" />
      <span className="w-full h-full bg-current" />
    </span>
  )
}

export default function ProductFilter({
  total = 12,
  view = "grid",
  onChangeView = () => { },
  sort = "popularity",
  onChangeSort = () => { },
  onOpenFilter = () => { },
}) {
  return (
    <section className="px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="py-6 flex flex-col gap-4 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center">
          {/* Left: results count */}
          <div className="flex justify-center md:justify-start">
            <p className="font-bold text-sm text-gray-600 text-center md:text-left">Showing all {total} results</p>
          </div>

          {/* Center: Views toggle */}
          <div className="flex items-center justify-center gap-3">
            <span className="font-bold text-sm text-gray-600">Views:</span>

            {/* View toggle */}
            <div className="flex items-center gap-2">
              <button
                aria-label="Grid view"
                onClick={() => onChangeView("grid")}
                aria-pressed={view === "grid"}
                className={`w-10 h-10 grid place-items-center border rounded-md transition-colors ${
                  view === "grid"
                    ? "bg-white border-gray-300 text-[#252B42]"
                    : "bg-white border-gray-200 text-gray-400 hover:bg-gray-50"
                }`}
              >
                <GridIcon />
              </button>
              <button
                aria-label="List view"
                onClick={() => onChangeView("list")}
                aria-pressed={view === "list"}
                className={`w-10 h-10 grid place-items-center border rounded-md transition-colors ${
                  view === "list"
                    ? "bg-white border-gray-300 text-[#252B42]"
                    : "bg-white border-gray-200 text-gray-400 hover:bg-gray-50"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: sort + filter */}
          <div className="flex items-center gap-3 justify-center md:justify-end">
            <div className="relative block">
              <select
                value={sort}
                onChange={(e) => onChangeSort(e.target.value)}
                className="w-40 sm:w-auto appearance-none pr-8 pl-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-600 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="popularity">Popularity</option>
                <option value="rating">Rating</option>
                <option value="newest">Newest</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* Filter button */}
            <button
              onClick={onOpenFilter}
              className="inline-flex items-center px-4 py-2 bg-[#23A6F0] text-white rounded-md text-sm font-bold hover:bg-[#23A6F0]/90"
            >
              Filter
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
