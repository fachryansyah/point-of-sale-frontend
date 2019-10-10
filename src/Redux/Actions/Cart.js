
export const fetchCart = () => {
    return {
        type: 'GET_CART',
        payload: new Promise((resolve) => {
            let cartsFromLocal = JSON.parse(localStorage.getItem("carts"))

            if (cartsFromLocal) {
                resolve(cartsFromLocal)
            }
        })
    }
}

export const pushCart = (product) => {
    console.log(product)
    return {
        type: 'PUSH_CART',
        payload: product
    }
}

export const addQtyCart = (index, price, limitQty) => {
    return {
        type: 'ADD_QTY_CART',
        payload: {
            index,
            price,
            limitQty
        }
    }
}

export const reduceQtyCart = (index, price) => {
    return {
        type: 'REDUCE_QTY_CART',
        payload: {
            index,
            price
        }
    }
}

export const removeCart = (index) => {
    return {
        type: 'REMOVE_CART',
        payload: index
    }
}

export const cleanCart = () =>{
    return {
        type: 'CLEAN_CART'
    }
}