import axios from "axios"

const apiCient = axios.create({
    baseURL: 'https://localhost:3000',
  });

  export default apiCient