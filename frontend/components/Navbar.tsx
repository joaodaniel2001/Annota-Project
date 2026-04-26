"use client"

import { usePathname } from "next/navigation"

export default function Navbar() {
    const path = usePathname()

    return (
        <header className="fixed top-0 left-64 right-0 h-18 z-50 bg-white border-b border-gray-200 flex items-center">
            <div className="px-8 w-full">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold text-on-surface">
                        Annota
                    </h1>

                    {path === "/create" ? (
                        <button
                            type="submit"
                            form="note-form"
                            className="btn-primary py-2 px-6 text-sm cursor-pointer shadow-sm active:scale-95 transition-transform" 
                        >
                            Save
                        </button>
                    ) : (
                        <div className="w-10" />
                    )}
                </div>
            </div>
        </header>
    )
}