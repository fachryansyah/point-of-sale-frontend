import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pushProduct } from '../Redux/Actions/Product'
import Http from '../Http'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

class AddProduct extends Component {
    constructor(){
        super()
        this.state = {
            name: "",
            description: "",
            category_id: "",
            image: "",
            imagePreview: "",
            price: "",
            qty: "",
            errors: [],
            categories: [],
            isLoading: false,
            isLoadingData: true,
            toDashboard: false
        }
    }

    componentDidMount(){
        this.getCategoryData()
    }

    getCategoryData(){
        Http.get("/category")
        .then((res) => {
            this.setState({
                categories: res.data.data,
                isLoadingData: false
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    handleChange(e){
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name] : value
        })
    }

    handleImage(e){
        if (typeof e.target.files[0] != "undefined") {
            this.setState({
                imagePreview: URL.createObjectURL(e.target.files[0]),
                image: e.target.files[0]
            })
        }
    }

    createProduct(){
        const {name, description, category_id, image, imagePreview, price, qty} = this.state

        this.setState({
            isLoading: true
        })

        const formData = new FormData()

        // check value is set
        if (name.length > 0) {
            formData.append("name", name)
        }
        if (description.length > 0) {
            formData.append("description", description)
        }
        if (category_id > 0) {
            formData.append("category_id", category_id)
        }
        if (imagePreview.length > 0) {
            formData.append("image", image)
        }
        if (price > 0) {
            formData.append("price", price)
        }
        if (qty > 0) {
            formData.append("qty", qty)
        }


        console.log("create product")

        Http.post("/product", formData)
        .then((res) => {
            console.log(res)
            if (res.data.status == 304) {
                this.setState({ errors: res.data.errors, isLoading: false })
                toast.error("Oops validation error, please check your fields", {
                    className: "bg-danger"
                })
            }

            if (res.data.status == 200) {
                toast.success("Product successfully created!", {
                    className: "bg-success"
                })

                this.props.dispatch(pushProduct(res.data.data))

                this.setState({
                    toDashboard: true,
                    isLoading: false
                })
            }
        })
        .catch((err) => {
            this.setState({
                isLoading: false
            })
            toast.error("Oops looks like something went wrong!", {
                className: "bg-danger"
            })
            console.log(err)
        })
    }

    __renderNotifError(param){
        if(this.state.errors.length > 0){
            let error = this.state.errors.find(error => error.param === param)
            if (error) {
                return(
                    <small className="text-danger">{error.msg}</small>
                )
            }
        }
    }

    __renderBtnSave(){
        if (this.state.isLoading) {
            return (<div class="lds-ripple"><div></div><div></div></div>)
        }else{
            return (<button className="btn btn-danger" onClick={() => this.createProduct()}>Save</button>)
        }
    }

    render(){
        if (this.state.toDashboard) {
            return <Redirect to='/' />
        }

        return(
            <div>
                <Navbar />
                <div className="row">
                    <div className="col-md-1">
                        <Sidebar />
                    </div>
                    <div className="col-md-6 mt-90">
                        <div className="card custom-shadow">
                            <div className="card-body">

                                <div className="d-flex flex-row">
                                    <div className="mr-auto">
                                        <h5 className="card-title font-weight-bold">Add New Product</h5>
                                    </div>
                                    <div className="ml-auto">
                                        {this.__renderBtnSave()}
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-md-6 form-group">
                                        <label>Name</label>
                                        <input
                                            className={this.state.errors.find(error => error.param == "name") ? "form-control is-invalid" : "form-control"}
                                            name="name"
                                            type="text"
                                            onChange={(e) => this.handleChange(e)} placeholder="Product name here.."
                                        />
                                        {this.__renderNotifError("name")}
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>Category</label>
                                        <select
                                            className="form-control"
                                            name="category_id"
                                            onChange={(e) => this.handleChange(e)}
                                            className={this.state.errors.find(error => error.param == "category_id") ? "form-control is-invalid" : "form-control"}
                                        >
                                            <option value="">--Select--</option>
                                            {
                                                this.state.categories.map((val, key) => {
                                                    return(
                                                        <option value={val.id} key={key}>{val.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        {this.__renderNotifError("category_id")}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-4 form-group">
                                        <label>Image</label>
                                        <input
                                            className={this.state.errors.find(error => error.param == "image") ? "form-control is-invalid" : "form-control"}
                                            name="image"
                                            onChange={(e) => this.handleImage(e)}
                                            type="file"
                                        />
                                        {this.__renderNotifError("image")}
                                    </div>
                                    <div className="col-md-4 form-group">
                                        <label>Price</label>
                                        <input
                                            className={this.state.errors.find(error => error.param == "price") ? "form-control is-invalid" : "form-control"}
                                            name="price"
                                            onChange={(e) => this.handleChange(e)}
                                            type="number" placeholder="100000"
                                        />
                                        {this.__renderNotifError("price")}
                                    </div>
                                    <div className="col-md-4 form-group">
                                        <label>Quantity</label>
                                        <input
                                            className={this.state.errors.find(error => error.param == "name") ? "form-control is-invalid" : "form-control"}
                                            name="qty"
                                            onChange={(e) => this.handleChange(e)}
                                            type="number"
                                            placeholder="1"
                                        />
                                        {this.__renderNotifError("qty")}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12 form-group">
                                        <label>Description</label>
                                        <textarea
                                            className={this.state.errors.find(error => error.param == "name") ? "form-control is-invalid" : "form-control"}
                                            name="description"
                                            onChange={(e) => this.handleChange(e)} rows="3" placeholder="Product description here..">
                                        </textarea>
                                        {this.__renderNotifError("description")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 mt-90">
                        <div className="container">
                            <img className="img-fluid" src={this.state.imagePreview} onChange={(e) => this.handleImage(e)} />
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

export default connect(mapStateToProps)(AddProduct)
