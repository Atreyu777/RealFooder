import axios from 'axios'

class CountriesService {
    constructor() {
        this.service = axios.create({
            baseURL: 'https://reactr-realfooder.herokuapp.com/api',
            withCredentials: true
        })
    }
    getCountries = () => this.service.get('/countries')

    
}
export default CountriesService