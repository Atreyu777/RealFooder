import React, { Component } from 'react'
import FoodsService from './../../../service/foods.service'
import { Form, Button, Row, Col } from 'react-bootstrap'

class FoodForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            food: {
                id: props.food?._id || '',
                name: props.food?.name || '',
                description: props.food?.description || '',
                img: props.food?.img || '',
                price: props.food?.price || '',
                kcal: props.food?.kcal || '',
                protein: props.food?.protein || '',
                fat: props.food?.fat || '',
                carbs: props.food?.carbs || '',
                stock: props.food?.stock || '',
                origin: props.food?.origin || '',
                owner_id: props.user || ''
            }
        }
        this.foodsService = new FoodsService()
    }

    handleInputChange(e) {
        let { name, value } = e.target
        if (name === "origin") {
            value = value.split(",")
            value = value.map(elm => elm.trim())
        }
        this.setState({ food: { ...this.state.food, [name]: value } })
    }

    handleSubmit(e) {
        e.preventDefault()
        if (this.props.food) {
            this.foodsService
                .editFood(this.state.food.id, this.state.food)
                .then(() => {
                    this.finishAction()
                    this.props.handleAlert(true, "Requistro modificado", "Se ha modificado el alimento")
                })
                .catch(err => console.log(err))
        } else {
            this.foodsService
                .createFood(this.state.food)
                .then(() => {
                    this.finishAction()
                    this.props.handleAlert(true, "Registro añadido", "Se ha añadido el alimento")
                })
                .catch(err => console.log(err))
        }
    }

    finishAction() {
        this.props.closeModal()
        this.props.refreshList()

    }

    render() {
        return (

            <>
                <h3>{this.props.food ? "Editar Alimento " : "Nuevo Alimento"}</h3>
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
                            <Button variant="info" type="submit">{this.props.food ? "Modificar Alimento " : "Crear Alimento"}</Button>
                        </Col>
                    </Row>
                </Form>
            </>
        )
    }
}

export default FoodForm