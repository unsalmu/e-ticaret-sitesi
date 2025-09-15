import ProductImageGallery from "../components/ProductImageGallery"
import ProductInfo from "../components/ProductInfo"
import ProductTabs from "../components/ProductTabs"
import FeaturedProducts from "../components/FeaturedProducts"
import Partners from "../components/Partners"

import cover1 from "../assets/shop-cover-1.png"
import cover2 from "../assets/shop-cover-2.png"
import cover3 from "../assets/shop-cover-3.png"

export default function ProductDetailsPage() {
  const images = [cover1, cover2, cover3]

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 pt-[60px] md:pt-[85px]">
          <nav className="text-sm text-gray-500 py-6 text-center md:text-left">
            <a href="/" className="font-bold text-gray-900 hover:text-blue-500">Home</a>
            <span className="mx-2">›</span>
            <a href="/shop" className="hover:text-blue-500">Shop</a>
          </nav>
        </div>
      </div>

      {/* Product top section */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 pb-10">
          <div className="py-10 flex flex-col md:flex-row gap-10 items-start">
            <div className="flex-1 min-w-0">
              <ProductImageGallery images={images} />
            </div>
            <div className="flex-1 min-w-0">
              <ProductInfo />
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <ProductTabs />

      {/* Bestseller products */}
      <FeaturedProducts headerVariant="bestseller" containerClass="bg-gray-50" />

      {/* Partners on gray like other pages */}
      <section className="bg-gray-50">
        <Partners />
      </section>
    </div>
  )
}
