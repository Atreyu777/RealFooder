import React, { Component } from 'react'
import FoodsService from '../../../service/foods.service'
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { Link} from 'react-router-dom'



class FoodsIndex extends Component {

    constructor(props) {
        super(props)
        this.state = {
            foods: [],
            text: ''
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

    render() {

        return (
            <main>
                <Container>
                    <h1>Stock de alimentos</h1>
                    <p>Consulta los detalles de stock, precios y origen de nuestros alimentos</p>
                    <input className="form-control" value={this.state.text} onChange={(text) => this.filter(text)} />
                    <br />
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
                                            <td>{{ ...food.origin } === this.props.loggedInUser.country ? 'Proximidad' : 'otro'}</td>
                                            {/* origin esta dentro de un array pero no se la sintaxis necesaria o como plantearla para que funcione */}
                                            <Link to={`/detalles/${food._id}`} as="Button" type="Button" >Detalles</Link>

                                        </tr>

                                    )
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </main>

        )
    }
}
export default FoodsIndex