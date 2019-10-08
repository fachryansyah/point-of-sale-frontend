import Http from '../../Http'

export const getProduct = (page = 1, sortBy = "created_at", sortMode = "desc", searchName = "") => {
    return {
        type: 'GET_PRODUCT',
        payload: Http.get(`/product?limit=4&page=${page}&sort=${sortBy}&mode=${sortMode}&search=${searchName}`)
    }
}