import React, { Component } from 'react'
import Http from '../Http'
import { connect } from 'react-redux'
import { updateProduct } from '../Redux/Actions/Product'
import Shimmer from 'react-shimmer-effect'
import { toast } from 'react-toastify'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

class UpdateProduct extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            description: "",
            image: "",
            imagePreview: "",
            price: "",
            qty: "",
            category_id: "",
            categories: [],
            errors: [],
            isLoadingBtn: true,
            isLoadingData: true,
        }
    }

    componentDidMount(){
        // console.log(this.props.match.params.id)
        this.getProduct()
        this.getCategoryData()
    }

    async getProduct(){
        await Http.get(`/product/${this.props.match.params.id}`)
        .then((res) => {
            this.setState({
                id: res.data.data.id,
                name: res.data.data.name,
                description: res.data.data.description,
                imagePreview: `${process.env.REACT_APP_BASE_URL}/images/${res.data.data.image}`,
                qty: res.data.data.qty,
                category_id: res.data.data.category_id,
                price: res.data.data.price,
                isLoadingData: false,
                isLoadingBtn: false
            })
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    async getCategoryData(){
        await Http.get('/category')
        .then((res) => {
            this.setState({
                categories: res.data.data
            })
            console.log(this.state.categories)
        })
        .catch((err) => {
            console.log(err.message)
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

    async updateProduct(){
        const {name, description, category_id, image, imagePreview, price, qty} = this.state

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

        await Http.put(`/product/${this.state.id}`, formData)
        .then((res) => {
            console.log(res)
            if (res.data.status === 304) {
                this.setState({
                    errors: res.data.errors,
                    isLoadingBtn: false
                })
                toast.error("Oops validation error, please check your fields", {
                    className: "bg-danger"
                })
            }

            if (res.data.status === 200) {
                toast.success("Product successfully updated!", {
                    className: "bg-success"
                })

                this.props.dispatch(updateProduct(res.data.data))

                this.setState({
                    isLoadingBtn: false
                })
            }
        })
        .catch((err) => {
            this.setState({
                isLoadingBtn: false
            })
            toast.error("Oops looks like something went wrong!", {
                className: "bg-danger"
            })
            console.log(err)
        })
    }

    __renderFormUpdate(){
        if (this.state.isLoadingData) {
            return(
                <div>
                    <div className="row mt-3">
                        <div className="col-md-6 form-group">
                            <label>Name</label>
                            <br />
                            <Shimmer>
                                <div className="shimmer-line-match-parent"></div>
                            </Shimmer>
                        </div>
                        <div className="col-md-6 form-group">
                            <label>Category</label>
                            <br />
                            <Shimmer>
                                <div className="shimmer-line-match-parent"></div>
                            </Shimmer>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 form-group">
                            <label>Image</label>
                            <br />
                            <Shimmer>
                                <div className="shimmer-line-match-parent"></div>
                            </Shimmer>
                        </div>
                        <div className="col-md-4 form-group">
                            <label>Price</label>
                            <br />
                            <Shimmer>
                                <div className="shimmer-line-match-parent"></div>
                            </Shimmer>
                        </div>
                        <div className="col-md-4 form-group">
                            <label>Quantity</label>
                            <br />
                            <Shimmer>
                                <div className="shimmer-line-match-parent"></div>
                            </Shimmer>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12 form-group">
                            <label>Description</label>
                            <br />
                            <Shimmer>
                                <div className="shimmer-line-match-parent"></div>
                            </Shimmer>
                        </div>
                    </div>
                </div>
            )
        }
        return(
            <div>
                <div className="row mt-3">
                    <div className="col-md-6 form-group">
                        <label>Name</label>
                        <input
                            className={this.state.errors.find(error => error.param === "name") ? "form-control is-invalid" : "form-control"}
                            name="name"
                            type="text"
                            value={this.state.name}
                            onChange={(e) => this.handleChange(e)} placeholder="Product name here.."
                        />
                        {this.__renderNotifError("name")}
                    </div>
                    <div className="col-md-6 form-group">
                        <label>Category</label>
                        <select
                            name="category_id"
                            value={this.state.category_id}
                            onChange={(e) => this.handleChange(e)}
                            className={this.state.errors.find(error => error.param === "category_id") ? "form-control is-invalid" : "form-control"}
                        >
                            <option value="">--Select--</option>
                            {
                                this.state.categories.map((val, key) => {
                                    return(
                                        <option
                                            value={val.id}
                                            key={key}
                                        >
                                            {val.name}
                                        </option>
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
                            className={this.state.errors.find(error => error.param === "image") ? "form-control is-invalid" : "form-control"}
                            name="image"
                            onChange={(e) => this.handleImage(e)}
                            type="file"
                        />
                        {this.__renderNotifError("image")}
                    </div>
                    <div className="col-md-4 form-group">
                        <label>Price</label>
                        <input
                            className={this.state.errors.find(error => error.param === "price") ? "form-control is-invalid" : "form-control"}
                            name="price"
                            onChange={(e) => this.handleChange(e)}
                            type="number"
                            value={this.state.price}
                            placeholder="100000"
                        />
                        {this.__renderNotifError("price")}
                    </div>
                    <div className="col-md-4 form-group">
                        <label>Quantity</label>
                        <input
                            className={this.state.errors.find(error => error.param === "qty") ? "form-control is-invalid" : "form-control"}
                            name="qty"
                            onChange={(e) => this.handleChange(e)}
                            type="number"
                            value={this.state.qty}
                            placeholder="1"
                        />
                        {this.__renderNotifError("qty")}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 form-group">
                        <label>Description</label>
                        <textarea
                            className={this.state.errors.find(error => error.param === "description") ? "form-control is-invalid" : "form-control"}
                            name="description"
                            value={this.state.description}
                            onChange={(e) => this.handleChange(e)} rows="3"
                            placeholder="Product description here.."
                        />
                        {this.__renderNotifError("description")}
                    </div>
                </div>
            </div>
        )
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
        if (this.state.isLoadingBtn) {
            return <div className="lds-ripple"><div></div><div></div></div>
        }else{
            return (
                <button
                    className="btn btn-danger"
                    onClick={async () => {
                        this.setState({
                            isLoadingBtn: true
                        })
                        await setTimeout(() => {
                            this.updateProduct()
                        }, 3000)
                    }}>
                    Save
                </button>
            )
        }
    }

    render(){
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
                                        <h5 className="card-title font-weight-bold">Update Product</h5>
                                    </div>
                                    <div className="ml-auto">
                                        {this.__renderBtnSave()}
                                    </div>
                                </div>

                                {this.__renderFormUpdate()}

                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 mt-90">
                        <div className="container">
                            <img className="img-fluid" src={this.state.imagePreview} onChange={(e) => this.handleImage(e)} alt="image product" />
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

export default connect(mapStateToProps)(UpdateProduct)
