import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import Http from '../Http'

class Register extends Component {

    constructor(){
        super()
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            errors: [],
            isLoading: false,
            isRedirect: false
        }
    }

    handleChange(e){
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name] : value
        })
    }

    registerUser(){
        const { firstname, lastname, email, password } = this.state

        if (this.state.password != this.state.retypePassword) {
            this.setState({
                isLoading: false
            })
            return toast.error("Password doesn't match!", {
                className: 'bg-danger'
            })
        }

        Http.post("/auth/register", {
            firstname,
            lastname,
            email,
            password
        })
        .then((res) => {
            if (res.data.status == 200) {
                this.setState({
                    isRedirect: true,
                    isLoading: false
                })
                toast.success("Successfully registered!", {
                    className: 'bg-success'
                })
            }

            if (res.data.status == 304) {
                this.setState({
                    errors: res.data.errors,
                    isLoading: false
                })
                toast.error("Oops validation error, please check your fields", {
                    className: "bg-danger"
                })
            }
        })
        .catch((err) => {
            this.setState({
                isLoading: false
            })
            console.log(err.message)
        })
    }

    __renderNotifError(param){
        if (this.state.errors.length > 0) {
            let error = this.state.errors.find(error => error.param === param)
            if (error) {
                return(
                    <small className="text-danger">{error.msg}</small>
                )
            }
        }
    }

    __renderBtnRegister(){
        if (this.state.isLoading) {
            return(<div class="lds-ripple m-auto"><div></div><div></div></div>)
        }else{
            return(<button
                    type="button"
                    className="btn btn-danger my-4"
                    onClick={ async () => {
                        this.setState({
                            isLoading: true
                        })
                        await setTimeout(() => {
                            this.registerUser()
                        }, 2000)
                    }}>
                        Register
                </button>
            )
        }
    }

    render(){
        if (this.state.isRedirect) {
            return (<Redirect to="/login" />)
        }
        return(
            <div>
                <div className="container pt-lg-md">
                    <div className="row justify-content-center mb-5">
                        <div className="col-md-8 mb-4">
                            <div className="card bg-secondary shadow border-0">
                                <div className="card-header bg-white pb-2">
                                    <div className="text-muted text-center">
                                        <h4>POINTZO</h4>
                                    </div>
                                </div>
                                <div className="card-body px-lg-5 py-lg-5">
                                    <div className="text-center text-muted mb-4">
                                        <small>Register to continue</small>
                                    </div>
                                    <form className="row">
                                        <div className="col-md-6 form-group mb-3">
                                            <div className="input-group input-group-alternative">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="ni ni-circle-08"></i></span>
                                                </div>
                                                <input className="form-control" name="firstname" placeholder="Firstname" type="text" onChange={(e) => this.handleChange(e)} />
                                            </div>
                                            {this.__renderNotifError("firstname")}
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <div className="input-group input-group-alternative">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="ni ni-circle-08"></i></span>
                                                </div>
                                                <input className="form-control" name="lastname" placeholder="Lastname" type="text" onChange={(e) => this.handleChange(e)} />
                                            </div>
                                            {this.__renderNotifError("lastname")}
                                        </div>
                                        <div className="col-md-12 form-group">
                                            <div className="input-group input-group-alternative">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="ni ni-email-83"></i></span>
                                                </div>
                                                <input className="form-control" name="email" placeholder="Email" type="email" onChange={(e) => this.handleChange(e)} />
                                            </div>
                                            {this.__renderNotifError("email")}
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <div className="input-group input-group-alternative">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="ni ni-lock-circle-open"></i></span>
                                                </div>
                                                <input className="form-control" name="password" placeholder="Password" type="password" onChange={(e) => this.handleChange(e)} />
                                            </div>
                                            {this.__renderNotifError("password")}
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <div className="input-group input-group-alternative">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="ni ni-lock-circle-open"></i></span>
                                                </div>
                                                <input className="form-control" name="retypePassword" placeholder="Retype Password" type="password" onChange={(e) => this.handleChange(e)} />
                                            </div>
                                            {this.__renderNotifError("password")}
                                        </div>
                                    </form>
                                    <div className="m-auto d-flex flex-column">
                                        {this.__renderBtnRegister()}
                                        <Link className="text-light" to="/login"><small>Already have account ?</small></Link>
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

export default Register
