'use client'

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import RateLimitedUI from "@/components/RateLimitedUI";
import { LayoutDashboard, ArrowUpNarrowWide, ArrowDownWideNarrow } from "lucide-react";
import NoteCard from "@/components/NoteCard"
import api from "@/lib/axios";
import axios from "axios";

export default function Home() {
  const [notes, setNotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [rateLimited, setRateLimited] = useState(false)
  const [sort, setSort] = useState("desc")

  const fetchNotes = async () => {
    setLoading(true)
    try {
      const res = await api.get("/notes")
      let data = res.data

      const sortedData = [...data].sort((a, b) => {
        const dateA = new Date(a.createdAt || a._id).getTime()
        const dateB = new Date(b.createdAt || b._id).getTime()

        return sort === "desc" ? dateB - dateA : dateA - dateB
      })

      setNotes(sortedData)
      setRateLimited(false)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        setRateLimited(true)
      } else {
        toast.error("Erro ao carregar notas.")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [sort])

  const toggleSort = () => {
    setSort((prev) => (prev === "desc" ? "asc" : "desc"))
  }

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between mb-10 items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">All Notes</h1>
          <p className="text-zinc-500">Your digital sanctuary for thoughts.</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={toggleSort}
            className="flex gap-2 py-2 px-5 border-2 border-zinc-300 bg-zinc-100 rounded-md items-center hover:bg-zinc-200 transition-all"
          >
            {sort === "desc" ? <ArrowDownWideNarrow size={18} /> : <ArrowUpNarrowWide size={18} />}
            <span className="text-sm font-medium">
              {sort === "desc" ? "Newest First" : "Oldest First"}
            </span>
          </button>

          <button className="flex gap-2 py-2 px-5 border-2 border-zinc-300 bg-zinc-100 rounded-md items-center hover:bg-zinc-200 transition-all">
            <LayoutDashboard size={18} />
            <span className="text-sm font-medium">View</span>
          </button>
        </div>
      </div>

      {rateLimited && <RateLimitedUI />}

      {loading ? (
        <p className="text-center py-20 text-zinc-400 animate-pulse">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      )}
    </div>
  )
}