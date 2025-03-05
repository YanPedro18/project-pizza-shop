import Header from "@/components/header"
import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"


function AppLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      response => response, 
      error => {
        if (isAxiosError(error)) {
          const status = error.response?.status;
          const code = error.response?.data.code

          if(status === 401 && code === 'UNAUTHORIZED') {

            navigate('/sign-in', {replace: true})
          } else {
            throw error;

          }
        }
      }
    )

    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate])

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />



      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>

    </div>
  )
}

export default AppLayout


      // {/* //header */}
      // <div className="w-full bg-foreground text-white h-100 p-3 flex text-center ">

      //   {/* div flex */}
      //   <div className="flex justify-between w-full">

      //     <div className="text-white flex gap-5">
      //       <Pizza />
      //       <Link to="/">
      //         Inicio
      //       </Link>
      //       <Link to="/">
      //         Pedidos
      //       </Link>
      //     </div>

      //     <div>
      //       <span>*</span>
      //       <span>Yan's Pizza Shop</span>
      //     </div>
      //   </div>

      // </div>