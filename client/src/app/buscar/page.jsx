'use client'
import { useSearchParams } from 'next/navigation'

export default function BuscarPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query')

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Resultados de búsqueda para: {query}</h1>
      {/* Aquí mostrarías productos filtrados con esa palabra */}
    </div>
  )
}