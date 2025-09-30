import {
  SET_CART,
  SET_PAYMENT,
  SET_ADDRESS,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  UPDATE_COUNT,
  TOGGLE_CHECK,
  CLEAR_CART,
  CREATE_ORDER_START,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  RESET_ORDER_STATE
} from '../types/cartTypes'
import api from '../../lib/api'

export const setCart = (v) => ({ type: SET_CART, payload: v })
export const setPayment = (v) => ({ type: SET_PAYMENT, payload: v })
export const setAddress = (v) => ({ type: SET_ADDRESS, payload: v })

// Shopping cart actions
export const addProduct = (product) => ({ type: ADD_PRODUCT, payload: product })
export const removeProduct = (productId) => ({ type: REMOVE_PRODUCT, payload: productId })
export const updateCount = (productId, count) => ({ type: UPDATE_COUNT, payload: { productId, count } })
export const toggleCheck = (productId) => ({ type: TOGGLE_CHECK, payload: productId })
export const clearCart = () => ({ type: CLEAR_CART })

// Order action creators
export const createOrderStart = () => ({ type: CREATE_ORDER_START })
export const createOrderSuccess = (order) => ({ type: CREATE_ORDER_SUCCESS, payload: order })
export const createOrderFail = (error) => ({ type: CREATE_ORDER_FAIL, payload: error })
export const resetOrderState = () => ({ type: RESET_ORDER_STATE })

// Async order action
export const createOrder = (orderData) => async (dispatch, getState) => {
  try {
    dispatch(createOrderStart())

    // Get cart state to prepare order payload
    const { cart } = getState().cart
    const checkedItems = cart.filter(item => item.checked)

    if (checkedItems.length === 0) {
      throw new Error('No items selected for order')
    }

    // Calculate total price from checked items
    const totalPrice = checkedItems.reduce((total, item) => total + (item.product.price * item.count), 0)

    // Prepare products array for API
    const products = checkedItems.map(item => ({
      product_id: item.product.id,
      count: item.count,
      detail: "default" // You can customize this based on product variants
    }))

    // Prepare final payload
    const payload = {
      address_id: orderData.address_id || 1, // Default address
      order_date: new Date().toISOString(),
      card_no: orderData.card_no,
      card_name: orderData.card_name,
      card_expire_month: orderData.card_expire_month,
      card_expire_year: orderData.card_expire_year,
      card_ccv: orderData.card_ccv,
      price: totalPrice,
      products: products
    }

    const response = await api.post('/order', payload)

    dispatch(createOrderSuccess(response.data))

    // Clear cart after successful order
    dispatch(clearCart())

    return response.data
  } catch (error) {
    console.error('Order creation failed:', error)
    dispatch(createOrderFail(error.response?.data?.message || error.message))
    throw error
  }
}

