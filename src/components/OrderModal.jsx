import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { X, CreditCard } from 'lucide-react'
import { createOrder } from '../store/actions/cartActions'

export default function OrderModal({ isOpen, onClose, onSuccess }) {
  const dispatch = useDispatch()
  const { orderState, orderError } = useSelector(state => state.cart)

  const [formData, setFormData] = useState({
    card_name: '',
    card_no: '',
    card_expire_month: '',
    card_expire_year: '',
    card_ccv: '',
    address_id: 1
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.card_name.trim()) newErrors.card_name = 'Card name is required'
    if (!formData.card_no || formData.card_no.length < 16) newErrors.card_no = 'Valid 16-digit card number required'
    if (!formData.card_expire_month || formData.card_expire_month < 1 || formData.card_expire_month > 12) {
      newErrors.card_expire_month = 'Valid month (1-12) required'
    }
    if (!formData.card_expire_year || formData.card_expire_year < 2024) {
      newErrors.card_expire_year = 'Valid future year required'
    }
    if (!formData.card_ccv || formData.card_ccv.length < 3) newErrors.card_ccv = 'Valid 3-digit CCV required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      // Convert string values to appropriate types
      const orderData = {
        ...formData,
        card_no: parseInt(formData.card_no),
        card_expire_month: parseInt(formData.card_expire_month),
        card_expire_year: parseInt(formData.card_expire_year),
        card_ccv: parseInt(formData.card_ccv),
        address_id: formData.address_id
      }

      await dispatch(createOrder(orderData))
      onSuccess()
      onClose()

      // Reset form
      setFormData({
        card_name: '',
        card_no: '',
        card_expire_month: '',
        card_expire_year: '',
        card_ccv: '',
        address_id: 1
      })
    } catch (error) {
      console.error('Order failed:', error)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg shadow-xl z-50 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-bold text-gray-900">Complete Order</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Card Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cardholder Name
            </label>
            <input
              type="text"
              name="card_name"
              value={formData.card_name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.card_name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="John Doe"
            />
            {errors.card_name && <p className="text-red-500 text-xs mt-1">{errors.card_name}</p>}
          </div>

          {/* Card Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <input
              type="text"
              name="card_no"
              value={formData.card_no}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.card_no ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="1234567890123456"
              maxLength="16"
            />
            {errors.card_no && <p className="text-red-500 text-xs mt-1">{errors.card_no}</p>}
          </div>

          {/* Expiry Date and CCV */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Month
              </label>
              <input
                type="number"
                name="card_expire_month"
                value={formData.card_expire_month}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.card_expire_month ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="12"
                min="1"
                max="12"
              />
              {errors.card_expire_month && <p className="text-red-500 text-xs mt-1">{errors.card_expire_month}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <input
                type="number"
                name="card_expire_year"
                value={formData.card_expire_year}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.card_expire_year ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="2025"
                min="2024"
              />
              {errors.card_expire_year && <p className="text-red-500 text-xs mt-1">{errors.card_expire_year}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CCV
              </label>
              <input
                type="text"
                name="card_ccv"
                value={formData.card_ccv}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.card_ccv ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="123"
                maxLength="4"
              />
              {errors.card_ccv && <p className="text-red-500 text-xs mt-1">{errors.card_ccv}</p>}
            </div>
          </div>

          {/* Error Message */}
          {orderError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{orderError}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={orderState === 'loading'}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {orderState === 'loading' ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              'Complete Order'
            )}
          </button>
        </form>
      </div>
    </>
  )
}