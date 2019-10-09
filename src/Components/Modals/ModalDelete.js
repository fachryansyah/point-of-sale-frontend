import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeProduct } from '../../Redux/Actions/Product'
import $ from 'jquery'
import { toast } from 'react-toastify'
import Http from '../../Http'

class ModalDelete extends Component{

    constructor(props){
        super(props)
        this.state = {
            isLoadingBtn : false
        }
    }

    deleteProduct(){

        this.setState({
            isLoadingBtn: true
        })


        Http.delete(`/product/${this.props.productId}`)
        .then((res) => {
            console.log(res.data)
            if (res.data.status === 200) {
                this.setState({
                    isLoadingBtn: false
                })

                this.props.dispatch(removeProduct(this.props.productId))

                $(`#${this.props.modalId}`).modal('hide')
                toast.success("Product successfully deleted!", {
                    className: "bg-success"
                })
            }

            if (res.data.status === 500) {
                this.setState({
                    isLoadingBtn: false
                })
                $(`#${this.props.modalId}`).modal('hide')
                toast.error("Oops looks like something went wrong", {
                    className: "bg-danger"
                })
            }
        })
        .catch((err) => {
            console.log(err.message)
            this.setState({
                isLoadingBtn: false
            })
            $(`#${this.props.modalId}`).modal('hide')
            toast.error("Oops looks like something went wrong", {
                className: "bg-danger"
            })
        })
    }

    __renderBtnDelete(){
        if (this.state.isLoadingBtn) {
            return (<div className="lds-ripple-white"><div></div><div></div></div>)
        }else{
            return (
                <button
                    className="btn btn-white"
                    onClick={() => this.deleteProduct()}>
                        Ok, Got it
                </button>
            )
        }
    }

    render(){
        return(
            <div>
                <div className="modal fade" id={this.props.modalId} tabIndex="-1" role="dialog" aria-labelledby="modal-notification" aria-hidden="true">
                    <div className="modal-dialog modal-danger modal-dialog-centered modal-" role="document">
                        <div className="modal-content bg-gradient-danger">

                            <div className="modal-header">
                                <h6 className="modal-title" id="modal-title-notification">Your attention is required</h6>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>

                            <div className="modal-body">

                                <div className="py-3 text-center">
                                    <i className="fa fa-trash-o ni-3x"></i>
                                    <h4 className="heading mt-4">Are you sure want to delete this product ?</h4>
                                </div>

                            </div>

                            <div className="modal-footer">
                                { this.__renderBtnDelete() }
                                <button type="button" className="btn btn-link text-white ml-auto" data-dismiss="modal">Close</button>
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
        product: state.Product
    }
}

export default connect(mapStateToProps)(ModalDelete)