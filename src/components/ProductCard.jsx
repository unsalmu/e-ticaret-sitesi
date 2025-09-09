export default function ProductCard({ product }) {
    return (
      <div className="flex flex-col bg-white group cursor-pointer">
        {/* Product Image */}
        <div 
          className="relative overflow-hidden bg-gray-100 w-full h-96 md:h-72 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundImage: `url(${product.image})` }}
        >
        </div>
  
        {/* Product Info */}
        <div className="flex flex-col items-center text-center p-6 flex-1">
          {/* Product Name */}
          <h3 className="text-base font-bold text-gray-900 mb-2">
            {product.name}
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