import { useForm } from "react-hook-form";
import { UserRegistrationForm } from "@/types/index";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {
  
  const initialValues: UserRegistrationForm = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });
  const { mutate } = useMutation({
     mutationFn: createAccount,
     onError: (error) => {
          toast.error(error.message)
     },
     onSuccess: (data) => {
          toast.success(data)
          reset()
     }
  })

  const password = watch('password');

  const handleRegister = (formData: UserRegistrationForm) => {
     mutate(formData)
  }

  return (
     <>
     <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-lg">
       <div className="text-center">
         <h1 className="text-4xl font-bold text-gray-800">Registro</h1>
         <p className="text-gray-600 mt-2">Crea tu cuenta</p>
       </div>
       <form onSubmit={handleSubmit(handleRegister)} className="space-y-6" noValidate>
         <div>
           <label className="block text-lg font-medium text-gray-700">Nombre</label>
           <input
             id="name"
             type="text"
             placeholder="Name"
             className="mt-1 block w-full outline-blue-500 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
             {...register("name", {
               required: "El Nombre de usuario es obligatorio",
             })}
           />
           {errors.name && (
             <ErrorMessage>{errors.name.message}</ErrorMessage>
           )}
         </div>

         <div>
           <label className="block text-lg font-medium text-gray-700">Email</label>
           <input
             id="email"
             type="email"
             placeholder="Email"
             className="mt-1 block w-full p-3 border outline-blue-500 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
             id="password"
             type="password"
             placeholder="Password"
             className="mt-1 block w-full outline-blue-500 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
             {...register("password", {
               required: "El Password es obligatorio",
               minLength: {
                 value: 8,
                 message: 'El Password debe ser mínimo de 8 caracteres'
               }
             })}
           />
           {errors.password && (
             <ErrorMessage>{errors.password.message}</ErrorMessage>
           )}
         </div>

         <div>
           <label className="block text-lg font-medium text-gray-700">Repetir Password</label>
           <input
             id="password_confirmation"
             type="password"
             placeholder="Password confirmation"
             className="mt-1 block w-full p-3 border outline-blue-500 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
             {...register("password_confirmation", {
               required: "Repetir password es obligatorio",
               validate: value => value === password || 'Los Passwords no son iguales'
             })}
           />
           {errors.password_confirmation && (
             <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
           )}
         </div>

         <div>
           <button
             type="submit"
             className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
           >
             Registrarme
           </button>
         </div>
       </form>
       <nav className="mt-10 flex flex-col gap-2 items-center">
          <div className="flex gap-4">
            <span className="text-normal text-gray-600">¿Ya tienes cuenta?</span>
            <Link
              className="text-fuchsia-700 font-bold hover:text-fuchsia-800"
              to={'/auth/login'}
            >
              Iniciar sesión
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
