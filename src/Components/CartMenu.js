import React, { Component } from 'react'
import ModalCheckout from '../Components/ModalCheckout'

class CartMenu extends Component {

    constructor(){
        super()
        this.state = {
            carts: []
        }
    }

    showModalCheckout(){
        $("#modalCheckout").modal("show")
    }

    cancelCheckout(){
        this.setState({
            carts: []
        })
    }

    __renderCartList(){
        let element = []
        if (this.state.carts.length < 1) {
            element.push(
                <li className="text-center m-auto">
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

    __renderTotalCart(){
        let total = 0
        this.state.carts.forEach((val, key) => {
            total += val.price
        })
        return (<b>{Rupiah.convert(total)}</b>)
    }

    render(){
        return(
            <div className="cartnav">
                <div className="bg-white h-match-parent cart-fix shadow">
                    <div className="p-2 bg-red text-center">
                        <h6 className="text-white font-weight-bold mt-2">Cart <span className="badge badge-white">{ this.state.carts.length }</span></h6>
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
                                <button className="btn btn-success btn-sm btn-block" onClick={() => this.showModalCheckout()}>Checkout</button>
                            </div>
                            <div className="col-md-6">
                                <button className="btn btn-danger btn-sm btn-block" onClick={() => this.cancelCheckout()}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
