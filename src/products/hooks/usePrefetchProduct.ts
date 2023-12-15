import { useQueryClient } from "@tanstack/react-query"
import { productActions } from "..";

export const usePrefetchProduct = () => {

    const queryClient = useQueryClient();

    const prefecthProduct = (id: number) => {

        //capturar data cuando ya se sabe que está en caché
        //const data = queryClient.getQueriesData({ queryKey: ['product', 2] })  console.log('data: ', data )

        queryClient.prefetchQuery({
            queryKey: ['product', id],
            queryFn: () => productActions.getProductById(id),
            //staleTime: 1000*10, //10 segundos
            
        })
    }

  return { prefecthProduct };
}
