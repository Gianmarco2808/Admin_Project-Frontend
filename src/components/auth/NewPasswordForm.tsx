import type { ConfirmToken, NewPasswordForm } from "../../types";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {ErrorMessage} from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { updatePasswordWithToken } from "@/api/AuthAPI";
import { toast } from "react-toastify";

type NewPasswordFormProps = {
  token: ConfirmToken['token']
}

export default function NewPasswordForm({token}: NewPasswordFormProps) {
     
    const navigate = useNavigate()
    const initialValues: NewPasswordForm = {
        password: '',
        password_confirmation: '',
    }
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });
    
    const { mutate } = useMutation({
      mutationFn: updatePasswordWithToken,
      onError: (error) => {
        toast.error(error.message)
      },
      onSuccess: (data) => {
        toast.success(data)
        reset()
      }
    })

    const handleNewPassword = (formData: NewPasswordForm) => {
      const data = {formData, token}
      mutate(data)
      navigate('/auth/login')
    }

    const password = watch('password');

    return (
      <>
        <form
          onSubmit={handleSubmit(handleNewPassword)}
          className="space-y-8 p-10 bg-white rounded-lg shadow-lg mt-10"
          noValidate
        >
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="mt-1 block w-full outline-blue-500 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register("password", {
                required: "El Password es obligatorio",
                minLength: {
                  value: 8,
                  message: "El Password debe ser mínimo de 8 caracteres",
                },
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Repetir Password
            </label>
            <input
              id="password_confirmation"
              type="password"
              placeholder="Password confirmation"
              className="mt-1 block w-full p-3 border outline-blue-500 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register("password_confirmation", {
                required: "Repetir password es obligatorio",
                validate: (value) =>
                  value === password || "Los Passwords no son iguales",
              })}
            />
            {errors.password_confirmation && (
              <ErrorMessage>
                {errors.password_confirmation.message}
              </ErrorMessage>
            )}
          </div>

          <input
            type="submit"
            value="Establecer Password"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          />
        </form>
      </>
    );
}