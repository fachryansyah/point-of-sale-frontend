import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

class Statistic extends Component {
    render(){
        const options = {
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        };
        const data = {
            labels: ['1-10-2019', '2-10-2019', '3-10-2019', '4-10-2019', '5-10-2019', '6-10-2019', '7-10-2019', '8-10-2019', '9-10-2019', '10-10-2019', '11-10-2019', '12-10-2019'],
            datasets: [
                {
                    label: 'This Month',
                    data: [12, 19, 3, 5, 2, 3, 29, 39, 36, 21, 12, 6],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    borderWidth: 3
                },
                {
                    label: 'Last Month',
                    data: [14, 12, 7, 15, 12, 23, 31, 16, 30, 37,13],
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
                                                <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Month</button>
                                                <div className="dropdown-menu">
                                                    <a className="dropdown-item" href="#">Day</a>
                                                    <a className="dropdown-item" href="#">Week</a>
                                                    <a className="dropdown-item" href="#">Month</a>
                                                    <a className="dropdown-item" href="#">Year</a>
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
                                            options={options}
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