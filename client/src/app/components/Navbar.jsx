'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { logoutUser } from '../../services/auth'; // Asegúrate de que esta función esté implementada correctamente

export default function Navbar({ usuario = 'Rosmeri Ccanto Flores', mostrarBoton = false }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-[#EFFFFF] rounded-[2rem] w-[95%] mx-auto mt-4 shadow-md">
      {/* Logo + Nombre */}
      <div className="flex items-center gap-2">
        {/* Asegúrate de que /public/logo.png exista correctamente */}
        <Image src="/logo.png" alt="Logo" width={40} height={40} />
        <span className="text-[#0B3B5B] font-bold text-lg">Emprendo&Conecta</span>
      </div>

      {/* Enlaces */}
      <div className="flex items-center gap-8 relative text-[#0B3B5B] font-medium">
        <Link href="/home">Inicio</Link>
        <li>
          <Link href="/emprendimientos" className="hover:underline">
            Emprendimientos
          </Link>
        </li>
        <Link href="/sobre-nosotros">Sobre Nosotros</Link>

        {/* Botón o perfil */}
        {mostrarBoton ? (
          <button className="bg-[#0B3B5B] text-white px-4 py-2 rounded-lg">Iniciar Sesión</button>
        ) : (
          <div className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <span className="font-semibold text-[#0B3B5B]">{usuario}</span>
              <div className="w-8 h-8 bg-[#7AC0C5] rounded-full border-4 border-[#304A78]"></div>
            </div>

            {open && (
              <div className="absolute right-0 mt-2 bg-[#0B3B5B] text-white rounded-md shadow-lg z-50 w-40">
                <ul className="flex flex-col">
                  <li className="px-4 py-2 hover:bg-[#164760] cursor-pointer">Perfil</li>
                  <li className="px-4 py-2 hover:bg-[#164760] cursor-pointer">Mis favoritos</li>
                  <li onClick={logoutUser} className="px-4 py-2 hover:bg-[#164760] cursor-pointer">Cerrar sesión</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}