import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

import { getProjects } from "@/api/ProjectAPI";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/polices";
import DeleteProjectModal from "@/components/projects/DeleteProjectModal";

export const DashboardView = () => {
  
  const { data: user, isLoading: authLoading } = useAuth()
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  const navigate = useNavigate()
  const location = useLocation()


  if (isLoading && authLoading) return "Cargando...";

  if (data && user)
    return (
      <>
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-xl">Mis proyectos</h1>
          <Link
            to="/projects/create"
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          >
            Nuevo
          </Link>
        </div>

        {data.length ? (
          <div className="my-10 grid grid-cols-1 bg-white border border-gray-100 p-4 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.map((project) => (
              <div
                key={project._id}
                className="border border-gray-100 my-3 bg-white shadow-lg p-6 rounded-lg relative"
              >
                {isManager(project.manager, user._id) ? 
                    <p className="font-bold text-xs bg-indigo-50 text-indigo-500 border-2 rounded-lg inline-block py-1 px-5 my-3">Manager</p> : 
                    <p className="font-bold text-xs bg-green-50 text-green-500 border-2 rounded-lg inline-block py-1 px-5 my-3">Colaborador</p>
                  }
                <div className="flex justify-between items-center mb-4">
                  <Link
                    to={`/projects/${project._id}`}
                    className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                  >
                    {project.projectName}
                  </Link>
                  <Menu as="div" className="relative flex-none">
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                      <span className="sr-only">opciones</span>
                      <EllipsisVerticalIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 top-10 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        <Menu.Item>
                          <Link
                            to={`/projects/${project._id}`}
                            className="block px-3 py-1 text-sm leading-6 text-gray-900"
                          >
                            Ver Proyecto
                          </Link>
                        </Menu.Item>
                        {isManager(project.manager, user._id) && (
                          <>
                            <Menu.Item>
                              <Link
                                to={`/projects/${project._id}/edit`}
                                className="block px-3 py-1 text-sm leading-6 text-gray-900"
                              >
                                Editar Proyecto
                              </Link>
                            </Menu.Item>
                            <Menu.Item>
                              <button
                                type="button"
                                className="block px-3 py-1 text-sm leading-6 text-red-500"
                                onClick={() => navigate(location.pathname + `?deleteProject=${project._id}`)}
                              >
                                Eliminar Proyecto
                              </button>
                            </Menu.Item>
                          </>
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div>
                  <p className="text-sm text-gray-400">
                    Cliente: {project.clientName}
                  </p>
                  <p className="text-sm text-gray-400">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-20">
            No hay proyectos aun {""}
            <Link to="/projects/create" className="text-fuchsia-500 font-bold">
              Crear proyecto
            </Link>
          </p>
        )}

        <DeleteProjectModal />
      </>
    );
};
