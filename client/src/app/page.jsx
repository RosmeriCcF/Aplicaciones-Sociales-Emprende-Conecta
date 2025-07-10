'use client'; // Este componente se ejecuta del lado del cliente

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importamos router para redirigir después del login
import { UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Hook de Next.js para navegación programática

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 🔐 Aquí podrías conectar con backend para validar credenciales
      console.log('Email:', email);
      console.log('Password:', password);

      // ✅ Redirigir al home tras login exitoso
      router.push('/home');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Aquí podrías mostrar feedback al usuario si la autenticación falla
    }
  };

  return (
    <main className="min-h-screen flex">
      {/* Columna izquierda */}
      <section className="w-1/2 bg-[#0B3B5B] text-white flex flex-col justify-center items-center p-8">
        <div className="mb-4">
          <Image src="/logo.png" alt="Logo E&C" width={60} height={60} />
        </div>

        <h1 className="text-3xl font-bold mb-2">E&amp;C</h1>
        <p className="text-center max-w-sm">
          Conecta con emprendedores peruanos y descubre productos únicos cerca de ti.
        </p>
      </section>

      {/* Columna derecha */}
      <section className="w-1/2 flex flex-col justify-center items-center p-8">
        <h1 className="text-3xl font-bold mb-4 text-[#0B3B5B]">Bienvenido</h1>
        <p className="mb-6 text-gray-600">Ingresa sesión a tu cuenta</p>

        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <div className="relative">
            <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0B3B5B]"
            />
          </div>

          <div className="relative">
            <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0B3B5B]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0B3B5B] text-white py-2 rounded-full font-semibold"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          ¿No tienes una cuenta?{' '}
          <a href="/registro" className="text-[#0B3B5B] font-semibold underline">
            Regístrate
          </a>
        </p>
      </section>
    </main>
  );
}
