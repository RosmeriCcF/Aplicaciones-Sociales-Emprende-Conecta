'use client';

import LayoutAuth from '@/components/LayoutAuth';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');

  return (
    <LayoutAuth>
      <div className="w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-2">Bienvenido</h2>
        <p className="mb-6 text-sm text-gray-600">Ingresa sesión a tu cuenta</p>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="px-4 py-2 border rounded-full text-sm"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            className="px-4 py-2 border rounded-full text-sm"
          />
          <button type="submit" className="bg-[#0B3B5B] text-white py-2 rounded-full">
            Iniciar Sesión
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          ¿No tienes cuenta?{' '}
          <Link href="/registro" className="text-[#0B3B5B] underline">
            Regístrate
          </Link>
        </p>
      </div>
    </LayoutAuth>
  );
}
