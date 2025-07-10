'use client';

import Link from 'next/link';

export default function RegistroPage() {
  return (
    <div className="w-full max-w-sm text-center">
      <h2 className="text-xl font-semibold mb-2">Registro</h2>
      <p className="mb-6 text-sm text-gray-600">Elige tu rol</p>
      <div className="flex flex-col gap-4">
        <Link
          href="/registro/cliente"
          className="flex items-center gap-3 justify-center bg-[#0B3B5B] text-white py-3 px-4 rounded-xl"
        >
          <img src="/cliente.png" alt="Cliente" className="w-6 h-6" />
          Cliente
        </Link>
        <Link
          href="/registro/emprendedor"
          className="flex items-center gap-3 justify-center bg-[#0B3B5B] text-white py-3 px-4 rounded-xl"
        >
          <img src="/emprendedor.png" alt="Emprendedor" className="w-6 h-6" />
          Emprendedor
        </Link>
      </div>
    </div>
  );
}
