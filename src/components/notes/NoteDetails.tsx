import { deletNote } from "@/api/NoteAPI"
import { useAuth } from "@/hooks/useAuth"
import { Note } from "@/types/index"
import { formatDate } from "@/utils/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { MdDelete } from "react-icons/md"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type NoteDetailsProps = {
     note: Note
}

export const NoteDetails = ({note}: NoteDetailsProps) => {

     const { data, isLoading } = useAuth()
     const canDelete = useMemo(() => data?._id === note.createdBy._id ,[data])

     const params = useParams()
     const projectId = params.projectId!

     const location = useLocation()
     const queryParams = new URLSearchParams(location.search)!
     const taskId = queryParams.get('viewTask')!

     const queryClient = useQueryClient()

     const { mutate } = useMutation({
          mutationFn: deletNote,
          onError: (error) => {
               toast.error(error.message)
          },
          onSuccess: (data) => {
               toast.success(data)
               queryClient.invalidateQueries({queryKey: ['task', taskId]})
          }
     })

     if(isLoading) return 'Cargando...'

  return (
    <div className="p-3 flex justify-between items-center">
          <div>
               <p>
                    {note.content} por: <span className="font-semibold">{note.createdBy.name}</span>
               </p>
               <p className="text-gray-500 text-xs">
                    {formatDate(note.createdAt)}
               </p>
          </div>

          {canDelete && (
               <MdDelete 
                    color="red"
                    className="cursor-pointer w-5 h-5" 
                    onClick={() => mutate({projectId, taskId, noteId: note._id})}    
               />
          )}

    </div>
  )
}
