'use client'

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"
import RateLimitedUI from "@/components/RateLimitedUI";
import { LayoutDashboard, SortDesc } from "lucide-react";
import NoteCard from "@/components/NoteCard"

export default function Home() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [rateLimited, setRateLimited] = useState(false)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/notes")
        setNotes(res.data)
        setRateLimited(false)
      } catch (error) {
        console.error(`ERROR fetching notes: ${error}`)
        if (axios.isAxiosError(error)) {
          console.error("Erro na API:", error.response?.data);

          if (error.response?.status === 429) {
            setRateLimited(true);
          } else {
            toast.error("Erro ao carregar notas.");
          }
        } else {
          console.error("Erro inesperado:", error);
          toast.error("Ocorreu um erro interno.");
        }
      } finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])

  return (
    <div className="min-h-screen">
      <h1>All Notes</h1>
      <div className="flex flex-col md:flex-row md:justify-between mb-10 items-center">
        <p className="text-zinc-500">Your digital sanctuary for organization throughts and deep work.</p>
        <div className="flex gap-6">
          <button className="flex gap-2 py-2 px-5 border-2 border-zinc-300 bg-zinc-100 rounded-md items-center hover:bg-zinc-200 transition-all cursor-pointer">
            <span><SortDesc size={18} /></span>
            <span className="text-sm">Sort</span>
          </button>
          <button className="flex gap-2 py-2 px-5 border-2 border-zinc-300 bg-zinc-100 rounded-md items-center hover:bg-zinc-200 transition-all cursor-pointer">
            <span><LayoutDashboard size={18} /></span>
            <span className="text-sm">View</span>
          </button>
        </div>
      </div>
      {rateLimited && <RateLimitedUI />}
      {loading && <p className="text-center text-primary py-10">Loading notes...</p>}

      {!loading && !rateLimited && notes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
          {notes.map((note: any) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}
