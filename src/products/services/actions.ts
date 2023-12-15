import { type Product, productsApi } from "..";



interface GetProductSOptions {
    filterKey?: string;
} 


const sleep = (seconds: number):Promise<boolean> => {

    return new Promise( (resolve,)=>{
  
      setTimeout(() => {
        resolve(true);
      }, seconds*1000);
    })
  }

const getProducts = async({ filterKey }:GetProductSOptions)=>{

    console.log("Fetch hecho")
    await sleep(0);
    const filterUrl = ( filterKey) ? `category=${filterKey}` : ''

    const { data } = await productsApi.get<Product[]>(`/products?${filterUrl}`);

    return data;
}


const getProductById = async( id:number ):Promise<Product> => { 

    console.log("Fetch hecho")
    //await sleep(2);
    
    const { data } = await productsApi.get<Product>(`/products/${id}`);
    return data;
}


type ProductLike = {
    id?:          number;
    title:       string;
    price:       number;
    description: string;
    category:    string;
    image:       string;
}

const createProduct = async( product:ProductLike ) => {
  await sleep(5); // ----


  console.log('creater Product Action en ejecución')
  throw new Error("Error Creating Product Papu");
  
  const { data } = await productsApi.post<Product>(`/products`, product)
  return data;
}



export  {
    getProducts,
    getProductById,
    createProduct, 
    type ProductLike 
}