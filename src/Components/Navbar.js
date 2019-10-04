import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {

    render(){
        return(
            <div>
                <nav className="navbar navbar-light bg-white p-0 custom-shadow-sm nav-fix">
                    <div className="container">
                        <div className="m-auto">
                            <Link to="/" className="navbar-brand">Pointzo</Link>
                        </div>
                        <ul className="navbar-nav d-flex flex-row">
                            <li className="nav-item  mt-2 mb-2">
                                <div className="form-group m-0">
                                    <div className="input-group input-group-alternative">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-search"></i></span>
                                        </div>
                                        <input className="form-control form-control-alternative" placeholder="Search" type="text" />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar
