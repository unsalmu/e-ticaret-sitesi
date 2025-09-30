import api from '../../lib/api'
import { SET_USER, SET_ROLES, SET_THEME, SET_LANGUAGE, SET_ADDRESSES, UPSERT_ADDRESS, REMOVE_ADDRESS, SET_CARDS, UPSERT_CARD, REMOVE_CARD } from '../types/clientTypes'

export const setUser = (user) => ({ type: SET_USER, payload: user })
export const setRoles = (roles) => ({ type: SET_ROLES, payload: roles })
export const setTheme = (theme) => ({ type: SET_THEME, payload: theme })
export const setLanguage = (language) => ({ type: SET_LANGUAGE, payload: language })
export const setAddresses = (list) => ({ type: SET_ADDRESSES, payload: list })
export const upsertAddress = (addr) => ({ type: UPSERT_ADDRESS, payload: addr })
export const removeAddress = (id) => ({ type: REMOVE_ADDRESS, payload: id })
export const setCards = (list) => ({ type: SET_CARDS, payload: list })
export const upsertCard = (card) => ({ type: UPSERT_CARD, payload: card })
export const removeCard = (id) => ({ type: REMOVE_CARD, payload: id })

export const fetchRolesIfNeeded = () => async (dispatch, getState) => {
  const { roles } = getState().client
  if (roles && roles.length) return
  try {
    const res = await api.get('/roles')
    dispatch(setRoles(res.data || []))
  } catch (e) {
    // ignore silently
  }
}

// Thunk: login
export const login = ({ email, password, remember }) => async (dispatch) => {
  const payload = { email, password }
  const res = await api.post('/login', payload)
  const user = {
    token: res.data?.token,
    name: res.data?.name,
    email: res.data?.email,
    role_id: res.data?.role_id,
  }
  if (user.token) {
    api.defaults.headers.Authorization = user.token
  }
  if (remember && user.token) {
    try { localStorage.setItem('token', user.token) } catch (e) {}
  }
  dispatch(setUser(user))
  return user
}

export const logout = () => (dispatch) => {
  try { localStorage.removeItem('token') } catch (e) {}
  try { delete api.defaults.headers.Authorization } catch (e) {}
  dispatch(setUser(null))
}

// Initialize auth from token in localStorage
export const initAuthFromStorage = () => async (dispatch, getState) => {
  try {
    const existing = getState().client.user
    const token = (typeof localStorage !== 'undefined') ? localStorage.getItem('token') : null
    if (!token || existing) return
    api.defaults.headers.Authorization = token
    const res = await api.get('/verify')
    const data = res.data || {}
    const newToken = data.token || token
    api.defaults.headers.Authorization = newToken
    try { localStorage.setItem('token', newToken) } catch (e) {}
    dispatch(setUser({ ...data, token: newToken }))
  } catch (e) {
    try { localStorage.removeItem('token') } catch (_) {}
    delete api.defaults.headers.Authorization
  }
}

// Address thunks
export const fetchAddresses = () => async (dispatch) => {
  const res = await api.get('/user/address')
  const list = Array.isArray(res.data) ? res.data : []
  dispatch(setAddresses(list))
  return list
}

export const createAddress = (payload) => async (dispatch) => {
  const res = await api.post('/user/address', payload)
  const data = res.data || payload
  dispatch(upsertAddress(data))
  return data
}

export const updateAddressRemote = (payload) => async (dispatch) => {
  const res = await api.put('/user/address', payload)
  const data = res.data || payload
  dispatch(upsertAddress(data))
  return data
}

export const deleteAddressRemote = (id) => async (dispatch) => {
  await api.delete(`/user/address/${id}`)
  dispatch(removeAddress(id))
}

// Credit card thunks
export const fetchCards = () => async (dispatch) => {
  const res = await api.get('/user/card')
  const list = Array.isArray(res.data) ? res.data : []
  dispatch(setCards(list))
  return list
}

export const createCard = (payload) => async (dispatch) => {
  const res = await api.post('/user/card', payload)
  const data = { ...payload, ...(res.data || {}) }
  dispatch(upsertCard(data))
  return data
}

export const updateCardRemote = (payload) => async (dispatch) => {
  const res = await api.put('/user/card', payload)
  const data = { ...payload, ...(res.data || {}) }
  dispatch(upsertCard(data))
  return data
}

export const deleteCardRemote = (id) => async (dispatch) => {
  await api.delete(`/user/card/${id}`)
  dispatch(removeCard(id))
}
