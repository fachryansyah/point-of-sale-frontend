import React, { Component } from 'react'
import Http from '../Http'
import Rupiah from 'rupiah-format'
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

class Statistic extends Component {

    constructor(props){
        super(props)
        this.state = {
            currentData:[],
            lastData: [],
            chartLable: [],
            chartMode: 'Weekly'
        }
    }

    componentDidMount(){
        this.getDataWeekly()
    }

    async getDataWeekly() {

        await this.setState({
            chartMode: 'Weekly',
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

    async getDataMonthly(){
        this.setState({
            chartMode: 'Monthly',
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

    async getDataYearly(){
        this.setState({
            chartMode: 'Yearly',
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
                            <div className="col-xl-4 col-md-4 col-lg-6">
                                <div className="card bg-gradient-danger op-7 card-stats mb-4 mb-xl-0">
                                    <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                        <h5 className="card-title text-uppercase text-white mb-0">Today's Income</h5>
                                        <span className="h2 font-weight-bold text-white mb-0">350,897</span>
                                        </div>
                                        <div className="col-auto">
                                        <div className="icon icon-shape bg-danger bg-white rounded-circle shadow">
                                            <i className="fa fa-usd"></i>
                                        </div>
                                        </div>
                                    </div>
                                    <p className="mt-3 mb-0 text-muted text-sm">
                                        <span className="text-white mr-2"><i className="fa fa-arrow-up"></i> 3.48%</span>
                                        <span className="text-nowrap text-white">Yesterday</span>
                                    </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-4 col-lg-6">
                                <div className="card bg-gradient-info op-7 card-stats mb-4 mb-xl-0">
                                    <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                        <h5 className="card-title text-uppercase text-white mb-0">Orders</h5>
                                        <span className="h2 font-weight-bold text-white mb-0">350,897</span>
                                        </div>
                                        <div className="col-auto">
                                        <div className="icon icon-shape bg-white rounded-circle shadow">
                                            <i className="fa fa-shopping-cart"></i>
                                        </div>
                                        </div>
                                    </div>
                                    <p className="mt-3 mb-0 text-muted text-sm">
                                        <span className="text-white mr-2"><i className="fa fa-arrow-up"></i> 3.48%</span>
                                        <span className="text-nowrap text-white">Last Week</span>
                                    </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-4 col-lg-6">
                                <div className="card bg-gradient-success op-7 card-stats mb-4 mb-xl-0">
                                    <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                        <h5 className="card-title text-uppercase text-white mb-0">This year's Income</h5>
                                        <span className="h2 font-weight-bold text-white mb-0">350,897</span>
                                        </div>
                                        <div className="col-auto">
                                        <div className="icon icon-shape bg-white rounded-circle shadow">
                                            <i className="fa fa-money"></i>
                                        </div>
                                        </div>
                                    </div>
                                    <p className="mt-3 mb-0 text-muted text-sm">
                                        <span className="text-white mr-2"><i className="fa fa-arrow-up"></i> 3.48%</span>
                                        <span className="text-nowrap text-white">Last Year</span>
                                    </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-12">
                                <div className="card custom-shadow">
                                    <div className="card-body">
                                        <div className="d-flex flex-row mb-3">
                                            <div className="mr-auto">
                                                <h4 className="font-weight-bold">Revenue</h4>
                                            </div>
                                            <div className="ml-auto">
                                            <div className="btn-group">
                                                <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.state.chartMode}</button>
                                                <div className="dropdown-menu">
                                                    <button className="dropdown-item" onClick={() => this.getDataWeekly()}>Week</button>
                                                    <button className="dropdown-item" onClick={() => this.getDataMonthly()}>Month</button>
                                                    <button className="dropdown-item" onClick={() => this.getDataYearly()}>Year</button>
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
                    </div>
                    <div className="col-md-1"></div>
                </div>
            </div>
        )
    }
}

export default Statistic