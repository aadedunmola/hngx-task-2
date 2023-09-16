import axios from "axios";

const Api = axios.create({
   
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzVlZmE0YzUyNzJiNjYwNGIxNjlmZTBkZDBkZjljMyIsInN1YiI6IjY1MDAxZjQyZmZjOWRlMGVlM2M1YzhkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AwhwZbCMNzE0BoWWFiVPKcemQkqHTJCz_O_naFeCq0M'
    }
});



export default Api;
