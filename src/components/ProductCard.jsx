import { Link } from "react-router-dom"

export default function ProductCard({ product }) {
    // Create slug for URL
    const createSlug = (text) => {
        return text?.toLowerCase()
            .replace(/ı/g,'i').replace(/ğ/g,'g').replace(/ü/g,'u').replace(/ş/g,'s').replace(/ö/g,'o').replace(/ç/g,'c')
            .replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'') || 'product'
    }

    // Use category data if available (from API products), otherwise fallback to simple URL
    const category = product.category
    const gender = category?.gender === 'k' ? 'kadin' : 'erkek'
    const categoryName = createSlug(product.department)
    const categoryId = category?.id || 'unknown'
    const productSlug = createSlug(product.name)

    // Construct proper URL - use complex URL for API products, simple for static products
    const productUrl = category && category.id
        ? `/shop/${gender}/${categoryName}/${categoryId}/${productSlug}/${product.id}`
        : `/product/${product.id}`
    return (
      <div className="flex flex-col bg-white group cursor-pointer hover:shadow-lg transition-all duration-300">
        {/* Product Image */}
        <Link to={productUrl} className="block">
          <div
            className="relative overflow-hidden bg-gray-100 w-full h-96 md:h-72 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundImage: `url(${product.image})` }}
          />
        </Link>

        {/* Product Info */}
        <div className="flex flex-col items-center text-center p-6 flex-1">
          {/* Product Name */}
          <h3 className="text-base font-bold text-gray-900 mb-2">
            <Link to={productUrl} className="hover:text-blue-500 transition-colors">
              {product.name}
            </Link>
          </h3>
  
          {/* Department */}
          <p className="text-sm text-gray-500 mb-4">
            {product.department}
          </p>
  
          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-base text-gray-400 line-through">
              ${product.originalPrice}
            </span>
            <span className="text-base font-bold text-[#23856D]">
              ${product.price}
            </span>
          </div>
  
          {/* Color Options */}
          <div className="flex gap-2">
            {product.colors.map((color, index) => (
              <button
                key={index}
                className={`w-4 h-4 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform`}
                style={{ backgroundColor: color }}
                aria-label={`Select ${color} color`}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
