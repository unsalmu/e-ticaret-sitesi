import { SET_CATEGORIES, SET_FILTER, SET_FETCH_STATE, SET_LIMIT, SET_OFFSET, SET_PRODUCT_LIST, SET_SELECTED_PRODUCT, SET_TOTAL } from '../types/productTypes'

const initialState = {
  categories: [],
  productList: [],
  selectedProduct: null,
  total: 0,
  limit: 25,
  offset: 0,
  filter: '',
  fetchState: 'NOT_FETCHED',
}

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload || [] }
    case SET_PRODUCT_LIST:
      return { ...state, productList: action.payload || [] }
    case SET_TOTAL:
      return { ...state, total: Number(action.payload) || 0 }
    case SET_FETCH_STATE:
      return { ...state, fetchState: action.payload }
    case SET_LIMIT:
      return { ...state, limit: Number(action.payload) || state.limit }
    case SET_OFFSET:
      return { ...state, offset: Number(action.payload) || 0 }
    case SET_FILTER:
      return { ...state, filter: action.payload || '' }
    case SET_SELECTED_PRODUCT:
      return { ...state, selectedProduct: action.payload }
    default:
      return state
  }
}

