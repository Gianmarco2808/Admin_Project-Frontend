import { Link } from "react-router-dom"

export const NotFound = () => {
  return (
    <>
          <h1 className="font-bold text-center text-4xl text-white">Página no encontrada</h1>
          <p className="mt-10 text-center text-white">
               Retornar a {' '}
               <Link
                    to={'/'}
                    className="text-red-600"
               >
                    Proyectos
               </Link>
          </p>
    </>
  )
}
