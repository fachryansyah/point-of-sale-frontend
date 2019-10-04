import React, { Component } from 'react'
import Rupiah from 'rupiah-format'

class ModalCheckout extends Component {
    render(){
        return(
            <div className="modal fade" id={this.props.modalId} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Checkout</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h5>Receipt no. {this.props.checkout.receipt_no}</h5>
                            <ul className="list-group mt-4">
                                {
                                    this.props.checkout.order_items.map((val, key) => {
                                        return(
                                            <li className="list-group-item" key={key}>
                                                <div className="d-flex flex-row">
                                                    <div className="mr-auto">
                                                        { val.product.name } <b>x{ val.qty }</b>
                                                    </div>
                                                    <div className="ml-auto">
                                                        { Rupiah.convert(val.total_price) }
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                                <li className="list-group-item">
                                    <div className="d-flex flex-row">
                                        <div className="mr-auto">
                                            <b>Total</b>
                                        </div>
                                        <div className="ml-auto">
                                            {Rupiah.convert(this.props.checkout.total_price_order)}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button type="button" className="btn btn-success" data-dismiss="modal">Print</button>
                            <b>OR</b>
                            <button type="button" className="btn btn-primary">Send Email</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalCheckout
