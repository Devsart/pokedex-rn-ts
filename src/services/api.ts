import axios from 'axios';

const api = axios.create({
    //aqui vc coloca seu endereço de hospedagem, deve ser o mesmo presente na pasta server
    baseURL: 'https://pokeapi.co/api/v2'
})

export default api