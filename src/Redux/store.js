import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'

import reducers from './Reducers/index'

const logger = createLogger()
const store = createStore(
    reducers, 
    applyMiddleware(logger, promiseMiddleware)
)

export default store