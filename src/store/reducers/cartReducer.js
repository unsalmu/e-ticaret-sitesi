import { SET_ADDRESS, SET_CART, SET_PAYMENT } from '../types/cartTypes'

const initialState = {
  cart: [],
  payment: {},
  address: {},
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return { ...state, cart: action.payload || [] }
    case SET_PAYMENT:
      return { ...state, payment: action.payload || {} }
    case SET_ADDRESS:
      return { ...state, address: action.payload || {} }
    default:
      return state
  }
}

