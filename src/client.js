import axios from "axios";


const Client = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, 
});


export default Client;