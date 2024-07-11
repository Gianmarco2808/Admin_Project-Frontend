import { IoArrowBackSharp } from "react-icons/io5"
import { Link, useNavigate } from "react-router-dom"
import ProjectForm from "./ProjectForm"
import { Project, ProjectFormData } from "@/types/index"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProject } from "@/api/ProjectAPI"
import { toast } from "react-toastify"

type EditProjectFormProps = {
     data: ProjectFormData
     projectId: Project['_id']
}

export const EditProjectForm = ({data, projectId} : EditProjectFormProps) => {

     const initialValues : ProjectFormData = {
          projectName: data.projectName,
          clientName: data.clientName,
          description: data.description
        }
        
        const navigate = useNavigate()
        const { register, handleSubmit, formState: {errors} } = useForm({defaultValues: initialValues})
        
        const queryClient = useQueryClient()
        const { mutate } = useMutation({
          mutationFn: updateProject,
          onError: (error) => {
               toast.error(error.message)
          },
          onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['projects']})
            queryClient.invalidateQueries({queryKey: ['editProject', projectId]})
               toast.success(data)
               navigate('/')
          }
        })

        const handleForm = (formData: ProjectFormData) => {
          const data = {
               formData,
               projectId
          }
          mutate(data)
        }

     return (
          <>
              <div className="flex justify-between items-center">
                <Link
                  to='/'
                  className="text-4xl"
                >
                  <IoArrowBackSharp />
                </Link>
              </div>
              <div className="max-w-3xl mx-auto">
                  <form
                      className="my-10 border border-sm p-10 rounded-lg"
                      onSubmit={handleSubmit(handleForm)}
                      noValidate
                  >
      
                    <ProjectForm 
                        register={register}
                        errors={errors}
                    />
      
                    <input 
                        type="submit"
                        value='Guardar cambios'
                        className="align-middle w-full cursor-pointer select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    />
      
                  </form>
              </div>
          </>
        )
}
