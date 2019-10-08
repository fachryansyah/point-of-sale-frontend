import { combineReducers } from 'redux'
import productList from './Product'

const rootReducer = combineReducers({
    Product: productList
})

export default rootReducer