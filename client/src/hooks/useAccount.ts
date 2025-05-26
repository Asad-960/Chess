import { useMutation } from "@tanstack/react-query";
import agent from "../lib/api/agent";



export const useAccount = () => {
    const userLogin = useMutation({
        mutationFn: async (user: Login) => {
            console.log('[DEBUG] API URL:', import.meta.env.VITE_API_URL);
            const response = await agent.post('/account/login', user, 
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        }
    })

    const userRegister = useMutation({
        mutationFn: async (user: Register) => {
            const response = await agent.post('/account/register', user, 
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        }
    })

    return {userLogin, userRegister}
}
