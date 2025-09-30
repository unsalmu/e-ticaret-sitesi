import ShopHero from "../components/ShopHero";
import ProductFilter from "../components/ProductFilter";
import ProductGrid from "../components/ProductGrid";
import Pagination from "../components/Pagination";
import Partners from "../components/Partners";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../store/actions/productActions";

export default function ShopPage() {
  const dispatch = useDispatch()
  const { productList, total, fetchState, categories } = useSelector(state => state.product)
  const { categoryId } = useParams()

  const [view, setView] = useState("grid")
  const [sort, setSort] = useState("")
  const [filter, setFilter] = useState("")
  const [tempFilter, setTempFilter] = useState("") // For input before applying
  const [page, setPage] = useState(1)
  const pageSize = 25 // API default

  // Reset page when filters change
  useEffect(() => {
    setPage(1)
  }, [categoryId, sort, filter])

  // Apply filter with debounce when sort changes
  useEffect(() => {
    if (sort) {
      setFilter(tempFilter)
    }
  }, [sort, tempFilter])

  // Sync tempFilter with actual filter on mount
  useEffect(() => {
    setTempFilter(filter)
  }, [filter])

  // Clear filters when categoryId changes
  useEffect(() => {
    if (categoryId) {
      setSort("")
      setFilter("")
      setTempFilter("")
    }
  }, [categoryId])

  // Build query parameters
  const buildParams = useMemo(() => {
    const params = {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    }

    if (categoryId) params.category = categoryId
    if (sort) params.sort = sort
    if (filter.trim()) params.filter = filter.trim()

    return params
  }, [categoryId, sort, filter, page, pageSize])

  // Fetch products when parameters change
  useEffect(() => {
    console.log('Fetching products with params:', buildParams)
    console.log('Constructed URL would be: products?' + new URLSearchParams(buildParams).toString())
    dispatch(fetchProducts(buildParams))
  }, [dispatch, buildParams])

  const pages = Math.ceil(total / pageSize)
  const isLoading = fetchState === 'FETCHING'

  // Transform API products to match existing ProductGrid component format
  const transformedProducts = useMemo(() => {
    return (productList || []).map(product => {
      // Find the category name by matching category_id
      const category = (categories || []).find(cat => cat.id === product.category_id)
      const categoryName = category?.title || "Product"

      return {
        id: product.id,
        name: product.name,
        department: categoryName, // Use actual category name
        image: product.images?.[0]?.url || "/placeholder-image.jpg",
        originalPrice: (product.price * 1.3).toFixed(2), // Mock original price
        price: product.price.toFixed(2),
        colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"], // Default colors
        rating: product.rating,
        stock: product.stock,
        category: category // Pass the full category object
      }
    })
  }, [productList, categories])

  return (
    <div className="min-h-screen px-15 bg-gray-50">
      <ShopHero />

      <ProductFilter
        total={total}
        view={view}
        onChangeView={(v) => setView(v)}
        sort={sort}
        onChangeSort={(s) => setSort(s)}
        filter={tempFilter}
        onChangeFilter={(f) => setTempFilter(f)}
        onApplyFilter={() => setFilter(tempFilter)}
      />

      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#23A6F0] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 font-medium">Loading products...</p>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && (
        <ProductGrid products={transformedProducts} view={view} />
      )}

      {/* Error State */}
      {fetchState === 'FAILED' && !isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <p className="text-red-600 font-medium mb-4">Failed to load products</p>
            <button
              onClick={() => dispatch(fetchProducts({ limit: pageSize, offset: (page - 1) * pageSize }))}
              className="px-4 py-2 bg-[#23A6F0] text-white rounded hover:bg-[#1d8bc4]"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Pagination */}
      {!isLoading && pages > 1 && (
        <Pagination page={page} pages={pages} onChange={setPage} />
      )}

      <Partners />
    </div>
  )
}
