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
        default:
            return state
    }
}

export default productList