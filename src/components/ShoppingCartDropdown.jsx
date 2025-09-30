import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { X, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react'
import { removeProduct, updateCount, toggleCheck, clearCart } from '../store/actions/cartActions'
import OrderModal from './OrderModal'
import OrderSuccessModal from './OrderSuccessModal'

export default function ShoppingCartDropdown({ isOpen, onClose }) {
  const dispatch = useDispatch()
  const { cart, lastOrder } = useSelector(state => state.cart)
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const [successModalOpen, setSuccessModalOpen] = useState(false)

  // Calculate totals
  const totalItems = cart.reduce((total, item) => total + item.count, 0)
  const checkedItems = cart.filter(item => item.checked)
  const totalPrice = checkedItems.reduce((total, item) => total + (item.product.price * item.count), 0)

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

  const handleCompleteOrder = () => {
    if (checkedItems.length === 0) {
      alert('Please select items to order')
      return
    }
    setOrderModalOpen(true)
  }

  const handleOrderSuccess = () => {
    setOrderModalOpen(false)
    setSuccessModalOpen(true)
    onClose() // Close the cart dropdown
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Dropdown */}
      <div className="fixed left-1/2 top-20 -translate-x-1/2 w-[90%] max-w-md bg-white border border-gray-200 rounded-lg shadow-lg z-50 md:absolute md:left-auto md:translate-x-0 md:right-0 md:top-full md:mt-2 md:w-96">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="font-bold text-gray-900">
            Sepetim ({totalItems} Ürün)
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-96 overflow-y-auto">
          {cart.length === 0 ? (
            // Empty cart
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">Sepetiniz boş</p>
            </div>
          ) : (
            // Cart items
            <div className="divide-y divide-gray-100">
              {cart.map((item, index) => (
                <div
                  key={`${item.product.id}-${index}`}
                  className={`flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors ${
                    !item.checked ? 'opacity-60' : ''
                  }`}
                >
                  {/* Checkbox */}
                  <button
                    onClick={() => handleToggleCheck(item.product.id)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      item.checked
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {item.checked && (
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>

                  {/* Product Image */}
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.images?.[0]?.url || item.product.image || '/placeholder-image.jpg'}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    {/* Product Name */}
                    <h4 className="font-medium text-gray-900 text-sm leading-tight mb-1 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {item.product.name}
                    </h4>

                    {/* Size Info */}
                    <p className="text-xs text-gray-500 mb-2">Beden: M</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {/* Minus Button */}
                        <button
                          onClick={() => handleUpdateCount(item.product.id, item.count - 1)}
                          disabled={item.count <= 1}
                          className="w-6 h-6 flex items-center justify-center bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded text-sm font-bold transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>

                        {/* Count */}
                        <span className="w-8 text-center text-sm font-medium">
                          {item.count}
                        </span>

                        {/* Plus Button */}
                        <button
                          onClick={() => handleUpdateCount(item.product.id, item.count + 1)}
                          className="w-6 h-6 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded text-sm font-bold transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>

                        {/* Trash Button */}
                        <button
                          onClick={() => handleRemoveProduct(item.product.id)}
                          className="w-6 h-6 flex items-center justify-center text-blue-500 hover:text-blue-700 transition-colors ml-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-gray-900 text-sm">
                      {(item.product.price * item.count).toFixed(2)} USD
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="bg-gray-50 p-4 border-t border-gray-200 rounded-b-lg">
            {/* Total */}
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium text-gray-700">Toplam:</span>
              <span className="font-bold text-lg text-gray-900">
                {totalPrice.toFixed(2)} USD
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Go to Cart */}
              <Link
                to="/cart"
                className="w-1/2 text-center bg-white text-black border border-gray-300 py-3 px-4 rounded-lg"
                onClick={onClose}
              >
                Sepete Git
              </Link>

              {/* Complete Order Button */}
              <button
                onClick={handleCompleteOrder}
                disabled={checkedItems.length === 0}
                className="w-1/2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                Siparişi Tamamla
              </button>
            </div>
          </div>
        )}

        {/* Order Modal */}
        <OrderModal
          isOpen={orderModalOpen}
          onClose={() => setOrderModalOpen(false)}
          onSuccess={handleOrderSuccess}
        />

        {/* Success Modal */}
        <OrderSuccessModal
          isOpen={successModalOpen}
          onClose={() => setSuccessModalOpen(false)}
          orderDetails={lastOrder}
        />
      </div>
    </>
  )
}
