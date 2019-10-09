const initialState = {
    productList: [],
    isLoading: true,
    sortBy: "created_at",
    sortMode: "desc",
    searchName: "",
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
                sortBy: action.payload.sortBy,
                sortMode: action.payload.sortMode,
                searchName: action.payload.searchName,
                productList: action.payload.res.data.data
            }
        case 'PUSH_PRODUCT':
            return {
                ...state,
                productList: action.payload
            }
        case 'REMOVE_PRODUCT':
            const productIndex = state.productList.results.map(val => {
                return val.id
            }).indexOf(action.payload)

            delete state.productList.results[productIndex]

            return {
                ...state,
                productList: state.productList
            }
        default:
            return state
    }
}

export default productList