import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"


export const AuthLayout = () => {
  return (
    <>
          <div className="bg-[#0f172a] min-h-screen">
               <div className="py-10 lg:py-20 mx-auto max-w-[450px] w-full sm:w-[400px] md:w-[350px] lg:w-[450px]">
                    <div>
                         <Outlet />
                    </div>
               </div>
          </div>
          <ToastContainer 
               pauseOnHover={false}
               pauseOnFocusLoss={false}
          />
          
    </>
  )
}
