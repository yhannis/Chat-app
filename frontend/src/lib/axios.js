

import axios from "axios";


export const axiosInstance = axios.create({

    baseURL: "http://localhost:3001/api", //used to include cookies w/ every request
    withCredentials: true
})