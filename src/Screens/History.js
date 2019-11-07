import React, { Component } from 'react'
import Moment from 'moment-timezone'
import Http from '../Http'
import Rupiah from 'rupiah-format'
import Shimmer from 'react-shimmer-effect'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

class History extends Component {

    constructor(){
        super()
        this.state = {
            orders: [],
            orderId: "",
            currentPage: '',
            totalPage: '',
            orderDetail: {
                items: []
            },
            isLoadingAll: true,
            isLoadingDetail: false
        }
    }

    componentDidMount(){
        this.getOrderHistory()
    }

    async getOrderHistory(page = 1, receipt = ''){
        await Http.get(`/order?page=${page}&receipt=${receipt}`)
        .then((res) => {
            if (res.data.status == 200) {
                console.log(res.data.data)
                this.setState({
                    orders: res.data.data.results,
                    totalPage: res.data.data.totalPage,
                    currentPage: res.data.data.currentPage,
                    isLoadingAll: false
                })
            }
        })
    }

    async showOrderHistory(id){
        this.setState({
            orderId: id,
            isLoadingDetail: true
        })
        await Http.get(`/order/d/${id}`)
        .then((res) => {
            if (res.data.status == 200) {
                this.setState({
                    orderDetail: res.data.data,
                    isLoadingDetail: false
                })
            }
        })
    }

    handleSearch(event){
        if (event.key == 'Enter') {
            this.getOrderHistory(this.state.currentPage, event.target.value)   
        }
    }

    __renderOrderList(){
        let element = []

        if (this.state.isLoadingAll) {
            for (var i = 0; i < 4; i++) {
                element.push(
                    <button key={i} className="list-group-item list-group-item-action">
                        <div className="d-flex w-100 justify-content-between">
                            <Shimmer>
                                <div className="shimmer-line-long"></div>
                            </Shimmer>
                            <Shimmer>
                                <div className="shimmer-line"></div>
                            </Shimmer>
                        </div>
                    </button>
                )
            }
        }else{
            this.state.orders.map((val, key) => {
                element.push(
                    <button
                        key={key}
                        className={this.state.orderId == val.id ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}
                        onClick={() => this.showOrderHistory(val.id)}
                    >
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className={this.state.orderId == val.id ? "mb-1 text-white" : "mb-1"}>#{val.receipt_no}</h5>
                            <small>{Moment.tz(val.created_at, 'Asia/Jakarta').format('MMMM Do YYYY, h:mm:ss a')}</small>
                        </div>
                        <span className={this.state.orderId == val.id ? "badge bg-white text-dark" : "badge badge-danger"}>
                            <p className="m-0 font-weight-bold">{Rupiah.convert(val.amount)}</p>
                        </span>
                    </button>
                )
            })
        }

        return element
    }

    __renderOrderDetail(){
        let element = []
        if (this.state.isLoadingDetail) {
            for (var i = 0; i < 3; i++) {
                element.push(
                    <li className="list-group-item bg-deep-white no-border d-flex flex-row" key={i}>
                        <div className="ml-2">
                            <Shimmer>
                                <div className="shimmer-line-long"></div>
                            </Shimmer>
                            <Shimmer>
                                <div className="shimmer-line"></div>
                            </Shimmer>
                        </div>
                    </li>
                )
            }
            return (
                <div>
                    <h4 className="font-weight-bold">Receipt no.
                        <Shimmer>
                            <div className="shimmer-line-long"></div>
                        </Shimmer>
                    </h4>
                    <ul className="list-group pr-2 pl-2 mb-4">
                        { element }
                    </ul>
                </div>
            )
        }else{
            this.state.orderDetail.items.map((val, key) => {
                element.push(
                    <li className="list-group-item bg-deep-white no-border d-flex flex-row" key={key}>
                        <img src={val.product.image} style={{ width: "100px", height: "70px" }} alt="Product Image" />
                        <div className="ml-2">
                            <h6>{ val.product.name }</h6>
                            <p><span className="badge badge-primary">{ val.qty }</span></p>
                            <div className="d-flex flex-row">
                                <p className="p-0 m-0 ml-2"><span className="badge badge-danger">{ Rupiah.convert(val.total_price) }</span></p>
                            </div>
                        </div>
                    </li>
                )
            })

            if (this.state.orderDetail.total_price_order) {
                element.push(
                    <li className="list-group-item">
                        <div className="d-flex flex-row">
                            <div className="mr-auto">
                                <b>Total</b>
                            </div>
                            <div className="ml-auto">
                                {Rupiah.convert(this.state.orderDetail.total_price_order)}
                            </div>
                        </div>
                    </li>
                )
            }

            return (
                <div>
                    <h4 className="font-weight-bold">Receipt no. {this.state.orderDetail.receipt_no}</h4>
                    <ul className="list-group pr-2 pl-2 mb-4">
                        { element }
                    </ul>
                </div>
            )
        }
    }

    __renderPagination(){
        let element = []
        for (let i = 1; i < this.state.totalPage+1; i++) {
            element.push(
                <li key={i} className={i == this.state.currentPage ? "page-item active" : "page-item"}>
                    <button className={i == this.state.currentPage ? "page-link bg-danger no-border" : "page-link"}
                    onClick={() => {
                        this.getOrderHistory(i)
                    }}>
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
                <div className="row mb-5">
                    <div className="col-md-1"></div>
                    <div className="col-md-6 mt-90">
                        <div className="card shadow">
                            <div className="card-body">
                                <div className="d-flex flex-row">
                                    <div className="mr-auto">
                                        <h4 className="card-header">Order History</h4>
                                    </div>
                                    <div className="ml-auto">
                                    <div className="form-group mt-2">
                                        <div className="input-group input-group-alternative">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fa fa-search"></i></span>
                                            </div>
                                            <input
                                                className="form-control form-control-alternative"
                                                placeholder="Receipt no" type="text"
                                                onKeyDown={(event) => this.handleSearch(event)}
                                            />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="list-group">
                                    { this.__renderOrderList() }
                                </div>
                                <div className="nav justify-content-center mt-4">
                                    <nav>
                                        <ul className="pagination">
                                            <li className={ this.state.currentPage === 1 ? "page-item disabled" : "page-item" }>
                                                <button className="page-link" onClick={ () => this.getOrderHistory(this.state.currentPage - 1)}>
                                                    <i className="fa fa-angle-left"></i>
                                                    <span className="sr-only">Previous</span>
                                                </button>
                                            </li>
                                            {this.__renderPagination()}
                                            <li className={ this.state.currentPage === this.state.totalPage ? "page-item disabled" : "page-item" }>
                                                <button className="page-link"
                                                    onClick={ () => this.getOrderHistory(this.state.currentPage + 1) }>
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
                    <div className="col-md-5 mt-90">
                        { this.__renderOrderDetail() }
                    </div>
                </div>
            </div>
        )
    }
}

export default History
