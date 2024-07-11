import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage";
import { ProjectFormData } from "types";

type ProjectFormProps = {
     register: UseFormRegister<ProjectFormData>
     errors: FieldErrors<ProjectFormData>
}

export default function ProjectForm({register, errors} : ProjectFormProps) {
     return (
         <>
             <div className="mb-5 space-y-3">
                 <label htmlFor="projectName" className="text-sm font-bold">
                     Nombre del Proyecto
                 </label>
                 <input
                     id="projectName"
                     className="w-full p-2 outline-none border border-gray-200 rounded-sm"
                     type="text"
                     placeholder="Nombre del Proyecto"
                     {...register("projectName", {
                         required: "El Titulo del Proyecto es obligatorio",
                     })}
                 />
 
                 {errors.projectName && (
                     <ErrorMessage>{errors.projectName.message}</ErrorMessage>
                 )}
             </div>
 
             <div className="mb-5 space-y-3">
                 <label htmlFor="clientName" className="text-sm font-bold">
                     Nombre Cliente
                 </label>
                 <input
                     id="clientName"
                     className="w-full p-2 outline-none border border-gray-200 rounded-sm"
                     type="text"
                     placeholder="Nombre del Cliente"
                     {...register("clientName", {
                         required: "El Nombre del Cliente es obligatorio",
                     })}
                 />
 
                 {errors.clientName && (
                     <ErrorMessage>{errors.clientName.message}</ErrorMessage>
                 )}
             </div>
 
             <div className="mb-5 space-y-3">
                 <label htmlFor="description" className="text-sm font-bold">
                     Descripción
                 </label>
                 <textarea
                     id="description"
                     className="w-full p-2 border outline-none border-gray-200 rounded-sm"
                     placeholder="Descripción del Proyecto"
                     {...register("description", {
                         required: "Una descripción del proyecto es obligatoria"
                     })}
                 />
 
                 {errors.description && (
                     <ErrorMessage>{errors.description.message}</ErrorMessage>
                 )}
             </div>
         </>
     )
 }