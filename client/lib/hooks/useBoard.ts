import {useMutation, useQueryClient} from '@tanstack/react-query'
import agent from '../api/agent';


export const useBoard = () => {
    
    const queryClient = useQueryClient();

    const CheckValid = useMutation({
       mutationFn: async (board: JSON)  => {
            const response = await agent.put('/valid', board,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response.data;
       },
        onSuccess: async () => {
         await queryClient.invalidateQueries({
            queryKey: ['board']  
         })
         
        }
    })

    const StartGame = useMutation({
        mutationFn: async() => {
            const response = await agent.post('/game');
            return response.data;
        }
    })
    return { 
        CheckValid, StartGame
    }

}