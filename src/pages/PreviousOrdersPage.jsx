import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../store/actions/cartActions'
import { ChevronDown, ChevronRight, Package, Calendar, CreditCard, MapPin } from 'lucide-react'

export default function PreviousOrdersPage() {
  const dispatch = useDispatch()
  const { orders, ordersState, ordersError } = useSelector(state => state.cart)
  const [expandedOrders, setExpandedOrders] = useState(new Set())

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  const toggleOrderExpansion = (orderId) => {
    const newExpanded = new Set(expandedOrders)
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId)
    } else {
      newExpanded.add(orderId)
    }
    setExpandedOrders(newExpanded)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getOrderStatus = (order) => {
    // Simple status logic - you can enhance this based on your API
    return order.status || 'Completed'
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'processing':
      case 'preparing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (ordersState === 'loading') {
    return (
      <div className="container mx-auto px-4 pt-28 md:pt-40 pb-10">
        <div className="flex justify-center items-center py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#23A6F0] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 font-medium">Loading your orders...</p>
          </div>
        </div>
      </div>
    )
  }

  if (ordersState === 'error') {
    return (
      <div className="container mx-auto px-4 pt-28 md:pt-40 pb-10">
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <p className="text-red-600 font-medium mb-4">Failed to load orders</p>
            <p className="text-gray-500 text-sm mb-4">{ordersError}</p>
            <button
              onClick={() => dispatch(fetchOrders())}
              className="px-4 py-2 bg-[#23A6F0] text-white rounded hover:bg-[#1d8bc4]"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 pt-28 md:pt-40 pb-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="!text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-500">View your order history and track your purchases</p>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="text-center py-20">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">No orders yet</h3>
          <p className="text-gray-500 mb-6">When you place your first order, it will appear here.</p>
          <a
            href="/shop"
            className="inline-block px-6 py-3 bg-[#23A6F0] text-white rounded-lg hover:bg-[#1d8bc4] transition-colors"
          >
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            >
              {/* Order Header */}
              <div className="p-6 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Order #{order.id}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(order.order_date)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Package className="w-4 h-4" />
                          {order.products?.length || 0} items
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        ${order.price?.toFixed(2) || '0.00'}
                      </div>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(getOrderStatus(order))}`}>
                        {getOrderStatus(order)}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleOrderExpansion(order.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {expandedOrders.has(order.id) ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expandable Order Details */}
              {expandedOrders.has(order.id) && (
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Order Items */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        Order Items
                      </h4>
                      <div className="space-y-3">
                        {(order.products || []).map((item, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                              <Package className="w-6 h-6 text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-900">
                                Product ID: {item.product_id}
                              </h5>
                              <div className="text-sm text-gray-600">
                                Quantity: {item.count} • {item.detail || 'Standard'}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Details */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Order Details</h4>
                      <div className="space-y-4">
                        {/* Payment Info */}
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            Payment Information
                          </h5>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>Card: **** **** **** {String(order.card_no || '').slice(-4)}</p>
                            <p>Cardholder: {order.card_name || 'N/A'}</p>
                            <p>Expires: {order.card_expire_month || 'N/A'}/{order.card_expire_year || 'N/A'}</p>
                          </div>
                        </div>

                        {/* Delivery Info */}
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Delivery Information
                          </h5>
                          <div className="text-sm text-gray-600">
                            <p>Address ID: {order.address_id || 'Default Address'}</p>
                            <p>Status: {getOrderStatus(order)}</p>
                          </div>
                        </div>

                        {/* Price Breakdown */}
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-2">Price Summary</h5>
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Total Amount:</span>
                              <span className="font-medium text-gray-900">${order.price?.toFixed(2) || '0.00'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}