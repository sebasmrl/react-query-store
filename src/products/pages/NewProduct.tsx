import { Button, Image, Input, Textarea } from "@nextui-org/react";
import { Controller, SubmitHandler,useForm } from "react-hook-form";
import { useProductMutation } from '..';


type FormInputs = {
  title:       string;
  price:       number;
  description: string;
  category:    string;
  image:       string;
}


export const NewProduct = () => {

  /* const productMutation = useMutation({
    mutationFn : productActions.createProduct, //pasar referencia
    onSuccess: () => {
      console.log(`Producto creado`)
    }
  }); */
  const productMutation = useProductMutation();

  const { control, handleSubmit, watch} = useForm<FormInputs>({
    defaultValues: {
      title: "Camiseta",
      price: 153.000,
      category: "men's clothing",
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita nam excepturi corrupti hic eaque repellat accusamus nobis est eligendi, quia amet. Fuga exercitationem quibusdam beatae neque excepturi officiis quo accusantium",
      image:"https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    }
  });

  const newImage = watch('image');
  /*
    control: conectar mis input personaizados nextU, con estos controles de formulario
    register: es una funcion para hacer lo mismo
    handleSubmit: funcion para hacer el submit
  */

  const onSubmitFunction: SubmitHandler<FormInputs> = (data) => {
    //console.log("data: ",data)
    productMutation.mutate(data); 

  }

  return (
    <div className="w-full flex-col">
      <h1 className="text-2xl font-bold">Nuevo producto</h1>

      <form className="w-full" onSubmit={ handleSubmit( onSubmitFunction)}>

        <div className="flex justify-around items-center">
          
          <div className="flex-col w-[500px]">

            <Controller 
              control={ control }
              name="title"
              rules={ { required: true } }
              render={ ({field} )=>{
                return <Input value={ field.value} onChange={ field.onChange} className="mt-2" type="text" label="Titulo del producto" />
              }}
            />
            <Controller 
              control={ control }
              name="price"
              rules={ { required: true } }
              render={ ({field} )=>{
                return <Input value={ field.value?.toString()} onChange={ (event) => field.onChange( Number(event.target.value))} className="mt-2" type="number" label="Precio del producto" />
              }}
            />
            <Controller 
              control={ control }
              name="image"
              rules={ { required: true } }
              render={ ({field} )=>{
                return <Input value={ field.value} onChange={ field.onChange} className="mt-2" type="url" label="Url del producto" />
              }}
            />
            <Controller 
              control={ control }
              name="description"
              rules={ { required: true } }
              render={ ({field} )=>{
                return <Textarea value={field.value} onChange={field.onChange} className="mt-2" label="Descripcion del producto" />
              }}
            />
            <Controller 
              control = { control}
              name="category"
              rules={ { required: true } }
              render={ ( {field} )=>(
                <select value={field.value} onChange={ field.onChange } className="rounded-md p-3 mt-2 bg-gray-800 w-full">
                  <option value="men's clothing">Men's clothing</option>
                  <option value="women's clothing">Women's clothing</option>
                  <option value="jewelery">Jewelery</option>
                  <option value="electronics">Electronics</option>
                </select>
                )}
            />
            
            <br />
            <Button 
              type="submit" 
              className="mt-2" 
              color="primary"
              isDisabled={ productMutation.isPending}
              > { productMutation.isPending ? "Loading...": "Crear"}</Button>
          </div>

          <div className="bg-white rounded-2xl p-10 flex items-center" style={{
            width: '500px',
            height: '600px',
          }}>

            <Image
              src= { newImage }
            />
          </div>
          
        </div>


      </form>

    </div>
  )
}