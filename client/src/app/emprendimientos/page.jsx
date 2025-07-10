// ✅ Archivo: src/app/emprendimientos/page.jsx
'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Navbar from '../components/Navbar'

const EmprendimientosPage = () => {
  const searchParams = useSearchParams()
  const categoriaURL = searchParams.get('categoria')
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')

  useEffect(() => {
    if (categoriaURL) {
      setCategoriaSeleccionada(categoriaURL)
    }
  }, [categoriaURL])

  const emprendimientos = [
    {
      id: 1,
      name: 'Tienda EcoMarket',
      address: 'Av. Los Olivos 123',
      imageSrc: '/tienda-ecomarket.jpg',
      rating: 4.5,
      category: 'comida saludable'
    },
    {
      id: 2,
      name: 'Café Literario',
      address: 'Calle Ficción 456',
      imageSrc: '/cafe-literario.jpg',
      rating: 4.7,
      category: 'cafetería'
    },
    {
      id: 3,
      name: 'Panadería La Abuela',
      address: 'Calle Pan 87',
      imageSrc: '/panaderia-la-abuela.jpg',
      rating: 4.8,
      category: 'comida'
    },
    {
      id: 4,
      name: 'Floristería Rosabella',
      address: 'Av. Las Flores 159',
      imageSrc: '/floristeria-rosabella.jpg',
      rating: 4.9,
      category: 'hogar'
    },
    {
      id: 5,
      name: 'Moda Urbana Lima',
      address: 'Av. Central 765',
      imageSrc: '/moda-urbana.jpg',
      rating: 4.2,
      category: 'ropa'
    },
    {
      id: 6,
      name: 'Zapatería El Paso',
      address: 'Av. Caminos 101',
      imageSrc: '/zapateria-elpaso.jpg',
      rating: 4.3,
      category: 'calzado'
    },
    {
      id: 7,
      name: 'TechZone Perú',
      address: 'Jr. Byte 88',
      imageSrc: '/techzone.jpg',
      rating: 4.6,
      category: 'tecnología'
    },
    {
      id: 8,
      name: 'Joyas Andinas',
      address: 'Av. Oro 212',
      imageSrc: '/joyas-andinas.jpg',
      rating: 4.7,
      category: 'joyería'
    },
    {
      id: 9,
      name: 'Dulce Capricho',
      address: 'Pasaje Azúcar 33',
      imageSrc: '/dulce-capricho.jpg',
      rating: 4.5,
      category: 'postres'
    },
    {
      id: 10,
      name: 'Patitas Shop',
      address: 'Jr. Mascotas 55',
      imageSrc: '/patitas-shop.jpg',
      rating: 4.8,
      category: 'mascotas'
    }
  ]

  const emprendimientosFiltrados = categoriaSeleccionada
    ? emprendimientos.filter(emp => emp.category.toLowerCase() === categoriaSeleccionada.toLowerCase())
    : emprendimientos

  return (
    <>
      <Navbar usuario="Rosmeri Ccanto Flores" />
      <section className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Emprendimientos</h1>

        <div className="mb-6 flex gap-3 flex-wrap">
          {['comida saludable', 'comida', 'cafetería', 'ropa', 'hogar', 'calzado', 'tecnología', 'joyería', 'postres', 'mascotas'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoriaSeleccionada(cat)}
              className={`px-4 py-2 rounded-full border ${categoriaSeleccionada === cat ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}
            >
              {cat}
            </button>
          ))}
          <button
            onClick={() => setCategoriaSeleccionada('')}
            className="px-4 py-2 rounded-full bg-gray-300 text-black"
          >
            Ver todo
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {emprendimientosFiltrados.map(emp => (
            <EmprendimientoCard
              key={emp.id}
              id={emp.id}
              name={emp.name}
              address={emp.address}
              imageSrc={emp.imageSrc}
              rating={emp.rating}
            />
          ))}
        </div>
      </section>
    </>
  )
}

const EmprendimientoCard = ({ id, name, address, imageSrc, rating }) => {
  return (
    <Link href={`/emprendimiento/${id}`}>
      <article className="bg-white rounded-lg shadow-md p-4 flex flex-col items-start hover:scale-[1.02] transition-transform duration-200">
        <img 
          src={imageSrc} 
          alt={name} 
          className="w-full h-40 object-contain rounded-md mb-3 bg-white" 
        />
        <h3 className="text-lg font-semibold mb-1">{name}</h3>
        <p className="text-sm text-gray-600 mb-1">{address}</p>
        <p className="text-sm text-yellow-500 font-medium">⭐ {rating} / 5.0</p>
      </article>
    </Link>
  )
}

export default EmprendimientosPage