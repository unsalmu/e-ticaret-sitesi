import { SET_CATEGORIES, SET_PRODUCT_LIST, SET_TOTAL, SET_FETCH_STATE, SET_LIMIT, SET_OFFSET, SET_FILTER } from '../types/productTypes'
import api from '../../lib/api'

export const setCategories = (v) => ({ type: SET_CATEGORIES, payload: v })
export const setProductList = (v) => ({ type: SET_PRODUCT_LIST, payload: v })
export const setTotal = (v) => ({ type: SET_TOTAL, payload: v })
export const setFetchState = (v) => ({ type: SET_FETCH_STATE, payload: v })
export const setLimit = (v) => ({ type: SET_LIMIT, payload: v })
export const setOffset = (v) => ({ type: SET_OFFSET, payload: v })
export const setFilter = (v) => ({ type: SET_FILTER, payload: v })

export const fetchCategoriesIfNeeded = () => async (dispatch, getState) => {
  const { categories } = getState().product
  if (categories && categories.length) return
  try {
    dispatch(setFetchState('FETCHING'))
    const res = await api.get('/categories')
    dispatch(setCategories(res.data || []))
    dispatch(setFetchState('FETCHED'))
  } catch (e) {
    console.error('Failed to fetch categories:', e)
    dispatch(setFetchState('FAILED'))
  }
}

export const fetchProducts = (params = {}) => async (dispatch) => {
  try {
    dispatch(setFetchState('FETCHING'))
    const res = await api.get('/products', { params })
    const { products = [], total = 0 } = res.data || {}

    dispatch(setProductList(products))
    dispatch(setTotal(total))
    dispatch(setFetchState('FETCHED'))

    return { products, total }
  } catch (e) {
    console.error('Failed to fetch products:', e)
    dispatch(setFetchState('FAILED'))
    throw e
  }
}
