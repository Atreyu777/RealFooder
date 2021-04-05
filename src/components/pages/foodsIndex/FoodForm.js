import React, { Component } from 'react'
import FoodsService from './../../../service/foods.service'
import { Form, Button, Row, Col } from 'react-bootstrap'

class FoodForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            food: {
            name: '',
            description: '',
            img: '',
            price: '',
            kcal: '',
            protein: '',
            fat: '',
            carbs: '',
            stock: '',
            origin: ''
            }
        }
        this.foodsService = new FoodsService()
    }

    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({ food: { ...this.state.food, [name]: value } })
    }

    handleSubmit(e) {
        e.preventDefault()
        
        this.foodsService
            .createFood(this.state.food)
            .then(() => this.finishAction())            
            .catch(err => console.log(err))
    }

    finishAction(){
        this.props.closeModal()
        this.props.refreshList()
    }



    render() {
        return (

            <>
                <h3>Nuevo Alimento</h3>
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control value={this.state.food.name} name="name" type="text" onChange={e => this.handleInputChange(e)} />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control value={this.state.food.description} as="textarea" name="description" type="text" onChange={e => this.handleInputChange(e)} />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>País de origen</Form.Label>
                                <Form.Control value={this.state.food.origin} name="origin" type="text" onChange={e => this.handleInputChange(e)} />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Imagen</Form.Label>
                                <Form.Control value={this.state.food.img} name="img" type="text" onChange={e => this.handleInputChange(e)} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                    <Form.Group  >
                                        <Form.Label>Precio</Form.Label>
                                        <Form.Control value={this.state.food.price} name="price" type="number" onChange={e => this.handleInputChange(e)} />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Proteínas</Form.Label>
                                        <Form.Control value={this.state.food.protein} name="protein" type="number" onChange={e => this.handleInputChange(e)} />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Carbohidratos</Form.Label>
                                        <Form.Control value={this.state.food.carbs} name="carbs" type="number" onChange={e => this.handleInputChange(e)} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group >
                                        <Form.Label>Kcal</Form.Label>
                                        <Form.Control value={this.state.food.kcal} name="kcal" type="number" onChange={e => this.handleInputChange(e)} />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Grasas</Form.Label>
                                        <Form.Control value={this.state.food.fat} name="fat" type="number" onChange={e => this.handleInputChange(e)} />
                                    </Form.Group>
                                    <Form.Group  >
                                        <Form.Label>Stock</Form.Label>
                                        <Form.Control value={this.state.food.stock} name="stock" type="number" onChange={e => this.handleInputChange(e)} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group>
                                <Form.Check required name="imp" label="Aplica impuestos de importación" />
                            </Form.Group>
                            <Button variant="info" type="submit">Crear Alimento</Button>
                        </Col>
                    </Row>
                </Form>
            </>
        )
    }
}

export default FoodForm 