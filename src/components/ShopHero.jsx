import cover1 from "../assets/shop-cover-1.png"
import cover2 from "../assets/shop-cover-2.png"
import cover3 from "../assets/shop-cover-3.png"
import cover4 from "../assets/shop-cover-4.png"
import cover5 from "../assets/shop-cover-5.png"

export default function ShopHero() {
  const categories = [
    { id: 1, title: "CLOTHS", itemCount: 5, image: cover1 },
    { id: 2, title: "CLOTHS", itemCount: 5, image: cover2 },
    { id: 3, title: "CLOTHS", itemCount: 5, image: cover3 },
    { id: 4, title: "CLOTHS", itemCount: 5, image: cover4 },
    { id: 5, title: "CLOTHS", itemCount: 5, image: cover5 }
  ]

  return (
    <section className="bg-gray-50 pt-[60px] md:pt-[85px]">
      {/* Header Section */}
      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden md:flex md:items-center md:justify-between">
            <h1 className="!text-2xl font-bold text-gray-900">Shop</h1>

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2">
              <a href="/" className="text-sm font-bold text-gray-900 hover:text-blue-500 transition-colors">
                Home
              </a>
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-bold text-gray-500">Shop</span>
            </nav>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden text-center">
            <h1 className="!text-xl font-bold text-gray-900 mb-4">Shop</h1>

            {/* Breadcrumb */}
            <nav className="flex items-center justify-center gap-2">
              <a href="/" className="text-sm font-bold text-gray-900 hover:text-blue-500 transition-colors">
                Home
              </a>
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-bold text-gray-500">Shop</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Category Cards Section */}
      <div className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Mobile: Vertical Stack, Desktop: Horizontal Row */}
          <div className="flex flex-col md:flex-row gap-4">
            {categories.map((category) => (
              <div key={category.id} className="flex-1">
                <div className="relative group cursor-pointer overflow-hidden h-72 md:h-72">
                  {/* Category Image */}
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />

                  {/* Category Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{category.title}</h3>
                    <p className="text-sm md:text-base font-medium">{category.itemCount} Items</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
