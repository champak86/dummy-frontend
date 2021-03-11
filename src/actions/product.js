import axios from "axios";

export const getProducts = (page) => {
    return axios.get(`${process.env.REACT_APP_BASE_URL}v1/products?page=${page}`)
}