import { Link } from "react-router"
import { NotebookIcon } from "lucide-react"

const NoteNotFoundCard = () => {
  return (
    <div className="flex flex-col items-center max-w-md mx-auto text-center gap-2">
        <NotebookIcon className="size-10 text-primary" />
        <h2 className="text-xl">You have no notes.</h2>
        <span className="text-base-content/70"> 
            Ready to organsize your thoughts? Create your first note to get started on your journey.
        </span>
        <Link to="/create" className="btn btn-primary px-8 mt-5">Create Your First Note</Link>
    </div>
  )
}

export default NoteNotFoundCard
