import React from 'react'
import { Component } from 'react'
import FoodsService from './../../../service/foods.service'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { Link  } from 'react-router-dom'


class FoodDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            food: undefined

        }
        this.foodsService = new FoodsService()
    }

    componentDidMount() {
        this.loadFood()
    }

    loadFood() {
        const food_id = this.props.match.params.food_id

        this.foodsService
            .getFood(food_id)
            .then(response => this.setState({ food: response.data }))
            .catch(err => console.log(err))
    }
    render() {
        return (
            <Container>

                <>
                    <Row>
                        <Col md={4}>
                            <h2>{this.state.food?.name}</h2>
                            <img src={this.state.food?.img} alt="" style={{ width: 200 }} />

                        </Col>
                        <Col md={8}>
                            <h3>Especificaciones</h3>
                            <p>{this.state.food?.description}</p>
                            <h5>Precio: {this.state.food?.price} €</h5>

                            <Tabs>
                                <Tab eventKey="nutricional" title="Nutricional">
                                    <h6>Información Nutricional</h6>
                                    <h6>Aporte nutricional por 100gr</h6>
                                    <ul>
                                        <li>Calorias: {this.state.food?.kcal}</li>
                                        <li>Proteinas: {this.state.food?.protein}</li>
                                        <li>Grasas: {this.state.food?.fat}</li>
                                        <li>Carbohidratos: {this.state.food?.carbs}</li>
                                    </ul>
                                </Tab>

                                <Tab eventKey="Origen" title="Origen">
                                    <h6>{this.state.food?.name} procedente de:</h6>
                                    <ul>
                                        {this.state.food?.origin.map((elm) => <li>{elm}</li>)}
                                    </ul>
                                </Tab>

                                <Tab eventKey="Stock" title="Stock" >
                                    <p>Stock</p>
                                    <hr></hr>
                                    <p>Stock actual: {this.state.food?.stock} unidades en stock</p>
                                </Tab>
                            </Tabs>
                        <Link to={'/alimentos'} className="btn btn-info" style={{ margin: 10 }}>Volver al índice</Link>
                        </Col>

                    </Row>
                </>
            </Container>
        )
    }
}

export default FoodDetails