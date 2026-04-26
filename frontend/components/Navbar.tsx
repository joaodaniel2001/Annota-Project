"use client"

import { usePathname } from "next/navigation"

export default function Navbar() {
    const path = usePathname()

    return (
        <header className="fixed top-0 left-64 right-0 h-18 z-50 bg-white border-b border-gray-200 flex items-center">
            {/* Removi a largura fixa do container interno e adicionei w-full */}
            <div className="px-8 w-full">
                <div className="flex justify-between items-center">
                    {/* Título dinâmico ou fixo */}
                    <h1 className="text-xl font-bold text-on-surface">
                        Annota
                    </h1>

                    {/* Lógica do Botão */}
                    {path === "/create" ? (
                        <button className="btn-primary py-2 px-6 text-sm cursor-pointer shadow-sm active:scale-95 transition-transform">
                            Salvar
                        </button>
                    ) : (
                        <div className="w-10" /> /* Spacer para manter o alinhamento se necessário */
                    )}
                </div>
            </div>
        </header>
    )
}