import axios from 'axios'

class FoodsService {
    constructor() {
        this.service = axios.create({
            baseURL: 'https://reactr-realfooder.herokuapp.com/api',
            withCredentials: true
        })
    }
    getFoods = () => this.service.get('/foods')
    searchFood = (name) => this.service.get(`/foods/search/${name}`)

    
}
export default FoodsService