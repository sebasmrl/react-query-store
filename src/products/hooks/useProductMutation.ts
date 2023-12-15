import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, productActions } from "..";


export const useProductMutation = () => {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn : productActions.createProduct, //pasar referencia

        onMutate: ( dataToServer )=>{
            console.log('Mutando - Actualizacion Optimista: ', dataToServer);

            const optimisticProduct= {id: Math.random(), ...dataToServer};

            //Almacenar el producto el cache del queryClient
            queryClient.setQueryData<productActions.ProductLike[]>(
                ["products", { filterKey: dataToServer.category }],
                ( oldData) => {
               
                if(!oldData) return [optimisticProduct];
                return [ ...oldData, optimisticProduct] 
            })

            //context
            return {
                optimisticProduct
            }

        },



        onSuccess: ( productData,variables, context  ) => { //el 1er arg es lo que regresa la peticion http, variables son los arg metidos en la funcion mutationFn
            console.log({productData, variables, context});
            console.log(`Producto creado`)

            /* //invalidar una query
            queryClient.invalidateQueries({ 
                queryKey: ['products', { 'filterKey': data.category }]
            }) */

            queryClient.removeQueries( {
                queryKey: ['products', context?.optimisticProduct.id]
            })

            //saber como se encuentra la data
            queryClient.setQueryData<Product[]>(
                ["products",{"filterKey": productData.category }],
                ( oldData) => {
               
                if(!oldData) return [];
                //return [ ...oldData, data]

                return oldData.map( (OldOneProduct)=>{
                    return OldOneProduct.id === context?.optimisticProduct.id ? productData : OldOneProduct;
                } )
            })

        },


       /*  onSettled: () => {
            console.log('on Settle') //posterio al success
        }, */

        onError: (err, variables, context) => {
            console.log(err)

            queryClient.removeQueries({
                queryKey: ['products', context?.optimisticProduct.id]
            })

            /* queryClient.invalidateQueries({
                queryKey: ["products",{"filterKey": variables.category }]
            })
            */

            
             queryClient.setQueryData<Product[]>(
                ["products",{"filterKey": variables.category }],
                ( oldData) => {
                
                if(!oldData) return[];
                //return [ ...oldData, data]

                return oldData.filter( (cacheProduct)=>{
                    return cacheProduct.id !== context?.optimisticProduct.id;
                } )
            })
            

        }
      });

    return mutation;
}
