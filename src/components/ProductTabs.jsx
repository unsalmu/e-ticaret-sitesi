import { useState } from "react"
import detailImg from "../assets/card-item-product-detail.png"

export default function ProductTabs() {
  const [tab, setTab] = useState("description")

  const TabButton = ({ id, children }) => (
    <button
      onClick={() => setTab(id)}
      className={`px-4 py-3 text-sm font-bold border-b-2 rounded-none bg-transparent transition-colors ${
        tab === id ? "border-[#23A6F0] text-[#252B42]" : "border-transparent text-gray-500 hover:text-gray-700"
      }`}
    >
      {children}
    </button>
  )

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Tabs */}
        <div className="flex items-center justify-center gap-6 overflow-x-auto">
          <TabButton id="description">Description</TabButton>
          <TabButton id="additional">Additional Information</TabButton>
          <TabButton id="reviews">Reviews (0)</TabButton>
        </div>

        {/* Content */}
        <div className="py-10 border-t border-gray-200 mt-2">
          {tab === "description" && (
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left image */}
              <div className="w-full md:w-1/3">
                <img src={detailImg} alt="Product detail" className="w-full h-auto rounded" />
              </div>
              {/* Middle text */}
              <div className="w-full md:w-1/3">
                <h3 className="text-xl font-bold text-gray-900 mb-4">the quick fox jumps over</h3>
                <div className="text-sm text-gray-600 leading-relaxed space-y-4">
                  <p>Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequat door ENIM RELIT Mollie.</p>
                  <p>Excitation venial consequat sent nostrum met. Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.</p>
                </div>
              </div>
              {/* Right lists */}
              <div className="w-full md:w-1/3">
                <h3 className="text-xl font-bold text-gray-900 mb-4">the quick fox jumps over</h3>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  {[1,2,3,4].map((i) => (
                    <li key={`a-${i}`} className="flex items-start gap-2">
                      <svg className="w-4 h-4 mt-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M7 5l5 5-5 5"/></svg>
                      <span>the quick fox jumps over the lazy dog</span>
                    </li>
                  ))}
                </ul>
                <h3 className="text-xl font-bold text-gray-900 mb-4">the quick fox jumps over</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  {[1,2,3].map((i) => (
                    <li key={`b-${i}`} className="flex items-start gap-2">
                      <svg className="w-4 h-4 mt-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M7 5l5 5-5 5"/></svg>
                      <span>the quick fox jumps over the lazy dog</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {tab === "additional" && (
            <div className="text-sm text-gray-600">
              <p>Material: Cotton 100%</p>
              <p>Dimensions: 40 x 60 x 10 cm</p>
              <p>Country: Italy</p>
            </div>
          )}

          {tab === "reviews" && (
            <div className="text-sm text-gray-600">No reviews yet.</div>
          )}
        </div>
      </div>
    </section>
  )
}
