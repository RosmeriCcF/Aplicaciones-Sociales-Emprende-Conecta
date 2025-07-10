// ✅ Archivo: src/app/componentes/CategoriasSection/page.jsx
'use client'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const categorias = [
  { nombre: 'Comida', imagen: '/comida.png' },
  { nombre: 'Calzado', imagen: '/calzado.png' },
  { nombre: 'Tecnología', imagen: '/tecnologia.png' },
  { nombre: 'Joyería', imagen: '/joyeria.png' },
  { nombre: 'Postres', imagen: '/postres.png' },
  { nombre: 'Hogar', imagen: '/hogar.png' },
  { nombre: 'Accesorios', imagen: '/accesorios.png' },
  { nombre: 'Belleza', imagen: '/belleza.png' },
  { nombre: 'Manualidades', imagen: '/manualidades.png' },
  { nombre: 'Mascotas', imagen: '/mascotas.png' }
]

const emprendimientos = [
  'Tienda EcoMarket',
  'Café Literario',
  'Panadería La Abuela',
  'Floristería Rosabella',
  'Moda Urbana Lima',
  'Pet Lovers Market',
  'Accesorios D’Moda',
  'FitFood Express',
  'Dulce & Natural',
  'Artesanías Misky'
]

export default function CategoriasSection() {
  const [busqueda, setBusqueda] = useState('')
  const [mostrarMenu, setMostrarMenu] = useState(false)
  const [sugerencias, setSugerencias] = useState([])
  const router = useRouter()

  const handleSearch = () => {
    if (busqueda.trim()) {
      router.push(`/buscar?query=${encodeURIComponent(busqueda.trim())}`)
    }
  }

  const handleCategoriaClick = (nombre) => {
    router.push(`/emprendimientos?categoria=${encodeURIComponent(nombre.toLowerCase())}`)
  }

  const categoriasVisibles = categorias.slice(0, 5)
  const categoriasExtras = categorias.slice(5)

  return (
    <section id="categorias" className="max-w-7xl mx-auto px-6 py-12 space-y-10 relative">
      <h2 className="text-2xl font-semibold text-[#2b4563] text-center">Categorías</h2>

      {/* Grilla visible */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-items-center">
        {categoriasVisibles.map((cat, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => handleCategoriaClick(cat.nombre)}
          >
            <Image src={cat.imagen} alt={cat.nombre} width={120} height={120} className="rounded-xl" />
            <p className="mt-2 text-sm text-gray-800">{cat.nombre}</p>
          </div>
        ))}
      </div>

      {/* Buscador + botón */}
      <div className="flex flex-wrap gap-2 items-start justify-center mt-8 relative">
        {/* Dropdown */}
        {mostrarMenu && (
          <div className="absolute top-12 left-0 z-10 w-64 max-h-64 bg-white border rounded-xl shadow-lg p-4 space-y-2 overflow-y-auto">
            {categorias.map((cat, idx) => (
              <div
                key={idx}
                className="cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-md flex items-center gap-3"
                onClick={() => {
                  handleCategoriaClick(cat.nombre)
                  setMostrarMenu(false)
                }}
              >
                <Image src={cat.imagen} alt={cat.nombre} width={30} height={30} className="rounded-md" />
                <span className="text-sm text-gray-800">{cat.nombre}</span>
              </div>
            ))}
          </div>
        )}

        {/* Botón de categorías */}
        <button
          onClick={() => setMostrarMenu(!mostrarMenu)}
          className="px-4 py-2 rounded-full border border-gray-300 text-sm flex items-center gap-2 relative z-20 bg-white"
        >
          <span className="text-lg">≡</span> Categorías
        </button>

        {/* Buscador con autocompletado */}
        <div className="relative w-full max-w-md">
          <div className="flex items-center border rounded-full overflow-hidden">
            <input
              type="text"
              placeholder="Encuentra productos o emprendimientos"
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value)
                const texto = e.target.value.toLowerCase()
                const coincidencias = emprendimientos.filter(emp => emp.toLowerCase().includes(texto))
                setSugerencias(coincidencias)
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 px-4 py-2 text-sm outline-none"
            />
            <button onClick={handleSearch} className="bg-[#0B3B5B] text-white px-4 py-2">
              🔍
            </button>
          </div>

          {/* Lista de sugerencias */}
          {sugerencias.length > 0 && (
            <ul className="absolute z-10 bg-white border rounded-md mt-1 w-full max-h-48 overflow-y-auto shadow-lg">
              {sugerencias.map((sug, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setBusqueda(sug)
                    setSugerencias([])
                    router.push(`/buscar?query=${encodeURIComponent(sug)}`)
                  }}
                >
                  {sug}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}