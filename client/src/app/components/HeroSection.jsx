'use client'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="bg-[#ebf9fc] px-6 py-12 rounded-3xl max-w-7xl mx-auto mb-12">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        
        <div className="flex-1 text-left">
          <h1 className="text-4xl font-extrabold text-[#2b4563] leading-tight mb-4">
            Hecho por<br />peruanos,<br />para ti
          </h1>
          <p className="text-gray-600 text-base max-w-md">
            Conecta con lo mejor del emprendimiento peruano: artículos exclusivos y de calidad cerca de tu localidad.
          </p>
        </div>

        <div className="flex-1 flex justify-center mt-8 lg:mt-0">
          <div className="relative w-[350px] h-auto rounded-2xl overflow-hidden">
            <Image
              src="/emprendedores.png" 
              alt="Emprendedores"
              width={700}
              height={500}
              className="rounded-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}