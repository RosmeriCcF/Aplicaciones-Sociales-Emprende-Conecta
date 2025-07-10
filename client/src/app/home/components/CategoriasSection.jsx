'use client'
import Image from 'next/image'

const categorias = [
  { nombre: 'Comida', imagen: '/comida.png' },
  { nombre: 'Calzado', imagen: '/calzado.png' },
  { nombre: 'Tecnología', imagen: '/tecnologia.png' },
  { nombre: 'Joyería', imagen: '/joyeria.png' },
  { nombre: 'Postres', imagen: '/postres.png' },
]

export default function CategoriasSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 space-y-10">
      {/* Título */}
      <h2 className="text-2xl font-semibold text-[#2b4563] text-center">Categorías</h2>

      {/* Tarjetas de categoría */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-items-center">
        {categorias.map((cat, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <Image src={cat.imagen} alt={cat.nombre} width={120} height={120} className="rounded-xl" />
            <p className="mt-2 text-sm text-gray-800">{cat.nombre}</p>
          </div>
        ))}
      </div>

      {/* Buscador */}
      <div className="flex flex-wrap gap-2 items-center justify-center mt-8">
        <button className="px-4 py-2 rounded-full border border-gray-300 text-sm flex items-center gap-2">
          <span className="text-lg">≡</span> Categorías
        </button>
        <div className="flex items-center border rounded-full overflow-hidden w-full max-w-md">
          <input
            type="text"
            placeholder="Encuentra productos o emprendimientos"
            className="flex-1 px-4 py-2 text-sm outline-none"
          />
          <button className="bg-[#0B3B5B] text-white px-4 py-2">
            🔍
          </button>
        </div>
      </div>
    </section>
  )
}
