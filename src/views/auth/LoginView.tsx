import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/index";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authenticateUser } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function LoginView() {

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
  const navigate = useNavigate()

  const {mutate} = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      navigate('/')
    }
  })

  const handleLogin = (formData: UserLoginForm) => { 
    mutate(formData)
  }

  return (
    <>
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">Login</h1>
          <p className="text-gray-600 mt-2">Ingresa a tu cuenta</p>
        </div>
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6" noValidate>
          <div>
            <label className="block text-lg font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="mt-1 block outline-blue-500 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register("email", {
                required: "El Email es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail no válido",
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="mt-1 block w-full outline-blue-500 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register("password", {
                required: "El Password es obligatorio",
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Iniciar Sesión
            </button>
          </div>
          
        </form>
        <nav className="mt-10 flex flex-col gap-2 items-center">
          <div className="flex gap-4">
            <span className="text-normal text-gray-600">¿No tienes cuenta?</span>
            <Link
              className="text-fuchsia-700 font-bold hover:text-fuchsia-800"
              to={'/auth/register'}
            >
              Crear cuenta
            </Link>
          </div>
          <Link 
              to={`/auth/forgot-password`}
              className="text-sm text-blue-600 hover:text-blue-500 font-normal"
          >
            ¿Olvidaste tu password?
          </Link>
        </nav>
      </div>
    </>
  )
}