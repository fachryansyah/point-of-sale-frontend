import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'
import '@trendmicro/react-sidenav/dist/react-sidenav.css'

class Sidebar extends Component {

    constructor(){
        super()
        this.state = {
            isRedirect : false
        }
    }

    logoutUser(){
        const token = localStorage.getItem("apiToken")
        console.log("logged out")
        if (token) {
            localStorage.removeItem("apiToken")
            this.setState({
                isRedirect: true
            })
        }
    }

    render(){
        if (this.state.isRedirect) {
            return (<Redirect to="/login" />)
        }
        return(
            <div>
                <Route render={({ history }) => (
                    <SideNav
                        onSelect={ (selected) => {
                            if (selected == "logout") {
                                this.logoutUser()
                            }else{
                                history.push(`/${selected}`)
                            }
                        }}
                        style={{ backgroundColor: '#fff' }}
                        className="sidebar-fix"
                    >
                    <SideNav.Toggle style={{ backgroundColor: '#d93c34' }} />
                        <SideNav.Nav>
                            <NavItem eventKey="">
                                <NavIcon>
                                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em', color: '#d93c34' }} />
                                </NavIcon>
                                <NavText style={{ color: '#e86f68' }}>
                                    Home
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="history">
                                <NavIcon>
                                    <i className="fa fa-history" style={{ fontSize: '1.75em', color: '#d93c34' }} />
                                </NavIcon>
                                <NavText style={{ color: '#e86f68' }}>
                                    History
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="add">
                                <NavIcon>
                                    <i className="fa fa-plus" style={{ fontSize: '1.75em', color: '#d93c34' }} />
                                </NavIcon>
                                <NavText style={{ color: '#e86f68' }}>
                                    Add Product
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="manage">
                                <NavIcon>
                                    <i className="fa fa-wrench" style={{ fontSize: '1.75em', color: '#d93c34' }} />
                                </NavIcon>
                                <NavText style={{ color: '#e86f68' }}>
                                    Manage Product
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="logout">
                                <NavIcon>
                                    <i className="fa fa-sign-out" style={{ fontSize: '1.75em', color: '#d93c34' }} />
                                </NavIcon>
                                <NavText style={{ color: '#e86f68' }}>
                                    Logout
                                </NavText>
                            </NavItem>
                        </SideNav.Nav>
                    </SideNav>
                )} />
            </div>
        )
    }
}

export default Sidebar
