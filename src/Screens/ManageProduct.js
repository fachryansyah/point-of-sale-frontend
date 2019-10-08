import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Rupiah from 'rupiah-format'
import Shimmer from 'react-shimmer-effect'
import $ from 'jquery'
import Http from '../Http'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
// import ModalDelete from '../Components/ModalDelete'

class ManageProduct extends Component {
    constructor(){
        super()
        this.state = {
            products: [],
            deleteProductId: '',
            modalId: "deleteProduct",
            currentPage: 1,
            totalPage: 0,
            isLoading: true,
            isLoadingBtn: false
        }
    }

    componentDidMount(){
        this.getDataProducts()
    }

    async getDataProducts(page = 1){
        this.setState({
            isLoading: true
        })
        await Http.get(`/product?page=${page}`)
        .then((res) => {
            this.setState({
                products: res.data.data.results,
                currentPage: res.data.data.currentPage,
                totalPage: res.data.data.totalPage,
                isLoading: false
            })
            console.log(this.state.products)
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    showModalDelete(productId){
        $(`#${this.state.modalId}`).modal('show')
        this.setState({
            deleteProductId: productId
        })
    }

    deleteProduct(){

        this.setState({
            isLoadingBtn: true
        })

        Http.delete(`/product/${this.state.deleteProductId}`)
        .then((res) => {
            console.log(res.data)
            if (res.data.status === 200) {
                this.setState({
                    isLoadingBtn: false,
                    isDone: true
                })
                $(`#${this.state.modalId}`).modal('hide')
                this.getDataProducts()
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

    __renderProductList(){
        let element = []

        if (this.state.isLoading) {
            for(let i = 0; i < 5;i++){
                element.push(
                    <tr key={i}>
                        <th scope="row">
                            <Shimmer>
                                <div className="shimmer-line-table-short"></div>
                            </Shimmer>
                        </th>
                        <td>
                            <Shimmer>
                                <div className="shimmer-line-table-long"></div>
                            </Shimmer>
                        </td>
                        <td>
                            <Shimmer>
                                <div className="shimmer-line-table-long"></div>
                            </Shimmer>
                        </td>
                        <td>
                            <Shimmer>
                                <div className="shimmer-line-table-long"></div>
                            </Shimmer>
                        </td>
                        <td>
                            <Shimmer>
                                <div className="shimmer-line-table-long"></div>
                            </Shimmer>
                        </td>
                        <td>
                            <Shimmer>
                                <div className="shimmer-line-table-long"></div>
                            </Shimmer>
                        </td>
                        <td>
                            <Shimmer>
                                <div className="shimmer-line-table-long"></div>
                            </Shimmer>
                        </td>
                    </tr>
                )
            }
        }else{
            this.state.products.map((val, key) => {
                element.push(
                    <tr key={key}>
                        <th scope="row">{ key+1 }</th>
                        <td>{ val.name }</td>
                        <td>
                            <img className="img-table" src={`${process.env.REACT_APP_BASE_URL}/images/${val.image}`} alt="product image" />
                        </td>
                        <td>{ val.category }</td>
                        <td>
                            <h5><small className="badge badge-danger">{ Rupiah.convert(val.price) }</small></h5>
                        </td>
                        <td>{ val.qty }</td>
                        <td>
                            <div className="btn-group">
                                <button type="button" className="btn btn-secondary btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Menu</button>
                                <div className="dropdown-menu">
                                    <Link to={`/update/${val.id}`} className="dropdown-item" href="#">Update</Link>
                                    <button className="dropdown-item" onClick={() => this.showModalDelete(val.id)}>Delete</button>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Add Quantity</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                )
            })
        }

        return element
    }

    __renderModalDelete(){
        return(
            <div>
                <div className="modal fade" id={this.state.modalId} tabIndex="-1" role="dialog" aria-labelledby="modal-notification" aria-hidden="true">
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

    __renderPagination(){
        let element = []
        for (let i = 1; i < this.state.totalPage+1; i++) {
            element.push(
                <li key={i} className={i == this.state.currentPage ? "page-item active" : "page-item"}>
                    <button className={i == this.state.currentPage ? "page-link bg-danger no-border" : "page-link"}
                    onClick={() => this.getDataProducts(
                        i
                    )}>
                        {i}
                    </button>
                </li>
            )
        }
        return element
    }

    render(){
        return(
            <div>
                <Navbar />
                <Sidebar />
                { this.__renderModalDelete() }
                <div className="row mb-5">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <div className="container-fluid mt-90">
                            <div className="card custom-shadow rounded">
                                <div className="card-header">
                                    <div className="d-flex flex-row">
                                        <div className="mr-auto">
                                            <h5 className="card-title m-0">Manage Product</h5>
                                        </div>
                                        <div className="ml-auto">
                                            <Link to="/add" className="btn btn-outline-danger"><i className="fa fa-plus mr-2" />Add Product</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <div className="">
                                        <table className="table table-striped m-0">
                                            <thead className="thead-danger">
                                                <tr>
                                                    <th scope="col">No</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Image</th>
                                                    <th scope="col">Category</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Quantity</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.__renderProductList()}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="card-footer">
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
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                </div>
            </div>
        )
    }
}

export default ManageProduct
