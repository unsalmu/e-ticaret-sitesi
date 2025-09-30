import { SET_LANGUAGE, SET_ROLES, SET_THEME, SET_USER, SET_ADDRESSES, UPSERT_ADDRESS, REMOVE_ADDRESS, SET_CARDS, UPSERT_CARD, REMOVE_CARD } from '../types/clientTypes'

const initialState = {
  user: null,
  addressList: [],
  creditCards: [],
  roles: [],
  theme: 'light',
  language: 'en',
}

export default function clientReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload }
    case SET_ADDRESSES:
      return { ...state, addressList: action.payload || [] }
    case UPSERT_ADDRESS: {
      const addr = action.payload
      if (!addr) return state
      const list = Array.isArray(state.addressList) ? [...state.addressList] : []
      const idx = list.findIndex(a => a.id === addr.id)
      if (idx >= 0) list[idx] = { ...list[idx], ...addr }
      else list.push(addr)
      return { ...state, addressList: list }
    }
    case REMOVE_ADDRESS:
      return { ...state, addressList: (state.addressList || []).filter(a => a.id !== action.payload) }
    case SET_ROLES:
      return { ...state, roles: action.payload || [] }
    case SET_CARDS:
      return { ...state, creditCards: action.payload || [] }
    case UPSERT_CARD: {
      const card = action.payload
      if (!card) return state
      const list = Array.isArray(state.creditCards) ? [...state.creditCards] : []
      const idx = list.findIndex(c => c.id === card.id)
      if (idx >= 0) list[idx] = { ...list[idx], ...card }
      else list.push(card)
      return { ...state, creditCards: list }
    }
    case REMOVE_CARD:
      return { ...state, creditCards: (state.creditCards || []).filter(c => c.id !== action.payload) }
    case SET_THEME:
      return { ...state, theme: action.payload }
    case SET_LANGUAGE:
      return { ...state, language: action.payload }
    default:
      return state
  }
}
