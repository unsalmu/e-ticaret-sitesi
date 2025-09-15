import ProductCard from './ProductCard'
import product1 from "../assets/product-1.png"
import product2 from "../assets/product-2.png"
import product3 from "../assets/product-3.png"
import product4 from "../assets/product-4.png"
import product5 from "../assets/product-5.png"
import product6 from "../assets/product-6.png"
import product7 from "../assets/product-7.png"
import product8 from "../assets/product-8.png"

export default function FeaturedProducts({ headerVariant = 'home', containerClass = 'bg-white' }) {
  // Sample data - Bu verileri gerçek API'dan alacaksınız
  const products = [
    {
      id: 1,
      name: "Graphic Design",
      department: "English Department", 
      image: product1,
      originalPrice: "16.48",
      price: "6.48",
      colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"]
    },
    {
      id: 2,
      name: "Graphic Design",
      department: "English Department",
      image: product2, 
      originalPrice: "16.48",
      price: "6.48",
      colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"]
    },
    {
      id: 3,
      name: "Graphic Design", 
      department: "English Department",
      image: product3,
      originalPrice: "16.48",
      price: "6.48",
      colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"]
    },
    {
      id: 4,
      name: "Graphic Design",
      department: "English Department",
      image: product4,
      originalPrice: "16.48", 
      price: "6.48",
      colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"]
    },
    {
      id: 5,
      name: "Graphic Design",
      department: "English Department",
      image: product5,
      originalPrice: "16.48",
      price: "6.48", 
      colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"]
    },
    {
      id: 6,
      name: "Graphic Design",
      department: "English Department",
      image: product6,
      originalPrice: "16.48",
      price: "6.48",
      colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"]
    },
    {
      id: 7,
      name: "Graphic Design", 
      department: "English Department",
      image: product7,
      originalPrice: "16.48",
      price: "6.48",
      colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"]
    },
    {
      id: 8,
      name: "Graphic Design",
      department: "English Department", 
      image: product8,
      originalPrice: "16.48",
      price: "6.48",
      colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"]
    }
  ]

  return (
    <section className={`py-16 px-10 md:px-4 ${containerClass}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {headerVariant === 'home' && (
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
        )}
        {headerVariant === 'bestseller' && (
          <div className="mb-6">
            <h2 className="text-lg md:text-2xl font-bold text-gray-700 tracking-wider">BESTSELLER PRODUCTS</h2>
            <div className="mt-3 border-t border-gray-200" />
          </div>
        )}

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
