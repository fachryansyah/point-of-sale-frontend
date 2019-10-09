import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { connect } from 'react-redux'
import { fetchProduct, removeProduct } from '../Redux/Actions/Product'
import Rupiah from 'rupiah-format'
import Shimmer from 'react-shimmer-effect'
import $ from 'jquery'
import Http from '../Http'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import Pagination from '../Components/Pagination'
import ModalDelete from '../Components/Modals/ModalDelete'

class ManageProduct extends Component {
    constructor(){
        super()
        this.state = {
            deleteProductId: '',
            modalId: "deleteProduct"
        }
    }

    async getDataProducts(){
        await this.props.dispatch(fetchProduct())
    }

    showModalDelete(productId){
        $(`#${this.state.modalId}`).modal('show')
        this.setState({
            deleteProductId: productId
        })
    }

    __renderProductList(){
        let element = []

        if (this.props.product.isLoading) {
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
            this.props.product.productList.results.map((val, key) => {
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

    render(){
        return(
            <div>
                <Navbar />
                <Sidebar />
                <ModalDelete modalId={this.state.modalId} productId={this.state.deleteProductId} />
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
                                <div className="card-footer nav justify-content-center">
                                    <Pagination />
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

const mapStateToProps = state => {
    return {
        product: state.Product
    }
}

export default connect(mapStateToProps)(ManageProduct)