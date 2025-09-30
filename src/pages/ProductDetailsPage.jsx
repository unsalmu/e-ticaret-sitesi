import ProductImageGallery from "../components/ProductImageGallery"
import ProductInfo from "../components/ProductInfo"
import ProductTabs from "../components/ProductTabs"
import FeaturedProducts from "../components/FeaturedProducts"
import Partners from "../components/Partners"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { fetchProduct } from "../store/actions/productActions"
import { ChevronLeft } from "lucide-react"

export default function ProductDetailsPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { productId, id } = useParams() // Handle both URL patterns
  const { selectedProduct, fetchState, categories } = useSelector(state => state.product)

  const actualProductId = productId || id

  useEffect(() => {
    if (actualProductId) {
      dispatch(fetchProduct(actualProductId))
    }
  }, [dispatch, actualProductId])

  const isLoading = fetchState === 'FETCHING'

  // Get product images
  const images = selectedProduct?.images?.map(img => img.url) || []

  // Find category for breadcrumb
  const category = categories.find(cat => cat.id === selectedProduct?.category_id)
  const categoryName = category?.title || "Product"

  return (
    <div className="min-h-screen bg-white">
      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex justify-center items-center py-20 min-h-screen">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#23A6F0] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 font-medium">Loading product...</p>
          </div>
        </div>
      )}

      {/* Product Content */}
      {!isLoading && selectedProduct && (
        <>
          {/* Back Button */}
          <div className="bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 pt-[60px] md:pt-[85px]">
              <button
                onClick={() => history.goBack()}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 py-4 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="bg-gray-100">
            <div className="max-w-7xl mx-auto px-4">
              <nav className="text-sm text-gray-500 pb-6 text-center md:text-left">
                <a href="/" className="font-bold text-gray-900 hover:text-blue-500">Home</a>
                <span className="mx-2">›</span>
                <a href="/shop" className="hover:text-blue-500">Shop</a>
                <span className="mx-2">›</span>
                <span className="text-gray-700">{categoryName}</span>
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
                  <ProductInfo product={selectedProduct} />
                </div>
              </div>
            </div>
          </section>

          {/* Tabs */}
          <ProductTabs product={selectedProduct} />

          {/* Bestseller products */}
          <FeaturedProducts headerVariant="bestseller" containerClass="bg-gray-50" />

          {/* Partners on gray like other pages */}
          <section className="bg-gray-50">
            <Partners />
          </section>
        </>
      )}

      {/* Error State */}
      {fetchState === 'FAILED' && !isLoading && (
        <div className="flex justify-center items-center py-20 min-h-screen">
          <div className="text-center">
            <p className="text-red-600 font-medium mb-4">Failed to load product</p>
            <button
              onClick={() => dispatch(fetchProduct(actualProductId))}
              className="px-4 py-2 bg-[#23A6F0] text-white rounded hover:bg-[#1d8bc4]"
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
