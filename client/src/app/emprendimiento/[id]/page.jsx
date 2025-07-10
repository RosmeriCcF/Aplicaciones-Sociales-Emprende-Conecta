'use client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/app/components/Navbar' 
const emprendimientos = [
  {
    id: 1,
    name: 'Tienda EcoMarket',
    address: 'Av. Los Olivos 123',
    imageSrc: '/tienda-ecomarket.jpg',
    rating: 4.5,
    description: 'Productos saludables y ecológicos para toda la familia.',
    whatsapp: 'https://wa.me/51999999991'
  },
  {
    id: 2,
    name: 'Café Literario',
    address: 'Calle Ficción 456',
    imageSrc: '/cafe-literario.jpg',
    rating: 4.7,
    description: 'Un espacio para leer, relajarte y tomar el mejor café.',
    whatsapp: 'https://wa.me/51999999992'
  },
  {
    id: 3,
    name: 'Panadería La Abuela',
    address: 'Calle Ficción 456',
    imageSrc: '/cafe-literario.jpg',
    rating: 4.7,
    description: 'Un espacio para leer, relajarte y tomar el mejor café.',
    whatsapp: 'https://wa.me/51999999992'
  },
  {
    id: 4,
    name: 'Floristería',
    address: 'Av. Central 765',
    imageSrc: '/moda-urbana.jpg',
    rating: 4.2,
    description: 'Ropa urbana hecha en Perú. Estilo y comodidad.',
    whatsapp: 'https://wa.me/51999999993'
  },
  {
    id: 5,
    name: 'Moda Urbana Lima',
    address: 'Av. Central 765',
    imageSrc: '/moda-urbana.jpg',
    rating: 4.2,
    description: 'Ropa urbana hecha en Perú. Estilo y comodidad.',
    whatsapp: 'https://wa.me/51999999993'
  },
  {
    id: 6,
    name: 'Zapatería El Paso',
    address: 'Jr. Tacna 321',
    imageSrc: '/zapateria-elpaso.jpg',
    rating: 4.4,
    description: 'Calzado cómodo y moderno para todas las edades.',
    whatsapp: 'https://wa.me/51999999994'
  },
  {
    id: 7,
    name: 'TechZone',
    address: 'Av. Tecnología 101',
    imageSrc: '/techzone.jpg',
    rating: 4.9,
    description: 'Accesorios y gadgets tecnológicos de última generación.',
    whatsapp: 'https://wa.me/51999999995'
  },
  {
    id: 8,
    name: 'Joyas Andinas',
    address: 'Plaza Joyas 77',
    imageSrc: '/joyas-andinas.jpg',
    rating: 4.8,
    description: 'Joyas hechas a mano con materiales andinos.',
    whatsapp: 'https://wa.me/51999999996'
  },
  {
    id: 9,
    name: 'Dulce Capricho',
    address: 'Av. Postres 999',
    imageSrc: '/dulce-capricho.jpg',
    rating: 4.6,
    description: 'Postres caseros con sabores únicos y deliciosos.',
    whatsapp: 'https://wa.me/51999999997'
  },
  {
    id: 10,
    name: 'Patitas Shop',
    address: 'Calle Mascotas 45',
    imageSrc: '/patitas-shop.jpg',
    rating: 4.7,
    description: 'Tienda para consentir a tus mascotas como se merecen.',
    whatsapp: 'https://wa.me/51999999998'
  }
]

export default function EmprendimientoDetalle({ params }) {
  const id = parseInt(params.id)
  const emp = emprendimientos.find(e => e.id === id)

  if (!emp) return notFound()

  return (
    <>
      <Navbar usuario="Rosmeri Ccanto Flores" />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-[#0B3B5B] mb-4">{emp.name}</h1>

        <img
          src={emp.imageSrc}
          alt={emp.name}
          className="w-full h-64 object-contain rounded-lg mb-4 bg-white"
        />

        <p className="text-sm text-gray-500 mb-1">{emp.address}</p>
        <p className="text-yellow-500 mb-4">⭐ {emp.rating} / 5.0</p>

        <p className="text-lg text-gray-700 mb-6">{emp.description}</p>

        <Link
          href={emp.whatsapp}
          target="_blank"
          className="inline-block px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
        >
          Contactar por WhatsApp
        </Link>
      </div>
    </>
  )
}