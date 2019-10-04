import React, { Component } from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

class History extends Component {
    render(){
        return(
            <div>
                <Navbar />
                <Sidebar />
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-8">
                        ini page history
                    </div>
                    <div className="col-md-3">
                        <p>ini untuk list cart</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default History
