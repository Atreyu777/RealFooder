import axios from 'axios'

class FoodsService {
    constructor() {
        this.service = axios.create({
            baseURL: 'https://reactr-realfooder.herokuapp.com/api',
            withCredentials: true
        })
    }
    getFoods = () => this.service.get('/foods')
    getFood = (_id) => this.service.get(`/foods/details/${_id}`)
    createFood = food => this.service.post('/foods/newFood', food)
    deleteFood = foodId => this.service.delete(`/foods/delete/${foodId}`)
    editFood = (foodId, food) => this.service.put(`/foods/edit/${foodId}`, food)
}
export default FoodsService