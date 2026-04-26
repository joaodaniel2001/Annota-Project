"use client"

import api from "@/lib/axios"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast, { LoaderIcon } from "react-hot-toast"

// Definindo a interface para o TS não reclamar
interface Note {
    title: string;
    content: string;
}

export default function NoteDetailPage() {
    const { _id } = useParams()
    const router = useRouter()

    // Estados para edição
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [exists, setExists] = useState(true)

    // 1. Busca os dados iniciais
    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/notes/${_id}`)
                // Preenche os campos com o que vem do banco
                setTitle(res.data.title)
                setContent(res.data.content)
            } catch (error) {
                setExists(false)
                console.error(`ERROR fetching note: ${error}`)
            } finally {
                setLoading(false)
            }
        }
        if (_id) fetchNote()
    }, [_id])

    // 2. Função para salvar a edição
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!title.trim() || !content.trim()) {
            toast.error("Fields cannot be empty")
            return
        }

        setSaving(true)
        try {
            // Usamos PUT para atualizar
            await api.put(`/notes/${_id}`, {
                title,
                content
            })
            toast.success("Note updated!")
            router.refresh() // Atualiza os dados no servidor/cache
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error("Failed to update note")
            }
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center gap-3">
                <LoaderIcon className="animate-spin size-10" />
                <span className="animate-pulse">Loading...</span>
            </div>
        )
    }

    if (!exists) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Nota não encontrada.</p>
            </div>
        )
    }

    return (
        <section className="h-screen flex flex-col p-8">
            <form
                id="note-form"
                onSubmit={handleSubmit}
                className="flex flex-col flex-1"
            >
                <div className="flex justify-between items-center mb-10">
                    <input
                        type="text"
                        placeholder="Enter a title..."
                        className="text-5xl border-none outline-none focus:ring-0 text-zinc-800 font-bold bg-transparent flex-1"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    
                    <button 
                        type="submit" 
                        disabled={saving}
                        className="ml-4 px-6 py-2 bg-zinc-900 text-white rounded-lg disabled:bg-zinc-400 transition-colors"
                    >
                        {saving ? "Saving..." : "Save"}
                    </button>
                </div>

                <textarea
                    placeholder="Start typing your thoughts here..."
                    className="flex-1 text-xl text-zinc-800 resize-none outline-none bg-transparent"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </form>
        </section>
    )
}