import { Task } from "@/types/index"
import { AddNotesForm } from "./AddNotesForm"
import { NoteDetails } from "./NoteDetails"

type NotesPanelProps = {
  notes: Task['notes']
}

export const NotesPanel = ({notes}: NotesPanelProps) => {
  return (
    <>
          <AddNotesForm  />

          <div className="divide-y divide-gray-100 mt-10">
              {notes.length ? (
                <>
                    <p className="font-bold text-sm text-slate-600 my-5">notas: </p>
                    {notes.map( note  => (
                      <NoteDetails key={note._id} note={note} />
                    ))}
                </>
              ): (
                <p className='text-gray-600 text-center pt-3'>No hay notas</p>
              )}
          </div>

    </>
  )
}
