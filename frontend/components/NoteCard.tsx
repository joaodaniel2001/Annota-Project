import { PenSquareIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";

interface NoteCardProps {
    note: {
        _id: string;
        title?: string;
        content?: string;
        createdAt: string;
    }
}

export default function NoteCard({ note }: NoteCardProps) {
    // Função de formatação
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
                    <PenSquareIcon size={18} className="text-zinc-400 hover:text-zinc-800 transition-all cursor-pointer"/>
                    <button>
                        <Trash2Icon size={18} className="text-zinc-400 hover:text-red-500 transition-all cursor-pointer" />
                    </button>
                </div>
            </div>
        </Link>
    );
}