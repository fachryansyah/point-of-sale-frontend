import Http from '../../Http'

export const fetchProduct = (page = 1, sortBy = "created_at", sortMode = "desc", searchName = "") => {
    return {
        type: 'GET_PRODUCT',
        payload: new Promise((resolve, reject) => {
            Http.get(`/product?limit=4&page=${page}&sort=${sortBy}&mode=${sortMode}&search=${searchName}`)
            .then(res => {
                resolve({
                    res,
                    sortBy,
                    sortMode,
                    searchName
                })
            })
            .catch(err => {
                reject(err)
            })
        })
    }
}

export const pushProduct = (product) => {
    return {
        type: 'PUSH_PRODUCT',
        payload: product
    }
}