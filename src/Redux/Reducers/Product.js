const initialState = {
    productList: [],
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
}

const productList = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PRODUCT_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false
            }
        case 'GET_PRODUCT_REJECTED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: false,
                isRejected: true,
            }
        case 'GET_PRODUCT_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                isRejected: false,
                productList: action.payload.data.data
            }
        default:
            return state
    }
}

export default productList