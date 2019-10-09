import { combineReducers } from 'redux'
import productList from './Product'
import cart from './Cart'


const rootReducer = combineReducers({
    Product: productList,
    Cart: cart
})

export default rootReducer