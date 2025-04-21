import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import agent from '../api/agent';


export const useBoard = (id?: string) => {
    
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
    
    const CreateGame = useMutation({
        mutationFn: async () => {
            const response = await agent.post('/create');
            return response.data;
        }
    })
    const VerifyMove = useMutation({
        mutationFn: async (move: JSON) => {
            const response = await agent.put('/checkthenupdate', move,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }

                }
            );
            return response.data;
        }
    })

    const {data: reloadedGame, isLoading: isLoadingBoard} = useQuery({
        queryKey: ['board', id],
        queryFn: async() => {
            const response = await agent.get<ReloadedGame>(`/recentboard/${id}`)
            return response.data;
        },
        enabled: !!id,
    })
    return { 
        CheckValid, CreateGame, VerifyMove, reloadedGame, isLoadingBoard
    }

}