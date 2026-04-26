"use client"

import api from "@/lib/axios";
import axios from "axios";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

interface NoteCardProps {
    note: {
        _id: string;
        title?: string;
        content?: string;
        createdAt: string;
    }
}

export default function NoteCard({ note }: NoteCardProps) {
    const handleDelete = async (e: React.FormEvent, _id: string) => {
        e.preventDefault()

        if (!window.confirm("Are you sure you want to delete this note?")) return

        try {
            await api.delete(`/notes/${_id}`)
            window.location.reload()
            toast.success("Note deleted successfully!")
        } catch (error) {
            console.error(`Error creating note: ${error}`)
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 429) {
                    toast.error("Slow down! You're deleting notes too fast...", {
                        duration: 4000,
                    })
                } else {
                    toast.error("Failed to delete note...")
                }
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).format(date);
    };

    return (
        <Link
            href={`/note/${note._id}`}
            className="note-card block border border-zinc-200 p-4 rounded-xl hover:border-zinc-400 transition-all shadow-sm bg-white"
        >
            <h2 className="font-bold text-lg text-zinc-800 mb-1">
                {note.title || "Untitled Note"}
            </h2>
            <p className="text-zinc-500 text-sm line-clamp-2 mb-4">
                {note.content || "No description provided."}
            </p>

            <div className="pt-3 border-t border-zinc-100 flex justify-between">
                <p className="text-zinc-400 text-xs font-medium uppercase tracking-wider">
                    {note.createdAt ? formatDate(note.createdAt) : "No date"}
                </p>
                <div className="flex items-center gap-1">
                    <PenSquareIcon size={18} className="text-zinc-400 hover:text-zinc-800 transition-all cursor-pointer" />
                    <button onClick={(e) => handleDelete(e, note._id)}>
                        <Trash2Icon size={18} className="text-zinc-400 hover:text-red-500 transition-all cursor-pointer" />
                    </button>
                </div>
            </div>
        </Link>
    );
}