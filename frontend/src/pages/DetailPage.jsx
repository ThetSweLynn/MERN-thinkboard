import { Link, useNavigate, useParams } from "react-router"
import { ArrowLeftIcon, Trash2Icon, LoaderIcon } from "lucide-react"
import { useEffect, useState } from "react"
import api from "../lib/axios"
import toast from "react-hot-toast"

const DetailPage = () => {
  const [note, setNote] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    const fetchNotes = async() => {
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
        console.log({note})
      } catch (error) {
        console.error("Error in fetching the note", error)
        toast.error("Failed to fetch the note!")
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotes()
  }, [id])

  const deleteNote = async() => {
    try {
      if (!window.confirm("Are you sure to delet this note?")) return

      await api.delete(`/notes/${id}`)
      toast.success("Note deleted successfully.")
      navigate("/")
    } catch (error) {
      console.error("Error deleting the note", error)
      toast.error("Failed to delete the note")
    }
  }
  const saveNote = async(e) => {
    e.preventDefault()
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("All fields are required!")
      return
    }
    setIsSaving(true)
    try {
      await api.put(`/notes/${id}`, note)
      toast.success("Note updated successfully")
      navigate("/")
    } catch (error) {
      console.error("Error Updating the note", error)
      toast.error("Failed to update the note! ")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10"/>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="size-5"/>
              Back to Notes
            </Link>
            <button className="btn btn-error btn-outline"
              onClick={deleteNote}>
              <Trash2Icon className="size-3" />
              Delete Note
            </button>
          </div>
            

          <div className="card bg-base-100 border-[#00FF9D] border-2">
            <div className="card-body">
              <form onSubmit={saveNote}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input type="text"
                    placeholder="Note title"
                    value={note.title}
                    className="input input-bordered"
                    onChange={(e) => setNote({...note, title: e.target.value})} />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea className="textarea textarea-bordered h-32"
                    placeholder="Write your note here..."
                    value={note.content}
                    onChange={(e) => setNote({...note, content: e.target.value})}>
                  </textarea>
                </div>

                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary mt-8" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
              
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default DetailPage
