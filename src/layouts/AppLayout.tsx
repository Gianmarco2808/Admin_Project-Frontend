import { Link, Navigate, Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Logo } from "@/components/Logo"
import NavMenu from "@/components/NavMenu"
import { useAuth } from "@/hooks/useAuth"

export const AppLayout = () => {

     const { data, isError, isLoading } = useAuth()

     if(isLoading) return 'Cargando...'
     if (isError) {
          return <Navigate to={'/auth/login'} />
     }

  if (data) return (
               <>
                         <header className="py-5">
                              <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-between items-center shadow p-5 border rounded-lg bg-white">
                                   <div>
                                        <Link
                                             to={'/'}
                                        >
                                             <Logo />
                                        </Link>
                                   </div>
                                   <NavMenu 
                                        name={data.name}
                                   />
                              </div>
                         </header>
                         <section className="max-w-screen-xl mx-auto p-5 bg-white shadow rounded-lg">
                              <Outlet />
                         </section>
                         <footer className="py-5">
                              <p className="text-center">
                                   Todos los derechos reservados {new Date().getFullYear()}
                              </p>
                         </footer>

                         <ToastContainer 
                              pauseOnHover={false}
                              pauseOnFocusLoss={false}
                         />
               </>
     )
}
