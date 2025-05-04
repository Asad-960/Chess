import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import agent from '../lib/api/agent';


export const useBoard = (id?: string) => {
    
    const queryClient = useQueryClient();
    
    const token = localStorage.getItem("token");
    
    const CheckValid = useMutation({
       mutationFn: async (board: JSON)  => {
            const response = await agent.put('/api/game/valid', board,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
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
            console.log(`Bearer ${ token}`);
            
            const response = await agent.post('/api/game/create',{},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response.data;
        }
    })
    const VerifyMove = useMutation({
        mutationFn: async (move: JSON) => {
            const response = await agent.put('/api/game/checkthenupdate', move,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }

                }
            );
            return response.data;
        }
    })

    const {data: reloadedGame, isLoading: isLoadingBoard} = useQuery({
        queryKey: ['board', id],
        queryFn: async() => {
            const response = await agent.get<ReloadedGame>(`/api/game/recentboard/${id}`, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            return response.data;
        },
        enabled: !!id,
    })
    return { 
        CheckValid, CreateGame, VerifyMove, reloadedGame, isLoadingBoard
    }

}