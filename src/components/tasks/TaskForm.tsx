import { FieldErrors, UseFormRegister } from "react-hook-form"
import { TaskFormData } from "@/types/index";
import { ErrorMessage } from "../ErrorMessage";

type TaskFormProps = {
    errors: FieldErrors<TaskFormData>
    register: UseFormRegister<TaskFormData>
}

export default function TaskForm({errors, register} : TaskFormProps) {
    return (
        <>
            <div className="flex flex-col gap-3">
                <label
                    className="text-lg font-semibold text-gray-600"
                    htmlFor="name"
                >Nombre de la tarea</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre de la tarea"
                    className="w-full p-3 border-gray-300 border outline-none rounded-sm"
                    {...register("name", {
                        required: "El nombre de la tarea es obligatorio",
                    })}
                />
                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
            </div>

            <div className="flex flex-col gap-3">
                <label
                    className="text-lg font-semibold text-gray-600"
                    htmlFor="description"
                >Descripción de la tarea</label>
                <textarea
                    id="description"
                    placeholder="Descripción de la tarea"
                    className="w-full p-3  border-gray-300 border outline-none rounded-sm"
                    {...register("description", {
                        required: "La descripción de la tarea es obligatoria"
                    })}
                />
                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}