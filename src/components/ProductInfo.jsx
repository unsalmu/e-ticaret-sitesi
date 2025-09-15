import { Star, Heart, ShoppingCart, Eye } from "lucide-react"

export default function ProductInfo({
  title = "Floating Phone",
  rating = 4.5,
  reviews = 10,
  price = 1139.33,
  inStock = true,
  description = "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequat door ENIM RELIT Mollie. Excitation venial consequat sent nostrum met.",
  colors = ["#23A6F0", "#23856D", "#E77C40", "#252B42"],
}) {
  const full = Math.floor(rating)
  const half = rating - full >= 0.5

  return (
    <div className="w-full">
      {/* Title: smaller than global h1 (overrides global h1 size) */}
      <h1 className="!text-xl md:!text-2xl font-bold text-gray-900 mb-2">{title}</h1>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex">
          {[...Array(full)].map((_, i) => (
            <Star key={`f-${i}`} className="w-4 h-4 text-amber-400 fill-amber-400" />
          ))}
          {half && <Star className="w-4 h-4 text-amber-400" />}
          {[...Array(Math.max(0, 5 - full - (half ? 1 : 0)))].map((_, i) => (
            <Star key={`e-${i}`} className="w-4 h-4 text-gray-300" />
          ))}
        </div>
        <span className="text-sm text-gray-500">{reviews} Reviews</span>
      </div>

      {/* Price + stock */}
      <div className="mb-3">
        <div className="text-2xl font-bold text-gray-900">${price.toLocaleString()}</div>
        <div className="text-sm text-gray-600 font-bold">
          Availability : {" "}
          <span className={inStock ? "text-sky-600" : "text-red-500"}>{inStock ? "In Stock" : "Out of Stock"}</span>
        </div>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed mb-4">{description}</p>

      {/* Divider */}
      <div className="border-t border-gray-200 my-4" />

      {/* Colors */}
      <div className="flex items-center gap-3 mb-6">
        {colors.map((c, i) => (
          <button
            key={i}
            className="w-6 h-6 bg-current border border-white shadow ring-1 ring-gray-200 !rounded-full"
            style={{ backgroundColor: c, borderRadius: '9999px' }}
            aria-label={`Select color ${c}`}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button className="px-4 py-2 bg-[#23A6F0] text-white rounded text-sm font-bold hover:bg-[#23A6F0]/90">
          Select Options
        </button>
        <button className="w-9 h-9 flex items-center justify-center bg-white border border-gray-300 !rounded-full hover:bg-gray-50" aria-label="Add to wishlist" style={{ borderRadius: '9999px' }}>
          <Heart className="w-5 h-5 text-gray-700" />
        </button>
        <button className="w-9 h-9 flex items-center justify-center bg-white border border-gray-300 !rounded-full hover:bg-gray-50" aria-label="Add to cart" style={{ borderRadius: '9999px' }}>
          <ShoppingCart className="w-5 h-5 text-gray-700" />
        </button>
        <button className="w-9 h-9 flex items-center justify-center bg-white border border-gray-300 !rounded-full hover:bg-gray-50" aria-label="Quick view" style={{ borderRadius: '9999px' }}>
          <Eye className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </div>
  )
}
