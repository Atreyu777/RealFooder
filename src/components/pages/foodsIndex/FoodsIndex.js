import React, { Component } from 'react'
import FoodsService from '../../../service/foods.service'
import { Container, Row, Col, Table, Form } from 'react-bootstrap'
import Search from './FoodSearch'


class FoodsIndex extends Component {

    constructor() {
        super()
        this.state = {
            foods: []
        }

        this.foodsService = new FoodsService()
    }

    componentDidMount() {
        this.loadFoods()
        // this.filterFood()
    }

    loadFoods() {
        this.foodsService
            .getFoods()
            .then(response => this.setState({ foods: response.data }))
            .catch(err => console.log(err))
    }

    // handleSubmit(e) {
    //     e.preventDefault()

    //     this.foodsService
    //         .searchFood(this.state.foods.name)
    //         .then(response => this.setState({ foods: response.data }))
    //         .catch(err => console.log(err))
    // }

    // filterFood = () => {
    //     let foods = [...this.state.foods];
    //     if (this.state.search) {
    //       foods = this.state.foods.filter(({ name }) =>
    //         name.toLowerCase().includes(this.state.search)
    //         || name.toUpperCase().includes(this.state.search)
    //         || name.includes(this.state.search)
    //       );
    //     }
    //     return foods;
    //   }

    filterFood(searchTerm) {
        this.setState({
            foods: this.state.foods.filter((food) => food.name.includes(searchTerm))
        })
    }

    render() {

        return (
            <Container>
                <h1>Stock de alimentos</h1>
                <p>Consulta los detalles de stock, precios y origen de nuestros alimentos</p>

                <Search filterFood={(inputText) => this.filterFood(inputText)} resfreshList={() => this.loadFoods()} />
                <Row>
                    <Col md={10}>
                        <Table>
                            <tbody>                              
                                    {this.state.foods?.map((food) =>
                                        <tr key={food._id}>
                                            <td><img src={food.img} /></td>
                                            <td>{food.name}</td>
                                            <td>Precio: {food.price} </td>
                                            <td>Stock disponible: {food.stock}</td>
                                        </tr>
                                    )
                                    }                               
                            </tbody>
                        </Table>

                    </Col>
                </Row>


            </Container>


        )
    }
}
export default FoodsIndex