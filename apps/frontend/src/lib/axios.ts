
import axios from "axios";


const backendCall = axios.create({
    baseURL: process.env.BUN_PUBLIC_API_URL,
    withCredentials: true,
  });


  export { backendCall }