import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Http from '../Http'

class Login extends Component {

    constructor(){
        super()
        this.state = {
            email: "",
            password: "",
            isLoading: false,
            isLoggedIn: false
        }
    }

    handleChange(e) {
        const name = e.target.name
        const value = e.target.value

        this.setState({
            [name] : value
        })
    }

    async loginUser(){
        this.setState({
            isLoading: true
        })
        await Http.post('/auth/login', {
            email: this.state.email,
            password: this.state.password,
        })
        .then((res) => {
            console.log(res.data.status)
            if (res.data.status === 200) {
                window.location.replace("/")
                localStorage.setItem("apiToken", res.data.data.apiKey)
            }
            if (res.data.status === 500) {
                toast.error(res.data.message, {
                    className: 'bg-danger'
                })
            }
            this.setState({
                isLoading: false
            })
        })
        .catch((err) => {
            this.setState({
                isLoading: false
            })
            console.log(err.message)
        })
    }

    __renderBtnSign(){
        if (this.state.isLoading) {
            return(<div className="lds-ripple"><div></div><div></div></div>)
        }else{
            return(
                <button
                    className="btn btn-danger my-4"
                    onClick={() => this.loginUser()}>
                    Sign in
                </button>
            )
        }
    }

    render(){
        if (this.state.isLoggedIn) {
            return window.location.replace("/");
            // return (<Redirect to="#/" />)
        }
        return(
            <div>
                <div className="container pt-lg-md">
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <div className="animated fadeInUp delay-1s card bg-secondary shadow border-0">
                                <div className="card-header bg-white pb-2">
                                    <div className="text-muted text-center">
                                        <h4>POINTZO</h4>
                                    </div>
                                </div>
                                <div className="card-body px-lg-5 py-lg-5">
                                    <div className="text-center text-muted mb-4">
                                        <small>Login to continue</small>
                                    </div>
                                    <form>
                                        <div className="form-group">
                                            <div className="input-group input-group-alternative">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="ni ni-email-83"></i></span>
                                                </div>
                                                <input className="form-control" name="email" placeholder="Email" type="email" onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group input-group-alternative">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="ni ni-lock-circle-open"></i></span>
                                                </div>
                                                <input className="form-control" name="password" placeholder="Password" type="password" onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            { this.__renderBtnSign() }
                                        </div>
                                    </form>
                                    <div className="text-center">
                                        <Link className="text-light" to="/register"><small>Create new Account</small></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
