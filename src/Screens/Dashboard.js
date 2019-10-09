import React, { Component } from 'react'
import { toast } from 'react-toastify'
import { connect } from 'react-redux'
import { fetchProduct } from '../Redux/Actions/Product'
import { pushCart } from '../Redux/Actions/Cart'
import $ from 'jquery'
import Shimmer from 'react-shimmer-effect'
import Rupiah from 'rupiah-format'
import Http from '../Http'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from '../Components/Navbar'
import Pagination from '../Components/Pagination'
import Sidebar from '../Components/Sidebar'
import ModalCheckout from '../Components/Modals/ModalCheckout'

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            carts: [],
            products: [],
            cartToggle: true,
            sortBy: "created_at",
            sortMode: "desc",
            searchName: "",
            checkout: {
                receiptNo: "",
                totalOrderPrice: 0,
                order_items: []
            },
            isLoading: true,
            isLoadingCheckout: false
        }
    }

    async componentDidMount(){
        this.getDataProducts()
    }

    async getDataProducts(page = 1, sortBy = "created_at", sortMode = "desc", searchName = ""){
        await this.props.dispatch(fetchProduct(page, sortBy, sortMode, searchName))
        this.setState({
            searchName: searchName
        })
    }

    async addToCart(product){
        const { id, name, image, price } = product

        let isProductAlreadyAdded = false

        if (this.props.cart.cartList != null && this.props.cart.cartList.length > 0) {
            isProductAlreadyAdded = this.props.cart.cartList.find(cart => cart.id == id)
        }

        if (!isProductAlreadyAdded) {
            let cart = { id, name, image, qty: 1, price }

            await this.props.dispatch(pushCart(cart))

            await localStorage.setItem("carts", JSON.stringify(this.props.cart.cartList))
        }else{
            toast.success("Product already in cart!", {
                className: "bg-danger-gradient"
            })
        }

    }

    checkProductInCart(productId){
        let isInCart = false

        if (this.props.cart.cartList != null && this.props.cart.cartList.length > 0) {
            isInCart = this.props.cart.cartList.find(cart => cart.id === productId)
        }

        return isInCart
    }

    async recudeQtyProduct(index){
        let cart = this.state.carts
        let product = await this.state.products.find((product) => {
            return product.id == cart[index].id
        })

        cart[index].qty -= 1
        cart[index].price -= product.price

        console.log(product.price)

        if (cart[index].qty < 1) {
            cart[index].qty = 1
            cart[index].price = product.price
        }

        this.setState({
            carts: cart
        })
    }

    __renderProductList(){
        let element = []
        if (this.props.product.isLoading) {
            for (var i = 0; i < 4; i++) {
                element.push(
                    <div className="col-md-3 mt-5" key={i}>
                        <div className="card custom-shadow" style={{marginTop: "76px"}}>
                            <Shimmer>
                                <div className="shimmer-image"></div>
                            </Shimmer>
                            <div className="card-body custom-card-body">
                                <Shimmer>
                                    <div className="shimmer-line-long"></div>
                                </Shimmer>
                                <Shimmer>
                                    <div className="shimmer-line"></div>
                                </Shimmer>
                            </div>
                        </div>
                    </div>
                )
            }
        }else{
            this.props.product.productList.results.map((val, key) => {
                element.push(
                    <div className="col-md-3 mt-5" key={val.id}>
                        <div className="card custom-shadow" style={{marginTop: "76px"}}>
                            <img src={`${process.env.REACT_APP_BASE_URL}/images/` + val.image} className="img-product" alt="Product Image" />
                            <div className="card-body custom-card-body">
                                <h5 className="card-title">{ val.name }</h5>
                                <h5>
                                    <span className="badge badge-danger">{ Rupiah.convert(val.price) }</span>&nbsp;
                                    <span className="badge badge-info">{ val.qty }</span>
                                </h5>
                                <button className="btn btn-danger btn-sm btn-block mt-3" onClick={() => this.addToCart(val)} disabled={this.checkProductInCart(val.id) ? true : false}>
                                    <i className={ this.checkProductInCart(val.id) ? 'fa fa-check mr-2' : 'fa fa-cart-plus mr-2' }></i>
                                    { this.checkProductInCart(val.id) ? 'Added to cart' : 'Add to cart' }
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })
        }

        return element
    }


    render(){
        return(
            <div>
                <Sidebar />
                <Navbar />

                <ModalCheckout
                    checkout={this.state.checkout}
                    modalId="modalCheckout" />

                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-11 mt-5">
                        <div className="mt-5">
                            <div className="nav justify-content-start">
                                <div className="d-flex flex-row mr-3">
                                    <div className="custom-control custom-radio mt-2 mr-2">
                                        <input name="custom-radio-1" className="custom-control-input" id="radioAsc" type="radio"
                                            value={this.props.product.sortMode}
                                            checked={this.props.product.sortMode == "asc" ? true : false}
                                            onChange={() => this.getDataProducts(
                                                this.props.product.currentPage,
                                                this.props.product.sortBy,
                                                "asc"
                                            )}
                                        />
                                        <label className="custom-control-label" htmlFor="radioAsc">Ascending</label>
                                    </div>
                                    <div className="custom-control custom-radio mt-2">
                                        <input name="custom-radio-1" className="custom-control-input" id="radioDesc" type="radio"
                                            value={this.props.product.sortMode}
                                            checked={this.props.product.sortMode == "desc" ? true : false}
                                            onChange={() => this.getDataProducts(
                                                this.props.product.currentPage,
                                                this.props.product.sortBy,
                                                "desc"
                                            )}
                                         />
                                        <label className="custom-control-label" htmlFor="radioDesc">Descending</label>
                                    </div>
                                </div>
                                <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Sort by {this.props.product.sortBy == "created_at" ? "Latest" : this.props.product.sortBy}
                                </button>
                                <div className="dropdown-menu">
                                    <button className="dropdown-item" onClick={() => this.getDataProducts(this.props.product.currentPage, "name", this.props.product.sortMode)}>
                                        Name
                                    </button>
                                    <button className="dropdown-item" onClick={() => this.getDataProducts(this.props.product.currentPage, "price", "asc")}>Cheapest</button>
                                    <button className="dropdown-item" onClick={() => this.getDataProducts(this.props.product.currentPage, "price", "desc")}>Expensive</button>
                                    <button className="dropdown-item" onClick={() => this.getDataProducts(this.props.product.currentPage, "created_at", "desc")}>Latest</button>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" onClick={() => this.getDataProducts(this.props.product.currentPage, "created_at", "desc")}>Reset</a>
                                </div>
                            </div>
                        </div>

                        <div className="container-fluid  row mt-4">
                            {this.__renderProductList()}
                        </div>

                        <div className="nav justify-content-center mt-5">
                            <Pagination />
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.Product,
        cart: state.Cart
    }
}

export default connect(mapStateToProps) (Dashboard)
