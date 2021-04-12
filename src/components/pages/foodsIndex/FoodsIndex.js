import React, { Component } from 'react'
import FoodsService from '../../../service/foods.service'
import { Container, Row, Col, Table, Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FoodForm from './FoodForm'



class FoodsIndex extends Component {

    constructor() {
        super()
        this.state = {
            foods: [],
            text: '',
            showForm: false,
            foodToEdit: undefined
        }
        this.foodsService = new FoodsService()
    }

    componentDidMount() {
        this.loadFoods()
    }

    loadFoods() {
        this.foodsService
            .getFoods()
            .then(response => this.setState({ foods: response.data }))
            .catch(err => console.log(err))
    }

    deleteFood(foodId) {
        this.foodsService
            .deleteFood(foodId)
            .then(() => {
                this.loadFoods()
                this.props.handleAlert(true, "Registro borrado", "Se ha borrado el alimento")
            })
            .catch(err => console.log(err))

    }

    filter(event) {
        let text = event.target.value
        const data = this.state.foods
        const newData = data.filter(function (item) {
            const itemData = item.name.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            foods: newData,
            text: text,
        })
    }
    toggleModalForm(value, food) {
        this.setState({ showForm: value, foodToEdit: food })

    }

    render() {

        return (
            <main>
                <Container>
                    <h1>Stock de alimentos</h1>
                    <p>Consulta los detalles de stock, precios y origen de nuestros alimentos</p>
                    <input className="form-control" value={this.state.text} onChange={(text) => this.filter(text)} />
                    <br />
                    {this.props.loggedInUser
                        &&
                        <Button variant="info" onClick={() => this.toggleModalForm(true)} style={{ margin: 20 }}>Añade tu alimento</Button>
                    }
                    <Row>
                        <Col md={10}>
                            <Table>
                                <tbody>
                                    {this.state.foods?.map((food) =>

                                        <tr key={food._id}>
                                            <td><img src={food.img} alt='' /></td>
                                            <td>{food.name}</td>
                                            <td>Precio: {food.price} </td>
                                            <td>Stock disponible: {food.stock}</td>
                                            <td>{{ ...food.origin } === this.props.loggedInUser.country ? 'Proximidad' : ''}</td>
                                            <td>
                                                <Link to={`/detalles/${food._id}`} className="btn btn-info" style={{ margin: 10 }}>Detalles</Link>


                                                {food.owner_id === this.props.loggedInUser._id
                                                    &&
                                                    <>
                                                        <Button onClick={() => this.toggleModalForm(true, food)} className="btn btn-info">Editar</Button>
                                                        <Button onClick={() => this.deleteFood(food._id)} refreshList={() => this.loadFoods()} className="btn btn-info">Borrar</Button>
                                                    </>
                                                }



                                            </td>
                                        </tr>
                                    )
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Modal show={this.state.showForm} onHide={() => this.toggleModalForm(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Formulario de alimento</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FoodForm handleAlert={this.props.handleAlert} food={this.state.foodToEdit} user={this.props.loggedInUser?._id} closeModal={() => this.toggleModalForm(false)} refreshList={() => this.loadFoods()} />
                        </Modal.Body>
                    </Modal>
                </Container>
            </main>

        )
    }
}
export default FoodsIndex