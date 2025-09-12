import ShopHero from "../components/ShopHero";
import ProductFilter from "../components/ProductFilter";
import ProductGrid from "../components/ProductGrid";
import Pagination from "../components/Pagination";
import Partners from "../components/Partners";
import product1 from "../assets/product-1.png";
import product2 from "../assets/product-2.png";
import product3 from "../assets/product-3.png";
import product4 from "../assets/product-4.png";
import product5 from "../assets/product-5.png";
import product6 from "../assets/product-6.png";
import product7 from "../assets/product-7.png";
import product8 from "../assets/product-8.png";

import { useMemo, useState } from "react";

export default function ShopPage() {
  const allBase = [
    product1,
    product2,
    product3,
    product4,
    product5,
    product6,
    product7,
    product8,
  ]

  // Build 36 items for 3 pages of 12 each (per design)
  const allProducts = useMemo(() => {
    const items = []
    for (let i = 0; i < 36; i++) {
      const idx = i % allBase.length
      items.push({
        id: i + 1,
        name: "Graphic Design",
        department: "English Department",
        image: allBase[idx],
        originalPrice: "16.48",
        price: "6.48",
        colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"],
      })
    }
    return items
  }, [])

  const [view, setView] = useState("grid")
  const [sort, setSort] = useState("popularity")
  const [page, setPage] = useState(1)
  const pageSize = 12
  const pages = Math.ceil(allProducts.length / pageSize)

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize
    return allProducts.slice(start, start + pageSize)
  }, [allProducts, page])

  return (
    <div className="min-h-screen px-15 bg-gray-50">
      <ShopHero />

      <ProductFilter
        total={allProducts.length}
        view={view}
        onChangeView={(v) => setView(v)}
        sort={sort}
        onChangeSort={(s) => setSort(s)}
        onOpenFilter={() => {}}
      />

      <ProductGrid products={pageItems} view={view} />

      <Pagination page={page} pages={pages} onChange={setPage} />

      <Partners />
    </div>
  )
}
