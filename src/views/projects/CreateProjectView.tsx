import { IoArrowBackSharp } from "react-icons/io5"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import ProjectForm from "@/components/projects/ProjectForm"
import { ProjectFormData } from "@/types/index"
import { createProject } from "@/api/ProjectAPI"
import { useMutation } from "@tanstack/react-query"

export const CreateProjectView = () => {

  const navigate = useNavigate()
  const initialValues : ProjectFormData = {
    projectName: '',
    clientName: '',
    description: ''
  }

  const { register, handleSubmit, formState: {errors} } = useForm({defaultValues: initialValues})

  const {mutate} = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      navigate('/')
    }
  })

  const handleForm = (formData : ProjectFormData) => {
      mutate(formData)
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
                  value='Crear proyecto'
                  className="align-middle w-full cursor-pointer select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              />

            </form>
        </div>
    </>
  )
}
