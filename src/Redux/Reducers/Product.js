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
            break;
        case 'GET_PRODUCT_REJECTED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: false,
                isRejected: true,
            }
            break;
        case 'GET_PRODUCT_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                isRejected: false,
                productList: action.payload.data.data
            }
            break;
        default:
            return state
            break;
    }
}

export default productList