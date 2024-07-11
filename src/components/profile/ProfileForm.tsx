import { useForm } from "react-hook-form"
import {ErrorMessage} from "../ErrorMessage"
import { User, UserProfileForm } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "@/api/ProfileAPI"
import { toast } from "react-toastify"

type ProfileFormProps = {
     data: User
}

export default function ProfileForm({ data }: ProfileFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<UserProfileForm>({ defaultValues: data })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
      mutationFn: updateProfile,
      onError: (error) => {
        toast.error(error.message)
      },
      onSuccess: (data) => {
        toast.success(data)
        queryClient.invalidateQueries({queryKey: ['user']})
      }
    })

    const handleEditProfile = (formData: UserProfileForm) => {
      mutate(formData)
    }

    return (
      <>
        <div className="mx-auto max-w-xl p-10 bg-gray-50 rounded-lg shadow-md m-10">
          <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-4">
            Mi Perfil
          </h1>
          <p className="text-lg font-light text-center text-gray-500 mb-8">
            Aquí puedes actualizar tu información
          </p>

          <form
            onSubmit={handleSubmit(handleEditProfile)}
            className="space-y-6"
            noValidate
          >
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="name"
              >
                Nombre
              </label>
              <input
                id="name"
                type="text"
                placeholder="Tu Nombre"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                {...register("name", {
                  required: "Nombre de usuario es obligatorio",
                })}
              />
              {errors.name && (
                <ErrorMessage>{errors.name.message}</ErrorMessage>
              )}
            </div>

            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="Tu Email"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                {...register("email", {
                  required: "El e-mail es obligatorio",
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
              value="Guardar Cambios"
              className="w-full p-3 bg-fuchsia-600 text-white font-bold rounded-lg hover:bg-fuchsia-700 transition-colors duration-300 cursor-pointer"
            />
          </form>
        </div>
      </>
    );
}