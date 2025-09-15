import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function ProductImageGallery({ images = [] }) {
  const [current, setCurrent] = useState(0)
  const hasImages = images && images.length > 0
  const main = hasImages ? images[current] : undefined

  const prev = () => {
    if (!hasImages) return
    setCurrent((i) => (i - 1 + images.length) % images.length)
  }

  const next = () => {
    if (!hasImages) return
    setCurrent((i) => (i + 1) % images.length)
  }

  return (
    <div className="w-full">
      {/* Main image */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden mx-auto w-[calc(100vw-2rem)] md:w-auto">
        {main && (
          <img
            src={main}
            alt="Product"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.03]"
          />
        )}

        {/* Carousel controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full"
            >
              <ChevronLeft className="w-15 h-15 text-gray-100" strokeWidth={1} />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full"
            >
              <ChevronRight className="w-15 h-15 text-gray-100" strokeWidth={1} />
            </button>
          </>
        )}
      </div>

      {/* Thumbs */}
      {images.length > 1 && (
        <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`shrink-0 w-20 h-20 border ${
                i === current ? "border-[#23A6F0]" : "border-gray-200"
              } overflow-hidden bg-white`}
              aria-label={`Show image ${i + 1}`}
            >
              <img src={src} alt="Thumbnail" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
