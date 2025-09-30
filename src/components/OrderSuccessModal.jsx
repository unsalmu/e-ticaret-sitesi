import { CheckCircle, X } from 'lucide-react'

export default function OrderSuccessModal({ isOpen, onClose, orderDetails }) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg shadow-xl z-50 p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Success Content */}
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto mb-6">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
          </div>

          {/* Success Message */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🎉 Congratulations!
          </h2>

          <p className="text-gray-600 text-lg mb-2">
            Your order has been successfully placed!
          </p>

          <p className="text-gray-500 text-sm mb-6">
            Thank you for your purchase. You will receive a confirmation email shortly.
          </p>

          {/* Order Details */}
          {orderDetails && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-2">Order Details</h3>
              <div className="space-y-1 text-sm text-gray-600">
                {orderDetails.id && (
                  <p><span className="font-medium">Order ID:</span> #{orderDetails.id}</p>
                )}
                {orderDetails.total && (
                  <p><span className="font-medium">Total:</span> ${orderDetails.total?.toFixed(2)} USD</p>
                )}
                <p><span className="font-medium">Status:</span> Processing</p>
              </div>
            </div>
          )}

          {/* Continue Shopping Button */}
          <button
            onClick={onClose}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  )
}