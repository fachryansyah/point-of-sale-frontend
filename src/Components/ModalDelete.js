import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import $ from 'jquery'
import { toast } from 'react-toastify'
import Http from '../Http'

class ModalDelete extends Component {

    constructor(){
        super()
        this.state = {
            isLoadingBtn: false,
            isDone: false
        }
    }

    deleteProduct(){
        Http.delete(`/product/${this.props.productId}`)
        .then((res) => {
            console.log(res.data)
            if (res.data.status == 200) {
                this.setState({
                    isLoadingBtn: false,
                    isDone: true
                })
                $(`#${this.props.modalId}`).modal('hide')
                toast.success("Product successfully deleted!", {
                    className: "bg-success"
                })
            }

            if (res.data.status == 500) {
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
            return <div class="lds-ripple-white"><div></div><div></div></div>
        }else{
            return (
                <button
                    class="btn btn-white"
                    onClick={ async () => {
                        this.setState({
                            isLoadingBtn: true,
                        })
                        setTimeout(() => {
                            this.deleteProduct()
                        }, 3000)
                    }}>
                        Ok, Got it
                </button>
            )
        }
    }

    render(){
        return(
            <div>
                <div class="modal fade" id={this.props.modalId} tabindex="-1" role="dialog" aria-labelledby="modal-notification" aria-hidden="true">
                    <div class="modal-dialog modal-danger modal-dialog-centered modal-" role="document">
                        <div class="modal-content bg-gradient-danger">

                            <div class="modal-header">
                                <h6 class="modal-title" id="modal-title-notification">Your attention is required</h6>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>

                            <div class="modal-body">

                                <div class="py-3 text-center">
                                    <i class="fa fa-trash-o ni-3x"></i>
                                    <h4 class="heading mt-4">Are you sure want to delete this product ?</h4>
                                </div>

                            </div>

                            <div class="modal-footer">
                                { this.__renderBtnDelete() }
                                <button type="button" class="btn btn-link text-white ml-auto" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalDelete
