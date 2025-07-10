'use client'
import Image from 'next/image'

const productos = [
  {
    nombre: 'Cámara Canon Mirrorless',
    categoria: 'Tecnología',
    descripcion: 'Descripción',
    precio: 'S/. 500.00',
    imagen: '/camara.png',
  },
  {
    nombre: 'Samsung Galaxy Z Series',
    categoria: 'Tecnología',
    descripcion: 'Descripción',
    precio: 'S/. 13,825.58',
    imagen: '/samsung.png',
  },
  {
    nombre: 'LAPTOP ASUS AMDA RYZEN',
    categoria: 'Tecnología',
    descripcion: 'Descripción',
    precio: 'S/. 878.23',
    imagen: '/laptop.png',
  },
  {
    nombre: 'Zapatillas',
    categoria: 'Calzado',
    descripcion: 'Descripción',
    precio: 'S/. 149.99',
    imagen: '/zapatillas.png',
  },
]

export default function ProductosTendencia() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 space-y-10">
      <h2 className="text-2xl font-semibold text-[#2b4563] text-center">Productos en tendencia</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {productos.map((prod, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-4">
            <Image
              src={prod.imagen}
              alt={prod.nombre}
              width={300}
              height={200}
              className="rounded-md mx-auto"
            />
            <p className="text-xs text-gray-500 mt-2">{prod.categoria}</p>
            <h3 className="text-sm font-medium">{prod.nombre}</h3>
            <p className="text-xs text-gray-400">{prod.descripcion}</p>
            <p className="text-sm font-bold mt-2">{prod.precio}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
