import { changePassword } from "@/api/ProfileAPI";
import { ErrorMessage } from "@/components/ErrorMessage";
import { UpdateCurrentUserPasswordForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const ChangePasswordView = () => {

  const initialValues : UpdateCurrentUserPasswordForm = {
    current_password: '',
    password: '',
    password_confirmation: ''
  }

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: changePassword,
    onError: (error) => {
      toast.error(error.message)
      reset()
    },
    onSuccess: (data) => {
      toast.success(data)
      reset()
    }
  })

  const password = watch('password');

  const handleChangePassword = (formData : UpdateCurrentUserPasswordForm) => {
    mutate(formData)
  }

  return (
    <div className="mx-auto max-w-xl p-10 bg-gray-50 rounded-lg shadow-md m-10">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-4">
        Cambiar Password
      </h1>
      <p className="text-lg font-light text-center text-gray-500 mb-8">
        Utiliza este formulario para cambiar tu password
      </p>

      <form
        onSubmit={handleSubmit(handleChangePassword)}
        className="space-y-6"
        noValidate
      >
        <div className="space-y-2">
          <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="current_password"
            >
            Password Actual
          </label>
          <input
            id="current_password"
            type="password"
            placeholder="Password Actual"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
            {...register("current_password", {
              required: "El password actual es obligatorio",
            })}
          />
          {errors.current_password && (
            <ErrorMessage>{errors.current_password.message}</ErrorMessage>
          )}
        </div>

        <div className="mb-5 space-y-3">
          <label className="block text-sm font-medium text-gray-700" htmlFor="password">
            Nuevo Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Nuevo Password"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
            {...register("password", {
              required: "El Nuevo Password es obligatorio",
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
        <div className="mb-5 space-y-3">
          <label
            htmlFor="password_confirmation"
            className="block text-sm font-medium text-gray-700"
          >
            Repetir Password
          </label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repetir Password"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
            {...register("password_confirmation", {
              required: "Este campo es obligatorio",
              validate: (value) =>
                value === password || "Los Passwords no son iguales",
            })}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Cambiar password"
          className="w-full p-3 bg-fuchsia-600 text-white font-bold rounded-lg hover:bg-fuchsia-700 transition-colors duration-300 cursor-pointer"
        />
      </form>
    </div>
  );
}
