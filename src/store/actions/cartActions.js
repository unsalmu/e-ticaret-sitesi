import { SET_CART, SET_PAYMENT, SET_ADDRESS } from '../types/cartTypes'

export const setCart = (v) => ({ type: SET_CART, payload: v })
export const setPayment = (v) => ({ type: SET_PAYMENT, payload: v })
export const setAddress = (v) => ({ type: SET_ADDRESS, payload: v })

