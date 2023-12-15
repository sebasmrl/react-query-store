import { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { ProductCard, useProduct } from "..";



export const ProductByIdPage = () => {

    const { id } = useParams();
  
    const { isLoading, product } = useProduct({
        id: Number(id)
      });

    useEffect (() => {
      window.scrollTo(0, 0);
    
     
    }, [])
    

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Producto</h1>

      {isLoading && <p>Loading...</p>}

    {
        product && <ProductCard product={product} fullDescription/>
    }

    </div>
  )
}