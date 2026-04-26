"use client"

import api from "@/lib/axios"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

export default function CreatePage() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!title.trim() || !content.trim()) {
            toast.error("All fields are required")
            return
        }

        setLoading(true)
        try {
            await api.post("/notes", {
                title,
                content
            })
            toast.success("Note created successfully!")
            router.push("/");
        } catch (error) {
            console.error(`Error creating note: ${error}`)
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 429) {
                    toast.error("Slow down! You're creating notes too fast...", {
                        duration: 4000,
                    })
                } else {
                    toast.error("Failed to create note...")
                }
            } else {
                console.error("Unexpected error:", error);
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        /* h-screen faz a página ocupar a altura total. flex e flex-col permitem que os filhos se ajustem */
        <section className="h-screen flex flex-col p-8">
            <form
                id="note-form"
                onSubmit={handleSubmit}
                className="flex flex-col flex-1"
            >
                <input
                    type="text"
                    placeholder="Enter a title..."
                    className="text-5xl border-none outline-none focus:ring-0 text-zinc-400 mb-10"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Start typing your thoughts here..."
                    /* flex-1 faz o textarea ocupar todo o espaço restante do form */
                    className="flex-1 text-xl text-zinc-800 resize-none outline-none bg-transparent"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </form>
        </section>
    )
}