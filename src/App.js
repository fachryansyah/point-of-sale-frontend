import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import Http from './Http'
import Dashboard from './Screens/Dashboard'
import History from './Screens/History'
import Login from './Screens/Login'
import Register from './Screens/Register'
import AddProduct from './Screens/AddProduct'
import UpdateProduct from './Screens/UpdateProduct'
import ManageProduct from './Screens/ManageProduct'

class App extends Component {
    constructor() {
        super()
        this.state = {
            isLoggedIn : false
        }
    }

    componentDidMount(){
        const token = localStorage.getItem("apiToken")
        if (token) {
            Http.get("/user")
            .then((res) => {
                console.log(res.data)
                if (res.data.status == 200) {
                    toast.success("Logged in!", {
                        className: 'bg-success'
                    })
                    this.setState({
                        isLoggedIn: true
                    })
                }

                if (res.data.status == 403) {
                    toast.error("Can't logged in, please re login!", {
                        className: 'bg-danger'
                    })
                    this.setState({
                        isLoggedIn: false
                    })
                }
            })
            .catch((err) => {
                console.log(err.message)
            })
        }
    }

    render(){
        if (!this.state.isLoggedIn) {
            return(
                <div className="bg-deep-white">
                    <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
                    <Router>
                        <Redirect to="/login" />
                        <Route path={'/login'} exact component={Login}></Route>
                        <Route path={'/register'} exact component={Register}></Route>
                    </Router>
                </div>
            )
        }
        return(
            <div className="bg-deep-white">
                <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
                <Router>
                    <Redirect to="/" />
                    <Route path={'/'} exact component={Dashboard}></Route>
                    <Route path={'/add'} exact component={AddProduct}></Route>
                    <Route path={'/update/:id'} exact component={UpdateProduct}></Route>
                    <Route path={'/manage'} exact component={ManageProduct}></Route>
                    <Route path={'/history'} exact component={History}></Route>
                    <Route path={'/login'} exact component={Login}></Route>
                    <Route path={'/register'} exact component={Register}></Route>
                </Router>
            </div>
        )
    }
}

export default App
