import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, productActions } from "..";


export const useProductMutationCopy = () => {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn : productActions.createProduct, //pasar referencia
        onSuccess: ( data  ) => { //el arg es lo que regresa la peticion http
            console.log(`Producto creado`)
            /* //invalidar una query
            queryClient.invalidateQueries({ 
                queryKey: ['products', { 'filterKey': data.category }]
            }) */

            //saber como se encuentra la data
            queryClient.setQueryData<Product[]>(
                ["products",{"filterKey": data.category }],
                ( oldData) => {
               
                if(!oldData) return [];
                return [ ...oldData, data]
            })

        },
        onSettled: () => {
            console.log('on Settle') //posterio al success
        }
      });

    return mutation;
}
