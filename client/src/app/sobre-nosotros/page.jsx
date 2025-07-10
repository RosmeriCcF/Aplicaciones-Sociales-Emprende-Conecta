// app/sobre-nosotros/page.jsx
'use client'
import Image from 'next/image'
import Navbar from '../components/Navbar'

export default function SobreNosotrosPage() {
  return (
    <>
      <Navbar usuario="Rosmeri Ccanto Flores" />

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        <section className="text-center">
          <h1 className="text-3xl font-bold text-[#0B3B5B] mb-4">Sobre Nosotros</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            En <strong>Emprendo&Conecta</strong> creemos en el poder de las ideas y las personas.
            Somos una plataforma creada para impulsar a emprendedores peruanos conectándolos con clientes que valoran el esfuerzo, la creatividad y la autenticidad.
          </p>
        </section>

        <section className="flex flex-col md:flex-row items-center gap-8">
          <Image 
            src="/nosotros.jpg" 
            alt="Emprendedores peruanos" 
            width={500} 
            height={300} 
            className="rounded-xl shadow-md object-cover"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-[#0B3B5B] mb-2">¿Por qué existimos?</h2>
            <p className="text-gray-700 text-base">
              Nacimos con el objetivo de apoyar a los pequeños negocios que quieren crecer, visibilizar sus productos y conectar con una comunidad que apuesta por lo local.
              Queremos que ningún emprendimiento se quede sin oportunidades por falta de visibilidad digital.
            </p>
          </div>
        </section>

        <section className="bg-[#EFFFFF] p-6 rounded-xl text-center shadow-sm">
          <h2 className="text-xl font-semibold text-[#0B3B5B] mb-2">Nuestra Misión</h2>
          <p className="text-gray-700">
            Empoderar a cada emprendedor para que pueda alcanzar su máximo potencial, creando redes y generando impacto positivo en sus comunidades.
          </p>
        </section>
      </main>

      
    </>
  )
}