import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCart, addQtyCart, reduceQtyCart, removeCart, cleanCart } from '../Redux/Actions/Cart'
import $ from 'jquery'
import { toast } from 'react-toastify'
import Rupiah from 'rupiah-format'
import Http from '../Http'
import ModalCheckout from './Modals/ModalCheckout'

class CartView extends Component {

    constructor(props){
        super(props)
        this.state = {
            checkout: {
                receiptNo: "",
                totalOrderPrice: 0,
                order_items: []
            },
            modalId: "modalCheckout",
            isLoadingCheckout: false
        }
    }

    componentDidMount(){
        this.getDataCarts()
    }

    async getDataCarts(){
        await this.props.dispatch(fetchCart())
    }

    async checkoutProduct(){

        if (this.props.cart.cartList.length < 1) {
            return toast.error("No product in cart", {
                className: 'bg-danger'
            })
        }

        this.setState({
            isLoadingCheckout: true
        })

        let amount = 0
        if (this.props.cart.cartList != null && this.props.cart.cartList.length > 0) {
            this.props.cart.cartList.forEach((val, key) => {
                amount += val.price
            })
        }

        await Http.post('/order', JSON.stringify({
                amount: amount,
                items: this.props.cart.cartList
            }), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then( async (res) => {
            if (res.data.status == 200) {
                this.setState({
                    checkout: res.data.data,
                    isLoadingCheckout: false
                })
                await this.cancelCheckout()
                $(`#${this.state.modalId}`).modal("show")
            }
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    async removeFromCart(index){
        await this.props.dispatch(removeCart(index))
        await localStorage.setItem("carts", JSON.stringify(this.props.cart.cartList))
    }

    async cancelCheckout(){
        await this.props.dispatch(cleanCart())
        await localStorage.setItem("carts", JSON.stringify(this.props.cart.cartList))
    }

    async addQtyProduct(index){
        let cart = this.props.cart.cartList

        await this.props.dispatch(addQtyCart(index, cart[index].currentPrice, cart[index].currentQty))
        await localStorage.setItem("carts", JSON.stringify(this.props.cart.cartList))
    }

    async recudeQtyProduct(index){
        let cart = this.props.cart.cartList

        await this.props.dispatch(reduceQtyCart(index, cart[index].currentPrice))
        await localStorage.setItem("carts", JSON.stringify(this.props.cart.cartList))
    }

    __renderCartList(){
        let element = []
        if (this.props.cart.cartList === null || this.props.cart.cartList.length < 1) {
            element.push(
                <li className="text-center m-auto" key="1">
                    <img src={require('../Assets/img/undraw_empty_cart.svg')} className="img-fluid-50" />
                    <h4 className="mt-2">No product here</h4>
                </li>
            )
        }else{
            this.props.cart.cartList.map((val, key) => {
                element.push(
                    <li className="list-group-item no-border d-flex flex-row" key={key}>
                        <img src={`${process.env.REACT_APP_BASE_URL}/images/` + val.image} style={{ width: "100px", height: "70px" }} alt="Product Image" />
                        <div className="ml-2">
                            <h6>{ val.name }</h6>
                            <p><span className="badge badge-primary">{ val.qty }</span></p>
                            <div className="d-flex flex-row">
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => this.recudeQtyProduct(key)}><i className="fa fa-minus" /></button>
                                    <button type="button" className="btn btn-outline-success btn-sm" onClick={() => this.addQtyProduct(key)}><i className="fa fa-plus" /></button>
                                </div>
                                <p className="p-0 m-0 ml-2"><span className="badge badge-danger">{ Rupiah.convert(val.price) }</span></p>
                            </div>
                            <div className="d-flex flex-column mt-1">
                                <button className="btn btn-outline-danger btn-sm btn-block" onClick={() => this.removeFromCart(key)}>Remove</button>
                            </div>
                        </div>
                    </li>
                )
            })
        }
        return element
    }

    __renderTotalCart(){
        let total = 0
        if (this.props.cart.cartList != null && this.props.cart.cartList.length > 0) {
            this.props.cart.cartList.forEach((val, key) => {
                total += val.price
            })
        }
        return (<b>{Rupiah.convert(total)}</b>)
    }

    __renderBtnCheckout(){
        if (this.state.isLoadingCheckout) {
            return(<div className="lds-ripple"><div></div><div></div></div>)
        }else{
            return(<button className="btn btn-success btn-sm btn-block" onClick={() => this.checkoutProduct()}>Checkout</button>)
        }
    }

    render(){
        return(
            <div>
                <ModalCheckout
                    checkout={this.state.checkout}
                    modalId={this.state.modalId}
                />
                <div className="cartnav">
                    <div className="bg-white h-match-parent cart-fix shadow">
                        <div className="p-2 bg-red text-center">
                            <h6 className="text-white font-weight-bold mt-2">Cart <span className="badge badge-white">{ (this.state.carts != null && this.state.carts.length < 1) ? this.state.carts.length : 0 }</span></h6>
                        </div>
                        <div className="pr-3 mt-3">
                            <ul className="list-group pr-2 pl-2 scrollview">
                                { this.__renderCartList() }
                            </ul>
                            <div className="row custom-footer ml-1">
                                <div className="col-md-12 mb-1">
                                    <div className="d-flex flex-row">
                                        <div className="mr-auto">
                                            <b>Total: </b>
                                        </div>
                                        <div className="ml-auto">
                                            {this.__renderTotalCart()}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 ml-auto">
                                    {this.__renderBtnCheckout()}
                                </div>
                                <div className="col-md-6">
                                    <button className="btn btn-danger btn-sm btn-block" onClick={() => this.cancelCheckout()}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        product: state.Product,
        cart: state.Cart
    }
}

export default connect(mapStateToProps)(CartView)