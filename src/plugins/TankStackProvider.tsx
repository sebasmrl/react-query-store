import { QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient = new QueryClient({
defaultOptions: {
  queries:{
    //staleTime: 3000
  }
}
});

export const TankStackProvider = ({ children } : React.PropsWithChildren) => {
  return (
    <>
     <QueryClientProvider client={queryClient}>
        { children }
        
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </>
  )
}
