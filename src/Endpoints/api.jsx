import axios from "axios";

const Api = axios.create({
   
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWExYmFkYWQ0NTQyODY1ZWNjMjg1ODUzZWI2ZGJhYyIsInN1YiI6IjY1MDAxZWUzZDdkY2QyMDBmZmViNzlkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.O7rhKk95E5WuflXU2ZfvknlcTGpoVl7BJpxlktHffHw'
    }
});

export default Api;
