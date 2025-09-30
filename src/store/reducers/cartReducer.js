import {
  SET_ADDRESS,
  SET_CART,
  SET_PAYMENT,
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

const initialState = {
  cart: [],
  payment: {},
  address: {},
  orderState: 'idle', // 'idle', 'loading', 'success', 'error'
  orderError: null,
  lastOrder: null
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return { ...state, cart: action.payload || [] }
    case SET_PAYMENT:
      return { ...state, payment: action.payload || {} }
    case SET_ADDRESS:
      return { ...state, address: action.payload || {} }

    case ADD_PRODUCT: {
      const product = action.payload
      const existingItemIndex = state.cart.findIndex(item => item.product.id === product.id)

      if (existingItemIndex >= 0) {
        // Product exists, increase count
        const updatedCart = [...state.cart]
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          count: updatedCart[existingItemIndex].count + 1
        }
        return { ...state, cart: updatedCart }
      } else {
        // New product, add to cart
        const newItem = {
          count: 1,
          checked: true,
          product: product
        }
        return { ...state, cart: [...state.cart, newItem] }
      }
    }

    case REMOVE_PRODUCT: {
      const productId = action.payload
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== productId)
      }
    }

    case UPDATE_COUNT: {
      const { productId, count } = action.payload
      if (count < 1) return state // Minimum count is 1

      const updatedCart = state.cart.map(item =>
        item.product.id === productId
          ? { ...item, count: count }
          : item
      )
      return { ...state, cart: updatedCart }
    }

    case TOGGLE_CHECK: {
      const productId = action.payload
      const updatedCart = state.cart.map(item =>
        item.product.id === productId
          ? { ...item, checked: !item.checked }
          : item
      )
      return { ...state, cart: updatedCart }
    }

    case CLEAR_CART:
      return { ...state, cart: [] }

    case CREATE_ORDER_START:
      return {
        ...state,
        orderState: 'loading',
        orderError: null
      }

    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        orderState: 'success',
        orderError: null,
        lastOrder: action.payload,
        cart: [] // Clear cart on successful order
      }

    case CREATE_ORDER_FAIL:
      return {
        ...state,
        orderState: 'error',
        orderError: action.payload
      }

    case RESET_ORDER_STATE:
      return {
        ...state,
        orderState: 'idle',
        orderError: null,
        lastOrder: null
      }

    default:
      return state
  }
}

