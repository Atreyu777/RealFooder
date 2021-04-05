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
}
export default FoodsService