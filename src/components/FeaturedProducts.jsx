import ProductCard from './ProductCard'

export default function FeaturedProducts() {
  // Sample data - Bu verileri gerçek API'dan alacaksınız
  const products = [
    {
      id: 1,
      name: "Graphic Design",
      department: "English Department", 
      image: "/src/assets/product-1.png",
      originalPrice: "16.48",
      price: "6.48",
      colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"]
    },
    {
      id: 2,
      name: "Graphic Design",
      department: "English Department",
      image: "/src/assets/product-2.png", 
      originalPrice: "16.48",
      price: "6.48",
      colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"]
    },
    {
      id: 3,
      name: "Graphic Design", 
      department: "English Department",
      image: "/src/assets/product-3.png",
      originalPrice: "16.48",
      price: "6.48",
      colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"]
    },
    {
      id: 4,
      name: "Graphic Design",
      department: "English Department",
      image: "/src/assets/product-4.png",
      originalPrice: "16.48", 
      price: "6.48",
      colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"]
    },
    {
      id: 5,
      name: "Graphic Design",
      department: "English Department",
      image: "/src/assets/product-5.png",
      originalPrice: "16.48",
      price: "6.48", 
      colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"]
    },
    {
      id: 6,
      name: "Graphic Design",
      department: "English Department",
      image: "/src/assets/product-6.png",
      originalPrice: "16.48",
      price: "6.48",
      colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"]
    },
    {
      id: 7,
      name: "Graphic Design", 
      department: "English Department",
      image: "/src/assets/product-7.png",
      originalPrice: "16.48",
      price: "6.48",
      colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"]
    },
    {
      id: 8,
      name: "Graphic Design",
      department: "English Department", 
      image: "/src/assets/product-8.png",
      originalPrice: "16.48",
      price: "6.48",
      colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"]
    }
  ]

  return (
    <section className="py-16 px-10 md:px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm text-gray-400 font-bold mb-2 tracking-wider">
            Featured Products
          </p>
          <h2 className="text-2xl md:text-2xl font-bold text-gray-900 mb-4">
            BESTSELLER PRODUCTS
          </h2>
          <p className="text-xs font-bold text-gray-400 max-w-md mx-auto">
            Problems trying to resolve the conflict between
          </p>
        </div>

        {/* Products Grid - Mobile First Flex Layout */}
        <div className="flex flex-col">
          {/* First Row */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {products.slice(0, 4).map(product => (
              <div key={product.id} className="flex-1">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Second Row */}
          <div className="flex flex-col md:flex-row gap-6">
            {products.slice(4, 8).map(product => (
              <div key={product.id} className="flex-1">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}