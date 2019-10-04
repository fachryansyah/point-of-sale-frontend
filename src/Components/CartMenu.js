import React, { Component } from 'react'

class CartMenu extends Component {
    render(){
        return(
            <div className="bg-white h-match-parent cart-fix">
                <div className="p-2 bg-red text-center">
                    <h6 className="text-white font-weight-bold mt-2">Cart <span className="badge badge-white">{ this.state.carts.length }</span></h6>
                </div>
                <div className="pr-3 mt-3">
                    <ul className="list-group pr-2 pl-2 scrollview">
                        {
                            this.props.carts.map((val, key) => {
                                return(
                                    <li className="list-group-item hover-effect no-border d-flex flex-row" key={key}>
                                        <img src={"http://localhost:1337/images/" + val.image} style={{ width: "100px", height: "70px" }} alt="Product Image" />
                                        <div className="ml-2">
                                            <h6>{ val.name }</h6>
                                            <p><span className="badge badge-primary">{ val.qty }</span></p>
                                            <div className="d-flex flex-row">
                                                <div className="btn-group" role="group" aria-label="Basic example">
                                                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => this.recudeQtyProduct(key)}><i className="fa fa-minus" /></button>
                                                    <button type="button" className="btn btn-outline-success btn-sm" onClick={() => this.addQtyProduct(key)}><i className="fa fa-plus" /></button>
                                                </div>
                                                <p className="p-0 m-0 ml-2"><span className="badge badge-danger">Rp. { val.price }</span></p>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <button className="btn btn-success btn-sm btn-block">Checkout</button>
                    <button className="btn btn-danger btn-sm btn-block" onClick={() => this.cancelCheckout()}>Cancel</button>
                </div>
            </div>
        )
    }
}
