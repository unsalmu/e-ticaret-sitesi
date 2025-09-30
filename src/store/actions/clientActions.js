import api from '../../lib/api'
import { SET_USER, SET_ROLES, SET_THEME, SET_LANGUAGE } from '../types/clientTypes'

export const setUser = (user) => ({ type: SET_USER, payload: user })
export const setRoles = (roles) => ({ type: SET_ROLES, payload: roles })
export const setTheme = (theme) => ({ type: SET_THEME, payload: theme })
export const setLanguage = (language) => ({ type: SET_LANGUAGE, payload: language })

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
