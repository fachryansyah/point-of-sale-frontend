import React, { Component } from 'react'
import Http from '../Http'
import Moment from 'moment-timezone'
import { Link } from 'react-router-dom'
import Rupiah from 'rupiah-format'
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

class Statistic extends Component {

    constructor(props){
        super(props)
        this.state = {
            todayIncomeOrder: '',
            todayPrecentageIncome: '',
            yearlyIncomeOrder: '',
            yearlyPrecentageIncome: '',
            totalOrder: '',
            precentageOrder: '',
            currentData:[],
            lastData: [],
            chartLable: [],
            chartMode: 'Week',
            recentOrders: [],
            recentOrderMode: 'Week'
        }
    }

    componentDidMount(){
        this.getTodayIncomeOrder()
        this.getYearlyIncomeOrder()
        this.getTotalOrder()
        this.getChartWeekly()
        this.getRecentOrder()
    }

    async getTodayIncomeOrder(){
        await Http.get('/order/income')
        .then((res) => {
            this.setState({
                todayIncomeOrder: res.data.data.income,
                todayPrecentageIncome: res.data.data.precentage
            })
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    async getYearlyIncomeOrder(){
        await Http.get('/order/income?mode=yearly')
        .then((res) => {
            this.setState({
                yearlyIncomeOrder: res.data.data.income,
                yearlyPrecentageIncome: res.data.data.precentage
            })
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    async getTotalOrder(){
        await Http.get('/order/total')
        .then((res) => {
            console.log(res.data.data)
            this.setState({
                totalOrder: res.data.data.total,
                precentageOrder: res.data.data.precentage
            })
        })
    }

    async getChartWeekly() {

        await this.setState({
            chartMode: 'Week',
            currentData: [0, 0, 0, 0, 0, 0, 0],
            lastData: [0, 0, 0, 0, 0, 0, 0],
            chartLable: ['Monday', 'Thuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        })

        await Http.get('/order/chart/weekly')
        .then((res) => {
            res.data.data.current.forEach((val) => {
                let index = this.state.chartLable.map((valMap) => {
                    return valMap
                }).indexOf(val.label)

                let data = this.state.currentData
                data[index] = val.amount

                this.setState({
                    currentData: data
                })
            })

            res.data.data.last.forEach((val) => {
                let index = this.state.chartLable.map((valMap) => {
                    return valMap
                }).indexOf(val.label)

                let data = this.state.lastData
                data[index] = val.amount
                console.log(data)

                this.setState({
                    lastData: data
                })
            })

        })
        .catch((err) => {
            console.log(err)
        })
    }

    async getChartMonthly(){
        this.setState({
            chartMode: 'Month',
            currentData: [0, 0, 0, 0],
            lastData: [0, 0, 0, 0],
            chartLable: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
        })

        await Http.get('/order/chart/monthly')
        .then((res) => {
            res.data.data.current.forEach((val) => {
                let index = this.state.chartLable.map((valMap) => {
                    return valMap
                }).indexOf(val.label)

                let data = this.state.currentData
                data[index] = val.amount

                this.setState({
                    currentData: data
                })
            })

            res.data.data.last.forEach((val) => {
                let index = this.state.chartLable.map((valMap) => {
                    return valMap
                }).indexOf(val.label)

                let data = this.state.lastData
                data[index] = val.amount
                console.log(data)

                this.setState({
                    lastData: data
                })
            })

        })
        .catch((err) => {
            console.log(err)
        })
    }

    async getChartYearly(){
        this.setState({
            chartMode: 'Year',
            currentData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            lastData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            chartLable: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        })

        await Http.get('/order/chart/yearly')
        .then((res) => {
            res.data.data.current.forEach((val) => {
                let index = this.state.chartLable.map((valMap) => {
                    return valMap
                }).indexOf(val.label)

                let data = this.state.currentData
                data[index] = val.amount

                this.setState({
                    currentData: data
                })
            })

            res.data.data.last.forEach((val) => {
                let index = this.state.chartLable.map((valMap) => {
                    return valMap
                }).indexOf(val.label)

                let data = this.state.lastData
                data[index] = val.amount
                console.log(data)

                this.setState({
                    lastData: data
                })
            })

        })
        .catch((err) => {
            console.log(err)
        })
    }

    async getRecentOrder(mode = 'weekly'){
        
        switch (mode) {
            case 'weekly':
                this.setState({
                    recentOrderMode: 'Week'
                })
                break;
            case 'monthly':
                this.setState({
                    recentOrderMode: 'Month'
                })
                break;
            case 'yearly':
                this.setState({
                    recentOrderMode: 'Year'
                })
                break;
            default:
                break;
        }

        await Http.get(`/order/recent?mode=${mode}`)
        .then((res) => {
            console.log(res.data.data)
            this.setState({
                recentOrders: res.data.data
            })
        })
        .catch((err) => {
            console.log(err.message)
        })

    }

    render(){
        const options = {
            options: {
                scales: {
                    yAxes: [
                        {   
                            bounds: 'ticks',
                            ticks: {
                                callback: function(value, index, values) {
                                    // return parseFloat(value).toFixed(2);
                                    return Rupiah.convert(value)
                                },
                                beginAtZero: true
                            }
                        }
                    ]
                }
            }
        }
        const data = {
            labels: this.state.chartLable,
            datasets: [
                {
                    label: `This ${this.state.chartMode}`,
                    // labels: this.state.chart.current.label,
                    data: this.state.currentData,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    borderWidth: 3
                },
                {
                    label: `Last ${this.state.chartMode}`,
                    // labels: this.state.chart.current.label,
                    data: this.state.lastData,
                    borderColor: 'rgba(52, 140, 235, 1)',
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    borderWidth: 3
                }
            ]
        }
        return (
            <div>
                <Navbar />
                <Sidebar />
                <div className="row mb-5">
                    <div className="col-md-1"></div>
                    <div className="col-md-10 mt-90">
                        <h4>Statistics</h4>
                        <div className="row mt-4">
                            <div className="animated fadeInUp delay-mili-1s faster col-xl-4 col-md-4 col-lg-6">
                                <div className="card bg-gradient-danger op-7 card-stats mb-4 mb-xl-0">
                                    <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                        <h5 className="card-title text-uppercase text-white mb-0">Today's Income</h5>
                                        <span className="h4 font-weight-bold text-white mb-0">{Rupiah.convert(this.state.todayIncomeOrder)}</span>
                                        </div>
                                        <div className="col-auto">
                                        <div className="icon icon-shape bg-danger bg-white rounded-circle shadow">
                                            <i className="fa fa-usd"></i>
                                        </div>
                                        </div>
                                    </div>
                                    <p className="mt-3 mb-0 text-muted text-sm">
                                        <span className="text-white mr-2"><i className={this.state.todayPrecentageIncome > 0 ? "fa fa-arrow-up" : "fa fa-arrow-down"}></i> {Math.abs(this.state.todayPrecentageIncome)}%</span>
                                        <span className="text-nowrap text-white">Yesterday</span>
                                    </p>
                                    </div>
                                </div>
                            </div>
                            <div className="animated fadeInUp delay-mili-2s faster col-xl-4 col-md-4 col-lg-6">
                                <div className="card bg-gradient-info op-7 card-stats mb-4 mb-xl-0">
                                    <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                        <h5 className="card-title text-uppercase text-white mb-0">Orders</h5>
                                        <span className="h4 font-weight-bold text-white mb-0">{this.state.totalOrder}</span>
                                        </div>
                                        <div className="col-auto">
                                        <div className="icon icon-shape bg-white rounded-circle shadow">
                                            <i className="fa fa-shopping-cart"></i>
                                        </div>
                                        </div>
                                    </div>
                                    <p className="mt-3 mb-0 text-muted text-sm">
                                        <span className="text-white mr-2"><i className={this.state.precentageOrder > 0 ? "fa fa-arrow-up" : "fa fa-arrow-down"}></i> {this.state.precentageOrder}%</span>
                                        <span className="text-nowrap text-white">Last Week</span>
                                    </p>
                                    </div>
                                </div>
                            </div>
                            <div className="animated fadeInUp delay-mili-3s faster col-xl-4 col-md-4 col-lg-6">
                                <div className="card bg-gradient-success op-7 card-stats mb-4 mb-xl-0">
                                    <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                        <h5 className="card-title text-uppercase text-white mb-0">This year's Income</h5>
                                        <span className="h4 font-weight-bold text-white mb-0">{Rupiah.convert(this.state.yearlyIncomeOrder)}</span>
                                        </div>
                                        <div className="col-auto">
                                        <div className="icon icon-shape bg-white rounded-circle shadow">
                                            <i className="fa fa-money"></i>
                                        </div>
                                        </div>
                                    </div>
                                    <p className="mt-3 mb-0 text-muted text-sm">
                                        <span className="text-white mr-2"><i className={this.state.yearlyPrecentageIncome > 0 ? "fa fa-arrow-up" : "fa fa-arrow-down"}></i> {this.state.yearlyPrecentageIncome}%</span>
                                        <span className="text-nowrap text-white">Last Year</span>
                                    </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="animated fadeInUp delay-mili-4s col-md-12">
                                <div className="card custom-shadow">
                                    <div className="card-body">
                                        <div className="d-flex flex-row mb-3">
                                            <div className="mr-auto">
                                                <h4 className="font-weight-bold">Revenue</h4>
                                            </div>
                                            <div className="ml-auto">
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-danger dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.state.chartMode}</button>
                                                    <div className="dropdown-menu">
                                                        <button className="dropdown-item" onClick={() => this.getChartWeekly()}>Week</button>
                                                        <button className="dropdown-item" onClick={() => this.getChartMonthly()}>Month</button>
                                                        <button className="dropdown-item" onClick={() => this.getChartYearly()}>Year</button>
                                                        <div className="dropdown-divider"></div>
                                                        <a className="dropdown-item" href="#">Separated link</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Line
                                            data={data}
                                            width={100}
                                            height={30}
                                            options={options.options}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-12">
                                <div className="card custom-shadow">
                                    <div className="card-body">
                                        <div className="d-flex flex-row">
                                            <div className="mr-auto">
                                                <h4 className="card-header">Recent Order</h4>
                                            </div>
                                            <div className="ml-auto m-3">
                                                <Link className="mr-3" to="/history">Show more</Link>
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-danger dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.state.recentOrderMode}</button>
                                                    <div className="dropdown-menu">
                                                        <button className="dropdown-item" onClick={() => this.getRecentOrder('weekly')}>Week</button>
                                                        <button className="dropdown-item" onClick={() => this.getRecentOrder('monthly')}>Month</button>
                                                        <button className="dropdown-item" onClick={() => this.getRecentOrder('yearly')}>Year</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <table className="table table-striped align-items-center">
                                            <thead>
                                                <tr>
                                                    <th>INVOICE</th>
                                                    <th>USER</th>
                                                    <th>DATE</th>
                                                    <th width="25%">ORDERS</th>
                                                    <th>AMOUNT</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.recentOrders.map((val, key) => {
                                                        return(
                                                            <tr key={key}>
                                                                <td>#{val.receipt_no}</td>
                                                                <th scope="row" className="name">
                                                                    <div className="media align-items-center">
                                                                        <a href="#" className="avatar rounded-circle mr-3">
                                                                            <img alt="Image placeholder" src={val.user.avatar} />
                                                                        </a>
                                                                        <div className="media-body">
                                                                            <span className="mb-0 text-sm">{`${val.user.firstname} ${val.user.lastname}`}</span>
                                                                        </div>
                                                                    </div>
                                                                </th>
                                                                <td>{Moment.tz(val.created_at, 'Asia/Jakarta').format('MMMM Do YYYY')}</td>
                                                                <td>
                                                                    {
                                                                        val.order_item.map((valItem, keyItem) => {
                                                                            return(
                                                                                <span className="badge badge-danger ml-1" key={keyItem}>{valItem.product.name}</span>
                                                                            )
                                                                        })
                                                                    }
                                                                </td>
                                                                <td>{Rupiah.convert(val.total_order_price)}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
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

export default Statistic
