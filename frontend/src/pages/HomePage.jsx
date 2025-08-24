import { useState, useEffect } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import Navbar from "../components/Navbar"
import NoteCard from "../components/NoteCard"
import NoteNotFoundCard from "../components/NoteNotFoundCard"
import RateLimitedCard from "../components/RateLimitedCard"
import api from "../lib/axios"

const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = useState(false)
    const [notes, setNotes] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await api.get("/notes")
                console.log(res.data)
                setNotes(res.data)
                setIsRateLimited(false)
            } catch (error) {
                console.log("Error fetching notes", error)
                if (error.response.status === 429) {
                    setIsRateLimited(true)
                } else {
                    toast.error("Failed to load notes")
                }
            } finally {
                setIsLoading(false)
            }
        }

        fetchNotes();
    }, [])

    return (
        <div className="min-h-screen">
            <Navbar />

            {isRateLimited && <RateLimitedCard />}

            <div className="max-w-7xl mx-auto p-4 mt-6"></div>
                {isLoading && <div className="text-base-content text-center my-10">Loading notes...</div>}

                {notes.length === 0 && !isRateLimited && <NoteNotFoundCard />}

                {notes.length > 0 && !isRateLimited && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-10">
                        { notes.map(note => (
                            <NoteCard key={note._id} note={note} setNotes={setNotes}/>
                        ))}
                    </div>
                )}
        </div>
    )
}

export default HomePage
