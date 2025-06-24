import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "https://memoirapp-xass.onrender.com/api" : "/api"
const instance = axios.create({
    baseURL: BASE_URL
})

export default instance;
