'use client';

import { FileText, Star, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
    { label: "All Notes", icon: <FileText size={18} />, href: "/" },
    { label: "Favorites", icon: <Star size={18} />, href: "/favorites" },
    { label: "Trash", icon: <Trash2 size={18} />, href: "/trash" },
]

export default function Leftbar() {
    const path = usePathname();

    return (
        <aside className="top-0 left-0 fixed w-64 bg-white border-r border-gray-200 flex flex-col h-screen px-4 py-5 font-sans">

            <div className="mb-6 px-2">
                <h1 className="text-primary font-bold text-xl leading-none">Workspace</h1>
                <span className="text-[10px] text-zinc-400 font-bold tracking-widest uppercase">
                    Knowledge Base
                </span>
            </div>

            <Link href="/create" className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-semibold text-sm transition-all mb-6 shadow-sm cursor-pointer border-none">
                <Plus size={18} strokeWidth={3} />
                New Note
            </Link>

            <nav className="flex-1 space-y-1">
                {NAV_ITEMS.map((item, i) => {
                    const active = path === item.href;
                    return (
                        <Link 
                            key={i}
                            href={item.href} 
                            className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm transition-colors ${
                                active ? "bg-[#f0f1ff] text-primary font-semibold" : "text-zinc-500 hover:bg-zinc-50 font-medium"
                            }`}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    )
                })}
            </nav>
        </aside>
    );
}