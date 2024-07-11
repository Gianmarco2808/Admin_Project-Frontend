import { getFullProject } from "@/api/ProjectAPI"
import AddTaskModal from "@/components/tasks/AddTaskModal"
import { EditTaskData } from "@/components/tasks/EditTaskData"
import { TaskList } from "@/components/tasks/TaskList"
import TaskModalDetails from "@/components/tasks/TaskModalDetails"
import { useAuth } from "@/hooks/useAuth"
import { isManager } from "@/utils/polices"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { IoArrowBackSharp } from "react-icons/io5"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"

export const ProjectDetailsView = () => {

     const { data: user, isLoading: authLoading } = useAuth()

     const navigate = useNavigate()
     const params = useParams()
     const projectId = params.projectId!
     const {data, isLoading, isError} = useQuery({
          queryKey: ['project', projectId],
          queryFn: () => getFullProject(projectId),
          retry: false
     })

     const canEdit = useMemo(() => data?.manager === user?._id, [data, user])

     if (isLoading && authLoading) return 'Cargando...'
     if (isError) return <Navigate to='/404' />

     if (data && user) return (
          <>
               <div className="flex justify-between items-center pb-4">
                <Link
                  to='/'
                  className="text-4xl"
                >
                  <IoArrowBackSharp />
                </Link>
              </div>

               <div className="border p-10">
                    <div className="flex justify-between items-center">
                         <div>
                              <h1 className="text-3xl font-bold text-gray-600">{data.projectName}</h1>
                              <p className="text-xl font-light text-gray-500 mt-5">{data.description}</p>
                         </div>

                         {isManager(data.manager, user._id) && (
                              <nav className="my-5 flex gap-3 flex-col">
                                   <button
                                        type="button"
                                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                        onClick={() => navigate(location.pathname + '?newTask=true')}
                                   >
                                        Agregar tarea
                                   </button>
                                   <Link
                                        to={'team'}
                                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                   >
                                        Colaboradores
                                   </Link>
                              </nav>
                         )}
                    </div>

                    <TaskList 
                         tasks={data.tasks}
                         canEdit={canEdit}
                    />
               </div>
               <AddTaskModal />
               <EditTaskData />
               <TaskModalDetails />
          </>
     )
}
