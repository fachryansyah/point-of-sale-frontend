import React, { Component } from 'react'
import { toast } from 'react-toastify'
import { connect } from 'react-redux'
import { getProduct } from '../Redux/Actions/Product'
import $ from 'jquery'
import Shimmer from 'react-shimmer-effect'
import Rupiah from 'rupiah-format'
import Http from '../Http'
import 'react-toastify/dist/ReactToastify.css'
// import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import ModalCheckout from '../Components/ModalCheckout'

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
            currentPage: 1,
            totalPage: 0,
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
        // this.getDataProducts()
        this.getProduct()

        let cartsFromLocal = await JSON.parse(localStorage.getItem("carts"))

        if (cartsFromLocal) {
            await this.setState({
                carts: cartsFromLocal
            })
        }
        
        console.log(this.state.carts)
    }

    async getDataProducts(page = 1, sortBy = "created_at", sortMode = "desc", searchName = ""){
        this.setState({
            isLoading: true
        })
        await Http.get(`/product?limit=4&page=${page}&sort=${sortBy}&mode=${sortMode}&search=${searchName}`)
        .then((res) => {
            this.setState({
                products: res.data.data.results,
                sortBy: sortBy,
                sortMode: sortMode,
                searchName: searchName,
                currentPage: res.data.data.currentPage,
                totalPage: res.data.data.totalPage,
                isLoading: false
            })
        })
        .catch((err) => {
            this.setState({
                isLoading: false
            })
            console.log(err.message)
        })
    }

    async getProduct(){
        await this.props.dispatch(getProduct())
        console.log(this.props.data.productList)
        this.setState({
            products: this.props.data.productList,
            isLoading: false
        })
    }

    async searchDataProducts(e){
        if (e.key == 'Enter') {
            await this.getDataProducts(
                1,
                this.state.sortBy,
                this.state.sortMode,
                e.target.value
            )
        }
    }

    async addToCart(product){
        const { id, name, image, qty, price } = product

        let isProductAlreadyAdded = false

        if (this.state.carts != null && this.state.carts.length > 0) {
            isProductAlreadyAdded = this.state.carts.find(cart => cart.id == id)
        }

        if (!isProductAlreadyAdded) {
            let cart = { id, name, image, qty: 1, price }

            await this.setState({
                carts: [...this.state.carts, cart]
            })

            await localStorage.setItem("carts", JSON.stringify(this.state.carts))

            console.log(this.state.carts)
        }else{
            toast.success("Product already in cart!", {
                className: "bg-danger-gradient"
            })
        }

    }

    removeFromCart(index){
        let carts = this.state.carts
        carts.splice(index, 1)
        this.setState({
            carts: carts
        })
        localStorage.setItem("carts", JSON.stringify(carts))
    }

    checkProductInCart(productId){
        let cart = false

        if (this.state.carts != null && this.state.carts.length > 0) {
            cart = this.state.carts.find(cart => cart.id === productId)
        }

        return cart
    }

    async addQtyProduct(index){
        let cart = this.state.carts
        let product = await this.state.products.find((product) => {
            return product.id == cart[index].id
        })

        cart[index].qty += 1
        cart[index].price += product.price

        this.setState({
            carts: cart
        })
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

    cancelCheckout(){
        this.setState({
            carts: []
        })
    }

    async checkoutProduct(){

        if (this.state.carts.length < 1) {
            return toast.error("No product in cart", {
                className: 'bg-danger'
            })
        }

        this.setState({
            isLoadingCheckout: true
        })

        await Http.post('/order', JSON.stringify({items: this.state.carts}), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((res) => {
            console.log(res.data)
            if (res.data.status == 200) {
                this.setState({
                    checkout: res.data.data,
                    isLoadingCheckout: false
                })
                this.cancelCheckout()
                $("#modalCheckout").modal("show")
            }
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    showModalCheckout(){
        $("#modalCheckout").modal("show")
    }

    __toggleCartnav(){
        if (this.state.cartToggle) {
            $(".cartnav").addClass("active")
            this.setState({
                cartToggle: false
            })
        }else{
            $(".cartnav").removeClass("active")
            this.setState({
                cartToggle: true
            })
        }
    }

    __renderProductList(){
        let element = []
        if (this.state.isLoading) {
            for (var i = 0; i < 8; i++) {
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
            this.state.products.results.map((val, key) => {
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

    __renderPagination(){
        let element = []
        for (let i = 1; i < this.state.totalPage+1; i++) {
            element.push(
                <li key={i} className={i == this.state.currentPage ? "page-item active" : "page-item"}>
                    <button className={i == this.state.currentPage ? "page-link bg-danger no-border" : "page-link"}
                    onClick={() => this.getDataProducts(
                        i,
                        this.state.sortBy,
                        this.state.sortMode,
                        this.state.searchName
                    )}>
                        {i}
                    </button>
                </li>
            )
        }
        return element
    }

    __renderCartList(){
        let element = []
        if (this.state.carts === null || this.state.carts.length < 1) {
            element.push(
                <li className="text-center m-auto" key="1">
                    <img src={require('../Assets/img/undraw_empty_cart.svg')} className="img-fluid-50" />
                    <h4 className="mt-2">No product here</h4>
                </li>
            )
        }else{
            this.state.carts.map((val, key) => {
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

    __renderBtnCheckout(){
        if (this.state.isLoadingCheckout) {
            return(<div class="lds-ripple"><div></div><div></div></div>)
        }else{
            return(<button className="btn btn-success btn-sm btn-block" onClick={() => this.checkoutProduct()}>Checkout</button>)
        }
    }

    __renderTotalCart(){
        let total = 0
        if (this.state.carts != null && this.state.carts.length < 1) {
            this.state.carts.forEach((val, key) => {
                total += val.price
            })
        }
        return (<b>{Rupiah.convert(total)}</b>)
    }

    render(){
        return(
            <div>
                <Sidebar />
                <nav className="navbar navbar-light bg-white p-0 custom-shadow-sm nav-fix">
                    <div className="container-fluid">
                        <div className="ml-7">
                            <a to="/" className="navbar-brand">Pointzo</a>
                        </div>
                        <ul className="navbar-nav d-flex flex-row">
                            <li className="nav-item  mt-2 mb-2">
                                <div className="form-group m-0">
                                    <div className="input-group input-group-alternative">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-search"></i></span>
                                        </div>
                                        <input className="form-control form-control-alternative" placeholder="Search" type="text"
                                            onKeyDown={(e) => this.searchDataProducts(e)}
                                        />
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item mt-2 mb-2">
                                <button className="btn btn-danger" onClick={() => this.__toggleCartnav()}>
                                    <i className="ni ni-cart"></i>
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>

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
                                            value={this.state.sortMode}
                                            checked={this.state.sortMode == "asc" ? true : false}
                                            onChange={() => this.getDataProducts(
                                                this.state.currentPage,
                                                this.state.sortBy,
                                                "asc"
                                            )}
                                        />
                                        <label className="custom-control-label" htmlFor="radioAsc">Ascending</label>
                                    </div>
                                    <div className="custom-control custom-radio mt-2">
                                        <input name="custom-radio-1" className="custom-control-input" id="radioDesc" type="radio"
                                            value={this.state.sortMode}
                                            checked={this.state.sortMode == "desc" ? true : false}
                                            onChange={() => this.getDataProducts(
                                                this.state.currentPage,
                                                this.state.sortBy,
                                                "desc"
                                            )}
                                         />
                                        <label className="custom-control-label" htmlFor="radioDesc">Descending</label>
                                    </div>
                                </div>
                                <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Sort by {this.state.sortBy == "created_at" ? "Latest" : this.state.sortBy}
                                </button>
                                <div className="dropdown-menu">
                                    <button className="dropdown-item" onClick={() => this.getDataProducts(this.state.currentPage, "name", this.state.sortMode)}>
                                        Name
                                    </button>
                                    <button className="dropdown-item" onClick={() => this.getDataProducts(this.state.currentPage, "price", "asc")}>Cheapest</button>
                                    <button className="dropdown-item" onClick={() => this.getDataProducts(this.state.currentPage, "price", "desc")}>Expensive</button>
                                    <button className="dropdown-item" onClick={() => this.getDataProducts(this.state.currentPage, "created_at", "desc")}>Latest</button>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" onClick={() => this.getDataProducts(this.state.currentPage, "created_at", "desc")}>Reset</a>
                                </div>
                            </div>
                        </div>

                        <div className="container-fluid  row mt-4">
                            {this.__renderProductList()}
                        </div>

                        <div className="nav justify-content-center mt-5">
                            <nav>
                                <ul className="pagination">
                                    <li className={ this.state.currentPage === 1 ? "page-item disabled" : "page-item" }>
                                        <button className="page-link" onClick={ () => this.getDataProducts(this.state.currentPage - 1)}>
                                            <i className="fa fa-angle-left"></i>
                                            <span className="sr-only">Previous</span>
                                        </button>
                                    </li>
                                    {this.__renderPagination()}
                                    <li className={ this.state.currentPage === this.state.totalPage ? "page-item disabled" : "page-item" }>
                                        <button className="page-link"
                                            onClick={ () => this.getDataProducts(this.state.currentPage + 1) }>
                                            <i className="fa fa-angle-right"></i>
                                            <span className="sr-only">Next</span>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                    </div>
                </div>

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
        data: state.productList
    }
}

export default connect(mapStateToProps) (Dashboard)
