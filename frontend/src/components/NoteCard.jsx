import { Link } from 'react-router'
import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import { formatDate } from '../lib/utils'
import api from '../lib/axios'
import toast from 'react-hot-toast'

const NoteCard = ({note, setNotes}) => {

  const deleteNote = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure to delete this note?")) return

    try {
        await api.delete(`/notes/${id}`)
        setNotes(prev => prev.filter(note => note._id !== id))
        toast.success("Note deleted successfully.")
    } catch (error) {
        console.error("Error Deleting note", error)
        toast.error("Failed to delete the note!")
    }
  }

  return (
    <Link to={`/note/${note._id}`}>
        <div className='card bg-base-100 shadow-xl border-[#00FF9D] border-2 border-solid'>
            <div className='card-body'>
                <h3 className='card-title'>{note.title}</h3>
                <p>{note.content}</p>
                <div className='card-actions justify-between mt-5'>
                    <span className='text-xs'>{formatDate(new Date(note.createdAt))}</span>
                    <div className='flex items-center gap-2'>
                        <PenSquareIcon className='size-4' />
                        <button className='btn btn-xs btn-ghost text-error'
                            onClick={(e) => deleteNote(e, note._id)}>
                            <Trash2Icon className='size-4' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default NoteCard
