import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { thunk } from 'redux-thunk'
import client from './reducers/clientReducer'
import product from './reducers/productReducer'
import cart from './reducers/cartReducer'

// Simple logger middleware (avoids extra dependency)
const logger = () => next => action => {
  try {
    return next(action)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Redux error', e)
    throw e
  }
}

const rootReducer = combineReducers({ client, product, cart })

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, logger)))

export default store
