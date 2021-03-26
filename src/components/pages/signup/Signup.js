import React, { Component } from 'react'
import AuthService from './../../../service/auth.service'
import CountriesService from './../../../service/countries.service '

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom'


class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loginInfo: {
                username: '',
                password: '',
                country: ''
            },
            errorMessage: ''
        }
        this.authService = new AuthService()
        this.countriesService = new CountriesService ()
    }


    handleInputChange = e => {

        let loginInfoCopy = { ...this.state.loginInfo }
        const { name, value } = e.target
        loginInfoCopy = { ...loginInfoCopy, [name]: value }

        this.setState({ loginInfo: loginInfoCopy })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.authService
            .signup(this.state.loginInfo)        
            .then(response => {
                this.props.setTheUser(response.data)
                this.props.history.push('/') // unas veces funciona y otras no.
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.loadCountries()
    }

    loadCountries() {

        this.countriesService
            .getCountries()
            .then(response => {
                console.log('la respuesta del then',response)
                this.setState({ countries: response.data})})
            .catch(err => console.log(err))

    }




    render() {

        return (
            <Container>

                <Row>
                    <Col md={{ span: 4, offset: 4 }}>

                        <h3>Registro de usuario</h3>
                        <hr></hr>
                        <Form onSubmit={e => this.handleSubmit(e)}>

                            <Form.Group controlId="name">
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control name="username" type="text" value={this.state.username} onChange={e => this.handleInputChange(e)} />
                            </Form.Group>

                            <Form.Group controlId="pwd">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control name="password" type="password" value={this.state.password} onChange={e => this.handleInputChange(e)} />
                            </Form.Group>
                            <Form.Group controlId="country">
                                <Form.Label>País</Form.Label>
                                <Form.Control as="select" name="country" value={this.state.country} onChange={e => this.handleInputChange(e)}>
                                   {this.state.countries?.map(elm =>
                                  <option value={elm.name} key={elm._id}>{elm.name}</option>)}
                                  </Form.Control>
                            </Form.Group>

                            <p
                                className='error-message'
                                style={{ display: this.state.errorMessage ? 'block' : 'none' }}
                            >{this.state.errorMessage}</p>

                            <Button variant="dark" type="submit">Registrarme</Button>
                        </Form>

                        <p><small>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></small></p>

                    </Col>
                </Row>

            </Container>
        )
    }
}


export default Signup