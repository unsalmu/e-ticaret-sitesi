import { useDispatch, useSelector } from 'react-redux'
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react'
import { removeProduct, updateCount, toggleCheck } from '../store/actions/cartActions'
import { Link } from 'react-router-dom'

export default function CartPage() {
  const dispatch = useDispatch()
  const { cart } = useSelector(state => state.cart)

  const totalItems = cart.reduce((sum, item) => sum + item.count, 0)

  const checkedItems = cart.filter(item => item.checked)
  const totalPrice = checkedItems.reduce((total, item) => total + (item.product.price * item.count), 0)

  // Order summary values (based on selected items)
  const SHIPPING_RATE = 29.99
  const FREE_SHIPPING_THRESHOLD = 150
  const shippingPrice = checkedItems.length > 0 ? SHIPPING_RATE : 0
  const shippingDiscount = totalPrice >= FREE_SHIPPING_THRESHOLD ? shippingPrice : 0
  const grandTotal = totalPrice + shippingPrice - shippingDiscount

  const handleUpdateCount = (productId, newCount) => {
    if (newCount >= 1) {
      dispatch(updateCount(productId, newCount))
    }
  }

  const handleRemoveProduct = (productId) => {
    dispatch(removeProduct(productId))
  }

  const handleToggleCheck = (productId) => {
    dispatch(toggleCheck(productId))
  }

  return (
    <div className="container mx-auto px-4 pt-28 md:pt-40 pb-8">
      <div className="flex items-center justify-between mb-6">
      <h1 className="!text-2xl font-bold">Sepetim{'('}{totalItems}{')'}</h1>
      <Link to="/shop" className="text-blue-600 hover:underline">Alışverişe devam et</Link>
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-lg border border-gray-200">
          <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
          <p className="text-gray-600 mb-4">Sepetiniz boş</p>
          <Link to="/shop" className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">Alışverişe Başla</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Table column */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seç</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ürün</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Birim Fiyat</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Adet</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Toplam</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {cart.map((item, index) => (
                    <tr key={`${item.product.id}-${index}`} className={!item.checked ? 'opacity-60' : ''}>
                    {/* Select */}
                    <td className="px-4 py-4 align-top">
                      <button
                        onClick={() => handleToggleCheck(item.product.id)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          item.checked ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300 hover:border-gray-400'
                        }`}
                        aria-label="Seç"
                      >
                        {item.checked && (
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    </td>

                    {/* Product */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.product.images?.[0]?.url || item.product.image || '/placeholder-image.jpg'}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 line-clamp-2 max-w-xs">{item.product.name}</div>
                          {/* <div className="text-xs text-gray-500 mt-1">Beden: M</div> */}
                        </div>
                      </div>
                    </td>

                    {/* Unit Price */}
                    <td className="px-4 py-4 text-right align-top whitespace-nowrap">
                      <span className="font-medium text-gray-900">{item.product.price.toFixed(2)} TL</span>
                    </td>

                    {/* Quantity */}
                    <td className="px-4 py-4 text-center align-top">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleUpdateCount(item.product.id, item.count - 1)}
                          disabled={item.count <= 1}
                          className="w-7 h-7 flex items-center justify-center bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded"
                          aria-label="Azalt"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.count}</span>
                        <button
                          onClick={() => handleUpdateCount(item.product.id, item.count + 1)}
                          className="w-7 h-7 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded"
                          aria-label="Artır"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Row Total */}
                    <td className="px-4 py-4 text-right align-top whitespace-nowrap">
                      <span className="font-bold text-gray-900">{(item.product.price * item.count).toFixed(2)} TL</span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 text-right align-top">
                      <button
                        onClick={() => handleRemoveProduct(item.product.id)}
                        className="inline-flex items-center justify-center w-8 h-8 text-blue-500 hover:text-blue-700"
                        aria-label="Kaldır"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>

            {/* Footer summary */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border-t border-gray-200">
              <div className="text-gray-600 text-sm">
                Seçili ürün sayısı: <span className="font-medium text-gray-900">{checkedItems.length}</span>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Toplam Tutar</div>
                <div className="text-xl font-bold text-gray-900">{totalPrice.toFixed(2)} TL</div>
              </div>
            </div>
          </div>

          {/* Order Summary sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-4 lg:sticky lg:top-28 space-y-4">
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="text-lg font-bold mb-3">Sipariş Özeti</div>
                <div className="flex justify-between text-sm py-1">
                  <span className="text-gray-600">Ürünlerin Toplamı</span>
                  <span className="font-medium text-gray-900">{totalPrice.toFixed(2)} TL</span>
                </div>
                <div className="flex justify-between text-sm py-1">
                  <span className="text-gray-600">Kargo Toplamı</span>
                  <span className="font-medium text-gray-900">{shippingPrice.toFixed(2)} TL</span>
                </div>
                <div className="flex justify-between text-sm py-1">
                  <span className="text-gray-600">İndirim</span>
                  <span className="font-medium text-green-600">-{shippingDiscount.toFixed(2)} TL</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between text-base py-1">
                  <span className="font-medium text-gray-700">Toplam</span>
                  <span className="font-bold text-gray-900">{grandTotal.toFixed(2)} TL</span>
                </div>
              </div>
              <Link
                to="/order"
                className={`w-full block text-center font-bold py-3 px-4 rounded-lg transition-colors ${checkedItems.length===0 ? 'bg-gray-300 cursor-not-allowed text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                onClick={(e)=>{ if(checkedItems.length===0) e.preventDefault() }}
              >
                Kaydet ve Devam Et
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
