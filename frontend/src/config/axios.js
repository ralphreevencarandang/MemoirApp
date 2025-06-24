import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "https://memoirapp-xass.onrender.com/api"
const instance = axios.create({
    baseURL: "https://memoirapp-xass.onrender.com/api"
})

export default instance;
