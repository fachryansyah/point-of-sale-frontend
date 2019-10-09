import React, { Component } from 'react'
import $ from 'jquery'
import { connect } from 'react-redux'
import { fetchProduct } from '../Redux/Actions/Product'
import CartView from './CartView'

class Navbar extends Component {

    constructor(props){
        super(props)
        this.state = {
            showAutocomplete: false,
            cartToggle: true
        }
    }

    async getDataProducts(page = 1, sortBy = "created_at", sortMode = "desc", searchName = ""){
        await this.props.dispatch(fetchProduct(page, sortBy, sortMode, searchName))
    }

    async searchDataProducts(event){
        if (event.key == 'Enter') {
            await this.getDataProducts(
                1,
                this.props.product.sortBy,
                this.props.product.sortMode,
                event.target.value
            )
        }
    }

    handleChange(event){
        console.log(event.target.value)
        if (event.target.value.length > 2) {
            this.setState({
                showAutocomplete: true
            })
        }else{
            this.setState({
                showAutocomplete: false
            })
        }
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

    __renderAutocomplete(){
        if (this.state.showAutocomplete) {
            return(
                <div className="bg-white autocomplete">
                    <div class="list-group">
                        <a href="#" class="list-group-item list-group-item-action active">
                            Cras justo odio
                        </a>
                        <a href="#" class="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
                        <a href="#" class="list-group-item list-group-item-action">Morbi leo risus</a>
                        <a href="#" class="list-group-item list-group-item-action">Porta ac consectetur ac</a>
                        <a href="#" class="list-group-item list-group-item-action disabled" tabindex="-1" aria-disabled="true">Vestibulum at eros</a>
                    </div>
                </div>
            )
        }
    }

    render(){
        return(
            <div>
                <CartView />
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
                                        <input
                                            className="form-control form-control-alternative"
                                            placeholder="Search" type="text"
                                            onKeyDown={(event) => this.searchDataProducts(event)}
                                            onChange={(event) => this.handleChange(event)}
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

                    {this.__renderAutocomplete()}

                </nav>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        product: state.Product
    }
}

export default connect(mapStateToProps)(Navbar)
