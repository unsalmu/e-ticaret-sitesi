import ProductCard from "./ProductCard"

export default function ProductGrid({ products = [], view = "grid" }) {
  if (view === "list") {
    return (
      <section className="px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col divide-y">
            {products.map((product) => (
              <div key={product.id} className="py-6">
                {/* Reuse ProductCard but you could design a list row version here */}
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
