import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RequestConfirmationCodeForm } from "../../types";
import {ErrorMessage} from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { requestConfirmationCode } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {
    const initialValues: RequestConfirmationCodeForm = {
        email: ''
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });
    const { mutate } = useMutation({
     mutationFn: requestConfirmationCode,
     onError: (error) => {
          toast.error(error.message)
     },
     onSuccess: (data) => {
          toast.success(data)
          reset()
     }
    })

    const handleRequestCode = (formData: RequestConfirmationCodeForm) => {
          mutate(formData)
    }

    return (
        <>
            <h1 className="text-3xl font-black text-white">Solicitar Código de Confirmación</h1>
            <p className="text-xl font-light text-white mt-5 text-center">
                Coloca tu e-mail para recibir {''}
                <span className=" text-fuchsia-500 font-bold"> un nuevo código</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRequestCode)}
                className="space-y-8 p-10 rounded-lg bg-white mt-10"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label className="block text-lg font-medium text-gray-700" htmlFor="email">Email</label>
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

                <input
                    type="submit"
                    value='Enviar Código'
                    className="w-full flex cursor-pointer justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                />
            </form>

            <nav className="mt-8 flex flex-col gap-4">
                <div className="flex gap-3 justify-center">
                    <span className="text-center text-gray-300 font-normal">¿Ya tienes cuenta?</span>
                    <Link
                         to='/auth/login'
                         className="text-center text-white font-normal hover:text-white hover:font-bold"
                    >
                         Iniciar Sesión
                    </Link>
                </div>
                <div className="flex gap-3 justify-center">
                    <span className="text-center text-gray-300 font-normal">¿Olvidaste tu password?</span>
                    <Link
                         to='/auth/forgot-password'
                         className="text-center font-normal text-white hover:text-white hover:font-bold"
                    >
                         Reestablecer
                    </Link>
                </div>
            </nav>
        </>
    )
}