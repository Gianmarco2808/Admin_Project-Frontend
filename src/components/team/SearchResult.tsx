import { addUserToProject } from "@/api/TeamAPI"
import { TeamMember } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { IoPersonAddSharp } from "react-icons/io5"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

type SearchResultProps = {
     user: TeamMember,
     reset: () => void
}

export const SearchResult = ({user, reset}: SearchResultProps) => {

     const params = useParams()
     const projectId = params.projectId!

     const queryClient = useQueryClient()

     const { mutate } = useMutation({
          mutationFn: addUserToProject,
          onError: (error) => {
               toast.error(error.message)
          },
          onSuccess: (data) => {
               toast.success(data)
               reset()
               queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]})
          }
     })

     const handleAddUserToProject = () => {
          const data = {
               projectId,
               id: user._id
          }
          mutate(data)
     }

  return (
     <>
          <div className="flex justify-between items-center">
               <p>{user.name}</p>
               <button 
                    className="flex items-center text-blue-600 font-semibold gap-1 justify-center hover:bg-gray-200 p-1 px-2 rounded-sm"
                    onClick={handleAddUserToProject}
               >
               <IoPersonAddSharp color="red" />
                    Agregar
               </button>
          </div>
     </>
  )
}
