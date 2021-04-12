import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import { Switch, Route } from 'react-router-dom'
import Navbar from './ui/navbar/Navbar'
import IndexPage from './pages/index/Index-page'

import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import FoodsIndex from './pages/foodsIndex/FoodsIndex'
import FoodDetails from './pages/foodsIndex/FoodDetails'
import FoodForm from './pages/foodsIndex/FoodForm'

import Alert from './shared/Alert'

import AuthService from '../service/auth.service'

class App extends Component {

    constructor() {
        super()
        this.state = { 
            loggedInUser: null,
            alert: {
                show: false,
                title: "",
                message: ""
            }
             
        }
        this.authService = new AuthService()
    }

    setTheUser = userObj => this.setState({ loggedInUser: userObj }, () => console.log('El estado de App ha cambiado:', this.state))

    fetchUser = () => {
        if (this.state.loggedInUser === null) {
            this.authService.isLoggedIn()
                .then(response => this.setTheUser(response.data))
                .catch(() => this.setTheUser(false))
        }
    }
handleAlert = (show, title, message) => this.setState({alert: {show, title, message}})


    render() {

        this.fetchUser()

        return (
            <>
                <Navbar setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />
                <Switch>
                    <Route path="/" exact component={IndexPage} />
                    <Route path="/login" render={props => <Login {...props} setTheUser={this.setTheUser} />} />
                    <Route path="/signup" render={props => <Signup {...props} setTheUser={this.setTheUser} />} />
                    <Route path="/alimentos" render={props => <FoodsIndex {...props} loggedInUser={this.state.loggedInUser} handleAlert={this.handleAlert} />} />
                    <Route path="/detalles/:food_id" render={props => <FoodDetails {...props} loggedInUser={this.state.loggedInUser} />} />
                    <Route path="/alimentos/nuevoAlimento" render={() => <FoodForm loggedInUser={this.state.loggedInUser} />} />
                    <Route path="/editar/:food_id" render={props => <FoodDetails {...props} loggedInUser={this.state.loggedInUser} handleAlert={this.handleAlert} />} />
                    
                </Switch>
                <Alert handleAlert={this.handleAlert} show={this.state.alert.show} title={this.state.alert.title} message={this.state.alert.message}/>
            </>
        )
    }
}

export default App