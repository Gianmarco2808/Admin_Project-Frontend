import { NoteFormData } from "@/types/index"
import { useForm } from "react-hook-form"
import { ErrorMessage } from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "@/api/NoteAPI"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"

export const AddNotesForm = () => {

     const initialValues: NoteFormData = {
          content: ''
     }

     const params = useParams()
     const projectId = params.projectId!
     
     const location = useLocation()
     const queryParams = new URLSearchParams(location.search)

     const taskId = queryParams.get('viewTask')!

     const queryClient = useQueryClient()
     const { mutate } = useMutation({
          mutationFn: createNote,
          onError: (error) => {
               toast.error(error.message)
          },
          onSuccess: (data) => {
               toast.success(data)
               queryClient.invalidateQueries({queryKey: ['task', taskId]})
          }
     })

  const { register, handleSubmit, reset, formState: {errors} } = useForm({defaultValues: initialValues})
  
  const handleAddNote = (formData: NoteFormData) => {
     const data = { projectId, taskId,formData }   
     mutate(data)
     reset()
  }

  return (
    <form 
          onSubmit={handleSubmit(handleAddNote)}
          className="space-y-3"
          noValidate
    >

     <div className="flex flex-col gap-2">
          <label className="text-xl font-bold text-gray-500">Crear nota</label>
          <input 
               type="text"
               id="content"
               placeholder="Contenido de la nota"
               className="w-full p-3 border-gray-300 border outline-none rounded-md"
               {...register('content', {
                    required: 'El contenido de la nota es obligatorio'
               })}
          />
          {errors.content && (
               <ErrorMessage>{errors.content.message}</ErrorMessage>
          )}
     </div>

     <input 
          type="submit"
          value={'Crear nota'}
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 rounded-md text-white font-black  text-md cursor-pointer"
     />

    </form>
  )
}
