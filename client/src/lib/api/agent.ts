import axios from "axios"

const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

agent.interceptors.response.use(
    response => response,
    error => {
        const { response } = error;
        if (response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }        
        return Promise.reject(error);
    }
)
export default agent;